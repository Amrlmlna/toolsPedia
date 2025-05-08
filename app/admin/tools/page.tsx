"use client"

import { useState } from "react"
import Link from "next/link"
import { Edit, Plus, Search, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { getAllTools } from "@/lib/data"
import { useLanguage } from "@/contexts/language-context"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

export default function ToolsAdmin() {
  const [searchQuery, setSearchQuery] = useState("")
  const tools = getAllTools()
  const { t } = useLanguage()
  const [deleteToolId, setDeleteToolId] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const filteredTools = tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDeleteClick = (toolId: string) => {
    setDeleteToolId(toolId)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    // In a real app, you would delete the tool from the database
    toast({
      title: "Tool deleted",
      description: "The tool has been deleted successfully.",
    })
    setIsDeleteDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("admin.tools")}</h1>
          <p className="text-muted-foreground">{t("admin.manage")}</p>
        </div>
        <Button asChild className="bg-blue-500 hover:bg-blue-600">
          <Link href="/admin/tools/new">
            <Plus className="mr-2 h-4 w-4" /> {t("admin.add")}
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t("admin.search")}
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("admin.name")}</TableHead>
              <TableHead>{t("admin.category")}</TableHead>
              <TableHead>{t("admin.price")}</TableHead>
              <TableHead>{t("admin.rating")}</TableHead>
              <TableHead>{t("admin.date")}</TableHead>
              <TableHead className="w-[100px]">{t("admin.actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTools.map((tool) => (
              <TableRow key={tool.id}>
                <TableCell className="font-medium">{tool.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-blue-500/20 bg-blue-500/10 text-blue-500">
                    {tool.category
                      .split("-")
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")}
                  </Badge>
                </TableCell>
                <TableCell>{tool.price}</TableCell>
                <TableCell>{tool.rating.toFixed(1)}</TableCell>
                <TableCell>{new Date(tool.addedDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/admin/tools/${tool.id}`}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">{t("admin.edit")}</span>
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(tool.id)}>
                      <Trash className="h-4 w-4 text-red-500" />
                      <span className="sr-only">{t("admin.delete")}</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this tool? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
