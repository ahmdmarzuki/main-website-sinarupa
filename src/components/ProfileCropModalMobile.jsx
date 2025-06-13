import React from "react";
import ReactCrop from "react-image-crop";

const ProfileCropModalMobile = ({
  showModal,
  title,
  description,
  tempImage,
  crop,
  setCrop,
  setCompletedCrop,
  imgRef,
  onImageLoad,
  onCropComplete,
  onCancel,
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 p-4 rounded-lg w-full flex flex-col gap-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="text-gray-400 text-sm">{description}</p>
        <div className="w-full flex flex-col gap-4">
          <div className="max-h-[50vh] overflow-hidden">
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={1}
              circularCrop={true}
            >
              <img
                ref={imgRef}
                src={tempImage}
                alt="Crop me"
                onLoad={onImageLoad}
                className="max-h-[50vh] object-contain"
              />
            </ReactCrop>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={onCancel}
              className="w-full px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={onCropComplete}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCropModalMobile;
