
import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="relative min-h-screen w-full text-[#311b92] font-sans overflow-hidden">

      {/* === BACKGROUND === */}
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center md:hidden z-0"
        style={{ backgroundImage: "url('/images/mobilebg.png')" }}
      />
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center hidden md:block z-0"
        style={{ backgroundImage: "url('/images/desktopbg.png')" }}
      />

      {/* === KONTEN === */}
      <div className="relative z-10 px-4 pt-6">
        {/* Judul */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold my-6 inline-block">
            PENDAFTARAN
          </h1>
        </div>

        {/* DAY 1 & DAY 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center items-start mt-10">
          {/* DAY 1 */}
          <div className="flex flex-col items-center transition-transform hover:scale-105 active:scale-95">
            <Link
              to="/form"
              className="relative w-[300px] sm:w-[500px] h-[360px] grid place-items-center bg-no-repeat bg-center bg-contain"
              style={{ backgroundImage: "url('/images/frameday1.png')" }}
            >
              <img
                src="/images/day1.JPG"
                alt="Day 1"
                className="w-[170px] h-[270px] object-cover z-10 -translate-x-2.5 -translate-y-5"
              />
            </Link>
            <div className="text-xl font-extrabold mt-2">DAY 1</div>
          </div>

          {/* DAY 2 */}
          <div className="flex flex-col items-center transition-transform hover:scale-105 active:scale-95">
            <Link
              to="/form"
              className="relative w-[300px] sm:w-[500px] h-[360px] grid place-items-center bg-no-repeat bg-center bg-contain"
              style={{ backgroundImage: "url('/images/frameday2.png')" }}
            >
              <img
                src="/images/day2.JPG"
                alt="Day 2"
                className="w-[170px] h-[270px] object-cover z-10 translate-x-2.5 translate-y-5"
              />
            </Link>
            <div className="text-xl font-extrabold mt-2">DAY 2</div>
          </div>
        </div>

        {/* Side-events Title */}
        <h2 className="mt-24 sm:mt-32 text-3xl font-bold text-left pl-2 sm:pl-6">
          Side-events
        </h2>

        {/* Side-events Section */}
        <div className="relative mt-6 max-w-[1400px] mx-auto px-2">
          {/* Background Frame */}
          <img
            src="/images/framea.png"
            alt="Side Events Frame"
            className="absolute inset-0 w-full h-auto object-contain z-0"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 relative z-10">
            {/* Workshop 1 */}
            <Link
              to="/workshop"
              className="relative aspect-[3/4] w-full transition-transform hover:scale-105 active:scale-95 active:translate-y-1"
            >
              <img
                src="/images/Frame3.png"
                className="absolute top-[90%] left-[55%] -translate-x-1/2 w-[100%] z-10 object-contain"
                alt="Acrylic Pouring Art Workshop"
              />
              <div className="absolute bottom-[10%] left-2 right-2 text-[0.6rem] sm:text-xs md:text-sm text-[#FDE36E] text-justify z-20">
                <h3 className="font-bold text-[#FDE36E]">
                  Acrylic Pouring Art Workshop
                </h3>
                <p>
                Acrylic Pouring Art Workshop Bareng Artemedia. Toko peralatan seni terbaik di Indonesia yang mengajak kamu buat tumpahin isi hati lewat media akrilik yang super satisfying!
                </p>
              </div>
            </Link>

            {/* Workshop 2 */}
            <Link
              to="/workshop"
              className="relative aspect-[3/4] w-full transition-transform hover:scale-105 active:scale-95 active:translate-y-1"
            >
              <img
                src="/images/Frame4.png"
                className="absolute top-[90%] left-[51%] -translate-x-1/2 w-[99%] z-10 object-contain"
                alt="Cyanotype Printing Workshop"
              />
              <div className="absolute bottom-[10%] left-2 right-2 text-[0.6rem] sm:text-xs md:text-sm text-[#FDE36E] text-justify z-20">
                <h3 className="font-bold text-[#FDE36E]">
                  Cyanotype Printing Workshop
                </h3>
                <p>Cyanotype Printing Workshop
Bareng Fauzan Rafli. Bikin karya seni dari sinar matahari dan bawa pulang totebag dengan hasil yang unik buatanmu sendiri!

</p>
              </div>
            </Link>

            {/* Talkshow */}
            <Link
              to="/talkshow"
              className="relative aspect-[3/4] w-full transition-transform hover:scale-105 active:scale-95 active:translate-y-1"
            >
              <img
                src="/images/Frame1.png"
                className="absolute top-[54%] left-[46%] -translate-x-1/2 w-[100%] z-10 object-contain"
                alt="Talkshow - Evan Wijaya"
              />
              <div className="absolute bottom-[10%] left-2 right-2 text-[0.6rem] sm:text-xs md:text-sm text-[#FDE36E] text-justify z-20">
                <h3 className="font-bold text-[#FDE36E]">
                  Talkshow - Evan Wijaya
                </h3>
                <p>
                  "Talkshow: "Menemukan Kekuatan dalam Berekspresi"
Bareng Evan Wijaya desainer poster film ternama seperti Agak Laen dan SORE: Istri dari Masa Depan. Yuk dengerin kisah menarik di balik layar dan temukan semangat berekspresi versi kamu sendiri!

                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

