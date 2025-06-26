import React from "react";

const MapsLocationSection = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center relative ml-10 mt-[20vh] lg:mt-[50vh]">
        <h1 className="text-5xl font-bold text-[#5740d2] font-oddval lg:py-10 mb-4 mr-10">Flow</h1>
        <div className="relative w-full md:w-1/3 flex flex-col md:flex-row items-center justify-center gap-10 mr-10">
          <img src="/images/Flow1.png"/>
          <img src="/images/Flow2.png"/>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center relative mr-20n mt-20">
        <h1 className="text-4xl font-bold text-[#5740d2] font-oddval mb-4"></h1>
        <img src="/images/loc.png" className="w-[500px] md:w-[1000px]" alt="Peta GSG" />
      </div>
      <div className="flex flex-col items-center justify-center relative">
        <h1 className="text-5xl font-bold text-[#5740d2] font-oddval mt-15 mb-5">Rundown</h1>
        <h2 className="text-4xl font-bold text-[#5740d2] font-oddval mb-4">Day 1</h2>
        <img src="/images/RundownDay1.png" className="w-11/12 md:w-1/2 h-auto object-cover mb-5" alt="Rundown Day 1"/>
        <h2 className="text-4xl font-bold text-[#5740d2] font-oddval mb-4">Day 2</h2>
        <img src="/images/RundownDay2.png" className="w-11/12 md:w-1/2 h-auto object-cover" alt="Rundown Day 2"/>
      </div>
    </>
  );
};

export default MapsLocationSection;
