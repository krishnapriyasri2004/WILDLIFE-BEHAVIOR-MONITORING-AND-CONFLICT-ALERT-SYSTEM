"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { AnimalSearch } from "@/components/animal-search"
import { DetectionSystem } from "@/components/detection-system"
import { ProximityAlert } from "@/components/proximity-alert"
import { HistoryLogs } from "@/components/history-logs"

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("search")

  const renderContent = () => {
    switch (activeTab) {
      case "search":
        return <AnimalSearch />
      case "detection":
        return <DetectionSystem />
      case "proximity":
        return <ProximityAlert />
      case "history":
        return <HistoryLogs />
      default:
        return <AnimalSearch />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Wildlife Protection Dashboard</h1>
            <p className="text-gray-600">Mysore-Bandipur Reserve Area Monitoring System</p>
          </div>
          {renderContent()}
        </div>
      </main>
    </div>
  )
}
