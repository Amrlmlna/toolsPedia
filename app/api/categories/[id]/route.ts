import { NextResponse } from "next/server"
import { getSupabaseServer } from "@/lib/supabase/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const supabase = getSupabaseServer()
  const id = params.id

  const { data, error } = await supabase.from("categories").select("*").eq("id", id).single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const supabase = getSupabaseServer()
  const id = params.id
  const body = await request.json()

  const { data, error } = await supabase
    .from("categories")
    .update({
      name: body.name,
      slug: body.slug,
      description: body.description || null,
      icon: body.icon || null,
      group_name: body.group_name || null,
    })
    .eq("id", id)
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data[0])
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const supabase = getSupabaseServer()
  const id = params.id

  const { error } = await supabase.from("categories").delete().eq("id", id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
