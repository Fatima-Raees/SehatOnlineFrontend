"use client"

import type React from "react"

import { useState } from "react"
import { AdminLayout } from "@/components/layout/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"

export default function AddSubscriptionPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    plan: "",
    startDate: "",
    duration: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (field: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Reset form after showing success
      setTimeout(() => {
        setFormState({
          name: "",
          email: "",
          plan: "",
          startDate: "",
          duration: "",
        })
        setIsSuccess(false)
      }, 2000)
    }, 1500)
  }

  return (
    <AdminLayout title="Add Subscription">
      <div className="flex items-center mb-6">
        <Link href="/subscriptions" className="mr-4">
          <Button variant="ghost" size="icon" className="text-deep-blue hover:bg-white/50">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-heading text-deep-blue tracking-tight">Add New Subscription</h2>
          <p className="text-muted-foreground font-body">Create a new subscription for a customer</p>
        </div>
      </div>

      <Card className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <CardHeader className="border-b">
            <CardTitle className="text-deep-blue">Subscription Details</CardTitle>
            <CardDescription className="font-subheading">
              Enter the customer and subscription information below
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-subheading text-dark-blue">
                Full Name
              </label>
              <Input
                id="name"
                placeholder="Enter customer name"
                value={formState.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
                className="font-body"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-subheading text-dark-blue">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="customer@example.com"
                value={formState.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
                className="font-body"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="plan" className="text-sm font-subheading text-dark-blue">
                Subscription Plan
              </label>
              <Select value={formState.plan} onValueChange={(value) => handleChange("plan", value)} required>
                <SelectTrigger id="plan" className="font-body">
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic Plan</SelectItem>
                  <SelectItem value="premium">Premium Plan</SelectItem>
                  <SelectItem value="family">Family Plan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <label htmlFor="startDate" className="text-sm font-subheading text-dark-blue">
                  Start Date
                </label>
                <Input
                  id="startDate"
                  type="date"
                  value={formState.startDate}
                  onChange={(e) => handleChange("startDate", e.target.value)}
                  required
                  className="font-body"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="duration" className="text-sm font-subheading text-dark-blue">
                  Duration
                </label>
                <Select value={formState.duration} onValueChange={(value) => handleChange("duration", value)} required>
                  <SelectTrigger id="duration" className="font-body">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Month</SelectItem>
                    <SelectItem value="3">3 Months</SelectItem>
                    <SelectItem value="6">6 Months</SelectItem>
                    <SelectItem value="12">12 Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <Link href="/subscriptions">
              <Button variant="outline" className="font-subheading">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={isSubmitting || isSuccess}
              className="bg-bright-blue hover:bg-bright-blue/90 font-subheading"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-1">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Processing...
                </span>
              ) : isSuccess ? (
                <span className="flex items-center gap-1">
                  <Check className="h-4 w-4" />
                  Subscription Added
                </span>
              ) : (
                "Add Subscription"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </AdminLayout>
  )
}

