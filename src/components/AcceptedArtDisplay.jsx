import React, { useEffect, useState } from "react";
import {
  fetchArtDatabase,
  subscribeToArtDatabase,
} from "../firebase/firestore";
import PendingArtDisplay from "./PendingArtDisplay";

const AcceptedArtDisplay = () => {
  const [artList, setArtList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);

    // Subscribe to real-time updates
    const unsubscribe = subscribeToArtDatabase((data) => {
      setArtList(data);
      setIsLoading(false);
    });

    // Cleanup subscription when component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="space-y-4 w-[100%] px-4 sm:px-8 md:px-12 lg:px-20">
      {isLoading ? (
        <div className="text-center py-4">
          <p className="text-gray-400">Lagi Loadingg...</p>
        </div>
      ) : error ? (
        <div className="text-center py-4">
          <p className="text-red-400">{error}</p>
        </div>
      ) : (
        <>
          {artList.map((art) => (
            <div
              key={art.id}
              className="bg-gray-800 rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row justify-center items-center gap-4"
            >
              <img
                src={art.artUrl}
                alt={art.artTitle}
                className="w-full sm:w-32 h-48 sm:h-32 object-cover rounded-lg"
              />
              <div className="flex-1 w-full">
                <div className="flex flex-row gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <img
                    src={art.profilePictureUrl}
                    alt={art.realName}
                    className="w-8 h-8 border border-white rounded-full object-cover"
                  />
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                    {art.realName} ({art.id})
                  </h3>
                </div>
                <p className="text-gray-300 text-base sm:text-lg">
                  {art.artTitle}
                </p>
                <p className="text-gray-400 text-sm sm:text-base mb-2 sm:mb-4">
                  {art.artDesc}
                </p>
              </div>
            </div>
          ))}
          {artList.length === 0 && (
            <p className="text-gray-400 text-center py-4">- Karya Kosong -</p>
          )}
        </>
      )}
    </div>
  );
};

export default AcceptedArtDisplay;
