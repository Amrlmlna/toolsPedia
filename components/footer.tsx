"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
        <div className="flex flex-col gap-2">
          <Link
            href="/"
            className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500"
          >
            ToolsHub
          </Link>
          <p className="text-sm text-muted-foreground">{t("home.subtitle")}</p>
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:gap-6">
          <Link href="/about" className="text-sm hover:underline underline-offset-4">
            {t("nav.about")}
          </Link>
          <Link href="/privacy" className="text-sm hover:underline underline-offset-4">
            Privacy
          </Link>
          <Link href="/terms" className="text-sm hover:underline underline-offset-4">
            Terms
          </Link>
          <Link href="/contact" className="text-sm hover:underline underline-offset-4">
            Contact
          </Link>
        </div>
        <div className="text-sm text-muted-foreground">© {new Date().getFullYear()} ToolsHub. All rights reserved.</div>
      </div>
    </footer>
  )
}
