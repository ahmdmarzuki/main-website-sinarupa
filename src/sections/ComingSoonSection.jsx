import React from "react";

const ComingSoonSection = () => {
  return (
    <div className="relative w-screen min-h-screen flex flex-col items-center justify-center bg-transparent overflow-hidden">
      <div className="flex flex-col items-center justify-center text-center px-6 py-8">
        {/* Gambar Coming Soon dengan efek glow kuning */}
        <img
          src="/images/coming-soon-IT-01.png"
          alt="Coming Soon"
          className="w-80 md:w-[40rem] mb-4 object-contain"
          style={{ filter: 'drop-shadow(0 0 32px #fde36e) drop-shadow(0 0 48px #fde36e)' }}
        />
        {/* Glow kuning di belakang teks */}
        <div className="relative mb-4 flex items-center justify-center">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-16 md:w-[32rem] md:h-20 rounded-full bg-[#fde36e] opacity-60 blur-2xl z-0 pointer-events-none" />
          <p className="text-base md:text-xl text-[#5740d2] font-semibold m-0 px-4">
            Website Sinarupa akan segera hadir!<br />Stay tuned for something amazing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonSection; 