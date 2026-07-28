import { REGIONS } from '@/lib/constants';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Regions - AsiaNews',
  description: 'Browse news by region across Asia',
};

export default function RegionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse by Region</h1>
        <p className="text-gray-600">
          Select a region to view the latest news from that area
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {REGIONS.map((region) => (
          <Link
            key={region.id}
            href={`/region/${region.id}`}
            className="block group"
          >
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 text-center">
              <span className="text-6xl mb-4 block group-hover:scale-110 transition-transform">
                {region.flag}
              </span>
              <h2 className="text-xl font-bold text-gray-900 group-hover:text-orange-500 transition-colors">
                {region.name}
              </h2>
              <p className="text-gray-500 mt-2 text-sm">
                View latest news
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
