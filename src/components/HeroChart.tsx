"use client"

import { PriceChart } from "./PriceChart"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function HeroChart({ data, symbol, name }: { data: any[], symbol: string, name: string }) {
  return (
		<Card className="h-full bg-secondary/10 flex flex-col">
			<CardHeader className="flex flex-row items-center justify-between py-4">
				<CardTitle className="text-lg font-bold">
					{name || symbol || "Market Mover"}
					<span className="text-muted-foreground ml-2 text-sm font-normal">({symbol || "AAPL"})</span>
				</CardTitle>
				<span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">30 Day Trend</span>
			</CardHeader>
			<CardContent className="flex-1 pb-4">
				<PriceChart data={data || []} />
			</CardContent>
		</Card>
	);
}