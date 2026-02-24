import { createClient, type SupabaseClientOptions } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

// Supabase v2.97 uses navigator.locks which can deadlock on some browsers.
// Provide a no-op lock to prevent getSession() from hanging indefinitely.
const options: SupabaseClientOptions<"public"> = {
  auth: {
    lock: async <R>(
      _name: string,
      _acquireTimeout: number,
      fn: () => Promise<R>,
    ): Promise<R> => {
      return fn();
    },
  },
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, options);
