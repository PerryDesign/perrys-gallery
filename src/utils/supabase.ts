import { createBrowserClient } from "@supabase/ssr";
import { createClient as createServerClient } from "./supabase/server";

export const createBrowserSupabaseClient = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};
