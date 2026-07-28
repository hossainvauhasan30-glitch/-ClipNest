import React from 'react';
import { Sparkles, Zap, Download, Film, Search, Shield, PlayCircle } from 'lucide-react';
import logoImg from '../assets/images/clipnest_logo_1785214201790.jpg';

interface HeroBannerProps {
  onSearchTag: (tag: string) => void;
  totalPacksCount: number;
  totalDownloads: number;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onSearchTag,
  totalPacksCount,
  totalDownloads
}) => {
  const POPULAR_TAGS = [
    'Queen of Tears',
    'Lovely Runner',
    '4K 60FPS',
    'Twixor',
    'LOG Color',
    'Vincenzo',
    'Squid Game 2',
    'Action SlowMo'
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 text-white my-6 shadow-2xl">
      {/* Background Glow effects */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-14 max-w-5xl mx-auto text-center">
        {/* Brand Badge with Logo */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-950/80 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-6 backdrop-blur-md shadow-xl">
          <img 
            src={logoImg} 
            alt="ClipNest" 
            referrerPolicy="no-referrer"
            className="w-5 h-5 rounded-full object-cover border border-purple-400/40"
          />
          <span className="font-bold tracking-wider text-white">ClipNest</span>
          <span className="text-slate-500">•</span>
          <span className="text-purple-300 tracking-wide uppercase text-[10px]">Scenes. Moments. Memories.</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping ml-1" />
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
          Uncompressed K-Drama <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
            Scene Packs & 4K 60fps Clips
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-8 font-medium leading-relaxed">
          High bitrate 10-bit color, uncompressed audio stems, clean dialogue (no subtitles), S-Log3 color profiles, and pre-interpolated 60fps Twixor cuts built for video editors & creators.
        </p>

        {/* Popular Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Trending Tags:
          </span>
          {POPULAR_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => onSearchTag(tag)}
              className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-purple-600/30 text-slate-200 hover:text-purple-300 border border-slate-700/60 hover:border-purple-500/50 transition-all flex items-center gap-1">
              <span>#{tag}</span>
            </button>
          ))}
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6 border-t border-slate-800/80">
          <div className="p-3 rounded-2xl bg-slate-800/40 border border-slate-700/40">
            <div className="text-xl sm:text-2xl font-black text-purple-400 font-mono">
              {totalPacksCount}+
            </div>
            <div className="text-[11px] font-medium text-slate-400">Curated Packs</div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-800/40 border border-slate-700/40">
            <div className="text-xl sm:text-2xl font-black text-pink-400 font-mono">
              {(totalDownloads + 112000).toLocaleString()}
            </div>
            <div className="text-[11px] font-medium text-slate-400">Total Downloads</div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-800/40 border border-slate-700/40">
            <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
              4K / 60fps
            </div>
            <div className="text-[11px] font-medium text-slate-400">Max Quality</div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-800/40 border border-slate-700/40">
            <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
              Mega / GDrive
            </div>
            <div className="text-[11px] font-medium text-slate-400">Fast Direct Mirrors</div>
          </div>
        </div>
      </div>
    </div>
  );
};
