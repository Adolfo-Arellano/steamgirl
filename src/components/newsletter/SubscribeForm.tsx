import { useState, type FormEvent } from "react";
import { Button } from "../../components/ui/Button";
import { subscribeEmail } from "../../data/posts";

interface SubscribeFormProps {
  variant?: "dark" | "light";
  compact?: boolean;
  className?: string;
}

export function SubscribeForm({
  variant = "dark",
  compact = false,
  className = "",
}: SubscribeFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setSubmitting(true);
    const result = await subscribeEmail(email.trim());
    setSubmitting(false);

    if (result.ok) {
      setStatus("success");
      setEmail("");
    } else {
      setStatus("error");
      setError(result.error ?? "No pudimos guardar tu suscripción.");
    }
  }

  const isLight = variant === "light";

  if (status === "success") {
    return (
      <p
        className={`text-sm font-medium ${
          isLight ? "text-grafito" : "text-menta"
        } ${className}`}
      >
        ¡Listo! Ya estás suscripto/a al newsletter.
      </p>
    );
  }

  return (
    <div className={className}>
      <form
        onSubmit={handleSubmit}
        className={`flex gap-2.5 ${compact ? "" : "mx-auto max-w-110"}`}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          className={
            isLight
              ? "w-full min-w-0 flex-1 rounded-xl border-[1.5px] border-gris-20 px-4 py-2.5 font-body text-[13.5px]"
              : "min-w-0 flex-1 rounded-full border-[1.5px] border-white/20 bg-white/6 px-4.5 py-3.5 font-body text-[15px] text-white placeholder:text-[#7678A8] focus:border-menta focus:outline-none"
          }
        />
        <Button
          type="submit"
          disabled={submitting}
          variant={isLight ? "primary" : "accent"}
          className={`disabled:opacity-60 ${isLight ? "py-2.5! px-4! text-[13.5px]!" : ""}`}
        >
          {submitting ? "..." : "Suscribirme"}
        </Button>
      </form>
      {status === "error" && (
        <p className="mt-2 text-xs text-rosa">{error}</p>
      )}
    </div>
  );
}
