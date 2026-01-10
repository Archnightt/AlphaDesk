import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

export async function generateNarrative(
  symbol: string, 
  change: number, 
  price: number, 
  headlines: string[] = []
) {
  // 1. Fallback for Rate Limits or Missing Key
  if (!genAI) {
     // Smart Fallback Logic
     if (Math.abs(change) < 0.5) return `${symbol} is trading flat at $${price}, consolidating near recent levels.`;
     if (change > 0) return `${symbol} gains ${change.toFixed(2)}% to $${price} amid positive market sentiment.`;
     return `${symbol} slips ${Math.abs(change).toFixed(2)}% to $${price} on broad sector weakness.`;
  }

  const direction = change > 0 ? "UP" : "DOWN";
  const absChange = Math.abs(change);
  const percent = absChange.toFixed(2);
  const headlineContext = headlines.length > 0 ? headlines.join("; ") : "No specific headlines.";

  // 2. Determine Prompt Context based on Magnitude
  let contextNote = "";
  if (absChange > 3) {
    contextNote = "This is a SIGNIFICANT movement. You MUST reference a specific catalyst (earnings, macro event, or technical break). Use strong verbs.";
  } else if (absChange < 0.5) {
    contextNote = "This is minimal movement. Acknowledge range-bound trading/consolidation. Do not invent a catalyst.";
  } else {
    contextNote = "This is moderate movement. Balance attribution with technical context.";
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      You are a Senior Market Analyst.
      STOCK: ${symbol}
      PRICE: $${price}
      MOVE: ${direction} ${percent}%
      HEADLINES: ${headlineContext}
      CONTEXT: ${contextNote}

      Task: Write a 2-sentence market narrative (max 45 words).
      - Sentence 1 (Attribution): Explain *why* it moved. Cite a headline if relevant. Use specific attribution language ("appears driven by", "following reports of").
      - Sentence 2 (Psychology): Describe investor behavior ("taking profits", "buying the dip", "cautious positioning").
      - Constraint: NEVER say "general market volatility" unless the move is <0.5%.
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text().replace(/\n/g, ' ').trim();

  } catch (error) {
    console.error(`Gemini Error for ${symbol}:`, error);
    // Return Smart Fallback on Error
    if (Math.abs(change) < 0.5) return `${symbol} holds steady at $${price} in quiet trading.`;
    return `${symbol} moves ${change.toFixed(2)}% to $${price}.`;
  }
}