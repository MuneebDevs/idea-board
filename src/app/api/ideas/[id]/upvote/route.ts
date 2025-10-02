import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const updated = await prisma.idea.update({
      where: { id },
      data: { upvotes: { increment: 1 } },
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Idea not found" }, { status: 404 });
  }
}


