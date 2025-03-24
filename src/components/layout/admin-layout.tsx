import type React from "react"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"

export function AdminLayout({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}) {
  return (
    <div className="grid min-h-screen grid-cols-[240px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header title={title} />
        <main className="flex-1 overflow-y-auto bg-soft-blue p-6">{children}</main>
      </div>
    </div>
  )
}

