import React from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "../useMediaQuery";
import bgDesktop from "/images/bg_desktop.png";
import bgMobile from "/images/bg_mobile.png";

const LandingPage = () => {
  const isMobile = useMediaQuery("(max-width: 1000px)");

  return (
    <div
      style={{ backgroundImage: `url('/images/regis.png')` }}
      className="relative min-h-[200vh] w-full text-[#4f3dce] font-host overflow-hidden bg-cover bg-no-repeat"
    >
      <div className="relative z-10 px-4 pt-6">
    {/* === Judul === */}
<div className="text-center font-oddval">
  {/* MOBILE: tampil untuk layar <640px */}
  <h1 className="text-5xl font-extrabold my-4 sm:hidden">
    PENDAFTARAN
  </h1>

  {/* DESKTOP: tampil untuk layar >=640px */}
  <h1 className="hidden sm:block text-5xl md:text-6xl font-extrabold my-6">
    PENDAFTARAN
  </h1>
</div>

        {/* === DAY 1 & DAY 2 === */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-10 mt-10">
{/* MOBILE */}
<Link
    to="/form"
    className="relative w-[500px] h-[600px] sm:hidden -mt-35"
    style={{
      backgroundImage: "url('/images/regist.png')",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    }}
  />

  {/* DESKTOP */}
  <Link
    to="/form"
    className="hidden sm:block relative w-[300px] md:w-[700px] h-[900px] bg-no-repeat bg-center -mt-52"
    style={{
      backgroundImage: "url('/images/regist.png')",
      backgroundSize: "contain",
    }}
  />
</div>

  
  <Link
  to="/form"
  className="relative mt-4 w-[200px] h-[60px] hover:scale-105 transition-transform"
>
</Link>



        {/* === Side-events Title */}
        <h2 className="-mt-10 sm:-mt-40 text-3xl font-bold font-oddval text-center sm:text-left pl-0 sm:pl-6">
  Side-events
</h2>


        {/* Side-events Section */}
        <div className="relative mt-6 max-w-5xl mx-auto px-2">
          {/* Satu background ungu untuk seluruh grid card */}
          <div
            className="absolute inset-0 w-full h-full z-0 rounded-xl overflow-hidden"
            style={{
              backgroundImage: "url('/images/bg-ungu.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <div className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSed0dNdOOc6NyQJfpTV1naqxw06b5qITg96-rn_0jBKLdOVAw/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl shadow-2xl hover:shadow-3xl p-4 flex flex-col items-center relative overflow-hidden transition-shadow duration-300 cursor-pointer hover:opacity-80"
                style={{
                  backgroundImage: "url('/images/bg-ungu.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  textDecoration: "none",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{ background: "rgba(255,255,255,0.5)", zIndex: 0 }}
                />
                <div className="relative z-10 w-full flex flex-col items-center">
                  <img
                    src="/images/Frame3.png"
                    alt="Acrylic Pouring Art"
                    className="w-full max-h-40 object-contain mb-2"
                  />
                  <h3 className="font-bold text-[#5740d2] text-lg mb-2 font-oddval">
                    Acrylic Pouring Art
                  </h3>
                  <p className="text-sm text-[#5740d2] text-justify font-host ">
                    Acrylic Pouring Art Workshop Bareng Artemedia. Toko
                    peralatan seni terbaik di Indonesia yang mengajak kamu buat
                    tumpahin isi hati lewat media akrilik yang super satisfying!
                  </p>
                </div>
              </a>
              {/* Card 2 */}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdFL8GIneQJrlgvcjiEa-dnBOT1sZYdn1x0COb1ZC7mNfOygg/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl shadow-2xl hover:shadow-3xl p-4 flex flex-col items-center relative overflow-hidden transition-shadow duration-300 cursor-pointer hover:opacity-80"
                style={{
                  backgroundImage: "url('/images/bg-ungu.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  textDecoration: "none",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{ background: "rgba(255,255,255,0.5)", zIndex: 0 }}
                />
                <div className="relative z-10 w-full flex flex-col items-center">
                  <img
                    src="/images/frame-cyanotype.png"
                    alt="Cyanotype Workshop"
                    className="w-full max-h-40 object-contain mb-2"
                  />
                  <h3 className="font-bold text-[#5740d2] text-lg font-host mb-2 font-oddval">
                    Cyanotype Workshop
                  </h3>
                  <p className="text-sm text-[#5740d2] font-host text-justify font-host">
                    Cyanotype Printing Workshop Bareng Fauzan Rafli. Bikin karya
                    seni dari sinar matahari dan bawa pulang totebag dengan
                    hasil yang unik buatanmu sendiri!
                  </p>
                </div>
              </a>

              {/* Card 3 */}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSerMAXI1MbG4rR5SgMIMnLyP7tc2xZDWqntfHajsVSRtZqorg/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl shadow-2xl hover:shadow-3xl p-4 flex flex-col items-center relative overflow-hidden transition-shadow duration-300 cursor-pointer hover:opacity-80"
                style={{
                  backgroundImage: "url('/images/bg-ungu.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  textDecoration: "none",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{ background: "rgba(255,255,255,0.5)", zIndex: 0 }}
                />
                <div className="relative z-10 w-full flex flex-col items-center">
                  <img
                    src="/images/Frame1.png"
                    alt="Talkshow Evan"
                    className="w-full max-h-40 object-contain mb-2"
                  />
                  <h3 className="font-bold text-[#5740d2] text-lg mb-2 font-oddval">
                    Talkshow Evan
                  </h3>
                  <p className="text-sm font-host text-[#5740d2] text-justify">
                    Talkshow: "Menemukan Kekuatan dalam Berekspresi" Bareng Evan
                    Wijaya desainer poster film ternama seperti Agak Laen dan
                    SORE: Istri dari Masa Depan. Yuk dengerin kisah menarik di
                    balik layar dan temukan semangat berekspresi versi kamu
                    sendiri!
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>


  );
};

export default LandingPage;
