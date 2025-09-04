import { Component } from "@angular/core"
import type { Router } from "@angular/router"

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent {
  isSidebarOpen = true // For mobile toggle

  navigation = [
    { name: "Dashboard Overview", route: "/dashboard/overview", icon: "dashboard" },
    { name: "Animal Detection", route: "/dashboard/animal-detection", icon: "search" },
    { name: "Detection System", route: "/dashboard/detection-system", icon: "radio" },
    { name: "Proximity Alerts", route: "/dashboard/proximity-alerts", icon: "location_on" },
    { name: "History & Logs", route: "/dashboard/history-logs", icon: "history" },
  ]

  constructor(public router: Router) {}

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen
  }

  isActive(route: string): boolean {
    return this.router.url === route
  }
}
