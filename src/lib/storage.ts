import { supabase } from "./supabase";

export type ImageBucket = "avatars" | "post-covers";

/**
 * Sube un archivo de imagen a Supabase Storage y devuelve su URL pública.
 * Requiere sesión de admin activa (las políticas de Storage solo permiten
 * insert a usuarios presentes en la tabla `admins`).
 */
export async function uploadImage(
  bucket: ImageBucket,
  file: File,
): Promise<{ url: string | null; error?: string }> {
  const extension = file.name.split(".").pop() ?? "jpg";
  const path = `${crypto.randomUUID()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    return { url: null, error: uploadError.message };
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return { url: data.publicUrl };
}
