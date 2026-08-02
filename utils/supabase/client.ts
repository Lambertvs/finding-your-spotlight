import { createBrowserClient } from "@supabase/ssr";

export const createClient = () => {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://obcjgxgeccfqdtsyqeky.supabase.co";
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "sb_publishable_wITRnL924xVbQlcF21_WMQ_G49luh3_";

  return createBrowserClient(supabaseUrl, supabaseKey);
};
