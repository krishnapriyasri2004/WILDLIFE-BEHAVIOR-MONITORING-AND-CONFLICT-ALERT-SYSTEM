"use client"

import { Button } from "@/components/ui/button"
import { Search, Radio, MapPin, History, Shield, LogOut } from "lucide-react"

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const menuItems = [
    { id: "search", label: "Animal Search & Prediction", icon: Search },
    { id: "detection", label: "Detection System", icon: Radio },
    { id: "proximity", label: "Proximity Alerts", icon: MapPin },
    { id: "history", label: "History & Logs", icon: History },
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Shield className="w-8 h-8 text-green-600" />
          <div>
            <h2 className="font-bold text-gray-900">Forest Dept</h2>
            <p className="text-xs text-gray-500">Bandipur Reserve</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "default" : "ghost"}
            className={`w-full justify-start ${
              activeTab === item.id ? "bg-green-600 hover:bg-green-700 text-white" : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => onTabChange(item.id)}
          >
            <item.icon className="w-4 h-4 mr-2" />
            {item.label}
          </Button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <Button variant="ghost" className="w-full justify-start text-gray-700">
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
