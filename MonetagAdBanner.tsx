import React from 'react';
import { AdConfig } from '../types';
import { ExternalLink, ShieldAlert, Sparkles } from 'lucide-react';

interface MonetagAdBannerProps {
  type: 'banner-728' | 'sidebar-300' | 'in-page-push' | 'native-inline' | 'post-timer';
  adConfig: AdConfig;
  className?: string;
}

export const MonetagAdBanner: React.FC<MonetagAdBannerProps> = ({
  type,
  adConfig,
  className = ''
}) => {
  if (!adConfig.enabled || !adConfig.showAdPlaceholders) {
    return null;
  }

  const handleDirectLinkClick = () => {
    if (adConfig.directLinkUrl) {
      window.open(adConfig.directLinkUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (type === 'banner-728') {
    return (
      <div className={`w-full my-6 flex flex-col items-center justify-center ${className}`}>
        <div className="monetag-ad-placeholder w-full max-w-4xl h-24 sm:h-28 flex flex-col items-center justify-center p-3 text-center border border-dashed border-purple-500/30 rounded-xl relative overflow-hidden group hover:border-purple-500/60 transition-all cursor-pointer"
             onClick={handleDirectLinkClick}>
          <span className="monetag-ad-tag">Monetag Ad Space</span>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 mb-1">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Monetag Native Banner (728x90 / Leaderboard)</span>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-400 max-w-md">
            Sponsor / Ad Content Placeholder — Click to support K-Pack Studio or unlock VIP mirror speeds.
          </p>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-pink-400 hover:underline">
            <span>Direct Ad Link Mirror</span>
            <ExternalLink className="w-3 h-3" />
          </div>
        </div>
      </div>
    );
  }

  if (type === 'sidebar-300') {
    return (
      <div className={`w-full my-4 ${className}`}>
        <div className="monetag-ad-placeholder w-full h-64 flex flex-col items-center justify-center p-4 text-center border border-dashed border-purple-500/30 rounded-xl relative overflow-hidden group hover:border-purple-500/60 transition-all cursor-pointer"
             onClick={handleDirectLinkClick}>
          <span className="monetag-ad-tag">Monetag 300x250</span>
          <Sparkles className="w-6 h-6 text-purple-400 mb-2 animate-bounce" />
          <h4 className="text-sm font-semibold text-slate-200 mb-1">Monetag High-CPM Rectangle</h4>
          <p className="text-xs text-slate-400 mb-3">
            In-Page Push / Native Banner Slot
          </p>
          <button className="px-3 py-1.5 text-xs font-medium bg-purple-600/80 hover:bg-purple-600 text-white rounded-lg transition-all flex items-center gap-1.5">
            <span>Visit Sponsor Site</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    );
  }

  if (type === 'in-page-push') {
    return (
      <div className={`w-full my-3 ${className}`}>
        <div className="p-3 bg-gradient-to-r from-purple-900/40 via-indigo-900/40 to-slate-900/40 border border-purple-500/30 rounded-xl flex items-center justify-between gap-3 shadow-lg relative">
          <span className="monetag-ad-tag">Push Ad</span>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300 font-bold shrink-0">
              K
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-100 flex items-center gap-1.5">
                <span>Fastest 4K K-Drama Mirrors Ready</span>
                <span className="px-1.5 py-0.5 text-[10px] bg-emerald-500/20 text-emerald-300 rounded font-mono">100% Free</span>
              </div>
              <p className="text-[11px] text-slate-400">Download 60fps raw scene packs with no captcha or registration.</p>
            </div>
          </div>
          <button 
            onClick={handleDirectLinkClick}
            className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap shrink-0 flex items-center gap-1">
            <span>Get Link</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    );
  }

  if (type === 'post-timer') {
    return (
      <div className={`w-full p-4 bg-purple-950/20 border border-purple-500/30 rounded-xl my-4 text-center ${className}`}>
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-purple-300 mb-1">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <span>Monetag Ad Verification Slot</span>
        </div>
        <p className="text-xs text-slate-400 mb-3">
          Click below to support bandwidth hosting for 4K 60fps uncompressed downloads!
        </p>
        <button
          onClick={handleDirectLinkClick}
          className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-semibold text-xs rounded-lg transition-all shadow-md shadow-purple-900/30 inline-flex items-center justify-center gap-2">
          <span>Continue To High-Speed Mirror</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className={`w-full my-4 ${className}`}>
      <div className="monetag-ad-placeholder p-4 text-center rounded-xl border border-dashed border-purple-500/30">
        <span className="monetag-ad-tag">Monetag Inline</span>
        <p className="text-xs text-slate-400">Monetag Ad Native Placement</p>
      </div>
    </div>
  );
};
