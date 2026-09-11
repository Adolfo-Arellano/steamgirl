import { supabase } from "../lib/supabase";

export interface SiteMetrics {
  subscriberCount: number;
  publishedPostCount: number;
  approvedCommentCount: number;
}

/**
 * Métricas reales para el Hero del Home (y reutilizables en el dashboard
 * de admin). Cada conteo usa { count: "exact", head: true } — Supabase
 * devuelve solo el total, sin traer las filas, así es liviano.
 */
export async function getSiteMetrics(): Promise<SiteMetrics> {
  const [subscribers, posts, comments] = await Promise.all([
    supabase.from("subscribers").select("*", { count: "exact", head: true }),
    supabase
      .from("posts")
      .select("*", { count: "exact", head: true })
      .eq("status", "published"),
    supabase
      .from("comments")
      .select("*", { count: "exact", head: true })
      .eq("status", "approved"),
  ]);

  return {
    subscriberCount: subscribers.count ?? 0,
    publishedPostCount: posts.count ?? 0,
    approvedCommentCount: comments.count ?? 0,
  };
}

export interface UpcomingEvent {
  title: string;
  slug: string;
  eventDate: string;
}

/**
 * El próximo evento real: busca entre los posts de categoría "evento",
 * publicados, con event_date >= hoy, y devuelve el más cercano.
 * Devuelve null si no hay ninguno programado a futuro.
 */
export async function getUpcomingEvent(): Promise<UpcomingEvent | null> {
  const today = new Date().toISOString().slice(0, 10);

  const { data, error } = await supabase
    .from("posts")
    .select("title, slug, event_date")
    .eq("category", "evento")
    .eq("status", "published")
    .gte("event_date", today)
    .order("event_date", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error || !data || !data.event_date) return null;

  return {
    title: data.title,
    slug: data.slug,
    eventDate: data.event_date,
  };
}
