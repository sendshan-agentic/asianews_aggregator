import { CategoryConfig, RegionConfig, NewsSource, NewsCategory, Region } from '@/types/news';

export const CATEGORIES: CategoryConfig[] = [
  { id: 'politics', name: 'Politics', icon: 'Landmark', color: 'bg-red-500' },
  { id: 'business', name: 'Business', icon: 'TrendingUp', color: 'bg-green-500' },
  { id: 'technology', name: 'Technology', icon: 'Cpu', color: 'bg-blue-500' },
  { id: 'sports', name: 'Sports', icon: 'Trophy', color: 'bg-orange-500' },
  { id: 'entertainment', name: 'Entertainment', icon: 'Film', color: 'bg-pink-500' },
  { id: 'health', name: 'Health', icon: 'Heart', color: 'bg-rose-500' },
  { id: 'science', name: 'Science', icon: 'Atom', color: 'bg-purple-500' },
  { id: 'world', name: 'World', icon: 'Globe', color: 'bg-cyan-500' },
];

export const REGIONS: RegionConfig[] = [
  { id: 'india', name: 'India', flag: '🇮🇳' },
  { id: 'china', name: 'China', flag: '🇨🇳' },
  { id: 'japan', name: 'Japan', flag: '🇯🇵' },
  { id: 'south-korea', name: 'South Korea', flag: '🇰🇷' },
  { id: 'southeast-asia', name: 'Southeast Asia', flag: '🌏' },
  { id: 'south-asia', name: 'South Asia', flag: '🌍' },
  { id: 'central-asia', name: 'Central Asia', flag: '🏔️' },
  { id: 'asia-pacific', name: 'Asia Pacific', flag: '🌐' },
];

export const NEWS_SOURCES: NewsSource[] = [
  // India Sources
  {
    id: 'times-of-india',
    name: 'Times of India',
    url: 'https://timesofindia.indiatimes.com',
    rssUrl: 'https://timesofindia.indiatimes.com/rssfeedstopstories.cms',
    region: 'india',
    categories: ['politics', 'business', 'technology', 'sports', 'entertainment'],
  },
  {
    id: 'hindustan-times',
    name: 'Hindustan Times',
    url: 'https://www.hindustantimes.com',
    rssUrl: 'https://www.hindustantimes.com/feeds/rss/india-news/rssfeed.xml',
    region: 'india',
    categories: ['politics', 'business', 'technology'],
  },
  {
    id: 'ndtv',
    name: 'NDTV',
    url: 'https://www.ndtv.com',
    rssUrl: 'https://feeds.feedburner.com/ndtvnews-top-stories',
    region: 'india',
    categories: ['politics', 'business', 'technology', 'sports'],
  },
  {
    id: 'the-hindu',
    name: 'The Hindu',
    url: 'https://www.thehindu.com',
    rssUrl: 'https://www.thehindu.com/feeder/default.rss',
    region: 'india',
    categories: ['politics', 'business', 'science'],
  },
  // China Sources
  {
    id: 'xinhua',
    name: 'Xinhua News',
    url: 'https://www.news.cn',
    rssUrl: 'https://www.news.cn/english/rss/worldnews.xml',
    region: 'china',
    categories: ['politics', 'business', 'world'],
  },
  {
    id: 'global-times',
    name: 'Global Times',
    url: 'https://www.globaltimes.cn',
    rssUrl: 'https://www.globaltimes.cn/rss/outbrain.xml',
    region: 'china',
    categories: ['politics', 'business', 'technology'],
  },
  // Japan Sources
  {
    id: 'japan-times',
    name: 'Japan Times',
    url: 'https://www.japantimes.co.jp',
    rssUrl: 'https://www.japantimes.co.jp/feed/',
    region: 'japan',
    categories: ['politics', 'business', 'technology'],
  },
  // South Korea Sources
  {
    id: 'korea-herald',
    name: 'Korea Herald',
    url: 'http://www.koreaherald.com',
    rssUrl: 'http://www.koreaherald.com/rss/020200000000.xml',
    region: 'south-korea',
    categories: ['politics', 'business', 'technology'],
  },
  // Southeast Asia Sources
  {
    id: 'strait-times',
    name: 'Straits Times',
    url: 'https://www.straitstimes.com',
    rssUrl: 'https://www.straitstimes.com/news/asia/rss.xml',
    region: 'southeast-asia',
    categories: ['politics', 'business', 'technology'],
  },
  // Asia Pacific Sources
  {
    id: 'channel-news-asia',
    name: 'Channel News Asia',
    url: 'https://www.channelnewsasia.com',
    rssUrl: 'https://www.channelnewsasia.com/api/public/rss/asia',
    region: 'asia-pacific',
    categories: ['business', 'technology', 'politics'],
  },
];

export const getCategoryColor = (category: NewsCategory): string => {
  const colors: Record<NewsCategory, string> = {
    politics: 'bg-red-100 text-red-800',
    business: 'bg-green-100 text-green-800',
    technology: 'bg-blue-100 text-blue-800',
    sports: 'bg-orange-100 text-orange-800',
    entertainment: 'bg-pink-100 text-pink-800',
    health: 'bg-rose-100 text-rose-800',
    science: 'bg-purple-100 text-purple-800',
    world: 'bg-cyan-100 text-cyan-800',
  };
  return colors[category];
};

export const getRegionFlag = (region: Region): string => {
  const regionConfig = REGIONS.find(r => r.id === region);
  return regionConfig?.flag || '🌐';
};
