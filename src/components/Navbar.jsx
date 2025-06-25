import React from "react";

const Navbar = () => {
  return (
    <nav
      className="w-full h-[80px] md:h-[120px] relative overflow-hidden flex items-center px-4"
      style={{
        backgroundImage: "url('/images/navbar-revisi.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-row items-center gap-4">
        <img
          src="/images/logo-sinarupa.png"
          alt="Logo Sinarupa"
          className="h-10 md:h-16 w-auto"
          draggable={false}
        />
        <img
          src="/images/sinarupa-orange.png"
          alt="Tulisan Sinarupa"
          className="h-8 md:h-12 w-auto"
          draggable={false}
        />
        <img
          src="/images/logo-pasen.png"
          alt="Logo Pasar Seni"
          className="h-10 md:h-12 w-auto"
          draggable={false}
        />
      </div>
    </nav>
  );
};

export default Navbar;
