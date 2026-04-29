"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Loader2, MailCheck } from "lucide-react"
import { useRouter } from "next/navigation"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClient } from "@/lib/supabase/client";

/* ---------------- VALIDATION ---------------- */

const schema = z.object({
  email: z.string().email("Enter a valid email"),
})

type FormValues = z.infer<typeof schema>

/* ---------------- PAGE ---------------- */

export default function ForgotPasswordPage() {
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

const onSubmit = async (data: FormValues) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(
      data.email,
      {
        redirectTo: "http://localhost:3000/reset-password",
      }
    );

    if (error) throw error;

    setSuccess(true);
  } catch (err: any) {
    alert(err.message);
  }
};

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-background via-muted/40 to-background">
      <div className="w-full max-w-md bg-card border border-border rounded-3xl p-6 md:p-8 shadow-xl backdrop-blur supports-[backdrop-filter]:bg-card/80">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/logo_transparent.png"
            alt="Hadly Logo"
            width={60}
            height={60}
          />
        </div>

        {!success ? (
          <>
            {/* Heading */}
            <div className="text-center mb-8 space-y-1">
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Forgot Password
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email and we’ll send you a reset link
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Email</label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm 
                  outline-none transition
                  focus:ring-2 focus:ring-primary/40 focus:border-primary"
                />
                {errors.email && (
                  <p className="text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold 
                transition-all hover:opacity-90 hover:shadow-md active:scale-[0.98]
                flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting && <Loader2 className="animate-spin" size={16} />}
                Send Reset Link
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center text-sm text-muted-foreground">
              Remember your password?{" "}
              <Link
                href="/login"
                className="text-primary font-medium hover:underline underline-offset-4"
              >
                Back to login
              </Link>
            </div>
          </>
        ) : (
          <>
            {/* Success State */}
            <div className="flex flex-col items-center text-center space-y-4">

              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <MailCheck className="text-primary" />
              </div>

              <h2 className="text-xl font-semibold">
                Check your email
              </h2>

              <p className="text-sm text-muted-foreground max-w-xs">
                We’ve sent a password reset link. Please check your inbox and follow the instructions.
              </p>

              <button
                onClick={() => router.push("/login")}
                className="mt-4 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition"
              >
                Back to Login
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  )
}