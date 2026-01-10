import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ingestTicker } from '@/lib/ingest';
import yahooFinance from 'yahoo-finance2';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { symbol } = body;

    if (!symbol) {
      return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });
    }

    const upperSymbol = symbol.toUpperCase();

    // 1. Fetch Company Name (Validation)
    let name = upperSymbol;
    try {
      const quote = await yahooFinance.quote(upperSymbol);
      if (quote.longName) {
        name = quote.longName;
      } else if (quote.shortName) {
        name = quote.shortName;
      }
    } catch (e) {
      console.warn(`Could not validate symbol ${upperSymbol} with Yahoo.`, e);
      // Optional: Return error if strict validation is desired
    }

    // 2. Create in DB
    const newStock = await prisma.stock.create({
      data: {
        symbol: upperSymbol,
        name: name,
        price: 0,
        change: 0,
      },
    });

    // 3. Trigger Ingestion Immediately (Background or Await)
    // We await it so the user sees data immediately on refresh
    await ingestTicker(upperSymbol);

    // 4. Fetch the fully updated record
    const updatedStock = await prisma.stock.findUnique({
      where: { symbol: upperSymbol },
    });

    return NextResponse.json(updatedStock || newStock);
  } catch (error: any) {
    if (error.code === 'P2002') { // Prisma unique constraint error
      return NextResponse.json({ error: 'Stock already in watchlist' }, { status: 409 });
    }
    console.error('Error adding stock:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol');

    if (!symbol) {
      return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });
    }

    await prisma.stock.delete({
      where: { symbol: symbol.toUpperCase() },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting stock:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
