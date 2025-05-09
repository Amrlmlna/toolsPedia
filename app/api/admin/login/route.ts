import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

const ADMIN_PASSWORD = "A010w5010zpma1177poetra"

export async function POST(request: NextRequest) {
  const { password } = await request.json()

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 })
  }

  // Set admin session cookie
  cookies().set({
    name: "admin-session",
    value: "authenticated",
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 day
  })

  return NextResponse.json({ success: true })
}
