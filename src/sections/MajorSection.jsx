import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const majors = [
  {
    name: "Seni Rupa",
    desc: "Fine Arts",
    href: "#seni-rupa",
  },
  {
    name: "Desain Produk",
    desc: "Product Design",
    href: "#desain-produk",
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
  const [activeIdx, setActiveIdx] = useState(2); // start from center
  const scrollRef = useRef(null);
  const cardRefs = useRef([]);
  const navigate = useNavigate();

  // Snap to active card on change
  useEffect(() => {
    if (cardRefs.current[activeIdx]) {
      cardRefs.current[activeIdx].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeIdx]);

  // Handle click: if card aktif, redirect ke href, kalau tidak, set aktif
  const handleCardClick = (idx, href) => {
    if (idx === activeIdx) {
      navigate(href);
    } else {
      setActiveIdx(idx);
    }
  };

  // Navigasi panah
  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? majors.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setActiveIdx((prev) => (prev === majors.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center py-8 ">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
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
          {/* Dummy div untuk space kiri */}
          <div
            style={{ minWidth: 110, maxWidth: 110, pointerEvents: "none" }}
            aria-hidden="true"
          />
          {majors.map((major, idx) => (
            <div
              key={major.name}
              ref={(el) => (cardRefs.current[idx] = el)}
              className={`transition-all duration-300 flex flex-col items-center px-4 sm:px-6 cursor-pointer select-none
                ${
                  idx === activeIdx
                    ? "bg-blue-600 text-white shadow-lg h-56 z-10 scale-110 sm:scale-110 border-4 border-blue-400"
                    : "bg-gray-200 text-gray-700 h-40 sm:h-44 opacity-70 hover:opacity-100"
                }
                rounded-xl justify-end relative
                sm:mx-0 mx-2
              `}
              style={{
                minWidth: 200,
                maxWidth: 220,
                scrollSnapAlign: "center",
                boxShadow:
                  idx === activeIdx ? "0 8px 32px rgba(0,0,0,0.15)" : undefined,
              }}
              onClick={() => handleCardClick(idx, major.href)}
            >
              <span className="text-lg font-bold mb-2 mt-6">{major.name}</span>
              {/* <span className="text-sm mb-6">{major.desc}</span> */}
              {idx === activeIdx && (
                <div className="absolute top-2 right-2 bg-white/30 rounded-full px-3 py-1 text-xs font-semibold">
                  Active
                </div>
              )}
            </div>
          ))}
          {/* Dummy div untuk space kanan */}
          <div
            style={{ minWidth: 110, maxWidth: 110, pointerEvents: "none" }}
            aria-hidden="true"
          />
        </div>
        <button
          onClick={handleNext}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-xl hidden sm:block"
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
