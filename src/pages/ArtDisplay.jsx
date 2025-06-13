import React, { useState, useEffect } from "react";
import { fetchArtDatabase } from "../firebase/firestore";
import { useMediaQuery } from "../useMediaQuery";

import bgDesktop from "/images/bgDesktopRevisi.webp";
import bgMobile from "/images/bgMobileRevisi.jpg";

const ArtDisplay = () => {
  const [artList, setArtList] = useState([]);
  const [filteredArtList, setFilteredArtList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const isMobile = useMediaQuery("(max-width: 768px)");

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

  // Search functionality
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredArtList(artList);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = artList.filter(
      (art) =>
        art.artTitle?.toLowerCase().includes(query) ||
        art.realName?.toLowerCase().includes(query) ||
        art.major?.toLowerCase().includes(query)
    );
    setFilteredArtList(filtered);
  }, [searchQuery, artList]);

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
      <div className="sticky top-0 z-50 bg-white py-4 shadow-sm">
        <div className="container mx-auto px-4">
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
