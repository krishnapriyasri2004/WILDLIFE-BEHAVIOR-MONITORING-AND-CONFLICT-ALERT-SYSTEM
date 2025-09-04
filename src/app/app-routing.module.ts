import { NgModule } from "@angular/core"
import { RouterModule, type Routes } from "@angular/router"
import { LoginComponent } from "./login/login.component"
import { DashboardComponent } from "./dashboard/dashboard.component"
import { AnimalDetectionComponent } from "./dashboard/pages/animal-detection/animal-detection.component"
import { DetectionSystemComponent } from "./dashboard/pages/detection-system/detection-system.component"
import { ProximityAlertsComponent } from "./dashboard/pages/proximity-alerts/proximity-alerts.component"
import { HistoryLogsComponent } from "./dashboard/pages/history-logs/history-logs.component"

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    children: [
      { path: "", redirectTo: "overview", pathMatch: "full" }, // Default dashboard view
      { path: "overview", component: AnimalDetectionComponent }, // Using AnimalDetection as default for simplicity
      { path: "animal-detection", component: AnimalDetectionComponent },
      { path: "detection-system", component: DetectionSystemComponent },
      { path: "proximity-alerts", component: ProximityAlertsComponent },
      { path: "history-logs", component: HistoryLogsComponent },
    ],
  },
  { path: "**", redirectTo: "/login" }, // Redirect any unknown paths to login
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
