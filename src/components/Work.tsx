import "./styles/Work.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
  function getTranslateX() {
    const box = document.getElementsByClassName("work-box");
    if (!box.length) return 0;
    const rectLeft = document
      .querySelector(".work-container")!
      .getBoundingClientRect().left;
    const rect = box[0].getBoundingClientRect();
    const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
    let padding: number =
      parseInt(window.getComputedStyle(box[0]).padding) / 2;
    return rect.width * box.length - (rectLeft + parentWidth) + padding;
  }

  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".work-section",
      start: "top top",
      end: () => `+=${getTranslateX()}`,
      scrub: true,
      pin: true,
      id: "work",
      invalidateOnRefresh: true,
    },
  });

  timeline.to(".work-flex", {
    x: () => -getTranslateX(),
    ease: "none",
  });

  // Clean up (optional, good practice)
  return () => {
    timeline.kill();
    ScrollTrigger.getById("work")?.kill();
  };
}, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {[
            {
              name: "Citizen Grievance System",
              category: "AI & Full-Stack Portal",
              tools: "Java, Spring Boot, Hibernate, Next.js, React, MySQL, Python, NLP / LLM",
              description: "AI layer integrated with a government portal to automate citizen grievance routing. Features Spring Boot & Hibernate backend, Next.js interface, LLM-based sentiment priority assignment, and EXIF metadata validation for tamper-proof evidence submissions."
            },
            {
              name: "Deep Packet Inspection",
              category: "Network Systems & Security",
              tools: "Java, Multithreading, Socket Programming, Networks, OOP",
              description: "High-performance DPI engine in Java capturing, parsing, and classifying real-time network traffic. Implemented concurrent packet parsing, protocol classification, connection tracking, and protocol-wise traffic summaries."
            },
            {
              name: "College Fest Platform",
              category: "Interactive Web Experience",
              tools: "HTML5, CSS3, JavaScript, Responsive UI, Git",
              description: "Collaborated in a 6-member team to design and deploy the official college fest website, creating responsive layouts, dynamic animations, and delivering an engaging user experience across all device viewports."
            },
            {
              name: "Smart India Hackathon",
              category: "National Level Innovation",
              tools: "Java, Spring Boot, REST APIs, Microservices, MySQL",
              description: "Selected among the top college teams to represent in the national-level Smart India Hackathon 2025, solving real-world challenges with clean architecture and scalable cloud design."
            }
          ].map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p className="work-tools">{project.tools}</p>
                <p className="work-description">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
