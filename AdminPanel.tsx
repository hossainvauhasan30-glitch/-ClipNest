import React, { useState } from 'react';
import { ScenePack, AdConfig, ScenePackRequest } from '../types';
import { MonetagAdBanner } from './MonetagAdBanner';
import { 
  ShieldCheck, Lock, Unlock, Plus, Edit2, Trash2, Save, 
  BarChart3, Megaphone, CheckCircle2, Film, Sparkles, RefreshCw, 
  Layers, ExternalLink, Key, AlertCircle
} from 'lucide-react';

interface AdminPanelProps {
  scenePacks: ScenePack[];
  onAddPack: (pack: Omit<ScenePack, 'id' | 'createdAt' | 'downloadCount' | 'totalViews' | 'rating' | 'ratingCount'>) => Promise<void>;
  onDeletePack: (id: string) => Promise<void>;
  adConfig: AdConfig;
  onUpdateAdConfig: (updated: Partial<AdConfig>) => void;
  requests: ScenePackRequest[];
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  scenePacks,
  onAddPack,
  onDeletePack,
  adConfig,
  onUpdateAdConfig,
  requests
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<'packs' | 'ads' | 'analytics' | 'requests'>('packs');

  // Form State for Adding Scene Pack
  const [title, setTitle] = useState('');
  const [dramaName, setDramaName] = useState('');
  const [episode, setEpisode] = useState('Ep 01');
  const [quality, setQuality] = useState<ScenePack['quality']>('4K UHD');
  const [fps, setFps] = useState('60.00 fps');
  const [codec, setCodec] = useState('HEVC / H.265');
  const [size, setSize] = useState('2.5 GB');
  const [duration, setDuration] = useState('15m 00s');
  const [coverUrl, setCoverUrl] = useState('');
  const [videoPreviewUrl, setVideoPreviewUrl] = useState('');
  const [categoriesStr, setCategoriesStr] = useState('4k-60fps, romance');
  const [description, setDescription] = useState('');
  const [dramaYear, setDramaYear] = useState(2025);
  const [actorTagsStr, setActorTagsStr] = useState('');
  const [featured, setFeatured] = useState(true);

