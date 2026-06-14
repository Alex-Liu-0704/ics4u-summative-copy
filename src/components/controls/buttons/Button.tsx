import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "grey" | "red";
  disabled?: boolean;
  onClick: () => void;
};

const baseStyles = "px-4 py-2 text-sm rounded-md transition font-medium disabled:opacity-50 disabled:cursor-not-allowed";

const variants = {
  grey: "bg-gray-700 hover:bg-gray-600 text-white",
  primary: "bg-blue-500 hover:bg-blue-600 text-white",
  red: "bg-red-500 hover:bg-red-600 text-white",
};

export const Button = ({ children, variant = "primary", disabled = false, onClick }: ButtonProps) => {
  return (
    <button className={`${baseStyles} ${variants[variant]}`} disabled={disabled} onClick={onClick} type="button">
      {children}
    </button>
  );
};
