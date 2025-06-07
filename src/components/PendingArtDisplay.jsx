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
      await acceptArt(art.id, art.url, art.name, art.artTitle, art.artDesc);
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
      setError("Failed to reject submission");
    }
  };

  return (
    <div className="space-y-4 w-[100%] px-20">
      {isLoading ? (
        <div className="text-center py-4">
          <p className="text-gray-400">Loading submissions...</p>
        </div>
      ) : error ? (
        <div className="text-center py-4">
          <p className="text-red-400">{error}</p>
        </div>
      ) : (
        <>
          {tempArtList.map((art) => (
            <div
              key={art.id}
              className="bg-gray-800 rounded-lg p-4 flex justify-center items-center space-x-4 "
            >
              <img
                src={art.url}
                alt={art.artTitle}
                className="w-32 h-32 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {art.artTitle}
                </h3>
                <p className="text-gray-300 mb-2">Artist: {art.name}</p>
                <p className="text-gray-300 mb-2">NIM: {art.id}</p>
                <p className="text-gray-400 text-sm mb-4">{art.artDesc}</p>
              </div>
              <div className="flex flex-col gap-4 min-w-40">
                <button
                  onClick={() => handleAccept(art)}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(art.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
          {tempArtList.length === 0 && (
            <p className="text-gray-400 text-center py-4">
              No pending artwork submissions
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default PendingArtDisplay;
