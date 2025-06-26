import React from "react";

const MerchSection = () => {
  return (
    <><div>
      <div className="flex flex-col items-center justify-center mt-15">
        <h1 className="text-4xl font-bold text-[#5740d2]">Merchandise</h1>
      </div>
    </div>
    <div className="relative w-6/7 max-w-lg mx-auto flex items-center justify-center mt-10 mb-40 px-4">
      <img
        src="/images/MerchCatalogue.jpg"
        className="w-full object-contain mx-auto"
        alt="Merch Catalogue"
      />
      <img
        src="/images/TompaMerch.png"
        className="absolute -left-7 bottom-[-15px] w-1/4 h-auto object-cover md:-left-20 md:bottom-5 md:w-1/4 md:h-1/4 md:object-cover -rotate-12"
        alt="Tompa Merch"
      />
    </div>
    </>
  );
};

export default MerchSection;
