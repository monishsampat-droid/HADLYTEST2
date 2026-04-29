export default function DashboardHome() {
  return (
    <div className="space-y-6">

      <h1 className="text-xl md:text-2xl font-bold">
        Dashboard
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

        <div className="bg-white border border-border rounded-xl p-4">
          <p className="text-xs text-muted-foreground">
            Orders
          </p>
          <p className="text-lg font-bold">
            12
          </p>
        </div>

        <div className="bg-white border border-border rounded-xl p-4">
          <p className="text-xs text-muted-foreground">
            Wishlist
          </p>
          <p className="text-lg font-bold">
            5
          </p>
        </div>

        <div className="bg-white border border-border rounded-xl p-4">
          <p className="text-xs text-muted-foreground">
            Rewards
          </p>
          <p className="text-lg font-bold">
            ₹200
          </p>
        </div>

      </div>

    </div>
  )
}