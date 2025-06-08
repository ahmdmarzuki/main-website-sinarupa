import React from "react";
import { useState, useRef } from "react";
import { v4 } from "uuid";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "../firebase/firebaseConfig";
import { createArt } from "../firebase/firestore";
import { Link } from "react-router-dom";

const imageDb = getStorage(app);

const UploadArt = () => {
  const [formData, setFormData] = useState({
    nim: "",
    realName: "",
    profileImage: null,

    artTitle: "",
    artDesc: "",
    artImage: null,
    artNameYear: "",
    artDimension: "",
  });

  const [artImagePreview, setArtImagePreview] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [artIsDragging, setArtIsDragging] = useState(false);
  const [profileIsDragging, setProfileIsDragging] = useState(false);

  const artInputRef = useRef(null);
  const profileInputRef = useRef(null);

  // ART FUNCTION
  const handleArtDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setArtIsDragging(true);
  };
  const handleArtDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setArtIsDragging(false);
  };
  const handleArtDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleArtDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setArtIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleArtFile(file);
      // Update file input value
      if (artInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        artInputRef.current.files = dataTransfer.files;
      }
    }
  };
  const handleArtFile = (file) => {
    // Validasi ukuran file (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size should be less than 10MB");
      return;
    }
    // Validasi tipe file
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    setError("");
    setFormData((prev) => ({
      ...prev,
      artImage: file,
    }));

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setArtImagePreview(previewUrl);
  };
  const handleArtChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files[0]) {
      handleArtFile(files[0]);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // PROFILE PICT FUNCTION
  const handleProfileDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setProfileIsDragging(true);
  };
  const handleProfileDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setProfileIsDragging(false);
  };
  const handleProfileDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleProfileDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setProfileIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleProfileFile(file);
      // Update file input value
      if (profileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        profileInputRef.current.files = dataTransfer.files;
      }
    }
  };
  const handleProfileFile = (file) => {
    // Validasi ukuran file (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size should be less than 10MB");
      return;
    }
    // Validasi tipe file
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    setError("");
    setFormData((prev) => ({
      ...prev,
      profileImage: file,
    }));

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setProfileImagePreview(previewUrl);
  };
  const handleProfileChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files[0]) {
      handleProfileFile(files[0]);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (!formData.artImage && !formData.profileImage) {
      setError("Pilih gambar terlebih dahulu!");
      setIsSubmitting(false);
      return;
    }

    const artRef = ref(imageDb, `artArchive/${formData.artImage.name + v4()}`);
    const profileRef = ref(
      imageDb,
      `profilePicture/${formData.profileImage.name + v4()}`
    );

    try {
      await uploadBytes(artRef, formData.artImage);
      await uploadBytes(profileRef, formData.profileImage);

      const artUrl = await getDownloadURL(artRef);
      const profileUrl = await getDownloadURL(profileRef);

      await createArt(
        formData.nim,
        formData.realName,
        profileUrl,

        formData.artTitle,
        artUrl,
        formData.artNameYear,
        formData.artDesc,
        formData.artDimension
      );

      // Reset form and preview
      setFormData({
        nim: "",
        realName: "",
        profileImage: null,

        artTitle: "",
        artDesc: "",
        artImage: null,
        artNameYear: "",
        artDimension: "",
      });
      setArtImagePreview(null);
      setProfileImagePreview(null);

      // Clear file input
      if (artInputRef.current) {
        artInputRef.current.value = "";
      }
      if (profileInputRef.current) {
        profileInputRef.current.value = "";
      }
    } catch (err) {
      setError("An error occurred while submitting the form");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-gray-950 min-h-screen">
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-gray-900 rounded-lg shadow-xl p-6">
          <h1 className="text-2xl font-bold mb-6 text-white text-center">
            Upload Artwork
          </h1>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded text-red-500 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 text-gray-300">Nama Lengkap:</label>
              <input
                type="text"
                name="realName"
                value={formData.realName}
                onChange={handleArtChange}
                placeholder="Masukkan namaa"
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-300">NIM:</label>
              <input
                type="text"
                name="nim"
                value={formData.nim}
                onChange={handleArtChange}
                placeholder="Boleh tau NIM nya ga?"
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            {/*input foto profill */}
            <div>
              <label className="block mb-2 text-gray-300">Foto Profil:</label>
              <div className="mb-4">
                {profileImagePreview ? (
                  <div className="relative group">
                    <img
                      src={profileImagePreview}
                      alt="Preview"
                      className="max-w-full h-64 object-contain border border-gray-600 rounded mb-2"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setProfileImagePreview(null);
                        setFormData((prev) => ({ ...prev, image: null }));
                        if (profileInputRef.current) {
                          profileInputRef.current.value = "";
                        }
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div
                    onDragEnter={handleProfileDragEnter}
                    onDragLeave={handleProfileDragLeave}
                    onDragOver={handleProfileDragOver}
                    onDrop={handleProfileDrop}
                    className={`w-full h-64 border-2 border-dashed rounded flex items-center justify-center transition-colors ${
                      profileIsDragging
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-gray-600 bg-gray-800 hover:border-blue-500"
                    }`}
                  >
                    <div className="text-center text-gray-400">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-500"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="mt-1">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <input
                ref={profileInputRef}
                type="file"
                name="image"
                onChange={handleProfileChange}
                accept="image/*"
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-300">Judul Karya:</label>
              <input
                type="text"
                name="artTitle"
                value={formData.artTitle}
                onChange={handleArtChange}
                placeholder="Judul karyanya apa nih?"
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-300">
                Deskripsi Karya:
              </label>
              <textarea
                name="artDesc"
                value={formData.artDesc}
                onChange={handleArtChange}
                placeholder="Masukkin deskripsi karya"
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white placeholder-gray-400 h-32 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-300">Nama, Tahun:</label>
              <input
                type="text"
                name="artNameYear"
                value={formData.artNameYear}
                onChange={handleArtChange}
                placeholder="(Nama, Tahun)"
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-300">Dimensi Karya:</label>
              <input
                type="text"
                name="artDimension"
                value={formData.artDimension}
                onChange={handleArtChange}
                placeholder="Ukuran karyanya berapa nih? (format: 30cm x 30cm)"
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-300">Artwork Image:</label>
              <div className="mb-4">
                {artImagePreview ? (
                  <div className="relative group">
                    <img
                      src={artImagePreview}
                      alt="Preview"
                      className="max-w-full h-64 object-contain border border-gray-600 rounded mb-2"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setArtImagePreview(null);
                        setFormData((prev) => ({ ...prev, image: null }));
                        if (artInputRef.current) {
                          artInputRef.current.value = "";
                        }
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div
                    onDragEnter={handleArtDragEnter}
                    onDragLeave={handleArtDragLeave}
                    onDragOver={handleArtDragOver}
                    onDrop={handleArtDrop}
                    className={`w-full h-64 border-2 border-dashed rounded flex items-center justify-center transition-colors ${
                      artIsDragging
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-gray-600 bg-gray-800 hover:border-blue-500"
                    }`}
                  >
                    <div className="text-center text-gray-400">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-500"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="mt-1">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <input
                ref={artInputRef}
                type="file"
                name="image"
                onChange={handleArtChange}
                accept="image/*"
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 rounded text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                isSubmitting
                  ? "bg-blue-700 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? "Uploading..." : "Upload Artwork"}
            </button>
          </form>
        </div>
        <Link to="/pending">
          <button
            className={
              "w-full mt-4 mb-10 py-2 rounded bg-white hover:bg-gray-300 text-black "
            }
          >
            Submission Pending
          </button>
        </Link>
      </div>
    </main>
  );
};

export default UploadArt;
