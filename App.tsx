import React, { useState, useEffect, useMemo } from 'react';
import { ScenePack, ViewMode, FilterOptions, AdConfig, ScenePackRequest } from './types';
import { INITIAL_SCENE_PACKS, DEFAULT_AD_CONFIG } from './data/mockData';
import { 
  fetchScenePacksFromFirebase, 
  addScenePackToFirebase, 
  deleteScenePackFromFirebase,
  fetchRequestsFromFirebase 
} from './lib/firebase';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroBanner } from './components/HeroBanner';
import { ScenePackCard } from './components/ScenePackCard';
import { CategoryFilter } from './components/CategoryFilter';
import { DownloadPage } from './components/DownloadPage';
import { AdminPanel } from './components/AdminPanel';
import { RequestPackModal } from './components/RequestPackModal';
import { MonetagAdBanner } from './components/MonetagAdBanner';
import { SeoHead } from './components/SeoHead';

import { Film, Sparkles, Bookmark, Search, RefreshCw, Send, SlidersHorizontal, AlertCircle } from 'lucide-react';

export default function App() {
  // Navigation & View Mode
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedPack, setSelectedPack] = useState<ScenePack | null>(null);

  // Firestore Data State
  const [scenePacks, setScenePacks] = useState<ScenePack[]>(INITIAL_SCENE_PACKS);
  const [requests, setRequests] = useState<ScenePackRequest[]>([]);
  const [loadingPacks, setLoadingPacks] = useState(true);

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    category: 'all',
    quality: 'all',
    fps: 'all',
    sortBy: 'latest',
    year: 'all'
  });

  // Bookmarks State (stored in localStorage)
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('clipnest_bookmarks') || localStorage.getItem('kpack_bookmarks');
      return saved ? JSON.parse(saved) : ['pack-queen-of-tears-ep16'];
    } catch {
      return ['pack-queen-of-tears-ep16'];
    }
  });

  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('clipnest_theme') || localStorage.getItem('kpack_theme');
      return saved ? saved === 'dark' : true;
    } catch {
      return true;
    }
  });

  // Monetag Ad Config State
  const [adConfig, setAdConfig] = useState<AdConfig>(DEFAULT_AD_CONFIG);

  // Request Modal State
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  // Initial Fetch from Firestore
  useEffect(() => {
    fetchScenePacksFromFirebase().then((res) => {
      if (res && res.length > 0) {
        setScenePacks(res);
      }
      setLoadingPacks(false);
    });

    fetchRequestsFromFirebase().then((reqs) => {
      setRequests(reqs);
    });
  }, []);

  // Save Bookmarks to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('clipnest_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.warn('Failed to save bookmarks:', e);
    }
  }, [bookmarks]);

  // Apply Dark Mode Class to Root HTML
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('clipnest_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('clipnest_theme', 'light');
    }
  }, [isDarkMode]);

  // Bookmark Toggle Handler
  const handleToggleBookmark = (packId: string) => {
    setBookmarks((prev) =>
      prev.includes(packId) ? prev.filter((id) => id !== packId) : [...prev, packId]
    );
  };

  // Select Scene Pack Handler
  const handleSelectPack = (pack: ScenePack) => {
    setSelectedPack(pack);
    setCurrentView('pack');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter Updates
  const handleFilterChange = (updated: Partial<FilterOptions>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setFilters({
      search: '',
      category: 'all',
      quality: 'all',
      fps: 'all',
      sortBy: 'latest',
      year: 'all'
    });
  };

  // Search Tag Click
  const handleSearchTag = (tag: string) => {
    setSearchQuery(tag);
    setCurrentView('home');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  // Admin Operations
  const handleAddPack = async (packData: Omit<ScenePack, 'id' | 'createdAt' | 'downloadCount' | 'totalViews' | 'rating' | 'ratingCount'>) => {
    const newPack = await addScenePackToFirebase(packData);
    setScenePacks((prev) => [newPack, ...prev]);
  };

  const handleDeletePack = async (id: string) => {
    await deleteScenePackFromFirebase(id);
    setScenePacks((prev) => prev.filter((p) => p.id !== id));
  };

  // Filtered & Sorted Scene Packs
  const filteredPacks = useMemo(() => {
    return scenePacks.filter((pack) => {
      // Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = pack.title.toLowerCase().includes(q);
        const matchDrama = pack.dramaName.toLowerCase().includes(q);
        const matchActors = pack.actorTags.some((a) => a.toLowerCase().includes(q));
        const matchQuality = pack.quality.toLowerCase().includes(q);
        const matchCategories = pack.categories.some((c) => c.toLowerCase().includes(q));
        if (!matchTitle && !matchDrama && !matchActors && !matchQuality && !matchCategories) {
          return false;
        }
      }

      // Category filter
      if (filters.category !== 'all') {
        if (!pack.categories.includes(filters.category)) {
          return false;
        }
      }

      // Quality filter
      if (filters.quality !== 'all') {
        if (pack.quality !== filters.quality) {
          return false;
        }
      }

      // Year filter
      if (filters.year !== 'all') {
        if (pack.dramaYear !== Number(filters.year)) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'popular') return b.downloadCount - a.downloadCount;
      if (filters.sortBy === 'views') return b.totalViews - a.totalViews;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'title') return a.title.localeCompare(b.title);
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // 'latest'
    });
  }, [scenePacks, searchQuery, filters]);

  // Bookmarked Scene Packs
  const bookmarkedPacks = useMemo(() => {
    return scenePacks.filter((p) => bookmarks.includes(p.id));
  }, [scenePacks, bookmarks]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0a0c14] text-slate-900 dark:text-slate-100 selection:bg-purple-500 selection:text-white transition-colors duration-300">
      
      {/* Dynamic Main Site Title & SEO */}
      <SeoHead
        title="ClipNest — 4K 60FPS K-Drama Scene Packs Directory"
        description="High quality uncompressed 4K 60fps K-Drama scene packs, LOG color profiles, raw clips, and clean audio stems for video editors."
      />

      {/* Top Navbar Header */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (currentView !== 'home') setCurrentView('home');
        }}
        bookmarkCount={bookmarks.length}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        adConfig={adConfig}
        onToggleAds={() => setAdConfig((prev) => ({ ...prev, showAdPlaceholders: !prev.showAdPlaceholders }))}
        onRequestOpen={() => setIsRequestModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* VIEW 1: HOME & CATEGORIES VIEW */}
        {(currentView === 'home' || currentView === 'categories') && (
          <div className="space-y-8">
            {/* Hero Showcase Banner */}
            <HeroBanner
              onSearchTag={handleSearchTag}
              totalPacksCount={scenePacks.length}
              totalDownloads={scenePacks.reduce((acc, p) => acc + p.downloadCount, 0)}
            />

            {/* In-Page Push Monetag Ad Slot */}
            <MonetagAdBanner type="in-page-push" adConfig={adConfig} />

            {/* Category Filter & Sort Options */}
            <CategoryFilter
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              totalResultsCount={filteredPacks.length}
            />

            {/* Scene Pack Grid Header */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Film className="w-5 h-5 text-purple-500" />
                <span>
                  {searchQuery
                    ? `Search Results for "${searchQuery}"`
                    : filters.category !== 'all'
                    ? `Category: ${filters.category.toUpperCase().replace('-', ' ')}`
                    : 'Latest Uploaded Scene Packs'}
                </span>
              </h2>

              <button
                onClick={() => setIsRequestModalOpen(true)}
                className="text-xs font-semibold text-purple-500 hover:text-purple-400 flex items-center gap-1">
                <Send className="w-3.5 h-3.5" />
                <span>Request Custom Pack</span>
              </button>
            </div>

            {/* Scene Packs Cards Grid */}
            {loadingPacks ? (
              <div className="py-20 text-center space-y-3">
                <RefreshCw className="w-8 h-8 text-purple-500 animate-spin mx-auto" />
                <p className="text-xs text-slate-400 font-mono">Loading scene pack library from Firestore...</p>
              </div>
            ) : filteredPacks.length === 0 ? (
              <div className="py-16 text-center space-y-4 bg-white dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 max-w-xl mx-auto">
                <AlertCircle className="w-12 h-12 text-purple-400 mx-auto" />
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">No Scene Packs Found</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Try adjusting your search query or filter settings.
                  </p>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 text-xs font-bold bg-purple-600 text-white rounded-xl shadow-lg hover:bg-purple-500 transition-colors">
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPacks.map((pack) => (
                  <ScenePackCard
                    key={pack.id}
                    pack={pack}
                    isBookmarked={bookmarks.includes(pack.id)}
                    onToggleBookmark={handleToggleBookmark}
                    onSelectPack={handleSelectPack}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: INDIVIDUAL DOWNLOAD PAGE */}
        {currentView === 'pack' && selectedPack && (
          <DownloadPage
            pack={selectedPack}
            relatedPacks={scenePacks.filter((p) => p.id !== selectedPack.id && p.dramaName === selectedPack.dramaName)}
            onBack={() => setCurrentView('home')}
            onSelectPack={handleSelectPack}
            isBookmarked={bookmarks.includes(selectedPack.id)}
            onToggleBookmark={handleToggleBookmark}
            adConfig={adConfig}
          />
        )}

        {/* VIEW 3: SAVED BOOKMARKS */}
        {currentView === 'bookmarks' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Bookmark className="w-6 h-6 text-pink-500 fill-current" />
                  <span>Saved Scene Packs ({bookmarkedPacks.length})</span>
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Your bookmarked 4K 60fps K-Drama clips saved in your browser storage.
                </p>
              </div>

              <button
                onClick={() => setCurrentView('home')}
                className="px-4 py-2 text-xs font-bold bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800">
                Browse Directory
              </button>
            </div>

            {bookmarkedPacks.length === 0 ? (
              <div className="py-20 text-center space-y-4 bg-white dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 max-w-md mx-auto">
                <Bookmark className="w-12 h-12 text-slate-400 mx-auto" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">No Saved Scene Packs</h3>
                <p className="text-xs text-slate-400">
                  Click the bookmark icon on any scene pack card to save it here for quick access later.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookmarkedPacks.map((pack) => (
                  <ScenePackCard
                    key={pack.id}
                    pack={pack}
                    isBookmarked={true}
                    onToggleBookmark={handleToggleBookmark}
                    onSelectPack={handleSelectPack}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 4: ADMIN HUB */}
        {currentView === 'admin' && (
          <AdminPanel
            scenePacks={scenePacks}
            onAddPack={handleAddPack}
            onDeletePack={handleDeletePack}
            adConfig={adConfig}
            onUpdateAdConfig={(updated) => setAdConfig((prev) => ({ ...prev, ...updated }))}
            requests={requests}
          />
        )}
      </main>

      {/* Request Pack Modal */}
      <RequestPackModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
      />

      {/* Footer */}
      <Footer
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        adConfig={adConfig}
      />
    </div>
  );
}
