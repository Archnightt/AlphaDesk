"use client"

import { PriceChart } from "./PriceChart"

export function HeroChart({ data, symbol, name }: { data: any[], symbol: string, name: string }) {
  return (
    <div className="h-full bg-secondary/10 rounded-xl p-4 border border-border/50">
        <div className="flex items-center justify-between mb-4">
           <h3 className="font-bold text-lg">
             {name || symbol || "Market Mover"} 
             <span className="text-muted-foreground ml-2 text-sm">({symbol || "AAPL"})</span>
           </h3>
           <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">30 Day Trend</span>
        </div>
        <PriceChart data={data || []} />
    </div>
  )
}
