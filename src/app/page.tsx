export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { DashboardGrid } from "@/components/DashboardGrid";
import { AddStockForm } from "@/components/AddStockForm";
import { StockSearch } from "@/components/StockSearch";
import { ModeToggle } from "@/components/mode-toggle";
import { MarketIndices } from "@/components/MarketIndices";

export default async function Home() {
	console.log("🔍 PAGE LOAD: Attempting to fetch stocks...");

	const stocks = await prisma.stock.findMany({
		orderBy: { symbol: "asc" },
	});

	console.log(`📊 PAGE LOAD: Found ${stocks.length} stocks from DB.`);
	if (stocks.length > 0) {
		console.log("first stock sample:", stocks[0]);
	}

	return (
		<main className="min-h-screen pb-20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<MarketIndices />
				
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
					<div>
						<h2 className="text-3xl font-bold mb-2">Market Overview</h2>
						<p className="text-muted-foreground">Real-time AI analysis of your watchlist.</p>
					</div>
					<AddStockForm />
				</div>

				{/* Visual Debugger: If this shows up, the data is missing */}
				{stocks.length === 0 ? (
					<div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
						<strong>⚠️ Debug Info:</strong> Database returned 0 stocks.
					</div>
				) : (
					<DashboardGrid stocks={stocks} />
				)}
			</div>
		</main>
	);
}
