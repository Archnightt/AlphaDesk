import yahooFinance from 'yahoo-finance2';

export interface NewsItem {
  uuid: string;
  title: string;
  publisher: string;
  link: string;
  providerPublishTime: number;
  thumbnail?: {
    resolutions: { url: string; width: number; height: number }[];
  };
  summary?: string; 
}

export async function getFullNewsFeed(count: number = 20, query: string = 'US Markets'): Promise<NewsItem[]> {
  try {
    // @ts-ignore
    const yf = new yahooFinance();
    
    console.log(`Fetching news for: ${query} (Count: ${count})`);

    const result = await yf.search(query, { 
      newsCount: count, 
      quotesCount: 0 
    });

    if (!result.news || result.news.length === 0) return [];

    return result.news.map((item: any) => ({
      uuid: item.uuid,
      title: item.title,
      publisher: item.publisher,
      link: item.link,
      providerPublishTime: item.providerPublishTime,
      thumbnail: item.thumbnail,
      summary: item.summary || item.snippet || "" 
    })) as NewsItem[];

  } catch (error) {
    console.error("Failed to fetch news:", error);
    return [];
  }
}

export async function getMarketNews(): Promise<NewsItem[]> {
   // Unify logic to ensure consistency across dashboard and news page
   return await getFullNewsFeed(10);
}