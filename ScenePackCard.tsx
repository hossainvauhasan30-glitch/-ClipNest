import React, { useState } from 'react';
import { ScenePack } from '../types';
import { Download, Bookmark, Eye, Star, Zap, Play, Film, Clock, HardDrive, Check } from 'lucide-react';

interface ScenePackCardProps {
  pack: ScenePack;
  isBookmarked: boolean;
  onToggleBookmark: (packId: string) => void;
  onSelectPack: (pack: ScenePack) => void;
}

export const ScenePackCard: React.FC<ScenePackCardProps> = ({
  pack,
  isBookmarked,
  onToggleBookmark,
  onSelectPack
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getQualityColor = (quality: string) => {
    if (quality.includes('4K')) return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    if (quality.includes('60FPS')) return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
    if (quality.includes('LOG')) return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
    return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
  };

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 hover:border-purple-500/50 dark:hover:border-purple-500/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 flex flex-col h-full">
      
      {/* Cover Image & Hover Video Preview Container */}
      <div 
        onClick={() => onSelectPack(pack)}
        className="relative w-full aspect-video bg-slate-950 overflow-hidden cursor-pointer">
        
        {/* Cover Poster */}
        <img
          src={pack.coverUrl}
          alt={pack.title}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? 'scale-105 filter brightness-105' : 'scale-100'
          }`}
        />

        {/* Video Preview Loop on Hover if available */}
        {isHovered && pack.videoPreviewUrl && (
          <video
            src={pack.videoPreviewUrl}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-10 opacity-90 transition-opacity"
          />
        )}

        {/* Top Badges overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border backdrop-blur-md shadow-md ${getQualityColor(pack.quality)}`}>
              {pack.quality}
            </span>
            <span className="px-2.5 py-0.5 text-[10px] font-semibold bg-slate-900/80 text-slate-200 rounded-lg backdrop-blur-md border border-slate-700/50">
              {pack.fps}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(pack.id);
            }}
            className={`p-2 rounded-xl backdrop-blur-md transition-all pointer-events-auto ${
              isBookmarked
                ? 'bg-pink-600 text-white shadow-lg shadow-pink-500/30'
                : 'bg-slate-900/70 text-slate-200 hover:bg-slate-900'
            }`}>
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Duration Badge Bottom Right */}
        <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-slate-950/80 text-white text-[11px] font-mono font-medium backdrop-blur-md flex items-center gap-1 z-20">
          <Clock className="w-3 h-3 text-purple-400" />
          <span>{pack.duration}</span>
        </div>

        {/* Hover Play Overlay */}
        <div className={`absolute inset-0 bg-purple-950/20 backdrop-blur-[2px] flex items-center justify-center transition-opacity z-10 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="w-12 h-12 rounded-full bg-purple-600/90 text-white flex items-center justify-center shadow-xl shadow-purple-900/50 transform group-hover:scale-110 transition-transform">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
        </div>
      </div>

      {/* Card Content Info */}
      <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
        <div>
          {/* Drama Name & Episode Tag */}
          <div className="flex items-center justify-between text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">
            <span className="truncate max-w-[180px]">{pack.dramaName}</span>
            <span className="text-[11px] px-2 py-0.5 bg-purple-500/10 text-purple-500 dark:text-purple-300 rounded font-medium shrink-0">
              {pack.episode}
            </span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelectPack(pack)}
            className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer leading-snug">
            {pack.title}
          </h3>
        </div>

        {/* Specs Pill Summary */}
        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/60 p-2 rounded-xl border border-slate-100 dark:border-slate-800/60 font-mono">
          <div className="flex items-center gap-1.5 truncate">
            <HardDrive className="w-3 h-3 text-pink-500 shrink-0" />
            <span className="truncate">{pack.size}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Film className="w-3 h-3 text-cyan-500 shrink-0" />
            <span className="truncate">{pack.codec.split(' ')[0]}</span>
          </div>
        </div>

        {/* Bottom Download Info & CTA */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
              <Download className="w-3.5 h-3.5" />
              <span>{pack.downloadCount.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{pack.rating}</span>
            </div>
          </div>

          <button
            onClick={() => onSelectPack(pack)}
            className="px-3.5 py-1.5 text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl shadow-md shadow-purple-900/20 transition-all flex items-center gap-1.5">
            <span>Download</span>
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
