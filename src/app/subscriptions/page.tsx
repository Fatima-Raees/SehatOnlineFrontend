import { AdminLayout } from "@/components/Navbars/adminNavbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

export default function SubscriptionsPage() {
  // Sample subscription data
  const subscriptions = [
    {
      id: "SUB-001",
      name: "John Doe",
      email: "john@example.com",
      plan: "Premium",
      status: "Active",
      startDate: "2023-01-15",
      endDate: "2024-01-15",
    },
    {
      id: "SUB-002",
      name: "Jane Smith",
      email: "jane@example.com",
      plan: "Basic",
      status: "Active",
      startDate: "2023-03-10",
      endDate: "2024-03-10",
    },
    {
      id: "SUB-003",
      name: "Ahmed Khan",
      email: "ahmed@example.com",
      plan: "Premium",
      status: "Expired",
      startDate: "2023-02-05",
      endDate: "2023-12-05",
    },
    {
      id: "SUB-004",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      plan: "Family",
      status: "Active",
      startDate: "2023-05-20",
      endDate: "2024-05-20",
    },
    {
      id: "SUB-005",
      name: "Michael Brown",
      email: "michael@example.com",
      plan: "Basic",
      status: "Pending",
      startDate: "2023-06-01",
      endDate: "2024-06-01",
    },
  ]

  return (
    <AdminLayout title="Subscriptions">
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
            Narrow down results by subscription status, plan type, or date range
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="grid gap-2">
              <label htmlFor="status" className="text-sm font-subheading text-dark-blue">
                Status
              </label>
              <Select defaultValue="all">
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
                <TableHead className="text-white font-subheading">Email</TableHead>
                <TableHead className="text-white font-subheading">Plan</TableHead>
                <TableHead className="text-white font-subheading">Status</TableHead>
                <TableHead className="text-white font-subheading">Start Date</TableHead>
                <TableHead className="text-white font-subheading">End Date</TableHead>
                <TableHead className="text-white font-subheading text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell className="font-subheading">{subscription.id}</TableCell>
                  <TableCell className="font-body">{subscription.name}</TableCell>
                  <TableCell className="font-body">{subscription.email}</TableCell>
                  <TableCell className="font-body">{subscription.plan}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-subheading ${
                        subscription.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : subscription.status === "Expired"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {subscription.status}
                    </span>
                  </TableCell>
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
    </AdminLayout>
  )
}

