export type { PostCategory, PostStatus, CommentStatus } from "../lib/database.types";

export interface Admin {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
}

export interface Comment {
  id: string;
  authorName: string;
  body: string;
  createdAt: string;
}

import type { PostCategory } from "../lib/database.types";

export interface Post {
  id: string;
  slug: string;
  category: PostCategory;
  title: string;
  excerpt: string;
  body: string[];
  coverImageUrl?: string;
  eventDate?: string;
  author: Admin;
  publishedAt: string;
  edition: number;
  tags?: string[];
  status: "published" | "draft";
  commentCount: number;
  comments: Comment[];
}

export interface CategoryMeta {
  id: PostCategory;
  label: string;
  colorVar: string;
  bgVar: string;
}
