import { supabase } from "../lib/supabase";
import type { Admin } from "../types";

/** Lista de administradoras, para la sección "Equipo" del Home. */
export async function getAdmins(): Promise<Admin[]> {
  const { data, error } = await supabase
    .from("admins")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    role: row.role,
    bio: row.bio,
    avatarUrl: row.avatar_url,
  }));
}
