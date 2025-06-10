import React, { useEffect, useState } from "react";
import {
  fetchArtDatabase,
  subscribeToArtDatabase,
  deleteArt,
  editArt,
} from "../firebase/firestore";
import PendingArtDisplay from "./PendingArtDisplay";
import { toast } from "react-hot-toast";
import { deleteDoc, doc } from "firebase/firestore";

const EditArtModal = ({ isOpen, onClose, art, onSave }) => {
  const [editedArt, setEditedArt] = useState({
    id: "",
    realName: "",
    profilePictureUrl: "",
    artTitle: "",
    artUrl: "",
    artNameYear: "",
    artDesc: "",
    artDimension: "",
    artMedia: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (art) {
      setEditedArt(art);
    }
  }, [art]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedArt((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(editedArt);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen || !art) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">Edit Artwork</h2>
        </div>
        <div className="p-6 overflow-y-auto flex-1">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="realName"
                value={editedArt.realName || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Judul Karya
              </label>
              <input
                type="text"
                name="artTitle"
                value={editedArt.artTitle || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Deskripsi
              </label>
              <textarea
                name="artDesc"
                value={editedArt.artDesc || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                rows="3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nama, Tahun
              </label>
              <input
                type="text"
                name="artNameYear"
                value={editedArt.artNameYear || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Dimensi
              </label>
              <input
                type="text"
                name="artDimension"
                value={editedArt.artDimension || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Media
              </label>
              <input
                type="text"
                name="artMedia"
                value={editedArt.artMedia || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-gray-700 flex justify-end gap-4">
          <button
            onClick={onClose}
            disabled={isSaving}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <span>Saving</span>
                <span className="animate-pulse">...</span>
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const AcceptedArtDisplay = () => {
  const [artList, setArtList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedArt, setSelectedArt] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

  const handleDelete = async (id) => {
    if (window.confirm("yakin pengen dihapus nihh😢?")) {
      try {
        await deleteDoc(doc(artDatabase, id));
        toast.success("Karya berhasil dihapus!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        fetchArt();
      } catch (error) {
        toast.error("Gagal menghapus karya: " + error.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  };

  const handleEdit = (art) => {
    setSelectedArt(art);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (editedArt) => {
    try {
      await editArt(
        editedArt.id,
        editedArt.realName,
        editedArt.profilePictureUrl,
        editedArt.artTitle,
        editedArt.artUrl,
        editedArt.artNameYear,
        editedArt.artDesc,
        editedArt.artDimension,
        editedArt.artMedia
      );
      setIsEditModalOpen(false);
      fetchArt();
    } catch (error) {
      console.error("Error saving edit:", error);
    }
  };

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
              <div className="flex flex-row sm:flex-col gap-2 sm:gap-4 w-full sm:w-40">
                <button
                  onClick={() => handleEdit(art)}
                  className="flex-1 sm:flex-none px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm sm:text-base"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(art.id)}
                  className="flex-1 sm:flex-none px-4 py-2 bg-gray-400 text-black rounded hover:bg-gray-500 transition-colors text-sm sm:text-base"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {artList.length === 0 && (
            <p className="text-gray-400 text-center py-4">- Karya Kosong -</p>
          )}
        </>
      )}

      <EditArtModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        art={selectedArt}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default AcceptedArtDisplay;
