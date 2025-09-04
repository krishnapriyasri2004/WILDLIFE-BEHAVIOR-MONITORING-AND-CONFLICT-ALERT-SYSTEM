import { Component, type OnInit } from "@angular/core"

@Component({
  selector: "app-history-logs",
  templateUrl: "./history-logs.component.html",
  styleUrls: ["./history-logs.component.css"],
})
export class HistoryLogsComponent implements OnInit {
  searchTerm = ""
  filterAnimal = "all"
  filterThreat = "all"

  historyData = [
    {
      id: 1,
      timestamp: "2024-01-15 14:32:15",
      animal: "Tiger",
      behavior: "Aggressive",
      location: "Bandipur Core Zone - Sector 7",
      conflictScore: 95,
      alertStatus: "Sent",
      responseTime: "2 min",
      outcome: "Rangers Dispatched",
    },
    {
      id: 2,
      timestamp: "2024-01-15 14:15:42",
      animal: "Elephant Herd",
      behavior: "Road Crossing",
      location: "Mysore-Ooty Highway - KM 15",
      conflictScore: 78,
      alertStatus: "Sent",
      responseTime: "5 min",
      outcome: "Traffic Diverted",
    },
    {
      id: 3,
      timestamp: "2024-01-15 13:58:33",
      animal: "Leopard",
      behavior: "Hunting",
      location: "Buffer Zone 2 - Near Village",
      conflictScore: 88,
      alertStatus: "Sent",
      responseTime: "3 min",
      outcome: "Area Secured",
    },
    {
      id: 4,
      timestamp: "2024-01-15 13:42:18",
      animal: "Wild Boar",
      behavior: "Territorial",
      location: "Agricultural Border - Zone 3",
      conflictScore: 65,
      alertStatus: "Sent",
      responseTime: "8 min",
      outcome: "Farmers Notified",
    },
    {
      id: 5,
      timestamp: "2024-01-15 13:28:07",
      animal: "Sloth Bear",
      behavior: "Foraging",
      location: "Gopalaswamy Hills Trail",
      conflictScore: 72,
      alertStatus: "Sent",
      responseTime: "6 min",
      outcome: "Trail Closed",
    },
    {
      id: 6,
      timestamp: "2024-01-15 12:45:22",
      animal: "Peacock",
      behavior: "Mating Call",
      location: "Tourist Zone - Viewpoint 1",
      conflictScore: 25,
      alertStatus: "None",
      responseTime: "-",
      outcome: "Monitoring Only",
    },
    {
      id: 7,
      timestamp: "2024-01-15 12:15:55",
      animal: "Spotted Deer",
      behavior: "Alarm Call",
      location: "Water Hole 4",
      conflictScore: 45,
      alertStatus: "None",
      responseTime: "-",
      outcome: "Predator Nearby",
    },
    {
      id: 8,
      timestamp: "2024-01-15 11:58:41",
      animal: "Tiger",
      behavior: "Territorial Marking",
      location: "Core Zone - Sector 12",
      conflictScore: 82,
      alertStatus: "Sent",
      responseTime: "4 min",
      outcome: "Area Monitored",
    },
  ]

  filteredData: any[] = []
  displayedColumns: string[] = [
    "timestamp",
    "animal",
    "behavior",
    "location",
    "conflictScore",
    "alertStatus",
    "responseTime",
    "outcome",
  ]

  ngOnInit(): void {
    this.applyFilters()
  }

  applyFilters(): void {
    this.filteredData = this.historyData.filter((item) => {
      const matchesSearch =
        item.animal.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.behavior.toLowerCase().includes(this.searchTerm.toLowerCase())

      const matchesAnimal =
        this.filterAnimal === "all" || item.animal.toLowerCase().includes(this.filterAnimal.toLowerCase())

      const matchesThreat =
        this.filterThreat === "all" ||
        (this.filterThreat === "high" && item.conflictScore >= 80) ||
        (this.filterThreat === "medium" && item.conflictScore >= 60 && item.conflictScore < 80) ||
        (this.filterThreat === "low" && item.conflictScore < 60)

      return matchesSearch && matchesAnimal && matchesThreat
    })
  }

  getConflictScoreColor(score: number): string {
    if (score >= 80) return "warn"
    if (score >= 60) return "accent"
    return "primary"
  }

  getAlertStatusColor(status: string): string {
    return status === "Sent" ? "primary" : "basic"
  }

  exportData(): void {
    const csvContent = [
      ["Timestamp", "Animal", "Behavior", "Location", "Conflict Score", "Alert Status", "Response Time", "Outcome"],
      ...this.filteredData.map((item) => [
        item.timestamp,
        item.animal,
        item.behavior,
        item.location,
        item.conflictScore,
        item.alertStatus,
        item.responseTime,
        item.outcome,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "wildlife_detection_history.csv"
    a.click()
  }
}
