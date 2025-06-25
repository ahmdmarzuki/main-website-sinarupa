import React from "react";

const Footer = () => {
  return (
    <footer
      className="text-white py-10 px-4 relative z-0"
      style={{
        backgroundImage: "url('/images/footer-website.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-2xl mx-auto flex flex-col items-center relative z-10">
        {/* Info utama */}
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-2xl font-bold mb-2">Info lebih lanjut</h1>
          <h2 className="text-lg font-semibold mb-4">Media Sosial</h2>
        </div>
        {/* Social media */}
        <div className="flex flex-row items-center justify-center gap-8 mb-6">
          <a
            href="https://www.instagram.com/sinarupa2025?igsh=dDZhajB0aXdjempo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:underline"
          >
            <img
              src="/images/Instagram.png"
              className="w-8 h-8 filter grayscale"
              alt="Instagram"
              style={{ filter: "invert(1)" }}
            />
            <span className="font-medium hidden sm:inline">@sinarupa2025</span>
          </a>
          <a
            href="https://x.com/TPBFSRDITB2024?t=fs6E9EfxY-PaLJeUEra2kw&s=09"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:underline"
          >
            <img
              src="/images/XTwitter.png"
              className="w-8 h-8 filter grayscale"
              alt="XTwitter"
              style={{ filter: "invert(1)" }}
            />
            <span className="font-medium hidden sm:inline">
              @TPBFSRDITB2024
            </span>
          </a>
          <a
            href="https://www.tiktok.com/@sinarupa25?_t=ZS-8w4cf6sbyl6&_r=1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:underline"
          >
            <img
              src="/images/TikTok.png"
              className="w-8 h-8 filter grayscale"
              alt="TikTok"
              style={{ filter: "invert(1)" }}
            />
            <span className="font-medium hidden sm:inline">@sinarupa25</span>
          </a>
        </div>
        {/* Sponsor */}
        <div className="flex flex-col items-center w-full mb-6">
          <h1 className="text-xl font-bold text-center mb-2">Sponsorship</h1>
          <div className="relative w-2/3 max-w-2xl mx-auto flex justify-center items-center">
            {/* <img src="/images/FooterBanner.png" className="w-full h-auto object-contain" alt="Footer Banner" /> */}
            <img
              src="/images/Sponsors.png"
              className="w-auto h-auto max-w-[100%] max-h-[3060px] object-contain"
              alt="Sponsors"
            />
          </div>
        </div>
        {/* Info lokasi & copyright */}
        <div className="flex flex-col items-center text-center text-sm gap-1">
          <span className="font-semibold">
            Gedung Serba Guna, ITB Kampus Jatinangor
          </span>
          <span className="font-semibold">
            all rights to Sinarupa TPB FSRD 2025
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
