import React from 'react';
import { FilterOptions } from '../types';
import { INITIAL_CATEGORIES } from '../data/mockData';
import { Sparkles, Zap, Film, Palette, Heart, Flame, CloudRain, Volume2, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';

interface CategoryFilterProps {
  filters: FilterOptions;
  onFilterChange: (updated: Partial<FilterOptions>) => void;
  onResetFilters: () => void;
  totalResultsCount: number;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResultsCount
}) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-3.5 h-3.5 text-amber-400" />;
      case 'Film': return <Film className="w-3.5 h-3.5 text-purple-400" />;
      case 'Palette': return <Palette className="w-3.5 h-3.5 text-cyan-400" />;
      case 'Heart': return <Heart className="w-3.5 h-3.5 text-pink-400" />;
      case 'Flame': return <Flame className="w-3.5 h-3.5 text-orange-400" />;
      case 'CloudRain': return <CloudRain className="w-3.5 h-3.5 text-blue-400" />;
      case 'Volume2': return <Volume2 className="w-3.5 h-3.5 text-emerald-400" />;
      default: return <Sparkles className="w-3.5 h-3.5 text-indigo-400" />;
    }
  };

  const hasActiveFilters = 
    filters.category !== 'all' || 
    filters.quality !== 'all' || 
    filters.year !== 'all' || 
    filters.search !== '';

  return (
    <div className="w-full space-y-4 my-6">
      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {INITIAL_CATEGORIES.map((cat) => {
          const isActive = filters.category === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onFilterChange({ category: cat.id })}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 border ${
                isActive
                  ? 'bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-600/30'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}>
              {getCategoryIcon(cat.icon)}
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Dropdown Filters & Sort Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mr-2">
            <SlidersHorizontal className="w-4 h-4 text-purple-500" />
            <span>Filters:</span>
          </div>

          {/* Quality Select */}
          <select
            value={filters.quality}
            onChange={(e) => onFilterChange({ quality: e.target.value })}
            className="px-3 py-1.5 text-xs font-medium bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500">
            <option value="all">All Qualities</option>
            <option value="4K UHD">4K UHD</option>
            <option value="60FPS">60FPS Smooth</option>
            <option value="1080p FHD">1080p Full HD</option>
            <option value="LOG / Flat">LOG / Flat Color</option>
          </select>

          {/* Year Select */}
          <select
            value={filters.year}
            onChange={(e) => onFilterChange({ year: e.target.value })}
            className="px-3 py-1.5 text-xs font-medium bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500">
            <option value="all">All Years</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2016">Classic (2016)</option>
          </select>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="px-2.5 py-1.5 text-xs font-medium text-pink-500 hover:text-pink-400 flex items-center gap-1 hover:underline">
              <X className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">
            {totalResultsCount} {totalResultsCount === 1 ? 'pack' : 'packs'} found
          </span>
          <div className="flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as FilterOptions['sortBy'] })}
              className="px-3 py-1.5 text-xs font-medium bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500">
              <option value="latest">Sort: Latest Uploads</option>
              <option value="popular">Sort: Most Downloaded</option>
              <option value="views">Sort: Most Viewed</option>
              <option value="rating">Sort: Highest Rated</option>
              <option value="title">Sort: Title (A-Z)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
