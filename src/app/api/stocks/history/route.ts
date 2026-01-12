import { NextResponse } from "next/server";
import yahooFinance from "yahoo-finance2";

// Helpers to map Range -> Interval/StartDate
function getIntervalForRange(range: string) {
	switch (range) {
		case "1d": return "5m";
		case "5d":
		case "1w": return "15m";
		case "1mo": return "90m";
		case "6mo": return "1d";
		case "ytd": return "1d";
		case "1y": return "1d";
		case "5y": return "1wk";
		default: return "1d";
	}
}

function getStartDate(range: string) {
	const now = new Date();
	switch (range) {
		case "1d":
			return new Date(now.setDate(now.getDate() - 4));
		case "1w":
		case "5d":
			return new Date(now.setDate(now.getDate() - 7));
		case "1mo":
			return new Date(now.setMonth(now.getMonth() - 1));
		case "6mo":
			return new Date(now.setMonth(now.getMonth() - 6));
		case "ytd":
			return new Date(new Date().getFullYear(), 0, 1);
		case "1y":
			return new Date(now.setFullYear(now.getFullYear() - 1));
		case "5y":
			return new Date(now.setFullYear(now.getFullYear() - 5));
		default:
			return new Date(now.setDate(now.getDate() - 4));
	}
}

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const rawSymbol = searchParams.get("symbol");
	const range = searchParams.get("range") || "1d";

	if (!rawSymbol) {
		return NextResponse.json({ error: "Symbol is required" }, { status: 400 });
	}

	const symbol = rawSymbol.toUpperCase();
	const interval = getIntervalForRange(range);

	try {
		// FIX: Correctly instantiate YahooFinance
		// @ts-ignore
		const yf = new yahooFinance();

		const queryOptions = {
			period1: getStartDate(range),
			interval: interval as any,
		};

		const result = await yf.chart(symbol, queryOptions);

		if (!result || !result.quotes || result.quotes.length === 0) {
			return NextResponse.json([]);
		}

		const history = result.quotes
			.filter((q: any) => q.date && (q.close || q.open))
			.map((quote: any) => ({
				time: quote.date,
				price: quote.close || quote.open,
			}));

		return NextResponse.json(history);
	} catch (error) {
		console.error(`History API Error for ${symbol}:`, error);
		return NextResponse.json([]);
	}
}