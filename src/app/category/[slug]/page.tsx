import { fetchNewsByCategory } from '@/lib/news';
import { CATEGORIES } from '@/lib/constants';
import NewsCard from '@/components/NewsCard';
import CategoryFilter from '@/components/CategoryFilter';
import { NewsCategory } from '@/types/news';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
export const revalidate = 300
interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES.find(c => c.id === slug);
  if (!category) return { title: 'Category Not Found' };
  
  return {
    title: `${category.name} News - AsiaNews`,
    description: `Latest ${category.name.toLowerCase()} news from India and Asia`,
  };
}

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    slug: category.id,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = CATEGORIES.find(c => c.id === slug);
  
  if (!category) {
    notFound();
  }

  const articles = await fetchNewsByCategory(slug as NewsCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${category.color} text-white`}>
            {category.name}
          </span>
          <span className="text-gray-500">
            {articles.length} articles
          </span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {category.name} News
        </h1>
        <p className="text-gray-600">
          Stay updated with the latest {category.name.toLowerCase()} news from India and across Asia
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <CategoryFilter selectedCategory={slug as NewsCategory} />
      </div>

      {/* Articles Grid */}
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No articles found in this category. Check back later!
          </p>
        </div>
      )}
    </div>
  );
}
