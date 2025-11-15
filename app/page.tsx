"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div className="text-2xl font-bold text-foreground">NutritionAI</div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Your nutrition, <span className="text-accent">optimized.</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Track your daily nutrition, get personalized recipe recommendations, and achieve your health goals with
              AI-powered insights.
            </p>
            <div className="flex gap-4">
              <Link href="/auth/signup">
                <Button size="lg" className="px-8">
                  Start Tracking
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-8 bg-transparent">
                Learn More
              </Button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-accent/10 to-secondary/10 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🥗</div>
              <p className="text-foreground font-semibold">Smart Recipe Discovery</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Why Choose NutritionAI?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Real-time Tracking",
                description: "Monitor your calories, protein, and nutrients throughout the day",
              },
              {
                title: "AI Recipes",
                description: "Get personalized recipe recommendations based on your preferences",
              },
              {
                title: "Health Insights",
                description: "Visualize your nutrition data and make informed dietary choices",
              },
            ].map((feature, i) => (
              <div key={i} className="bg-card rounded-lg p-8 border border-border hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-primary rounded-lg p-12 md:p-16 text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-4">Ready to optimize your nutrition?</h2>
          <p className="text-primary-foreground/90 mb-8 text-lg">
            Start tracking and discovering recipes that work for you.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              Start Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
