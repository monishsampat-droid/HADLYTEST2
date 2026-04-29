import { AuthForm } from "@/components/auth-form"

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-background via-muted/40 to-background">
      <div className="w-full max-w-md">
        <AuthForm type="login" />
      </div>
    </main>
  )
}