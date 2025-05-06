"use client" // Still needed for usePathname and client-side navigation

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  LayoutDashboard,
  LogOut,
  PlusCircle,
  Settings,
  Users,
  Bell,
  Search,
  ChevronLeft,
  Menu,
} from "lucide-react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { logoutUser } from "../../APIServices/users/usersAPI";

// Default Sidebar Links (can be overridden via props or customized per role)
const defaultSidebarLinks = [
  {
    title: "Dashboard",
    href: "Admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Subscriptions",
    href: "/subscriptions",
    icon: Users,
  },
  {
    title: "Add Subscription",
    href: "/subscriptions/addsubscription",
    icon: PlusCircle,
  },
  // {
  //   title: "Analytics",
  //   href: "Admin/dashboard/analytics",
  //   icon: BarChart3,
  // },
  // {
  //   title: "Settings",
  //   href: "/settings",
  //   icon: Settings,
  // },
]

// Sidebar Component
function Sidebar({
  links = defaultSidebarLinks,
  isOpen,
  toggleSidebar,
}: {
  links?: typeof defaultSidebarLinks
  isOpen: boolean
  toggleSidebar: () => void
}) {
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "flex h-screen flex-col bg-gradient-to-b from-[#003087] to-[#00296b] text-white transition-all duration-300",
        isOpen ? "w-[250px]" : "w-[70px]",
      )}
    >
      {/* Logo area */}
      <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
        {isOpen && (
          <Link href="/" className="flex items-center justify-center">
            <Image src="/logo/Asset 8.jpg" alt="logo" width={60} height={60} className="rounded-md" />
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white"
        >
          {isOpen ? <ChevronLeft className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation links */}
      <div className="flex-1 py-4">
        <nav className="grid items-start px-2 text-sm font-medium gap-1">
          {links.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-white/80 transition-all hover:text-white hover:bg-white/10",
                  isActive &&
                    "bg-white/15 text-white font-semibold before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-8 before:w-1 before:bg-white before:rounded-r-md",
                )}
                title={!isOpen ? link.title : undefined}
              >
                <Icon className={cn("h-5 w-5", isActive ? "text-white" : "text-white/70")} />
                {isOpen && <span>{link.title}</span>}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Logout button */}
      <div className="mt-auto p-4 border-t border-white/10">
        <Button
          variant="outline"
          onClick={logoutUser}
          className={cn(
            "border-white/20 bg-white/5 text-white hover:bg-white/15 hover:text-white transition-colors",
            isOpen ? "w-full justify-start gap-3" : "w-10 h-10 p-0",
          )}
          title={!isOpen ? "Log out" : undefined}
        >
          <LogOut className="h-5 w-5" />
          {isOpen && "Log out"}
        </Button>
      </div>
    </div>
  )
}

// Header Component
function Header({ title, toggleSidebar }: { title: string; toggleSidebar: () => void }) {
  return (
    <header className="flex h-16 items-center gap-4 border-b bg-white px-6 shadow-sm">
      <h1 className="text-xl font-bold text-[#003087]">{title}</h1>
      <div className="ml-auto flex items-center gap-4">
        <form className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-[200px] pl-8 md:w-[300px] lg:w-[400px] border-[#003087]/20 focus-visible:ring-[#003087]/30"
          />
        </form>
        <Button variant="ghost" size="icon" className="rounded-full relative">
          <Bell className="h-5 w-5 text-[#003087]" />
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            3
          </span>
            <span className="sr-only">Notifications</span>
            <button
            onClick={() => {
              window.location.href = "/notification";
            }}
            className="absolute inset-0"
            aria-label="Go to notifications"
            />
        </Button>
        <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-[#003087]/20">
          <Image
            src="/images/AdminAvatar.jpg"
            width={32}
            height={32}
            alt="Avatar"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </header>
  )
}

// AdminLayout Component
export default function AdminLayout({
  children,
  title,
  sidebarLinks = defaultSidebarLinks, // Optional prop to customize sidebar links
}: {
  children: React.ReactNode
  title: string
  sidebarLinks?: typeof defaultSidebarLinks // Allow passing custom links
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="grid min-h-screen" style={{ gridTemplateColumns: isSidebarOpen ? "250px 1fr" : "70px 1fr" }}>
      <Sidebar links={sidebarLinks} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col">
        <Header title={title} toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto bg-[#f5f8ff] p-6">{children}</main>
      </div>
    </div>
  )
}

