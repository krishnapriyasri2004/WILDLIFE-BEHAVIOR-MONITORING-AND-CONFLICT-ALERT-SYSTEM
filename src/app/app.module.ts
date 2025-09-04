import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { FormsModule } from "@angular/forms" // For ngModel

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { LoginComponent } from "./login/login.component"
import { DashboardComponent } from "./dashboard/dashboard.component"
import { AnimalDetectionComponent } from "./dashboard/pages/animal-detection/animal-detection.component"
import { DetectionSystemComponent } from "./dashboard/pages/detection-system/detection-system.component"
import { ProximityAlertsComponent } from "./dashboard/pages/proximity-alerts/proximity-alerts.component"
import { HistoryLogsComponent } from "./dashboard/pages/history-logs/history-logs.component"
import { MaterialModule } from "./shared/material.module" // Custom Material Module

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AnimalDetectionComponent,
    DetectionSystemComponent,
    ProximityAlertsComponent,
    HistoryLogsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule, // Import FormsModule
    MaterialModule, // Import your custom Material Module
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
