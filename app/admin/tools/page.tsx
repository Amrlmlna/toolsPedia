"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Edit, Plus, Search, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
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
import { getTools, deleteTool } from "@/lib/api"

export default function ToolsAdmin() {
  const [searchQuery, setSearchQuery] = useState("")
  const [tools, setTools] = useState<any[]>([])
  const [filteredTools, setFilteredTools] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { t } = useLanguage()
  const [deleteToolId, setDeleteToolId] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const data = await getTools()
        setTools(data)
        setFilteredTools(data)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching tools:", error)
        toast({
          title: "Error",
          description: "Failed to load tools. Please try again.",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    fetchTools()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredTools(tools)
    } else {
      const filtered = tools.filter(
        (tool) =>
          tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (tool.categories?.name || "").toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredTools(filtered)
    }
  }, [searchQuery, tools])

  const handleDeleteClick = (toolId: string) => {
    setDeleteToolId(toolId)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!deleteToolId) return

    try {
      await deleteTool(deleteToolId)

      // Update local state
      setTools(tools.filter((tool) => tool.id !== deleteToolId))

      toast({
        title: "Tool deleted",
        description: "The tool has been deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting tool:", error)
      toast({
        title: "Error",
        description: "Failed to delete tool. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleteDialogOpen(false)
    }
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>
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
            {filteredTools.length > 0 ? (
              filteredTools.map((tool) => (
                <TableRow key={tool.id}>
                  <TableCell className="font-medium">{tool.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-blue-500/20 bg-blue-500/10 text-blue-500">
                      {tool.categories?.name || "Unknown"}
                    </Badge>
                  </TableCell>
                  <TableCell>{tool.price}</TableCell>
                  <TableCell>{Number(tool.rating).toFixed(1)}</TableCell>
                  <TableCell>{new Date(tool.created_at).toLocaleDateString()}</TableCell>
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No tools found. {searchQuery ? "Try a different search term." : "Add your first tool."}
                </TableCell>
              </TableRow>
            )}
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
