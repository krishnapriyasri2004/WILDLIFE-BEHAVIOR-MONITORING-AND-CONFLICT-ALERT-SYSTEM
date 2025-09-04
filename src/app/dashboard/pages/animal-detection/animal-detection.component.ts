import { Component, type OnInit } from "@angular/core"

@Component({
  selector: "app-animal-detection",
  templateUrl: "./animal-detection.component.html",
  styleUrls: ["./animal-detection.component.css"],
})
export class AnimalDetectionComponent implements OnInit {
  selectedAnimal = ""
  userAudioFile: File | null = null
  userAudioName: string | null = null
  isPlaying = false
  prediction: any = null
  isAnalyzing = false
  analysisSource: "predefined" | "user" | null = null
  progressValue = 0

  animals = [
    { id: "tiger", name: "Tiger", audioFile: "tiger_roar.mp3" },
    { id: "elephant", name: "Elephant", audioFile: "elephant_trumpet.mp3" },
    { id: "leopard", name: "Leopard", audioFile: "leopard_growl.mp3" },
    { id: "peacock", name: "Peacock", audioFile: "peacock_call.mp3" },
    { id: "deer", name: "Spotted Deer", audioFile: "deer_alarm.mp3" },
    { id: "wild_boar", name: "Wild Boar", audioFile: "boar_grunt.mp3" },
  ]

  ngOnInit(): void {
    // Initialize any data if needed
  }

  handlePlayAudio(isUserAudio = false): void {
    if ((!this.selectedAnimal && !isUserAudio) || (!this.userAudioFile && isUserAudio)) {
      return
    }

    this.isPlaying = true
    this.isAnalyzing = true
    this.analysisSource = isUserAudio ? "user" : "predefined"
    this.prediction = null // Clear previous prediction
    this.progressValue = 0

    const interval = setInterval(() => {
      this.progressValue += 10
      if (this.progressValue >= 100) {
        clearInterval(interval)
      }
    }, 300)

    // Simulate audio analysis
    setTimeout(() => {
      const emotions = ["Aggressive", "Alert", "Calm", "Distressed", "Territorial"]
      const behaviors = ["Hunting", "Feeding", "Resting", "Patrolling", "Mating Call"]
      const confidenceScores = [85, 92, 78, 96, 88]

      const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)]
      const randomBehavior = behaviors[Math.floor(Math.random() * behaviors.length)]
      const randomConfidence = confidenceScores[Math.floor(Math.random() * confidenceScores.length)]

      this.prediction = {
        emotion: randomEmotion,
        behavior: randomBehavior,
        confidence: randomConfidence,
        threatLevel:
          randomEmotion === "Aggressive" || randomEmotion === "Distressed"
            ? "High"
            : randomEmotion === "Alert"
              ? "Medium"
              : "Low",
      }

      this.isAnalyzing = false
      this.isPlaying = false
      this.progressValue = 100
    }, 3000)
  }

  handleUserAudioUpload(event: Event): void {
    const input = event.target as HTMLInputElement
    if (input.files && input.files[0]) {
      const file = input.files[0]
      this.userAudioFile = file
      this.userAudioName = file.name
      this.selectedAnimal = "" // Clear predefined selection
      this.prediction = null // Clear previous prediction
    }
  }

  getThreatColor(level: string): string {
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

  getBadgeColor(level: string): string {
    switch (level) {
      case "High":
        return "warn" // Angular Material 'warn' color
      case "Medium":
        return "accent" // Angular Material 'accent' color
      case "Low":
        return "primary" // Angular Material 'primary' color
      default:
        return ""
    }
  }
}
