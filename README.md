# Harsh Deepak Koku — Personal 3D Portfolio

<div align="center">

  [![Live Demo](https://img.shields.io/badge/demo-online-brightgreen.svg)](https://github.com/harsh-koku/My_Portfolio)
  [![React](https://img.shields.io/badge/React-18-blue.svg?logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6.svg?logo=typescript)](https://www.typescriptlang.org/)
  [![Three.js](https://img.shields.io/badge/Three.js-r168-black.svg?logo=three.js)](https://threejs.org/)
  [![GSAP](https://img.shields.io/badge/GSAP-3.14-88CE02.svg?logo=greensock)](https://greensock.com/gsap/)
  [![Vite](https://img.shields.io/badge/Vite-5.4-646CFF.svg?logo=vite)](https://vitejs.dev/)
  [![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

  <p align="center">
    <strong>A high-performance, interactive 3D web portfolio showcasing full-stack engineering skills, projects, and systems development.</strong>
  </p>

  <p align="center">
    <a href="#key-features">Key Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#project-structure">Project Structure</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#resume-management">Resume Management</a> •
    <a href="#connect">Connect</a>
  </p>

</div>

---

## Overview

Welcome to the source code of my personal developer portfolio! This project is crafted to provide visitors with an immersive, interactive experience while presenting my software engineering journey, technical projects, and academic background in a clean, modern interface.

Built with **React**, **Three.js / React Three Fiber**, and **GSAP**, the portfolio blends 3D character interactions, physics-based tech animations, and fluid scroll transitions with fast loading speeds and strict accessibility standards.

---

## Key Features

- **Interactive 3D Experience**: Custom 3D character powered by Three.js and React Three Fiber with Draco compression for fast asset delivery.
- **Cinematic Scroll Animations**: Smooth page transitions and horizontal pinned project showcases powered by GSAP and ScrollTrigger.
- **Interactive Physics Canvas**: Dynamic tech stack section featuring draggable, colliding badges simulated with physics engines.
- **One-Click Resume Download**: Instant download button serving a freshly tailored, ATS-compliant vector PDF resume.
- **Custom Cursor & Micro-Interactions**: Magnetic hover effects on navigation and social links tailored for engaging desktop interactions.
- **Fully Responsive**: Adaptive layouts optimized for both high-resolution desktop viewports and mobile devices.
- **Production Ready**: Fully typed in TypeScript, bundled with Vite, and monitored with Vercel Analytics and Speed Insights.

---

## Tech Stack

### Frontend & Core
- **Framework**: React 18, TypeScript, HTML5, CSS3
- **Build Tool**: Vite 5
- **Icons**: React Icons (FontAwesome 6, Tabler Icons, Material Icons)

### 3D Graphics & Physics
- **3D Engine**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Asset Optimization**: Draco Decoder for lightweight GLTF/GLB models
- **Physics**: `@react-three/cannon`, `@react-three/rapier`

### Animation & FX
- **Animations**: GSAP (GreenSock), ScrollTrigger, `@gsap/react`
- **Marquee**: `react-fast-marquee`

### Performance & Analytics
- **Analytics**: `@vercel/analytics`, `@vercel/speed-insights`

---

## Project Structure

```text
My_Portfolio/
├── public/
│   ├── draco/              # Draco decompression binaries for 3D models
│   ├── images/             # Tech logos and compressed WebP imagery
│   ├── models/             # 3D assets (character.glb, etc.)
│   └── resume.pdf          # Latest ATS-friendly downloadable PDF resume
├── src/
│   ├── components/
│   │   ├── Character/      # 3D character model loader and canvas setup
│   │   ├── styles/         # Scoped stylesheets for components
│   │   ├── utils/          # GSAP split text and viewport animation utilities
│   │   ├── About.tsx       # Bio and background summary
│   │   ├── Career.tsx      # Education and hackathon timeline
│   │   ├── Contact.tsx     # Direct links, email, phone, and footer
│   │   ├── Cursor.tsx      # Custom animated cursor
│   │   ├── HoverLinks.tsx  # Interactive magnetic link wrapper
│   │   ├── Landing.tsx     # Hero section with animated typography
│   │   ├── MainContainer.tsx # Layout container & desktop/mobile coordinator
│   │   ├── Navbar.tsx      # Navigation header with smooth anchor scrolling
│   │   ├── SocialIcons.tsx # Floating social docks and resume action button
│   │   ├── TechStack.tsx   # Physics-enabled 3D tech badge wall
│   │   ├── WhatIDo.tsx     # Backend & systems and full-stack breakdown
│   │   ├── Work.tsx        # Horizontal scrolling project showcase
│   │   └── WorkImage.tsx   # Project preview component
│   ├── context/            # Global loading state management
│   ├── App.tsx             # Root application component
│   ├── main.tsx            # React application entry point
│   └── index.css           # Global design system & theme tokens
├── generate_resume.html    # Standalone HTML template for generating vector PDF resume
├── vite.config.ts          # Vite build and plugin configuration
└── package.json            # Project dependencies and development scripts
```

---

## Getting Started

### Prerequisites

Make sure you have **Node.js** (v18 or higher recommended) and **npm** installed on your machine.

- Check Node version:
  ```bash
  node -v
  ```
- Check npm version:
  ```bash
  npm -v
  ```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/harsh-koku/My_Portfolio.git
   ```

2. Navigate into the project folder:
   ```bash
   cd My_Portfolio
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

### Development

Run the local development server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173` to explore the site live.

### Production Build

To compile TypeScript and build the optimized production assets:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## Resume Management

The resume downloaded by visitors is located at `public/resume.pdf`.

- The source layout is maintained in [`generate_resume.html`](generate_resume.html).
- To update your credentials, simply edit `generate_resume.html` and export it to `public/resume.pdf` using headless Chrome or your preferred print-to-PDF tool:
  ```powershell
  & "C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new --disable-gpu --print-to-pdf="public/resume.pdf" --no-pdf-header-footer "generate_resume.html"
  ```

---

## Featured Projects

| Project | Technologies | Focus |
| :--- | :--- | :--- |
| **AI Citizen Grievance System** | Java, Spring Boot, Hibernate, Next.js, React, MySQL, Python | Automated AI grievance routing, LLM sentiment analysis, and EXIF evidence verification |
| **Deep Packet Inspection Engine** | Java, Multithreading, Socket Programming, Networks, OOP | Concurrent real-time network traffic capture, protocol classification, and session tracking |
| **College Fest Platform** | HTML5, CSS3, JavaScript, Responsive UI, Git | Interactive web platform built for high concurrency fest engagement |
| **Smart India Hackathon** | Java, Spring Boot, REST APIs, Microservices, MySQL | National-level hackathon finalist solution for scalable public-sector workflows |

---

## Connect

- **Portfolio**: [harsh-koku.github.io](https://github.com/harsh-koku)
- **LinkedIn**: [linkedin.com/in/harsh-koku-080845250](https://linkedin.com/in/harsh-koku-080845250/)
- **GitHub**: [github.com/harsh-koku](https://github.com/harsh-koku)
- **Email**: [harshkoku04@gmail.com](mailto:harshkoku04@gmail.com)
- **Phone**: +91 97676 68505

---

## License

This project is licensed under the [MIT License](LICENSE). Feel free to customize and adapt it for your own portfolio!
