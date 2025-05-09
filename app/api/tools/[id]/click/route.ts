import { NextResponse } from "next/server"
import { getSupabaseServer } from "@/lib/supabase/server"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const supabase = getSupabaseServer()
  const id = params.id

  // Increment the clicks count
  const { data, error } = await supabase.rpc("increment_tool_clicks", { tool_id: id })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, clicks: data })
}
