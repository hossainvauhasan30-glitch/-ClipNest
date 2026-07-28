import React from 'react';
import { ViewMode, AdConfig } from '../types';
import { Film, Search, Bookmark, Send, ShieldCheck, Sun, Moon, Megaphone, Sparkles, Menu, X } from 'lucide-react';

import logoImg from '../assets/images/clipnest_logo_1785214201790.jpg';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  bookmarkCount: number;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  adConfig: AdConfig;
  onToggleAds: () => void;
  onRequestOpen: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  searchQuery,
  onSearchChange,
  bookmarkCount,
  isDarkMode,
  onToggleDarkMode,
  adConfig,
  onToggleAds,
  onRequestOpen,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleNavClick = (view: ViewMode) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md transition-colors">
      {/* Top Monetag Ad Ticker Alert */}
      {adConfig.enabled && adConfig.showAdPlaceholders && (
        <div className="w-full bg-gradient-to-r from-purple-900/90 via-indigo-900/90 to-purple-900/90 text-white text-xs py-1 px-4 text-center flex items-center justify-center gap-2 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse shrink-0" />
          <span className="truncate">
            Monetag Ad Network Active • VIP High Speed Direct Mirror Links enabled!
          </span>
          <button 
            onClick={onToggleAds} 
            className="ml-2 underline text-amber-300 hover:text-amber-200 text-[11px] shrink-0">
            {adConfig.showAdPlaceholders ? 'Hide Ad Banners' : 'Show Ad Banners'}
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group shrink-0">
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-purple-500/20 border border-purple-500/30 group-hover:scale-105 transition-transform bg-slate-900">
            <img 
              src={logoImg} 
              alt="ClipNest Logo" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>ClipNest</span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold tracking-wider bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 rounded-md uppercase">
                STUDIO
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">4K 60FPS K-Drama Scene Packs</p>
          </div>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search K-Drama, actors, or clip types (e.g., Queen of Tears, 60fps)..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200">
                ×
              </button>
            )}
          </div>
        </div>

        {/* Right Navigation Controls */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={() => handleNavClick('home')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
              currentView === 'home'
                ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}>
            Home
          </button>

          <button
            onClick={() => handleNavClick('categories')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
              currentView === 'categories'
                ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}>
            Categories
          </button>

          <button
            onClick={() => handleNavClick('bookmarks')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              currentView === 'bookmarks'
                ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}>
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved</span>
            {bookmarkCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 text-[10px] font-bold bg-pink-500 text-white rounded-full">
                {bookmarkCount}
              </span>
            )}
          </button>

          <button
            onClick={onRequestOpen}
            className="px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5">
            <Send className="w-3.5 h-3.5 text-purple-500" />
            <span>Request Pack</span>
          </button>

          <button
            onClick={() => handleNavClick('admin')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              currentView === 'admin'
                ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}>
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
            <span>Admin Hub</span>
          </button>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-1" />

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleDarkMode}
            title="Toggle Dark / Light Theme"
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* Ad Mode Toggle Button */}
          <button
            onClick={onToggleAds}
            title={adConfig.showAdPlaceholders ? 'Ad Placeholders Active (Click to Hide)' : 'Ad Placeholders Hidden'}
            className={`p-2 rounded-lg transition-colors flex items-center gap-1 text-xs font-medium ${
              adConfig.showAdPlaceholders
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                : 'text-slate-400 hover:bg-slate-800'
            }`}>
            <Megaphone className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-[11px]">{adConfig.showAdPlaceholders ? 'Ads On' : 'Ads Off'}</span>
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onToggleDarkMode}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-3 pb-6 space-y-3">
          <div className="relative w-full mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search scene packs..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.value || e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`p-2.5 text-xs font-semibold rounded-lg text-left ${
                currentView === 'home' ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-100 dark:bg-slate-900'
              }`}>
              Home
            </button>
            <button
              onClick={() => handleNavClick('categories')}
              className={`p-2.5 text-xs font-semibold rounded-lg text-left ${
                currentView === 'categories' ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-100 dark:bg-slate-900'
              }`}>
              Categories
            </button>
            <button
              onClick={() => handleNavClick('bookmarks')}
              className={`p-2.5 text-xs font-semibold rounded-lg text-left flex items-center justify-between ${
                currentView === 'bookmarks' ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-100 dark:bg-slate-900'
              }`}>
              <span>Saved Packs</span>
              {bookmarkCount > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-pink-500 text-white rounded-full">
                  {bookmarkCount}
                </span>
              )}
            </button>
            <button
              onClick={() => { onRequestOpen(); setMobileMenuOpen(false); }}
              className="p-2.5 text-xs font-semibold rounded-lg text-left bg-slate-100 dark:bg-slate-900 text-purple-400 flex items-center gap-1.5">
              <Send className="w-3.5 h-3.5" />
              <span>Request Pack</span>
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className={`col-span-2 p-2.5 text-xs font-semibold rounded-lg text-left flex items-center gap-1.5 ${
                currentView === 'admin' ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-100 dark:bg-slate-900 text-amber-500'
              }`}>
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Hub & Monetag Ad Config</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
