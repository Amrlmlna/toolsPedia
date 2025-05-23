"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, ExternalLink, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getTools, trackToolClick } from "@/lib/api"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"

export default function TrendingCarousel() {
  const { t } = useLanguage()
  const [trendingTools, setTrendingTools] = useState<any[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const carouselRef = useRef(null)

  // Get trending tools on component mount
  useEffect(() => {
    const fetchTrendingTools = async () => {
      try {
        // Get featured tools with limit parameter
        const data = await getTools({ featured: true, limit: 5 })

        // If no featured tools, get top 5 by clicks
        if (data.length === 0) {
          const allTools = await getTools({ limit: 5 })
          const sorted = [...allTools].sort((a, b) => b.clicks - a.clicks)

          // Add rank
          const ranked = sorted.map((tool, index) => ({
            ...tool,
            rank: index + 1,
          }))

          setTrendingTools(ranked)
        } else {
          // Add rank to featured tools
          const ranked = data.map((tool, index) => ({
            ...tool,
            rank: index + 1,
          }))

          setTrendingTools(ranked)
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching trending tools:", error)
        setIsLoading(false)
      }
    }

    fetchTrendingTools()
  }, [])

  // Auto scroll effect
  useEffect(() => {
    if (!trendingTools.length || isPaused) return

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % trendingTools.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [trendingTools, isPaused])

  const handleToolClick = async (toolId: string) => {
    try {
      await trackToolClick(toolId)
    } catch (error) {
      console.error("Error tracking tool click:", error)
    }
  }

  const handlePrev = () => {
    setActiveIndex((current) => (current === 0 ? trendingTools.length - 1 : current - 1))
  }

  const handleNext = () => {
    setActiveIndex((current) => (current + 1) % trendingTools.length)
  }

  const handleDotClick = (index: number) => {
    setActiveIndex(index)
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>
  }

  if (!trendingTools.length) {
    return (
      <div className="text-center py-12 border border-blue-500/20 rounded-xl">
        <h3 className="text-xl font-medium mb-2">No featured tools available yet</h3>
        <p className="text-muted-foreground mb-4">Featured tools will appear here once they are added</p>
      </div>
    )
  }

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl bg-background/60 backdrop-blur border border-blue-500/20 shadow-lg"
      ref={carouselRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute top-4 left-4 z-10">
        <Badge variant="secondary" className="bg-blue-500 text-white hover:bg-blue-600">
          {t("home.trending")}
        </Badge>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 p-2 backdrop-blur hover:bg-background/90"
        onClick={handlePrev}
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="sr-only">Previous</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 p-2 backdrop-blur hover:bg-background/90"
        onClick={handleNext}
      >
        <ArrowRight className="h-5 w-5" />
        <span className="sr-only">Next</span>
      </Button>

      {/* Carousel Track */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {trendingTools.map((tool) => (
          <div key={tool.id} className="min-w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              <div className="aspect-video relative bg-muted overflow-hidden rounded-lg">
                <Image
                  src={tool.image_url || "/placeholder.svg?height=400&width=600"}
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

              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{tool.name}</h3>
                  <p className="text-muted-foreground mb-4">{tool.description}</p>

                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= tool.rating ? "fill-blue-500 text-blue-500" : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                    <span className="text-sm ml-1">{Number(tool.rating).toFixed(1)}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {tool.tags &&
                      tool.tags.map((tag: any) => (
                        <Badge
                          key={tag.id || tag.name}
                          variant="secondary"
                          className="text-xs bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
                        >
                          {tag.name}
                        </Badge>
                      ))}
                  </div>

                  <div className="text-sm font-medium">
                    {tool.price === "Free" ? (
                      <span className="text-emerald-600 dark:text-emerald-400">{t("tool.free")}</span>
                    ) : (
                      <span>{tool.price}</span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button
                    className="flex-1 bg-blue-500 hover:bg-blue-600"
                    onClick={() => handleToolClick(tool.id)}
                    asChild
                  >
                    <a href={tool.referral_url || tool.url} target="_blank" rel="noopener noreferrer">
                      {t("tool.visit")} <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="border-blue-500/20 hover:border-blue-500/50 hover:bg-blue-500/10"
                  >
                    <Link href={`/tool/${tool.id}`}>{t("tool.details")}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {trendingTools.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              activeIndex === index ? "w-6 bg-blue-500" : "bg-blue-500/40",
            )}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
