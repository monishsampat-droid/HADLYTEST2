export default function OrderSuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-4">

        <h1 className="text-3xl font-bold text-green-600">
          Order Placed 🎉
        </h1>

        <p className="text-muted-foreground">
          Your order has been successfully placed.
        </p>

        <button className="bg-primary text-white px-6 py-3 rounded-xl">
          Download Invoice (Coming Soon)
        </button>

      </div>
    </main>
  )
}