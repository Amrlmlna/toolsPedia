"use client"

import { CardFooter } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getToolById, getTools } from "@/lib/api"

interface ToolPageProps {
  params: {
    id: string
  }
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { id } = params

  try {
    const tool = await getToolById(id)

    if (!tool) {
      notFound()
    }

    // Get related tools from the same category
    const relatedTools = await getTools({ category: tool.categories.slug, limit: 3 })

    // Filter out the current tool
    const filteredRelatedTools = relatedTools.filter((relatedTool) => relatedTool.id !== tool.id)

    // Format category name for display
    const categoryName = tool.categories.name

    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link
            href={`/workspace/${tool.categories.slug}`}
            className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to {categoryName} Tools
          </Link>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">{tool.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <Badge
                    variant="outline"
                    className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20"
                  >
                    {categoryName}
                  </Badge>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${star <= tool.rating ? "fill-blue-500 text-blue-500" : "fill-muted text-muted"}`}
                      />
                    ))}
                    <span className="text-sm ml-1">{Number(tool.rating).toFixed(1)}</span>
                  </div>
                </div>
              </div>

              <p className="text-lg">{tool.description}</p>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Price</h3>
                  <p className="text-lg font-medium">
                    {tool.price === "Free" ? (
                      <span className="text-emerald-600 dark:text-emerald-400">Free</span>
                    ) : (
                      tool.price
                    )}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Tags</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {tool.tags &&
                      tool.tags.map((tag: any) => (
                        <Badge
                          key={tag.id}
                          variant="secondary"
                          className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
                        >
                          {tag.name}
                        </Badge>
                      ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Added</h3>
                  <p>{new Date(tool.created_at).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  asChild
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={async () => {
                    try {
                      // Gunakan fetch API untuk memanggil API route
                      await fetch(`/api/tools/${id}/click`, { method: "POST" })
                    } catch (error) {
                      console.error("Error tracking click:", error)
                    }
                  }}
                >
                  <a href={tool.referral_url || tool.url} target="_blank" rel="noopener noreferrer">
                    Visit Official Website <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="aspect-video relative bg-muted rounded-lg overflow-hidden">
                <Image
                  src={tool.image_url || `/placeholder.svg?height=400&width=800&text=${encodeURIComponent(tool.name)}`}
                  alt={tool.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                  priority
                  className="object-cover"
                  onError={(e) => {
                    // Fallback jika gambar gagal dimuat
                    const target = e.target as HTMLImageElement
                    target.src = `/placeholder.svg?height=400&width=800&text=${encodeURIComponent(tool.name)}`
                  }}
                />
              </div>

              <Tabs defaultValue="features">
                <TabsList className="w-full">
                  <TabsTrigger value="features" className="flex-1">
                    Features
                  </TabsTrigger>
                  <TabsTrigger value="reviews" className="flex-1">
                    Reviews
                  </TabsTrigger>
                  <TabsTrigger value="alternatives" className="flex-1">
                    Alternatives
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="features" className="space-y-4 mt-4">
                  <h3 className="text-lg font-medium">Key Features</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-blue-500 h-2 w-2 mt-2" />
                      <span>Feature 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-blue-500 h-2 w-2 mt-2" />
                      <span>Feature 2: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-blue-500 h-2 w-2 mt-2" />
                      <span>Feature 3: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-blue-500 h-2 w-2 mt-2" />
                      <span>Feature 4: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.</span>
                    </li>
                  </ul>
                </TabsContent>

                <TabsContent value="reviews" className="space-y-4 mt-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">User Reviews</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">John Doe</div>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-3 w-3 ${star <= 5 ? "fill-blue-500 text-blue-500" : "fill-muted text-muted"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm">This tool has completely transformed my workflow. Highly recommended!</p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">Jane Smith</div>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-3 w-3 ${star <= 4 ? "fill-blue-500 text-blue-500" : "fill-muted text-muted"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm">
                        Great tool with lots of useful features. The interface could be more intuitive though.
                      </p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">Mike Johnson</div>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-3 w-3 ${star <= 5 ? "fill-blue-500 text-blue-500" : "fill-muted text-muted"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm">Absolutely love this tool! It has saved me so much time and effort.</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="alternatives" className="space-y-4 mt-4">
                  <h3 className="text-lg font-medium">Alternative Tools</h3>
                  <div className="grid gap-4">
                    {filteredRelatedTools.map((relatedTool) => (
                      <Card key={relatedTool.id} className="overflow-hidden">
                        <CardHeader className="p-4">
                          <CardTitle className="text-base">{relatedTool.name}</CardTitle>
                          <CardDescription className="line-clamp-2">{relatedTool.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-3 w-3 ${star <= relatedTool.rating ? "fill-blue-500 text-blue-500" : "fill-muted text-muted"}`}
                                />
                              ))}
                              <span className="text-xs ml-1">{Number(relatedTool.rating).toFixed(1)}</span>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              asChild
                              className="border-blue-500/20 hover:border-blue-500/50 hover:bg-blue-500/10"
                            >
                              <Link href={`/tool/${relatedTool.id}`}>View</Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">More Tools You Might Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredRelatedTools.map((relatedTool) => (
              <Card
                key={relatedTool.id}
                className="overflow-hidden transition-all hover:shadow-lg hover:shadow-blue-500/10 border-blue-500/20 bg-background/60 backdrop-blur"
              >
                <div className="aspect-video relative bg-muted">
                  <Image
                    src={relatedTool.image_url || "/placeholder.svg?height=200&width=400"}
                    alt={relatedTool.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-xl">{relatedTool.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{relatedTool.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${star <= relatedTool.rating ? "fill-blue-500 text-blue-500" : "fill-muted text-muted"}`}
                      />
                    ))}
                    <span className="text-sm ml-1">{Number(relatedTool.rating).toFixed(1)}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button asChild className="w-full bg-blue-500 hover:bg-blue-600">
                    <Link href={`/tool/${relatedTool.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error fetching tool:", error)
    notFound()
  }
}
