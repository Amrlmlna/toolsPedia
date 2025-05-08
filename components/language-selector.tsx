"use client"

import { useState } from "react"
import { Check, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage, type Language } from "@/contexts/language-context"

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)

  const languages = [
    { code: "en", name: "English" },
    { code: "id", name: "Bahasa Indonesia" },
    { code: "zh", name: "中文" },
    { code: "ja", name: "日本語" },
  ]

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="w-9 px-0">
          <Globe className="h-4 w-4" />
          <span className="sr-only">Select language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => {
              setLanguage(lang.code as Language)
              setOpen(false)
            }}
            className="flex items-center justify-between"
          >
            {lang.name}
            {language === lang.code && <Check className="h-4 w-4 ml-2" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
