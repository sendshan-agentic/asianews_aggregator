export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content?: string;
  url: string;
  imageUrl?: string;
  source: string;
  sourceLogo?: string;
  category: NewsCategory;
  publishedAt: string;
  region: Region;
  tags?: string[];
}

export type NewsCategory = 
  | 'politics'
  | 'business'
  | 'technology'
  | 'sports'
  | 'entertainment'
  | 'health'
  | 'science'
  | 'world';

export type Region = 
  | 'india'
  | 'china'
  | 'japan'
  | 'south-korea'
  | 'southeast-asia'
  | 'south-asia'
  | 'central-asia'
  | 'asia-pacific';

export interface NewsSource {
  id: string;
  name: string;
  url: string;
  rssUrl: string;
  region: Region;
  logo?: string;
  categories: NewsCategory[];
}

export interface CategoryConfig {
  id: NewsCategory;
  name: string;
  icon: string;
  color: string;
}

export interface RegionConfig {
  id: Region;
  name: string;
  flag: string;
}
