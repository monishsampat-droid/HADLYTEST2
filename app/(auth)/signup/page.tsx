import { AuthForm } from "@/components/auth-form"

export default function SignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <AuthForm type="signup" />
    </main>
  )
}