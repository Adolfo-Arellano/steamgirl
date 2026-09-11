export type PostCategory = "evento" | "oportunidad" | "recap" | "investigacion";
export type PostStatus = "draft" | "published";
export type CommentStatus = "pending" | "approved";

export interface Database {
  // Requerido por supabase-js 2.50+ para que el genérico Database
  // infiera correctamente los tipos de cada tabla (sin esto, TypeScript
  // devuelve `never` en selects/inserts). No corresponde a ninguna tabla real.
  __InternalSupabase: {
    PostgrestVersion: "12";
  };
  public: {
    Tables: {
      admins: {
        Row: {
          id: string;
          name: string;
          role: string;
          bio: string;
          avatar_url: string;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          role?: string;
          bio?: string;
          avatar_url?: string;
        };
        Update: Partial<Database["public"]["Tables"]["admins"]["Insert"]>;
      };
      posts: {
        Row: {
          id: string;
          slug: string;
          category: PostCategory;
          title: string;
          excerpt: string;
          body: string;
          cover_image_url: string | null;
          author_id: string;
          edition: number;
          tags: string[];
          status: PostStatus;
          event_date: string | null;
          published_at: string | null;
          created_at: string;
        };
        Insert: {
          slug: string;
          category: PostCategory;
          title: string;
          excerpt: string;
          body: string;
          cover_image_url?: string | null;
          author_id: string;
          edition: number;
          tags?: string[];
          status?: PostStatus;
          event_date?: string | null;
          published_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["posts"]["Insert"]>;
      };
      comments: {
        Row: {
          id: string;
          post_id: string;
          author_name: string;
          body: string;
          status: CommentStatus;
          created_at: string;
        };
        Insert: {
          post_id: string;
          author_name: string;
          body: string;
        };
        Update: Partial<
          Pick<Database["public"]["Tables"]["comments"]["Row"], "status">
        >;
      };
      subscribers: {
        Row: {
          id: string;
          email: string;
          created_at: string;
        };
        Insert: {
          email: string;
        };
        Update: never;
      };
      blocked_words: {
        Row: {
          id: string;
          word: string;
          created_at: string;
        };
        Insert: {
          word: string;
        };
        Update: never;
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          message: string;
          status: "new" | "read" | "archived";
          created_at: string;
        };
        Insert: {
          name: string;
          email: string;
          message: string;
        };
        Update: Partial<
          Pick<Database["public"]["Tables"]["contact_messages"]["Row"], "status">
        >;
      };
    };
    Views: {
      posts_with_comment_count: {
        Row: Database["public"]["Tables"]["posts"]["Row"] & {
          comment_count: number;
        };
      };
    };
  };
}
