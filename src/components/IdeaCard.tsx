"use client";

import { useState } from "react";

type Idea = {
  id: string;
  text: string;
  upvotes: number;
  createdAt: string;
};

type Props = {
  idea: Idea;
  onUpvoted?: () => void;
};

export default function IdeaCard({ idea, onUpvoted }: Props) {
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function upvote() {
    if (hasUpvoted || isSubmitting) return;
    setHasUpvoted(true);
    setIsSubmitting(true);
    try {
      await fetch(`/api/ideas/${idea.id}/upvote`, { method: "POST" });
      onUpvoted?.();
    } finally {
      setIsSubmitting(false);
    }
  }

  const date = new Date(idea.createdAt);

  return (
    <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 bg-white dark:bg-neutral-900 flex flex-col gap-3">
      <p className="text-neutral-800 dark:text-neutral-200 leading-relaxed">{idea.text}</p>
      <div className="flex items-center justify-between text-sm text-neutral-500">
        <span>{date.toLocaleString()}</span>
        <button
          onClick={upvote}
          disabled={hasUpvoted || isSubmitting}
          aria-pressed={hasUpvoted}
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 active:scale-[0.98] ${
            hasUpvoted
              ? "cursor-not-allowed bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-700 dark:from-emerald-900/30 dark:to-emerald-800/30 dark:text-emerald-300"
              : "cursor-pointer bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 dark:from-indigo-900/30 dark:to-blue-900/30 dark:text-indigo-200 hover:from-indigo-100 hover:to-blue-100 dark:hover:from-indigo-800/40 dark:hover:to-blue-800/40 hover:shadow-md"
          }`}
          title={hasUpvoted ? "You already upvoted" : "Upvote"}
        >
          {isSubmitting ? (
            <span className="h-3 w-3 rounded-full border-2 border-current border-t-transparent animate-spin" />
          ) : (
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
              className="drop-shadow-sm"
            >
              <path d="M12 4l8 12H4z" />
            </svg>
          )}
          <span>{idea.upvotes}</span>
        </button>
      </div>
    </div>
  );
}


