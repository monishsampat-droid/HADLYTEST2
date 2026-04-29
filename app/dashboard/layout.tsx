import Link from "next/link"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <aside className="w-64 border-r border-border hidden md:block p-5">
        <h2 className="font-bold text-lg mb-6">
          My Account
        </h2>

        <nav className="space-y-2 text-sm">
          <Link href="/dashboard" className="block hover:text-primary">
            Overview
          </Link>
          <Link href="/dashboard/orders" className="block hover:text-primary">
            Orders
          </Link>
          <Link href="/dashboard/profile" className="block hover:text-primary">
            Profile
          </Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-4 md:p-6 bg-muted/30">
        {children}
      </main>

    </div>
  )
}