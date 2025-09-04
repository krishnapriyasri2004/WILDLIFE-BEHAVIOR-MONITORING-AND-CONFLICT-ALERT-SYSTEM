"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Volume2, AlertTriangle, Upload } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"

export default function AnimalDetectionPage() {
  const [selectedAnimal, setSelectedAnimal] = useState("")
  const [userAudioFile, setUserAudioFile] = useState<File | null>(null)
  const [userAudioName, setUserAudioName] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [prediction, setPrediction] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisSource, setAnalysisSource] = useState<"predefined" | "user" | null>(null)

  const animals = [
    { id: "tiger", name: "Tiger", audioFile: "tiger_roar.mp3" },
    { id: "elephant", name: "Elephant", audioFile: "elephant_trumpet.mp3" },
    { id: "leopard", name: "Leopard", audioFile: "leopard_growl.mp3" },
    { id: "peacock", name: "Peacock", audioFile: "peacock_call.mp3" },
    { id: "deer", name: "Spotted Deer", audioFile: "deer_alarm.mp3" },
    { id: "wild_boar", name: "Wild Boar", audioFile: "boar_grunt.mp3" },
  ]

  const handlePlayAudio = (isUserAudio = false) => {
    if (!selectedAnimal && !isUserAudio) return
    if (!userAudioFile && isUserAudio) return

    setIsPlaying(true)
    setIsAnalyzing(true)
    setAnalysisSource(isUserAudio ? "user" : "predefined")
    setPrediction(null) // Clear previous prediction

    // Simulate audio analysis
    setTimeout(() => {
      const emotions = ["Aggressive", "Alert", "Calm", "Distressed", "Territorial"]
      const behaviors = ["Hunting", "Feeding", "Resting", "Patrolling", "Mating Call"]
      const confidenceScores = [85, 92, 78, 96, 88]

      const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)]
      const randomBehavior = behaviors[Math.floor(Math.random() * behaviors.length)]
      const randomConfidence = confidenceScores[Math.floor(Math.random() * confidenceScores.length)]

      setPrediction({
        emotion: randomEmotion,
        behavior: randomBehavior,
        confidence: randomConfidence,
        threatLevel:
          randomEmotion === "Aggressive" || randomEmotion === "Distressed"
            ? "High"
            : randomEmotion === "Alert"
              ? "Medium"
              : "Low",
      })

      setIsAnalyzing(false)
      setIsPlaying(false)
    }, 3000)
  }

  const handleUserAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      setUserAudioFile(file)
      setUserAudioName(file.name)
      setSelectedAnimal("") // Clear predefined selection
      setPrediction(null) // Clear previous prediction
    }
  }

  const getThreatColor = (level: string) => {
    switch (level) {
      case "High":
        return "text-red-600 bg-red-50 border-red-200"
      case "Medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "Low":
        return "text-green-600 bg-green-50 border-green-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Animal Audio Detection & Emotion Prediction</h1>
          <p className="text-gray-600 mt-2">AI-powered wildlife behavior analysis using CNN models</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Audio Selection and Playback */}
          <Card>
            <CardHeader>
              <CardTitle>Audio Analysis</CardTitle>
              <CardDescription>
                Select an animal sound or upload your own to analyze behavior and emotional state
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Predefined Audio Section */}
              <div className="space-y-4 border-b pb-4">
                <h3 className="text-lg font-semibold">Predefined Animal Sounds</h3>
                <div>
                  <label className="text-sm font-medium mb-2 block">Select Animal</label>
                  <Select
                    value={selectedAnimal}
                    onValueChange={(value) => {
                      setSelectedAnimal(value)
                      setUserAudioFile(null) // Clear user audio when predefined is selected
                      setUserAudioName(null)
                      setPrediction(null)
                    }}
                  >
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

                <div className="flex items-center gap-4">
                  <Button
                    onClick={() => handlePlayAudio(false)}
                    disabled={!selectedAnimal || isPlaying || isAnalyzing}
                    className="flex items-center gap-2"
                  >
                    {isAnalyzing && analysisSource === "predefined"
                      ? "Analyzing..."
                      : isPlaying && analysisSource === "predefined"
                        ? "Playing"
                        : "Play & Analyze"}
                    {isPlaying && analysisSource === "predefined" ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                  <Volume2 className="h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* User Audio Upload Section */}
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-semibold">Upload Your Own Audio</h3>
                <div>
                  <label htmlFor="audio-upload" className="text-sm font-medium mb-2 block">
                    Upload Audio File (e.g., .mp3, .wav)
                  </label>
                  <Input
                    id="audio-upload"
                    type="file"
                    accept="audio/*"
                    onChange={handleUserAudioUpload}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                  />
                  {userAudioName && <p className="text-sm text-gray-600 mt-2">Selected: {userAudioName}</p>}
                </div>
                <Button
                  onClick={() => handlePlayAudio(true)}
                  disabled={!userAudioFile || isPlaying || isAnalyzing}
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
                >
                  {isAnalyzing && analysisSource === "user"
                    ? "Analyzing..."
                    : isPlaying && analysisSource === "user"
                      ? "Playing"
                      : "Analyze Uploaded Audio"}
                  <Upload className="h-4 w-4" />
                </Button>
              </div>

              {isAnalyzing && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Processing audio with CNN model...</p>
                  <Progress value={66} className="w-full" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Prediction Results */}
          <Card>
            <CardHeader>
              <CardTitle>AI Prediction Results</CardTitle>
              <CardDescription>Real-time emotion and behavior analysis</CardDescription>
            </CardHeader>
            <CardContent>
              {prediction ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Detected Emotion</label>
                      <p className="text-lg font-semibold">{prediction.emotion}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Behavior</label>
                      <p className="text-lg font-semibold">{prediction.behavior}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Confidence Score</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Progress value={prediction.confidence} className="flex-1" />
                      <span className="text-sm font-medium">{prediction.confidence}%</span>
                    </div>
                  </div>

                  <div className={`p-3 rounded-lg border ${getThreatColor(prediction.threatLevel)}`}>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="font-medium">Threat Level: {prediction.threatLevel}</span>
                    </div>
                    {prediction.threatLevel === "High" && (
                      <p className="text-sm mt-1">
                        ⚠️ High-risk behavior detected. Alert forest rangers and nearby travelers.
                      </p>
                    )}
                  </div>
                  {analysisSource && (
                    <p className="text-xs text-gray-500 mt-4">
                      Analysis performed on{" "}
                      {analysisSource === "user" ? "user-uploaded audio" : "predefined animal sound"}.
                    </p>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Volume2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select an animal or upload audio to see AI predictions</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Detections */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Audio Detections</CardTitle>
            <CardDescription>Latest wildlife audio analysis results from field sensors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { animal: "Tiger", emotion: "Aggressive", location: "Sector 7", time: "5 min ago", threat: "High" },
                {
                  animal: "Elephant",
                  emotion: "Alert",
                  location: "Highway KM 12",
                  time: "12 min ago",
                  threat: "Medium",
                },
                {
                  animal: "Leopard",
                  emotion: "Calm",
                  location: "Gopalaswamy Hills",
                  time: "25 min ago",
                  threat: "Low",
                },
                {
                  animal: "Wild Boar",
                  emotion: "Territorial",
                  location: "Buffer Zone 3",
                  time: "1 hour ago",
                  threat: "Medium",
                },
              ].map((detection, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-medium">{detection.animal}</p>
                      <p className="text-sm text-gray-600">{detection.location}</p>
                    </div>
                    <Badge variant="outline">{detection.emotion}</Badge>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        detection.threat === "High"
                          ? "destructive"
                          : detection.threat === "Medium"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {detection.threat}
                    </Badge>
                    <p className="text-sm text-gray-500 mt-1">{detection.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
