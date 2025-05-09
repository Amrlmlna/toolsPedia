import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

// Server-side Supabase client
export const getSupabaseServer = () => {
  const cookieStore = cookies()

  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: {
      persistSession: false,
    },
  })
}
