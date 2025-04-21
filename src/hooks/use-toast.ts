"use client"

// This is a simplified version of the toast hook
// In a real application, you would use a proper toast library

import { useState } from "react"

type ToastVariant = "default" | "destructive"

interface ToastProps {
  title: string
  description?: string
  variant?: ToastVariant
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = (props: ToastProps) => {
    const id = Date.now().toString()
    setToasts((prev) => [...prev, props])

    // Remove toast after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((_, i) => i !== 0))
    }, 3000)

    return id
  }

  return { toast, toasts }
}
