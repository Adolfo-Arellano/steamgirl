import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";

export type ButtonVariant = "primary" | "accent" | "ghost" | "ghost-light";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-cobalto text-white hover:-translate-y-0.5",
  accent: "bg-rosa text-indigo hover:-translate-y-0.5",
  ghost:
    "bg-transparent text-indigo border-[1.5px] border-indigo hover:-translate-y-0.5",
  "ghost-light":
    "bg-transparent text-white border-[1.5px] border-white/50 hover:-translate-y-0.5",
};

const baseClasses =
  "inline-flex items-center gap-2 rounded-full px-6 py-3 text-[15px] font-bold transition-transform duration-150 cursor-pointer";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

/** Botón estándar — renderiza un <button>. Usar para acciones (submit, onClick). */
export function Button({
  variant = "primary",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

interface LinkButtonProps extends LinkProps {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
}

/** Mismo estilo que Button pero renderiza un <Link> de react-router — usar para navegación. */
export function LinkButton({
  variant = "primary",
  className = "",
  children,
  ...rest
}: LinkButtonProps) {
  return (
    <Link
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
