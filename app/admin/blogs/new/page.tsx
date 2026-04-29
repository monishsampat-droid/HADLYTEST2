"use client"

import { useState } from "react"

export default function NewBlogPage() {
  const [pdf, setPdf] = useState<File | null>(null)

  return (
    <div className="max-w-2xl space-y-6">

      <h1 className="text-xl font-bold">
        Create Blog
      </h1>

      <form className="space-y-4">

        {/* Title */}
        <input
          placeholder="Title"
          className="w-full border border-border rounded-lg px-4 py-3"
        />

        {/* Summary */}
        <textarea
          placeholder="Summary / Abstract"
          className="w-full border border-border rounded-lg px-4 py-3"
        />

        {/* Author */}
        <input
          placeholder="Author Name"
          className="w-full border border-border rounded-lg px-4 py-3"
        />

        {/* Reference */}
        <input
          placeholder="Reference"
          className="w-full border border-border rounded-lg px-4 py-3"
        />

        {/* Cover Image */}
        <div>
          <label className="text-sm font-medium">
            Cover Image
          </label>
          <input type="file" className="mt-1" />
        </div>

        {/* PDF Upload */}
        <div>
          <label className="text-sm font-medium">
            Upload Blog PDF (Required)
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) =>
              setPdf(e.target.files?.[0] || null)
            }
            className="mt-1"
          />

          {pdf && (
            <p className="text-xs text-muted-foreground mt-1">
              {pdf.name}
            </p>
          )}
        </div>

        {/* Submit */}
        <button className="bg-primary text-white px-6 py-3 rounded-lg">
          Publish Blog
        </button>

      </form>

    </div>
  )
}