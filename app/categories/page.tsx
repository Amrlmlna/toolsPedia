import Link from "next/link"
import {
  ArrowRight,
  Briefcase,
  Code,
  Palette,
  PenTool,
  Camera,
  Film,
  Headphones,
  Smartphone,
  Globe,
  Database,
  Server,
  Shield,
  Layers,
  Cpu,
  BookOpen,
  Lightbulb,
  Music,
  ShoppingCart,
  Truck,
  Heart,
  Microscope,
  Leaf,
  Coffee,
  Utensils,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function CategoriesPage() {
  const categories = [
    // Creative
    {
      icon: <PenTool className="h-8 w-8 text-rose-500" />,
      title: "Content Creator",
      description: "Tools for video editing, content planning, and audience growth",
      slug: "content-creator",
      group: "Creative",
    },
    {
      icon: <Palette className="h-8 w-8 text-violet-500" />,
      title: "Graphic Designer",
      description: "Design software, asset libraries, and creative resources",
      slug: "graphic-designer",
      group: "Creative",
    },
    {
      icon: <Camera className="h-8 w-8 text-blue-500" />,
      title: "Photographer",
      description: "Photo editing, organization, and sharing tools",
      slug: "photographer",
      group: "Creative",
    },
    {
      icon: <Film className="h-8 w-8 text-red-500" />,
      title: "Video Editor",
      description: "Video editing, effects, and production tools",
      slug: "video-editor",
      group: "Creative",
    },
    {
      icon: <Headphones className="h-8 w-8 text-purple-500" />,
      title: "Audio Producer",
      description: "Audio editing, mixing, and production tools",
      slug: "audio-producer",
      group: "Creative",
    },
    {
      icon: <Music className="h-8 w-8 text-pink-500" />,
      title: "Musician",
      description: "Music production, recording, and distribution tools",
      slug: "musician",
      group: "Creative",
    },

    // Technology
    {
      icon: <Code className="h-8 w-8 text-emerald-500" />,
      title: "Software Developer",
      description: "Coding tools, frameworks, and development resources",
      slug: "software-developer",
      group: "Technology",
    },
    {
      icon: <Smartphone className="h-8 w-8 text-teal-500" />,
      title: "Mobile Developer",
      description: "Mobile app development and testing tools",
      slug: "mobile-developer",
      group: "Technology",
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-400" />,
      title: "Web Developer",
      description: "Web development, hosting, and deployment tools",
      slug: "web-developer",
      group: "Technology",
    },
    {
      icon: <Database className="h-8 w-8 text-green-400" />,
      title: "Data Scientist",
      description: "Data analysis, visualization, and machine learning tools",
      slug: "data-scientist",
      group: "Technology",
    },
    {
      icon: <Server className="h-8 w-8 text-orange-400" />,
      title: "DevOps Engineer",
      description: "Infrastructure, CI/CD, and cloud management tools",
      slug: "devops-engineer",
      group: "Technology",
    },
    {
      icon: <Shield className="h-8 w-8 text-red-400" />,
      title: "Cybersecurity",
      description: "Security testing, monitoring, and protection tools",
      slug: "cybersecurity",
      group: "Technology",
    },
    {
      icon: <Cpu className="h-8 w-8 text-yellow-400" />,
      title: "AI Engineer",
      description: "AI development, training, and deployment tools",
      slug: "ai-engineer",
      group: "Technology",
    },

    // Business
    {
      icon: <Briefcase className="h-8 w-8 text-amber-500" />,
      title: "Entrepreneur",
      description: "Business planning, marketing, and management tools",
      slug: "entrepreneur",
      group: "Business",
    },
    {
      icon: <Layers className="h-8 w-8 text-purple-400" />,
      title: "UI/UX Designer",
      description: "User interface and experience design tools",
      slug: "ui-ux-designer",
      group: "Business",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-pink-400" />,
      title: "Writer/Editor",
      description: "Writing, editing, and publishing tools",
      slug: "writer-editor",
      group: "Business",
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-indigo-400" />,
      title: "Product Manager",
      description: "Product planning, roadmapping, and analytics tools",
      slug: "product-manager",
      group: "Business",
    },
    {
      icon: <ShoppingCart className="h-8 w-8 text-green-500" />,
      title: "E-commerce",
      description: "Online store, payment, and inventory management tools",
      slug: "ecommerce",
      group: "Business",
    },
    {
      icon: <Truck className="h-8 w-8 text-blue-600" />,
      title: "Logistics",
      description: "Supply chain, shipping, and inventory management tools",
      slug: "logistics",
      group: "Business",
    },

    // Other
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Healthcare",
      description: "Medical, health tracking, and wellness tools",
      slug: "healthcare",
      group: "Other",
    },
    {
      icon: <Microscope className="h-8 w-8 text-blue-700" />,
      title: "Scientific Research",
      description: "Research, data collection, and analysis tools",
      slug: "scientific-research",
      group: "Other",
    },
    {
      icon: <Leaf className="h-8 w-8 text-green-600" />,
      title: "Environmental",
      description: "Sustainability, conservation, and environmental tools",
      slug: "environmental",
      group: "Other",
    },
    {
      icon: <Coffee className="h-8 w-8 text-amber-700" />,
      title: "Lifestyle",
      description: "Personal productivity, wellness, and lifestyle tools",
      slug: "lifestyle",
      group: "Other",
    },
    {
      icon: <Utensils className="h-8 w-8 text-orange-500" />,
      title: "Food & Beverage",
      description: "Recipe management, meal planning, and food business tools",
      slug: "food-beverage",
      group: "Other",
    },
  ]

  // Group categories by their group property
  const groupedCategories = categories.reduce((acc, category) => {
    if (!acc[category.group]) {
      acc[category.group] = []
    }
    acc[category.group].push(category)
    return acc
  }, {})

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">
            Browse All Categories
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Explore our comprehensive collection of tools organized by profession
          </p>
        </div>
      </div>

      {Object.entries(groupedCategories).map(([group, groupCategories]) => (
        <section key={group} className="mb-16">
          <h2 className="text-2xl font-bold mb-8 pb-2 border-b">{group}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupCategories.map((category) => (
              <Card
                key={category.slug}
                className="transition-all hover:shadow-lg hover:shadow-blue-500/10 border-blue-500/20 bg-background/60 backdrop-blur overflow-hidden group"
              >
                <CardHeader>
                  <div className="mb-2 transition-transform group-hover:scale-110">{category.icon}</div>
                  <CardTitle>{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild className="w-full bg-blue-500 hover:bg-blue-600">
                    <Link href={`/workspace/${category.slug}`}>
                      Explore <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
