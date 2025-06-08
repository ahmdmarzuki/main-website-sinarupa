import React, { useEffect, useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { tempArtDatabase } from "../firebase/firestore";
import { fetchTempArtDatabase, acceptArt } from "../firebase/firestore";

const PendingArtDisplay = () => {
  const [tempArtList, setTempArtList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTempArtData();
  }, []);

  const fetchTempArtData = async () => {
    try {
      setIsLoading(true);
      const data = await fetchTempArtDatabase();
      setTempArtList(data);
    } catch (error) {
      console.error("Error fetching temp art:", error);
      setError("Failed to load pending submissions");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = async (art) => {
    try {
      await acceptArt(
        art.id,
        art.realName,
        art.profilePictureUrl,
        art.artTitle,
        art.artUrl,
        art.artNameYear,
        art.artDesc,
        art.artDimension,
        art.artMedia
      );
      await fetchTempArtData(); // Refresh the list after accepting
    } catch (error) {
      console.error("Error accepting art:", error);
      setError("Failed to accept submission");
    }
  };

  const handleReject = async (id) => {
    try {
      await deleteDoc(doc(tempArtDatabase, id));
      await fetchTempArtData(); // Refresh the list after rejecting
    } catch (error) {
      console.error("Error rejecting art:", error);
      alert(
        error ==
          "FirebaseError: [code=permission-denied]: Missing or insufficient permissions."
          ? "LOGIN SEBAGAI ADMIN"
          : { error }
      );
      setError("Failed to reject submission");
    }
  };

  return (
    <div className="space-y-4 w-[100%] px-4 sm:px-8 md:px-12 lg:px-20">
      {isLoading ? (
        <div className="text-center py-4">
          <p className="text-gray-400">Loading submissions...</p>
        </div>
      ) : (
        <>
          {tempArtList.map((art) => (
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
              <div className="flex flex-row sm:flex-col gap-2 sm:gap-4 w-full sm:w-40">
                <button
                  onClick={() => handleAccept(art)}
                  className="flex-1 sm:flex-none px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm sm:text-base"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(art.id)}
                  className="flex-1 sm:flex-none px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm sm:text-base"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
          {tempArtList.length === 0 && (
            <p className="text-gray-400 text-center py-4">
              - No pending artwork submissions -
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default PendingArtDisplay;
