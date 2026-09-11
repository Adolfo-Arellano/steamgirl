import { useMemo, useState } from "react";
import { SiteNavbar } from "../components/layout/SiteNavbar";
import { FeaturedPost } from "../components/newsletter/FeaturedPost";
import { CategoryChips } from "../components/newsletter/CategoryChips";
import { TimelineNode } from "../components/newsletter/TimelineNode";
import { SubscribeForm } from "../components/newsletter/SubscribeForm";
import { getPublishedPosts } from "../data/posts";
import { useAsync } from "../hooks/useAsync";
import type { PostCategory } from "../types";

export function NewsletterPage() {
  const [activeCategory, setActiveCategory] = useState<PostCategory | "todo">(
    "todo",
  );

  const { data: allPosts, loading, error } = useAsync(getPublishedPosts, []);

  const featured = allPosts?.[0];
  const rest = useMemo(() => allPosts?.slice(1) ?? [], [allPosts]);

  const filtered = useMemo(
    () =>
      activeCategory === "todo"
        ? rest
        : rest.filter((p) => p.category === activeCategory),
    [rest, activeCategory],
  );

  const editions = useMemo(() => {
    const groups = new Map<number, typeof filtered>();
    for (const post of filtered) {
      const group = groups.get(post.edition) ?? [];
      group.push(post);
      groups.set(post.edition, group);
    }
    return Array.from(groups.entries()).sort((a, b) => b[0] - a[0]);
  }, [filtered]);

  return (
    <div className="bg-soft">
      <SiteNavbar />

      <header className="relative overflow-hidden bg-indigo pt-16 pb-14">
        <div className="pointer-events-none absolute -right-64 -top-80 h-160 w-160 rounded-full border-90 border-rosa/8" />
        <div className="relative z-10 mx-auto max-w-310 px-10">
          <div className="mb-11 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <span className="mb-2.5 block font-semibold text-menta">
                el newsletter de steam girls
              </span>
              <h1 className="max-w-105 font-display text-[32px] font-extrabold leading-tight text-white">
                Eventos, oportunidades y novedades de la comunidad, edición a edición
              </h1>
            </div>
            <SubscribeForm variant="dark" compact className="w-full sm:w-auto" />
          </div>

          {loading && (
            <p className="pb-10 text-sm text-white/70">Cargando publicaciones...</p>
          )}
          {error && (
            <p className="pb-10 text-sm text-rosa">
              No pudimos cargar el newsletter: {error}
            </p>
          )}
          {featured && (
            <div className="flex flex-col gap-5">
              <FeaturedPost post={featured} />
              <CategoryChips active={activeCategory} onChange={setActiveCategory} />
            </div>
          )}
        </div>
      </header>

      <section className="py-19 pb-24">
        <div className="mx-auto max-w-190 px-10">
          {!loading && editions.length === 0 && (
            <p className="py-16 text-center text-gris-50">
              Todavía no hay publicaciones en esta categoría.
            </p>
          )}

          <div className="relative">
            {editions.length > 0 && (
              <div
                className="absolute bottom-2.5 left-7.25 top-2.5 w-0.75 rounded-full"
                style={{
                  background:
                    "linear-gradient(180deg, var(--color-cobalto), var(--color-rosa) 33%, var(--color-menta) 66%, var(--color-indigo))",
                }}
              />
            )}

            {editions.map(([edition, editionPosts], i) => (
              <div key={edition}>
                <div
                  className={`relative pl-19 font-mono text-xs text-gris-50 ${
                    i === 0 ? "mb-7" : "mb-7 mt-13"
                  }`}
                >
                  edición_{edition} {i === 0 ? "· más reciente" : ""}
                </div>
                {editionPosts.map((post) => (
                  <TimelineNode key={post.id} post={post} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-techblack py-20 text-center">
        <div className="mx-auto max-w-310 px-10">
          <span className="mb-4 block font-semibold text-menta">
            no te pierdas ninguna edición
          </span>
          <h2 className="mb-7 font-display text-[32px] font-extrabold text-white">
            Recibí el newsletter directo en tu correo
          </h2>
          <SubscribeForm variant="dark" />
        </div>
      </section>
    </div>
  );
}
