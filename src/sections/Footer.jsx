import React from "react";

const Footer = () => {
  return (
    <footer
      className="text-white py-10 px-4 relative"
      style={{
        backgroundImage: "url('/images/footer-website.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="max-w-2xl mx-auto flex flex-col items-center relative z-10">
        {/* Info utama */}
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-2xl font-bold mb-2">More Info!</h1>
          <h2 className="text-lg font-semibold mb-4">Contact Us!</h2>
        </div>
        {/* Social media */}
        <div className="flex flex-row items-center justify-center gap-8 mb-6">
          <div className="flex items-center gap-2">
            <img src="/images/Instagram.png" className="w-8 h-8 filter grayscale" alt="Instagram" style={{ filter: 'invert(1)' }} />
            <span className="font-medium hidden sm:inline">@sinarupa2025</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="/images/XTwitter.png" className="w-8 h-8 filter grayscale" alt="XTwitter" style={{ filter: 'invert(1)' }} />
            <span className="font-medium hidden sm:inline">@TPBFSRDITB2024</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="/images/TikTok.png" className="w-8 h-8 filter grayscale" alt="TikTok" style={{ filter: 'invert(1)' }} />
            <span className="font-medium hidden sm:inline">@sinarupa25</span>
          </div>
        </div>
        {/* Sponsor */}
        <div className="flex flex-col items-center w-full mb-6">
          <h1 className="text-xl font-bold text-center mb-2">Special Thanks to our sponsors!</h1>
          <div className="relative w-2/3 max-w-2xl mx-auto flex justify-center items-center">
            {/* <img src="/images/FooterBanner.png" className="w-full h-auto object-contain" alt="Footer Banner" /> */}
            <img src="/images/Sponsors.png" className="w-auto h-auto max-w-[100%] max-h-[3060px] object-contain" alt="Sponsors" />
          </div>
        </div>
        {/* Info lokasi & copyright */}
        <div className="flex flex-col items-center text-center text-sm gap-1">
          <span className="font-semibold">Gedung Serba Guna, ITB Kampus Jatinangor</span>
          <span className="font-semibold">all rights to Sinarupa TPB FSRD 2025</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
