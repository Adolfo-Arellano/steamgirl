import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { LinkButton } from "../ui/Button";
import { getSiteMetrics, getUpcomingEvent, type UpcomingEvent } from "../../data/metrics";

function formatEventDate(isoDate: string): string {
  const [, month, day] = isoDate.split("-");
  return `${day}.${month}`;
}

export function Hero() {
  const [stats, setStats] = useState([
    { value: "—", label: "suscriptas al newsletter" },
    { value: "—", label: "publicaciones realizadas" },
    { value: "—", label: "comentarios de la comunidad" },
  ]);
  const [upcomingEvent, setUpcomingEvent] = useState<UpcomingEvent | null>(null);
  const [eventChecked, setEventChecked] = useState(false);

  useEffect(() => {
    getSiteMetrics().then((metrics) => {
      setStats([
        {
          value: `+${metrics.subscriberCount}`,
          label: "suscriptas al newsletter",
        },
        {
          value: `${metrics.publishedPostCount}`,
          label: "publicaciones realizadas",
        },
        {
          value: `${metrics.approvedCommentCount}`,
          label: "comentarios de la comunidad",
        },
      ]);
    });

    getUpcomingEvent().then((event) => {
      setUpcomingEvent(event);
      setEventChecked(true);
    });
  }, []);

  return (
    <header className="relative overflow-hidden bg-indigo pb-28 pt-24">
      <div
        className="pointer-events-none absolute -right-32 -top-36 h-130 w-130 rounded-full opacity-20 blur-sm"
        style={{
          background:
            "conic-gradient(from 180deg, var(--color-rosa), var(--color-menta), var(--color-cobalto), var(--color-rosa))",
        }}
      />
      <div className="relative z-10 mx-auto grid max-w-310 grid-cols-1 items-center gap-10 px-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-menta/30 bg-menta/10 px-3.5 py-1.5 font-mono text-xs text-menta">
            ● comunidad activa · buenos aires
          </span>
          <h1 className="mb-5 font-display text-[42px] font-extrabold leading-[1.05] text-white sm:text-[52px]">
            Crecer en <span className="text-rosa">tecnología</span>, juntas.
          </h1>
          <p className="mb-8 max-w-120 text-lg leading-relaxed text-[#C8C9E8]">
            Una red que acompaña, conecta e impulsa a quienes trabajan en
            tecnología o buscan sus primeros pasos en el sector.
          </p>
          <div className="mb-13 flex flex-wrap gap-3.5">
            <LinkButton to="/newsletter" variant="accent">
              Leer el newsletter
            </LinkButton>
            <LinkButton to="/newsletter" variant="ghost-light">
              Ver la comunidad
            </LinkButton>
          </div>
          <div className="mt-13 flex flex-wrap gap-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <b className="block font-display text-[28px] font-extrabold text-white">
                  {stat.value}
                </b>
                <span className="text-[13px] text-[#9A9CC4]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden h-105 lg:block">
          <div className="absolute -top-2 left-5 h-3.5 w-3.5 rounded-full bg-menta shadow-[0_0_0_6px_rgba(43,213,159,0.2)]" />
          <div className="absolute left-14 top-2 h-80 w-65 overflow-hidden rounded-[20px] bg-white p-4 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&q=80"
              alt="Encuentro de la comunidad STEAM Girls"
              className="h-full w-full rounded-2xl object-cover"
            />
          </div>

          {eventChecked && upcomingEvent && (
            <Link
              to={`/newsletter/${upcomingEvent.slug}`}
              className="absolute bottom-9 right-5 w-52.5 rounded-2xl bg-white p-4 shadow-2xl transition-transform hover:-translate-y-1"
            >
              <span className="mb-2 inline-block rounded bg-menta px-2 py-1 font-mono text-[10px] text-indigo">
                próximo evento
              </span>
              <b className="mb-1 block text-sm leading-snug">
                {upcomingEvent.title}
              </b>
              <span className="flex items-center gap-1.5 text-xs text-gris-50">
                <Calendar size={13} /> {formatEventDate(upcomingEvent.eventDate)}
              </span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
