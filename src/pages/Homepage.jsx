import React, { useState } from "react";
import Navbar from "../components/Navbar";
import HomeSection from "../sections/HomeSection";
import AboutSection from "../sections/AboutSection";
import ChatPopup from "../components/ChatPopup";
import ModalDisclaimer from "../components/ModalDisclaimer";

import bgDesktop from "/images/bg_desktop.png";
import bgMobile from "/images/bg_mobile.png";
import { useMediaQuery } from "../useMediaQuery";
import Footer from "../sections/Footer";
import Contact from "../sections/Contact";
import EventPathSection from "../sections/EventPathSection";

const Homepage = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const handleOpenChat = () => {
    // Jika sudah pernah lihat intro, langsung buka chat
    const hasSeenIntro = localStorage.getItem("hasSeenIntro");
    if (hasSeenIntro) {
      setIsChatOpen(true);
    } else {
      setShowDisclaimer(true);
    }
  };

  const handleAgree = () => {
    setShowDisclaimer(false);
    setIsChatOpen(true);
    // Set flag di localStorage agar intro tidak muncul lagi
    localStorage.setItem("hasSeenIntro", "true");
  };
  const handleCloseDisclaimer = () => setShowDisclaimer(false);

  return (
    <div
      className="relative min-h-screen bg-gray-100 bg-cover pt-20"
      style={{ backgroundImage: `url(${isMobile ? bgMobile : bgDesktop})` }}
    >
      <Navbar />
      <HomeSection />
      <EventPathSection />
      {/* <div id="about">
        <AboutSection />
      </div> */}

      <Contact />

      {!isChatOpen && (
        <button
          onClick={handleOpenChat}
          className="fixed w-20 bottom-5 right-5 transition-transform transform hover:scale-110 z-40"
          aria-label="Open Chat"
        >
          <img src="/images/gem_ijo.png" className="object-cover" alt="" />
        </button>
      )}

      {/* Modal Disclaimer */}
      {showDisclaimer && (
        <ModalDisclaimer
          onAgree={handleAgree}
          onClose={handleCloseDisclaimer}
        />
      )}

      {/* Chat Popup */}
      {isChatOpen && <ChatPopup onClose={() => setIsChatOpen(false)} />}
    </div>
  );
};

export default Homepage;
