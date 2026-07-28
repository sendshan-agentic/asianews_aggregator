'use client';

import Link from 'next/link';
import { Globe, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { CATEGORIES } from '@/lib/constants';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-orange-500 via-white to-green-500 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center">
              <span className="text-2xl">🇮🇳</span>
              <span className="text-2xl">🌏</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              Asia<span className="text-orange-500">News</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {CATEGORIES.slice(0, 5).map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className="text-gray-700 hover:text-orange-500 font-medium transition-colors"
              >
                {category.name}
              </Link>
            ))}
            <Link
              href="/regions"
              className="text-gray-700 hover:text-orange-500 font-medium transition-colors flex items-center"
            >
              <Globe className="w-4 h-4 mr-1" />
              Regions
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              href="/search"
              className="hidden sm:flex items-center px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
            >
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="ml-2 text-gray-500 text-sm">Search...</span>
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-2">
              {CATEGORIES.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  className="px-3 py-2 text-gray-700 hover:bg-orange-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
              <Link
                href="/regions"
                className="px-3 py-2 text-gray-700 hover:bg-orange-50 rounded-md flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Globe className="w-4 h-4 mr-2" />
                All Regions
              </Link>
              <Link
                href="/search"
                className="px-3 py-2 text-gray-700 hover:bg-orange-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Search
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
