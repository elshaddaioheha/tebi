"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || searchParams.get("callbackUrl") || "/academy/dashboard";
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password.");
    } else {
      router.push(redirectTo);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <p className="text-red-500 text-sm text-center bg-red-50 py-3 px-4 rounded-xl">
          {error}
        </p>
      )}
      <div>
        <label className="block text-sm font-semibold text-primary mb-1.5">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-primary/15 rounded-xl bg-surface text-primary outline-none focus:border-secondary transition-colors"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-primary mb-1.5">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-primary/15 rounded-xl bg-surface text-primary outline-none focus:border-secondary transition-colors"
          placeholder="••••••••"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-brand text-white font-bold rounded-full hover:bg-brand-light active:scale-95 transition-all duration-300 disabled:opacity-60 cursor-pointer"
      >
        {loading ? "Signing in…" : "Sign In"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <Image src="/tebi-logo.png" alt="TEBI" fill className="object-contain" />
          </div>
          <h1 className="text-3xl font-serif text-primary">Welcome back</h1>
          <p className="text-primary/60 mt-2">Sign in to continue learning.</p>
        </div>

        <Suspense fallback={<div className="text-center py-4 text-primary/60">Loading...</div>}>
          <LoginForm />
        </Suspense>

        <p className="text-center text-primary/60 text-sm mt-8">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-secondary font-semibold hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
