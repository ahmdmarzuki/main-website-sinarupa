import React, { useState } from "react";
import { Link } from "react-router-dom";
import AboutSection from "../sections/AboutSection";
// import MajorSection from "../sections/MajorSection";
// import EventPathSection from "../sections/EventPathSection";
// import FaqSection from "../sections/FaqSection";
import ChatPopup from "../components/ChatPopup";
import ModalDisclaimer from "../components/ModalDisclaimer";

const HomeSection = () => {
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
          className="absolute -bottom-45 -left-25 w-[470px] pointer-events-none select-none"
        />

        {/* Tombol DAFTAR */}
        <div className="flex justify-center mt-6 z-20">
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
          {["MERCH", "CHATBOT", "GAME"].map((label, i) => (
            <Link
              to="#"
              key={i}
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
          ))}
        </div>
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
            className="w-[500px] -translate-x-15"
          />
        </div>

        {/* Tombol horizontal center */}
        <div className="flex justify-center gap-6 mt-10 -translate-y-50">
          {["DAFTAR"].map((label, i) => {
            const links = ["/landing"];
            return (
              <Link
                to={links[i]}
                key={i}
                className="relative w-[180px] hover:scale-105 transition"
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
      </div>
    </div>
  );
};

export default HomeSection;
