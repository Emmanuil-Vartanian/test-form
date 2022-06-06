import React from "react";

import "./style.css";

interface ButtonProps {
  title: string;
  onClick?: () => void;
  variant: "contained" | "outlined";
  type?: "submit" | "button";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  variant,
  type,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${variant} ${className || ""}`}
      type={type}
    >
      {title}
    </button>
  );
};

export default Button;
