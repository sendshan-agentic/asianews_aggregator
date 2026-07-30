import { fetchAllNews } from '@/lib/news';
import NewsCard from '@/components/NewsCard';
import CategoryFilter from '@/components/CategoryFilter';
import { Metadata } from 'next';
export const revalidate = 300
export const metadata: Metadata = {
  title: 'Latest News - AsiaNews',
  description: 'The latest news from India and Asia',
};

export default async function LatestPage() {
  const articles = await fetchAllNews();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Latest News</h1>
        <p className="text-gray-600">
          All the latest news from India and across Asia
        </p>
      </div>

      <div className="mb-6">
        <CategoryFilter />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>

      {articles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No articles available. Check back later!
          </p>
        </div>
      )}
    </div>
  );
}
