import React from "react";

const Switch = () => {
  return (
    <label className="relative inline-block w-16 h-8">
      <input type="checkbox" className="sr-only peer" />
      <span className="absolute inset-0 bg-gray-800 transition rounded-full peer-focus:ring-2 peer-focus:ring-green-400 peer-checked:bg-travel-gray-2"></span>
      <span className="absolute h-6 w-6 bg-gray-400 rounded-full bottom-1 left-1 transition-transform peer-checked:translate-x-8 peer-checked:bg-primary"></span>
    </label>
  );
};

export default Switch;
