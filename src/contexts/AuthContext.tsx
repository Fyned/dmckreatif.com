import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import type { User, Session, AuthChangeEvent } from "@supabase/supabase-js";
import type { supabase as SupabaseInstance } from "@/lib/supabase";
import type { Profile, UserRole } from "@/types/database";

let _client: typeof SupabaseInstance | null = null;
async function getClient(): Promise<typeof SupabaseInstance> {
  if (!_client) {
    const mod = await import("@/lib/supabase");
    _client = mod.supabase;
  }
  return _client;
}

interface AuthState {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  role: UserRole | null;
  loading: boolean;
}

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (
    email: string,
    password: string,
    name: string,
    company?: string,
  ) => Promise<{ error: string | null; needsConfirmation: boolean }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  updatePassword: (newPassword: string) => Promise<{ error: string | null }>;
  isAdmin: boolean;
}

/** Map raw Supabase auth error messages to user-friendly strings. */
function friendlyAuthError(raw: string): string {
  const msg = raw.toLowerCase();
  if (msg.includes("invalid login credentials"))
    return "Invalid email or password. Please try again.";
  if (msg.includes("email not confirmed"))
    return "Please confirm your email address before signing in. Check your inbox.";
  if (msg.includes("user already registered") || msg.includes("already been registered"))
    return "An account with this email already exists. Try signing in instead.";
  if (msg.includes("signup is disabled"))
    return "Registration is currently disabled. Please contact support.";
  if (msg.includes("rate limit") || msg.includes("too many requests"))
    return "Too many attempts. Please wait a moment and try again.";
  if (msg.includes("weak password") || msg.includes("password"))
    return "Password is too weak. Use at least 6 characters with a mix of letters and numbers.";
  if (msg.includes("network") || msg.includes("fetch"))
    return "Network error. Please check your connection and try again.";
  return raw;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    profile: null,
    role: null,
    loading: true,
  });

  const mountedRef = useRef(true);

  const fetchProfile = useCallback(
    async (userId: string, retries = 2): Promise<Profile | null> => {
      const supabase = await getClient();
      for (let i = 0; i <= retries; i++) {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single();

        if (!error && data) return data as unknown as Profile;

        // Profile may not exist yet right after signup (trigger latency)
        if (i < retries) {
          await new Promise((r) => setTimeout(r, 500));
        }
      }
      return null;
    },
    [],
  );

  const refreshProfile = useCallback(async () => {
    if (!state.user) return;
    const profile = await fetchProfile(state.user.id);
    if (profile && mountedRef.current) {
      setState((prev) => ({
        ...prev,
        profile,
        role: profile.role,
      }));
    }
  }, [state.user, fetchProfile]);

  useEffect(() => {
    mountedRef.current = true;
    let unsubscribe: (() => void) | null = null;

    getClient().then((supabase) => {
      if (!mountedRef.current) return;

      // Initial session check
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (!mountedRef.current) return;
        if (session?.user) {
          fetchProfile(session.user.id).then((profile) => {
            if (!mountedRef.current) return;
            setState({
              user: session.user,
              session,
              profile,
              role: profile?.role ?? null,
              loading: false,
            });
          });
        } else {
          setState((prev) => ({ ...prev, loading: false }));
        }
      });

      // Auth state listener
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(
        async (event: AuthChangeEvent, session) => {
          if (!mountedRef.current) return;

          if (event === "SIGNED_OUT" || !session?.user) {
            setState({
              user: null,
              session: null,
              profile: null,
              role: null,
              loading: false,
            });
            return;
          }

          // SIGNED_IN, TOKEN_REFRESHED, USER_UPDATED
          const profile = await fetchProfile(session.user.id);
          if (!mountedRef.current) return;

          setState({
            user: session.user,
            session,
            profile,
            role: profile?.role ?? null,
            loading: false,
          });
        },
      );

      unsubscribe = () => subscription.unsubscribe();
    });

    return () => {
      mountedRef.current = false;
      unsubscribe?.();
    };
  }, [fetchProfile]);

  const signIn = async (email: string, password: string) => {
    const supabase = await getClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });
    return { error: error ? friendlyAuthError(error.message) : null };
  };

  const signUp = async (
    email: string,
    password: string,
    name: string,
    company?: string,
  ) => {
    const supabase = await getClient();
    const { data, error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: {
        data: { name: name.trim(), company: company?.trim() || null },
      },
    });

    if (error) {
      return { error: friendlyAuthError(error.message), needsConfirmation: false };
    }

    const needsConfirmation =
      !!data.user && (!data.session || (data.user.identities?.length ?? 0) === 0);

    return { error: null, needsConfirmation };
  };

  const signOut = async () => {
    const supabase = await getClient();
    await supabase.auth.signOut();
  };

  const resetPassword = async (email: string) => {
    const supabase = await getClient();
    const { error } = await supabase.auth.resetPasswordForEmail(
      email.trim().toLowerCase(),
      { redirectTo: `${window.location.origin}/en/reset-password` },
    );
    return { error: error ? friendlyAuthError(error.message) : null };
  };

  const updatePassword = async (newPassword: string) => {
    const supabase = await getClient();
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    return { error: error ? friendlyAuthError(error.message) : null };
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
        refreshProfile,
        resetPassword,
        updatePassword,
        isAdmin: state.role === "ADMIN",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
