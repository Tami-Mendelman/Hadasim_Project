import { NextResponse } from "next/server";
import { fetchCards } from "@/app/services/server/cards";

export const runtime = "nodejs";

export async function GET() {
  try {
    const cards = await fetchCards();
    return NextResponse.json(cards, { status: 200 });
  } catch (e) {
    console.error("GET /api/cards failed:", e); 
    return NextResponse.json({ error: "Failed to load cards" }, { status: 500 });
  }
}

