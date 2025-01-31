import React from "react";

function Loader({ className }: { className?: string }) {
  return (
    <div className="element-center">
      <div
        className={`size-4 border-2 border-t-2 border-gray-200 rounded-full animate-spin border-t-black ${className}`}
      ></div>
    </div>
  );
}

export default Loader;
