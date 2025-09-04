import { Component } from "@angular/core"

@Component({
  selector: "app-detection-system",
  templateUrl: "./detection-system.component.html",
  styleUrls: ["./detection-system.component.css"],
})
export class DetectionSystemComponent {
  isMonitoring = false
  detectionActive = false
  currentDetection: any = null
  alertSent = false
  progressValue = 0

  startMonitoring(): void {
    this.isMonitoring = true
    this.detectionActive = true
    this.alertSent = false
    this.currentDetection = null
    this.progressValue = 0

    const interval = setInterval(() => {
      this.progressValue += 20
      if (this.progressValue >= 100) {
        clearInterval(interval)
      }
    }, 1000)

    // Simulate real-time detection
    setTimeout(() => {
      const detections = [
        { animal: "Tiger", confidence: 94, behavior: "Aggressive", threat: "High", location: "Sector 7" },
        { animal: "Elephant", confidence: 87, behavior: "Alert", threat: "Medium", location: "Highway KM 15" },
        { animal: "Leopard", confidence: 91, behavior: "Hunting", threat: "High", location: "Buffer Zone 2" },
        { animal: "Wild Boar", confidence: 78, behavior: "Territorial", threat: "Medium", location: "Trail 3" },
      ]

      const randomDetection = detections[Math.floor(Math.random() * detections.length)]
      this.currentDetection = randomDetection

      if (randomDetection.threat === "High") {
        setTimeout(() => {
          this.alertSent = true
        }, 2000)
      }

      this.isMonitoring = false // Stop monitoring after a detection
      this.progressValue = 100
    }, 5000)
  }

  stopMonitoring(): void {
    this.isMonitoring = false
    this.detectionActive = false
    this.currentDetection = null
    this.alertSent = false
    this.progressValue = 0
  }

  simulateAlert(): void {
    this.alertSent = true
    // Simulate SMS/Email notification
    setTimeout(() => {
      alert(
        "Emergency Alert Sent!\n\n📱 SMS sent to registered travelers\n📧 Email alert to Forest Rangers\n🚨 Nearby patrol units notified",
      )
    }, 1000)
  }

  getThreatColorClass(threat: string): string {
    return threat === "High" ? "border-red-500 bg-red-50" : "border-yellow-500 bg-yellow-50"
  }

  getThreatTextColorClass(threat: string): string {
    return threat === "High" ? "text-red-600" : "text-yellow-600"
  }

  getBadgeColor(threat: string): string {
    return threat === "High" ? "warn" : "accent"
  }
}
