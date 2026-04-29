"use client"

import { Bell, User } from "lucide-react"

export function AdminTopbar() {
  return (
    <div className="h-14 border-b border-border flex items-center justify-between px-4 md:px-6 bg-background">

      <h1 className="font-semibold text-sm md:text-base">
        Admin Panel
      </h1>

      <div className="flex items-center gap-3">

        <button className="w-9 h-9 flex items-center justify-center rounded-full border border-border hover:bg-muted">
          <Bell size={16} />
        </button>

        <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
          A
        </div>

      </div>
    </div>
  )
}