"use client"

import { useState, useEffect } from "react"
import { AlertCircle, CheckCircle, X, Info } from "lucide-react"
import { cn } from "@/lib/utils"

type AlertType = "error" | "success" | "info" | "warning"

interface AlertMessageProps {
  type: AlertType
  message: string
  onClose?: () => void
  autoClose?: boolean
  duration?: number
}

export function AlertMessage({
  type = "info",
  message,
  onClose,
  autoClose = false,
  duration = 5000,
}: AlertMessageProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (autoClose && message) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        if (onClose) onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [autoClose, duration, message, onClose])

  if (!isVisible || !message) return null

  const getIcon = () => {
    switch (type) {
      case "error":
        return <AlertCircle className="h-5 w-5" />
      case "success":
        return <CheckCircle className="h-5 w-5" />
      case "warning":
        return <AlertCircle className="h-5 w-5" />
      default:
        return <Info className="h-5 w-5" />
    }
  }

  const getStyles = () => {
    switch (type) {
      case "error":
        return "bg-red-50 text-red-700 border-red-500"
      case "success":
        return "bg-green-50 text-green-700 border-green-500"
      case "warning":
        return "bg-amber-50 text-amber-700 border-amber-500"
      default:
        return "bg-blue-50 text-blue-700 border-blue-500"
    }
  }

  return (
    <div
      className={cn("flex items-center justify-between p-4 mb-4 rounded-lg border-l-4 animate-fadeIn", getStyles())}
      role="alert"
    >
      <div className="flex items-center gap-2">
        {getIcon()}
        <span className="font-medium">{message}</span>
      </div>
      {onClose && (
        <button
          onClick={() => {
            setIsVisible(false)
            onClose()
          }}
          className="ml-auto hover:bg-opacity-20 hover:bg-gray-500 p-1 rounded-full"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
