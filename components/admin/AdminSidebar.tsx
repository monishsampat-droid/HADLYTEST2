"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Warehouse,
  Menu,
  X,
} from "lucide-react"

const links = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Inventory", href: "/admin/inventory", icon: Warehouse },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const renderLinks = () =>
    links.map((link) => {
      const Icon = link.icon
      const active =
        pathname === link.href ||
        pathname.startsWith(link.href + "/")

      return (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => setOpen(false)}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all
            ${
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
        >
          <Icon size={16} />
          <span className="font-medium">{link.name}</span>
        </Link>
      )
    })

  return (
    <>
      {/* ✅ Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-border">
        <span className="font-semibold">Admin</span>
        <button onClick={() => setOpen(true)}>
          <Menu />
        </button>
      </div>

      {/* ✅ Sidebar (Desktop) */}
      <aside className="hidden md:flex w-64 h-screen sticky top-0 border-r border-border bg-background flex-col">
        <div className="p-5 font-bold text-lg border-b border-border">
          HADLY Admin
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {renderLinks()}
        </nav>

        <div className="p-4 text-xs text-muted-foreground border-t border-border">
          © {new Date().getFullYear()}
        </div>
      </aside>

      {/* ✅ Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 flex">

          {/* Overlay */}
          <div
            className="flex-1 bg-black/40"
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <div className="w-64 bg-background h-full border-l border-border p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-bold">Admin</span>
              <button onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>

            <nav className="space-y-1">
              {renderLinks()}
            </nav>
          </div>

        </div>
      )}
    </>
  )
}