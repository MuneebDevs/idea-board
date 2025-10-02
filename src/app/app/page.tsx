"use client";

import { useEffect, useState } from "react";
import IdeaForm from "@/components/IdeaForm";
import IdeaCard from "@/components/IdeaCard";

type Idea = {
  id: string;
  text: string;
  upvotes: number;
  createdAt: string;
};

export default function IdeaBoardPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const res = await fetch("/api/ideas", { cache: "no-store" });
    const data = await res.json();
    setIdeas(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
      <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-950/60 border-b border-transparent">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-lg font-semibold">IdeaBoard</div>
          <a href="/" className="text-sm text-blue-600 hover:underline">Home</a>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">The Idea Board</h1>
            <p className="mt-2 text-neutral-600 dark:text-neutral-300">
              Share ideas anonymously. Upvote what resonates.
            </p>
          </div>
          <div className="text-sm text-neutral-500">Max 280 characters • Updates every 5s</div>
        </div>

        <div className="mt-6">
          <IdeaForm onSubmitted={load} />
        </div>

        <div className="mt-8">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-28 rounded-lg bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
              ))}
            </div>
          ) : ideas.length === 0 ? (
            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-10 text-center text-neutral-500">
              No ideas yet. Be the first!
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ideas.map((idea) => (
                <IdeaCard key={idea.id} idea={idea} onUpvoted={load} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


