import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);
    console.log("POSTGRES_URL_NON_POOLING exists:", !!process.env.POSTGRES_URL_NON_POOLING);
    
    const ideas = await prisma.idea.findMany({
      orderBy: [
        { upvotes: "desc" },
        { createdAt: "desc" },
      ],
    });
    
    console.log("Successfully fetched ideas:", ideas.length);
    return new NextResponse(JSON.stringify(ideas), {
      status: 200,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ 
      error: "Failed to fetch ideas", 
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log("POST request received");
    const body = await req.json();
    const textRaw = typeof body?.text === "string" ? body.text : "";
    const text = textRaw.trim().slice(0, 280);
    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }
    const idea = await prisma.idea.create({ data: { text } });
    console.log("Successfully created idea:", idea.id);
    return NextResponse.json(idea, { status: 201 });
  } catch (error) {
    console.error("Create idea error:", error);
    return NextResponse.json({ 
      error: "Failed to create idea",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}


