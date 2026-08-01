import { fetchNewsByRegion } from '@/lib/news';
import { REGIONS } from '@/lib/constants';
import NewsCard from '@/components/NewsCard';
import RegionFilter from '@/components/RegionFilter';
import { Region } from '@/types/news';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
export const revalidate = 300;
interface RegionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: RegionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const region = REGIONS.find(r => r.id === slug);
  if (!region) return { title: 'Region Not Found' };
  
  return {
    title: `${region.name} News - AsiaNews`,
    description: `Latest news from ${region.name}`,
  };
}

export async function generateStaticParams() {
  return REGIONS.map((region) => ({
    slug: region.id,
  }));
}

export default async function RegionPage({ params }: RegionPageProps) {
  const { slug } = await params;
  const region = REGIONS.find(r => r.id === slug);
  
  if (!region) {
    notFound();
  }

  const articles = await fetchNewsByRegion(slug as Region);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-4xl">{region.flag}</span>
          <span className="text-gray-500">
            {articles.length} articles
          </span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {region.name} News
        </h1>
        <p className="text-gray-600">
          Stay updated with the latest news from {region.name}
        </p>
      </div>

      {/* Region Filter */}
      <div className="mb-6">
        <RegionFilter selectedRegion={slug as Region} />
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
            No articles found for this region. Check back later!
          </p>
        </div>
      )}
    </div>
  );
}
