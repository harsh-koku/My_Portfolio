import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

// ---------------------------------------------------------------------------
// Appearance palette — matched to your photo
// ---------------------------------------------------------------------------
const SKIN_COLOR      = new THREE.Color("#C18A50"); // warm golden-brown skin
const HAIR_COLOR      = new THREE.Color("#080808"); // jet-black wavy hair
const SHIRT_COLOR     = new THREE.Color("#1A1A1A"); // black blazer / suit jacket
const PANTS_COLOR     = new THREE.Color("#1C1C1C"); // black suit trousers (matching blazer)
const SHOE_COLOR      = new THREE.Color("#0A0A0A"); // black leather shoes
const SHOE_SOLE_COLOR = new THREE.Color("#0D0D0D"); // shoe sole

type MeshAppearance = {
  color: THREE.Color;
  roughness?: number;
  metalness?: number;
};

// ---------------------------------------------------------------------------
// Override map keyed by the GLTF node name (what child.name returns in traverse)
// AND by the mesh name (what child.geometry uuid resolves to — fallback)
//
// From GLB inspection:
//   node="Plane007"  mesh="Plane007"  Y[11.92->14.02]  → main face/head mesh
//   node="Ear001"    mesh="Plane003"  Y[12.82->13.51]  → ears
//   node="Neck"       mesh="Plane005"  Y[11.41->12.52]  → neck
//   node="Hand"       mesh="Mesh002"   Y[10.81->11.51]  → hands
//   node="hair"       mesh="IronpCube3004"             → hair cap
//   node="BODYSHIRT" mesh="Cube002"   Y[6.95->12.15]   → shirt+torso
//   node="Pant"       mesh="Cube004"   Y[0.93->7.17]    → trousers
//   node="Shoe"       mesh="Cylinder005"                → shoe upper
//   node="Sole"       mesh="Cylinder008"                → shoe sole
// ---------------------------------------------------------------------------

// Covers both node names AND mesh names to guarantee a hit regardless of
// how Three.js assigns child.name after skinning/instancing
const APPEARANCE_MAP: Record<string, MeshAppearance> = {
  // --- Face / skin (node names) ---
  "Plane007":      { color: SKIN_COLOR,   roughness: 0.82, metalness: 0.0 },
  "Ear001":        { color: SKIN_COLOR,   roughness: 0.82, metalness: 0.0 },
  "Neck":           { color: SKIN_COLOR,   roughness: 0.82, metalness: 0.0 },
  "Hand":           { color: SKIN_COLOR,   roughness: 0.82, metalness: 0.0 },
  // --- Face / skin (mesh names as fallback) ---
  "Plane007_mesh": { color: SKIN_COLOR,   roughness: 0.82, metalness: 0.0 },
  "Plane003":      { color: SKIN_COLOR,   roughness: 0.82, metalness: 0.0 },
  "Plane005":      { color: SKIN_COLOR,   roughness: 0.82, metalness: 0.0 },
  "Mesh002":       { color: SKIN_COLOR,   roughness: 0.82, metalness: 0.0 },
  // --- Hair ---
  "hair":           { color: HAIR_COLOR,   roughness: 0.90, metalness: 0.0 },
  "IronpCube3004":{ color: HAIR_COLOR,   roughness: 0.90, metalness: 0.0 },
  // --- Shirt / torso ---
  "BODYSHIRT":     { color: SHIRT_COLOR,  roughness: 0.88, metalness: 0.0 },
  "Cube002":       { color: SHIRT_COLOR,  roughness: 0.88, metalness: 0.0 },
  // --- Pants ---
  "Pant":           { color: PANTS_COLOR,  roughness: 0.85, metalness: 0.0 },
  "Cube004":       { color: PANTS_COLOR,  roughness: 0.85, metalness: 0.0 },
  // --- Shoes ---
  "Shoe":           { color: SHOE_COLOR,   roughness: 0.50, metalness: 0.1 },
  "Cylinder005":   { color: SHOE_COLOR,   roughness: 0.50, metalness: 0.1 },
  "Sole":           { color: SHOE_SOLE_COLOR, roughness: 0.70, metalness: 0.0 },
  "Cylinder008":   { color: SHOE_SOLE_COLOR, roughness: 0.70, metalness: 0.0 },
};

// Material-name fallback for multi-material meshes (e.g. Plane.017 = shoes)
const MATERIAL_OVERRIDES: Record<string, MeshAppearance> = {
  "Material.027": { color: SHOE_COLOR,      roughness: 0.50, metalness: 0.1 },
  "Material.028": { color: SHOE_SOLE_COLOR, roughness: 0.70, metalness: 0.0 },
};

function applyAppearance(mesh: THREE.Mesh, appearance: MeshAppearance) {
  const applyToMat = (mat: THREE.Material): THREE.Material => {
    const m = mat.clone() as any;
    // Remove texture maps so flat color takes full effect
    if (m.map) m.map = null;
    if (m.normalMap) m.normalMap = null;
    if (m.aoMap) m.aoMap = null;
    if (m.emissiveMap) m.emissiveMap = null;
    if (m.color) m.color.copy(appearance.color);
    if (appearance.roughness !== undefined && "roughness" in m) m.roughness = appearance.roughness;
    if (appearance.metalness !== undefined && "metalness" in m) m.metalness = appearance.metalness;
    m.needsUpdate = true;
    return m;
  };
  mesh.material = Array.isArray(mesh.material)
    ? mesh.material.map(applyToMat)
    : applyToMat(mesh.material);
}




// ---------------------------------------------------------------------------

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);

            character.traverse((child: any) => {
              if (!child.isMesh) return;
              const mesh = child as THREE.Mesh;
              mesh.castShadow = true;
              mesh.receiveShadow = true;
              mesh.frustumCulled = true;

              // Try node name first, then mesh name — guarantees a hit either way
              const nodeName = child.name ?? "";
              const meshName = (child.geometry?.name ?? child.userData?.name ?? "");
              // Face uses same skin color as neck/ears/hands
              
              const appearance = APPEARANCE_MAP[nodeName] || APPEARANCE_MAP[meshName];
              if (appearance) {
                applyAppearance(mesh, appearance);
                return;
              }

              // Fallback: multi-material mesh — check each sub-material by name
              if (Array.isArray(mesh.material)) {
                mesh.material = mesh.material.map((m: any) => {
                  if (MATERIAL_OVERRIDES[m.name]) {
                    const ov = MATERIAL_OVERRIDES[m.name];
                    const nm = m.clone();
                    if (nm.color) nm.color.copy(ov.color);
                    if (ov.roughness !== undefined) nm.roughness = ov.roughness;
                    if (ov.metalness !== undefined) nm.metalness = ov.metalness;
                    return nm;
                  }
                  return m;
                });
              } else if (mesh.material) {
                const matName = (mesh.material as any).name ?? "";
                if (MATERIAL_OVERRIDES[matName]) {
                  applyAppearance(mesh, MATERIAL_OVERRIDES[matName]);
                }
              }
            });

            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
