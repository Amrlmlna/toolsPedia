"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { BarChart, Grid, Package, Settings, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { t } = useLanguage()

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-muted/50 border-r p-4">
        <div className="flex items-center gap-2 mb-8">
          <div className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">
            Admin Panel
          </div>
        </div>
        <nav className="space-y-1">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/admin">
              <Grid className="mr-2 h-4 w-4" />
              {t("admin.dashboard")}
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/admin/tools">
              <Package className="mr-2 h-4 w-4" />
              {t("admin.tools")}
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/admin/categories">
              <Grid className="mr-2 h-4 w-4" />
              {t("admin.categories")}
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/admin/users">
              <Users className="mr-2 h-4 w-4" />
              {t("admin.users")}
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/admin/analytics">
              <BarChart className="mr-2 h-4 w-4" />
              {t("admin.analytics")}
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/admin/settings">
              <Settings className="mr-2 h-4 w-4" />
              {t("admin.settings")}
            </Link>
          </Button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 md:p-8">{children}</div>
    </div>
  )
}
