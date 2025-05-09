import { NextResponse } from "next/server"
import { getSupabaseServer } from "@/lib/supabase/server"

export async function GET(request: Request) {
  const supabase = getSupabaseServer()
  const { searchParams } = new URL(request.url)

  const category = searchParams.get("category")
  const featured = searchParams.get("featured")
  const limit = searchParams.get("limit")

  let query = supabase.from("tools").select(`
      *,
      categories(name, slug),
      tools_tags(tag_id),
      tags(id, name)
    `)

  if (category) {
    query = query.eq("categories.slug", category)
  }

  if (featured === "true") {
    query = query.eq("is_featured", true)
  }

  if (limit) {
    query = query.limit(Number.parseInt(limit))
  }

  query = query.order("created_at", { ascending: false })

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Format the response to include tags as an array
  const formattedData = data.map((tool) => {
    const tags = tool.tags || []
    delete tool.tools_tags
    delete tool.tags
    return {
      ...tool,
      tags,
    }
  })

  return NextResponse.json(formattedData)
}

export async function POST(request: Request) {
  const supabase = getSupabaseServer()
  const body = await request.json()

  // First, insert the tool
  const { data: toolData, error: toolError } = await supabase
    .from("tools")
    .insert([
      {
        name: body.name,
        description: body.description,
        url: body.url,
        referral_url: body.referralUrl || null,
        image_url: body.imageUrl || null,
        price: body.price,
        rating: body.rating || 0,
        category_id: body.categoryId,
        is_featured: body.isFeatured || false,
      },
    ])
    .select()

  if (toolError) {
    return NextResponse.json({ error: toolError.message }, { status: 500 })
  }

  const toolId = toolData[0].id

  // Then, handle tags if provided
  if (body.tags && body.tags.length > 0) {
    // For each tag, first check if it exists, if not create it
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
      const { error: relationError } = await supabase.from("tools_tags").insert([{ tool_id: toolId, tag_id: tagId }])

      if (relationError) {
        return NextResponse.json({ error: relationError.message }, { status: 500 })
      }
    }
  }

  return NextResponse.json(toolData[0])
}
