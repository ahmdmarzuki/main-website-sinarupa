import React, { useState, useEffect } from "react";
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
              placeholder="Search by title, artist, or major..."
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
                  className="overflow-hidden duration-300 text-white"
                >
                  <div className="relative group flex flex-col gap-1">
                    <img
                      src={art.artUrl}
                      alt={art.artTitle}
                      className="w-full h-auto object-cover rounded-lg"
                    />
                    <div className="flex flex-row justify-between">
                      {/* <p className="text-black mt-2 font-medium">
                        {art.artTitle}
                      </p> */}
                      <p className="text-gray-600 text-sm">{art.realName}</p>
                      <p className="text-black">...</p>
                      {/* <p className="text-gray-600">{art.major}</p> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtDisplay;
