"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, MapPin, Activity, Shield } from "lucide-react"

export default function DashboardPage() {
  const stats = [
    {
      title: "Active Alerts",
      value: "3",
      description: "High priority wildlife conflicts",
      icon: AlertTriangle,
      color: "text-red-600",
    },
    {
      title: "Animals Detected",
      value: "127",
      description: "In the last 24 hours",
      icon: Activity,
      color: "text-green-600",
    },
    {
      title: "Safe Zones",
      value: "15",
      description: "Currently monitored areas",
      icon: Shield,
      color: "text-blue-600",
    },
    {
      title: "Active Travelers",
      value: "42",
      description: "Currently in reserve area",
      icon: MapPin,
      color: "text-purple-600",
    },
  ]

  const recentAlerts = [
    {
      id: 1,
      animal: "Tiger",
      location: "Bandipur Core Zone - Sector 7",
      behavior: "Aggressive",
      time: "2 minutes ago",
      severity: "High",
    },
    {
      id: 2,
      animal: "Elephant Herd",
      location: "Mysore-Ooty Highway - KM 15",
      behavior: "Crossing Road",
      time: "15 minutes ago",
      severity: "Medium",
    },
    {
      id: 3,
      animal: "Leopard",
      location: "Gopalaswamy Hills Trail",
      behavior: "Alert",
      time: "1 hour ago",
      severity: "Low",
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Wildlife Monitoring Dashboard</h1>
          <p className="text-gray-600 mt-2">Bandipur Tiger Reserve - Real-time Monitoring System</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-600 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Recent Wildlife Alerts
            </CardTitle>
            <CardDescription>Latest wildlife activity and conflict warnings in the reserve area</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{alert.animal}</h4>
                      <Badge
                        variant={
                          alert.severity === "High"
                            ? "destructive"
                            : alert.severity === "Medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{alert.location}</p>
                    <p className="text-sm font-medium">Behavior: {alert.behavior}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card className="bg-red-50 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-800">Emergency Protocols</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong className="text-red-800">Forest Range Office:</strong>
                <p>+91-8212-252026</p>
              </div>
              <div>
                <strong className="text-red-800">Wildlife Emergency:</strong>
                <p>+91-9448-123456</p>
              </div>
              <div>
                <strong className="text-red-800">Medical Emergency:</strong>
                <p>108 (Ambulance)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
