import { createClient } from "@supabase/supabase-js"

// Server-side Supabase client
export const getSupabaseServer = () => {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: {
      persistSession: false,
    },
  })
}
