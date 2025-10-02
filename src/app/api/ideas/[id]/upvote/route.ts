import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const updated = await prisma.idea.update({
      where: { id },
      data: { upvotes: { increment: 1 } },
    });
    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Idea not found" }, { status: 404 });
  }
}


