import { Component, type OnInit } from "@angular/core"

@Component({
  selector: "app-proximity-alerts",
  templateUrl: "./proximity-alerts.component.html",
  styleUrls: ["./proximity-alerts.component.css"],
})
export class ProximityAlertsComponent implements OnInit {
  userLocation: { lat: number; lng: number } | null = null
  alerts: any[] = []

  // Simulated animal locations in Bandipur area
  animalLocations = [
    {
      id: 1,
      animal: "Tiger",
      lat: 11.6854,
      lng: 76.5512,
      behavior: "Aggressive",
      lastSeen: "2 min ago",
      distance: 0.8,
    },
    {
      id: 2,
      animal: "Elephant Herd",
      lat: 11.6901,
      lng: 76.5489,
      behavior: "Crossing Road",
      lastSeen: "15 min ago",
      distance: 1.2,
    },
    { id: 3, animal: "Leopard", lat: 11.6823, lng: 76.5534, behavior: "Alert", lastSeen: "45 min ago", distance: 2.1 },
    {
      id: 4,
      animal: "Wild Boar",
      lat: 11.6889,
      lng: 76.5467,
      behavior: "Feeding",
      lastSeen: "1 hour ago",
      distance: 1.8,
    },
    {
      id: 5,
      animal: "Sloth Bear",
      lat: 11.6812,
      lng: 76.5523,
      behavior: "Territorial",
      lastSeen: "2 hours ago",
      distance: 3.2,
    },
  ]

  ngOnInit(): void {
    this.getCurrentLocation()
    this.checkAlerts()
    setInterval(() => this.checkAlerts(), 30000) // Check every 30 seconds
  }

  getCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
        },
        () => {
          // Fallback to Bandipur center coordinates
          this.userLocation = { lat: 11.6854, lng: 76.5512 }
        },
      )
    } else {
      this.userLocation = { lat: 11.6854, lng: 76.5512 }
    }
  }

  checkAlerts(): void {
    const highRiskAnimals = this.animalLocations.filter(
      (animal) => animal.distance < 2.0 && (animal.behavior === "Aggressive" || animal.behavior === "Territorial"),
    )
    this.alerts = highRiskAnimals
  }

  sendEmergencyAlert(animal: any): void {
    // Simulate sending SMS/Email alert
    alert(
      `Emergency alert sent to Forest Rangers!\n\nAnimal: ${animal.animal}\nLocation: ${animal.distance}km from your position\nBehavior: ${animal.behavior}`,
    )
  }

  getThreatLevel(distance: number, behavior: string): string {
    if (distance < 1.0 && (behavior === "Aggressive" || behavior === "Territorial")) return "Critical"
    if (distance < 2.0 && behavior === "Aggressive") return "High"
    if (distance < 1.5) return "Medium"
    return "Low"
  }

  getThreatColorClass(level: string): string {
    switch (level) {
      case "Critical":
        return "bg-red-600 text-white"
      case "High":
        return "bg-red-500 text-white"
      case "Medium":
        return "bg-yellow-500 text-white"
      case "Low":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  getBadgeColor(level: string): string {
    switch (level) {
      case "Critical":
      case "High":
        return "warn"
      case "Medium":
        return "accent"
      case "Low":
        return "primary"
      default:
        return ""
    }
  }

  getAnimalEmoji(animalName: string): string {
    switch (animalName) {
      case "Tiger":
        return "🐅"
      case "Elephant Herd":
        return "🐘"
      case "Leopard":
        return "🐆"
      case "Wild Boar":
        return "🐗"
      case "Sloth Bear":
        return "🐻"
      default:
        return "🐾"
    }
  }
}
