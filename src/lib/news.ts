import Parser from 'rss-parser';
import { NewsArticle, NewsCategory, Region } from '@/types/news';
import { NEWS_SOURCES } from './constants';

const parser = new Parser({
  timeout: 10000,
  headers: {
    'User-Agent': 'AsiaNews Aggregator/1.0',
  },
});

function categorizeArticle(title: string, description: string): NewsCategory {
  const text = `${title} ${description}`.toLowerCase();
  
  const keywords: Record<NewsCategory, string[]> = {
    politics: ['government', 'election', 'minister', 'parliament', 'president', 'prime minister', 'policy', 'political', 'democracy', 'vote'],
    business: ['economy', 'market', 'stock', 'business', 'trade', 'investment', 'gdp', 'finance', 'bank', 'industry'],
    technology: ['tech', 'ai', 'artificial intelligence', 'software', 'startup', 'digital', 'innovation', 'cyber', 'data'],
    sports: ['cricket', 'football', 'soccer', 'tennis', 'olympics', 'championship', 'tournament', 'match', 'player', 'team'],
    entertainment: ['bollywood', 'hollywood', 'movie', 'film', 'music', 'celebrity', 'actor', 'actress', 'entertainment'],
    health: ['health', 'medical', 'hospital', 'disease', 'vaccine', 'covid', 'wellness', 'mental health'],
    science: ['science', 'research', 'study', 'discovery', 'space', 'climate', 'environment', 'technology'],
    world: ['international', 'global', 'world', 'united nations', 'diplomatic', 'foreign'],
  };

  for (const [category, words] of Object.entries(keywords)) {
    if (words.some(word => text.includes(word))) {
      return category as NewsCategory;
    }
  }
  
  return 'world';
}

function extractImageFromContent(content?: string): string | undefined {
  if (!content) return undefined;
  const match = content.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : undefined;
}

function cleanHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').substring(0, 200) + '...';
}

export async function fetchNewsFromSource(sourceId: string): Promise<NewsArticle[]> {
  const source = NEWS_SOURCES.find(s => s.id === sourceId);
  if (!source) return [];

  try {
    const feed = await parser.parseURL(source.rssUrl);
    
    return (feed.items || []).slice(0, 10).map((item, index) => {
      const title = item.title || 'Untitled';
      const description = item.contentSnippet || item.content || '';
      
      return {
        id: `${sourceId}-${index}`,
        title,
        description: cleanHtml(description),
        content: item.content,
        url: item.link || source.url,
        imageUrl: item.enclosure?.url || extractImageFromContent(item.content) || 
          `https://picsum.photos/seed/${sourceId}${index}/800/400`,
        source: source.name,
        sourceLogo: source.logo,
        category: categorizeArticle(title, description),
        publishedAt: item.pubDate || new Date().toISOString(),
        region: source.region,
        tags: item.categories || [],
      };
    });
  } catch (error) {
    console.error(`Error fetching from ${source.name}:`, error);
    return [];
  }
}

export async function fetchAllNews(): Promise<NewsArticle[]> {
  const promises = NEWS_SOURCES.map(source => fetchNewsFromSource(source.id));
  const results = await Promise.allSettled(promises);
  
  const articles = results
    .filter((result): result is PromiseFulfilledResult<NewsArticle[]> => 
      result.status === 'fulfilled'
    )
    .flatMap(result => result.value);

  return articles.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function fetchNewsByCategory(category: NewsCategory): Promise<NewsArticle[]> {
  const allNews = await fetchAllNews();
  return allNews.filter(article => article.category === category);
}

export async function fetchNewsByRegion(region: Region): Promise<NewsArticle[]> {
  const allNews = await fetchAllNews();
  return allNews.filter(article => article.region === region);
}

export async function searchNews(query: string): Promise<NewsArticle[]> {
  const allNews = await fetchAllNews();
  const searchTerm = query.toLowerCase();
  
  return allNews.filter(article => 
    article.title.toLowerCase().includes(searchTerm) ||
    article.description.toLowerCase().includes(searchTerm) ||
    article.source.toLowerCase().includes(searchTerm)
  );
}

export function getFeaturedArticle(articles: NewsArticle[]): NewsArticle | undefined {
  return articles[0];
}

export function getRelatedArticles(articles: NewsArticle[], current: NewsArticle, limit = 4): NewsArticle[] {
  return articles
    .filter(a => a.id !== current.id && (a.category === current.category || a.region === current.region))
    .slice(0, limit);
}
