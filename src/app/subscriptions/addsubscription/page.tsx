"use client"

import type React from "react"

import { useState } from "react"
import AdminLayout from "@/components/Navbars/adminNavbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"
import { addPlan } from "@/APIServices/subscriptions/subscriptionsAPI";


export default function AddSubscriptionPage() {
  const [formState, setFormState] = useState({
    PlanName: "",
    Price: 0,
    Features: "",
    PlanType: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (field: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

  try {
      // Call the API to add the plan
      console.log(formState);
      await addPlan(formState);

  
      setIsSubmitting(false);
      setIsSuccess(true);
  
      // Reset form after showing success
      setTimeout(() => {
        setFormState({
          PlanName: "",
          Price: 0,
          Features: "",
          PlanType: ""
        });
        setIsSuccess(false);
      }, 2000);
    } catch (error) {
      setIsSubmitting(false);
      setIsSuccess(false);
      console.error("Error submitting the form", error);
    }
  };

  return (
    // <AdminLayout title="Add Subscription">
    <div>
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
            <CardTitle className="text-deep-blue">Plan Details</CardTitle>
            <CardDescription className="font-subheading">
              Enter the Subscription Plan information below
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="grid gap-2">
              <label htmlFor="PlanName" className="text-sm font-subheading text-dark-blue">
                Plan Name
              </label>
              <Input
                id="PlanName"
                placeholder="Enter Plan name"
                value={formState.PlanName}
                onChange={(e) => handleChange("PlanName", e.target.value)}
                required
                className="font-body"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="Price" className="text-sm font-subheading text-dark-blue">
                Price
              </label>
              <Input
                id="Price"
                type="number"
                placeholder="Enter the price in Pakistan Rupees"
                value={formState.Price}
                onChange={(e) => handleChange("Price", e.target.value)}
                required
                className="font-body"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="plan" className="text-sm font-subheading text-dark-blue">
                Subscription Plan Type
              </label>
                <Select value={formState.PlanType} onValueChange={(value) => handleChange("PlanType", value)} required>
                <SelectTrigger className="font-body">
                  <SelectValue placeholder="Select Plan Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic Plan</SelectItem>
                  <SelectItem value="standard">Standard Plan</SelectItem>
                  <SelectItem value="premium">Premium Plan</SelectItem>
                </SelectContent>
                </Select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="Features" className="text-sm font-subheading text-dark-blue">
                Features
              </label>
              <textarea
                id="Features"
                placeholder="Enter the Features of the Plan"
                value={formState.Features}
                onChange={(e) => handleChange("Features", e.target.value)}
                required
                className="font-body"
              /><textarea/>
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
    {/* </AdminLayout> */}
    </div>
  )
}

