import React from 'react';
import { ViewMode, AdConfig } from '../types';
import { MonetagAdBanner } from './MonetagAdBanner';
import { ShieldCheck, Heart, Sparkles } from 'lucide-react';
import logoImg from '../assets/images/clipnest_logo_1785214201790.jpg';

interface FooterProps {
  onNavigate: (view: ViewMode) => void;
  adConfig: AdConfig;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, adConfig }) => {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors mt-16 pt-10 pb-8 text-slate-600 dark:text-slate-400">
      
      {/* Bottom Monetag Native Banner Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <MonetagAdBanner type="banner-728" adConfig={adConfig} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-200 dark:border-slate-800/80">
        
        {/* Brand Info (5 cols) */}
        <div className="md:col-span-5 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-900 border border-purple-500/30">
              <img 
                src={logoImg} 
                alt="ClipNest Logo" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
              CLIPNEST STUDIO
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-md">
            The premier open directory for uncompressed K-Drama scene packs, 4K 60fps renders, LOG color profiles, and clean audio stems. Engineered for video editors, TikTok creators, and edit channels.
          </p>

          <div className="text-[11px] text-slate-400 flex items-center gap-1.5 font-medium pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>High-Speed Cloud Mirrors • Zero Hardcoded Subtitles</span>
          </div>
        </div>

        {/* Shortcuts (3 cols) */}
        <div className="md:col-span-3 space-y-2 text-xs">
          <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] mb-3">
            Navigation Shortcuts
          </h4>
          <ul className="space-y-2">
            <li>
              <button onClick={() => onNavigate('home')} className="hover:text-purple-400 transition-colors">
                Home Directory
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('categories')} className="hover:text-purple-400 transition-colors">
                All 4K & 60FPS Categories
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('bookmarks')} className="hover:text-purple-400 transition-colors">
                Saved Bookmarks
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('admin')} className="hover:text-amber-400 transition-colors">
                Admin Panel & Ad Config
              </button>
            </li>
          </ul>
        </div>

        {/* DMCA / Fair Use Notice (4 cols) */}
        <div className="md:col-span-4 space-y-2 text-xs">
          <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] mb-3">
            Fair Use & DMCA Disclaimer
          </h4>
          <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
            ClipNest Studio does not host video files on its servers. All scene packs are provided via third-party cloud mirrors (Mega, Google Drive, MediaFire) strictly for transformative edit creation, fan-art, and educational purposes under Fair Use guidelines.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
        <p>© 2026 ClipNest Studio. All rights reserved.</p>
        <p className="flex items-center gap-1">
          <span>Crafted for K-Drama video editors with</span>
          <Heart className="w-3.5 h-3.5 text-pink-500 fill-current" />
        </p>
      </div>
    </footer>
  );
};
