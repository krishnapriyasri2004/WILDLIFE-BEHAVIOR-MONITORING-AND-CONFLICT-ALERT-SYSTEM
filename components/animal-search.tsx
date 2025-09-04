"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Volume2 } from "lucide-react"

export function AnimalSearch() {
  const [selectedAnimal, setSelectedAnimal] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [prediction, setPrediction] = useState<any>(null)

  const animals = [
    { id: "tiger", name: "Tiger", audio: "tiger_roar.mp3" },
    { id: "elephant", name: "Elephant", audio: "elephant_trumpet.mp3" },
    { id: "leopard", name: "Leopard", audio: "leopard_growl.mp3" },
    { id: "wild_boar", name: "Wild Boar", audio: "boar_grunt.mp3" },
    { id: "peacock", name: "Peacock", audio: "peacock_call.mp3" },
  ]

  const handleAnalyze = () => {
    // Simulate CNN prediction
    const emotions = ["Aggressive", "Alert", "Calm", "Distressed", "Territorial"]
    const behaviors = ["Hunting", "Feeding", "Resting", "Patrolling", "Mating Call"]

    setPrediction({
      emotion: emotions[Math.floor(Math.random() * emotions.length)],
      behavior: behaviors[Math.floor(Math.random() * behaviors.length)],
      confidence: (85 + Math.random() * 10).toFixed(1),
      threatLevel: Math.random() > 0.5 ? "High" : "Medium",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Animal Audio Analysis</CardTitle>
          <CardDescription>Select an animal to analyze audio patterns and predict emotional state</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Select Animal</label>
              <Select value={selectedAnimal} onValueChange={setSelectedAnimal}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an animal..." />
                </SelectTrigger>
                <SelectContent>
                  {animals.map((animal) => (
                    <SelectItem key={animal.id} value={animal.id}>
                      {animal.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button onClick={handleAnalyze} disabled={!selectedAnimal} className="bg-green-600 hover:bg-green-700">
                Analyze Audio
              </Button>
            </div>
          </div>

          {selectedAnimal && (
            <Card className="bg-gray-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Volume2 className="w-4 h-4" />
                    <span className="font-medium">{animals.find((a) => a.id === selectedAnimal)?.name} Audio</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isPlaying ? "Pause" : "Play"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {prediction && (
        <Card>
          <CardHeader>
            <CardTitle>CNN Prediction Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">Emotion</p>
                <Badge variant={prediction.emotion === "Aggressive" ? "destructive" : "secondary"} className="mt-1">
                  {prediction.emotion}
                </Badge>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Behavior</p>
                <Badge variant="outline" className="mt-1">
                  {prediction.behavior}
                </Badge>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Confidence</p>
                <p className="font-bold text-lg">{prediction.confidence}%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Threat Level</p>
                <Badge variant={prediction.threatLevel === "High" ? "destructive" : "default"} className="mt-1">
                  {prediction.threatLevel}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
