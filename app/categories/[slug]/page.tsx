import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import ToolCard from "@/components/tool-card"
import WorkspaceHeader from "@/components/workspace-header"
import { getTools, getCategories } from "@/lib/api"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params

  try {
    // Get all categories to validate the category slug
    const categories = await getCategories()
    const validCategory = categories.find((cat) => cat.slug === slug)

    if (!validCategory) {
      notFound()
    }

    // Get tools for this category
    const tools = await getTools({ category: slug })

    // Format category name for display
    const categoryName = validCategory.name

    return (
      <div className="container mx-auto px-4 py-8">
        <WorkspaceHeader category={slug} />

        <div className="flex flex-col md:flex-row gap-6 mt-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Filters</h3>
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start">
                  All Tools
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Free Tools
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Premium Tools
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  AI-Powered
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Beginner Friendly
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Categories</h3>
              <div className="space-y-1">
                {slug === "content-creator" && (
                  <>
                    <Button variant="ghost" className="w-full justify-start">
                      Video Editing
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      Content Planning
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      Analytics
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      Monetization
                    </Button>
                  </>
                )}

                {slug === "graphic-designer" && (
                  <>
                    <Button variant="ghost" className="w-full justify-start">
                      Design Software
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      Asset Libraries
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      Typography
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      Color Tools
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      Mockup Tools
                    </Button>
                  </>
                )}

                {slug === "software-developer" && (
                  <>
                    <Button variant="ghost" className="w-full justify-start">
                      IDEs & Editors
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      Version Control
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      Testing Tools
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      Deployment
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      AI Assistants
                    </Button>
                  </>
                )}

                {slug === "entrepreneur" && (
                  <>
                    <Button variant="ghost" className="w-full justify-start">
                      Business Planning
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      Marketing
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      Finance
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      CRM
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      Productivity
                    </Button>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Price Range</h3>
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start">
                  Free
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  $1 - $10
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  $11 - $50
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  $51 - $100
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  $100+
                </Button>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold">{categoryName} Tools</h1>
                <p className="text-muted-foreground">Discover the best tools for {categoryName.toLowerCase()}s</p>
              </div>
              <div className="w-full md:w-auto">
                <Input placeholder="Search tools..." className="md:w-[250px]" />
              </div>
            </div>

            <Tabs defaultValue="recommended">
              <TabsList className="mb-4">
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="newest">Newest</TabsTrigger>
                <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
              </TabsList>

              <TabsContent value="recommended" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tools.length > 0 ? (
                    tools.map((tool) => <ToolCard key={tool.id} tool={tool} />)
                  ) : (
                    <div className="col-span-3 text-center py-12">
                      <h3 className="text-xl font-medium mb-2">No tools found</h3>
                      <p className="text-muted-foreground mb-4">No tools available for this category yet</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="popular" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tools.length > 0 ? (
                    [...tools].sort((a, b) => b.clicks - a.clicks).map((tool) => <ToolCard key={tool.id} tool={tool} />)
                  ) : (
                    <div className="col-span-3 text-center py-12">
                      <h3 className="text-xl font-medium mb-2">No tools found</h3>
                      <p className="text-muted-foreground mb-4">No tools available for this category yet</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="newest" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tools.length > 0 ? (
                    [...tools]
                      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                      .map((tool) => <ToolCard key={tool.id} tool={tool} />)
                  ) : (
                    <div className="col-span-3 text-center py-12">
                      <h3 className="text-xl font-medium mb-2">No tools found</h3>
                      <p className="text-muted-foreground mb-4">No tools available for this category yet</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="bookmarked" className="space-y-6">
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No bookmarked tools yet</h3>
                  <p className="text-muted-foreground mb-4">Bookmark tools to save them for later</p>
                  <Button variant="outline">Browse Recommended Tools</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error fetching data:", error)
    notFound()
  }
}
