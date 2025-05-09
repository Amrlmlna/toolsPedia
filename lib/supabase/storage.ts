import { getSupabaseServer } from "./server"
import { getSupabaseClient } from "./client"

// Fungsi untuk upload gambar ke Supabase Storage (server-side)
export async function uploadImageServer(file: File, path: string): Promise<string> {
  const supabase = getSupabaseServer()

  const { data, error } = await supabase.storage.from("toolsthumbnail").upload(path, file, {
    cacheControl: "3600",
    upsert: true,
  })

  if (error) {
    throw new Error(`Error uploading image: ${error.message}`)
  }

  // Dapatkan URL publik
  const { data: urlData } = supabase.storage.from("toolsthumbnail").getPublicUrl(data.path)

  return urlData.publicUrl
}

// Fungsi untuk upload gambar ke Supabase Storage (client-side)
export async function uploadImageClient(file: File, path: string): Promise<string> {
  const supabase = getSupabaseClient()

  const { data, error } = await supabase.storage.from("toolsthumbnail").upload(path, file, {
    cacheControl: "3600",
    upsert: true,
  })

  if (error) {
    throw new Error(`Error uploading image: ${error.message}`)
  }

  // Dapatkan URL publik
  const { data: urlData } = supabase.storage.from("toolsthumbnail").getPublicUrl(data.path)

  return urlData.publicUrl
}

// Fungsi untuk menghapus gambar dari Supabase Storage (server-side)
export async function deleteImageServer(path: string): Promise<void> {
  const supabase = getSupabaseServer()

  const { error } = await supabase.storage.from("toolsthumbnail").remove([path])

  if (error) {
    throw new Error(`Error deleting image: ${error.message}`)
  }
}
