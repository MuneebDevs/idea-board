"use client";

import { useState } from "react";

type Props = { onSubmitted?: () => void };

export default function IdeaForm({ onSubmitted }: Props) {
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const remaining = 280 - text.length;

  async function submit() {
    const payload = text.trim().slice(0, 280);
    if (!payload) return;
    setSubmitting(true);
    try {
      await fetch("/api/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: payload }),
      });
      setText("");
      onSubmitted?.();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-sm">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value.slice(0, 280))}
        placeholder="Share your idea..."
        className="w-full h-28 resize-none rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent p-3 outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="mt-2 flex items-center justify-between text-sm">
        <span className={remaining < 0 ? "text-red-500" : "text-neutral-500"}>{remaining} chars left</span>
        <button
          onClick={submit}
          disabled={submitting || text.trim().length === 0}
          className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white px-4 py-2 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500/60 cursor-pointer"
        >
          {submitting && (
            <span className="h-4 w-4 rounded-full border-2 border-white/80 border-t-transparent animate-spin" />
          )}
          {submitting ? "Submitting..." : "Submit Idea"}
        </button>
      </div>
    </div>
  );
}


