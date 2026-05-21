"use client";
import { useEffect, useState } from "react";

const TAGS = [
  "Build a real business, not just bookings.",
  "Pricing that reflects your value.",
  "Systems that free up your time.",
  "CEO thinking, not freelancer hustle.",
  "Structure first. Growth follows.",
];

export default function TaglineCarousel() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % TAGS.length);
        setVisible(true);
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      aria-live="polite"
      className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-secondary border border-secondary/30 rounded-full bg-secondary/5 min-w-[280px] text-center"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(24px)",
        transition: "opacity 0.35s ease, transform 0.35s ease",
      }}
    >
      {TAGS[index]}
    </span>
  );
}
