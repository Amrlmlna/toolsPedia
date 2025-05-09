import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

// Server-side Supabase client (using service role for admin operations)
export const getSupabaseServer = () => {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: {
      persistSession: false,
    },
  })
}

// Alternative server-side client using cookies (for user operations)
export const getSupabaseServerClient = () => {
  const cookieStore = cookies()

  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
    },
  })
}
