"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { Menu, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { LanguageSelector } from "./language-selector"
import { useLanguage } from "@/contexts/language-context"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const { t } = useLanguage()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">
              ToolsHub
            </span>
          </Link>
          <nav className="hidden md:flex gap-6 ml-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              {t("nav.home")}
            </Link>
            <Link href="/categories" className="text-sm font-medium transition-colors hover:text-primary">
              {t("nav.categories")}
            </Link>
            <Link href="/trending" className="text-sm font-medium transition-colors hover:text-primary">
              {t("nav.trending")}
            </Link>
            <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
              {t("nav.about")}
            </Link>
            <Link href="/admin" className="text-sm font-medium transition-colors hover:text-primary">
              {t("nav.admin")}
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="hidden md:flex relative">
            <Input
              type="search"
              placeholder={t("nav.search")}
              className="w-[200px] lg:w-[300px] rounded-full pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </form>
          <LanguageSelector />
          <ModeToggle />
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="container md:hidden py-4 border-t">
          <form onSubmit={handleSearch} className="relative mb-4">
            <Input
              type="search"
              placeholder={t("nav.search")}
              className="w-full rounded-full pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </form>
          <nav className="flex flex-col gap-4">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.home")}
            </Link>
            <Link
              href="/categories"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.categories")}
            </Link>
            <Link
              href="/trending"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.trending")}
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.about")}
            </Link>
            <Link
              href="/admin"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.admin")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
