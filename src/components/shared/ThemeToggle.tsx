"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle dark mode"
      className="w-9 h-9 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary/5 transition-colors text-base"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
