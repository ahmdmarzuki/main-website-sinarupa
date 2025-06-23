import React, { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const menuDesktop = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];
  const menuMobile = [
    ...menuDesktop,
    { label: "Merch", href: "#merch" },
    { label: "Game", href: "#game" },
  ];

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-purple-700 py-4 px-6 flex items-center justify-between shadow-md">
      <div className="text-white font-bold text-xl">Sinarupa</div>
      {/* Desktop menu */}
      <div className="hidden md:flex gap-6">
        {menuDesktop.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="text-white hover:text-yellow-300 font-medium transition"
          >
            {item.label}
          </a>
        ))}
      </div>
      {/* Burger menu mobile */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        <span
          className={`block w-7 h-1 bg-white rounded transition-all duration-200 ${
            open ? "rotate-45 translate-y-2" : "mb-1"
          }`}
        ></span>
        <span
          className={`block w-7 h-1 bg-white rounded transition-all duration-200 ${
            open ? "opacity-0" : "mb-1"
          }`}
        ></span>
        <span
          className={`block w-7 h-1 bg-white rounded transition-all duration-200 ${
            open ? "-rotate-45 -translate-y-2" : ""
          }`}
        ></span>
      </button>
      {/* Mobile dropdown menu */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-purple-700 shadow-md flex flex-col items-center py-4 md:hidden animate-fade-in z-50">
          {menuMobile.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-white hover:text-yellow-300 font-medium transition py-2 text-lg w-full text-center"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
