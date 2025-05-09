import { NextResponse } from "next/server"
import { getSupabaseServer } from "@/lib/supabase/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const supabase = getSupabaseServer()
  const id = params.id

  const { data, error } = await supabase
    .from("tools")
    .select(`
      *,
      categories(name, slug),
      tools_tags(tag_id),
      tags(id, name)
    `)
    .eq("id", id)
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Format the response to include tags as an array
  const tags = data.tags || []
  delete data.tools_tags
  delete data.tags

  return NextResponse.json({
    ...data,
    tags,
  })
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const supabase = getSupabaseServer()
  const id = params.id
  const body = await request.json()

  // First, update the tool
  const { data: toolData, error: toolError } = await supabase
    .from("tools")
    .update({
      name: body.name,
      description: body.description,
      url: body.url,
      referral_url: body.referralUrl || null,
      image_url: body.imageUrl || null,
      price: body.price,
      rating: body.rating || 0,
      category_id: body.categoryId,
      is_featured: body.isFeatured || false,
    })
    .eq("id", id)
    .select()

  if (toolError) {
    return NextResponse.json({ error: toolError.message }, { status: 500 })
  }

  // If tags are provided, update them
  if (body.tags) {
    // First, remove all existing tag relations
    const { error: deleteError } = await supabase.from("tools_tags").delete().eq("tool_id", id)

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 500 })
    }

    // Then add new tag relations
    for (const tagName of body.tags) {
      // Check if tag exists
      const { data: existingTag, error: tagCheckError } = await supabase
        .from("tags")
        .select("id")
        .eq("name", tagName)
        .single()

      if (tagCheckError && tagCheckError.code !== "PGRST116") {
        // PGRST116 is "not found" error
        return NextResponse.json({ error: tagCheckError.message }, { status: 500 })
      }

      let tagId

      if (!existingTag) {
        // Create new tag
        const { data: newTag, error: createTagError } = await supabase
          .from("tags")
          .insert([{ name: tagName }])
          .select()

        if (createTagError) {
          return NextResponse.json({ error: createTagError.message }, { status: 500 })
        }

        tagId = newTag[0].id
      } else {
        tagId = existingTag.id
      }

      // Create relation between tool and tag
      const { error: relationError } = await supabase.from("tools_tags").insert([{ tool_id: id, tag_id: tagId }])

      if (relationError) {
        return NextResponse.json({ error: relationError.message }, { status: 500 })
      }
    }
  }

  return NextResponse.json(toolData[0])
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const supabase = getSupabaseServer()
  const id = params.id

  // Delete the tool (relations will be deleted automatically due to ON DELETE CASCADE)
  const { error } = await supabase.from("tools").delete().eq("id", id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
