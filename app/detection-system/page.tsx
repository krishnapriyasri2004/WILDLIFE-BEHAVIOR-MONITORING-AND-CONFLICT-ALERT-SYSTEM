"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mic, MicOff, AlertTriangle, CheckCircle, Radio, MessageSquare } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function DetectionSystemPage() {
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [detectionActive, setDetectionActive] = useState(false)
  const [currentDetection, setCurrentDetection] = useState<any>(null)
  const [alertSent, setAlertSent] = useState(false)

  const startMonitoring = () => {
    setIsMonitoring(true)
    setDetectionActive(true)
    setAlertSent(false)

    // Simulate real-time detection
    setTimeout(() => {
      const detections = [
        { animal: "Tiger", confidence: 94, behavior: "Aggressive", threat: "High", location: "Sector 7" },
        { animal: "Elephant", confidence: 87, behavior: "Alert", threat: "Medium", location: "Highway KM 15" },
        { animal: "Leopard", confidence: 91, behavior: "Hunting", threat: "High", location: "Buffer Zone 2" },
        { animal: "Wild Boar", confidence: 78, behavior: "Territorial", threat: "Medium", location: "Trail 3" },
      ]

      const randomDetection = detections[Math.floor(Math.random() * detections.length)]
      setCurrentDetection(randomDetection)

      if (randomDetection.threat === "High") {
        setTimeout(() => {
          setAlertSent(true)
        }, 2000)
      }

      setIsMonitoring(false) // Stop monitoring after a detection
    }, 5000)
  }

  const stopMonitoring = () => {
    setIsMonitoring(false)
    setDetectionActive(false)
    setCurrentDetection(null)
    setAlertSent(false)
  }

  const simulateAlert = () => {
    setAlertSent(true)
    // Simulate SMS/Email notification
    setTimeout(() => {
      alert(
        "Emergency Alert Sent!\n\n📱 SMS sent to registered travelers\n📧 Email alert to Forest Rangers\n🚨 Nearby patrol units notified",
      )
    }, 1000)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Simulated Detection System</h1>
          <p className="text-gray-600 mt-2">Real-time wildlife audio monitoring and automatic alert system</p>
        </div>

        {/* Detection Control Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Radio className="h-5 w-5" />
              Audio Detection Control
            </CardTitle>
            <CardDescription>Activate real-time wildlife sound detection and monitoring</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Button
                onClick={startMonitoring}
                disabled={detectionActive}
                className={`${detectionActive ? "bg-green-600" : "bg-blue-600"} hover:bg-blue-700`}
              >
                {detectionActive ? "Detection Active" : "Start Detection"}
                <Mic className="h-4 w-4 ml-2" />
              </Button>

              <Button onClick={stopMonitoring} disabled={!detectionActive} variant="destructive">
                Stop Detection
                <MicOff className="h-4 w-4 ml-2" />
              </Button>

              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${detectionActive ? "bg-green-500 animate-pulse" : "bg-gray-300"}`}
                ></div>
                <span className="text-sm text-gray-600">{detectionActive ? "Listening..." : "Inactive"}</span>
              </div>
            </div>

            {isMonitoring && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Processing audio input...</p>
                <Progress value={75} className="w-full" />
                <p className="text-xs text-gray-500">Analyzing frequency patterns and sound signatures</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Current Detection Results */}
        {currentDetection && (
          <Card
            className={`border-2 ${currentDetection.threat === "High" ? "border-red-500 bg-red-50" : "border-yellow-500 bg-yellow-50"}`}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle
                  className={`h-5 w-5 ${currentDetection.threat === "High" ? "text-red-600" : "text-yellow-600"}`}
                />
                Wildlife Detected!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Animal</label>
                  <p className="text-lg font-semibold">{currentDetection.animal}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Behavior</label>
                  <p className="text-lg font-semibold">{currentDetection.behavior}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Confidence</label>
                  <p className="text-lg font-semibold">{currentDetection.confidence}%</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Location</label>
                  <p className="text-lg font-semibold">{currentDetection.location}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Badge
                  className={currentDetection.threat === "High" ? "bg-red-600 text-white" : "bg-yellow-600 text-white"}
                >
                  {currentDetection.threat} Threat Level
                </Badge>

                {currentDetection.threat === "High" && !alertSent && (
                  <Button onClick={simulateAlert} className="bg-red-600 hover:bg-red-700">
                    Send Emergency Alert
                    <MessageSquare className="h-4 w-4 ml-2" />
                  </Button>
                )}

                {alertSent && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">Alert Sent Successfully</span>
                  </div>
                )}
              </div>

              {currentDetection.threat === "High" && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    <strong>High-Risk Situation Detected!</strong> Aggressive wildlife behavior identified. Immediate
                    action required to prevent human-wildlife conflict.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        )}

        {/* Alert Status */}
        {alertSent && (
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Emergency Alert Dispatched
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>SMS alerts sent to 42 registered travelers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Email notifications to Forest Rangers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Patrol units alerted and dispatched</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Detection History */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Detection History</CardTitle>
            <CardDescription>Latest wildlife detections from the monitoring system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  time: "14:32",
                  animal: "Tiger",
                  behavior: "Aggressive",
                  location: "Sector 7",
                  threat: "High",
                  alerted: true,
                },
                {
                  time: "14:15",
                  animal: "Elephant Herd",
                  behavior: "Crossing",
                  location: "Highway KM 15",
                  threat: "Medium",
                  alerted: true,
                },
                {
                  time: "13:58",
                  animal: "Leopard",
                  behavior: "Hunting",
                  location: "Buffer Zone 2",
                  threat: "High",
                  alerted: true,
                },
                {
                  time: "13:42",
                  animal: "Peacock",
                  behavior: "Mating Call",
                  location: "Trail 1",
                  threat: "Low",
                  alerted: false,
                },
                {
                  time: "13:28",
                  animal: "Wild Boar",
                  behavior: "Feeding",
                  location: "Water Hole 3",
                  threat: "Low",
                  alerted: false,
                },
              ].map((detection, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="text-sm font-mono text-gray-500">{detection.time}</div>
                    <div>
                      <p className="font-medium">{detection.animal}</p>
                      <p className="text-sm text-gray-600">{detection.location}</p>
                    </div>
                    <Badge variant="outline">{detection.behavior}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={
                        detection.threat === "High"
                          ? "bg-red-600 text-white"
                          : detection.threat === "Medium"
                            ? "bg-yellow-600 text-white"
                            : "bg-green-600 text-white"
                      }
                    >
                      {detection.threat}
                    </Badge>
                    {detection.alerted && <CheckCircle className="h-4 w-4 text-green-600" />}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
