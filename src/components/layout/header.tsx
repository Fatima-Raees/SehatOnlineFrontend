import { Bell, Search } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Header({ title }: { title: string }) {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-white px-6">
      <h1 className="text-xl font-heading text-deep-blue">{title}</h1>
      <div className="ml-auto flex items-center gap-4">
        <form className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="w-[200px] pl-8 md:w-[300px] lg:w-[400px]" />
        </form>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Image src="/images/AdminAvatar.jpg" width={82} height={52} alt="Avatar" className="rounded-full" />
          <span className="sr-only">Profile</span>
        </Button>
      </div>
    </header>
  )
}

