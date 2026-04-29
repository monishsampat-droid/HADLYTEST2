"use client"

import { useParams } from "next/navigation"

export default function OrderDetailsPage() {
  const { id } = useParams()

  return (
    <div className="space-y-6">

      <h1 className="text-xl font-bold">
        Order {id}
      </h1>

      {/* Customer */}
      <div className="border border-border rounded-xl p-5">
        <h2 className="font-semibold mb-2">
          Customer Details
        </h2>
        <p className="text-sm text-muted-foreground">
          Aditya Sharma
        </p>
      </div>

      {/* Items */}
      <div className="border border-border rounded-xl p-5">
        <h2 className="font-semibold mb-3">
          Items
        </h2>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Vermicompost × 1</span>
            <span>₹499</span>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="border border-border rounded-xl p-5">
        <h2 className="font-semibold mb-3">
          Order Status
        </h2>

        <select className="border border-border rounded px-3 py-2 text-sm">
          <option>Pending</option>
          <option>Paid</option>
          <option>Shipped</option>
          <option>Delivered</option>
        </select>
      </div>

    </div>
  )
}