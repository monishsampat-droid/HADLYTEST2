export function CartSteps({ step }: { step: number }) {
  const steps = ["Review", "Payment", "Done"]

  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((s, i) => (
        <div key={i} className="flex-1 flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
              step >= i
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {i + 1}
          </div>

          {i < steps.length - 1 && (
            <div
              className={`flex-1 h-[2px] ${
                step > i ? "bg-primary" : "bg-border"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}