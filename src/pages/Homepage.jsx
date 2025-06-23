import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="relative w-full min-h-screen bg-[#fec934] overflow-hidden font-sans">
   

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-28 px-4 text-center gap-10">
        

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">

  <div className="text-center sm:text-left">
    <h1 className="text-6xl sm:text-7xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-br from-[#5e35b1] via-[#c158dc] to-[#f06292] drop-shadow-lg">
      <div>Sina</div>
      <div className="-mt-2">rupa</div>
    </h1>
  </div>


  <img
    src="/images/maskot.png"
    alt="Maskot"
    className="w-[160px] sm:w-[200px] md:w-[240px] mt-6 sm:mt-0"
  />
</div>


<div className="flex flex-col sm:flex-row justify-center items-center gap-8 mt-10">
  {["DAFTAR", "MERCH", "CHATBOT", "GAME"].map((label, i) => {
    const links = ["/landing", "#", "#", "#"]; 

    return (
      <Link to={links[i]} key={i} className="relative w-[95%] sm:w-[200px] max-w-[260px] hover:scale-105 transition">
        <img
          src="/images/button1.png"
          alt={`Button ${label}`}
          className="w-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[#FDE36E]  font-bold text-lg">{label}</span>
        </div>
      </Link>
    );
  })}
</div>

      </div>
    </div>
  );
};

export default Homepage;
