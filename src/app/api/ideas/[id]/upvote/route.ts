import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    console.log("Upvoting idea:", id);
    const updated = await prisma.idea.update({
      where: { id },
      data: { upvotes: { increment: 1 } },
    });
    console.log("Successfully upvoted idea:", updated.id, "new count:", updated.upvotes);
    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("Upvote error:", error);
    return NextResponse.json({ 
      error: "Idea not found",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 404 });
  }
}


