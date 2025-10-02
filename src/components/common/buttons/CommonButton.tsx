import React from "react";
import { twMerge } from "tailwind-merge";

type VariantType =
  | "primary"
  | "secondary"
  | "black"
  | "white"
  | "red-primary"
  | "red-secondary"
  | "green-primary";

interface CommonButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: VariantType;
  className?: string;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
}

function CommonButton({
  label,
  onClick,
  disabled,
  loading,
  variant = "primary",
  className,
  type = "button",
  icon,
}: CommonButtonProps) {
  const variantStyle = {
    primary: {
      text: "text-whitePrimary",
      border: "border-orangePrimary",
      bg: "bg-orangePrimary",
      hoverBg: "before:bg-primary",
      shadow: "hover:shadow-yellowPrimary",
      hoverText: "hover:text-orangePrimary",
    },
    secondary: {
      text: "text-yellowPrimary",
      border: "border-yellowPrimary",
      bg: "bg-transparent",
      hoverBg: "before:bg-yellowPrimary",
      shadow: "hover:shadow-primary",
      hoverText: "hover:text-primary",
    },
    black: {
      text: "text-white",
      border: "border-primary",
      bg: "bg-black-primary",
      hoverBg: "before:bg-white",
      shadow: "hover:shadow-primary",
      hoverText: "hover:text-black-primary",
    },
    white: {
      text: "text-primary",
      border: "border-whitePrimary",
      bg: "bg-white",
      hoverBg: "before:bg-primary",
      shadow: "hover:shadow-primary",
      hoverText: "hover:text-whitePrimary",
    },
    "red-primary": {
      text: "text-white",
      border: "border-redPrimary",
      bg: "bg-redPrimary",
      hoverBg: "before:bg-white",
      shadow: "hover:shadow-redPrimary",
      hoverText: "hover:text-redPrimary",

    },
    "red-secondary": {
      text: "text-redPrimary",
      border: "border-redPrimary",
      bg: "bg-transparent",
      hoverBg: "before:bg-redPrimary",
      shadow: "hover:shadow-primary",
      hoverText: "hover:text-primary",
    },
    "green-primary": {
      text: "text-white",
      border: "border-greenPrimary",
      bg: "bg-greenPrimary",
      hoverBg: "before:bg-whitePrimary",
      shadow: "hover:shadow-greenPrimary",
      hoverText: "hover:text-greenPrimary",
    },
  };

  const styles = variantStyle[variant] || variantStyle.primary;
  const isDisabled = disabled || loading;

  return (
    <button
      onClick={!isDisabled ? onClick : undefined}
      disabled={isDisabled || loading}
      type={type}
      className={twMerge(
        "cursor-pointer flex group items-center gap-2 min-w-fit text-nowrap relative w-full text-center overflow-hidden border px-2 md:px-4 py-2 md:py-2 font-medium text-base rounded-md transition-all",
        styles.border,
        styles.bg,
        styles.text,
        isDisabled && "opacity-70 cursor-not-allowed",
        !isDisabled &&
        `before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:transition-all before:duration-700 hover:before:left-0 hover:before:w-full`,
        !isDisabled && styles.hoverBg,
        !isDisabled && styles.hoverText,
        !isDisabled && styles.shadow,
        className
      )}
    >
      <span className="relative z-10 flex items-center gap-2 mx-auto">
        {loading ? (
          <>
            {" "}
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-45"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-90"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Processing...</span>
          </>
        ) : (
          label
        )}
        {icon ? <span className="">{icon}</span> : ""}
      </span>
    </button>
  );
}

export default CommonButton;
