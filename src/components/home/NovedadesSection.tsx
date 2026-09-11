import { Link } from "react-router-dom";
import { Calendar, Briefcase, Image as ImageIcon } from "lucide-react";
import { getPublishedPosts } from "../../data/posts";
import { useAsync } from "../../hooks/useAsync";
import { formatEventDate } from "../../lib/format";

const cardStyles = [
  { bg: "bg-cobalto", text: "text-white" },
  { bg: "bg-menta", text: "text-indigo" },
  { bg: "bg-indigo", text: "text-white" },
];

const iconByCategory = {
  evento: Calendar,
  oportunidad: Briefcase,
  recap: ImageIcon,
  investigacion: ImageIcon,
};

export function NovedadesSection() {
  const { data: posts, loading } = useAsync(getPublishedPosts, []);
  const featured = posts?.slice(0, 3) ?? [];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-310 px-10">
        <div className="mb-9">
          <span className="mb-3.5 block font-semibold text-cobalto">
            actividad reciente
          </span>
          <h2 className="font-display text-[38px] font-extrabold leading-tight">
            Novedades de la comunidad
          </h2>
        </div>

        {loading && <p className="text-sm text-gris-50">Cargando...</p>}

        <div className="grid grid-cols-1 gap-5.5 sm:grid-cols-3">
          {featured.map((post, i) => {
            const style = cardStyles[i % cardStyles.length];
            const Icon = iconByCategory[post.category];
            return (
              <Link
                key={post.id}
                to={`/newsletter/${post.slug}`}
                className={`flex h-70 flex-col justify-between rounded-[18px] p-5.5 ${style.bg} ${style.text} transition-transform hover:-translate-y-1`}
              >
                <span
                  className={`self-start rounded-md px-2.5 py-1 font-mono text-[10px] ${
                    i === 1 ? "bg-indigo/15 text-indigo" : "bg-white/20"
                  }`}
                >
                  {post.category}
                </span>
                <div>
                  <h3 className="mb-1.5 font-display text-xl font-extrabold leading-tight">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs opacity-80">
                    <Icon size={14} />
                    {post.category === "evento"
                      ? formatEventDate(post.publishedAt) + " · Buenos Aires"
                      : `Publicado por ${post.author.name}`}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
