"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Filter } from "lucide-react"

export function HistoryLogs() {
  const logs = [
    {
      id: 1,
      animal: "Tiger",
      behavior: "Aggressive",
      time: "2024-01-15 14:30:22",
      location: "Sector 7, Bandipur",
      conflictScore: 95,
      alertStatus: "Sent",
      officer: "Ranger Kumar",
    },
    {
      id: 2,
      animal: "Elephant Herd",
      behavior: "Alert",
      time: "2024-01-15 12:15:10",
      location: "Sector 3, Bandipur",
      conflictScore: 78,
      alertStatus: "Sent",
      officer: "Ranger Priya",
    },
    {
      id: 3,
      animal: "Leopard",
      behavior: "Territorial",
      time: "2024-01-15 09:45:33",
      location: "Sector 5, Bandipur",
      conflictScore: 82,
      alertStatus: "Sent",
      officer: "Ranger Suresh",
    },
    {
      id: 4,
      animal: "Wild Boar",
      behavior: "Feeding",
      time: "2024-01-15 08:20:15",
      location: "Sector 2, Bandipur",
      conflictScore: 45,
      alertStatus: "Monitored",
      officer: "Ranger Lakshmi",
    },
    {
      id: 5,
      animal: "Peacock",
      behavior: "Calm",
      time: "2024-01-15 07:10:08",
      location: "Sector 1, Bandipur",
      conflictScore: 15,
      alertStatus: "Logged",
      officer: "Ranger Kumar",
    },
  ]

  const getScoreColor = (score: number) => {
    if (score >= 80) return "destructive"
    if (score >= 60) return "default"
    return "secondary"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Sent":
        return "destructive"
      case "Monitored":
        return "default"
      case "Logged":
        return "secondary"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Detection History & Logs</CardTitle>
              <CardDescription>Complete record of wildlife detections and conflict alerts</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Animal</TableHead>
                  <TableHead>Behavior</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Conflict Score</TableHead>
                  <TableHead>Alert Status</TableHead>
                  <TableHead>Officer</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">{log.animal}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{log.behavior}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{log.time}</TableCell>
                    <TableCell>{log.location}</TableCell>
                    <TableCell>
                      <Badge variant={getScoreColor(log.conflictScore) as any}>{log.conflictScore}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(log.alertStatus) as any}>{log.alertStatus}</Badge>
                    </TableCell>
                    <TableCell>{log.officer}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Today's Detections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">24</div>
            <p className="text-sm text-gray-600">+3 from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">High Risk Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">3</div>
            <p className="text-sm text-gray-600">Requires immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Rangers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">8</div>
            <p className="text-sm text-gray-600">On duty in reserve</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
