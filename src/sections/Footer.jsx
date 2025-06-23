// import React from "react";

const Footer = () => {
  return (
    <div>
      <div
        id="contact"
        className="flex flex-col items-start justify-center min-h-screen md:items-center text-[#5740d2]"
      >
        <h1 className="text-4xl font-bold">More Info!</h1>
        <h2 className="text-2xl font-bold mt-2">Contact Us!</h2>
      </div>
      <div className="flex flex-col items-start md:items-center justify-center ml-20 text-[#5740d2]">
        <div className="flex items-center mt-5">
          <img src="/images/TikTok.png" className="w-10 h-10 mr-3" />
          <h3 className="text-2xl font-bold md:mr-10 md:text-center">
            @sinarupa25
          </h3>
        </div>
        <div className="flex items-center mt-5">
          <img src="/images/XTwitter.png" className="w-10 h-10 mr-3" />
          <h3 className="text-2xl font-bold md:mr-10 md:text-center">
            @TPBFSRDITB2024
          </h3>
        </div>
        <div className="flex items-center mt-5">
          <img src="/images/Instagram.png" className="w-10 h-10 mr-3" />
          <h3 className="text-2xl font-bold md:mr-10 md:text-center">
            @sinarupa2025
          </h3>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-[#5740d2] mt-10">
        <h1 className="text-4xl font-bold whitespace-pre text-center">
          Special Thanks to {"\n"} our sponsors!
        </h1>
        <div className="relative w-2/3 h-auto sm:w-1/2 md:w-1/2 lg:w-1/2 justify-center items-center mt-10">
          <img
            src="/images/FooterBanner.png"
            className="w-full h-auto object-contain"
          />
          <img
            src="/images/Sponsors.png"
            className="absolute mt-5 top-1/3 left-1/2 w-auto h-auto transform -translate-x-1/2 -translate-y-1/2 object-contain"
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-[#5740d2]">
        <h3 className="text-md font-bold">
          Gedung Serba Guna, ITB Kampus Jatinangor
        </h3>
        <h3 className="text-md font-bold">
          all rights to Sinarupa TPB FSRD 2025
        </h3>
      </div>
    </div>
  );
};

export default Footer;
