import AdminLayout from "@/components/Navbars/adminNavbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AnalyticsPage() {
  return (
    <AdminLayout title="Analytics">
      <div className="mb-6">
        <h2 className="text-2xl font-heading text-deep-blue tracking-tight">Analytics Dashboard</h2>
        <p className="text-muted-foreground font-body">View detailed analytics and performance metrics</p>
      </div>

      <div className="flex justify-end mb-6">
        <Select defaultValue="30">
          <SelectTrigger className="w-[180px] font-body">
            <SelectValue placeholder="Select time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
            <SelectItem value="365">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {[
          { title: "Total Revenue", value: "$48,560", change: "+12.5%" },
          { title: "Active Subscribers", value: "1,248", change: "+8.2%" },
          { title: "Conversion Rate", value: "3.2%", change: "+0.5%" },
          { title: "Avg. Session Duration", value: "4m 32s", change: "+12.3%" },
        ].map((stat, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-subheading text-deep-blue">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-heading text-dark-blue">{stat.value}</div>
              <p className={`text-xs ${stat.change.startsWith("+") ? "text-green-500" : "text-red-500"} font-body`}>
                {stat.change} from previous period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-deep-blue">Subscription Growth</CardTitle>
            <CardDescription className="font-subheading">New subscriptions over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full bg-white rounded-md flex items-center justify-center border">
              <p className="text-muted-foreground font-body">Subscription Growth Chart</p>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-deep-blue">Revenue Breakdown</CardTitle>
            <CardDescription className="font-subheading">Revenue by subscription plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full bg-white rounded-md flex items-center justify-center border">
              <p className="text-muted-foreground font-body">Revenue Pie Chart</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-deep-blue">User Engagement</CardTitle>
            <CardDescription className="font-subheading">Daily active users and session duration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full bg-white rounded-md flex items-center justify-center border">
              <p className="text-muted-foreground font-body">User Engagement Chart</p>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-full lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-deep-blue">Top Subscription Plans</CardTitle>
            <CardDescription className="font-subheading">Most popular subscription plans</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Premium Plan", percentage: 45, color: "bg-bright-blue" },
                { name: "Basic Plan", percentage: 30, color: "bg-deep-blue" },
                { name: "Family Plan", percentage: 25, color: "bg-secondary" },
              ].map((plan, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-subheading text-dark-blue">{plan.name}</span>
                    <span className="text-sm text-muted-foreground font-body">{plan.percentage}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-soft-blue">
                    <div className={`h-full rounded-full ${plan.color}`} style={{ width: `${plan.percentage}%` }} />
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

