import React from "react";
import MerchSection from "./MerchSection";
import MapsLocationSection from "./MapsLocationSection";
import Footer from "./Footer";

const AboutSection = () => {
  return (
    <>
      <div className="flex flex-col items-start justify-start relative mt-10 ml-8">
        <h1 className="text-4xl font-bold text-[#5740d2]">ABOUT</h1>
        <p className="text-lg text-[#5740d2] whitespace-pre-line">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.{"\n"} Sint sapiente maxime culpa repudiandae rem, mollitia voluptas iure maiores officia. {"\n"} Cupiditate perferendis minus ad rem beatae autem? Qui voluptatum sed et!
        </p>
      </div>
      <div className="flex items-center gap-4 mt-10">
        <img src="/images/Jam.png" className="w-32 h-32 ml-15 mt-2"/>
        <div>
          <h1 className="text-4xl font-bold text-[#5740d2]">DATE</h1>
          <p className="text-xl font-bold text-[#5740d2]">28 – 29 Juni 2025</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 mt-10">
        <div>
          <h1 className="text-4xl font-bold text-[#5740d2]">LOCATION</h1>
          <p className="text-lg font-bold text-[#5740d2]">GSG ITB Jatinangor</p>
        </div>
        <img src="/images/Maps.png" className="w-32 h-32 mt-2"/>
      </div>
      <MerchSection></MerchSection>
      <MapsLocationSection></MapsLocationSection>
      <Footer></Footer>
    </>
  )
};

export default AboutSection;
