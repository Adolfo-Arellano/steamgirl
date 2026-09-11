import { categoryMeta } from "../../data/categories";
import type { PostCategory } from "../../types";

interface CategoryTagProps {
  category: PostCategory;
  className?: string;
}

export function CategoryTag({ category, className = "" }: CategoryTagProps) {
  const meta = categoryMeta[category];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-[10.5px] font-medium ${className}`}
      style={{ backgroundColor: meta.bgVar, color: meta.colorVar }}
    >
      {meta.label}
    </span>
  );
}
