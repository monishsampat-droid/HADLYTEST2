import { div } from "framer-motion/client"
import {
  IndianRupee,
  ShoppingCart,
  Users,
  Package,
} from "lucide-react"

const stats = [
  {
    label: "Revenue",
    value: "₹24,500",
    icon: IndianRupee,
  },
  {
    label: "Orders",
    value: "320",
    icon: ShoppingCart,
  },
  {
    label: "Users",
    value: "1,200",
    icon: Users,
  },
  {
    label: "Products",
    value: "58",
    icon: Package,
  },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Overview of your store performance
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <div
              key={stat.label}
              className="bg-white border border-border rounded-xl p-4 flex items-center justify-between"
            >
              <div>
                <p className="text-xs text-muted-foreground">
                  {stat.label}
                </p>
                <p className="text-lg font-bold">
                  {stat.value}
                </p>
              </div>

              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon size={18} className="text-primary" />
              </div>
            </div>
          )
        })}
      </div>
            {/* Recent Orders */}
      <div className="bg-white border border-border rounded-xl p-5">
        <h2 className="font-semibold mb-4">
          Recent Orders
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            <thead className="text-left text-muted-foreground border-b">
              <tr>
                <th className="py-2">Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {[
                { id: "#1234", name: "Aditya", amount: "₹499", status: "Paid" },
                { id: "#1235", name: "Rahul", amount: "₹799", status: "Pending" },
                { id: "#1236", name: "Sneha", amount: "₹299", status: "Paid" },
              ].map((o) => (
                <tr key={o.id}>
                  <td className="py-3 font-medium">{o.id}</td>
                  <td>{o.name}</td>
                  <td>{o.amount}</td>
                  <td>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        o.status === "Paid"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
            {/* Top Products */}
      <div className="bg-white border border-border rounded-xl p-5">
        <h2 className="font-semibold mb-4">
          Top Products
        </h2>

        <div className="space-y-3">
          {[
            { name: "Vermicompost", sales: 120 },
            { name: "Tomato Seeds", sales: 95 },
            { name: "Neem Cake", sales: 80 },
          ].map((p) => (
            <div
              key={p.name}
              className="flex items-center justify-between"
            >
              <p className="text-sm">{p.name}</p>
              <span className="text-xs text-muted-foreground">
                {p.sales} sales
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}