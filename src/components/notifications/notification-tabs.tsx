"use client"

import { useState } from "react"

export default function NotificationTabs() {
  const [activeTab, setActiveTab] = useState("all")

  const tabs = [
    { id: "all", label: "All", count: 20 },
    { id: "archive", label: "Archive", count: 10 },
    { id: "favorite", label: "Favorite", count: 17 },
  ]

  return (
    <div className="border-b mb-4">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-4 py-2 text-sm font-medium ${
              activeTab === tab.id ? "text-black border-b-2 border-red-500" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.id === "all" && (
              <span className="absolute -top-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                {tab.count}
              </span>
            )}
            <span className="flex items-center gap-2">
              {tab.label}
              {tab.id !== "all" && <span className="text-gray-400">{tab.count}</span>}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
