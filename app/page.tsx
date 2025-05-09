import Link from "next/link"
import {
  ArrowRight,
  Briefcase,
  Code,
  Palette,
  PenTool,
  Zap,
  Search,
  Layers,
  Cpu,
  BookOpen,
  Headphones,
  Camera,
  Film,
  Smartphone,
  Globe,
  Database,
  Server,
  Shield,
  Lightbulb,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import TrendingTools from "@/components/trending-tools"
import TrendingCarousel from "@/components/trending-carousel"

export default function Home() {
  const categories = [
    {
      icon: <PenTool className="h-8 w-8 text-rose-500" />,
      title: "Content Creator",
      description: "Tools for video editing, content planning, and audience growth",
      slug: "content-creator",
    },
    {
      icon: <Palette className="h-8 w-8 text-violet-500" />,
      title: "Graphic Designer",
      description: "Design software, asset libraries, and creative resources",
      slug: "graphic-designer",
    },
    {
      icon: <Code className="h-8 w-8 text-emerald-500" />,
      title: "Software Developer",
      description: "Coding tools, frameworks, and development resources",
      slug: "software-developer",
    },
    {
      icon: <Briefcase className="h-8 w-8 text-amber-500" />,
      title: "Entrepreneur",
      description: "Business planning, marketing, and management tools",
      slug: "entrepreneur",
    },
    {
      icon: <Camera className="h-8 w-8 text-blue-500" />,
      title: "Photographer",
      description: "Photo editing, organization, and sharing tools",
      slug: "photographer",
    },
    {
      icon: <Film className="h-8 w-8 text-red-500" />,
      title: "Video Editor",
      description: "Video editing, effects, and production tools",
      slug: "video-editor",
    },
    {
      icon: <Headphones className="h-8 w-8 text-purple-500" />,
      title: "Audio Producer",
      description: "Audio editing, mixing, and production tools",
      slug: "audio-producer",
    },
    {
      icon: <Smartphone className="h-8 w-8 text-teal-500" />,
      title: "Mobile Developer",
      description: "Mobile app development and testing tools",
      slug: "mobile-developer",
    },
  ]

  const moreCategories = [
    {
      icon: <Globe className="h-6 w-6 text-blue-400" />,
      title: "Web Developer",
      slug: "web-developer",
    },
    {
      icon: <Database className="h-6 w-6 text-green-400" />,
      title: "Data Scientist",
      slug: "data-scientist",
    },
    {
      icon: <Server className="h-6 w-6 text-orange-400" />,
      title: "DevOps Engineer",
      slug: "devops-engineer",
    },
    {
      icon: <Shield className="h-6 w-6 text-red-400" />,
      title: "Cybersecurity",
      slug: "cybersecurity",
    },
    {
      icon: <Layers className="h-6 w-6 text-purple-400" />,
      title: "UI/UX Designer",
      slug: "ui-ux-designer",
    },
    {
      icon: <Cpu className="h-6 w-6 text-yellow-400" />,
      title: "AI Engineer",
      slug: "ai-engineer",
    },
    {
      icon: <BookOpen className="h-6 w-6 text-pink-400" />,
      title: "Writer/Editor",
      slug: "writer-editor",
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-indigo-400" />,
      title: "Product Manager",
      slug: "product-manager",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="py-12 md:py-24 lg:py-32 space-y-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">
                Discover the Perfect Tools for Your Profession
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Explore our curated collection of professional tools and resources to boost your productivity and
                creativity.
              </p>
            </div>
            <div className="w-full max-w-md">
              <form className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for tools..."
                  className="w-full rounded-full pl-10 pr-16 h-12 bg-background/60 border-blue-500/30 focus-visible:ring-blue-500/50"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full h-10"
                >
                  Search
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-blue-500 text-primary-foreground hover:bg-blue-500/80">
                <Zap className="mr-1 h-3.5 w-3.5" />
                Trending Now
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Most Popular Tools</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Discover what professionals like you are using right now
              </p>
            </div>
          </div>

          {/* Trending Carousel */}
          <div className="mb-12">
            <TrendingCarousel />
          </div>

          {/* Regular Trending Tools Grid */}
          <TrendingTools />
        </div>
      </section>

      <section className="py-12 md:py-24 lg:py-32 bg-muted/30 rounded-3xl">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Explore by Profession</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Find tools tailored to your specific professional needs
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {categories.map((category) => (
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
                      <Link href={`/categories/${category.slug}`}>
                        Explore <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-8">
              {moreCategories.map((category) => (
                <Button
                  key={category.slug}
                  variant="outline"
                  asChild
                  className="h-auto py-3 justify-start border-blue-500/20 hover:border-blue-500/50 hover:bg-blue-500/10"
                >
                  <Link href={`/categories/${category.slug}`} className="flex items-center gap-2">
                    {category.icon}
                    <span>{category.title}</span>
                  </Link>
                </Button>
              ))}
            </div>

            <Button asChild variant="outline" className="mt-8">
              <Link href="/categories">View All Categories</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-blue-500/10 px-3 py-1 text-sm text-blue-500">
                Why Choose Us
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Curated Tool Recommendations
              </h2>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Our platform analyzes the most popular tools used by professionals in your field. Save time searching
                and focus on what matters most.
              </p>
              <ul className="grid gap-2 py-4">
                <li className="flex items-center gap-2">
                  <div className="flex h-2 w-2 rounded-full bg-blue-500" />
                  <span>Curated recommendations based on your profession</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="flex h-2 w-2 rounded-full bg-blue-500" />
                  <span>Detailed reviews and ratings from professionals</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="flex h-2 w-2 rounded-full bg-blue-500" />
                  <span>Trending tools based on real usage data</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="flex h-2 w-2 rounded-full bg-blue-500" />
                  <span>Tutorials and guides to help you get started</span>
                </li>
              </ul>
            </div>
            <div className="flex justify-center">
              <div className="relative h-[450px] w-full overflow-hidden rounded-xl bg-muted">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-blue-500 opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="space-y-2 text-center">
                    <div className="text-2xl font-bold text-white">Find Your Perfect Tools</div>
                    <p className="text-white/80">All the tools you need in one place</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
