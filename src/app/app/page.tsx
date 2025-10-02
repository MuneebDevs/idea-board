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
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold">The Idea Board</h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-300">
          Share ideas anonymously. Upvote what resonates.
        </p>

        <div className="mt-6">
          <IdeaForm onSubmitted={load} />
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            <div className="text-neutral-500">Loading ideas...</div>
          ) : ideas.length === 0 ? (
            <div className="text-neutral-500">No ideas yet. Be the first!</div>
          ) : (
            ideas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} onUpvoted={load} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}


