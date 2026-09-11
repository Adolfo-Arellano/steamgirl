import { Link, useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  Megaphone,
  CalendarDays,
  Briefcase,
  Mail,
  MessageSquare,
  ArrowLeft,
} from "lucide-react";
import Logo from "../../assets/logo.png";
import { useAuth } from "../../lib/auth";

const navItems = [
  { icon: LayoutGrid, label: "Panel general", active: true },
  { icon: Megaphone, label: "Novedades" },
  { icon: CalendarDays, label: "Eventos" },
  { icon: Briefcase, label: "Oportunidades" },
  { icon: Mail, label: "Suscriptas" },
  { icon: MessageSquare, label: "Moderación de comentarios" },
];

export function AdminSidebar() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <aside className="flex flex-col bg-indigo p-5">
      <Link to="/" className="mb-8 flex items-center justify-center">
        <img src={Logo} alt="STEAM Girls" className="h-15 w-auto" />
      </Link>
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <a
            key={item.label}
            className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[14.5px] font-semibold ${
              item.active
                ? "bg-white/10 text-white"
                : "text-[#B8BAE8] hover:text-white"
            }`}
          >
            <item.icon size={18} />
            {item.label}
          </a>
        ))}
      </nav>
      <div className="mt-auto border-t border-white/10 pt-5">
        {admin && (
          <div className="mb-3.5 flex items-center gap-2.5 px-2">
            <img
              src={admin.avatar_url}
              alt={admin.name}
              className="h-9 w-9 rounded-full object-cover"
            />
            <div>
              <b className="block text-[13.5px] text-white">{admin.name}</b>
              <span className="text-[11.5px] text-[#8688B8]">
                Administradora
              </span>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-2 text-[13px] text-[#8688B8] hover:text-white"
        >
          <ArrowLeft size={15} /> Cerrar sesión
        </button>
        <Link
          to="/"
          className="mt-2 flex items-center gap-2 px-2 text-[13px] text-[#8688B8] hover:text-white"
        >
          Volver al sitio
        </Link>
      </div>
    </aside>
  );
}
