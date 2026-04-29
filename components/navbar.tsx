"use client";

import Link from "next/link";
import {
ShoppingCart,
Sun,
Moon,
Menu,
X,
LogOut,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";


type UserType = {
id: string;
email: string;
role: "ADMIN" | "USER";
};

export function Navbar() {
  const [user, setUser] = useState<UserType | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  /* ---------------- USER ---------------- */
  useEffect(() => {
  const supabase = createClient();

  const getUserData = async () => {
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser) {
      setUser(null);
      return;
    }

    try {
      const res = await fetch("/api/test-auth");
      const data = await res.json();
      res.ok ? setUser(data.user) : setUser(null);
    } catch {
      setUser(null);
    }
  };

  // Initial load
  getUserData();

  // ✅ Correct listener
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(() => {
    getUserData();
  });

  return () => subscription.unsubscribe();
}, []);

  /* ---------------- CART ---------------- */
useEffect(() => {
  const fetchCartCount = async () => {
    try {
      const res = await fetch("/api/cart");
      const data = await res.json();

      if (data.success && data.cart) {
        const count = data.cart.items.reduce(
          (sum: number, item: any) => sum + item.quantity,
          0
        );
        setCartCount(count);
      } else {
        setCartCount(0);
      }
    } catch (err) {
      console.error("Failed to fetch cart count");
    }
  };

  fetchCartCount();
}, []);

  /* ---------------- DROPDOWN ---------------- */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setDropdownOpen(false);
    router.push("/login");
    router.refresh();
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products?cat=all", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/blogs", label: "Blogs" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/logo_transparent.png" alt="logo" width={44} height={44} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden gap-6 text-sm font-medium text-foreground md:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-primary">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            

            {/* Cart */}
            <div className="relative">
              <button
                onClick={() => router.push("/cart")}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-border transition hover:bg-muted"
              >
                <ShoppingCart size={16} />
              </button>

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 rounded-full bg-primary px-1.5 py-0.5 text-[10px] text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </div>

            {/* Auth */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 rounded-xl px-2 py-1 transition hover:bg-muted"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {user.email.charAt(0).toUpperCase()}
                  </div>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-12 z-50 w-48 rounded-xl border border-border bg-background p-2 shadow-lg">
                    <p className="px-2 text-sm">{user.email}</p>

                    <Link
                      href={user.role === "ADMIN" ? "/admin" : "/dashboard"}
                      className="block rounded px-2 py-2 text-sm hover:bg-muted"
                    >
                      Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded px-2 py-2 text-sm text-red-500 hover:bg-muted"
                    >
                      <LogOut size={14} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden h-9 items-center rounded-xl border border-border px-4 text-sm transition hover:bg-muted sm:flex"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-border md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur md:hidden">
          <div className="flex h-full flex-col items-center justify-center gap-6 text-lg font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-foreground transition hover:text-primary"
              >
                {link.label}
              </Link>
            ))}

            {!user && (
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="rounded-full border border-border px-6 py-2 text-sm"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
