import React from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "../useMediaQuery";

import bgDesktop from "/images/bg_desktop.png";
import bgMobile from "/images/bg_mobile.png";

const LandingPage = () => {
  const isMobile = useMediaQuery("(max-width: 900px)");

  return (
    <div
      className="relative min-h-[250vh] w-full text-[#311b92] font-sans overflow-hidden bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${isMobile ? bgMobile : bgDesktop})` }}
    >
      <div className="relative z-10 px-4 pt-6">
        {/* === Judul === */}
        <div className="text-center font-oddval">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold my-6">
            PENDAFTARAN
          </h1>
        </div>

        {/* === DAY 1 & DAY 2 === */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-10 mt-10">
          {/* DAY 1 */}
          <div className="flex flex-col items-center transition-transform hover:scale-105 active:scale-95">
            <Link
              to="/form"
              className="relative w-[280px] sm:w-[360px] md:w-[420px] h-[400px] sm:h-[480px] bg-no-repeat bg-center bg-contain"
              style={{ backgroundImage: "url('/images/day01.png')" }}
            >
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-2xl font-extrabold text-[#311b92]">
                DAY 1
              </div>
            </Link>
          </div>

          {/* DAY 2 */}
          <div className="flex flex-col items-center transition-transform hover:scale-105 active:scale-95 sm:-ml-6 md:-ml-10">
            <Link
              to="/form"
              className="relative w-[280px] sm:w-[360px] md:w-[420px] h-[400px] sm:h-[480px] bg-no-repeat bg-center bg-contain"
              style={{ backgroundImage: "url('/images/day02.png')" }}
            >
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-2xl font-extrabold text-[#311b92]">
                DAY 2
              </div>
            </Link>
          </div>
        </div>

        {/* === Side-events === */}
        <h2 className="mt-20 text-3xl font-bold text-left pl-2 sm:pl-6">
          Side-events
        </h2>

        <div className="relative mt-6 max-w-[1200px] mx-auto px-2">
          {/* Background frame */}
          <img
            src="/images/frame123.png"
            alt="Side Events Frame"
            className="absolute inset-0 w-full h-auto object-contain z-0 pointer-events-none"
          />

          {/* === DESKTOP Layout (3 kolom) === */}
          <div className="hidden sm:flex relative z-10 flex-row gap-6 items-end justify-center">
            {/* Kolom 1 */}
            <div className="relative w-[360px] h-[480px] bg-contain bg-center bg-no-repeat">
              <div className="absolute -bottom-15 left-6 right-8 text-[#FDE36E] text-sm leading-relaxed text-justify">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSed0dNdOOc6NyQJfpTV1naqxw06b5qITg96-rn_0jBKLdOVAw/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-bold text-lg mb-1 underline hover:text-yellow-300 text-left"
                >
                  Acrylic Pouring Art
                </a>
                <p>
                  Acrylic Pouring Art Workshop bareng Artemedia. Toko peralatan
                  seni terbaik di Indonesia yang mengajak kamu buat tumpahin isi
                  hati lewat media akrilik yang super satisfying!
                </p>
              </div>
            </div>

            {/* Kolom 2 */}
            <div className="relative w-[360px] h-[480px] bg-[url('/images/fauzan.png')] bg-contain bg-center bg-no-repeat">
              <div className="absolute bottom-70 left-9 right-4 text-[#FDE36E] text-sm leading-relaxed text-justify">
                <a
                  href="https://forms.gle/64Q81Qp7t6eUcW2P8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-bold text-lg mb-1 underline hover:text-yellow-300 text-left"
                >
                  Cyanotype Workshop
                </a>
                <p>
                  Cyanotype Printing Workshop bareng Fauzan Rafli. Bikin karya
                  seni dari sinar matahari dan bawa pulang totebag dengan hasil
                  yang unik buatanmu sendiri!
                </p>
              </div>
            </div>

            {/* Kolom 3 */}
            <div className="relative w-[360px] h-[480px] bg-[url('/images/evan.png')] bg-contain bg-center bg-no-repeat">
              <div className="absolute -bottom-32 left-2 right-1 text-[#FDE36E] text-sm leading-relaxed text-justify">
                <h3 className="font-bold text-lg mb-1 text-left">
                  Talkshow Evan
                </h3>
                <p>
                  Talkshow: "Menemukan Kekuatan dalam Berekspresi" bareng Evan
                  Wijaya, desainer poster film seperti Agak Laen dan SORE.
                  Dengerin kisah inspiratifnya dan temukan semangat berekspresi
                  versi kamu!
                </p>
              </div>
            </div>
          </div>

          {/* === MOBILE Layout (3 kolom horizontal) === */}
          <div className="sm:hidden relative z-10 grid grid-cols-3 gap-2 px-2 mt-6">
            {/* Acrylic */}
            <div className="relative w-full h-[200px]">
              <div className="absolute -bottom-13 left-1 right-1 text-[#FDE36E] text-[8px] leading-snug text-justify">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSed0dNdOOc6NyQJfpTV1naqxw06b5qITg96-rn_0jBKLdOVAw/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-bold underline hover:text-yellow-300 mb-1"
                >
                  Acrylic Pouring Art
                </a>
                <p>
                  Acrylic Pouring Art Workshop Bareng Artemedia. Toko peralatan
                  seni terbaik di Indonesia yang mengajak kamu buat tumpahin isi
                  hati lewat media akrilik yang super satisfying!
                </p>
              </div>
            </div>

            {/* Cyanotype */}
            <div className="relative w-full h-[200px]">
              <div className="absolute top-8 left-1 -right-1 text-[#FDE36E] text-[8px] leading-snug text-justify">
                <a
                  href="https://forms.gle/64Q81Qp7t6eUcW2P8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-bold underline hover:text-yellow-300 mb-1"
                >
                  Cyanotype Workshop
                </a>
                <p>
                  Cyanotype Printing Workshop Bareng Fauzan Rafli. Bikin karya
                  seni dari sinar matahari dan bawa pulang totebag dengan hasil
                  yang unik buatanmu sendiri!
                </p>
              </div>
            </div>

            {/* Talkshow */}
            <div className="relative w-full h-[200px]">
              <div className="absolute -bottom-20 left-1 -right-3 text-[#FDE36E] text-[7px] leading-snug text-justify">
                <h3 className="font-bold mb-1">Talkshow Evan</h3>
                <p>
                  Talkshow: "Menemukan Kekuatan dalam Berekspresi" Bareng Evan
                  Wijaya desainer poster film ternama seperti Agak Laen dan
                  SORE: Istri dari Masa Depan. Yuk dengerin kisah menarik di
                  balik layar dan temukan semangat berekspresi versi kamu
                  sendiri!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="bg-amber-100 flex flex-row p-4 my-50">
          <div className="flex flex-col">
            <div>
              <img src="/images" alt="" />
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSed0dNdOOc6NyQJfpTV1naqxw06b5qITg96-rn_0jBKLdOVAw/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="block font-bold text-lg mb-1 underline hover:text-yellow-300 text-left"
              >
                Acrylic Pouring Art
              </a>
              <p>
                Acrylic Pouring Art Workshop bareng Artemedia. Toko peralatan
                seni terbaik di Indonesia yang mengajak kamu buat tumpahin isi
                hati lewat media akrilik yang super satisfying!
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <div>
              <a
                href="https://forms.gle/64Q81Qp7t6eUcW2P8"
                target="_blank"
                rel="noopener noreferrer"
                className="block font-bold text-lg mb-1 underline hover:text-yellow-300 text-left"
              >
                Cyanotype Workshop
              </a>
              <p>
                Cyanotype Printing Workshop bareng Fauzan Rafli. Bikin karya
                seni dari sinar matahari dan bawa pulang totebag dengan hasil
                yang unik buatanmu sendiri!
              </p>
            </div>
            <img
              src="/images/fauzan.png"
              alt="Fauzan Rafli"
              className="w-full h-auto mt-2"
            />
          </div>
          <div className="flex flex-col">
            <div>
              <h3 className="font-bold text-lg mb-1 text-left">
                Talkshow Evan
              </h3>
              <p>
                Talkshow: "Menemukan Kekuatan dalam Berekspresi" bareng Evan
                Wijaya, desainer poster film seperti Agak Laen dan SORE.
                Dengerin kisah inspiratifnya dan temukan semangat berekspresi
                versi kamu!
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default LandingPage;
