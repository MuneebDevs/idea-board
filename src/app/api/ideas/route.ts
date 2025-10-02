import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const ideas = await prisma.idea.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(ideas);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const textRaw = typeof body?.text === "string" ? body.text : "";
  const text = textRaw.trim().slice(0, 280);
  if (!text) {
    return NextResponse.json({ error: "Text is required" }, { status: 400 });
  }
  const idea = await prisma.idea.create({ data: { text } });
  return NextResponse.json(idea, { status: 201 });
}


