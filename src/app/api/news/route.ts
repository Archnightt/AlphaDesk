import { NextResponse } from "next/server";
import { getFullNewsFeed } from "@/lib/news";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const count = parseInt(searchParams.get("count") || "20");
  // Default to "US Markets" if no category is sent
  const category = searchParams.get("category") || "US Markets";

  const news = await getFullNewsFeed(count, category);
  return NextResponse.json(news);
}