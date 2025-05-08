import { Zap } from "lucide-react"
import TrendingTools from "@/components/trending-tools"

export default function TrendingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-blue-500 text-primary-foreground hover:bg-blue-500/80">
            <Zap className="mr-1 h-3.5 w-3.5" />
            Trending Now
          </div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Trending Tools</h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Discover the most popular tools based on real usage data from professionals like you
          </p>
        </div>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-6">Top 10 Overall</h2>
          <TrendingTools />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Trending in Content Creation</h2>
          <TrendingTools />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Trending in Development</h2>
          <TrendingTools />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Trending in Design</h2>
          <TrendingTools />
        </section>
      </div>
    </div>
  )
}
