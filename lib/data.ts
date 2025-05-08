// This is a mock data file that would be replaced with actual database queries in a real app

export interface Tool {
  id: string
  name: string
  description: string
  imageUrl: string
  url: string
  rating: number
  price: string
  tags: string[]
  category: string
  addedDate: string
  clicks: number
  rank?: number
}

// In-memory storage for tool click tracking
const toolClicks = {}

// Initialize click counts
const tools: Tool[] = [
  // Content Creator Tools
  {
    id: "1",
    name: "VideoMaster Pro",
    description: "Professional video editing software with AI-powered features for content creators.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "https://example.com/videomaster",
    rating: 4.8,
    price: "$19.99/month",
    tags: ["Video Editing", "AI-Powered", "Premium"],
    category: "content-creator",
    addedDate: "2023-12-15",
    clicks: 1245,
  },
  {
    id: "2",
    name: "ContentPlanner",
    description: "Plan, schedule, and organize your content across multiple platforms.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "https://example.com/contentplanner",
    rating: 4.5,
    price: "$9.99/month",
    tags: ["Content Planning", "Scheduling", "Premium"],
    category: "content-creator",
    addedDate: "2024-01-10",
    clicks: 987,
  },
  {
    id: "3",
    name: "ThumbnailAI",
    description: "Generate eye-catching thumbnails for your videos using AI.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "https://example.com/thumbnailai",
    rating: 4.2,
    price: "Free",
    tags: ["Thumbnails", "AI-Powered", "Free"],
    category: "content-creator",
    addedDate: "2024-02-05",
    clicks: 1876,
  },
  {
    id: "4",
    name: "AudienceInsight",
    description: "Advanced analytics to understand your audience and grow your channel.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "https://example.com/audienceinsight",
    rating: 4.7,
    price: "$14.99/month",
    tags: ["Analytics", "Growth", "Premium"],
    category: "content-creator",
    addedDate: "2024-03-20",
    clicks: 654,
  },
  {
    id: "5",
    name: "ScriptBuddy",
    description: "AI-powered script writing assistant for content creators.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "https://example.com/scriptbuddy",
    rating: 4.3,
    price: "$7.99/month",
    tags: ["Script Writing", "AI-Powered", "Premium"],
    category: "content-creator",
    addedDate: "2024-04-15",
    clicks: 2134,
  },
  {
    id: "6",
    name: "StreamSetup",
    description: "All-in-one streaming solution for live content creators.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "https://example.com/streamsetup",
    rating: 4.6,
    price: "$24.99/month",
    tags: ["Streaming", "Live Content", "Premium"],
    category: "content-creator",
    addedDate: "2024-05-01",
    clicks: 1432,
  },

  // Graphic Designer Tools
  {
    id: "7",
    name: "DesignStudio Pro",
    description: "Professional design software for graphic designers with advanced features.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "https://example.com/designstudio",
    rating: 4.9,
    price: "$49.99/month",
    tags: ["Design Software", "Professional", "Premium"],
    category: "graphic-designer",
    addedDate: "2023-11-10",
    clicks: 3245,
  },
  {
    id: "8",
    name: "IconMaker",
    description: "Create beautiful icons for your projects with ease.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "https://example.com/iconmaker",
    rating: 4.4,
    price: "Free",
    tags: ["Icons", "Free", "Beginner Friendly"],
    category: "graphic-designer",
    addedDate: "2024-01-05",
    clicks: 1876,
  },
  {
    id: "9",
    name: "ColorPalette Pro",
    description: "Generate perfect color palettes for your design projects.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "https://example.com/colorpalette",
    rating: 4.6,
    price: "$4.99/month",
    tags: ["Color Tools", "Premium", "Beginner Friendly"],
    category: "graphic-designer",
    addedDate: "2024-02-15",
    clicks: 2134,
  },
  {
    id: "10",
    name: "FontExplorer",
    description: "Discover and manage fonts for your design projects.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "https://example.com/fontexplorer",
    rating: 4.3,
    price: "$9.99/month",
    tags: ["Typography", "Premium", "Professional"],
    category: "graphic-designer",
    addedDate: "2024-03-10",
    clicks: 987,
  },
  {
    id: "11",
    name: "MockupMaster",
    description: "Create realistic mockups for your designs in seconds.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "https://example.com/mockupmaster",
    rating: 4.7,
    price: "$14.99/month",
    tags: ["Mockups", "Premium", "Professional"],
    category: "graphic-designer",
    addedDate: "2024-04-05",
    clicks: 1543,
  },
  {
    id: "12",
    name: "AssetLibrary",
    description: "Access thousands of design assets for your projects.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "https://example.com/assetlibrary",
    rating: 4.5,
    price: "$19.99/month",
    tags: ["Asset Libraries", "Premium", "Professional"],
    category: "graphic-designer",
    addedDate: "2024-05-10",
    clicks: 2345,
  },

  // Software Developer Tools
  {
    id: "13",
    name: "CodeIDE Pro",
    description: "Professional IDE for software developers with advanced features.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "https://example.com/codeide",
    rating: 4.8,
    price: "$29.99/month",
    tags: ["IDE", "Premium", "Professional"],
    category: "software-developer",
    addedDate: "2023-10-15",
    clicks: 4532,
  },
  {
    id: "14",
    name: "GitMaster",
    description: "Advanced Git client for software developers.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "https://example.com/gitmaster",
    rating: 4.6,
    price: "$9.99/month",
    tags: ["Version Control", "Premium", "Professional"],
    category: "software-developer",
    addedDate: "2023-11-20",
    clicks: 3421,
  },
  {
    id: "15",
    name: "TestRunner",
    description: "Automated testing tool for software developers.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "https://example.com/testrunner",
    rating: 4.5,
    price: "$14.99/month",
    tags: ["Testing", "Premium", "Professional"],
    category: "software-developer",
    addedDate: "2024-01-15",
    clicks: 1234,
  },
  {
    id: "16",
    name: "DeployMaster",
    description: "Simplified deployment for your applications.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "https://example.com/deploymaster",
    rating: 4.7,
    price: "$19.99/month",
    tags: ["Deployment", "Premium", "Professional"],
    category: "software-developer",
    addedDate: "2024-02-20",
    clicks: 2345,
  },
  {
    id: "17",
    name: "CodeAssistant",
    description: "AI-powered coding assistant for software developers.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "https://example.com/codeassistant",
    rating: 4.9,
    price: "$24.99/month",
    tags: ["AI Assistants", "Premium", "Professional"],
    category: "software-developer",
    addedDate: "2024-03-15",
    clicks: 5432,
  },
  {
    id: "18",
    name: "APITester",
    description: "Test and document your APIs with ease.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "https://example.com/apitester",
    rating: 4.4,
    price: "Free",
    tags: ["API Testing", "Free", "Beginner Friendly"],
    category: "software-developer",
    addedDate: "2024-04-20",
    clicks: 1876,
  },

  // Entrepreneur Tools
  {
    id: "19",
    name: "BusinessPlanner",
    description: "Create professional business plans with ease.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "https://example.com/businessplanner",
    rating: 4.7,
    price: "$19.99/month",
    tags: ["Business Planning", "Premium", "Professional"],
    category: "entrepreneur",
    addedDate: "2023-09-15",
    clicks: 2345,
  },
  {
    id: "20",
    name: "MarketingHub",
    description: "All-in-one marketing platform for entrepreneurs.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "https://example.com/marketinghub",
    rating: 4.8,
    price: "$29.99/month",
    tags: ["Marketing", "Premium", "Professional"],
    category: "entrepreneur",
    addedDate: "2023-10-20",
    clicks: 3456,
  },
  {
    id: "21",
    name: "FinanceTracker",
    description: "Track your business finances with ease.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "https://example.com/financetracker",
    rating: 4.6,
    price: "$14.99/month",
    tags: ["Finance", "Premium", "Professional"],
    category: "entrepreneur",
    addedDate: "2023-11-15",
    clicks: 1987,
  },
  {
    id: "22",
    name: "CustomerCRM",
    description: "Manage your customer relationships effectively.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "https://example.com/customercrm",
    rating: 4.5,
    price: "$19.99/month",
    tags: ["CRM", "Premium", "Professional"],
    category: "entrepreneur",
    addedDate: "2024-01-20",
    clicks: 2345,
  },
  {
    id: "23",
    name: "ProductivitySuite",
    description: "Boost your productivity with this all-in-one suite.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "https://example.com/productivitysuite",
    rating: 4.9,
    price: "$24.99/month",
    tags: ["Productivity", "Premium", "Professional"],
    category: "entrepreneur",
    addedDate: "2024-02-15",
    clicks: 4321,
  },
  {
    id: "24",
    name: "InvoiceGenerator",
    description: "Create and send professional invoices in minutes.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "https://example.com/invoicegenerator",
    rating: 4.4,
    price: "Free",
    tags: ["Finance", "Free", "Beginner Friendly"],
    category: "entrepreneur",
    addedDate: "2024-03-20",
    clicks: 1876,
  },

  // Additional tools for expanded categories
  {
    id: "25",
    name: "PhotoEditor Pro",
    description: "Professional photo editing software with advanced features.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "https://example.com/photoeditor",
    rating: 4.7,
    price: "$19.99/month",
    tags: ["Photo Editing", "Premium", "Professional"],
    category: "photographer",
    addedDate: "2024-01-15",
    clicks: 3245,
  },
  {
    id: "26",
    name: "AudioMixer",
    description: "Professional audio mixing software for music producers.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "https://example.com/audiomixer",
    rating: 4.8,
    price: "$24.99/month",
    tags: ["Audio Mixing", "Premium", "Professional"],
    category: "audio-producer",
    addedDate: "2024-02-10",
    clicks: 2876,
  },
  {
    id: "27",
    name: "AppTester",
    description: "Comprehensive mobile app testing platform.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "https://example.com/apptester",
    rating: 4.6,
    price: "$14.99/month",
    tags: ["App Testing", "Premium", "Professional"],
    category: "mobile-developer",
    addedDate: "2024-03-05",
    clicks: 1987,
  },
  {
    id: "28",
    name: "DataViz Pro",
    description: "Advanced data visualization tool for data scientists.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "https://example.com/dataviz",
    rating: 4.7,
    price: "$19.99/month",
    tags: ["Data Visualization", "Premium", "Professional"],
    category: "data-scientist",
    addedDate: "2024-04-10",
    clicks: 3456,
  },
  {
    id: "29",
    name: "CloudManager",
    description: "Comprehensive cloud infrastructure management platform.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "https://example.com/cloudmanager",
    rating: 4.8,
    price: "$29.99/month",
    tags: ["Cloud Management", "Premium", "Professional"],
    category: "devops-engineer",
    addedDate: "2024-05-05",
    clicks: 2345,
  },
  {
    id: "30",
    name: "SecurityScanner",
    description: "Advanced security scanning and monitoring tool.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "https://example.com/securityscanner",
    rating: 4.7,
    price: "$24.99/month",
    tags: ["Security Scanning", "Premium", "Professional"],
    category: "cybersecurity",
    addedDate: "2024-01-25",
    clicks: 3456,
  },
]

