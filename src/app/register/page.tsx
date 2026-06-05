"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Something went wrong.");
      return;
    }

    router.push("/login?registered=1");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <Image src="/tebi-logo.png" alt="TEBI" fill className="object-contain" />
          </div>
          <h1 className="text-3xl font-serif text-primary">Create your account</h1>
          <p className="text-primary/60 mt-2">Start your journey to business mastery.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <p className="text-red-500 text-sm text-center bg-red-50 py-3 px-4 rounded-xl">
              {error}
            </p>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-primary mb-1.5">First Name</label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 border border-primary/15 rounded-xl bg-surface text-primary outline-none focus:border-secondary transition-colors"
                placeholder="First name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-primary mb-1.5">Last Name</label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3 border border-primary/15 rounded-xl bg-surface text-primary outline-none focus:border-secondary transition-colors"
                placeholder="Last name"
              />
            </div>
          </div>
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
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-primary/15 rounded-xl bg-surface text-primary outline-none focus:border-secondary transition-colors"
              placeholder="At least 8 characters"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-brand text-white font-bold rounded-full hover:bg-brand-light active:scale-95 transition-all disabled:opacity-60"
          >
            {loading ? "Creating account…" : "Create Account"}
          </button>
        </form>

        <p className="text-center text-primary/60 text-sm mt-8">
          Already have an account?{" "}
          <Link href="/login" className="text-secondary font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
