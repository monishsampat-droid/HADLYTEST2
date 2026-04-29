"use client"

import Link from "next/link"
import { Plus } from "lucide-react"

const blogs = [
  {
    id: "1",
    title: "Soil Health in India",
    author: "Aditya",
    date: "Apr 2026",
  },
]

export default function AdminBlogsPage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">
            Blogs
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage blog content
          </p>
        </div>

        <Link
          href="/admin/blogs/new"
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm"
        >
          <Plus size={16} />
          New Blog
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">

          <thead className="bg-muted/50 text-left">
            <tr>
              <th className="p-3">Title</th>
              <th>Author</th>
              <th>Date</th>
              <th className="text-right pr-4">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {blogs.map((b) => (
              <tr key={b.id}>
                <td className="p-3 font-medium">{b.title}</td>
                <td>{b.author}</td>
                <td>{b.date}</td>
                <td className="text-right pr-4">
                  <Link
                    href={`/admin/blogs/${b.id}`}
                    className="text-primary text-sm"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  )
}