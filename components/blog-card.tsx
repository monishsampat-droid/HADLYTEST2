"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

type BlogCardProps = {
slug: string
image: string
tag: string
title: string
desc: string
date: string
readTime: string
}

export function BlogCard({
slug,
image,
tag,
title,
desc,
date,
readTime,
}: BlogCardProps) {
return (
<Link href={`/blogs/${slug}`} className="block min-w-[360px]">
  <div className="h-full overflow-hidden rounded-3xl border border-border bg-background transition hover:-translate-y-1 hover:shadow-xl">
    {/* IMAGE */}
    <div className="relative h-48">
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover"
      />

      <div className="absolute left-3 top-3 rounded-full bg-background/80 px-2 py-1 text-[10px] font-bold text-foreground backdrop-blur">
        {tag}
      </div>

      <div className="absolute right-3 top-3 rounded-full bg-black/60 px-2 py-0.5 text-[10px] text-white">
        {readTime}
      </div>
    </div>

    {/* CONTENT */}
    <div className="flex h-[180px] flex-col justify-between p-5">
      <div>
        <h3 className="mb-2 text-sm font-bold leading-snug text-foreground">
          {title}
        </h3>

        <p className="line-clamp-3 text-xs text-muted-foreground">
          {desc}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">
          {date}
        </span>

        <span className="flex items-center gap-1 font-semibold text-primary">
          Read <ArrowRight size={12} />
        </span>
      </div>
    </div>
  </div>
</Link>
)
}
