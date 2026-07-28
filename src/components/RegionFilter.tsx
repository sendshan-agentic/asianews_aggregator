'use client';

import Link from 'next/link';
import { REGIONS } from '@/lib/constants';
import { Region } from '@/types/news';

interface RegionFilterProps {
  selectedRegion?: Region;
}

export default function RegionFilter({ selectedRegion }: RegionFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/"
        className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
          !selectedRegion
            ? 'bg-green-500 text-white shadow-md'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <span className="mr-1">🌏</span>
        All Asia
      </Link>
      {REGIONS.map((region) => {
        const isSelected = selectedRegion === region.id;
        
        return (
          <Link
            key={region.id}
            href={`/region/${region.id}`}
            className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
              isSelected
                ? 'bg-green-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="mr-1">{region.flag}</span>
            {region.name}
          </Link>
        );
      })}
    </div>
  );
}
