"use client"

import type React from "react"

import { useState, useRef } from "react"
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
import { getCategories } from "@/lib/data"
import { useLanguage } from "@/contexts/language-context"
import { ImageIcon } from "lucide-react"
import Image from "next/image"

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
    .optional(),
  imageUrl: z.string().optional(),
  price: z.string().min(1, {
    message: "Price is required.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  tags: z.string().min(1, {
    message: "Please enter at least one tag.",
  }),
})

export default function NewTool() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const categories = getCategories()
  const { t } = useLanguage()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      url: "",
      referralUrl: "",
      imageUrl: "",
      price: "",
      category: "",
      tags: "",
    },
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload this file to a storage service
      // and get back a URL to use
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviewImage(event.target.result as string)
          // In a real app, you would set the form value to the URL from your storage service
          form.setValue("imageUrl", "https://example.com/uploaded-image.jpg")
        }
      }
      reader.readAsDataURL(file)
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // In a real app, you would send this data to your backend
    console.log(values)

    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Tool added successfully!",
        description: "The tool has been added to your directory.",
      })

      router.push("/admin/tools")
    }, 1000)
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
                name="category"
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
