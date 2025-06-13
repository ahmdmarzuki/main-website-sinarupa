import React from "react";
import { useState, useRef, useEffect } from "react";
import { v4 } from "uuid";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "../firebase/firebaseConfig";
import { createArt } from "../firebase/firestore";
import { Link } from "react-router-dom";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useMediaQuery } from "../useMediaQuery";
import CropModalDesktop from "../components/CropModalDesktop";
import CropModalMobile from "../components/CropModalMobile";
import ProfileCropModalDesktop from "../components/ProfileCropModalDesktop";
import ProfileCropModalMobile from "../components/ProfileCropModalMobile";

import bgDesktop from "/images/bgDesktopRevisi.webp";
import bgMobile from "/images/bgMobileRevisi.jpg";

const imageDb = getStorage(app);

// Define available aspect ratios
const ASPECT_RATIOS = [
  { label: "1:1", value: 1 / 1 },
  { label: "3:4", value: 3 / 4 },
  { label: "4:3", value: 4 / 3 },
  { label: "4:5", value: 4 / 5 },
  { label: "5:4", value: 5 / 4 },
  { label: "16:9", value: 16 / 9 },
];

// Define available majors
const MAJORS = [
  "Seni Rupa",
  "Desain Komunikasi Visual",
  "Desain Produk",
  "Desain Interior",
  "Kriya",
];

