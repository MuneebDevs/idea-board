"use client";

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
  async function upvote() {
    await fetch(`/api/ideas/${idea.id}/upvote`, { method: "POST" });
    onUpvoted?.();
  }

  const date = new Date(idea.createdAt);

  return (
    <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 bg-white dark:bg-neutral-900 flex flex-col gap-3">
      <p className="text-neutral-800 dark:text-neutral-200 leading-relaxed">{idea.text}</p>
      <div className="flex items-center justify-between text-sm text-neutral-500">
        <span>{date.toLocaleString()}</span>
        <button
          onClick={upvote}
          className="inline-flex items-center gap-2 rounded-full bg-neutral-100 dark:bg-neutral-800 px-3 py-1 hover:bg-neutral-200 dark:hover:bg-neutral-700"
        >
          <span>▲</span>
          <span>{idea.upvotes}</span>
        </button>
      </div>
    </div>
  );
}


