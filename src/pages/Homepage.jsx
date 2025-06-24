import React from "react";
import Navbar from "../components/Navbar";
import HomeSection from "../sections/HomeSection";
import ComingSoonSection from "../sections/ComingSoonSection";
import Footer from "../sections/Footer";
import EventPathSection from "../sections/EventPathSection";

const Homepage = () => {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('/images/bg_mobile.png')`,
      }}
    >
      {/* Responsive background for md and above */}
      <style>{`
        @media (min-width: 768px) {
          .homepage-bg {
            background-image: url('/images/bg_desktop.png') !important;
          }
        }
      `}</style>
      <div className="homepage-bg min-h-screen w-full bg-cover bg-no-repeat">
        <Navbar />
        <HomeSection />
        <ComingSoonSection />
        <Footer />
      </div>
    </div>
  );
};

export default Homepage;
