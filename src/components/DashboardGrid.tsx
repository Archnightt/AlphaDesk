import { StockCard } from "./StockCard";

interface Stock {
	symbol: string;
	name: string;
	price: number;
	change: number;
	// Make other fields optional to prevent crashes if they are missing
	sector?: string | null;
	automated?: boolean;
}

export function DashboardGrid({ stocks }: { stocks: Stock[] }) {
	if (!stocks || stocks.length === 0) {
		return <div className="text-gray-400">No stocks available to display.</div>;
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{stocks.map((stock) => (
				<StockCard key={stock.symbol} stock={stock} />
			))}
		</div>
	);
}
