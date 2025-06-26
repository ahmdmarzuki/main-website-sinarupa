import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import HomeSection from "../sections/HomeSection";
import ComingSoonSection from "../sections/ComingSoonSection";
import Footer from "../sections/Footer";
import MapsLocationSection from "../sections/MapsLocationSection";
import EventPathSection from "../sections/EventPathSection";
import AboutSection from "../sections/AboutSection";
import MajorSection from "../sections/MajorSection";
import PreEvent from "../sections/PreEvent";

const Homepage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-h-screen w-full bg-w- bg-cover bg-no-repeat bg-top"
      style={{
        backgroundImage: `url('/images/newbg_mobile.png')`,
      }}
    >
      {/* Responsive background for md and above */}
      <style>{`
        @media (min-width: 768px) {
          .homepage-bg {
            background-image: url('/images/update-bg.png') !important;
          }
        }
      `}</style>
      <div className="homepage-bg min-h-screen w-full bg-cover bg-no-repeat">
        <Navbar />
        <HomeSection />
        <AboutSection />
        <MapsLocationSection />
        <PreEvent />
        <MajorSection />
        <EventPathSection />
        <ComingSoonSection />
        <Footer />
      </div>
    </div>
  );
};

export default Homepage;
