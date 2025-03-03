import React from "react";

const Loader = () => {
  return (
    <div className="bg-[#202628] flex justify-center items-center w-full h-full">
      <div className="relative inline-block w-12 h-12 loader-shape-3">
        <div className="absolute w-[30px] h-[20px] rounded-full bg-white/20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-[15px]"></div>
        <div className="absolute w-[20px] h-[20px] rounded-[100%_100%_100%_0] shadow-[0_0_0_2px_rgba(255,255,255,1)] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[-46deg] mt-[20px] animate-anm-SL-3-move"></div>
      </div>
    </div>
  );
};

export default Loader;
