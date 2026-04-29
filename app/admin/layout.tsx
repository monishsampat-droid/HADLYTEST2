import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { AdminTopbar } from "@/components/admin/topbar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">

        {/* Topbar */}
        <AdminTopbar />

        {/* Content */}
        <main className="p-4 md:p-6 bg-muted/30 flex-1">
          {children}
        </main>

      </div>

    </div>
  )
}