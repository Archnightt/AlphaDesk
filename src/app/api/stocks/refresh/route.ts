import { NextResponse } from 'next/server';
import { ingestTicker } from '@/lib/ingest';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { symbol } = body;

    if (!symbol) {
      return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });
    }

    const updatedStock = await ingestTicker(symbol, true);

    if (!updatedStock) {
      return NextResponse.json({ error: 'Failed to refresh stock' }, { status: 500 });
    }

    return NextResponse.json(updatedStock);
  } catch (error) {
    console.error('Refresh API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
