"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ExternalLink, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getTrendingTools, trackToolClick } from "@/lib/data"

export default function TrendingTools() {
  const [trendingTools, setTrendingTools] = useState([])

  useEffect(() => {
    // Get trending tools on component mount
    const tools = getTrendingTools()
    setTrendingTools(tools)
  }, [])

  const handleToolClick = (toolId) => {
    // Track the click
    trackToolClick(toolId)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {trendingTools.map((tool) => (
        <Card
          key={tool.id}
          className="overflow-hidden transition-all hover:shadow-lg hover:shadow-blue-500/10 border-blue-500/20 bg-background/60 backdrop-blur"
        >
          <div className="aspect-video relative bg-muted overflow-hidden">
            <Image
              src={tool.imageUrl || "/placeholder.svg?height=200&width=400"}
              alt={tool.name}
              fill
              className="object-cover transition-transform hover:scale-105"
            />
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="bg-blue-500 text-white hover:bg-blue-600">
                #{tool.rank}
              </Badge>
            </div>
          </div>
          <CardHeader className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{tool.name}</CardTitle>
                <CardDescription className="line-clamp-2 mt-1">{tool.description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex items-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${star <= tool.rating ? "fill-blue-500 text-blue-500" : "fill-muted text-muted"}`}
                />
              ))}
              <span className="text-sm ml-1">{tool.rating.toFixed(1)}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {tool.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="text-sm font-medium">
              {tool.price === "Free" ? (
                <span className="text-emerald-600 dark:text-emerald-400">Free</span>
              ) : (
                <span>{tool.price}</span>
              )}
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex gap-2">
            <Button asChild className="flex-1 bg-blue-500 hover:bg-blue-600" onClick={() => handleToolClick(tool.id)}>
              <a href={tool.url} target="_blank" rel="noopener noreferrer">
                Visit Site <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              variant="outline"
              asChild
              className="border-blue-500/20 hover:border-blue-500/50 hover:bg-blue-500/10"
            >
              <Link href={`/tool/${tool.id}`}>Details</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
