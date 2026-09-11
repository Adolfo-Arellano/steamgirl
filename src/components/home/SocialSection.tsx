import { Instagram, Linkedin, Music2 } from "lucide-react";

const socials = [
  {
    icon: Instagram,
    handle: "@steamgirlsclub",
    detail: "Instagram · +12k seguidoras",
    href: "https://instagram.com/steamgirlsclub",
  },
  {
    icon: Music2,
    handle: "@steamgirlsclub",
    detail: "TikTok · contenido y recaps de eventos",
    href: "https://tiktok.com/@steamgirlsclub",
  },
  {
    icon: Linkedin,
    handle: "@steamgirlsclub",
    detail: "Linkedin · novedades y oportunidades",
    href: "https://www.linkedin.com/company/steam-girls/",
  },
];

export function SocialSection() {
  return (
    <section className="relative overflow-hidden bg-rosa py-24">
      <div className="pointer-events-none absolute -left-44 -top-56 h-130 w-130 rounded-full border-70 border-white/15" />
      <div className="relative z-10 mx-auto max-w-310 px-10">
        <div className="mb-12 max-w-140">
          <span className="block font-semibold text-indigo/70">seguinos</span>
          <h2 className="mt-3.5 font-display text-[36px] font-extrabold leading-tight text-indigo">
            La conversación sigue en redes
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5.5 sm:grid-cols-3">
          {socials.map((social) => (
            <a
              key={social.detail}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-50 flex-col gap-10 rounded-2xl bg-indigo p-7 transition-transform hover:-translate-y-1"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white">
                <social.icon size={20} />
              </div>
              <div>
                <b className="mb-1 block text-lg text-white">
                  {social.handle}
                </b>
                <span className="text-[13.5px] text-[#B8BAE8]">
                  {social.detail}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
