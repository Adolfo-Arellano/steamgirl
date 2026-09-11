import { useState, type FormEvent } from "react";
import type { Comment } from "../../types";
import { postComment } from "../../data/posts";
import { timeAgo } from "../../lib/format";

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
}

const avatarPalette = ["bg-lila", "bg-menta", "bg-coral", "bg-lavanda"];

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/**
 * Comentarios sin cuenta: solo se pide nombre + texto.
 * El status ("approved" o "pending") lo decide un trigger en la base de
 * datos según la tabla `blocked_words` — acá solo mostramos el resultado.
 */
export function CommentSection({ postId, comments }: CommentSectionProps) {
  const [localComments, setLocalComments] = useState(comments);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !body.trim()) return;

    setSubmitting(true);
    setNotice(null);

    const result = await postComment(postId, name.trim(), body.trim());

    setSubmitting(false);

    if (!result.ok) {
      setNotice(result.error ?? "No pudimos publicar tu comentario.");
      return;
    }

    if (result.status === "approved") {
      const newComment: Comment = {
        id: `optimistic-${Date.now()}`,
        authorName: name.trim(),
        body: body.trim(),
        createdAt: new Date().toISOString(),
      };
      setLocalComments((prev) => [newComment, ...prev]);
      setName("");
      setBody("");
    } else {
      // status === "pending": la tabla de blocked_words detectó algo.
      setNotice(
        "Tu comentario quedó a la espera de revisión y va a publicarse en breve.",
      );
      setName("");
      setBody("");
    }
  }

  return (
    <div className="rounded-2xl border border-gris-20 bg-white p-6.5">
      <h3 className="mb-5 font-display text-lg font-extrabold">
        {localComments.length} comentarios
      </h3>

      <form
        onSubmit={handleSubmit}
        className="mb-1.5 rounded-2xl border-[1.5px] border-gris-20 p-5"
      >
        <div className="mb-3">
          <label className="mb-1.5 block text-[13px] font-semibold text-grafito">
            Tu nombre
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: Marina G."
            className="w-full rounded-xl border-[1.5px] border-gris-20 px-4 py-3 font-body text-[15px] focus:border-cobalto focus:outline-none"
          />
        </div>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Dejá tu comentario..."
          rows={2}
          className="mb-3 w-full resize-none rounded-xl border-[1.5px] border-gris-20 px-4 py-3 font-body text-[15px] focus:border-cobalto focus:outline-none"
        />
        <div className="flex items-center justify-between gap-3">
          {notice && <p className="text-xs text-gris-50">{notice}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="ml-auto rounded-full bg-cobalto px-5 py-2.5 text-[13.5px] font-bold text-white disabled:opacity-60"
          >
            {submitting ? "Enviando..." : "Comentar"}
          </button>
        </div>
      </form>
      <p className="mb-6 mt-2 text-xs text-gris-50">
        No hace falta crear una cuenta — solo tu nombre y tu comentario.
      </p>

      <div className="flex flex-col">
        {localComments.map((comment, i) => (
          <div
            key={comment.id}
            className={`flex gap-4 py-4.5 ${i === 0 ? "" : "border-t border-gris-20"}`}
          >
            <div
              className={`flex h-10.5 w-10.5 shrink-0 items-center justify-center rounded-xl font-display text-sm font-extrabold text-indigo ${
                avatarPalette[i % avatarPalette.length]
              }`}
            >
              {initials(comment.authorName)}
            </div>
            <div className="flex-1">
              <div className="flex items-baseline justify-between">
                <b className="text-sm">{comment.authorName}</b>
                <span className="text-xs text-gris-50">
                  {timeAgo(comment.createdAt)}
                </span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-grafito">
                {comment.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
