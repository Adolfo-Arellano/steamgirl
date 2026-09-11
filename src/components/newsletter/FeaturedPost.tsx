import { Link } from "react-router-dom";
import type { Post } from "../../types";
import { timeAgo } from "../../lib/format";

interface FeaturedPostProps {
  post: Post;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <Link
      to={`/newsletter/${post.slug}`}
      className="grid grid-cols-1 overflow-hidden rounded-[28px] bg-cobalto md:grid-cols-[1fr_0.85fr]"
    >
      <div className="relative min-h-60 overflow-hidden md:min-h-90">
        {post.coverImageUrl && (
          <img
            src={post.coverImageUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-r from-cobalto/10 to-transparent md:bg-[linear-gradient(100deg,var(--color-cobalto)_0%,rgba(43,67,213,0.15)_60%)]" />
      </div>
      <div className="flex flex-col justify-center p-9 text-white sm:p-11">
        <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 font-mono text-[11.5px]">
          ● edición_{post.edition} · destacado
        </span>
        <h2 className="mb-4 font-display text-[26px] font-extrabold leading-[1.18] sm:text-[30px]">
          {post.title}
        </h2>
        <p className="mb-6.5 text-[14.5px] leading-relaxed text-[#D6DBF8]">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-3">
          <img
            src={post.author.avatarUrl}
            alt={post.author.name}
            className="h-8.5 w-8.5 rounded-full object-cover"
          />
          <div>
            <b className="block text-[13px]">{post.author.name} · admin</b>
            <span className="text-xs text-[#B8BAE8]">
              {timeAgo(post.publishedAt)} · {post.commentCount} comentarios
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
