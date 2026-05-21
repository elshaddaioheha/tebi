"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

interface Props {
  lessonId: string;
  initialCompleted: boolean;
}

export default function MarkCompleteButton({ lessonId, initialCompleted }: Props) {
  const [completed, setCompleted] = useState(initialCompleted);
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (completed || loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId }),
      });
      if (res.ok) setCompleted(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={completed || loading}
      className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all ${
        completed
          ? "bg-green-500/10 text-green-600 cursor-default"
          : "bg-primary text-white hover:bg-primary-light active:scale-95"
      } disabled:opacity-60`}
    >
      <CheckCircle2 size={18} />
      {loading ? "Saving…" : completed ? "Completed" : "Mark as Complete"}
    </button>
  );
}
