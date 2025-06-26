import React, { useState, useEffect, useRef } from "react";
import { fetchArtDatabase } from "../firebase/firestore";
import { useMediaQuery } from "../useMediaQuery";
import { useNavigate, useLocation } from "react-router-dom";

import bgDesktop from "/images/bgDesktopRevisi.webp";
import bgMobile from "/images/bgMobileRevisi.jpg";

// Custom styles for hiding scrollbar
const scrollbarHideStyles = {
  msOverflowStyle: "none", // IE and Edge
  scrollbarWidth: "none", // Firefox
  "&::-webkit-scrollbar": {
    // Chrome, Safari and Opera
    display: "none",
  },
};

const majorToPath = {
  "Seni Rupa": "sr",
  "Desain Komunikasi Visual": "dkvnvd",
  "Desain Produk": "dp",
  "Desain Interior": "di",
  Kriya: "kr",
};

const pathToMajor = {
  sr: "Seni Rupa",
  dkvnvd: "Desain Komunikasi Visual",
  dp: "Desain Produk",
  di: "Desain Interior",
  kr: "Kriya",
};

// Komponen skeleton shimmer
const ArtSkeleton = () => (
  <div className="w-full aspect-[4/5] bg-gray-200 animate-pulse rounded-lg" />
);

// Komponen gambar dengan skeleton loading
function ArtImageWithSkeleton({ src, alt, type }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative w-full">
      {!loaded && <ArtSkeleton />}
      <img
        src={src}
        alt={alt}
        className={`w-full z-0 h-auto object-cover rounded-lg transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

// Modal detail karya
const ArtDetailModal = ({ isOpen, onClose, art }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  if (!isOpen || !art) return null;
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-transparent w-full max-w-[80vw] h-[70vh] md:max-w-3xl md:max-h-[95vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full flex flex-col items-center">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold z-10"
            aria-label="Close"
          >
            ×
          </button>
          {/* Gambar karya */}
          <div className="w-full flex justify-center">
            <img
              src={art.artUrl}
              alt={art.artTitle}
              className="rounded-t-2xl pt-4 rounded-b-none object-contain w-full h-[30vh] md:h-[50vh] bg-gray-100"
              style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
            />
          </div>
          {/* Card detail */}
          <div className="w-full max-h-[40vh] md:max-h-[60vh] bg-white shadow-lg px-6 py-6 flex flex-col md:flex-row gap-6 border-t-0 border border-gray-200">
            {/* Kiri: info karya */}
            <div className="md:w-1/3 w-full flex flex-col">
              <div className="font-bold text-lg md:text-xl text-black mb-4">
                {art.artTitle}
              </div>
              <div className="italic text-gray-700 text-sm mb-1">
                {art.artNameYear}
              </div>
              <div className="text-gray-700 text-sm mb-1">{art.artMedia}</div>
              <div className="text-gray-700 text-sm mb-1">
                {art.artDimension}
              </div>
            </div>
            {/* Kanan: deskripsi */}
            <div className="md:w-2/3 w-full max-h-[20vh] overflow-y-auto text-gray-800 text-sm md:text-base whitespace-pre-line">
              {art.artDesc}
            </div>
          </div>
          {/* Identitas */}
          <div className="w-full bg-white rounded-b-2xl flex flex-col items-center pb-6 pt-2 border-t-0 border border-gray-200">
            <div className="flex flex-col md:flex-row items-center gap-3 mt-2">
              <img
                src={art.profilePictureUrl}
                alt={art.realName}
                className="w-12 h-12 md:w-10 md:h-10 rounded-full object-cover border border-gray-300 mb-2 md:mb-0"
              />
              <div className="text-center md:text-left">
                <div className="font-medium text-gray-900 text-sm md:text-base">
                  {art.realName}
                </div>
                <div className="text-gray-700 text-xs md:text-sm">
                  {art.id} – {art.major}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper untuk download file dari url
function downloadImage(url, filename) {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename || "download";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const ArtDisplay = ({ initialMajor = "" }) => {
  const [artList, setArtList] = useState([]);
  const [filteredArtList, setFilteredArtList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMajor, setSelectedMajor] = useState(initialMajor);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();
  const location = useLocation();
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedArt, setSelectedArt] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef();
  const [idToDownload, setIdToDownload] = useState(null);

  const majors = [
    "Seni Rupa",
    "Desain Komunikasi Visual",
    "Desain Produk",
    "Desain Interior",
    "Kriya",
  ];

  // Handle URL-based major selection
  useEffect(() => {
    const path = location.pathname.split("/").pop();
    if (path && path !== "karyabebas" && pathToMajor[path]) {
      setSelectedMajor(pathToMajor[path]);
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsFilterVisible(false);
      } else {
        // Scrolling up
        setIsFilterVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchArtDatabase();
        setArtList(data);
        setFilteredArtList(data);
      } catch (err) {
        setError("Failed to fetch artwork");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Search and filter functionality
  useEffect(() => {
    let filtered = artList;

    // Apply major filter
    if (selectedMajor) {
      filtered = filtered.filter((art) => art.major === selectedMajor);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (art) =>
          art.artTitle?.toLowerCase().includes(query) ||
          art.realName?.toLowerCase().includes(query) ||
          art.major?.toLowerCase().includes(query)
      );
    }

    setFilteredArtList(filtered);
  }, [searchQuery, selectedMajor, artList]);

  const handleMajorSelect = (major) => {
    setSelectedMajor(major);
    if (major === "") {
      navigate("/karyabebas");
    } else {
      navigate(`/karyabebas/${majorToPath[major]}`);
    }
  };

  // Function to create columns
  const createColumns = (items, numColumns) => {
    const columns = Array.from({ length: numColumns }, () => []);
    items.forEach((item, index) => {
      const columnIndex = index % numColumns;
      columns[columnIndex].push(item);
    });
    return columns;
  };

  // Close menu jika klik di luar
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuId(null);
        setIdToDownload(null);
      }
    }
    if (openMenuId !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuId]);

  if (isLoading) {
    return (
      <div
        className="min-h-screen bg-bottom flex items-center justify-center"
        style={{ backgroundImage: `url(${isMobile ? bgMobile : bgDesktop})` }}
      >
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen bg-bottom flex items-center justify-center"
        style={{ backgroundImage: `url(${isMobile ? bgMobile : bgDesktop})` }}
      >
        <div className="text-white text-xl">{error}</div>
      </div>
    );
  }

  const columns = createColumns(filteredArtList, isMobile ? 2 : 5);

  return (
    <div className="min-h-screen bg-bottom">
      {/* Sticky Search Bar */}
      <div className="sticky top-0 z-50 bg-white py-4 shadow-sm px-4 md:px-14">
        <div className="w-full mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari berdasarkan judul, artist, atau jurusan ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          {searchQuery && (
            <p className="text-gray-600 mt-2 text-sm">
              Found {filteredArtList.length} results
            </p>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div
        className={`sticky top-[72px] z-40 bg-white py-4 px-4 transition-transform duration-300 ${
          isFilterVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div
          className={`flex ${
            isMobile ? "overflow-x-auto whitespace-nowrap pb-2" : "flex-wrap"
          } gap-2 ${isMobile ? "justify-start" : "justify-center"}`}
          style={isMobile ? scrollbarHideStyles : {}}
        >
          <button
            onClick={() => handleMajorSelect("")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex-shrink-0 ${
              selectedMajor === ""
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          {majors.map((major) => (
            <button
              key={major}
              onClick={() => handleMajorSelect(major)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex-shrink-0 ${
                selectedMajor === major
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {major}
            </button>
          ))}
        </div>
      </div>

      {/* Art Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-2 md:gap-4">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex-1 flex flex-col gap-4">
              {column.map((art) => (
                <div
                  key={art.id}
                  className="overflow-visible duration-300 text-white"
                >
                  <div
                    className="relative group flex flex-col gap-1 cursor-pointer"
                    onClick={() => {
                      setSelectedArt(art);
                      setIsDetailModalOpen(true);
                    }}
                  >
                    <ArtImageWithSkeleton
                      src={art.artUrl}
                      alt={art.artTitle}
                      type={art.tu}
                    />
                    <div className="flex flex-row justify-between items-center">
                      <p className="text-gray-600 text-sm mb-0">
                        {art.realName}
                        {/* {idToDownload} */}
                      </p>
                      {/* Titik tiga menu */}
                      <div className="relative">
                        <button
                          className="text-black px-2 py-1 text-xl focus:outline-none hover:text-gray-500"
                          onClick={(e) => {
                            setIdToDownload(art.id);
                            e.stopPropagation();
                            setOpenMenuId(
                              openMenuId === art.id ? null : art.id
                            );
                          }}
                          aria-label="Menu"
                        >
                          &#8230;
                        </button>
                        {idToDownload === art.id && (
                          <div
                            ref={menuRef}
                            className="absolute -right-2 -top-8 mt-2 w-32 bg-white rounded shadow-lg z-40 border border-gray-200"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                              onClick={() => {
                                downloadImage(
                                  art.artUrl,
                                  art.artTitle || "karya"
                                );
                                setOpenMenuId(null);
                              }}
                            >
                              Fullscreen
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <ArtDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        art={selectedArt}
      />
    </div>
  );
};

export default ArtDisplay;
