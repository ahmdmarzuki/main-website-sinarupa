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
      className="relative w-screen min-h-screen font-sans overflow-visible pt-20 lg:pt-50"
    >
      {/* === MOBILE LAYOUT === */}
      <div className="relative z-10 flex flex-col h-full w-full px-6 pt-[4vh] md:hidden">
        {/* Logo utama */}
        <div className="flex justify-center">
          <img
            src="/images/Sinarupa.png"
            alt="Sinarupa"
            className="w-[300px]"
          />
        </div>

        {/* Maskot kiri bawah */}
        <img
          src="/images/tompamelayang.png"
          alt="Maskot"
          className="absolute -bottom-47 -left-20 w-[365px] pointer-events-none select-none mt-10"
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
        <div className="pt-14 bottom-6 right-4 flex flex-col items-end gap-3 z-20 mb-10">
          {[
            { label: "CHATBOT", type: "button" },
            { label: "GAME", type: "link" },
          ].map((item, i) => {
            if (item.label === "CHATBOT") {
              return (
                <button
                  key={item.label}
                  className="relative w-[150px] hover:scale-105 transition focus:outline-none"
                  onClick={handleOpenChat}
                  type="button"
                >
                  <img
                    src="/images/button1.png"
                    alt={`Button ${item.label}`}
                    className="w-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[#FDE36E] font-bold text-lg">
                      {item.label}
                    </span>
                  </div>
                </button>
              );
            }
            // GAME button
            return (
              <a
                href="https://minigame.sinarupa.com"
                key={item.label}
                className="relative w-[150px] hover:scale-105 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/images/button1.png"
                  alt={`Button ${item.label}`}
                  className="w-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[#FDE36E] font-bold text-lg">
                    {item.label}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
        {isChatOpen && <ChatPopup onClose={handleCloseChat} />}
      </div>

      {/* === DESKTOP LAYOUT === */}
      <div className="relative z-10 hidden md:flex flex-col items-center justify-center h-full w-full px-10">
        {/* Logo + Maskot di tengah */}
        <div className="flex justify-center items-center">
          {/* Maskot */}
          <img
            src="/images/tompamelayang.png"
            alt="Maskot"
            className="w-[370px] translate-x-2 translate-y-20 -mt-[10vh]"
          />

          {/* Logo */}
          <img
            src="/images/Sinarupa.png"
            alt="Sinarupa"
            className="w-[400px] -translate-x-25 translate-y-20 -mt-[10vh]"
          />
        </div>

        {/* Tombol DAFTAR & KEONG RACUN */}
        <div className="flex flex-row items-center gap-4 z-20 translate-y-15">
          <Link
            to="/landing"
            className="relative w-[150px] hover:scale-105 transition z-20"
            style={{ zIndex: 20 }}
          >
            <img src="/images/button1.png" alt="Daftar" className="w-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[#FDE36E] font-bold text-lg">DAFTAR</span>
            </div>
          </Link>
          <Link
            onClick={handleOpenChat}
            className="relative w-[150px] hover:scale-105 transition z-20"
            style={{ zIndex: 20 }}
          >
            <img src="/images/button1.png" alt="Daftar" className="w-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[#FDE36E] font-bold text-lg">CHATBOT</span>
            </div>
          </Link>
          <a
            href="https://minigame.sinarupa.com"
            className="relative w-[150px] hover:scale-105 transition z-20"
            style={{ zIndex: 20 }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/images/button1.png" alt="Game" className="w-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[#FDE36E] font-bold text-lg">GAME</span>
            </div>
          </a>
        </div>

        {/* Tombol horizontal center (desktop) */}
        {/* Dihapus agar tidak double tombol DAFTAR */}
        {isChatOpen && <ChatPopup onClose={handleCloseChat} />}
      </div>
    </div>
  );
};

export default HomeSection;
