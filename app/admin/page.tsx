"use client"

import Link from "next/link"
import { BarChart, Package, Users, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export default function AdminDashboard() {
  const { t } = useLanguage()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("admin.dashboard")}</h1>
        <p className="text-muted-foreground">{t("admin.overview")}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("admin.total.tools")}</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                +12% {t("admin.from")}
              </span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("admin.total.users")}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,203</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                +18% {t("admin.from")}
              </span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("admin.clicks")}</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,845</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                +24% {t("admin.from")}
              </span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("admin.revenue")}</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,891</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-rose-500 flex items-center">
                <ArrowDownRight className="mr-1 h-4 w-4" />
                -3% {t("admin.from")}
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>{t("admin.recent")}</CardTitle>
            <CardDescription>{t("admin.recent.desc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 text-sm font-medium text-muted-foreground">
                <div>{t("admin.name")}</div>
                <div>{t("admin.category")}</div>
                <div>{t("admin.date")}</div>
              </div>
              <div className="grid grid-cols-3 items-center gap-4 text-sm">
                <div className="font-medium">ScriptBuddy</div>
                <div>Content Creator</div>
                <div>April 15, 2024</div>
              </div>
              <div className="grid grid-cols-3 items-center gap-4 text-sm">
                <div className="font-medium">StreamSetup</div>
                <div>Content Creator</div>
                <div>May 1, 2024</div>
              </div>
              <div className="grid grid-cols-3 items-center gap-4 text-sm">
                <div className="font-medium">MockupMaster</div>
                <div>Graphic Designer</div>
                <div>April 5, 2024</div>
              </div>
              <div className="grid grid-cols-3 items-center gap-4 text-sm">
                <div className="font-medium">AssetLibrary</div>
                <div>Graphic Designer</div>
                <div>May 10, 2024</div>
              </div>
              <div className="grid grid-cols-3 items-center gap-4 text-sm">
                <div className="font-medium">CodeAssistant</div>
                <div>Software Developer</div>
                <div>March 15, 2024</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>{t("admin.popular")}</CardTitle>
            <CardDescription>{t("admin.popular.desc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-full flex-1 space-y-1">
                  <div className="flex justify-between text-sm">
                    <div>Content Creator</div>
                    <div className="font-medium">42%</div>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full bg-rose-500" style={{ width: "42%" }} />
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-full flex-1 space-y-1">
                  <div className="flex justify-between text-sm">
                    <div>Software Developer</div>
                    <div className="font-medium">28%</div>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full bg-emerald-500" style={{ width: "28%" }} />
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-full flex-1 space-y-1">
                  <div className="flex justify-between text-sm">
                    <div>Graphic Designer</div>
                    <div className="font-medium">18%</div>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full bg-violet-500" style={{ width: "18%" }} />
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-full flex-1 space-y-1">
                  <div className="flex justify-between text-sm">
                    <div>Entrepreneur</div>
                    <div className="font-medium">12%</div>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full bg-amber-500" style={{ width: "12%" }} />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button asChild className="bg-blue-500 hover:bg-blue-600">
          <Link href="/admin/tools/new">{t("admin.add")}</Link>
        </Button>
      </div>
    </div>
  )
}
