import React from "react";

const PreEvent = () => {
  return (
    <section id="pre-event">
      <div className="w-screen flex flex-col items-center justify-center font-oddval text-[#5740d2] mt-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-20">Pre-Events</h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full">
          <div className="flex flex-col items-center justify-center w-full md:w-1/2">
            <a
              href="https://langkahsapa.sinarupa.com"
              className="flex justify-center w-full"
            >
              <img
                src="/images/PreEvent1.png"
                className="w-5/6 md:w-4/5 mx-auto rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer"
              />
            </a>
            <h1 className="text-4xl md:text-4xl font-bold font-oddval text-[#5740d2] mt-4 text-center">
              Langkah Sapa
            </h1>
          </div>
          <div className="flex flex-col items-center justify-center w-full md:w-1/2">
            <a
              href="https://www.instagram.com/reel/DK_tbnyzynV/?igsh=MXVybXZ6ejdta21ycA=="
              className="flex justify-center w-full"
            >
              <img
                src="/images/PreEvent2.png"
                className="w-5/6 md:w-4/5 mx-auto rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer"
              />
            </a>
            <h1 className="text-4xl md:text-4xl font-bold font-oddval text-[#5740d2] mt-4 text-center">
              Ruang Jumpa
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreEvent;
