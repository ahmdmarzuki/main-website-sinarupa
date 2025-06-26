import React, { useEffect, useState } from "react";
import {
  fetchArtDatabase,
  subscribeToArtDatabase,
  deleteArt,
  editArt,
  artDatabase,
  adminCheck,
} from "../firebase/firestore";
import PendingArtDisplay from "./PendingArtDisplay";
import { toast } from "react-hot-toast";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore"; // ✅ Tambah setDoc import

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
    fileType: "",
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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Edit Artwork</h2>
        </div>
        <div className="p-6 overflow-y-auto flex-1">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="realName"
                value={editedArt.realName || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded text-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jurusan
              </label>
              <select
                name="major"
                value={editedArt.major || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded text-gray-800"
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  <span className="text-gray-700">2D</span>
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
                  <span className="text-gray-700">3D</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Judul Karya
              </label>
              <input
                type="text"
                name="artTitle"
                value={editedArt.artTitle || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded text-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi
              </label>
              <textarea
                name="artDesc"
                value={editedArt.artDesc || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded text-gray-800"
                rows="3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama, Tahun
              </label>
              <input
                type="text"
                name="artNameYear"
                value={editedArt.artNameYear || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded text-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dimensi
              </label>
              <input
                type="text"
                name="artDimension"
                value={editedArt.artDimension || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded text-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Media
              </label>
              <input
                type="text"
                name="artMedia"
                value={editedArt.artMedia || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded text-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                File Type
              </label>
              <select
                name="fileType"
                value={editedArt.fileType || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded text-gray-800"
              >
                <option value="">Pilih File Type</option>
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-end gap-4">
          <button
            onClick={onClose}
            disabled={isSaving}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
  const [selectedMajor, setSelectedMajor] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // Add previewModal state (fix blank screen)
  const [previewModal, setPreviewModal] = useState({
    open: false,
    url: "",
    type: "",
  });

  const majors = [
    "All",
    "Seni Rupa",
    "Desain Komunikasi Visual",
    "Desain Produk",
    "Desain Interior",
    "Kriya",
  ];

  useEffect(() => {
    setIsLoading(true);
    adminCheck(setEmail, setRole, setIsAdmin);

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

  const filteredArtList = artList
    .filter((art) => {
      if (selectedMajor === "All") return true;
      return art.major === selectedMajor;
    })
    .sort((a, b) => {
      const idA = a.id.toLowerCase();
      const idB = b.id.toLowerCase();
      return sortOrder === "asc"
        ? idA.localeCompare(idB)
        : idB.localeCompare(idA);
    });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleDelete = async (id, artUrl, profilePictureUrl) => {
    if (window.confirm("yakin pengen dihapus nihh😢?")) {
      try {
        await deleteArt(id, artUrl, profilePictureUrl);
        await fetchArtDatabase();
      } catch (error) {
        console.error("Error deleting art:", error);
      }
    }
  };

  const handleEdit = (art) => {
    setSelectedArt(art);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (editedArt) => {
    try {
      // ✅ Gunakan setDoc untuk update document
      await setDoc(doc(artDatabase, editedArt.id), {
        ...editedArt,
      });

      // ✅ Tutup modal setelah berhasil save
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

      // ✅ Refresh data setelah edit
      await fetchArtDatabase();
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

  return (
    <div className="space-y-4 w-[100%] px-4 sm:px-8 md:px-12 lg:px-20">
      {/* Modal for full preview */}
      {previewModal.open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setPreviewModal({ open: false, url: "", type: "" })}
        >
          <div
            className="relative max-w-3xl w-full max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 z-10 bg-black/60 text-white rounded-full p-2 hover:bg-black/80"
              onClick={() =>
                setPreviewModal({ open: false, url: "", type: "" })
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {previewModal.type === "video" ? (
              <video
                src={previewModal.url}
                controls
                autoPlay={false}
                className="max-h-[80vh] max-w-full rounded-lg bg-black"
                style={{ backgroundColor: "#111" }}
              />
            ) : (
              <img
                src={previewModal.url}
                alt="Preview"
                className="max-h-[80vh] max-w-full rounded-lg bg-black"
                style={{ backgroundColor: "#111" }}
              />
            )}
          </div>
        </div>
      )}
      <div className="flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          {/* Major Filter Tabs */}

          <div className="flex flex-wrap gap-2">
            {majors.map((major) => (
              <button
                key={major}
                onClick={() => setSelectedMajor(major)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedMajor === major
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {major}
              </button>
            ))}
          </div>

          {/* Sort Button */}
          <button
            onClick={toggleSortOrder}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors flex items-center gap-2"
          >
            <span>Sort by NIM</span>
            <span className="text-lg">{sortOrder === "asc" ? "↑" : "↓"}</span>
          </button>
        </div>
      </div>
      {/* Total Art Count */}
      <div className="mb-2 text-white font-semibold text-lg">
        Total Karya: {filteredArtList.length}
      </div>

      {isLoading ? (
        <div className="text-center py-4">
          <p className="text-gray-400">Loading submissions...</p>
        </div>
      ) : (
        <>
          {filteredArtList.map((art) => (
            <div
              key={art.id}
              className="bg-[#ffffff80] rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-center gap-4"
            >
              <div className="flex gap-8 w-full">
                <div className="relative group w-full sm:w-32 h-48 sm:h-32 flex-shrink-0">
                  {art.fileType &&
                  art.fileType.toLowerCase().includes("video") ? (
                    <video
                      src={art.artUrl}
                      controls
                      className="w-full h-full object-cover rounded-lg cursor-pointer bg-gray-200"
                      style={{ backgroundColor: "#e5e7eb" }}
                      onClick={() =>
                        setPreviewModal({
                          open: true,
                          url: art.artUrl,
                          type: "video",
                        })
                      }
                    />
                  ) : (
                    <img
                      src={art.artUrl}
                      alt={art.artTitle}
                      className="w-full h-full object-cover rounded-lg cursor-pointer"
                      onClick={() =>
                        setPreviewModal({
                          open: true,
                          url: art.artUrl,
                          type: "image",
                        })
                      }
                    />
                  )}
                  {/* Hover Overlay */}
                  <div
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition-opacity cursor-pointer select-none"
                    onClick={() =>
                      setPreviewModal({
                        open: true,
                        url: art.artUrl,
                        type:
                          art.fileType &&
                          art.fileType.toLowerCase().includes("video")
                            ? "video"
                            : "image",
                      })
                    }
                  >
                    <span className="text-white text-base font-semibold">
                      Click to view
                    </span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-row gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <img
                      src={art.profilePictureUrl}
                      alt={art.realName}
                      className="w-8 h-8 border border-white rounded-full object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 truncate">
                        {art.realName} ({art.id})
                      </h3>
                      {art.major && (
                        <p className="text-sm text-gray-700 truncate">
                          {art.major} • {art.dimensionType}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-800  text-base sm:text-lg font-medium mb-2 truncate">
                    {art.artTitle}
                  </p>
                  <p className="text-gray-700 text-sm sm:text-base mb-2 sm:mb-4 line-clamp-2">
                    {art.artDesc}
                  </p>
                </div>
              </div>
              {isAdmin && (
                <div className="flex flex-row sm:flex-col gap-2 sm:gap-4 w-full sm:w-40 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(art)}
                    className="flex-1 sm:flex-none px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm sm:text-base"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      handleDelete(art.id, art.artUrl, art.profilePictureUrl)
                    }
                    className="flex-1 sm:flex-none px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 transition-colors text-sm sm:text-base"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}

          {filteredArtList.length === 0 && (
            <p className="text-gray-800 text-center py-4">
              - No accepted artwork{" "}
              {selectedMajor !== "All" ? `for ${selectedMajor}` : ""} -
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

export default AcceptedArtDisplay;
