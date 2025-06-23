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
          className="fixed bottom-5 right-5 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-110 z-40"
          aria-label="Open Chat"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8"
          >
            <path
              fillRule="evenodd"
              d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.333 0 9.667-3.211 9.667-7.167s-4.334-7.167-9.667-7.167-9.667 3.211-9.667 7.167c0 1.258.41 2.447 1.125 3.451l-2.43 2.43a.75.75 0 00.316 1.282l2.43-2.43z"
              clipRule="evenodd"
            />
          </svg>
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
