"use client"

import { useEffect, useState } from "react"
import { Activity, DollarSign, Users } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

import AdminLayout from "@/components/Navbars/adminNavbar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  getDashboardSummary,
  getSubscriptionChart,
  getRecentSubscribers,
} from "@/APIServices/Admin/adminAPI"

export default function DashboardPage() {
  const [summary, setSummary] = useState<any>(null)
  const [chartData, setChartData] = useState<any[]>([])
  const [subscribers, setSubscribers] = useState<any[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const [summaryRes, chartRes, subsRes] = await Promise.all([
          getDashboardSummary(),
          getSubscriptionChart(),
          getRecentSubscribers(),
        ])
        setSummary(summaryRes)
        setChartData(chartRes)
        setSubscribers(subsRes)
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
      }
    }

    fetchData()
  }, [])

  return (
    // <AdminLayout title="Dashboard">
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-subheading text-deep-blue">
              Total Subscribers
            </CardTitle>
            <Users className="h-4 w-4 text-bright-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-heading text-dark-blue">
              {summary?.totalSubscribers ?? "--"}
            </div>
            <p className="text-xs text-muted-foreground">
              +{summary?.subscriberGrowth ?? "--"}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-subheading text-deep-blue">
              Monthly Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-bright-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-heading text-dark-blue">
              Rs. {summary?.monthlyRevenue?.toLocaleString() ?? "--"}
            </div>
            <p className="text-xs text-muted-foreground">
              +{summary?.revenueGrowth ?? "--"}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-subheading text-deep-blue">
              Active Users
            </CardTitle>
            <Activity className="h-4 w-4 text-bright-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-heading text-dark-blue">--</div>
            <p className="text-xs text-muted-foreground">Feature coming soon</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
        <CardTitle className="text-deep-blue">Subscription Overview</CardTitle>
        <CardDescription className="font-subheading">
          Monthly subscription growth over time
        </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={2}
          />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[300px] w-full bg-soft-blue rounded-md flex items-center justify-center">
            <p className="text-muted-foreground font-body">Loading chart...</p>
          </div>
        )}
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
        <CardTitle className="text-deep-blue">Recent Subscribers</CardTitle>
        <CardDescription className="font-subheading">
          Latest users who subscribed to Sehat Online
        </CardDescription>
          </CardHeader>
          <CardContent>
        <div className="space-y-4">
          {subscribers.length > 0 ? (
            subscribers.map((sub: any) => (
          <div key={sub.id} className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-soft-blue flex items-center justify-center">
              <Users className="h-5 w-5 text-bright-blue" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-subheading text-dark-blue">{sub.name}</p>
              <p className="text-xs text-muted-foreground font-body">{sub.plan}</p>
            </div>
            <div className="text-xs text-muted-foreground font-body">
              {sub.daysAgo} day{sub.daysAgo !== 1 ? "s" : ""} ago
            </div>
          </div>
            ))
          ) : (
            <p className="text-muted-foreground text-sm">Loading recent subscribers...</p>
          )}
        </div>
          </CardContent>
        </Card>
      </div>
    {/* // </AdminLayout> */}
    </div>
  )
}