  // Mirror Links State
  const [megaUrl, setMegaUrl] = useState('');
  const [gdriveUrl, setGdriveUrl] = useState('');
  const [mediafireUrl, setMediafireUrl] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'Hossain560@#12') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid Admin Passcode.');
    }
  };

  const handleCreatePack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !dramaName) return;

    setSubmitting(true);
    const downloadLinks = [];
    if (megaUrl) downloadLinks.push({ provider: 'Mega' as const, name: 'Mega.nz VIP Mirror', url: megaUrl, size, fastSpeed: true });
    if (gdriveUrl) downloadLinks.push({ provider: 'Google Drive' as const, name: 'Google Drive Direct', url: gdriveUrl, size, fastSpeed: true });
    if (mediafireUrl) downloadLinks.push({ provider: 'MediaFire' as const, name: 'MediaFire Mirror', url: mediafireUrl, size });

    if (downloadLinks.length === 0) {
      downloadLinks.push({ provider: 'Mega' as const, name: 'Mega.nz Mirror', url: 'https://mega.nz/#sample_pack', size, fastSpeed: true });
    }

    await onAddPack({
      title,
      dramaName,
      episode,
      quality,
      fps,
      codec,
      size,
      duration,
      coverUrl: coverUrl || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
      videoPreviewUrl: videoPreviewUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      categories: categoriesStr.split(',').map((s) => s.trim()).filter(Boolean),
      downloadLinks,
      sceneBreakdown: [
        { timestamp: '00:00 - 05:00', description: 'Opening Scene Key Sequence' },
        { timestamp: '05:01 - 12:00', description: 'Climax Slow Motion Twixor Cut' }
      ],
      description: description || 'High quality uncompressed scene pack for video creators.',
      featured,
      dramaYear: Number(dramaYear),
      actorTags: actorTagsStr.split(',').map((s) => s.trim()).filter(Boolean)
    });

    setSubmitting(false);
    setSuccessMsg('Scene pack published successfully!');
    setTimeout(() => setSuccessMsg(''), 4000);

    // Reset Form
    setTitle('');
    setDramaName('');
    setCoverUrl('');
    setVideoPreviewUrl('');
    setMegaUrl('');
    setGdriveUrl('');
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl text-center space-y-6">
        <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 text-amber-500 rounded-2xl flex items-center justify-center mx-auto">
          <Lock className="w-8 h-8" />
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">Admin Management Access</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Enter passcode to upload scene packs and configure Monetag ads.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="Enter Admin Passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full px-4 py-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-center font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
            {authError && <p className="text-xs text-pink-500 mt-2">{authError}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            <Key className="w-4 h-4" />
            <span>Unlock Admin Panel</span>
          </button>
        </form>

        <p className="text-[11px] text-slate-400">
          Tip: Passcode is configured for authorized admin access.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl border border-amber-500/30 text-white shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-amber-500/20 border border-amber-500/40 rounded-2xl flex items-center justify-center text-amber-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black flex items-center gap-2">
              <span>Admin Control Center</span>
              <span className="px-2 py-0.5 text-[10px] bg-amber-500 text-slate-950 font-bold rounded-md uppercase">
                Active
              </span>
            </h1>
            <p className="text-xs text-slate-300">
              Manage scene packs, Monetag ad scripts, and download analytics.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAuthenticated(false)}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-xl text-slate-300 transition-colors flex items-center gap-2">
          <Unlock className="w-4 h-4 text-amber-400" />
          <span>Lock Admin Panel</span>
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('packs')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'packs'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}>
          <Plus className="w-4 h-4" />
          <span>Upload & Manage Packs ({scenePacks.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('ads')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'ads'
              ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}>
          <Megaphone className="w-4 h-4" />
          <span>Monetag Ad Integration Config</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'analytics'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}>
          <BarChart3 className="w-4 h-4" />
          <span>Download Analytics</span>
        </button>
      </div>

      {/* TAB 1: UPLOAD & MANAGE PACKS */}
      {activeTab === 'packs' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Add New Scene Pack Form (7 cols) */}
          <div className="lg:col-span-7 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Film className="w-5 h-5 text-purple-500" />
                <span>Upload New K-Drama Scene Pack</span>
              </h2>
              {successMsg && (
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  {successMsg}
                </span>
              )}
            </div>

            <form onSubmit={handleCreatePack} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Drama Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Marry My Husband"
                    value={dramaName}
                    onChange={(e) => setDramaName(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Episode / Segment *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ep 10 Revenge Party"
                    value={episode}
                    onChange={(e) => setEpisode(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Scene Pack Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Marry My Husband - Ep 10 Revenge Transformation Scene Pack [4K 60FPS]"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Quality</label>
                  <select
                    value={quality}
                    onChange={(e) => setQuality(e.target.value as ScenePack['quality'])}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100">
                    <option value="4K UHD">4K UHD</option>
                    <option value="60FPS">60FPS</option>
                    <option value="1080p FHD">1080p FHD</option>
                    <option value="LOG / Flat">LOG / Flat</option>
                    <option value="Raw Clips">Raw Clips</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">FPS</label>
                  <input
                    type="text"
                    value={fps}
                    onChange={(e) => setFps(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">File Size</label>
                  <input
                    type="text"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Duration</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Cover Image Thumbnail URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={coverUrl}
                    onChange={(e) => setCoverUrl(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Video Stream Preview URL (.mp4)
                  </label>
                  <input
                    type="url"
                    placeholder="https://.../sample.mp4"
                    value={videoPreviewUrl}
                    onChange={(e) => setVideoPreviewUrl(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              {/* Mirror Links Inputs */}
              <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5 text-purple-500" />
                  <span>Download Mirror Links</span>
                </div>

                <div className="space-y-2">
                  <input
                    type="url"
                    placeholder="Mega.nz Link e.g. https://mega.nz/#..."
                    value={megaUrl}
                    onChange={(e) => setMegaUrl(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                  />
                  <input
                    type="url"
                    placeholder="Google Drive Link e.g. https://drive.google.com/..."
                    value={gdriveUrl}
                    onChange={(e) => setGdriveUrl(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                  />
                  <input
                    type="url"
                    placeholder="MediaFire Link e.g. https://mediafire.com/..."
                    value={mediafireUrl}
                    onChange={(e) => setMediafireUrl(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Categories (comma separated)
                  </label>
                  <input
                    type="text"
                    value={categoriesStr}
                    onChange={(e) => setCategoriesStr(e.target.value)}
                    placeholder="4k-60fps, romance, sad-emotional"
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Actors Featured
                  </label>
                  <input
                    type="text"
                    value={actorTagsStr}
                    onChange={(e) => setActorTagsStr(e.target.value)}
                    placeholder="Park Min-young, Na In-woo"
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-900/30 transition-all flex items-center justify-center gap-2">
                {submitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>{submitting ? 'Publishing...' : 'Publish Scene Pack to Directory'}</span>
              </button>
            </form>
          </div>

          {/* List & Delete Existing Scene Packs (5 cols) */}
          <div className="lg:col-span-5 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <Layers className="w-5 h-5 text-amber-500" />
              <span>Published Scene Packs Directory ({scenePacks.length})</span>
            </h2>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {scenePacks.map((pack) => (
                <div
                  key={pack.id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                  <img
                    src={pack.coverUrl}
                    alt={pack.title}
                    referrerPolicy="no-referrer"
                    className="w-14 h-10 object-cover rounded-lg shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold text-purple-400">{pack.dramaName}</div>
                    <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                      {pack.title}
                    </h4>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {pack.quality} • {pack.downloadCount.toLocaleString()} downloads
                    </div>
                  </div>

                  <button
                    onClick={() => onDeletePack(pack.id)}
                    className="p-2 text-pink-500 hover:bg-pink-500/10 rounded-xl transition-colors shrink-0"
                    title="Delete Scene Pack">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MONETAG AD CONFIGURATOR */}
      {activeTab === 'ads' && (
        <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-amber-500" />
                <span>Monetag Ad Network Integration Settings</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Configure your Monetag zone codes, header scripts, in-page push scripts, and direct links.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-slate-300">Enable Monetag Ads:</label>
              <button
                onClick={() => onUpdateAdConfig({ enabled: !adConfig.enabled })}
                className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                  adConfig.enabled ? 'bg-purple-600' : 'bg-slate-700'
                }`}>
                <div
                  className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    adConfig.enabled ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-900 dark:text-white">
                  Download Timer Delay (Seconds)
                </label>
                <span className="text-xs font-mono font-bold text-amber-400">
                  {adConfig.downloadTimerSeconds}s
                </span>
              </div>
              <input
                type="range"
                min={2}
                max={15}
                value={adConfig.downloadTimerSeconds}
                onChange={(e) => onUpdateAdConfig({ downloadTimerSeconds: Number(e.target.value) })}
                className="w-full accent-purple-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Number of seconds users wait before download mirror links are unlocked (Monetag verification window).
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-900 dark:text-white block mb-1">
                  Monetag Direct Link / Popunder Target URL
                </label>
                <input
                  type="url"
                  value={adConfig.directLinkUrl}
                  onChange={(e) => onUpdateAdConfig({ directLinkUrl: e.target.value })}
                  placeholder="https://otourgod.com/4/..."
                  className="w-full px-3.5 py-2 text-xs font-mono rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-900 dark:text-white block mb-1">
                  Monetag Global Header Tag Script
                </label>
                <textarea
                  rows={3}
                  value={adConfig.monetagHeaderScript}
                  onChange={(e) => onUpdateAdConfig({ monetagHeaderScript: e.target.value })}
                  placeholder="<script src='https://alwingulla.com/...'></script>"
                  className="w-full p-3 text-xs font-mono rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            {/* Ad Placeholder Live Preview */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-3">
                Live Monetag Ad Placement Preview
              </h3>
              <MonetagAdBanner type="banner-728" adConfig={adConfig} />
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DOWNLOAD ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-6">
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <BarChart3 className="w-5 h-5 text-indigo-500" />
            <span>Traffic & Download Analytics Overview</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-purple-950/30 border border-purple-500/30 rounded-2xl">
              <div className="text-xs text-purple-300 font-semibold mb-1">Total Scene Pack Downloads</div>
              <div className="text-3xl font-black text-white font-mono">
                {scenePacks.reduce((acc, p) => acc + p.downloadCount, 112000).toLocaleString()}
              </div>
            </div>

            <div className="p-5 bg-indigo-950/30 border border-indigo-500/30 rounded-2xl">
              <div className="text-xs text-indigo-300 font-semibold mb-1">Total Page Impressions</div>
              <div className="text-3xl font-black text-white font-mono">
                {scenePacks.reduce((acc, p) => acc + p.totalViews, 245000).toLocaleString()}
              </div>
            </div>

            <div className="p-5 bg-pink-950/30 border border-pink-500/30 rounded-2xl">
              <div className="text-xs text-pink-300 font-semibold mb-1">Active Scene Packs</div>
              <div className="text-3xl font-black text-white font-mono">
                {scenePacks.length}
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">Most Downloaded Scene Packs</h3>
            {scenePacks.slice(0, 5).map((p) => (
              <div key={p.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                <div className="font-semibold text-slate-900 dark:text-slate-100 truncate max-w-md">
                  {p.title}
                </div>
                <div className="text-purple-400 font-bold font-mono">
                  {p.downloadCount.toLocaleString()} downloads
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
