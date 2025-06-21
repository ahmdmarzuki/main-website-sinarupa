import React from "react";

const LoadingSpinner = ({ size = "h-32 w-32", fullScreen = true }) => {
  const containerClasses = fullScreen
    ? "flex justify-center items-center h-screen w-full bg-white bg-opacity-80"
    : "flex justify-center items-center";

  const spinnerClasses = `animate-spin rounded-full border-t-4 border-b-4 border-purple-500 ${size}`;

  return (
    <div className={containerClasses}>
      <div className={spinnerClasses}></div>
    </div>
  );
};

export default LoadingSpinner;
