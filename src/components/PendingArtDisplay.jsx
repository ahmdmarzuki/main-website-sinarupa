import React, { useEffect, useState } from "react";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { adminCheck, tempArtDatabase } from "../firebase/firestore";
import {
  fetchTempArtDatabase,
  acceptArt,
  editArt,
} from "../firebase/firestore";
import { toast } from "react-hot-toast";
import { TrashIcon } from "@heroicons/react/24/outline";

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
    major: "",
    dimensionType: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  const majors = [
    "Seni Rupa",
    "Desain Komunikasi Visual",
    "Desain Produk",
    "Desain Interior",
    "Kriya",
  ];

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
                Jurusan
              </label>
              <select
                name="major"
                value={editedArt.major || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              >
                <option value="">Pilih Jurusan</option>
                {majors.map((major) => (
                  <option key={major} value={major}>
                    {major}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tipe Dimensi
              </label>
              <div className="flex gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="dimensionType"
                    value="2D"
                    checked={editedArt.dimensionType === "2D"}
                    onChange={handleChange}
                    className="form-radio text-blue-500"
                  />
                  <span className="text-gray-300">2D</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="dimensionType"
                    value="3D"
                    checked={editedArt.dimensionType === "3D"}
                    onChange={handleChange}
                    className="form-radio text-blue-500"
                  />
                  <span className="text-gray-300">3D</span>
                </label>
              </div>
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

const PendingArtDisplay = () => {
  const [tempArtList, setTempArtList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedArt, setSelectedArt] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [acceptingId, setAcceptingId] = useState(null);

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchTempArtData();
    adminCheck(setEmail, setRole, setIsAdmin);
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
      setAcceptingId(art.id);
      await acceptArt(
        art.id,
        art.realName,
        art.profilePictureUrl,
        art.major,
        art.dimensionType,
        art.artTitle,
        art.artUrl,
        art.artNameYear,
        art.artDesc,
        art.artDimension,
        art.artMedia
      );
      setTempArtList((prev) => prev.filter((item) => item.id !== art.id));
    } catch (error) {
      console.error("Error accepting art:", error);
      setError("Failed to accept submission");
    } finally {
      setAcceptingId(null);
    }
  };

  const handleEdit = (art) => {
    setSelectedArt(art);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (editedArt) => {
    try {
      await setDoc(doc(tempArtDatabase, editedArt.id), {
        ...editedArt,
      });
      await fetchTempArtData();
      setIsEditModalOpen(false);
      toast.success("Karya berhasil diperbarui!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.error("Error editing art:", error);
      toast.error("Gagal memperbarui karya: " + error.message, {
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
  };

  const handleReject = async (id) => {
    if (window.confirm("Yakin pengen ditolak nihh😢?")) {
      try {
        await deleteDoc(doc(tempArtDatabase, id));
        toast.success("Karya berhasil ditolak!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        fetchTempArtData();
      } catch (error) {
        toast.error("Gagal menolak karya: " + error.message, {
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
              className="bg-gray-800 rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-center gap-4"
            >
              <div className="flex gap-8 w-full">
                <img
                  src={art.artUrl}
                  alt={art.artTitle}
                  className="w-full sm:w-32 h-48 sm:h-32 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-row gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <img
                      src={art.profilePictureUrl}
                      alt={art.realName}
                      className="w-8 h-8 border border-white rounded-full object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 truncate">
                        {art.realName} ({art.id})
                      </h3>
                      {art.major && (
                        <p className="text-sm text-gray-400 truncate">
                          {art.major} • {art.dimensionType}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-300 text-base sm:text-lg font-medium mb-2 truncate">
                    {art.artTitle}
                  </p>
                  <p className="text-gray-400 text-sm sm:text-base mb-2 sm:mb-4 line-clamp-2">
                    {art.artDesc}
                  </p>
                </div>
              </div>
              {isAdmin && (
                <div className="flex flex-row sm:flex-col gap-2 sm:gap-4 w-full sm:w-40 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(art)}
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm sm:text-base"
                  >
                    Edit
                  </button>
                  <div className="flex gap-2 w-full">
                    <button
                      onClick={() => handleAccept(art)}
                      disabled={acceptingId === art.id}
                      className={`flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition-colors text-sm sm:text-base ${
                        acceptingId === art.id
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      {acceptingId === art.id ? "Accepting..." : "Accept"}
                    </button>
                    <button
                      onClick={() => handleReject(art.id)}
                      disabled={acceptingId === art.id}
                      className={`flex-none aspect-square px-2 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors flex items-center justify-center ${
                        acceptingId === art.id
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      title="Reject"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {tempArtList.length === 0 && (
            <p className="text-gray-400 text-center py-4">
              - No pending artwork submissions -
            </p>
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

export default PendingArtDisplay;
