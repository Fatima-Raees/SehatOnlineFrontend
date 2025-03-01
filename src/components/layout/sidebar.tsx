"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Heart, LayoutDashboard, LogOut, PlusCircle, Settings, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Subscriptions",
    href: "/subscriptions",
    icon: Users,
  },
  {
    title: "Add Subscription",
    href: "/subscriptions/add",
    icon: PlusCircle,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen flex-col bg-deep-blue text-white">
      <div className="flex h-14 items-center border-b border-white/10 px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-heading">
          <Heart className="h-6 w-6 text-white" />
          <span>Sehat Online</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-subheading">
          {sidebarLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-white/80 transition-all hover:text-white",
                  pathname === link.href && "bg-secondary text-white",
                )}
              >
                <Icon className="h-4 w-4" />
                {link.title}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <Button
          variant="outline"
          className="w-full justify-start gap-2 border-white/20 text-white hover:bg-secondary hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </Button>
      </div>
    </div>
  )
}

