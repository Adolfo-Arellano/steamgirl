import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.png";

const navLinks = [
  { to: "/", label: "Inicio" },
  { to: "/newsletter", label: "Newsletter" },
  { to: "/contacto", label: "Contacto" },
];

export function SiteNavbar() {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b border-techblack/10 bg-soft/95 py-5 backdrop-blur">
      <div className="mx-auto flex max-w-310 items-center justify-between px-10">
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="STEAM Girls" className="h-11 w-auto" />
        </Link>

        <div className="hidden gap-2 sm:flex">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-2 rounded-full border-[1.5px] px-4 py-2 text-[13.5px] font-bold transition-colors ${
                  isActive
                    ? "border-techblack bg-techblack text-white"
                    : "border-gris-20 text-grafito hover:border-gris-50"
                }`}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    backgroundColor: isActive
                      ? "var(--color-menta)"
                      : "var(--color-rosa)",
                  }}
                />
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
