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

const Homepage = () => {
  return (
    <div>
      <Navbar />
      <HomeSection />
      <AboutSection />
      <MajorSection />
      <EventPathSection />
      {/* <ChromagiaEventSection /> */}
      <FaqSection />
      <LoadingSpinner />
      {/* <Link to="/upload">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          upload
        </button>
      </Link> */}
    </div>
  );
};

export default Homepage;
