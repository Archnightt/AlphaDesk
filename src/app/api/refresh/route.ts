import { NextResponse } from "next/server";
import { updateMarketData } from "@/lib/ingest";

export async function GET() {
	try {
		await updateMarketData();
		return NextResponse.json({ success: true, message: "Market data updated" });
	} catch (error) {
		return NextResponse.json({ success: false, error: "Failed to update" }, { status: 500 });
	}
}
