"use client"

import { useState } from "react"
import Link from "next/link"
import { PenTool, Palette, Code, Briefcase, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface WorkspaceHeaderProps {
  category: string
}

export default function WorkspaceHeader({ category }: WorkspaceHeaderProps) {
  const [currentCategory, setCurrentCategory] = useState(category)

  const categories = [
    {
      id: "content-creator",
      name: "Content Creator",
      icon: <PenTool className="h-5 w-5 text-rose-500" />,
    },
    {
      id: "graphic-designer",
      name: "Graphic Designer",
      icon: <Palette className="h-5 w-5 text-violet-500" />,
    },
    {
      id: "software-developer",
      name: "Software Developer",
      icon: <Code className="h-5 w-5 text-emerald-500" />,
    },
    {
      id: "entrepreneur",
      name: "Entrepreneur",
      icon: <Briefcase className="h-5 w-5 text-amber-500" />,
    },
  ]

  const currentCategoryData = categories.find((c) => c.id === currentCategory)

  // Format category name for display
  const categoryName = currentCategory
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return (
    <div className="bg-muted/50 rounded-xl p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          {currentCategoryData?.icon}
          <div>
            <h1 className="text-2xl font-bold">{categoryName} Workspace</h1>
            <p className="text-muted-foreground">Personalized tools and resources for {categoryName.toLowerCase()}s</p>
          </div>
        </div>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Switch Workspace <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {categories.map((cat) => (
                <DropdownMenuItem key={cat.id} asChild>
                  <Link href={`/workspace/${cat.id}`} className="flex items-center gap-2">
                    {cat.icon}
                    <span>{cat.name}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button>Customize</Button>
        </div>
      </div>
    </div>
  )
}
