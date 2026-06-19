"use client";

import { useState, useEffect } from "react";
import { Lock } from "lucide-react";
import { Card, Button, Modal, InputField, AlertBlock } from "@/components/global/UI";

interface Props {
  courseId: string;
  courseTitle: string;
  price: number;
  isLoggedIn: boolean;
  userEmail?: string;
  userFirstName?: string;
  userLastName?: string;
}

export default function AnonymousEnrollmentCard({
  courseId,
  courseTitle,
  price,
  isLoggedIn,
  userEmail,
  userFirstName,
  userLastName,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paystackLoaded, setPaystackLoaded] = useState(false);
  
  const [form, setForm] = useState({
    firstName: userFirstName || "",
    lastName: userLastName || "",
    email: userEmail || "",
  });

  // Keep form state in sync with user props when they resolve/change
  useEffect(() => {
    setForm({
      firstName: userFirstName || "",
      lastName: userLastName || "",
      email: userEmail || "",
    });
  }, [userFirstName, userLastName, userEmail]);

  // Dynamically load the Paystack Inline SDK script to avoid redirects
  useEffect(() => {
    if (typeof (window as any).PaystackPop !== "undefined") {
      setPaystackLoaded(true);
      return;
    }
    
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v2/inline.js";
    script.async = true;
    script.onload = () => setPaystackLoaded(true);
    script.onerror = () => {
      console.error("[PAYMENTS] Failed to load Paystack Inline SDK.");
      setError("Failed to load payment gateway. Please refresh and try again.");
    };
    document.body.appendChild(script);
  }, []);

  async function handleCheckoutSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!paystackLoaded || typeof (window as any).PaystackPop === "undefined") {
      setError("Payment gateway is initializing. Please wait a moment.");
      setLoading(false);
      return;
    }

    try {
      const endpoint = isLoggedIn ? "/api/payments/initialize" : "/api/payments/initialize-anonymous";
      const payload = isLoggedIn ? { courseId } : { courseId, ...form };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseErr) {
        console.error("[PAYMENTS] Failed to parse JSON response:", text);
        throw new Error("Server returned an invalid response. Please verify the dev server logs.");
      }

      if (!res.ok) {
        throw new Error(data.error ?? "Failed to initialize payment.");
      }

      if (data.accessCode) {
        const paystack = new (window as any).PaystackPop();
        paystack.resumeTransaction(data.accessCode, {
          onSuccess: (trx: any) => {
            setIsModalOpen(false);
            if (isLoggedIn) {
              window.location.href = `/api/payments/verify?reference=${data.reference}`;
            } else {
              window.location.href = `/academy/confirm-payment?reference=${data.reference}`;
            }
          },
          onCancel: () => {
            setLoading(false);
          }
        });
      } else {
        throw new Error("Failed to retrieve payment authorization code.");
      }
    } catch (err: any) {
      console.error("[PAYMENTS] Checkout error:", err);
      setError(err.message ?? "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <>
      <Card hoverEffect={true} className="max-w-2xl mx-auto text-center bg-primary/[0.02]">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-secondary/10 rounded-full text-secondary">
            <Lock className="w-8 h-8" />
          </div>
        </div>
        
        <h3 className="text-2xl font-serif text-primary mb-3">Secure Course Enrollment</h3>
        <p className="text-primary/60 mb-6 text-sm leading-relaxed max-w-md mx-auto">
          Enroll in <strong>{courseTitle}</strong>. Get instant lifetime access to modules, exercises, video streams, and certification tracking.
        </p>

        <div className="max-w-xs mx-auto">
          <Button
            variant="secondary"
            onClick={() => setIsModalOpen(true)}
            className="w-full text-base py-4"
          >
            Buy Course — ₦{(price / 100).toLocaleString()}
          </Button>
        </div>

        {/* Unified Secure Checkout Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Secure Checkout"
        >
          <form onSubmit={handleCheckoutSubmit} className="space-y-5 text-left">
            {error && <AlertBlock message={error} type="error" />}
            
            <div className="mb-4 p-4 bg-primary/[0.02] border border-primary/5 rounded-2xl">
              <span className="text-xs text-primary/40 uppercase tracking-widest font-semibold">Course Selected</span>
              <h4 className="text-base font-serif text-primary font-bold mt-0.5">{courseTitle}</h4>
              <p className="text-sm font-semibold text-secondary mt-1">₦{(price / 100).toLocaleString()}</p>
            </div>

            <p className="text-sm text-primary/60 mb-2 leading-relaxed">
              {isLoggedIn 
                ? "Review your details to proceed to payment. You will have instant access after successful payment."
                : "Please enter your email and name to verify your payment. You will set up your academy login password immediately after checkout."
              }
            </p>

            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="First Name"
                type="text"
                required
                disabled={isLoggedIn}
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                placeholder="Emma"
                className={isLoggedIn ? "opacity-70" : ""}
              />
              <InputField
                label="Last Name"
                type="text"
                required
                disabled={isLoggedIn}
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                placeholder="Collins"
                className={isLoggedIn ? "opacity-70" : ""}
              />
            </div>

            <InputField
              label="Email Address"
              type="email"
              required
              disabled={isLoggedIn}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              className={isLoggedIn ? "opacity-70" : ""}
            />

            <Button
              type="submit"
              variant="primary"
              loading={loading}
              disabled={!paystackLoaded}
              className="w-full py-4 text-base"
            >
              {!paystackLoaded 
                ? "Loading Payment System..." 
                : `Pay ₦${(price / 100).toLocaleString()} Now`
              }
            </Button>
          </form>
        </Modal>
      </Card>
    </>
  );
}
