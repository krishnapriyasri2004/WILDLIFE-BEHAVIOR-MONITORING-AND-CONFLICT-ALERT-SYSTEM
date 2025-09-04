"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Chrome, Shield } from "lucide-react"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleGoogleLogin = () => {
    setIsLoading(true)
    // Simulate login process
    setTimeout(() => {
      router.push("/dashboard") // Redirect to the dashboard page
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 bg-green-600 rounded-full flex items-center justify-center">
              <Shield className="text-white" width={40} height={40} />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">Wildlife Monitoring System</CardTitle>
              <CardDescription className="text-gray-600 mt-2">Bandipur Reserve - Mysore Route</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Authorized access for Forest Range Officers and Registered Travelers
              </p>
            </div>

            <Button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
              size="lg"
            >
              <Chrome className="mr-2 h-5 w-5" />
              {isLoading ? "Authenticating..." : "Sign in with Google"}
            </Button>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                By signing in, you agree to the Forest Department's terms of service
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-xs text-amber-800">
                <strong>Emergency Contact:</strong> Forest Range Office - +91-8212-252026
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
