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
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 ${
            hasUpvoted
              ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 cursor-not-allowed"
              : "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700"
          }`}
          title={hasUpvoted ? "You already upvoted" : "Upvote"}
        >
          {isSubmitting ? (
            <span className="h-3 w-3 rounded-full border-2 border-current border-t-transparent animate-spin" />
          ) : (
            <span>▲</span>
          )}
          <span>{idea.upvotes}</span>
        </button>
      </div>
    </div>
  );
}


