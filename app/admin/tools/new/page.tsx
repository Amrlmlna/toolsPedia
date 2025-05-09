"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { useLanguage } from "@/contexts/language-context"
import { ImageIcon } from "lucide-react"
import Image from "next/image"
import { getCategories, createTool } from "@/lib/api"
import { uploadImageClient } from "@/lib/supabase/storage"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  url: z.string().url({
    message: "Please enter a valid URL.",
  }),
  referralUrl: z
    .string()
    .url({
      message: "Please enter a valid referral URL.",
    })
    .optional()
    .or(z.literal("")),
  imageUrl: z.string().optional(),
  price: z.string().min(1, {
    message: "Price is required.",
  }),
  categoryId: z.string({
    required_error: "Please select a category.",
  }),
  tags: z.string().min(1, {
    message: "Please enter at least one tag.",
  }),
  rating: z.coerce.number().min(0).max(5).default(0),
  isFeatured: z.boolean().default(false),
})

export default function NewTool() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [categories, setCategories] = useState<any[]>([])
  const [imageFile, setImageFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories()
        setCategories(data)
      } catch (error) {
        console.error("Error fetching categories:", error)
        toast({
          title: "Error",
          description: "Failed to load categories. Please try again.",
          variant: "destructive",
        })
      }
    }

    fetchCategories()
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      url: "",
      referralUrl: "",
      imageUrl: "",
      price: "",
      categoryId: "",
      tags: "",
      rating: 0,
      isFeatured: false,
    },
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    // Validasi ukuran file (max 2MB)
    if (file && file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image size should be less than 2MB",
        variant: "destructive",
      })
      return
    }

    // Validasi format file
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
    if (file && !validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload JPEG, PNG, GIF, or WEBP images only",
        variant: "destructive",
      })
      return
    }

    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviewImage(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      let imageUrl = values.imageUrl

      // Upload image if file is selected
      if (imageFile) {
        const fileName = `${Date.now()}-${imageFile.name.replace(/\s+/g, "-").toLowerCase()}`
        imageUrl = await uploadImageClient(imageFile, fileName)
      }

      // Prepare tags array from comma-separated string
      const tags = values.tags.split(",").map((tag) => tag.trim())

      // Create tool
      await createTool({
        ...values,
        imageUrl,
        tags,
      })

      toast({
        title: "Tool added successfully!",
        description: "The tool has been added to your directory.",
      })

      router.push("/admin/tools")
    } catch (error) {
      console.error("Error creating tool:", error)
      toast({
        title: "Error",
        description: "Failed to create tool. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("admin.new")}</h1>
        <p className="text-muted-foreground">{t("admin.new.desc")}</p>
      </div>

      <div className="max-w-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("admin.tool.name")}</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter tool name" {...field} />
                  </FormControl>
                  <FormDescription>The name of the tool as it will appear in the directory.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("admin.tool.desc")}</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter tool description" className="min-h-[100px]" {...field} />
                  </FormControl>
                  <FormDescription>A detailed description of the tool and its features.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("admin.tool.url")}</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormDescription>The URL to the tool's official website.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="referralUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Referral URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/ref=yourcode" {...field} />
                    </FormControl>
                    <FormDescription>Your affiliate or referral link (optional).</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tool Image</FormLabel>
                  <div className="flex flex-col gap-4">
                    <div
                      className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {previewImage ? (
                        <div className="relative h-40 w-full">
                          <Image
                            src={previewImage || "/placeholder.svg"}
                            alt="Preview"
                            fill
                            className="object-contain rounded-md"
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-4">
                          <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground mb-1">Click to upload an image</p>
                          <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (max. 2MB)</p>
                        </div>
                      )}
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Or enter an image URL:</span>
                      <Input
                        placeholder="https://example.com/image.jpg"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          if (e.target.value) {
                            setPreviewImage(e.target.value)
                          } else {
                            setPreviewImage(null)
                          }
                        }}
                      />
                    </div>
                  </div>
                  <FormDescription>Upload an image or provide a URL to an image of the tool.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("admin.price")}</FormLabel>
                    <FormControl>
                      <Input placeholder="$9.99/month or Free" {...field} />
                    </FormControl>
                    <FormDescription>The price of the tool (e.g., $9.99/month, Free, etc.).</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("admin.category")}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>The category that best fits this tool.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" max="5" step="0.1" {...field} />
                    </FormControl>
                    <FormDescription>Initial rating for the tool (0-5).</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Featured Tool</FormLabel>
                      <FormDescription>Featured tools will be displayed prominently on the homepage.</FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("admin.tool.tags")}</FormLabel>
                  <FormControl>
                    <Input placeholder="Video Editing, AI-Powered, Premium" {...field} />
                  </FormControl>
                  <FormDescription>Comma-separated tags to help users find this tool.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => router.push("/admin/tools")}>
                {t("admin.cancel")}
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-blue-500 hover:bg-blue-600">
                {isSubmitting ? t("admin.adding") : t("admin.save")}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
