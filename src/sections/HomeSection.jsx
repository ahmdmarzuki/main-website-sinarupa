import React, { useState } from "react";
import { Link } from "react-router-dom";
import AboutSection from "../sections/AboutSection";
// import MajorSection from "../sections/MajorSection";
// import EventPathSection from "../sections/EventPathSection";
// import FaqSection from "../sections/FaqSection";
import ChatPopup from "../components/ChatPopup";
import ModalDisclaimer from "../components/ModalDisclaimer";

const HomeSection = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleOpenChat = () => setIsChatOpen(true);
  const handleCloseChat = () => setIsChatOpen(false);

  return (
    <div
      id="home"
      className="relative w-screen min-h-screen font-sans overflow-hidden"
    >
      {/* === MOBILE LAYOUT === */}
      <div className="relative z-10 flex flex-col h-full w-full px-6 pt-[22vh] md:hidden">
        {/* Logo utama */}
        <div className="flex justify-center">
          <img
            src="/images/Sinarupa.png"
            alt="Sinarupa"
            className="w-[400px]"
          />
        </div>

        {/* Maskot kiri bawah */}
        <img
          src="/images/tompa.png"
          alt="Maskot"
          className="absolute -bottom-45 -left-25 w-[470px] pointer-events-none select-none mt-10"
        />

        {/* Tombol DAFTAR & KEONG RACUN */}
        <div className="flex flex-col items-center gap-4 mt-6 z-20">
          <Link
            to="/landing"
            className="relative w-[190px] hover:scale-105 transition z-20"
            style={{ zIndex: 20 }}
          >
            <img src="/images/button1.png" alt="Daftar" className="w-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[#FDE36E] font-bold text-lg">DAFTAR</span>
            </div>
          </Link>
        </div>

        {/* Tombol kanan bawah */}
        <div className="bottom-6 right-4 flex flex-col items-end gap-3">
          {["MERCH", "CHATBOT", "GAME"].map((label, i) => {
            if (label === "CHATBOT") {
              return (
                <button
                  key={label}
                  className="relative w-[160px] hover:scale-105 transition focus:outline-none"
                  onClick={handleOpenChat}
                  type="button"
                >
                  <img
                    src="/images/button1.png"
                    alt={`Button ${label}`}
                    className="w-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[#FDE36E] font-bold text-lg">
                      {label}
                    </span>
                  </div>
                </button>
              );
            }
            return (
              <Link
                to="#"
                key={label}
                className="relative w-[160px] hover:scale-105 transition"
              >
                <img
                  src="/images/button1.png"
                  alt={`Button ${label}`}
                  className="w-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[#FDE36E] font-bold text-lg">
                    {label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
        {isChatOpen && <ChatPopup onClose={handleCloseChat} />}
      </div>

      {/* === DESKTOP LAYOUT === */}
      <div className="relative z-10 hidden md:flex flex-col items-center justify-center h-full w-full px-10 md:gap-16">
        {/* Logo + Maskot di tengah */}
        <div className="flex justify-center items-center gap-6">
          {/* Logo */}
          <img
            src="/images/Sinarupa.png"
            alt="Sinarupa"
            className="w-[500px] translate-x-15"
          />

          {/* Maskot */}
          <img
            src="/images/tompa.png"
            alt="Maskot"
            className="w-[500px] -translate-x-15 mt-10"
          />
        </div>

        {/* Tombol DAFTAR & KEONG RACUN */}
        <div className="flex flex-col items-center gap-4 mt-6 z-20">
          <Link
            to="/landing"
            className="relative w-[190px] hover:scale-105 transition z-20"
            style={{ zIndex: 20 }}
          >
            <img src="/images/button1.png" alt="Daftar" className="w-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[#FDE36E] font-bold text-lg">DAFTAR</span>
            </div>
          </Link>
        </div>

        {/* Tombol horizontal center (desktop) */}
        {/* Dihapus agar tidak double tombol DAFTAR */}
        {isChatOpen && <ChatPopup onClose={handleCloseChat} />}
      </div>
    </div>
  );
};

export default HomeSection;
