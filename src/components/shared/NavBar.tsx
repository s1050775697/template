import React from "react";
import Button from "@/components/ui/Button";

interface NavBarProps {
  onToggleAIChat: () => void;
  isAIChatOpen: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ onToggleAIChat, isAIChatOpen }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-800 z-50 h-[38px] flex justify-center items-center">
      <div className="flex justify-center items-center h-[100%]">
        {/* <h1 className="text-white text-lg">Review Map with AI</h1> */}
        <div onClick={onToggleAIChat} className=" text-white cursor-pointer">
          {isAIChatOpen ? "Hide AI Chat" : "Show AI Chat"}
        </div>
      </div>
    </nav>
  );
};

export default NavBar; 