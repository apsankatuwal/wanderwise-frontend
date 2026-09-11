import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CustomButton = ({
  children,
  to,
  variant = "primary",
  icon = false,
  className = "",
}) => {
  const navigate = useNavigate();

  const baseStyles =
    "inline-flex items-center justify-center gap-2 text-sm font-medium px-5 py-2.5 rounded-lg transition-colors";

  const variants = {
    primary:
      "bg-blue-800 text-white hover:bg-blue-900",

    secondary:
      "border border-slate-300 text-slate-700 hover:bg-slate-50",

    outline:
      "border border-blue-700 text-blue-700 hover:bg-blue-50",

    dark:
      "bg-slate-900 text-white hover:bg-slate-800",
  };

  const handleClick = () => {
    if (to) {
      navigate(to);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}

      {icon && <ArrowRight className="w-4 h-4" />}
    </button>
  );
};

export default CustomButton;