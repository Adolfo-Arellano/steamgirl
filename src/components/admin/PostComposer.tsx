import { useState, type FormEvent } from "react";
import { Link as LinkIcon } from "lucide-react";
import { categoryMeta, categoryOrder } from "../../data/categories";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../lib/auth";
import { ImageUploadField } from "./ImageUploadField";
import type { PostCategory } from "../../types";

interface PostComposerProps {
  onPublished?: () => void;
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

export function PostComposer({ onPublished }: PostComposerProps) {
  const { admin } = useAuth();
  const [category, setCategory] = useState<PostCategory>("evento");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent, status: "draft" | "published") {
    e.preventDefault();
    if (!admin || !title.trim() || !body.trim()) return;
    if (category === "evento" && !eventDate) {
      setError("Elegí la fecha del evento antes de publicar.");
      return;
    }

    setSubmitting(true);
    setError(null);

    const excerpt = body.trim().split("\n\n")[0].slice(0, 180);

    const { error: insertError } = await supabase.from("posts").insert({
      slug: `${slugify(title)}-${Date.now().toString(36)}`,
      category,
      title: title.trim(),
      excerpt,
      body: body.trim(),
      cover_image_url: coverImageUrl,
      event_date: category === "evento" ? eventDate : null,
      author_id: admin.id,
      edition: 1, // TODO: calcular la edición vigente (ej. última + 1)
      status,
      published_at: status === "published" ? new Date().toISOString() : null,
    });

    setSubmitting(false);

    if (insertError) {
      setError("No pudimos publicar. Probá de nuevo.");
      return;
    }

    setTitle("");
    setBody("");
    setEventDate("");
    setCoverImageUrl(null);
    onPublished?.();
  }

  return (
    <div className="mb-6 rounded-2xl border border-gris-20 bg-white p-6.5">
      <h3 className="mb-5 font-display text-lg font-extrabold">
        Nueva publicación
      </h3>
      <form className="rounded-2xl border-[1.5px] border-dashed border-gris-20 p-5">
        <div className="mb-4 flex flex-wrap gap-2">
          {categoryOrder.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-full border-[1.5px] px-4 py-2 text-[13px] font-semibold ${
                category === cat
                  ? "border-cobalto bg-cobalto text-white"
                  : "border-gris-20 text-gris-50"
              }`}
            >
              {categoryMeta[cat].label}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título de la publicación"
          className="mb-3 w-full border-b border-gris-20 bg-transparent pb-2 font-body text-base font-semibold focus:outline-none"
        />

        {category === "evento" && (
          <div className="mb-4">
            <label className="mb-1.5 block text-[13px] font-semibold text-grafito">
              Fecha del evento
            </label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="rounded-xl border-[1.5px] border-gris-20 px-4 py-2.5 text-[14px] focus:border-cobalto focus:outline-none"
            />
            <p className="mt-1.5 text-xs text-gris-50">
              Se usa para mostrar el próximo evento en la portada del sitio.
            </p>
          </div>
        )}

        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="¿Qué querés compartir con la comunidad hoy? (separá párrafos con una línea en blanco)"
          rows={4}
          className="mb-4 w-full resize-none bg-transparent font-body text-[15px] focus:outline-none"
        />

        <ImageUploadField
          bucket="post-covers"
          label="Imagen de portada (opcional)"
          value={coverImageUrl}
          onChange={setCoverImageUrl}
          aspect="wide"
        />

        {error && <p className="mt-3 text-sm text-rosa">{error}</p>}
        <div className="mt-3.5 flex items-center justify-between border-t border-gris-20 pt-3.5">
          <div className="flex gap-4 text-gris-50">
            <LinkIcon size={18} />
          </div>
          <div className="flex gap-2.5">
            <button
              type="button"
              disabled={submitting}
              onClick={(e) => handleSubmit(e, "draft")}
              className="rounded-full border-[1.5px] border-indigo px-4.5 py-2.5 text-[13.5px] font-bold text-indigo disabled:opacity-60"
            >
              Guardar borrador
            </button>
            <button
              type="button"
              disabled={submitting}
              onClick={(e) => handleSubmit(e, "published")}
              className="rounded-full bg-cobalto px-5 py-2.5 text-[13.5px] font-bold text-white disabled:opacity-60"
            >
              {submitting ? "Publicando..." : "Publicar"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
