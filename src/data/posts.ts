import { supabase } from "../lib/supabase";
import type { Post, Comment, Admin } from "../types";
import type { Database } from "../lib/database.types";

type PostRow = Database["public"]["Tables"]["posts"]["Row"];
type AdminRow = Database["public"]["Tables"]["admins"]["Row"];
type CommentRow = Database["public"]["Tables"]["comments"]["Row"];

function mapAdmin(row: AdminRow): Admin {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    bio: row.bio,
    avatarUrl: row.avatar_url,
  };
}

function mapComment(row: CommentRow): Comment {
  return {
    id: row.id,
    authorName: row.author_name,
    body: row.body,
    createdAt: row.created_at,
  };
}

function mapPost(
  row: PostRow & { admins: AdminRow; comment_count?: number },
  comments: Comment[] = [],
): Post {
  return {
    id: row.id,
    slug: row.slug,
    category: row.category,
    title: row.title,
    excerpt: row.excerpt,
    body: row.body.split("\n\n"),
    coverImageUrl: row.cover_image_url ?? undefined,
    author: mapAdmin(row.admins),
    publishedAt: row.published_at ?? row.created_at,
    edition: row.edition,
    tags: row.tags,
    status: row.status,
    eventDate: row.event_date ?? undefined,
    commentCount: row.comment_count ?? comments.length,
    comments,
  };
}

/** Lista de posts publicados, más recientes primero. Para el listado del newsletter y el Home. */
export async function getPublishedPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts_with_comment_count")
    .select("*, admins(*)")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map((row) => mapPost(row));
}

/** Un post por slug, con sus comentarios aprobados. Para la página de detalle. */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data: postRow, error: postError } = await supabase
    .from("posts")
    .select("*, admins(*)")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (postError || !postRow) return null;

  const { data: commentRows, error: commentsError } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postRow.id)
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (commentsError) throw commentsError;

  return mapPost(postRow, (commentRows ?? []).map(mapComment));
}

/**
 * Publica un nuevo comentario (sin cuenta, solo nombre + texto).
 * El status ("approved" o "pending") lo decide el trigger `moderate_comment`
 * en la base de datos según la tabla `blocked_words` — el cliente no lo elige.
 */
export async function postComment(
  postId: string,
  authorName: string,
  body: string,
): Promise<{ ok: boolean; status?: "approved" | "pending"; error?: string }> {
  const { data, error } = await supabase
    .from("comments")
    .insert({ post_id: postId, author_name: authorName, body })
    .select("status")
    .single();

  if (error) return { ok: false, error: error.message };
  return { ok: true, status: data.status };
}

/** Suscribe un email al newsletter. */
export async function subscribeEmail(
  email: string,
): Promise<{ ok: boolean; error?: string }> {
  const { error } = await supabase.from("subscribers").insert({ email });

  if (error) {
    // Código 23505 = violación de constraint unique (email repetido)
    if (error.code === "23505") {
      return { ok: false, error: "Ese email ya está suscripto." };
    }
    return { ok: false, error: "No pudimos guardar tu suscripción." };
  }
  return { ok: true };
}