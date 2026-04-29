export default function UserOrdersPage() {
  const orders = [
    {
      id: "#1001",
      total: 499,
      status: "Delivered",
    },
    {
      id: "#1002",
      total: 799,
      status: "Shipped",
    },
  ]

  return (
    <div className="space-y-6">

      <h1 className="text-xl font-bold">
        My Orders
      </h1>

      <div className="space-y-3">

        {orders.map((o) => (
          <div
            key={o.id}
            className="bg-white border border-border rounded-xl p-4 flex justify-between"
          >
            <div>
              <p className="font-medium">{o.id}</p>
              <p className="text-sm text-muted-foreground">
                ₹{o.total}
              </p>
            </div>

            <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600">
              {o.status}
            </span>
          </div>
        ))}

      </div>

    </div>
  )
}