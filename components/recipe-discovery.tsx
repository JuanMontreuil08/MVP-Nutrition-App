"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface Recipe {
  nombre: string
  descripción: string
  ingredientes: string[]
  instrucciones: string[]
  calificación_promedio: number
}

export default function RecipeDiscovery() {
  const [query, setQuery] = useState("")
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSearch = async () => {
    if (!query.trim()) return

    setLoading(true)
    setError("")
    try {
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      })

      if (response.ok) {
        const data = await response.json()
        setRecipes(data.recetas || [])
      } else {
        setError("Failed to fetch recipes. Please try again.")
      }
    } catch (error) {
      console.error("Error fetching recipes:", error)
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">Discover Recipes</h2>

      {/* Search Section */}
      <Card className="p-6 mb-8 bg-card">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="e.g., pasta with vegetables, something with chicken..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1"
          />
          <Button onClick={handleSearch} disabled={loading} className="sm:w-auto">
            {loading ? "Searching..." : "Find Recipes"}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-3">
          Describe what you want to eat and our AI will find the best recipes for you
        </p>
        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
      </Card>

      {/* Recipes Grid */}
      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe, idx) => (
            <Card key={idx} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
              <div className="bg-gradient-to-br from-accent/20 to-secondary/20 h-32 flex items-center justify-center">
                <div className="text-4xl">🍽️</div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-foreground mb-2">{recipe.nombre}</h3>
                <p className="text-sm text-muted-foreground mb-4">{recipe.descripción}</p>

                {/* Rating */}
                <div className="mb-4 pb-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground">Rating</p>
                    <p className="font-semibold text-foreground">★ {recipe.calificación_promedio.toFixed(1)}/5</p>
                  </div>
                </div>

                {/* Ingredients */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-foreground mb-2">Ingredients</p>
                  <ul className="text-xs text-muted-foreground space-y-1 max-h-24 overflow-y-auto">
                    {recipe.ingredientes.map((ing, i) => (
                      <li key={i}>• {ing}</li>
                    ))}
                  </ul>
                </div>

                {/* Instructions Summary */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-foreground mb-2">Steps</p>
                  <p className="text-xs text-muted-foreground">
                    {recipe.instrucciones.length} steps • {Math.ceil(recipe.instrucciones.length * 3)} min
                  </p>
                </div>

                <Button className="w-full mt-auto bg-accent hover:bg-accent/90 text-white">View Full Recipe</Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-muted-foreground">
            {loading ? "Finding recipes..." : "Search for a recipe to get started"}
          </p>
        </div>
      )}
    </div>
  )
}
