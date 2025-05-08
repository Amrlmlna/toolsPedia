"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ToolCard from "@/components/tool-card"
import { searchTools } from "@/lib/data"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(query)
  const [results, setResults] = useState([])
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    if (query) {
      const searchResults = searchTools(query)
      setResults(searchResults)
    }
  }, [query])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      const searchResults = searchTools(searchQuery)
      setResults(searchResults)

      // Update URL without full page reload
      const url = new URL(window.location.href)
      url.searchParams.set("q", searchQuery)
      window.history.pushState({}, "", url)
    }
  }

  const filteredResults = activeTab === "all" ? results : results.filter((tool) => tool.category === activeTab)

  const categories = [
    { id: "all", name: "All Results" },
    { id: "content-creator", name: "Content Creation" },
    { id: "graphic-designer", name: "Design" },
    { id: "software-developer", name: "Development" },
    { id: "entrepreneur", name: "Business" },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold mb-6">Search Tools</h1>
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for tools..."
            className="w-full rounded-full pl-10 pr-16 h-12 bg-background/60 border-blue-500/30 focus-visible:ring-blue-500/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            type="submit"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full h-10 bg-blue-500 hover:bg-blue-600"
          >
            Search
          </Button>
        </form>
      </div>

      {query && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-medium">
              {results.length} results for "{query}"
            </h2>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeTab} className="space-y-6">
              {filteredResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResults.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No results found</h3>
                  <p className="text-muted-foreground mb-4">Try different keywords or browse categories</p>
                  <Button variant="outline" asChild>
                    <a href="/categories">Browse Categories</a>
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
