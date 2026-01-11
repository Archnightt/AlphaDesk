import yahooFinance from 'yahoo-finance2';

type Range = '1d' | '1w' | '1mo' | '1y';

export interface StockHistory {
  date: string;
  price: number | null;
}

export async function getStockHistory(symbol: string, range: Range = '1mo'): Promise<StockHistory[]> {
  try {
    const now = new Date();
    let period1 = new Date();
    let interval: '1d' | '5m' | '15m' | '1wk' | '1mo' = '1d';

    switch (range) {
      case '1d':
        period1.setDate(now.getDate() - 1); // actually usually needs to be start of day? YF handles '1d' range better via 'range' param often, but let's stick to period1 calculation or use library features.
        // For 1d, period1 needs to be 24h ago or start of trading. 
        // Yahoo chart API often takes 'range' directly. Let's try passing 'range' to query options if supported, 
        // or calculate period1 manually. 
        // Manual calc:
        period1 = new Date(now.getTime() - 24 * 60 * 60 * 1000); 
        interval = '5m';
        break;
      case '1w':
        period1.setDate(now.getDate() - 7);
        interval = '15m';
        break;
      case '1mo':
        period1.setDate(now.getDate() - 30);
        interval = '1d';
        break;
      case '1y':
        period1.setDate(now.getDate() - 365);
        interval = '1d';
        break;
      default:
        period1.setDate(now.getDate() - 30);
        interval = '1d';
    }

    // Instantiate manually to avoid singleton issues
    // @ts-ignore
    const yf = new yahooFinance();

    // Use chart() instead of historical()
    const result = await yf.chart(symbol, {
      period1,
      interval,
    });

    // The result structure is different for chart()
    // We need to access result.quotes
    if (!result || !result.quotes) return [];

    return result.quotes.map((day: any) => {
      const dateObj = new Date(day.date);
      let dateStr = dateObj.toISOString().split('T')[0];
      
      // If intraday, include time
      if (range === '1d' || range === '1w') {
        dateStr = dateObj.toLocaleString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            hour: 'numeric', 
            minute: '2-digit' 
        });
      }

      return {
        date: dateStr,
        price: day.close ? parseFloat(day.close.toFixed(2)) : null,
      };
    }).filter((d: any) => d.price !== null); // Filter out empty trading days

  } catch (error) {
    console.error(`Failed to fetch history for ${symbol}:`, error);
    return [];
  }
}
