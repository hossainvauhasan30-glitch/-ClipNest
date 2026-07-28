import React, { useState, useEffect, useRef } from 'react';
import { ScenePack, Comment, AdConfig } from '../types';
import { SeoHead } from './SeoHead';
import { MonetagAdBanner } from './MonetagAdBanner';
import { 
  fetchCommentsFromFirebase, 
  addCommentToFirebase, 
  incrementDownloadCountFirebase,
  incrementViewCountFirebase 
} from '../lib/firebase';
import { 
  ArrowLeft, Download, ExternalLink, Play, Clock, HardDrive, Film, 
  Star, MessageSquare, ShieldCheck, Share2, Check, Bookmark, 
  Sparkles, Layers, ListFilter, AlertCircle, RefreshCw, Send, CheckCircle2
} from 'lucide-react';

interface DownloadPageProps {
  pack: ScenePack;
  relatedPacks: ScenePack[];
  onBack: () => void;
  onSelectPack: (pack: ScenePack) => void;
  isBookmarked: boolean;
  onToggleBookmark: (packId: string) => void;
  adConfig: AdConfig;
}

export const DownloadPage: React.FC<DownloadPageProps> = ({
  pack,
  relatedPacks,
  onBack,
  onSelectPack,
  isBookmarked,
  onToggleBookmark,
  adConfig
}) => {
  const [downloadTimer, setDownloadTimer] = useState<number | null>(null);
  const [downloadUnlocked, setDownloadUnlocked] = useState(false);
  const [selectedMirror, setSelectedMirror] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Video Ref for seeking timestamps
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Comments State
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [authorName, setAuthorName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [ratingVal, setRatingVal] = useState(5);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [commentSuccess, setCommentSuccess] = useState(false);

  useEffect(() => {
    // Increment total views in Firestore
    incrementViewCountFirebase(pack.id);

    // Fetch Comments
    fetchCommentsFromFirebase(pack.id).then((res) => {
      setComments(res);
      setLoadingComments(false);
    });

    // Reset download state on pack change
    setDownloadTimer(null);
    setDownloadUnlocked(false);
    setSelectedMirror(null);
  }, [pack.id]);

  // Handle Download Timer Countdown
  const handleStartDownload = (providerName: string, url: string) => {
    setSelectedMirror(providerName);

    if (downloadUnlocked) {
      // Already unlocked, open mirror link
      incrementDownloadCountFirebase(pack.id);
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }

    // Start Timer
    const duration = adConfig.downloadTimerSeconds || 5;
    setDownloadTimer(duration);

    const timerInterval = setInterval(() => {
      setDownloadTimer((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timerInterval);
          setDownloadUnlocked(true);
          incrementDownloadCountFirebase(pack.id);
          // Open direct link after unlock
          window.open(url, '_blank', 'noopener,noreferrer');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Timestamp Click Handler
  const handleJumpToTimestamp = (timeStr: string) => {
    if (!videoRef.current) return;
    // Extract start time e.g. "03:45" -> 225 seconds
    const match = timeStr.match(/(\d+):(\d+)/);
    if (match) {
      const minutes = parseInt(match[1], 10);
      const seconds = parseInt(match[2], 10);
      const totalSec = minutes * 60 + seconds;
      videoRef.current.currentTime = totalSec;
      videoRef.current.play();
    }
  };

  // Handle Share / Copy Page URL
  const handleCopyShareUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Handle Comment Submission
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim()) return;

    setSubmittingComment(true);
    const newComment = await addCommentToFirebase({
      scenePackId: pack.id,
      author: authorName,
      text: commentText,
      rating: ratingVal
    });

    setComments([newComment, ...comments]);
    setCommentText('');
    setAuthorName('');
    setSubmittingComment(false);
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* SEO Dynamic Metadata */}
      <SeoHead
        title={`${pack.title}`}
        description={`Download ${pack.title} in ${pack.quality} ${pack.fps}. High bitrate raw K-Drama scene pack for editors.`}
        keywords={[pack.dramaName, pack.quality, pack.fps, 'Scene Pack Download', ...pack.categories]}
        ogImage={pack.coverUrl}
      />

      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={onBack}
          className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Scene Packs</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleBookmark(pack.id)}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-2 ${
              isBookmarked
                ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/30'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}>
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
            <span>{isBookmarked ? 'Saved in Bookmarks' : 'Bookmark Pack'}</span>
          </button>

          <button
            onClick={handleCopyShareUrl}
            className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors flex items-center gap-2">
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Top Leaderboard Monetag Ad */}
      <MonetagAdBanner type="banner-728" adConfig={adConfig} />

      {/* Main Grid: Left Video Preview & Specs, Right Download & Mirror Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Header Info */}
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-purple-600 dark:text-purple-400 mb-2">
              <span className="px-2.5 py-1 bg-purple-500/10 rounded-lg border border-purple-500/20">
                {pack.dramaName}
              </span>
              <span>•</span>
              <span className="text-slate-400">{pack.episode}</span>
              <span>•</span>
              <span className="text-slate-400">{pack.dramaYear}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
              {pack.title}
            </h1>
          </div>

          {/* Video Player Box */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl group">
            {pack.videoPreviewUrl ? (
              <video
                ref={videoRef}
                src={pack.videoPreviewUrl}
                poster={pack.coverUrl}
                controls
                preload="metadata"
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={pack.coverUrl}
                alt={pack.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute top-3 left-3 px-3 py-1 bg-slate-900/80 backdrop-blur-md rounded-lg text-amber-300 text-xs font-bold border border-amber-500/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Preview Stream (compressed for web)</span>
            </div>
          </div>

          {/* Timestamp Scene Breakdown Navigation */}
          {pack.sceneBreakdown && pack.sceneBreakdown.length > 0 && (
            <div className="p-5 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                <ListFilter className="w-4 h-4 text-purple-500" />
                <span>Scene Breakdown Timestamps</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Click any timestamp below to preview that scene segment in the video player:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {pack.sceneBreakdown.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleJumpToTimestamp(item.timestamp.split(' ')[0])}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 hover:bg-purple-500/10 border border-slate-100 dark:border-slate-800 text-left transition-all group flex items-start gap-2.5">
                    <span className="px-2 py-0.5 text-[11px] font-mono font-bold bg-purple-500/20 text-purple-400 rounded group-hover:bg-purple-600 group-hover:text-white transition-colors shrink-0">
                      {item.timestamp}
                    </span>
                    <span className="text-xs text-slate-700 dark:text-slate-300 font-medium line-clamp-1 group-hover:text-purple-300">
                      {item.description}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Full Media Technical Specs Grid */}
          <div className="p-5 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-500" />
                <span>Media File Technical Specifications</span>
              </h3>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Verified Clean File
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800/80">
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-sans mb-1">Resolution</div>
                <div className="font-bold text-slate-900 dark:text-slate-100">{pack.quality}</div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800/80">
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-sans mb-1">Frame Rate</div>
                <div className="font-bold text-purple-600 dark:text-purple-400">{pack.fps}</div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800/80">
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-sans mb-1">File Size</div>
                <div className="font-bold text-pink-500">{pack.size}</div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800/80">
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-sans mb-1">Duration</div>
                <div className="font-bold text-cyan-400">{pack.duration}</div>
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-300 space-y-1 font-sans">
              <div><strong className="text-slate-900 dark:text-white">Video Codec:</strong> {pack.codec}</div>
              <div><strong className="text-slate-900 dark:text-white">Actors Featured:</strong> {pack.actorTags.join(', ')}</div>
              <div><strong className="text-slate-900 dark:text-white">Description:</strong> {pack.description}</div>
            </div>
          </div>

          {/* User Comments & Community Reviews */}
          <div className="p-5 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-purple-500" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Editor Reviews & Feedback ({comments.length})
                </h3>
              </div>
              <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span>{pack.rating} / 5.0</span>
              </div>
            </div>

            {/* Add Comment Form */}
            <form onSubmit={handleSubmitComment} className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Leave a rating or edit note:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your Name / Handle (e.g. MinAh_Edits)"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="px-3 py-2 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  required
                />

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Rating:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRatingVal(star)}
                        className="p-1 hover:scale-110 transition-transform">
                        <Star className={`w-4 h-4 ${star <= ratingVal ? 'text-amber-400 fill-current' : 'text-slate-600'}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <textarea
                placeholder="Write your feedback on quality, audio stems, fps smoothness..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-purple-500"
                required
              />

              <div className="flex items-center justify-between pt-1">
                {commentSuccess && (
                  <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Review posted successfully!
                  </span>
                )}
                <button
                  type="submit"
                  disabled={submittingComment}
                  className="ml-auto px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5">
                  <Send className="w-3 h-3" />
                  <span>{submittingComment ? 'Posting...' : 'Post Review'}</span>
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-3">
              {loadingComments ? (
                <div className="text-center py-4 text-xs text-slate-400 flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-purple-400" />
                  <span>Loading reviews...</span>
                </div>
              ) : comments.length === 0 ? (
                <div className="text-center py-6 text-xs text-slate-400">
                  No reviews yet. Be the first editor to review this scene pack!
                </div>
              ) : (
                comments.map((c) => (
                  <div key={c.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/60 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-purple-600 dark:text-purple-400">{c.author}</span>
                      <div className="flex items-center gap-1 text-amber-400">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="font-mono">{c.rating}.0</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300">{c.text}</p>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols) - Download Center & Monetag Ads */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Download Center Panel */}
          <div className="p-6 bg-gradient-to-b from-slate-900 to-slate-950 border border-purple-500/40 rounded-3xl text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified High Speed Mirror Links</span>
            </div>

            <h2 className="text-xl font-extrabold mb-1">
              Download Scene Pack
            </h2>
            <p className="text-xs text-slate-300 mb-5">
              Select your preferred cloud hosting provider below.
            </p>

            {/* Countdown Timer or Unlock Notice */}
            {downloadTimer !== null && downloadTimer > 0 ? (
              <div className="p-4 bg-purple-900/40 border border-purple-500/50 rounded-2xl text-center space-y-2 mb-6">
                <div className="text-xs text-purple-200 font-semibold flex items-center justify-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-400 animate-spin" />
                  <span>Preparing Direct Download Mirror...</span>
                </div>
                <div className="text-3xl font-black text-amber-300 font-mono">
                  00:0{downloadTimer}s
                </div>
                <p className="text-[11px] text-slate-300">
                  Please hold on for a few seconds while we generate your unthrottled link.
                </p>
              </div>
            ) : downloadUnlocked ? (
              <div className="p-3 bg-emerald-900/40 border border-emerald-500/50 rounded-2xl text-center mb-6 flex items-center justify-center gap-2 text-emerald-300 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Links Unlocked! Click any mirror below:</span>
              </div>
            ) : null}

            {/* Mirror Buttons List */}
            <div className="space-y-3">
              {pack.downloadLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => handleStartDownload(link.name, link.url)}
                  className={`w-full p-3.5 rounded-xl border font-semibold text-xs transition-all flex items-center justify-between ${
                    link.fastSpeed
                      ? 'bg-gradient-to-r from-purple-600/90 to-indigo-600/90 hover:from-purple-600 hover:to-indigo-600 border-purple-400/50 text-white shadow-lg shadow-purple-900/30'
                      : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                  }`}>
                  <div className="flex items-center gap-2.5">
                    <Download className="w-4 h-4 text-amber-400 shrink-0" />
                    <div className="text-left">
                      <div className="font-bold">{link.provider} Mirror</div>
                      <div className="text-[10px] text-slate-300 font-normal">{link.name}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {link.fastSpeed && (
                      <span className="px-1.5 py-0.5 text-[9px] bg-amber-400/20 text-amber-300 rounded font-mono">
                        VIP Fast
                      </span>
                    )}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </button>
              ))}
            </div>

            {/* Post-Timer Monetag Ad Slot */}
            {downloadTimer !== null && downloadTimer > 0 && (
              <MonetagAdBanner type="post-timer" adConfig={adConfig} />
            )}

            {/* DMCA / Safety Disclaimer */}
            <div className="mt-6 pt-4 border-t border-slate-800 text-[10px] text-slate-400 space-y-1">
              <p>• All clips are intended for fair-use fan video edits & educational content creation.</p>
              <p>• No password required. 100% Virus-Free verified files.</p>
            </div>
          </div>

          {/* Sidebar Monetag Ad Slot */}
          <MonetagAdBanner type="sidebar-300" adConfig={adConfig} />

          {/* Related Scene Packs Sidebar */}
          {relatedPacks.length > 0 && (
            <div className="p-5 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Film className="w-4 h-4 text-purple-500" />
                <span>More Scene Packs You May Like</span>
              </h3>

              <div className="space-y-3">
                {relatedPacks.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onSelectPack(item)}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer transition-colors group">
                    <img
                      src={item.coverUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-16 h-12 object-cover rounded-lg shrink-0 group-hover:opacity-90"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-bold text-purple-400 truncate">{item.dramaName}</div>
                      <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100 line-clamp-1 group-hover:text-purple-400">
                        {item.title}
                      </h4>
                      <div className="text-[10px] text-slate-400 font-mono">{item.quality} • {item.size}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
