"use client"

import { useParams } from "next/navigation"

export default function EditBlogPage() {
  const { id } = useParams()

  return (
    <div className="max-w-2xl space-y-6">

      <h1 className="text-xl font-bold">
        Edit Blog ({id})
      </h1>

      <form className="space-y-4">

        <input
          defaultValue="Soil Health in India"
          className="w-full border border-border rounded-lg px-4 py-3"
        />

        <textarea
          defaultValue="Summary..."
          className="w-full border border-border rounded-lg px-4 py-3"
        />

        <input
          defaultValue="Aditya"
          className="w-full border border-border rounded-lg px-4 py-3"
        />

        <button className="bg-primary text-white px-6 py-3 rounded-lg">
          Update Blog
        </button>

      </form>

    </div>
  )
}