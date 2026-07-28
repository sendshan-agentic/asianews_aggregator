'use client';

import Link from 'next/link';
import { CATEGORIES } from '@/lib/constants';
import { NewsCategory } from '@/types/news';
import { Landmark, TrendingUp, Cpu, Trophy, Film, Heart, Atom, Globe } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Landmark,
  TrendingUp,
  Cpu,
  Trophy,
  Film,
  Heart,
  Atom,
  Globe,
};

interface CategoryFilterProps {
  selectedCategory?: NewsCategory;
  showAll?: boolean;
}

export default function CategoryFilter({ selectedCategory, showAll = false }: CategoryFilterProps) {
  const categoriesToShow = showAll ? CATEGORIES : CATEGORIES.slice(0, 6);

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/"
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          !selectedCategory
            ? 'bg-orange-500 text-white shadow-md'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All News
      </Link>
      {categoriesToShow.map((category) => {
        const IconComponent = iconMap[category.icon];
        const isSelected = selectedCategory === category.id;
        
        return (
          <Link
            key={category.id}
            href={`/category/${category.id}`}
            className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
              isSelected
                ? 'bg-orange-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {IconComponent && <IconComponent className="w-4 h-4 mr-1" />}
            {category.name}
          </Link>
        );
      })}
    </div>
  );
}