const UploadArt = () => {
  const [formData, setFormData] = useState({
    nim: "",
    realName: "",
    profileImage: null,
    major: "",
    dimensionType: "",
    artTitle: "",
    artDesc: "",
    artImage: null,
    artNameYear: "",
    artDimension: "",
    artMedia: "",
  });

  const isMobile = useMediaQuery("(max-width: 768px)");

  const [artImagePreview, setArtImagePreview] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [showProfileCropModal, setShowProfileCropModal] = useState(false);
  const [artTempImage, setArtTempImage] = useState(null);
  const [profileTempImage, setProfileTempImage] = useState(null);
  const [artCrop, setArtCrop] = useState();
  const [profileCrop, setProfileCrop] = useState();
  const [artCompletedCrop, setArtCompletedCrop] = useState(null);
  const [profileCompletedCrop, setProfileCompletedCrop] = useState(null);
  const [selectedRatio, setSelectedRatio] = useState(ASPECT_RATIOS[0]);
  const imgRef = useRef(null);
  const profileImgRef = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [artIsDragging, setArtIsDragging] = useState(false);
  const [profileIsDragging, setProfileIsDragging] = useState(false);

  const artInputRef = useRef(null);
  const profileInputRef = useRef(null);

  // Add useEffect to handle body scroll
  useEffect(() => {
    if (showCropModal || showProfileCropModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showCropModal, showProfileCropModal]);

  // Function to create a cropped image
  const getCroppedImg = (image, crop) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Calculate the actual pixel values
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    // Set canvas dimensions to match the crop size
    canvas.width = Math.floor(crop.width * scaleX);
    canvas.height = Math.floor(crop.height * scaleY);

    // Draw the cropped image
    ctx.drawImage(
      image,
      Math.floor(crop.x * scaleX),
      Math.floor(crop.y * scaleY),
      Math.floor(crop.width * scaleX),
      Math.floor(crop.height * scaleY),
      0,
      0,
      Math.floor(crop.width * scaleX),
      Math.floor(crop.height * scaleY)
    );

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          resolve(blob);
        },
        "image/jpeg",
        0.95
      );
    });
  };

  const handleCropComplete = async () => {
    if (!imgRef.current || !artCompletedCrop) return;

    try {
      const croppedImage = await getCroppedImg(
        imgRef.current,
        artCompletedCrop
      );
      const croppedImageUrl = URL.createObjectURL(croppedImage);

      const file = new File([croppedImage], "cropped-image.jpg", {
        type: "image/jpeg",
      });

      setFormData((prev) => ({
        ...prev,
        artImage: file,
      }));
      setArtImagePreview(croppedImageUrl);
      setShowCropModal(false);
      setArtTempImage(null);
      setArtCrop(undefined);
      setArtCompletedCrop(null);
    } catch (e) {
      console.error("Error cropping image:", e);
    }
  };

  // Function to center the crop on the image
  function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 90,
        },
        aspect,
        mediaWidth,
        mediaHeight
      ),
      mediaWidth,
      mediaHeight
    );
  }

  // Function to handle image load
  function onImageLoad(e) {
    const { width, height } = e.currentTarget;
    const crop = centerAspectCrop(width, height, selectedRatio.value);
    setArtCrop(crop);
  }

  // Function to handle ratio change
  const handleRatioChange = (ratio) => {
    setSelectedRatio(ratio);
    if (imgRef.current) {
      const { width, height } = imgRef.current;
      setArtCrop(centerAspectCrop(width, height, ratio.value));
    }
  };

  // Function to handle profile crop completion
  const handleProfileCropComplete = async () => {
    if (!profileImgRef.current || !profileCompletedCrop) return;

    try {
      const croppedImage = await getCroppedImg(
        profileImgRef.current,
        profileCompletedCrop
      );
      const croppedImageUrl = URL.createObjectURL(croppedImage);

      const file = new File([croppedImage], "cropped-profile.jpg", {
        type: "image/jpeg",
      });

      setFormData((prev) => ({
        ...prev,
        profileImage: file,
      }));
      setProfileImagePreview(croppedImageUrl);
      setShowProfileCropModal(false);
      setProfileTempImage(null);
      setProfileCrop(undefined);
      setProfileCompletedCrop(null);
    } catch (e) {
      console.error("Error cropping profile image:", e);
    }
  };

  // Function to handle profile image load
  function onProfileImageLoad(e) {
    const { width, height } = e.currentTarget;
    const crop = centerAspectCrop(width, height, 1);
    setProfileCrop(crop);
  }

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
    if (file.size > 10 * 1024 * 1024) {
      setError("File size should be less than 10MB");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    setError("");
    setArtTempImage(URL.createObjectURL(file));
    setShowCropModal(true);
  };
  const handleArtChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "artImage" && files && files[0]) {
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
    if (file.size > 10 * 1024 * 1024) {
      setError("File size should be less than 10MB");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    setError("");
    setProfileTempImage(URL.createObjectURL(file));
    setShowProfileCropModal(true);
  };
  const handleProfileChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profileImage" && files && files[0]) {
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

    if (!formData.artImage || !formData.profileImage) {
      setError("Please upload both artwork and profile images");
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
        formData.major,
        formData.dimensionType,
        formData.artTitle,
        artUrl,
        formData.artNameYear,
        formData.artDesc,
        formData.artDimension,
        formData.artMedia
      );

      // Reset form and preview
      setFormData({
        nim: "",
        realName: "",
        profileImage: null,
        major: "",
        dimensionType: "",
        artTitle: "",
        artDesc: "",
        artImage: null,
        artNameYear: "",
        artDimension: "",
        artMedia: "",
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

      toast.success("Berhasil Submit Karya!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (err) {
      setError("An error occurred while submitting the form");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main
      className="min-h-screen bg-bottom"
      style={{ backgroundImage: `url(${isMobile ? bgMobile : bgDesktop})` }}
    >
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-[#ffffff80] rounded-lg shadow-xl p-6 text-black">
          <h1 className="text-2xl font-bold mb-6 text-black text-center">
            Upload Artwork
          </h1>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded text-red-500 text-sm">
              {error}
            </div>
          )}

          {/* Crop Modal */}
          {isMobile ? (
            <CropModalMobile
              showModal={showCropModal}
              title="Crop Image"
              tempImage={artTempImage}
              crop={artCrop}
              setCrop={setArtCrop}
              setCompletedCrop={setArtCompletedCrop}
              aspect={selectedRatio.value}
              imgRef={imgRef}
              onImageLoad={onImageLoad}
              onCropComplete={handleCropComplete}
              onCancel={() => {
                setShowCropModal(false);
                setArtTempImage(null);
                if (artInputRef.current) {
                  artInputRef.current.value = "";
                }
              }}
              aspectRatios={ASPECT_RATIOS}
              selectedRatio={selectedRatio}
              onRatioChange={handleRatioChange}
            />
          ) : (
            <CropModalDesktop
              showModal={showCropModal}
              title="Crop Image"
              tempImage={artTempImage}
              crop={artCrop}
              setCrop={setArtCrop}
              setCompletedCrop={setArtCompletedCrop}
              aspect={selectedRatio.value}
              imgRef={imgRef}
              onImageLoad={onImageLoad}
              onCropComplete={handleCropComplete}
              onCancel={() => {
                setShowCropModal(false);
                setArtTempImage(null);
                if (artInputRef.current) {
                  artInputRef.current.value = "";
                }
              }}
              aspectRatios={ASPECT_RATIOS}
              selectedRatio={selectedRatio}
              onRatioChange={handleRatioChange}
            />
          )}

          {/* Profile Crop Modal */}
          {isMobile ? (
            <ProfileCropModalMobile
              showModal={showProfileCropModal}
              title="Crop Profile Picture"
              description="Profile picture will be cropped in a circle"
              tempImage={profileTempImage}
              crop={profileCrop}
              setCrop={setProfileCrop}
              setCompletedCrop={setProfileCompletedCrop}
              imgRef={profileImgRef}
              onImageLoad={onProfileImageLoad}
              onCropComplete={handleProfileCropComplete}
              onCancel={() => {
                setShowProfileCropModal(false);
                setProfileTempImage(null);
                if (profileInputRef.current) {
                  profileInputRef.current.value = "";
                }
              }}
            />
          ) : (
            <ProfileCropModalDesktop
              showModal={showProfileCropModal}
              title="Crop Profile Picture"
              description="Profile picture will be cropped in a circle"
              tempImage={profileTempImage}
              crop={profileCrop}
              setCrop={setProfileCrop}
              setCompletedCrop={setProfileCompletedCrop}
              imgRef={profileImgRef}
              onImageLoad={onProfileImageLoad}
              onCropComplete={handleProfileCropComplete}
              onCancel={() => {
                setShowProfileCropModal(false);
                setProfileTempImage(null);
                if (profileInputRef.current) {
                  profileInputRef.current.value = "";
                }
              }}
            />
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 text-black">NIM:</label>
              <input
                type="text"
                name="nim"
                value={formData.nim}
                onChange={handleArtChange}
                placeholder="Masukkan NIM"
                className="w-full p-2 rounded bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-black">Nama Lengkap:</label>
              <input
                type="text"
                name="realName"
                value={formData.realName}
                onChange={handleArtChange}
                placeholder="Masukkan nama lengkap"
                className="w-full p-2 rounded bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-black">Jurusan:</label>
              <select
                name="major"
                value={formData.major}
                onChange={handleArtChange}
                className="w-full p-2 rounded bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                required
              >
                <option value="">Pilih Jurusan</option>
                {MAJORS.map((major) => (
                  <option key={major} value={major}>
                    {major}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 text-black">Tipe Dimensi:</label>
              <div className="flex gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="dimensionType"
                    value="2D"
                    checked={formData.dimensionType === "2D"}
                    onChange={handleArtChange}
                    className="form-radio text-blue-500"
                    required
                  />
                  <span className="text-black">2D</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="dimensionType"
                    value="3D"
                    checked={formData.dimensionType === "3D"}
                    onChange={handleArtChange}
                    className="form-radio text-blue-500"
                    required
                  />
                  <span className="text-black">3D</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-black">Profile Picture:</label>
              <div className="mb-4">
                {profileImagePreview ? (
                  <div className="relative group">
                    <img
                      src={profileImagePreview}
                      alt="Profile Preview"
                      className="w-32 h-32 object-cover rounded-full mb-2"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setProfileImagePreview(null);
                        setFormData((prev) => ({
                          ...prev,
                          profileImage: null,
                        }));
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
                    onClick={() => profileInputRef.current?.click()}
                    className={`w-32 h-32 border-2 border-dashed rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                      profileIsDragging
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-gray-600 bg-white hover:border-blue-500"
                    }`}
                  >
                    <div className="text-center text-gray-500">
                      <svg
                        className="mx-auto h-8 w-8 text-gray-500"
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
                      <p className="mt-1 text-xs">Click or drag</p>
                    </div>
                  </div>
                )}
              </div>
              <input
                ref={profileInputRef}
                type="file"
                name="profileImage"
                onChange={handleProfileChange}
                accept="image/*"
                className="w-full p-2 rounded bg-white text-black file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-black">Judul Karya:</label>
              <input
                type="text"
                name="artTitle"
                value={formData.artTitle}
                onChange={handleArtChange}
                placeholder="Judul karyanya apa nih?"
                className="w-full p-2 rounded bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-black">Deskripsi Karya:</label>
              <textarea
                name="artDesc"
                value={formData.artDesc}
                onChange={handleArtChange}
                placeholder="Masukkin deskripsi karya"
                className="w-full p-2 rounded bg-white text-black placeholder-gray-400 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors resize-none"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-black">Media:</label>
              <input
                type="text"
                name="artMedia"
                value={formData.artMedia}
                onChange={handleArtChange}
                placeholder="Contoh: Ink on paper"
                className="w-full p-2 rounded bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-black">Nama, Tahun:</label>
              <input
                type="text"
                name="artNameYear"
                value={formData.artNameYear}
                onChange={handleArtChange}
                placeholder="(Nama, Tahun)"
                className="w-full p-2 rounded bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-black">Dimensi Karya:</label>
              <input
                type="text"
                name="artDimension"
                value={formData.artDimension}
                onChange={handleArtChange}
                placeholder="Ukuran karyanya berapa nih? (format: 30cm x 30cm)"
                className="w-full p-2 rounded bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-black">Artwork Image:</label>
              <div className="mb-4">
                {artImagePreview ? (
                  <div className="relative group">
                    <img
                      src={artImagePreview}
                      alt="Preview"
                      className="max-w-full h-64 object-contain rounded mb-2"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setArtImagePreview(null);
                        setFormData((prev) => ({ ...prev, artImage: null }));
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
                    onClick={() => artInputRef.current?.click()}
                    className={`w-full h-64 border-2 border-dashed rounded flex items-center justify-center transition-colors cursor-pointer ${
                      artIsDragging
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-gray-600 bg-white hover:border-blue-500"
                    }`}
                  >
                    <div className="text-center text-gray-500">
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
                name="artImage"
                onChange={handleArtChange}
                accept="image/*"
                className="w-full p-2 rounded bg-white text-black file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 transition-colors"
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
        <div className="flex flex-col justify-center items-center">
          <Link to="/pending">
            <button
              className={
                "mt-20 mb-10 py-2 px-10 rounded bg-white hover:bg-gray-300 text-black"
              }
            >
              Liat Submission Pending
            </button>
          </Link>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
};

export default UploadArt;
