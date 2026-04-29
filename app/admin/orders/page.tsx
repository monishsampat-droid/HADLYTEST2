"use client"

const orders = [
  {
    id: "#1001",
    customer: "Aditya",
    total: 499,
    status: "Paid",
    date: "Apr 10",
  },
  {
    id: "#1002",
    customer: "Rahul",
    total: 799,
    status: "Pending",
    date: "Apr 11",
  },
  {
    id: "#1003",
    customer: "Sneha",
    total: 299,
    status: "Shipped",
    date: "Apr 11",
  },
]

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold">
          Orders
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage customer orders
        </p>
      </div>

      {/* Table */}
      <div className="bg-white border border-border rounded-xl overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-muted/50 text-left text-muted-foreground">
            <tr>
              <th className="p-3">Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th className="text-right pr-4">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y">

            {orders.map((o) => (
              <tr key={o.id}>

                <td className="p-3 font-medium">
                  {o.id}
                </td>

                <td>{o.customer}</td>
                <td>{o.date}</td>
                <td>₹{o.total}</td>

                <td>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      o.status === "Paid"
                        ? "bg-green-100 text-green-600"
                        : o.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {o.status}
                  </span>
                </td>

                <td className="text-right pr-4">
                  <button className="text-primary text-sm">
                    View
                  </button>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}