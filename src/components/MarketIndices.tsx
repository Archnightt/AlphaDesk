import yahooFinance from 'yahoo-finance2';
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

async function getIndices() {
  try {
    // @ts-ignore
    const yf = new yahooFinance();
    const results = await yf.quote(['^GSPC', '^IXIC', '^DJI', '^NSEI', '^BSESN']);
    return results;
  } catch (error) {
    console.error("Failed to fetch indices", error);
    return [];
  }
}

export async function MarketIndices() {
  const indices = await getIndices();

  if (!indices.length) return null;

  const getName = (symbol: string) => {
    const map: Record<string, string> = {
      '^GSPC': 'S&P 500',
      '^IXIC': 'Nasdaq',
      '^DJI': 'Dow 30',
      '^NSEI': 'Nifty 50',
      '^BSESN': 'Sensex'
    };
    return map[symbol] || symbol;
  };

  return (
    // FIX: Use flex-row with overflow-auto to force horizontal layout
    <div className="flex flex-row gap-4 overflow-x-auto pb-2 mb-6 w-full no-scrollbar">
      {indices.map((index) => {
        const isPositive = (index.regularMarketChangePercent || 0) > 0;
        return (
          <Card 
            key={index.symbol} 
            // FIX: min-w-[160px] prevents squishing. flex-1 ensures they fill width if space allows.
            className="min-w-[160px] flex-1 p-4 border-0 bg-secondary/30 flex flex-col justify-between hover:bg-secondary/50 transition-colors shrink-0"
          >
            <div className="text-sm font-medium text-muted-foreground whitespace-nowrap">
              {getName(index.symbol)}
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-xl font-bold">
                {index.regularMarketPrice?.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
            <div className={`text-xs font-medium mt-1 flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {index.regularMarketChangePercent?.toFixed(2)}%
            </div>
          </Card>
        );
      })}
    </div>
  );
}
