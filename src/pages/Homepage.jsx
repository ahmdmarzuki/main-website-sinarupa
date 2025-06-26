import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import HomeSection from "../sections/HomeSection";
import ComingSoonSection from "../sections/ComingSoonSection";
import Footer from "../sections/Footer";

import MapsLocationSection from "../sections/MapsLocationSection";

import EventPathSection from "../sections/EventPathSection";
import AboutSection from "../sections/AboutSection";
import MajorSection from "../sections/MajorSection";

const Homepage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-h-screen w-full bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('/images/newbg_mobile.png')`,
      }}
    >
      {/* Responsive background for md and above */}
      <style>{`
        @media (min-width: 768px) {
          .homepage-bg {
            background-image: url('/images/newbg_desktop.png') !important;
          }
        }
      `}</style>
      <div className="homepage-bg min-h-screen w-full bg-cover bg-no-repeat">
        <Navbar />
        <HomeSection />

        <AboutSection />
        <MapsLocationSection />
        <MajorSection />
        <ComingSoonSection />
        <Footer />
      </div>
    </div>
  );
};

export default Homepage;
