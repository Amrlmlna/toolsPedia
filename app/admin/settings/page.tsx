"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

// Form schemas for different settings
const siteSettingsSchema = z.object({
  siteName: z.string().min(2),
  siteDescription: z.string().min(10),
  siteUrl: z.string().url(),
  logoUrl: z.string().optional(),
  faviconUrl: z.string().optional(),
})

const displaySettingsSchema = z.object({
  toolsPerPage: z.coerce.number().min(4).max(100),
  defaultView: z.enum(["grid", "list"]),
  showRatings: z.boolean(),
  showPricing: z.boolean(),
  showCategories: z.boolean(),
})

export default function SettingsPage() {
  // Site settings form
  const siteForm = useForm<z.infer<typeof siteSettingsSchema>>({
    resolver: zodResolver(siteSettingsSchema),
    defaultValues: {
      siteName: "ToolsHub",
      siteDescription: "Discover the Perfect Tools for Your Profession",
      siteUrl: "https://toolshub.example.com",
      logoUrl: "",
      faviconUrl: "",
    },
  })

  // Display settings form
  const displayForm = useForm<z.infer<typeof displaySettingsSchema>>({
    resolver: zodResolver(displaySettingsSchema),
    defaultValues: {
      toolsPerPage: 12,
      defaultView: "grid",
      showRatings: true,
      showPricing: true,
      showCategories: true,
    },
  })

  function onSiteSettingsSubmit(values: z.infer<typeof siteSettingsSchema>) {
    toast({
      title: "Site settings updated",
      description: "Your site settings have been saved successfully.",
    })
    console.log(values)
  }

  function onDisplaySettingsSubmit(values: z.infer<typeof displaySettingsSchema>) {
    toast({
      title: "Display settings updated",
      description: "Your display settings have been saved successfully.",
    })
    console.log(values)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your directory settings and preferences</p>
      </div>

      <Tabs defaultValue="site">
        <TabsList>
          <TabsTrigger value="site">Site Settings</TabsTrigger>
          <TabsTrigger value="display">Display</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        <TabsContent value="site" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Site Settings</CardTitle>
              <CardDescription>Manage your site information and appearance</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...siteForm}>
                <form onSubmit={siteForm.handleSubmit(onSiteSettingsSubmit)} className="space-y-4">
                  <FormField
                    control={siteForm.control}
                    name="siteName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Site Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. ToolsHub" {...field} />
                        </FormControl>
                        <FormDescription>This will be displayed in the browser tab and site header.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={siteForm.control}
                    name="siteDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Site Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g. Discover the Perfect Tools for Your Profession"
                            {...field}
                            rows={2}
                          />
                        </FormControl>
                        <FormDescription>
                          This will be used in SEO metadata and may appear in search results.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={siteForm.control}
                    name="siteUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Site URL</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. https://toolshub.example.com" {...field} />
                        </FormControl>
                        <FormDescription>The primary URL of your website.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={siteForm.control}
                      name="logoUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Logo URL (optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. /images/logo.png" {...field} />
                          </FormControl>
                          <FormDescription>Path to your site logo image.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={siteForm.control}
                      name="faviconUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Favicon URL (optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. /favicon.ico" {...field} />
                          </FormControl>
                          <FormDescription>Path to your site favicon.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                    Save Settings
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="display" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Display Settings</CardTitle>
              <CardDescription>Customize how tools and content are displayed</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...displayForm}>
                <form onSubmit={displayForm.handleSubmit(onDisplaySettingsSubmit)} className="space-y-4">
                  <FormField
                    control={displayForm.control}
                    name="toolsPerPage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tools Per Page</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} min={4} max={100} />
                        </FormControl>
                        <FormDescription>Number of tools to display per page (4-100).</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={displayForm.control}
                    name="defaultView"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Default View</FormLabel>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="grid-view"
                              value="grid"
                              checked={field.value === "grid"}
                              onChange={() => field.onChange("grid")}
                              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor="grid-view">Grid</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="list-view"
                              value="list"
                              checked={field.value === "list"}
                              onChange={() => field.onChange("list")}
                              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor="list-view">List</label>
                          </div>
                        </div>
                        <FormDescription>Default view for tool listings.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Separator className="my-4" />
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Display Elements</h3>
                    <FormField
                      control={displayForm.control}
                      name="showRatings"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                          <div className="space-y-0.5">
                            <FormLabel>Show Ratings</FormLabel>
                            <FormDescription>Display star ratings for tools</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={displayForm.control}
                      name="showPricing"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                          <div className="space-y-0.5">
                            <FormLabel>Show Pricing</FormLabel>
                            <FormDescription>Display pricing information for tools</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={displayForm.control}
                      name="showCategories"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                          <div className="space-y-0.5">
                            <FormLabel>Show Categories</FormLabel>
                            <FormDescription>Display category labels on tool cards</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                    Save Display Settings
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences and security</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Administrator Password</h3>
                  <p className="text-sm text-muted-foreground">Update the password used to access the admin area.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input type="password" placeholder="Current password" />
                    <Input type="password" placeholder="New password" />
                  </div>
                </div>
                <Button className="bg-blue-500 hover:bg-blue-600">Update Password</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Configuration settings for advanced users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Database Management</h3>
                  <p className="text-sm text-muted-foreground">
                    Warning: These actions affect your database and cannot be undone.
                  </p>
                  <div className="flex gap-4">
                    <Button variant="outline">Export Data</Button>
                    <Button variant="outline">Import Data</Button>
                    <Button variant="destructive">Reset Database</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
