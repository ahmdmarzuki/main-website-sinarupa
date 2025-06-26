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
import { useMediaQuery } from "../useMediaQuery";

const Homepage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div
      className="min-h-screen w-full bg-w- bg-cover bg-no-repeat bg-top"
      style={{
        backgroundImage: `${
          isMobile
            ? "url('/images/newbg_mobile.png')"
            : "url('/images/bgDesk.jpg')"
        }`,
      }}
    >
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
  );
};

export default Homepage;
