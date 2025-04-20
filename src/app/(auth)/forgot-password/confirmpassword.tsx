"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ResetPassword() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-6">
        <Card className="w-full shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex items-center mb-2">
              <Link href="/login" className="text-blue-600 hover:text-blue-800 flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to login
              </Link>
            </div>
            <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
            <CardDescription>Create a new password for your account</CardDescription>
          </CardHeader>
          <CardContent>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    New Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                {error && (
                  <div className="bg-red-50 p-3 rounded-md">
                    <p className="text-red-800 text-sm">{error}</p>
                  </div>
                )}
                <Button type="submit" className="w-full bg-[#0277bd] hover:bg-[#01579b]" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Password"
                  )}
                </Button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-md">
                  <p className="text-green-800">
                    Your password has been successfully reset. You can now log in with your new password.
                  </p>
                </div>
                <Link href="/login">
                  <Button className="w-full bg-[#0277bd] hover:bg-[#01579b]">Return to Login</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="hidden lg:block bg-[#0d47a1] w-1/2">
        <div className="flex flex-col justify-center items-center h-full text-white p-8">
          <h2 className="text-3xl font-bold mb-4">Looking for Doctor Login?</h2>
          <p className="text-xl mb-8">Login as a doctor to manage your patients.</p>
          <Link
            href="/doctor-login"
            className="border-2 border-white text-white px-6 py-2 rounded-md hover:bg-white hover:text-[#0d47a1] transition-colors"
          >
            Doctor Login
          </Link>
        </div>
      </div>
    </div>
  )
}

