import { fetchAllNews } from '@/lib/news';
import { getCategoryColor, getRegionFlag } from '@/lib/constants';
import NewsCard from '@/components/NewsCard';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, ExternalLink, ArrowLeft } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface ArticlePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { id } = await params;
  const articles = await fetchAllNews();
  const article = articles.find(a => a.id === id);
  
  if (!article) return { title: 'Article Not Found' };
  
  return {
    title: `${article.title} - AsiaNews`,
    description: article.description,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;
  const articles = await fetchAllNews();
  const article = articles.find(a => a.id === id);
  
  if (!article) {
    notFound();
  }

  const relatedArticles = articles
    .filter(a => a.id !== article.id && (a.category === article.category || a.region === article.region))
    .slice(0, 4);

  const timeAgo = formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center text-gray-600 hover:text-orange-500 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Article */}
        <article className="lg:col-span-2">
          {/* Article Header */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(article.category)}`}>
                {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
              </span>
              <span className="text-gray-500">
                {getRegionFlag(article.region)} {article.source}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {article.title}
            </h1>
            <div className="flex items-center text-gray-500 text-sm">
              <Clock className="w-4 h-4 mr-1" />
              <span>{timeAgo}</span>
              <span className="mx-2">·</span>
              <span>{article.source}</span>
            </div>
          </div>

          {/* Article Image */}
          <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-6">
            <Image
              src={article.imageUrl || '/placeholder-news.jpg'}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 mb-6">
              {article.description}
            </p>
            
            {article.content && (
              <div 
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            )}
          </div>

          {/* Read Original */}
          <div className="mt-8 p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600 mb-2">
              Read the full article on {article.source}:
            </p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors font-medium"
            >
              Read Original Article
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-500 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Related News</h2>
              <div className="space-y-4">
                {relatedArticles.map((relatedArticle) => (
                  <NewsCard key={relatedArticle.id} article={relatedArticle} variant="compact" />
                ))}
              </div>
            </div>
          )}

          {/* Source Info */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Source</h2>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-xl">{getRegionFlag(article.region)}</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{article.source}</p>
                <p className="text-sm text-gray-500">{article.region}</p>
              </div>
            </div>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block text-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Visit Website
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
