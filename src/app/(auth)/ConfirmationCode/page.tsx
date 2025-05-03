"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { verifyOTP, sendOTP, signupUser } from "@/APIServices/users/usersAPI"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Mail, CheckCircle, AlertCircle, ArrowRight, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

export default function OTPVerification() {
  const router = useRouter()
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const email = Cookies.get("userEmail") || ""
  const maskedEmail = email ? maskEmail(email) : ""

  useEffect(() => {
    if (!email) {
      setError("No email found. Please register first.")
    }
  }, [email])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [countdown])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return

    const newOtpValues = [...otpValues]
    newOtpValues[index] = value
    setOtpValues(newOtpValues)
    setError("")

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }

    // Handle left arrow
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }

    // Handle right arrow
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    if (/^\d+$/.test(pastedData) && pastedData.length <= 6) {
      const digits = pastedData.split("").slice(0, 6)
      const newOtpValues = [...otpValues]

      digits.forEach((digit, index) => {
        if (index < 6) newOtpValues[index] = digit
      })

      setOtpValues(newOtpValues)

      // Focus the next empty input or the last one
      const nextEmptyIndex = newOtpValues.findIndex((val) => !val)
      if (nextEmptyIndex !== -1) {
        inputRefs.current[nextEmptyIndex]?.focus()
      } else {
        inputRefs.current[5]?.focus()
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const otp = otpValues.join("")

    if (otp.length !== 6) {
      setError("Please enter all 6 digits")
      return
    }

    setLoading(true)
    setMessage("")
    setError("")

    try {
      const response = await verifyOTP(email, otp)
      if (response.success) {
        const flow = Cookies.get("flow")
        const userRole = Cookies.get("role")

        if (flow === "signup") {
          const tempUserData = Cookies.get("tempUserData")
          if (tempUserData) {
            const parsedData = JSON.parse(tempUserData)
            await signupUser(parsedData)
            Cookies.remove("tempUserData")
            setMessage("Registration successful!")
            setTimeout(() => {
              router.push("/login")
            }, 1500)
          }
        } else if (flow === "login") {
          setMessage("Verification successful! Redirecting...")
          setTimeout(() => {
            if (userRole === "doctor") {
              router.push("/Doctor/dashboard")
            } else if (userRole === "admin") {
              router.push("/Admin/dashboard")
            } else if (userRole === "patient") {
              router.push("/Patient/dashboard")
            }
          }, 1500)
        }
      } else {
        setError(response.message || "Verification failed")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (countdown > 0) return

    setResendLoading(true)
    try {
      await sendOTP(email)
      setMessage("OTP resent successfully.")
      setCountdown(60) // 60 seconds cooldown
    } catch (err) {
      setError("Failed to resend OTP. Please try again.")
    } finally {
      setResendLoading(false)
    }
  }

  function maskEmail(email: string) {
    const [username, domain] = email.split("@")
    const maskedUsername =
      username.charAt(0) + "*".repeat(Math.max(username.length - 2, 1)) + username.charAt(username.length - 1)
    return `${maskedUsername}@${domain}`
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <Mail className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-center text-2xl font-bold">Verify Your Email</CardTitle>
          <CardDescription className="text-center">
            We've sent a 6-digit code to {maskedEmail || "your email"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <div className="flex justify-between gap-2">
                {otpValues.map((value, index) => (
                  <Input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className={cn(
                      "h-14 w-12 text-center text-xl font-semibold sm:h-16 sm:w-14",
                      error ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-blue-500",
                    )}
                  />
                ))}
              </div>

              {error && (
                <div className="mt-3 flex items-center gap-2 text-red-500">
                  <AlertCircle className="h-4 w-4" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {message && (
                <div className="mt-3 flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <p className="text-sm">{message}</p>
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={loading || otpValues.some((v) => !v)}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Verifying...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Verify & Continue
                  <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-center text-sm text-muted-foreground">Didn't receive the code?</div>
          <Button variant="ghost" onClick={handleResend} disabled={resendLoading || countdown > 0} className="mt-1">
            {resendLoading ? (
              <span className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 animate-spin" />
                Sending...
              </span>
            ) : countdown > 0 ? (
              `Resend in ${countdown}s`
            ) : (
              "Resend OTP"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
