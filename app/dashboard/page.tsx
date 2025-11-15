"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import NutritionTracker from "@/components/nutrition-tracker"
import RecipeDiscovery from "@/components/recipe-discovery"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from 'next/navigation'
import { useState } from "react"

export default function DashboardPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      router.push("/auth/login")
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="text-2xl font-bold text-foreground cursor-pointer hover:opacity-80">NutritionAI</div>
          </Link>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleLogout}
            disabled={isLoading}
          >
            {isLoading ? "Signing out..." : "Sign Out"}
          </Button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Welcome back!</h1>
          <p className="text-muted-foreground">Track your nutrition and discover amazing recipes</p>
        </div>

        {/* Nutrition Tracker Section */}
        <section className="mb-12">
          <NutritionTracker />
        </section>

        {/* Recipe Discovery Section */}
        <section>
          <RecipeDiscovery />
        </section>
        <elevenlabs-convai agent-id="agent_9401ka1e52f4feyth1qh58mbk8eb"></elevenlabs-convai><script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async type="text/javascript"></script>
      </main>
    </div>
  )
}
