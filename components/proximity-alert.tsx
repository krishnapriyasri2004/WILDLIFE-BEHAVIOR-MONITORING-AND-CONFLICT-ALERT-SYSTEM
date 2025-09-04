"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { MapPin, AlertTriangle, Navigation } from "lucide-react"

export function ProximityAlert() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [nearbyAnimals, setNearbyAnimals] = useState<any[]>([])

  const animalLocations = [
    { id: 1, animal: "Tiger", lat: 11.6854, lng: 76.132, behavior: "Aggressive", distance: 0.8 },
    { id: 2, animal: "Elephant Herd", lat: 11.689, lng: 76.135, behavior: "Alert", distance: 1.2 },
    { id: 3, animal: "Leopard", lat: 11.682, lng: 76.128, behavior: "Territorial", distance: 2.1 },
    { id: 4, animal: "Wild Boar", lat: 11.69, lng: 76.14, behavior: "Feeding", distance: 0.5 },
  ]

  const setCurrentLocation = () => {
    // Simulate getting user location (Bandipur area)
    const location = { lat: 11.6844, lng: 76.131 }
    setUserLocation(location)

    // Filter nearby animals within 3km
    const nearby = animalLocations.filter((animal) => animal.distance <= 3)
    setNearbyAnimals(nearby)
  }

  const getRiskLevel = (distance: number, behavior: string) => {
    if (distance < 1 && (behavior === "Aggressive" || behavior === "Territorial")) {
      return "Critical"
    } else if (distance < 2 && behavior === "Alert") {
      return "High"
    } else {
      return "Medium"
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Critical":
        return "destructive"
      case "High":
        return "destructive"
      case "Medium":
        return "default"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>Proximity Alert System</span>
          </CardTitle>
          <CardDescription>Monitor wildlife proximity to prevent human-animal conflicts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Your Location</p>
              <p className="text-sm text-gray-600">
                {userLocation ? `${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}` : "Location not set"}
              </p>
            </div>
            <Button onClick={setCurrentLocation} className="bg-blue-600 hover:bg-blue-700">
              <Navigation className="w-4 h-4 mr-2" />
              Set Current Location
            </Button>
          </div>

          {userLocation && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-blue-800 font-medium">Location Set: Bandipur Reserve Area</p>
              <p className="text-blue-700 text-sm">Scanning for nearby wildlife...</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Interactive Map Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Bandipur Reserve Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-green-100 h-64 rounded-lg border-2 border-dashed border-green-300 flex items-center justify-center relative overflow-hidden">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-green-600 mx-auto mb-2" />
              <p className="text-green-800 font-medium">Interactive Map View</p>
              <p className="text-green-600 text-sm">Mysore-Bandipur Reserve Area</p>
            </div>

            {/* Simulated map markers */}
            {userLocation && (
              <>
                <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-blue-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
                <div className="absolute top-1/3 left-1/3 w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                <div className="absolute top-2/3 right-1/3 w-3 h-3 bg-orange-600 rounded-full animate-pulse"></div>
                <div className="absolute bottom-1/4 left-2/3 w-3 h-3 bg-yellow-600 rounded-full animate-pulse"></div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {nearbyAnimals.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-orange-600">Nearby Wildlife Detected</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {nearbyAnimals.map((animal) => {
              const riskLevel = getRiskLevel(animal.distance, animal.behavior)
              return (
                <Alert
                  key={animal.id}
                  className={`${riskLevel === "Critical" ? "border-red-200 bg-red-50" : "border-orange-200 bg-orange-50"}`}
                >
                  <AlertTriangle
                    className={`h-4 w-4 ${riskLevel === "Critical" ? "text-red-600" : "text-orange-600"}`}
                  />
                  <AlertDescription>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className={`font-bold ${riskLevel === "Critical" ? "text-red-800" : "text-orange-800"}`}>
                          {animal.animal} - {animal.behavior}
                        </p>
                        <p className={`${riskLevel === "Critical" ? "text-red-700" : "text-orange-700"}`}>
                          Distance: {animal.distance} km
                        </p>
                        <div className="flex space-x-2 mt-2">
                          <Badge variant={getRiskColor(riskLevel) as any}>Risk: {riskLevel}</Badge>
                          <Badge variant="outline">{animal.behavior}</Badge>
                        </div>
                      </div>
                      {riskLevel === "Critical" && (
                        <Button size="sm" variant="destructive">
                          Emergency Alert
                        </Button>
                      )}
                    </div>
                  </AlertDescription>
                </Alert>
              )
            })}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Safety Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <h4 className="font-bold text-red-800 mb-2">Critical Risk (&lt; 1km)</h4>
              <ul className="text-red-700 text-sm space-y-1">
                <li>• Stop movement immediately</li>
                <li>• Alert forest rangers</li>
                <li>• Find secure shelter</li>
                <li>• Avoid direct eye contact</li>
              </ul>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h4 className="font-bold text-orange-800 mb-2">High Risk (1-2km)</h4>
              <ul className="text-orange-700 text-sm space-y-1">
                <li>• Proceed with extreme caution</li>
                <li>• Make noise to announce presence</li>
                <li>• Stay in groups</li>
                <li>• Keep emergency contacts ready</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
