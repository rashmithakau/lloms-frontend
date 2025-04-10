import React from "react";

function LoadingWheel() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-t-transparent border-pink-500 rounded-full animate-spin"></div>
    </div>
  );
}

export default LoadingWheel;
