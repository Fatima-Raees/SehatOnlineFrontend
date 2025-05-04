"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle } from "lucide-react"

interface FormFieldProps {
  label?: string
  name: string
  children: ReactNode
  errors?: string[]
  success?: boolean
  successMessage?: string
  loading?: boolean
  loadingMessage?: string
  className?: string
}

export function FormField({
  label,
  name,
  children,
  errors,
  success,
  successMessage,
  loading,
  loadingMessage,
  className,
}: FormFieldProps) {
  const hasErrors = errors && errors.length > 0
  const id = `form-field-${name}`

  return (
    <div className={cn("w-full mt-3", className)}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {children}

        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-blue-500 text-sm">
            <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full mr-1"></div>
            {loadingMessage}
          </div>
        )}

        {success && !loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-green-500 text-sm">
            <CheckCircle className="h-4 w-4 mr-1" />
            {successMessage}
          </div>
        )}
      </div>

      {hasErrors && (
        <div className="mt-1 text-sm text-red-600 space-y-1">
          {errors.map((error, index) => (
            <div key={index} className="flex items-start gap-1">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
