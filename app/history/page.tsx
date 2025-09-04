"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Search } from "lucide-react"
import { useState } from "react"

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterAnimal, setFilterAnimal] = useState("all")
  const [filterThreat, setFilterThreat] = useState("all")

  const historyData = [
    {
      id: 1,
      timestamp: "2024-01-15 14:32:15",
      animal: "Tiger",
      behavior: "Aggressive",
      location: "Bandipur Core Zone - Sector 7",
      conflictScore: 95,
      alertStatus: "Sent",
      responseTime: "2 min",
      outcome: "Rangers Dispatched",
    },
    {
      id: 2,
      timestamp: "2024-01-15 14:15:42",
      animal: "Elephant Herd",
      behavior: "Road Crossing",
      location: "Mysore-Ooty Highway - KM 15",
      conflictScore: 78,
      alertStatus: "Sent",
      responseTime: "5 min",
      outcome: "Traffic Diverted",
    },
    {
      id: 3,
      timestamp: "2024-01-15 13:58:33",
      animal: "Leopard",
      behavior: "Hunting",
      location: "Buffer Zone 2 - Near Village",
      conflictScore: 88,
      alertStatus: "Sent",
      responseTime: "3 min",
      outcome: "Area Secured",
    },
    {
      id: 4,
      timestamp: "2024-01-15 13:42:18",
      animal: "Wild Boar",
      behavior: "Territorial",
      location: "Agricultural Border - Zone 3",
      conflictScore: 65,
      alertStatus: "Sent",
      responseTime: "8 min",
      outcome: "Farmers Notified",
    },
    {
      id: 5,
      timestamp: "2024-01-15 13:28:07",
      animal: "Sloth Bear",
      behavior: "Foraging",
      location: "Gopalaswamy Hills Trail",
      conflictScore: 72,
      alertStatus: "Sent",
      responseTime: "6 min",
      outcome: "Trail Closed",
    },
    {
      id: 6,
      timestamp: "2024-01-15 12:45:22",
      animal: "Peacock",
      behavior: "Mating Call",
      location: "Tourist Zone - Viewpoint 1",
      conflictScore: 25,
      alertStatus: "None",
      responseTime: "-",
      outcome: "Monitoring Only",
    },
    {
      id: 7,
      timestamp: "2024-01-15 12:15:55",
      animal: "Spotted Deer",
      behavior: "Alarm Call",
      location: "Water Hole 4",
      conflictScore: 45,
      alertStatus: "None",
      responseTime: "-",
      outcome: "Predator Nearby",
    },
    {
      id: 8,
      timestamp: "2024-01-15 11:58:41",
      animal: "Tiger",
      behavior: "Territorial Marking",
      location: "Core Zone - Sector 12",
      conflictScore: 82,
      alertStatus: "Sent",
      responseTime: "4 min",
      outcome: "Area Monitored",
    },
  ]

  const getConflictScoreColor = (score: number) => {
    if (score >= 80) return "text-red-600 bg-red-50"
    if (score >= 60) return "text-yellow-600 bg-yellow-50"
    return "text-green-600 bg-green-50"
  }

  const getAlertStatusColor = (status: string) => {
    return status === "Sent" ? "bg-blue-600 text-white" : "bg-gray-400 text-white"
  }

  const filteredData = historyData.filter((item) => {
    const matchesSearch =
      item.animal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.behavior.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesAnimal = filterAnimal === "all" || item.animal.toLowerCase().includes(filterAnimal.toLowerCase())

    const matchesThreat =
      filterThreat === "all" ||
      (filterThreat === "high" && item.conflictScore >= 80) ||
      (filterThreat === "medium" && item.conflictScore >= 60 && item.conflictScore < 80) ||
      (filterThreat === "low" && item.conflictScore < 60)

    return matchesSearch && matchesAnimal && matchesThreat
  })

  const exportData = () => {
    const csvContent = [
      ["Timestamp", "Animal", "Behavior", "Location", "Conflict Score", "Alert Status", "Response Time", "Outcome"],
      ...filteredData.map((item) => [
        item.timestamp,
        item.animal,
        item.behavior,
        item.location,
        item.conflictScore,
        item.alertStatus,
        item.responseTime,
        item.outcome,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "wildlife_detection_history.csv"
    a.click()
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Detection History & Logs</h1>
          <p className="text-gray-600 mt-2">
            Complete record of wildlife detections and conflict prevention activities
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">156</div>
              <p className="text-sm text-gray-600">Total Detections</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-600">23</div>
              <p className="text-sm text-gray-600">High-Risk Alerts</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">98%</div>
              <p className="text-sm text-gray-600">Response Rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">4.2 min</div>
              <p className="text-sm text-gray-600">Avg Response Time</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>Filter & Search</CardTitle>
            <CardDescription>
              Filter detection records by animal type, threat level, or search specific incidents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by animal, location, or behavior..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterAnimal} onValueChange={setFilterAnimal}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by Animal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Animals</SelectItem>
                  <SelectItem value="tiger">Tiger</SelectItem>
                  <SelectItem value="elephant">Elephant</SelectItem>
                  <SelectItem value="leopard">Leopard</SelectItem>
                  <SelectItem value="bear">Bear</SelectItem>
                  <SelectItem value="boar">Wild Boar</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterThreat} onValueChange={setFilterThreat}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by Threat" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Threat Levels</SelectItem>
                  <SelectItem value="high">High (80+)</SelectItem>
                  <SelectItem value="medium">Medium (60-79)</SelectItem>
                  <SelectItem value="low">Low (&lt;60)</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={exportData} variant="outline">
                Export CSV
                <Download className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* History Table */}
        <Card>
          <CardHeader>
            <CardTitle>Detection Records</CardTitle>
            <CardDescription>
              Showing {filteredData.length} of {historyData.length} records
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Animal</TableHead>
                    <TableHead>Behavior</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Conflict Score</TableHead>
                    <TableHead>Alert Status</TableHead>
                    <TableHead>Response Time</TableHead>
                    <TableHead>Outcome</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-mono text-sm">{record.timestamp}</TableCell>
                      <TableCell className="font-medium">{record.animal}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{record.behavior}</Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{record.location}</TableCell>
                      <TableCell>
                        <Badge className={getConflictScoreColor(record.conflictScore)}>{record.conflictScore}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getAlertStatusColor(record.alertStatus)}>{record.alertStatus}</Badge>
                      </TableCell>
                      <TableCell>{record.responseTime}</TableCell>
                      <TableCell className="max-w-xs truncate">{record.outcome}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
