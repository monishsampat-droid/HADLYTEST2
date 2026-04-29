"use client";

import Image from "next/image";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, CheckCircle } from "lucide-react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const supabase = createClient();

/* ---------------- VALIDATION ---------------- */

const schema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof schema>;

/* ---------------- COMPONENT ---------------- */

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const handleUpdate = async (data: FormValues) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      });

      if (error) throw error;

      setSuccess(true);

      setTimeout(() => {
        router.push("/login");
      }, 2000);
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
                Set New Password
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your new password below
              </p>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit(handleUpdate)}
              className="space-y-5"
            >
              {/* PASSWORD */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium">New Password</label>

                <div className="relative">
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 pr-10 text-sm 
                    outline-none transition
                    focus:ring-2 focus:ring-primary/40 focus:border-primary"
                  />

                  {/* Toggle */}
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold 
                transition-all hover:opacity-90 hover:shadow-md active:scale-[0.98]
                flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting && (
                  <Loader2 className="animate-spin" size={16} />
                )}
                Update Password
              </button>
            </form>
          </>
        ) : (
          <>
            {/* SUCCESS STATE */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="text-primary" />
              </div>

              <h2 className="text-xl font-semibold">
                Password Updated
              </h2>

              <p className="text-sm text-muted-foreground max-w-xs">
                Your password has been successfully updated. Redirecting to login...
              </p>
            </div>
          </>
        )}
      </div>
    </main>
  );
}