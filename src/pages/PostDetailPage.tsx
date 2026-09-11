import { useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SiteNavbar } from "../components/layout/SiteNavbar";
import { CategoryTag } from "../components/ui/CategoryTag";
import { CommentSection } from "../components/newsletter/CommentSection";
import { getPostBySlug } from "../data/posts";
import { useAsync } from "../hooks/useAsync";
import { timeAgo } from "../lib/format";

export function PostDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const fetcher = useCallback(() => {
    if (!slug) return Promise.resolve(null);
    return getPostBySlug(slug);
  }, [slug]);

  const { data: post, loading, error } = useAsync(fetcher, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-soft">
        <SiteNavbar />
        <p className="px-10 py-16 text-center text-sm text-gris-50">
          Cargando publicación...
        </p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-soft">
        <SiteNavbar />
        <div className="px-10 py-16 text-center">
          <p className="mb-4 text-sm text-gris-50">
            No encontramos esta publicación.
          </p>
          <Link to="/newsletter" className="font-semibold text-cobalto">
            Volver al newsletter
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft">
      <SiteNavbar />

      <div className="mx-auto max-w-190 px-10 pb-24 pt-11">
        <Link
          to="/newsletter"
          className="mb-6 inline-flex items-center gap-2 rounded-full border-[1.5px] border-indigo px-4 py-2.5 text-[13px] font-bold text-indigo"
        >
          <ArrowLeft size={15} /> Volver al newsletter
        </Link>

        <CategoryTag category={post.category} className="mb-3.5" />
        <h1 className="mb-4 font-display text-[32px] font-extrabold leading-tight">
          {post.title}
        </h1>
        <div className="mb-7 flex items-center gap-2.5">
          <img
            src={post.author.avatarUrl}
            alt={post.author.name}
            className="h-9 w-9 rounded-full object-cover"
          />
          <span className="text-sm text-grafito">
            {post.author.name} · admin · {timeAgo(post.publishedAt)}
          </span>
        </div>

        <div className="mb-10 rounded-2xl border border-gris-20 bg-white p-7 text-[15.5px] leading-loose text-grafito">
          {post.body.map((paragraph, i) => (
            <p key={i} className={i < post.body.length - 1 ? "mb-4" : ""}>
              {paragraph}
            </p>
          ))}
        </div>

        <CommentSection postId={post.id} comments={post.comments} />
      </div>
    </div>
  );
}
