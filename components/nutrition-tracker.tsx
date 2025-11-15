"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface NutritionData {
  weight: number
  height: number
  calories: number
  protein: number
  carbs: number
  fat: number
}

export default function NutritionTracker() {
  const [data] = useState<NutritionData>({
    weight: 75,
    height: 180,
    calories: 1850,
    protein: 120,
    carbs: 200,
    fat: 65,
  })

  // Daily targets (example)
  const targets = {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 70,
  }

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
  }

  const NutritionCard = ({ label, current, target, unit }: any) => {
    const percentage = getProgressPercentage(current, target)
    return (
      <Card className="p-6 hover:shadow-lg transition-shadow">
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          <p className="text-3xl font-bold text-foreground">
            {current}
            <span className="text-lg text-muted-foreground ml-1">{unit}</span>
          </p>
        </div>
        <div className="bg-muted rounded-full h-2">
          <div
            className={cn("h-full rounded-full transition-all", percentage > 90 ? "bg-destructive" : "bg-accent")}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Target: {target}
          {unit}
        </p>
      </Card>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">Today's Nutrition</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <NutritionCard label="Calories" current={data.calories} target={targets.calories} unit="kcal" />
        <NutritionCard label="Protein" current={data.protein} target={targets.protein} unit="g" />
        <NutritionCard label="Carbs" current={data.carbs} target={targets.carbs} unit="g" />
        <NutritionCard label="Fat" current={data.fat} target={targets.fat} unit="g" />
      </div>

      {/* Physical Metrics */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Physical Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Weight</p>
            <p className="text-2xl font-bold text-foreground">{data.weight} kg</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Height</p>
            <p className="text-2xl font-bold text-foreground">{data.height} cm</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">BMI</p>
            <p className="text-2xl font-bold text-foreground">{(data.weight / (data.height / 100) ** 2).toFixed(1)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Calorie Goal</p>
            <p className="text-2xl font-bold text-foreground">{targets.calories}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
