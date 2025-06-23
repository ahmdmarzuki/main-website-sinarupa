import React from "react";
import { Link } from "react-router-dom";
import HomeSection from "../sections/HomeSection";
import AboutSection from "../sections/AboutSection";
import MajorSection from "../sections/MajorSection";
import EventPathSection from "../sections/EventPathSection";
import FaqSection from "../sections/FaqSection";
import ChromagiaEventSection from "../sections/ChromagiaEventSection";
import LoadingSpinner from "../components/LoadingSpinner";
import Navbar from "../components/Navbar";

import bgDesktop from "/images/bg_desktop.png";
import bgMobile from "/images/bgMobileRevisi.jpg";
import { useMediaQuery } from "../useMediaQuery";

const Homepage = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div
      className="min-h-screen bg-cover"
      style={{ backgroundImage: `url(${isMobile ? bgMobile : bgDesktop})` }}
    >
      <Navbar />
      {/* <HomeSection />
      <AboutSection /> */}
      <MajorSection />
      <EventPathSection />
      {/* <ChromagiaEventSection /> */}
      <FaqSection />
    </div>
  );
};

export default Homepage;
