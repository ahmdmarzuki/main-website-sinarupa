import React from "react";
import ReactCrop from "react-image-crop";

const CropModalDesktop = ({
  showModal,
  title,
  description,
  tempImage,
  crop,
  setCrop,
  setCompletedCrop,
  aspect,
  imgRef,
  onImageLoad,
  onCropComplete,
  onCancel,
  aspectRatios,
  selectedRatio,
  onRatioChange,
  circularCrop = false,
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-4 rounded-lg w-full flex justify-center flex-row gap-8">
        <div className="w-[20%]">
          <div className="flex flex-col h-[100%] justify-between">
            <div className="flex flex-col gap-2 mb-4 overflow-x-auto pb-2">
              <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
              {description && (
                <p className="text-gray-400 text-sm mb-4">{description}</p>
              )}
              {aspectRatios && (
                <>
                  {aspectRatios.map((ratio) => (
                    <button
                      key={ratio.label}
                      onClick={() => onRatioChange(ratio)}
                      className={`px-3 py-1 rounded text-sm whitespace-nowrap ${
                        selectedRatio.label === ratio.label
                          ? "bg-blue-600 text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                    >
                      {ratio.label}
                    </button>
                  ))}
                </>
              )}
            </div>
            <div className="flex flex-col justify-end gap-2 mt-4">
              <button
                onClick={onCancel}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={onCropComplete}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>

        <div className="max-h-[90vh] overflow-hidden">
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
            circularCrop={circularCrop}
          >
            <img
              ref={imgRef}
              src={tempImage}
              alt="Crop me"
              onLoad={onImageLoad}
              className="h-[90vh] object-contain"
            />
          </ReactCrop>
        </div>
      </div>
    </div>
  );
};

export default CropModalDesktop;
