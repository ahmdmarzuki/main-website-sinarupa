import React, { useEffect, useState } from "react";
import Hamburger from "hamburger-react";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
  const burgerMenuList = [
    { title: "Home", href: "home" },
    { title: "About", href: "about" },
    { title: "Flow", href: "flow" },
    { title: "Lokasi", href: "lokasi" },
    { title: "Rundown", href: "rundown" },
    { title: "Pre Event", href: "pre-event" },
    { title: "Linimasa", href: "linimasa" },
    { title: "Prodi", href: "prodi" },
    { title: "Past Event", href: "past-event" },
  ];

  const [open, setOpen] = useState(false);
  const [hide, setHide] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setHide(true); // Scroll ke bawah
      } else {
        setHide(false); // Scroll ke atas
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="fixed flex flex-col w-screen z-50">
      <nav
        className="w-full h-[80px] md:h-[120px] relative overflow-hidden justify-between flex items-center px-4"
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
        <div className="mr-2">
          <Hamburger color="white" size={18} toggle={setOpen} toggled={open} />
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <div className="w-screen flex justify-end">
            <motion.div
              initial={{ x: 48, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              exit={{ x: 48, opacity: 0 }}
              transition={{ ease: "easeInOut", duration: 0.5 }}
              className="w-fit py-4 m-2 rounded-md bg-[#5740d2] bg-no-repeat bg-cover bg-top"
            >
              {burgerMenuList.map((nav, index) => (
                <motion.div
                  initial={{ x: 48, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  exit={{ x: 48, opacity: 0 }}
                  transition={{ ease: "easeInOut", duration: 0.5 }}
                  key={index}
                  onClick={() => {
                    const target = document.getElementById(nav.href);
                    target?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-end pl-10 pr-8 py-2 active:bg-gray-400 text-[#FBD185]"
                  whileHover={{
                    backgroundColor: "#48368A80",
                  }}
                >
                  {nav.title}
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
