import { useState, type FormEvent } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Logo } from "../components/ui/Logo";
import { Button } from "../components/ui/Button";
import { useAuth } from "../lib/auth";

export function AdminLoginPage() {
  const { login, isAuthenticated, loading: sessionLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!sessionLoading && isAuthenticated) {
    const from =
      (location.state as { from?: Location })?.from?.pathname ?? "/admin";
    return <Navigate to={from} replace />;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.ok) {
      navigate("/admin", { replace: true });
    } else {
      setError(result.error ?? "No pudimos iniciar sesión.");
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-indigo px-6">
      <div
        className="pointer-events-none absolute -left-32 -top-32 h-100 w-100 rounded-full opacity-20 blur-sm"
        style={{
          background:
            "conic-gradient(from 180deg, var(--color-rosa), var(--color-menta), var(--color-cobalto), var(--color-rosa))",
        }}
      />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-120 w-120 rounded-full border-70 border-menta/10" />

      <div className="relative z-10 w-full max-w-105 rounded-[28px] bg-white p-9 shadow-2xl sm:p-11">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gris-50 hover:text-grafito"
        >
          <ArrowLeft size={15} /> Volver al sitio
        </Link>

        <Logo className="mb-8 block" />

        <h1 className="mb-2 text-2xl font-bold">
          Acceso para el equipo de STEAM Girls
        </h1>
        <p className="mb-8 text-sm text-gris-50">
          Ingresá con tu cuenta de administración para gestionar el
          newsletter.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-1.5 block text-[13px] font-semibold text-grafito">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nombre@steamgirls.club"
              className="w-full rounded-xl border-[1.5px] border-gris-20 px-4 py-3 text-[15px] focus:border-cobalto focus:outline-none"
            />
          </div>
          <div className="mb-5">
            <label className="mb-1.5 block text-[13px] font-semibold text-grafito">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border-[1.5px] border-gris-20 px-4 py-3 text-[15px] focus:border-cobalto focus:outline-none"
            />
          </div>

          {error && (
            <p className="mb-4 rounded-lg bg-rosavapor px-4 py-2.5 text-sm text-[#993556]">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full justify-center disabled:opacity-60"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-gris-50">
          Esta sección es exclusiva para el equipo de administración de
          STEAM Girls.
        </p>
      </div>
    </div>
  );
}
