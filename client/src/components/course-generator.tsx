"use client"

import React, { useState } from "react"
import { Sparkles, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function CourseGenerator() {
  const [courseName, setCourseName] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    if (!courseName.trim()) return

    setIsGenerating(true)

    // 🔹 Dummy delay (fake generation)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // 🔹 Dummy action
    console.log("Generated course:", courseName)

    setCourseName("")
    setIsGenerating(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleGenerate()
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] p-6 lg:p-8">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-4">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Create a New Course
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Enter a course title and we will generate a complete course structure for you.
          </p>
        </div>

        {/* Generator Card */}
        <Card>
          <CardHeader>
            <CardTitle>Course Generator</CardTitle>
            <CardDescription>
              Start by entering the name of the course you want to create
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Input
                placeholder="e.g., Introduction to Machine Learning"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isGenerating}
              />

              <Button
                onClick={handleGenerate}
                disabled={!courseName.trim() || isGenerating}
                className="gap-2"
              >
                {isGenerating ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    Generate Course
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Tips */}
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              title: "Be Specific",
              description: "Detailed course names generate better content structure",
            },
            {
              title: "Include Level",
              description: "Add 'Beginner', 'Advanced' etc. for tailored modules",
            },
            {
              title: "Topic Focus",
              description: "Focus on one main topic for coherent course flow",
            },
          ].map((tip) => (
            <Card key={tip.title} className="bg-card/50">
              <CardContent className="pt-6">
                <h3 className="font-medium">{tip.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {tip.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
