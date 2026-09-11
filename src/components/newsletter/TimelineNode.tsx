import { Link } from "react-router-dom";
import { MessageCircle, Clock, FlaskConical, Briefcase, CalendarDays, Image as ImageIcon } from "lucide-react";
import type { Post } from "../../types";
import { categoryMeta } from "../../data/categories";
import { timeAgo } from "../../lib/format";

const iconByCategory = {
  investigacion: FlaskConical,
  oportunidad: Briefcase,
  evento: CalendarDays,
  recap: ImageIcon,
};

interface TimelineNodeProps {
  post: Post;
}

export function TimelineNode({ post }: TimelineNodeProps) {
  const meta = categoryMeta[post.category];
  const Icon = iconByCategory[post.category];

  return (
    <Link
      to={`/newsletter/${post.slug}`}
      className="group relative mb-8.5 block pl-19"
    >
      <div
        className="absolute left-4.5 top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full shadow-[0_0_0_6px_var(--color-soft)]"
        style={{ backgroundColor: meta.bgVar }}
      >
        <Icon size={13} style={{ color: meta.colorVar }} />
      </div>
      <div className="rounded-2xl border border-gris-20 bg-white p-6 transition-transform group-hover:translate-x-1.5">
        <span
          className="mb-3 inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-[10.5px] font-medium"
          style={{ backgroundColor: meta.bgVar, color: meta.colorVar }}
        >
          {meta.label}
        </span>
        <h3 className="mb-2 text-[18px] font-bold leading-snug">
          {post.title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-gris-50">
          {post.excerpt}
        </p>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <img
              src={post.author.avatarUrl}
              alt={post.author.name}
              className="h-6.5 w-6.5 rounded-full object-cover"
            />
            <span className="text-[12.5px] font-semibold text-grafito">
              {post.author.name} · admin
            </span>
          </div>
          <div className="flex gap-4 text-[12.5px] text-gris-50">
            <span className="flex items-center gap-1.5">
              <MessageCircle size={14} /> {post.commentCount}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} /> {timeAgo(post.publishedAt)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
