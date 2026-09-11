import { Eye, UserCheck, Share2, Clock } from "lucide-react";
import type { Post } from "../../types";
import { categoryMeta } from "../../data/categories";
import { timeAgo } from "../../lib/format";

interface PostRowProps {
  post: Post;
  isLast?: boolean;
}

export function PostRow({ post, isLast = false }: PostRowProps) {
  const meta = categoryMeta[post.category];

  return (
    <div className={`flex gap-4 py-4.5 ${isLast ? "" : "border-b border-gris-20"}`}>
      <img
        src={post.author.avatarUrl}
        alt={post.author.name}
        className="h-10.5 w-10.5 shrink-0 rounded-xl object-cover"
      />
      <div className="flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span
              className="mb-1.5 inline-block rounded-md px-2.5 py-1 font-mono text-[10px]"
              style={{ backgroundColor: meta.bgVar, color: meta.colorVar }}
            >
              {meta.label.toUpperCase()}
            </span>
            <b className="block text-sm">{post.title}</b>
          </div>
          <span
            className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold ${
              post.status === "published"
                ? "bg-[#EAF3DE] text-[#3B6D11]"
                : "bg-gris-20 text-gris-50"
            }`}
          >
            {post.status === "published" ? "Publicado" : "Borrador"}
          </span>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-grafito">
          {post.excerpt}
        </p>
        <div className="mt-2.5 flex gap-4.5 text-[12.5px] text-gris-50">
          <span className="flex items-center gap-1.5">
            <Eye size={14} /> {post.commentCount * 15 + 120} vistas
          </span>
          {post.category === "evento" && (
            <span className="flex items-center gap-1.5">
              <UserCheck size={14} /> 62 inscriptas
            </span>
          )}
          {post.category === "oportunidad" && (
            <span className="flex items-center gap-1.5">
              <Share2 size={14} /> 14 compartidas
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Clock size={14} /> {timeAgo(post.publishedAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