// Initialize toolClicks with the initial click counts from the tools array
tools.forEach((tool) => {
  toolClicks[tool.id] = tool.clicks
})

export function getToolsByCategory(category: string): Tool[] {
  return tools.filter((tool) => tool.category === category)
}

export function getAllTools(): Tool[] {
  return tools
}

export function getToolById(id: string): Tool | undefined {
  return tools.find((tool) => tool.id === id)
}

export function getCategories() {
  return [
    { id: "content-creator", name: "Content Creator" },
    { id: "graphic-designer", name: "Graphic Designer" },
    { id: "software-developer", name: "Software Developer" },
    { id: "entrepreneur", name: "Entrepreneur" },
    { id: "photographer", name: "Photographer" },
    { id: "video-editor", name: "Video Editor" },
    { id: "audio-producer", name: "Audio Producer" },
    { id: "mobile-developer", name: "Mobile Developer" },
    { id: "web-developer", name: "Web Developer" },
    { id: "data-scientist", name: "Data Scientist" },
    { id: "devops-engineer", name: "DevOps Engineer" },
    { id: "cybersecurity", name: "Cybersecurity" },
    { id: "ui-ux-designer", name: "UI/UX Designer" },
    { id: "ai-engineer", name: "AI Engineer" },
    { id: "writer-editor", name: "Writer/Editor" },
    { id: "product-manager", name: "Product Manager" },
  ]
}

// Function to track tool clicks
export function trackToolClick(toolId: string): void {
  // Increment the click count for the tool
  if (toolClicks[toolId]) {
    toolClicks[toolId]++
  } else {
    toolClicks[toolId] = 1
  }

  // In a real app, this would be persisted to a database
  console.log(`Tool ${toolId} clicked. New count: ${toolClicks[toolId]}`)
}

// Function to get trending tools based on click count
export function getTrendingTools(limit = 8): Tool[] {
  // Sort tools by click count and add rank
  return [...tools]
    .sort((a, b) => (toolClicks[b.id] || b.clicks) - (toolClicks[a.id] || a.clicks))
    .slice(0, limit)
    .map((tool, index) => ({
      ...tool,
      clicks: toolClicks[tool.id] || tool.clicks,
      rank: index + 1,
    }))
}

// Function to search tools
export function searchTools(query: string): Tool[] {
  if (!query) return []

  const lowercaseQuery = query.toLowerCase()

  return tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(lowercaseQuery) ||
      tool.description.toLowerCase().includes(lowercaseQuery) ||
      tool.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
      tool.category.toLowerCase().includes(lowercaseQuery),
  )
}
