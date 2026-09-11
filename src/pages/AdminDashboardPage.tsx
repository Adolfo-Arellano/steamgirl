import { Plus } from "lucide-react";
import { AdminSidebar } from "../components/admin/AdminSidebar";
import { MetricCard } from "../components/admin/MetricCard";
import { PostComposer } from "../components/admin/PostComposer";
import { PostRow } from "../components/admin/PostRow";
import { getPublishedPosts } from "../data/posts";
import { useAsync } from "../hooks/useAsync";

export function AdminDashboardPage() {
  const {
    data: posts,
    loading,
    refetch,
  } = useAsync(getPublishedPosts, []);

  const recentPosts = posts?.slice(0, 3) ?? [];

  return (
    <div className="grid min-h-screen grid-cols-[260px_1fr] bg-soft">
      <AdminSidebar />

      <main className="p-9">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="font-display text-[28px] font-extrabold">
              Panel de novedades
            </h1>
            <p className="mt-1.5 text-sm text-gris-50">
              Publicá eventos, oportunidades y recaps para toda la comunidad.
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-full bg-cobalto px-5 py-2.5 text-[14px] font-bold text-white">
            <Plus size={17} /> Nueva publicación
          </button>
        </div>

        <div className="mb-9 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <MetricCard
            label="SUSCRIPTAS AL NEWSLETTER"
            value="—"
            trend="Conectar tabla subscribers"
            trendTone="neutral"
          />
          <MetricCard
            label="PUBLICACIONES DEL MES"
            value={posts?.length ?? "—"}
          />
          <MetricCard
            label="PRÓXIMO EVENTO"
            value={<span className="text-lg">—</span>}
            trend="Conectar próximo evento"
            trendTone="neutral"
          />
          <MetricCard
            label="COMENTARIOS PENDIENTES"
            value="—"
            trend="Conectar tabla comments"
            trendTone="neutral"
          />
        </div>

        <PostComposer onPublished={refetch} />

        <div className="rounded-2xl border border-gris-20 bg-white p-6.5">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="font-display text-lg font-extrabold">
              Publicaciones recientes
            </h3>
            <a href="#" className="text-[13.5px] font-semibold text-cobalto">
              Ver todas
            </a>
          </div>
          {loading && <p className="text-sm text-gris-50">Cargando...</p>}
          {recentPosts.map((post, i) => (
            <PostRow
              key={post.id}
              post={post}
              isLast={i === recentPosts.length - 1}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
