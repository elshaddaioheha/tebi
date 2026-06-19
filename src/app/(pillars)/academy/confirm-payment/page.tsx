"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Loader2 } from "lucide-react";
import { Card, Button, InputField, AlertBlock } from "@/components/global/UI";

function ConfirmPaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [reference, setReference] = useState("");
  const [verifying, setVerifying] = useState(true);
  const [verifyError, setVerifyError] = useState("");
  
  // Prefilled registration details from Paystack metadata
  const [details, setDetails] = useState({
    courseId: "",
    email: "",
    firstName: "",
    lastName: "",
  });

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Sync reference from search parameters
  useEffect(() => {
    const ref = searchParams.get("reference") || searchParams.get("trs_ref");
    if (ref) {
      setReference(ref);
    } else {
      // In development mode, provide a mock button/fallback to inspect
      setVerifying(false);
    }
  }, [searchParams]);

  // Fetch transaction details
  useEffect(() => {
    if (!reference) return;

    async function checkTransaction() {
      setVerifying(true);
      setVerifyError("");
      try {
        const res = await fetch(`/api/payments/check-reference?reference=${reference}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error ?? "Failed to verify payment details.");
        }
        setDetails({
          courseId: data.metadata.courseId,
          email: data.metadata.email,
          firstName: data.metadata.firstName,
          lastName: data.metadata.lastName,
        });
      } catch (err: any) {
        setVerifyError(err.message ?? "Invalid transaction verification.");
      } finally {
        setVerifying(false);
      }
    }

    checkTransaction();
  }, [reference]);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register-enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: details.email,
          firstName: details.firstName,
          lastName: details.lastName,
          password,
          reference,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Failed to create account.");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push(`/login?registered=1&email=${encodeURIComponent(details.email)}`);
      }, 3000);
    } catch (err: any) {
      setError(err.message ?? "Registration failed.");
      setLoading(false);
    }
  }

  // Handle Mock checkout trigger for developer inspection
  function handleMockTrigger(courseSlug: string) {
    const mockRef = `dev-test-ref_${courseSlug}_${Date.now()}`;
    setReference(mockRef);
  }

  if (verifying) {
    return (
      <div className="text-center py-24 space-y-4">
        <Loader2 className="w-12 h-12 animate-spin mx-auto text-secondary" />
        <h2 className="text-xl font-semibold text-primary">Verifying transaction details...</h2>
        <p className="text-primary/60 text-sm">Please do not close this browser tab.</p>
      </div>
    );
  }

  if (verifyError) {
    return (
      <Card className="max-w-md mx-auto text-center space-y-6">
        <AlertBlock message={verifyError} type="error" />
        <h3 className="text-xl font-bold text-primary">Transaction Issue</h3>
        <p className="text-sm text-primary/60 leading-relaxed">
          We could not verify your Paystack payment reference. If you have been debited, please contact Emma Collins support.
        </p>
        <Link href="/academy" className="inline-block px-6 py-3 bg-brand text-white rounded-full font-bold hover:bg-brand-light">
          Return to Academy
        </Link>
      </Card>
    );
  }

  // Developer inspection placeholder if no reference passed
  if (!reference) {
    return (
      <Card className="max-w-2xl mx-auto text-center space-y-6">
        <ShieldCheck className="w-12 h-12 text-yellow-500 mx-auto" />
        <h3 className="text-2xl font-serif text-primary">Dev Inspect: Confirm Payment View</h3>
        <p className="text-sm text-primary/60 leading-relaxed max-w-md mx-auto">
          No Paystack transaction reference was found in the URL. Select a course to simulate a successful payment redirection:
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 max-w-lg mx-auto">
          <Button variant="outline" onClick={() => handleMockTrigger("intro-to-event-planning")}>
            Simulate Introduction (₦14,000)
          </Button>
          <Button variant="outline" onClick={() => handleMockTrigger("authority-event-planner")}>
            Simulate Professional (₦150,000)
          </Button>
          <Button variant="outline" onClick={() => handleMockTrigger("authority-event-planner-mastery")}>
            Simulate Mastery (₦1,000,000)
          </Button>
        </div>
      </Card>
    );
  }

  if (success) {
    return (
      <Card className="max-w-md mx-auto text-center space-y-6 bg-green-50 border-green-200">
        <div className="flex justify-center">
          <CheckCircle2 className="w-16 h-16 text-green-500 animate-bounce" />
        </div>
        <h2 className="text-2xl font-serif text-green-800">Account Setup Successful!</h2>
        <p className="text-sm text-green-700 leading-relaxed">
          Your payment has been logged and your learner account is active. Redirecting you to login...
        </p>
      </Card>
    );
  }

  return (
    <Card className="max-w-lg mx-auto space-y-8 bg-surface">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-green-100 rounded-full text-green-600">
            <CheckCircle2 className="w-8 h-8" />
          </div>
        </div>
        <h2 className="text-3xl font-serif text-primary">Payment Verified</h2>
        <p className="text-sm text-primary/60 mt-1">Configure your login credentials to access your courses.</p>
      </div>

      {error && <AlertBlock message={error} type="error" />}

      <form onSubmit={handleRegister} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="First Name"
            type="text"
            disabled
            value={details.firstName}
            className="opacity-70"
          />
          <InputField
            label="Last Name"
            type="text"
            disabled
            value={details.lastName}
            className="opacity-70"
          />
        </div>

        <InputField
          label="Email Address"
          type="email"
          disabled
          value={details.email}
          className="opacity-70"
        />

        <InputField
          label="Create Password"
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 8 characters"
        />

        <Button
          type="submit"
          variant="secondary"
          loading={loading}
          className="w-full py-4 text-base"
        >
          Setup Account &amp; Access Course
        </Button>
      </form>
    </Card>
  );
}

export default function ConfirmPaymentPage() {
  return (
    <div className="min-h-screen bg-background py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <Image src="/tebi-logo.png" alt="TEBI" fill className="object-contain" />
          </div>
          <h1 className="text-2xl font-bold uppercase tracking-widest text-primary/40 font-body">TEBI Academy</h1>
        </div>

        <Suspense fallback={
          <div className="text-center py-24">
            <Loader2 className="w-12 h-12 animate-spin mx-auto text-secondary" />
            <p className="text-primary/60 text-sm mt-4">Loading verification components...</p>
          </div>
        }>
          <ConfirmPaymentContent />
        </Suspense>
      </div>
    </div>
  );
}
