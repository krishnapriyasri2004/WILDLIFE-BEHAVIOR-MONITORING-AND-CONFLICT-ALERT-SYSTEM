"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, MapPin } from "lucide-react"

interface LoginPageProps {
  onLogin: () => void
}

export function LoginPage({ onLogin }: LoginPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-800">Wildlife Protection System</CardTitle>
          <CardDescription className="text-green-600">Mysore-Bandipur Reserve Area</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center text-sm text-gray-600 mb-6">
            <MapPin className="w-4 h-4 inline mr-1" />
            Authorized Personnel Only
          </div>
          <Button onClick={onLogin} className="w-full bg-green-600 hover:bg-green-700" size="lg">
            Sign in with Google
          </Button>
          <p className="text-xs text-center text-gray-500 mt-4">For Forest Range Officers and Authorized Personnel</p>
        </CardContent>
      </Card>
    </div>
  )
}
