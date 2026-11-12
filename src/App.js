import { ThemeProvider } from "styled-components";
import { useState } from "react";
import styled from "styled-components";
import { darkTheme } from './utils/Themes.js';
import './App.css';
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Experience from "./components/Experience";
import Education from "./components/Education";
import ProjectDetails from "./components/ProjectDetails";
import { Background, ClickRipple, ScrollProgress } from "./components/Effects";

const Body = styled.main`
  position: relative;
  width: 100%;
  overflow-x: hidden;
`;

function App() {
  const [openModal, setOpenModal] = useState({ state: false, project: null });
  return (
    <ThemeProvider theme={darkTheme}>
      <Background />
      <ClickRipple />
      <ScrollProgress />
      <Navbar />
      <Body>
        <HeroSection />
        <Skills />
        <Experience />
        <Projects openModal={openModal} setOpenModal={setOpenModal} />
        <Education />
        <Contact />
        <Footer />
        {openModal.state &&
          <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />
        }
      </Body>
    </ThemeProvider>
  );
}

export default App;
