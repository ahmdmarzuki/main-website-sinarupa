import React from "react";

const MasonryGrid = () => {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-5 py-10 md:py-20 px-20 gap-4 bg-amber-200 min-h-screen">
      <div className="bg-blue-300 mb-4 break-inside-avoid w-full h-60 rounded"></div>
      <div className="bg-blue-300 mb-4 break-inside-avoid w-full h-30 rounded"></div>
      <div className="bg-blue-300 mb-4 break-inside-avoid w-full h-20 rounded"></div>
      <div className="bg-blue-300 mb-4 break-inside-avoid w-full h-60 rounded"></div>
      <div className="bg-blue-300 mb-4 break-inside-avoid w-full h-30 rounded"></div>
      <div className="bg-blue-300 mb-4 break-inside-avoid w-full h-50 rounded"></div>
      <div className="bg-blue-300 mb-4 break-inside-avoid w-full h-50 rounded"></div>
      <div className="bg-blue-300 mb-4 break-inside-avoid w-full h-50 rounded"></div>
      <div className="bg-blue-300 mb-4 break-inside-avoid w-full h-50 rounded"></div>
      <div className="bg-blue-300 mb-4 break-inside-avoid w-full h-20 rounded"></div>
    </div>
  );
};

export default MasonryGrid;
