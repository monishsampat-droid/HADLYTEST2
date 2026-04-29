"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Eye, EyeOff, Loader2 } from "lucide-react"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClient } from "@/lib/supabase/client"

const supabase = createClient()

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

const signupSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type LoginFormValues = z.infer<typeof loginSchema>
type SignupFormValues = z.infer<typeof signupSchema>
type AuthFormValues = LoginFormValues | SignupFormValues

export function AuthForm({
  type,
}: {
  type: "login" | "signup"
}) {
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(type === "login" ? loginSchema : signupSchema),
    defaultValues:
      type === "login"
        ? { email: "", password: "" }
        : { name: "", email: "", password: "" },
  })

  const onSubmit = async (data: AuthFormValues) => {
    try {
      if (type === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        })

        if (error) throw error

        window.location.href = "/"
        return
      }

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (!res.ok) throw new Error(result.error)

      window.location.href = "/login"
    } catch (err: any) {
      console.error("AUTH ERROR:", err)
      alert(err.message)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto bg-card text-card-foreground border border-border rounded-3xl p-6 md:p-8 shadow-xl backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="flex justify-center mb-6">
        <Image
          src="/logo_transparent.png"
          alt="Hadly Logo"
          width={60}
          height={60}
        />
      </div>

      <div className="text-center mb-8 space-y-1">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Welcome to HADLY
        </h1>
        <p className="text-sm text-muted-foreground">
          {type === "login"
            ? "Sign in to continue"
            : "Create your account to get started"}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {type === "signup" && (
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Full Name</label>
            <input
              {...register("name")}
              placeholder="John Doe"
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            />
            {"name" in errors && errors.name && (
              <p className="text-xs text-red-500">
                {errors.name.message as string}
              </p>
            )}
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Email</label>
          <input
            {...register("email")}
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
          />
          {errors.email && (
            <p className="text-xs text-red-500">
              {errors.email.message as string}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Password</label>

          <div className="relative">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full rounded-xl border border-input bg-background px-4 py-3 pr-10 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {errors.password && (
            <p className="text-xs text-red-500">
              {errors.password.message as string}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
        >
          {isSubmitting && <Loader2 className="animate-spin" size={16} />}
          {type === "login" ? "Sign In" : "Create Account"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        {type === "login" ? (
          <>
            Don’t have an account?{" "}
            <Link href="/signup" className="text-primary font-medium">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium">
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
