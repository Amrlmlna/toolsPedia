import { NextResponse } from "next/server"
import { getSupabaseServer } from "@/lib/supabase/server"

export async function GET() {
  const supabase = getSupabaseServer()

  const { data, error } = await supabase.from("categories").select("*").order("name")

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const supabase = getSupabaseServer()
  const body = await request.json()

  const { data, error } = await supabase
    .from("categories")
    .insert([
      {
        name: body.name,
        slug: body.slug,
        description: body.description || null,
        icon: body.icon || null,
        group_name: body.group_name || null,
      },
    ])
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data[0])
}
