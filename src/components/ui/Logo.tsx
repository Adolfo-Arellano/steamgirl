interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
}

export function Logo({ variant = "dark", className = "" }: LogoProps) {
  const textColor = variant === "light" ? "text-white" : "text-cobalto";

  return (
    <span
      className={`font-display font-extrabold text-[22px] ${textColor} ${className}`}
    >
      steamgirls<span className="text-rosa">.</span>
    </span>
  );
}
