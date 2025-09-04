import { Component } from "@angular/core"
import type { Router } from "@angular/router"

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  isLoading = false

  constructor(private router: Router) {}

  handleGoogleLogin(): void {
    this.isLoading = true
    // Simulate login process
    setTimeout(() => {
      this.router.navigate(["/dashboard/overview"]) // Navigate to dashboard overview
      this.isLoading = false
    }, 2000)
  }
}
