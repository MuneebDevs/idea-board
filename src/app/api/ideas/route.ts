import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const ideas = await prisma.idea.findMany({
      orderBy: [
        { upvotes: "desc" },
        { createdAt: "desc" },
      ],
    });
    return new NextResponse(JSON.stringify(ideas), {
      status: 200,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch ideas" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const textRaw = typeof body?.text === "string" ? body.text : "";
    const text = textRaw.trim().slice(0, 280);
    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }
    const idea = await prisma.idea.create({ data: { text } });
    return NextResponse.json(idea, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create idea" }, { status: 500 });
  }
}


