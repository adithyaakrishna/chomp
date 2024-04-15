import classNames from "classnames";
import { ReactNode } from "react";

type ButtonProps = {
  variant?:
    | "primary"
    | "secondary"
    | "warning"
    | "white"
    | "black"
    | "pink"
    | "pink-border";
  size?: "big" | "normal" | "small";
  disabled?: boolean;
  children: ReactNode;
  isFullWidth?: boolean;
  isPill?: boolean;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "secondary",
  size = "normal",
  disabled = false,
  children,
  isFullWidth = true,
  isPill = false,
  className,
  ...props
}: ButtonProps) {
  const classNameResult = classNames(
    `bg-${variant} text-btn-text-${variant} rounded-lg inline-flex justify-center items-center`,
    {
      "bg-opacity-100 border-white border-[1px]": variant === "secondary",
      "border-purple border-[1px]": variant === "pink-border",
      "!bg-disabled": disabled,
      "!text-btn-text-disabled": disabled,
      "cursor-default": disabled,
      "py-2 px-4": size === "small",
      "py-4 px-8": size === "normal",
      "py-4 px-16": size === "big",
      "rounded-2xl": size === "big",
      "font-semibold": size === "normal" || size === "small",
      "font-bold": size === "big",
      "text-sm": size === "normal" || size === "small",
      "text-base": size === "big",
      "w-full": isFullWidth,
      "!rounded-full": isPill,
    },
    className,
  );

  return (
    <button {...props} className={classNameResult}>
      {children}
    </button>
  );
}
