import { useState, type FormEvent } from "react";
import { Mail, Instagram, Music2, Twitter, Send, Copy, Check } from "lucide-react";
import { SiteNavbar } from "../components/layout/SiteNavbar";
import { SiteFooter } from "../components/layout/SiteFooter";
import { sendContactMessage } from "../data/contact";

const CONTACT_EMAIL = "steamgirlsclub@gmail.com";

const socials = [
  {
    icon: Instagram,
    handle: "@steamgirlsclub",
    href: "https://instagram.com/steamgirlsclub",
  },
  {
    icon: Music2,
    handle: "@steamgirlsclub",
    href: "https://tiktok.com/@steamgirlsclub",
  },
  {
    icon: Twitter,
    handle: "@steamgirlsclub",
    href: "https://x.com/steamgirlsclub",
  },
];

export function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setSubmitting(true);
    const result = await sendContactMessage(
      name.trim(),
      email.trim(),
      message.trim(),
    );
    setSubmitting(false);

    if (result.ok) {
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } else {
      setStatus("error");
      setError(result.error ?? "No pudimos enviar tu mensaje.");
    }
  }

  async function handleCopyEmail() {
    await navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="bg-soft">
      <SiteNavbar />

      <header className="relative overflow-hidden bg-indigo px-10 pb-12 pt-14">
        <div className="pointer-events-none absolute -left-40 -top-40 h-100 w-100 rounded-full border-60 border-menta/10" />
        <div className="relative z-10 mx-auto max-w-310">
          <span className="mb-2.5 block font-semibold text-menta">
            hablemos
          </span>
          <h1 className="max-w-140 font-display text-[32px] font-extrabold leading-tight text-white sm:text-[36px]">
            ¿Tenés una idea, una propuesta o simplemente querés saludar?
          </h1>
          <p className="mt-3 max-w-120 text-[15px] leading-relaxed text-[#C8C9E8]">
            Contanos por acá o escribinos directo a nuestro correo o redes —
            lo que te resulte más cómodo.
          </p>
        </div>
      </header>

      <section className="py-20">
        <div className="mx-auto grid max-w-310 grid-cols-1 gap-10 px-10 lg:grid-cols-[1.3fr_1fr]">
          <div className="rounded-3xl border border-gris-20 bg-white p-9 sm:p-12">
            {status === "success" ? (
              <div className="flex flex-col items-center py-16 text-center">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-menta/15">
                  <Send size={24} className="text-indigo" />
                </div>
                <h2 className="mb-2 font-display text-xl font-extrabold">
                  ¡Mensaje enviado!
                </h2>
                <p className="max-w-80 text-sm text-gris-50">
                  Gracias por escribirnos. El equipo de STEAM Girls va a leer
                  tu mensaje y te va a responder a la brevedad.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 className="mb-7 font-display text-2xl font-extrabold">
                  Escribinos
                </h2>
                <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-[13px] font-semibold text-grafito">
                      Nombre
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Tu nombre"
                      className="w-full rounded-xl border-[1.5px] border-gris-20 px-4 py-3.5 text-[15px] focus:border-cobalto focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[13px] font-semibold text-grafito">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      className="w-full rounded-xl border-[1.5px] border-gris-20 px-4 py-3.5 text-[15px] focus:border-cobalto focus:outline-none"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="mb-1.5 block text-[13px] font-semibold text-grafito">
                    Mensaje
                  </label>
                  <textarea
                    required
                    rows={7}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Contanos qué tenés en mente..."
                    className="w-full resize-none rounded-xl border-[1.5px] border-gris-20 px-4 py-3.5 text-[15px] focus:border-cobalto focus:outline-none"
                  />
                </div>

                {status === "error" && (
                  <p className="mb-4 rounded-lg bg-rosavapor px-4 py-2.5 text-sm text-[#993556]">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-full bg-cobalto px-7 py-3.5 text-[15px] font-bold text-white disabled:opacity-60"
                >
                  {submitting ? "Enviando..." : "Enviar mensaje"}
                </button>
              </form>
            )}
          </div>

          <div className="flex flex-col gap-5">
            <div className="rounded-3xl bg-indigo p-7">
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white">
                  <Mail size={22} />
                </div>
                <div>
                  <b className="mb-1 block text-[13px] font-mono text-menta">
                    escribinos directo
                  </b>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="font-display text-base font-extrabold text-white hover:underline"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
              <button
                onClick={handleCopyEmail}
                className="flex w-full items-center justify-center gap-2 rounded-full border-[1.5px] border-white/25 py-2.5 text-[13px] font-bold text-white transition-colors hover:border-white/50"
              >
                {copied ? (
                  <>
                    <Check size={15} /> Copiado
                  </>
                ) : (
                  <>
                    <Copy size={15} /> Copiar email
                  </>
                )}
              </button>
            </div>

            <div className="rounded-3xl bg-rosa p-7">
              <b className="mb-4 block text-[13px] font-mono text-indigo/70">
                seguinos y escribinos por acá
              </b>
              <div className="flex flex-col gap-3">
                {socials.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-2xl bg-indigo/10 px-4 py-3.5 transition-colors hover:bg-indigo/15"
                  >
                    <social.icon size={18} className="text-indigo" />
                    <span className="text-sm font-bold text-indigo">
                      {social.handle}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
