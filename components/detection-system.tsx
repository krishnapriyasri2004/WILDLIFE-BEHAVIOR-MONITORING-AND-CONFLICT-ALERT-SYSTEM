"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Radio, AlertTriangle, Phone, Mail, MapPin } from "lucide-react"

export function DetectionSystem() {
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [alerts, setAlerts] = useState<any[]>([])

  const startMonitoring = () => {
    setIsMonitoring(true)

    // Simulate detection after 3 seconds
    setTimeout(() => {
      const newAlert = {
        id: Date.now(),
        animal: "Tiger",
        emotion: "Aggressive",
        location: "Sector 7, Bandipur",
        time: new Date().toLocaleTimeString(),
        threatLevel: "High",
        coordinates: { lat: 11.6854, lng: 76.132 },
      }
      setAlerts((prev) => [newAlert, ...prev])
    }, 3000)
  }

  const stopMonitoring = () => {
    setIsMonitoring(false)
  }

  const sendAlert = (type: "sms" | "email") => {
    // Simulate sending alert
    alert(`${type.toUpperCase()} alert sent to forest rangers and nearby personnel!`)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Radio className="w-5 h-5" />
            <span>Real-time Detection System</span>
          </CardTitle>
          <CardDescription>Monitor live audio feeds from sensors across Bandipur Reserve</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">System Status</p>
              <p className="text-sm text-gray-600">{isMonitoring ? "Actively monitoring 24 sensors" : "System idle"}</p>
            </div>
            <div className="flex space-x-2">
              {!isMonitoring ? (
                <Button onClick={startMonitoring} className="bg-green-600 hover:bg-green-700">
                  Start Monitoring
                </Button>
              ) : (
                <Button onClick={stopMonitoring} variant="destructive">
                  Stop Monitoring
                </Button>
              )}
            </div>
          </div>

          {isMonitoring && (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-800 font-medium">Live Monitoring Active</span>
              </div>
              <p className="text-green-700 text-sm mt-1">Scanning audio patterns from sensors in real-time...</p>
            </div>
          )}
        </CardContent>
      </Card>

      {alerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Active Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {alerts.map((alert) => (
              <Alert key={alert.id} className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-red-800">
                        {alert.animal} Detected - {alert.emotion} Behavior
                      </p>
                      <p className="text-red-700">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        {alert.location} at {alert.time}
                      </p>
                      <Badge variant="destructive" className="mt-2">
                        Threat Level: {alert.threatLevel}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => sendAlert("sms")}>
                        <Phone className="w-4 h-4 mr-1" />
                        SMS Alert
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => sendAlert("email")}>
                        <Mail className="w-4 h-4 mr-1" />
                        Email Alert
                      </Button>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Sensor Network Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { sector: "Sector 1", status: "Online", count: 6 },
              { sector: "Sector 2", status: "Online", count: 8 },
              { sector: "Sector 3", status: "Maintenance", count: 4 },
              { sector: "Sector 4", status: "Online", count: 6 },
            ].map((sensor) => (
              <div key={sensor.sector} className="text-center p-3 border rounded-lg">
                <p className="font-medium">{sensor.sector}</p>
                <p className="text-sm text-gray-600">{sensor.count} sensors</p>
                <Badge variant={sensor.status === "Online" ? "default" : "secondary"} className="mt-1">
                  {sensor.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
