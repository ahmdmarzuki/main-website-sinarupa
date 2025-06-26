import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const majors = [
  {
    name: "Seni Rupa",
    desc: "Fine Arts",
    href: "SR",
  },
  {
    name: "Desain Produk",
    desc: "Product Design",
    href: "DP",
  },
  {
    name: "Desain Interior",
    desc: "Interior Design",
    href: "DI",
  },
  {
    name: "Desain Komunikasi Visual",
    desc: "Visual Communication Design",
    href: "/dkv",
  },
  {
    name: "Kriya",
    desc: "Crafts",
    href: "/kriyaarsip",
  },
];

const MajorSection = () => {
  const [activeIdx, setActiveIdx] = useState(2);
  const scrollRef = useRef(null);
  const cardRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cardRefs.current[activeIdx]) {
      cardRefs.current[activeIdx].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeIdx]);

  const handleCardClick = (idx, href) => {
    if (idx === activeIdx) {
      navigate(href);
    } else {
      setActiveIdx(idx);
    }
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? majors.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === majors.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center py-8">
      <h2 className="text-4xl font-oddval font-bold mb-6 text-center text-gray-800">
        Prodi
      </h2>
      <div className="flex items-center gap-2 w-full justify-center md:px-16">
        <button
          onClick={handlePrev}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-xl hidden sm:block"
          aria-label="Previous"
        >
          &#8592;
        </button>
        <div
          ref={scrollRef}
          className="w-full flex gap-4 overflow-x-auto no-scrollbar py-4 sm:justify-center sm:gap-4 scroll-px-6 sm:scroll-px-0"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {/* Dummy kiri */}
          <div
            style={{ minWidth: 110, maxWidth: 110, pointerEvents: "none" }}
            aria-hidden="true"
          />
       {majors.map((major, idx) => (
  <div
    key={major.name}
    ref={(el) => (cardRefs.current[idx] = el)}
    className={`transition-all duration-300 flex flex-col items-center justify-end cursor-pointer select-none
      ${idx === activeIdx ? "scale-110 border-4 border-blue-400 z-10" : "opacity-70 hover:opacity-100"}
      rounded-xl relative sm:mx-0 mx-2 overflow-hidden bg-cover bg-center text-white h-64`}
    style={{
      minWidth: 200,
      maxWidth: 220,
      scrollSnapAlign: "center",
      backgroundImage: "url('/images/prodi.png')",
      boxShadow: idx === activeIdx ? "0 8px 32px rgba(0,0,0,0.15)" : undefined,
    }}
    onClick={() => handleCardClick(idx, major.href)}
  >
    {/* Overlay hitam transparan */}
    <div className="absolute inset-0 bg-black/30 z-0" />

    {/* Nama Prodi */}
    <div className="relative z-10 px-4 py-4 font-oddval text-center">
      <span className="text-base font-bold">{major.name}</span>
    </div>

    {/* Label Active */}
    {idx === activeIdx && (
      <div className="absolute top-2 right-2 bg-white/30 backdrop-blur-md rounded-full px-3 py-1 text-xs font-semibold z-10">
        Active
      </div>
    )}
  </div>
))}

          {/* Dummy kanan */}
          <div
            style={{ minWidth: 110, maxWidth: 110, pointerEvents: "none" }}
            aria-hidden="true"
          />
        </div>
        <button
          onClick={handleNext}
          className="p-2 rounded-full text-xl hidden sm:block"
          aria-label="Next"
        >
          &#8594;
        </button>
      </div>
      <div className="text-xs text-gray-500 mt-2">
        Klik card untuk menuju halaman karya
      </div>
    </div>
  );
};

export default MajorSection;
