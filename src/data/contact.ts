import { supabase } from "../lib/supabase";

/** Envía un mensaje de contacto (sin cuenta, queda pendiente de revisión por el equipo). */
export async function sendContactMessage(
  name: string,
  email: string,
  message: string,
): Promise<{ ok: boolean; error?: string }> {
  const { error } = await supabase.from("contact_messages").insert({
    name,
    email,
    message,
  });

  if (error) {
    return { ok: false, error: "No pudimos enviar tu mensaje. Probá de nuevo." };
  }
  return { ok: true };
}
