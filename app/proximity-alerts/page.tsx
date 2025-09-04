"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MapPin, AlertTriangle, Navigation, Phone } from "lucide-react"

export default function ProximityAlertsPage() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [alerts, setAlerts] = useState<any[]>([])

  // Simulated animal locations in Bandipur area
  const animalLocations = [
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

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        () => {
          // Fallback to Bandipur center coordinates
          setUserLocation({ lat: 11.6854, lng: 76.5512 })
        },
      )
    } else {
      setUserLocation({ lat: 11.6854, lng: 76.5512 })
    }
  }

  useEffect(() => {
    getCurrentLocation()

    // Check for proximity alerts
    const checkAlerts = () => {
      const highRiskAnimals = animalLocations.filter(
        (animal) => animal.distance < 2.0 && (animal.behavior === "Aggressive" || animal.behavior === "Territorial"),
      )
      setAlerts(highRiskAnimals)
    }

    checkAlerts()
    const interval = setInterval(checkAlerts, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const sendEmergencyAlert = (animal: any) => {
    // Simulate sending SMS/Email alert
    alert(
      `Emergency alert sent to Forest Rangers!\n\nAnimal: ${animal.animal}\nLocation: ${animal.distance}km from your position\nBehavior: ${animal.behavior}`,
    )
  }

  const getThreatLevel = (distance: number, behavior: string) => {
    if (distance < 1.0 && (behavior === "Aggressive" || behavior === "Territorial")) return "Critical"
    if (distance < 2.0 && behavior === "Aggressive") return "High"
    if (distance < 1.5) return "Medium"
    return "Low"
  }

  const getThreatColor = (level: string) => {
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Proximity Alert System</h1>
          <p className="text-gray-600 mt-2">Real-time wildlife proximity monitoring and conflict prevention</p>
        </div>

        {/* Critical Alerts */}
        {alerts.length > 0 && (
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>Wildlife Conflict Alert!</strong> {alerts.length} high-risk animal(s) detected within 2km of your
              location.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Your Current Location
              </CardTitle>
              <CardDescription>GPS coordinates and nearby wildlife activity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {userLocation ? (
                <div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800 mb-2">
                      <strong>Coordinates:</strong> {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                    </p>
                    <p className="text-sm text-blue-800">
                      <strong>Area:</strong> Bandipur Tiger Reserve - Buffer Zone
                    </p>
                  </div>

                  <Button onClick={getCurrentLocation} variant="outline" className="w-full bg-transparent">
                    <Navigation className="h-4 w-4 mr-2" />
                    Update Location
                  </Button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <Button onClick={getCurrentLocation}>
                    <MapPin className="h-4 w-4 mr-2" />
                    Get Current Location
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Interactive Map Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Bandipur Reserve Map</CardTitle>
              <CardDescription>Wildlife locations and safe zones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-green-100 h-64 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-green-300"></div>
                <div className="relative z-10 text-center">
                  <MapPin className="h-8 w-8 mx-auto mb-2 text-green-700" />
                  <p className="text-green-800 font-medium">Interactive Map</p>
                  <p className="text-sm text-green-700">Bandipur Tiger Reserve</p>
                </div>

                {/* Simulated animal markers */}
                <div className="absolute top-4 left-4 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <div className="absolute top-12 right-8 w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                <div className="absolute bottom-8 left-12 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                <div className="absolute bottom-4 right-4 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Nearby Wildlife */}
        <Card>
          <CardHeader>
            <CardTitle>Nearby Wildlife Activity</CardTitle>
            <CardDescription>Animals detected within 5km radius of your location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {animalLocations.map((animal) => {
                const threatLevel = getThreatLevel(animal.distance, animal.behavior)
                return (
                  <div key={animal.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl">
                          {animal.animal === "Tiger"
                            ? "🐅"
                            : animal.animal === "Elephant Herd"
                              ? "🐘"
                              : animal.animal === "Leopard"
                                ? "🐆"
                                : animal.animal === "Wild Boar"
                                  ? "🐗"
                                  : "🐻"}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold">{animal.animal}</h4>
                        <p className="text-sm text-gray-600">
                          {animal.distance}km away • {animal.lastSeen}
                        </p>
                        <p className="text-sm">Behavior: {animal.behavior}</p>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <Badge className={getThreatColor(threatLevel)}>{threatLevel}</Badge>
                      {(threatLevel === "Critical" || threatLevel === "High") && (
                        <div className="flex gap-2">
                          <Button size="sm" variant="destructive" onClick={() => sendEmergencyAlert(animal)}>
                            <Phone className="h-3 w-3 mr-1" />
                            Alert
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Safety Guidelines */}
        <Card className="bg-amber-50 border-amber-200">
          <CardHeader>
            <CardTitle className="text-amber-800">Safety Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-amber-800">
              <div>
                <h4 className="font-semibold mb-2">If you encounter wildlife:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Do not run or make sudden movements</li>
                  <li>Back away slowly while facing the animal</li>
                  <li>Make yourself appear larger</li>
                  <li>Do not make direct eye contact</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Emergency contacts:</h4>
                <ul className="space-y-1">
                  <li>
                    <strong>Forest Range Office:</strong> +91-8212-252026
                  </li>
                  <li>
                    <strong>Wildlife Emergency:</strong> +91-9448-123456
                  </li>
                  <li>
                    <strong>Medical Emergency:</strong> 108
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
