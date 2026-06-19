import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "solid" | "outline";
type ButtonSize = "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const BASE_CLASS =
  "inline-flex items-center justify-center rounded-xl font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50";

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  solid: "bg-primary text-primary-foreground hover:bg-primary/90",
  outline:
    "border border-primary bg-surface-soft text-primary hover:bg-primary/5",
};

const SIZE_CLASS: Record<ButtonSize, string> = {
  md: "px-5 py-3.5 text-sm",
  lg: "px-6 py-4 text-base",
};

export function Button({
  variant = "solid",
  size = "md",
  type = "button",
  className = "",
  ...props
}: ButtonProps) {
  const classes = `${BASE_CLASS} ${VARIANT_CLASS[variant]} ${SIZE_CLASS[size]} ${className}`;

  return <button type={type} className={classes.trim()} {...props} />;
}
