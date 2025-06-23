import React from "react";

const Contact = () => {
  return (
    <section
      id="contact"
      className="w-full py-20 text-[#5740d2] flex flex-col items-center"
    >
      <h1 className="text-4xl font-bold mb-2">More Info!</h1>
      <h2 className="text-2xl font-bold mb-8">Contact Us!</h2>
      <div className="flex flex-col md:flex-row gap-8 mb-10">
        <div className="flex items-center">
          <img
            src="/images/TikTok.png"
            className="w-10 h-10 mr-3"
            alt="TikTok"
          />
          <span className="text-2xl font-bold">@sinarupa25</span>
        </div>
        <div className="flex items-center">
          <img
            src="/images/XTwitter.png"
            className="w-10 h-10 mr-3"
            alt="Twitter"
          />
          <span className="text-2xl font-bold">@TPBFSRDITB2024</span>
        </div>
        <div className="flex items-center">
          <img
            src="/images/Instagram.png"
            className="w-10 h-10 mr-3"
            alt="Instagram"
          />
          <span className="text-2xl font-bold">@sinarupa2025</span>
        </div>
      </div>
      <div className="flex flex-col items-center mb-8">
        <h3 className="text-md font-bold">
          Gedung Serba Guna, ITB Kampus Jatinangor
        </h3>
        <h3 className="text-md font-bold">
          all rights to Sinarupa TPB FSRD 2025
        </h3>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold whitespace-pre text-center mb-6">
          Special Thanks to {"\n"} our sponsors!
        </h1>
        <div className="relative w-2/3 h-auto sm:w-1/2 md:w-1/2 lg:w-1/2 flex justify-center items-center">
          <img
            src="/images/FooterBanner.png"
            className="w-full h-auto object-contain"
            alt="Footer Banner"
          />
          <img
            src="/images/Sponsors.png"
            className="absolute mt-5 top-1/3 left-1/2 w-auto h-auto transform -translate-x-1/2 -translate-y-1/2 object-contain"
            alt="Sponsors"
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
