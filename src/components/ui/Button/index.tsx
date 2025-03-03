import { Spinner } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  type?: "submit" | "button";
  className?: string;
  isLoading?: boolean;
  onClick?: () => void;
}

const Button: FC<IButton> = ({
  children,
  type = "button",
  className = "",
  isLoading = false,
  onClick,
}) => {
  return !isLoading ? (
    <button
      type={type}
      className={`bg-primary h-12 py-3.5 px-6 text-travel-black text-base 768:text-sm font-bold rounded-[30px] transition-all active:scale-95 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  ) : (
    <button
      type={type}
      className={`inline-flex items-center justify-center bg-primary h-12 py-3.5 px-6 text-travel-black text-base 768:text-sm font-bold rounded-[30px] transition-all active:scale-95 ${className}`}
    >
      <Spinner color="#fff" />
    </button>
  );
};

export default Button;
