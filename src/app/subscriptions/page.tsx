"use client"
import AdminLayout from "@/components/Navbars/adminNavbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { PlusCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { getAllPlans } from "@/APIServices/subscriptions/subscriptionsAPI" // Import the API function

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<{ id: string; name: string; plan: string; startDate: string; endDate: string }[]>([])

  useEffect(() => {
    async function fetchSubscriptions() {
      try {
        const formattedSubscriptions = await getAllPlans() // Use the API function
        setSubscriptions(formattedSubscriptions)
      } catch (error) {
        console.error("Error fetching subscriptions:", error)
      }
    }

    fetchSubscriptions()
  }, [])

  return (
    // <AdminLayout title="Subscriptions">
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-heading text-deep-blue tracking-tight">Manage Subscriptions</h2>
          <p className="text-muted-foreground font-body">View and manage all subscriber information</p>
        </div>
        <Link href="/subscriptions/add">
          <Button className="gap-2 bg-bright-blue hover:bg-bright-blue/90">
            <PlusCircle className="h-4 w-4" />
            Add Subscription
          </Button>
        </Link>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-deep-blue">Filter Subscriptions</CardTitle>
          <CardDescription className="font-subheading">
            Narrow down results by plan type or date range
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <label htmlFor="plan" className="text-sm font-subheading text-dark-blue">
                Plan
              </label>
              <Select defaultValue="all">
                <SelectTrigger id="plan">
                  <SelectValue placeholder="Select plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Plans</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="family">Family</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="search" className="text-sm font-subheading text-dark-blue">
                Search
              </label>
              <Input id="search" placeholder="Search by name or email" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-deep-blue">
              <TableRow>
                <TableHead className="text-white font-subheading">ID</TableHead>
                <TableHead className="text-white font-subheading">Name</TableHead>
                <TableHead className="text-white font-subheading">Plan</TableHead>
                <TableHead className="text-white font-subheading">Created Date</TableHead>
                <TableHead className="text-white font-subheading">Updated Date</TableHead>
                <TableHead className="text-white font-subheading text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell className="font-subheading">{subscription.id}</TableCell>
                  <TableCell className="font-body">{subscription.name}</TableCell>
                  <TableCell className="font-body">{subscription.plan}</TableCell>
                  <TableCell className="font-body">{subscription.startDate}</TableCell>
                  <TableCell className="font-body">{subscription.endDate}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-bright-blue hover:text-bright-blue/90 hover:bg-soft-blue"
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    {/* // </AdminLayout> */}
    </div>
  );
}
