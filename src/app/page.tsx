import { fetchAllNews } from '@/lib/news';
import NewsCard from '@/components/NewsCard';
import CategoryFilter from '@/components/CategoryFilter';
import RegionFilter from '@/components/RegionFilter';
import Link from 'next/link';
import { TrendingUp, Clock, Globe } from 'lucide-react';
export const revalidate = 300
export default async function HomePage() {
  const articles = await fetchAllNews();
  const featuredArticle = articles[0];
  const latestArticles = articles.slice(1, 7);
  const trendingArticles = articles.slice(7, 13);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="mb-8">
        <div className="bg-gradient-to-r from-orange-500 via-white to-green-500 rounded-2xl p-6 md:p-8 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-3xl">🇮🇳</span>
            <span className="text-3xl">🌏</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Asia<span className="text-orange-500">News</span>
          </h1>
          <p className="text-gray-700 text-lg">
            Your premier source for news from India and across Asia
          </p>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="mb-8">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-5 h-5 text-orange-500 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">Featured Story</h2>
          </div>
          <NewsCard article={featuredArticle} variant="featured" />
        </section>
      )}

      {/* Filters */}
      <section className="mb-8">
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <h3 className="text-sm font-semibold text-gray-500 mb-3">Filter by Category</h3>
          <CategoryFilter />
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="text-sm font-semibold text-gray-500 mb-3">Filter by Region</h3>
          <RegionFilter />
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Latest News */}
        <div className="lg:col-span-2">
          <div className="flex items-center mb-4">
            <Clock className="w-5 h-5 text-blue-500 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">Latest News</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {latestArticles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
          <Link
            href="/latest"
            className="inline-flex items-center mt-6 px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors font-medium"
          >
            View All Latest News
          </Link>
        </div>

        {/* Trending & Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-5 h-5 text-red-500 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">Trending</h2>
            </div>
            <div className="space-y-1">
              {trendingArticles.slice(0, 5).map((article, index) => (
                <Link
                  key={article.id}
                  href={`/article/${article.id}`}
                  className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl font-bold text-orange-500">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {article.source} · {article.category}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Globe className="w-5 h-5 text-green-500 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">Regions</h2>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/region/india"
                className="p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors text-center"
              >
                <span className="text-2xl">🇮🇳</span>
                <p className="text-sm font-medium mt-1">India</p>
              </Link>
              <Link
                href="/region/china"
                className="p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors text-center"
              >
                <span className="text-2xl">🇨🇳</span>
                <p className="text-sm font-medium mt-1">China</p>
              </Link>
              <Link
                href="/region/japan"
                className="p-3 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors text-center"
              >
                <span className="text-2xl">🇯🇵</span>
                <p className="text-sm font-medium mt-1">Japan</p>
              </Link>
              <Link
                href="/region/south-korea"
                className="p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-center"
              >
                <span className="text-2xl">🇰🇷</span>
                <p className="text-sm font-medium mt-1">S. Korea</p>
              </Link>
              <Link
                href="/region/southeast-asia"
                className="p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-center col-span-2"
              >
                <span className="text-2xl">🌏</span>
                <p className="text-sm font-medium mt-1">Southeast Asia</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
