export default function BlogDetail() {
  return (
    <main className="py-12">
      <div className="container max-w-4xl space-y-6">

        <h1 className="text-3xl font-bold">
          Blog Title
        </h1>

        {/* PDF Viewer */}
        <div className="w-full h-[80vh] border border-border rounded-xl overflow-hidden">
          <iframe
            src="/sample.pdf"
            className="w-full h-full"
          />
        </div>

      </div>
    </main>
  )
}