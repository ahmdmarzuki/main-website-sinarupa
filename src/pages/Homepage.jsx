import React, { useState } from "react";
import { Link } from "react-router-dom";
import HomeSection from "../sections/HomeSection";
import AboutSection from "../sections/AboutSection";
// import MajorSection from "../sections/MajorSection";
// import EventPathSection from "../sections/EventPathSection";
// import FaqSection from "../sections/FaqSection";
import ChatPopup from "../components/ChatPopup";
import ModalDisclaimer from "../components/ModalDisclaimer";

const Homepage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const handleOpenChat = () => setShowDisclaimer(true);
  const handleAgree = () => {
    setShowDisclaimer(false);
    setIsChatOpen(true);
  };
  const handleCloseDisclaimer = () => setShowDisclaimer(false);

  return (
    <div className="relative min-h-screen bg-gray-100">
      <HomeSection />
      <AboutSection />
      {/* <MajorSection />
      <EventPathSection />
      <FaqSection /> */}

      {/* Floating Chat Button - Muncul hanya jika chat tidak terbuka */}
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
