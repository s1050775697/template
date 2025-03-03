import React from "react";
import Button from "@/components/ui/Button";
import Image from "next/image"; // 引入 Image 组件用于 SVG 图标

interface LocationModalProps {
  locations: string[];
  onClose: () => void;
  onLocationSelect: (location: string) => void;
}

const LocationModal: React.FC<LocationModalProps> = ({ locations, onClose, onLocationSelect }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-4 max-w-md w-full flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold">Select a location</h2>
          <Button onClick={onClose} className="p-1">
            <Image src="/svgs/close.svg" alt="关闭" width={20} height={20} />
          </Button>
        </div>
        <div className="flex flex-col gap-2 overflow-y-auto flex-grow">
          {locations.map((location, index) => (
            <Button
              key={index}
              onClick={() => {
                onLocationSelect(location);
                onClose(); // 选择地点后关闭模态框
              }}
              className="bg-secondary text-white rounded-md p-1 text-sm" 
            >
              {location}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationModal; 