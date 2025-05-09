// Fungsi API untuk kategori
export async function getCategories() {
  const response = await fetch("/api/categories")
  if (!response.ok) {
    throw new Error("Failed to fetch categories")
  }
  return response.json()
}

export async function getCategoryById(id: string) {
  const response = await fetch(`/api/categories/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch category")
  }
  return response.json()
}

export async function createCategory(data: any) {
  const response = await fetch("/api/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error("Failed to create category")
  }
  return response.json()
}

export async function updateCategory(id: string, data: any) {
  const response = await fetch(`/api/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error("Failed to update category")
  }
  return response.json()
}

export async function deleteCategory(id: string) {
  const response = await fetch(`/api/categories/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error("Failed to delete category")
  }
  return response.json()
}

// Fungsi API untuk tools
export async function getTools(params?: { category?: string; featured?: boolean; limit?: number }) {
  let url = "/api/tools"
  const queryParams = new URLSearchParams()

  if (params?.category) {
    queryParams.append("category", params.category)
  }

  if (params?.featured) {
    queryParams.append("featured", "true")
  }

  if (params?.limit) {
    queryParams.append("limit", params.limit.toString())
  }

  if (queryParams.toString()) {
    url += `?${queryParams.toString()}`
  }

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Failed to fetch tools")
  }
  return response.json()
}

export async function getToolById(id: string) {
  const response = await fetch(`/api/tools/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch tool")
  }
  return response.json()
}

export async function createTool(data: any) {
  const response = await fetch("/api/tools", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error("Failed to create tool")
  }
  return response.json()
}

export async function updateTool(id: string, data: any) {
  const response = await fetch(`/api/tools/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error("Failed to update tool")
  }
  return response.json()
}

export async function deleteTool(id: string) {
  const response = await fetch(`/api/tools/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error("Failed to delete tool")
  }
  return response.json()
}

export async function trackToolClick(id: string) {
  const response = await fetch(`/api/tools/${id}/click`, {
    method: "POST",
  })
  if (!response.ok) {
    console.error("Failed to track tool click")
  }
  return response.json()
}
