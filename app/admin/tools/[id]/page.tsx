"use client"

import { useState, useEffect } from "react"
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
import { getCategories, getToolById } from "@/lib/data"
import { useLanguage } from "@/contexts/language-context"

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

export default function EditTool({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const categories = getCategories()
  const { t } = useLanguage()
  const { id } = params

  const tool = getToolById(id)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      url: "",
      imageUrl: "",
      price: "",
      category: "",
      tags: "",
    },
  })

  useEffect(() => {
    if (tool) {
      form.reset({
        name: tool.name,
        description: tool.description,
        url: tool.url,
        imageUrl: tool.imageUrl,
        price: tool.price,
        category: tool.category,
        tags: tool.tags.join(", "),
      })
    } else {
      // If tool not found, redirect to tools list
      router.push("/admin/tools")
    }
  }, [tool, form, router])

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // In a real app, you would send this data to your backend
    console.log(values)

    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Tool updated successfully!",
        description: "The tool has been updated in your directory.",
      })

      router.push("/admin/tools")
    }, 1000)
  }

  if (!tool) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Tool</h1>
        <p className="text-muted-foreground">Edit tool information in your directory</p>
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
                    <FormDescription>
                      The URL to the tool's website (with affiliate link if applicable).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("admin.tool.image")}</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image.jpg" {...field} />
                    </FormControl>
                    <FormDescription>URL to an image of the tool (optional).</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
                {isSubmitting ? "Updating..." : "Update Tool"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
