import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  // Delete admin session cookie
  cookies().delete("admin-session")

  return NextResponse.json({ success: true })
}
