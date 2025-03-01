import { Activity, DollarSign, Users } from "lucide-react"

import { AdminLayout } from "@/components/layout/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <AdminLayout title="Dashboard">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-subheading text-deep-blue">Total Subscribers</CardTitle>
            <Users className="h-4 w-4 text-bright-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-heading text-dark-blue">1,248</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-subheading text-deep-blue">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-bright-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-heading text-dark-blue">$24,560</div>
            <p className="text-xs text-muted-foreground">+8.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-subheading text-deep-blue">Active Users</CardTitle>
            <Activity className="h-4 w-4 text-bright-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-heading text-dark-blue">892</div>
            <p className="text-xs text-muted-foreground">+19% from last month</p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="text-deep-blue">Subscription Overview</CardTitle>
            <CardDescription className="font-subheading">Monthly subscription growth over time</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full bg-soft-blue rounded-md flex items-center justify-center">
              <p className="text-muted-foreground font-body">Subscription Chart</p>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="text-deep-blue">Recent Subscribers</CardTitle>
            <CardDescription className="font-subheading">Latest users who subscribed to Sehat Online</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-soft-blue"></div>
                  <div className="flex-1">
                    <p className="text-sm font-subheading text-dark-blue">User Name {i}</p>
                    <p className="text-xs text-muted-foreground font-body">Premium Plan</p>
                  </div>
                  <div className="text-xs text-muted-foreground font-body">
                    {i} day{i !== 1 ? "s" : ""} ago
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

