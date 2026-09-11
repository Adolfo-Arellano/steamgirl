import { Link } from "react-router-dom";
import { Logo } from "../../components/ui/Logo";

export function SiteFooter() {
  return (
    <footer className="bg-indigo pb-8 pt-16">
      <div className="mx-auto max-w-310 px-10">
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-12 sm:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo variant="light" className="mb-3.5 block" />
            <p className="max-w-65 text-sm leading-relaxed text-[#9A9CC4]">
              Una comunidad de personas que forman parte del ecosistema
              tecnológico o buscan incorporarse a él.
            </p>
          </div>
          <FooterCol
            title="COMUNIDAD"
            links={[
              { label: "Newsletter", to: "/newsletter" },
              { label: "Eventos", to: "/newsletter" },
              { label: "Oportunidades", to: "/newsletter" },
            ]}
          />
          <FooterCol
            title="SOBRE NOSOTRAS"
            links={[
              { label: "Quiénes somos", to: "/" },
              { label: "El equipo", to: "/" },
              { label: "Contacto", to: "/contacto" },
            ]}
          />
          <FooterCol
            title="SEGUINOS"
            links={[
              { label: "Instagram", to: "https://instagram.com/steamgirlsclub" },
              { label: "TikTok", to: "https://tiktok.com/@steamgirlsclub" },
              { label: "X (Twitter)", to: "https://x.com/steamgirlsclub" },
            ]}
          />
        </div>
        <div className="flex flex-col gap-2 pt-6 text-[13px] text-[#7678A8] sm:flex-row sm:justify-between">
          <span>© 2026 STEAM Girls. Crecer en tecnología, juntas.</span>
          <span>@steamgirlsclub</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; to: string }[];
}) {
  return (
    <div>
      <b className="mb-4 block font-mono text-[13px] font-normal text-white">
        {title}
      </b>
      {links.map((link) => (
        <Link
          key={link.label}
          to={link.to}
          className="mb-2.5 block text-sm text-[#B8BAE8] hover:text-white"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
