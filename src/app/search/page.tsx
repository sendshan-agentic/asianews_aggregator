import { searchNews } from '@/lib/news';
import NewsCard from '@/components/NewsCard';
import SearchBar from '@/components/SearchBar';
import { Metadata } from 'next';
export const revalidate = 300
interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `Search: ${q} - AsiaNews` : 'Search - AsiaNews',
    description: `Search results for "${q}" in Asia news`,
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q: query } = await searchParams;
  const articles = query ? await searchNews(query) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Search News
        </h1>
        <SearchBar initialQuery={query || ''} />
      </div>

      {/* Search Results */}
      {query ? (
        <div>
          <p className="text-gray-600 mb-6">
            {articles.length} results for &ldquo;{query}&rdquo;
          </p>
          
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No articles found matching your search. Try different keywords.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Enter a search term to find news articles
          </p>
        </div>
      )}
    </div>
  );
}
