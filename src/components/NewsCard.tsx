'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Clock } from 'lucide-react';
import { NewsArticle } from '@/types/news';
import { getCategoryColor, getRegionFlag } from '@/lib/constants';
import { formatDistanceToNow } from 'date-fns';

interface NewsCardProps {
  article: NewsArticle;
  variant?: 'default' | 'compact' | 'featured';
}

function getImageSrc(url?: string): string {
  if (!url) return '/placeholder-news.jpg';
  return `/api/image-proxy?url=${encodeURIComponent(url)}`;
}

export default function NewsCard({ article, variant = 'default' }: NewsCardProps) {
  const timeAgo = formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true });

  if (variant === 'featured') {
    return (
      <Link href={`/article/${article.id}`} className="block group">
        <article className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
          <div className="relative h-64 md:h-96">
            <Image
              src={getImageSrc(article.imageUrl)}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-center space-x-2 mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                  {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                </span>
                <span className="text-sm opacity-90">{getRegionFlag(article.region)} {article.source}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-orange-300 transition-colors">
                {article.title}
              </h2>
              <p className="text-sm opacity-90 line-clamp-2">{article.description}</p>
              <div className="flex items-center mt-3 text-sm opacity-75">
                <Clock className="w-4 h-4 mr-1" />
                <span>{timeAgo}</span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link href={`/article/${article.id}`} className="block group">
        <article className="flex space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
            <Image
              src={getImageSrc(article.imageUrl)}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-orange-500 transition-colors">
              {article.title}
            </h3>
            <div className="flex items-center mt-1 text-xs text-gray-500">
              <span>{article.source}</span>
              <span className="mx-1">·</span>
              <span>{timeAgo}</span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/article/${article.id}`} className="block group">
      <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        <div className="relative h-48">
          <Image
            src={getImageSrc(article.imageUrl)}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
              {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
            </span>
          </div>
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors">
            {article.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
            {article.description}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-2">
              <span>{getRegionFlag(article.region)} {article.source}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              <span>{timeAgo}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
