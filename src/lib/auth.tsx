import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "./supabase";
import type { Database } from "./database.types";

type AdminRow = Database["public"]["Tables"]["admins"]["Row"];

interface AuthContextValue {
  admin: AdminRow | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (
    email: string,
    password: string,
  ) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function fetchAdminProfile(userId: string): Promise<AdminRow | null> {
  const { data, error } = await supabase
    .from("admins")
    .select("*")
    .eq("id", userId)
    .single();

  return error ? null : data;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function init() {
      const { data: { session } } = await supabase.auth.getSession();

      if (!isMounted) return;

      if (session?.user) {
        const profile = await fetchAdminProfile(session.user.id);
        if (isMounted) setAdmin(profile);
      } else {
        setAdmin(null);
      }

      if (isMounted) setLoading(false);
    }

    init();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!isMounted) return;

        if (session?.user) {
          fetchAdminProfile(session.user.id).then((profile) => {
            if (isMounted) setAdmin(profile);
          });
        } else {
          setAdmin(null);
        }
      },
    );

    return () => {
      isMounted = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  async function login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { ok: false, error: "Email o contraseña incorrectos." };
    }

    const profile = await fetchAdminProfile(data.user.id);

    if (!profile) {
      await supabase.auth.signOut();
      return {
        ok: false,
        error: "Esta cuenta no tiene permisos de administradora.",
      };
    }

    setAdmin(profile);

    return { ok: true };
  }

  async function logout() {
    await supabase.auth.signOut();
    setAdmin(null);
  }

  return (
    <AuthContext.Provider
      value={{ admin, isAuthenticated: admin !== null, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}