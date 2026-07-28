import { ScenePack, Category, AdConfig } from '../types';

export const INITIAL_CATEGORIES = [
  { id: 'all', name: 'All Packs', count: 24, icon: 'Sparkles' },
  { id: '4k-60fps', name: '4K 60FPS Ultra', count: 12, icon: 'Zap' },
  { id: 'twixor-slowmo', name: 'Twixor & Slow-Mo', count: 8, icon: 'Film' },
  { id: 'log-color', name: 'LOG / Flat Profile', count: 6, icon: 'Palette' },
  { id: 'romance', name: 'Romance & Chemistry', count: 15, icon: 'Heart' },
  { id: 'action-thriller', name: 'Action & Thriller', count: 9, icon: 'Flame' },
  { id: 'sad-emotional', name: 'Emotional & Crying', count: 11, icon: 'CloudRain' },
  { id: 'audio-sfx', name: 'Clean Dialogue & SFX', count: 5, icon: 'Volume2' },
];

export const INITIAL_SCENE_PACKS: ScenePack[] = [
  {
    id: 'pack-queen-of-tears-ep16',
    title: 'Queen of Tears - Ep 16 Final Re-Meeting Scene Pack [4K 60FPS]',
    dramaName: 'Queen of Tears (눈물의 여왕)',
    episode: 'Ep 16 Final',
    quality: '4K UHD',
    fps: '59.94 fps',
    codec: 'HEVC / H.265 (Color Graded 10-bit)',
    size: '3.4 GB',
    duration: '18m 42s',
    coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
    videoPreviewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    categories: ['4k-60fps', 'romance', 'sad-emotional', 'twixor-slowmo'],
    downloadLinks: [
      { provider: 'Mega', name: 'Mega.nz Direct Fast Server', url: 'https://mega.nz/#queenoftears_ep16_pack', size: '3.4 GB', fastSpeed: true },
      { provider: 'Google Drive', name: 'Google Drive Mirror #1', url: 'https://drive.google.com/open?id=qot_ep16_scene_pack', size: '3.4 GB', fastSpeed: true },
      { provider: 'MediaFire', name: 'MediaFire High Speed Link', url: 'https://www.mediafire.com/file/qot_ep16_4k.zip', size: '3.4 GB' },
      { provider: 'PixelDrain', name: 'PixelDrain Direct Mirror', url: 'https://pixeldrain.com/u/qot16', size: '3.4 GB' },
      { provider: 'Telegram', name: 'Join Telegram VIP Channel Pack', url: 'https://t.me/kdramascenepacks', size: '3.4 GB' }
    ],
    sceneBreakdown: [
      { timestamp: '00:15 - 03:40', description: 'Snowy Park Reunion Eye-Contact (Extreme High-Bitrate Focus)' },
      { timestamp: '03:45 - 08:20', description: 'Hospital Holding Hands Crying Scene (Clean Audio + No Subtitles)' },
      { timestamp: '08:25 - 12:10', description: 'Sunset Sunset Hug & Slow Motion Twixor Cut' },
      { timestamp: '12:15 - 18:42', description: 'Epilogue Montage 4K UHD Remastered' }
    ],
    description: 'Ultra high quality uncompressed 4K 60FPS scene pack from Queen of Tears Episode 16. Perfect for TikTok, YouTube Shorts, and Instagram Reels edits. Features 10-bit color, no hardcoded subtitles, and uncompressed AAC stereo dialogue track.',
    downloadCount: 14820,
    totalViews: 32900,
    featured: true,
    dramaYear: 2024,
    actorTags: ['Kim Soo-hyun', 'Kim Ji-won', 'Park Sung-hoon'],
    createdAt: '2026-07-20T10:00:00Z',
    rating: 4.9,
    ratingCount: 342
  },
  {
    id: 'pack-lovely-runner-rain-umbrella',
    title: 'Lovely Runner - Yellow Umbrella Rainy Day Iconic Meet Scene [4K 60FPS Twixor]',
    dramaName: 'Lovely Runner (선재 업고 튀어)',
    episode: 'Ep 01 & Ep 02',
    quality: '60FPS',
    fps: '60.00 fps',
    codec: 'ProRes 422 HQ / LOG Color Flat',
    size: '2.8 GB',
    duration: '14m 10s',
    coverUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop',
    videoPreviewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    categories: ['4k-60fps', 'romance', 'twixor-slowmo', 'log-color'],
    downloadLinks: [
      { provider: 'Mega', name: 'Mega.nz Premium Speed Link', url: 'https://mega.nz/#lovely_runner_rain_pack', size: '2.8 GB', fastSpeed: true },
      { provider: 'Google Drive', name: 'Google Drive Direct Mirror', url: 'https://drive.google.com/file/d/lovely_runner_umbrella', size: '2.8 GB', fastSpeed: true },
      { provider: 'MediaFire', name: 'MediaFire Fast Zip', url: 'https://mediafire.com/file/lovely_runner_rain.zip', size: '2.8 GB' }
    ],
    sceneBreakdown: [
      { timestamp: '00:00 - 04:30', description: 'Yellow Umbrella Rain Entrance Slow Motion' },
      { timestamp: '04:31 - 09:15', description: 'Sun-jae Swimming Pool Practice & Smile Cut' },
      { timestamp: '09:16 - 14:10', description: 'Concert Stage Performance High Dynamic Range Clips' }
    ],
    description: 'Clean raw 60FPS cut of Lovely Runner iconic yellow umbrella umbrella scene. Includes S-Log3 color profile version for custom LUT grading and colorists.',
    downloadCount: 11200,
    totalViews: 24500,
    featured: true,
    dramaYear: 2024,
    actorTags: ['Byeon Woo-seok', 'Kim Hye-yoon'],
    createdAt: '2026-07-22T14:30:00Z',
    rating: 4.95,
    ratingCount: 289
  },
  {
    id: 'pack-vincenzo-flame-action',
    title: 'Vincenzo - Vineyard Fire & Lighter Flip Action Scene Pack [1080p Raw]',
    dramaName: 'Vincenzo (빈센조)',
    episode: 'Ep 01 & Ep 04',
    quality: '1080p FHD',
    fps: '23.976 fps',
    codec: 'x264 High@L4.1 Clean Audio',
    size: '1.9 GB',
    duration: '11m 50s',
    coverUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop',
    videoPreviewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    categories: ['action-thriller', 'log-color', 'audio-sfx'],
    downloadLinks: [
      { provider: 'Mega', name: 'Mega.nz Fast Mirror', url: 'https://mega.nz/#vincenzo_flame_pack', size: '1.9 GB', fastSpeed: true },
      { provider: 'PixelDrain', name: 'PixelDrain Direct Link', url: 'https://pixeldrain.com/u/vincenzo_pack', size: '1.9 GB' }
    ],
    sceneBreakdown: [
      { timestamp: '00:00 - 03:20', description: 'Italian Vineyard Lighter Drop Explosion' },
      { timestamp: '03:21 - 07:40', description: 'Babel Pharmaceutical Warehouse Fire' },
      { timestamp: '07:41 - 11:50', description: 'Suit Tailoring & Golden Plaza Entrance' }
    ],
    description: 'Raw high-bitrate clips from Vincenzo. Features zero watermarks, crystal clear SFX (lighter click, flame sound effects), and crisp dark tone grading.',
    downloadCount: 9450,
    totalViews: 18200,
    featured: false,
    dramaYear: 2021,
    actorTags: ['Song Joong-ki', 'Jeon Yeo-been', 'Ok Taec-yeon'],
    createdAt: '2026-07-15T09:12:00Z',
    rating: 4.85,
    ratingCount: 198
  },
  {
    id: 'pack-squid-game-2-red-light',
    title: 'Squid Game Season 2 - Red Light Green Light High Tension Clip Pack [4K 60FPS]',
    dramaName: 'Squid Game S2 (오징어 게임 2)',
    episode: 'Ep 01 & Ep 02',
    quality: '4K UHD',
    fps: '60.00 fps',
    codec: 'HEVC / H.265 HDR10',
    size: '4.1 GB',
    duration: '21m 15s',
    coverUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop',
    videoPreviewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    categories: ['4k-60fps', 'action-thriller'],
    downloadLinks: [
      { provider: 'Google Drive', name: 'Google Drive 4K Mirror', url: 'https://drive.google.com/file/d/squidgame2_4k', size: '4.1 GB', fastSpeed: true },
      { provider: 'Mega', name: 'Mega.nz High Speed Link', url: 'https://mega.nz/#squidgame2_pack', size: '4.1 GB', fastSpeed: true }
    ],
    sceneBreakdown: [
      { timestamp: '00:00 - 08:10', description: 'Doll Turning Around 60FPS Ultra Smooth' },
      { timestamp: '08:11 - 15:40', description: 'Frontman Control Room Surveillance Views' },
      { timestamp: '15:41 - 21:15', description: 'Gi-hun Staredown & Maze Staircase Sprint' }
    ],
    description: 'Crisp 4K 60FPS remaster of Squid Game S2. Cinema grade detail level with isolated background audio tracks.',
    downloadCount: 18900,
    totalViews: 41000,
    featured: true,
    dramaYear: 2025,
    actorTags: ['Lee Jung-jae', 'Lee Byung-hun', 'Gong Yoo'],
    createdAt: '2026-07-18T18:00:00Z',
    rating: 4.92,
    ratingCount: 412
  },
  {
    id: 'pack-twenty-five-twenty-one-fencing',
    title: 'Twenty-Five Twenty-One - Gold Medal Fencing & Sunset Beach Pack [1080p 60FPS]',
    dramaName: 'Twenty-Five Twenty-One (스물다섯 스물하나)',
    episode: 'Ep 08 & Ep 10',
    quality: '60FPS',
    fps: '59.94 fps',
    codec: 'x264 High Color Vibrancy',
    size: '2.1 GB',
    duration: '15m 30s',
    coverUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
    videoPreviewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    categories: ['4k-60fps', 'romance', 'sad-emotional', 'twixor-slowmo'],
    downloadLinks: [
      { provider: 'Mega', name: 'Mega.nz Direct Download', url: 'https://mega.nz/#2521_beach_fencing', size: '2.1 GB', fastSpeed: true },
      { provider: 'MediaFire', name: 'MediaFire Zip File', url: 'https://mediafire.com/file/2521_pack.zip', size: '2.1 GB' }
    ],
    sceneBreakdown: [
      { timestamp: '00:00 - 05:40', description: 'Madrid Finals Fencing Touch-Match Reaction' },
      { timestamp: '05:41 - 10:20', description: 'Beach Trip Waves & Laughter Sunset Group Shot' },
      { timestamp: '10:21 - 15:30', description: 'Fountain Water Play Night Scene' }
    ],
    description: 'Nostalgic 90s aesthetic color graded scene pack with crisp 60FPS interpolation. Perfect for fan-edits and nostalgic edit styles.',
    downloadCount: 8700,
    totalViews: 19400,
    featured: false,
    dramaYear: 2022,
    actorTags: ['Kim Tae-ri', 'Nam Joo-hyuk'],
    createdAt: '2026-07-10T12:00:00Z',
    rating: 4.88,
    ratingCount: 215
  },
  {
    id: 'pack-goblin-sword-bridge',
    title: 'Guardian: The Lonely and Great God - Sword Reveal & Buckwheat Field [4K Raw]',
    dramaName: 'Goblin (쓸쓸하고 찬란하神 - 도깨비)',
    episode: 'Ep 04 & Ep 13',
    quality: '4K UHD',
    fps: '23.976 fps',
    codec: 'HEVC / H.265 (Cinematic Aspect Ratio 2.39:1)',
    size: '3.9 GB',
    duration: '17m 05s',
    coverUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop',
    videoPreviewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    categories: ['4k-60fps', 'romance', 'sad-emotional', 'log-color'],
    downloadLinks: [
      { provider: 'Mega', name: 'Mega.nz Uncompressed 4K', url: 'https://mega.nz/#goblin_sword_4k', size: '3.9 GB', fastSpeed: true },
      { provider: 'Google Drive', name: 'Google Drive Mirror', url: 'https://drive.google.com/file/d/goblin_4k', size: '3.9 GB', fastSpeed: true }
    ],
    sceneBreakdown: [
      { timestamp: '00:00 - 04:50', description: 'Buckwheat Flower Field Sword Pull Attempt' },
      { timestamp: '04:51 - 11:20', description: 'Reaper & Goblin Fog Tunnel Walk' },
      { timestamp: '11:21 - 17:05', description: 'Roof Top Sword Disappearance Scene' }
    ],
    description: 'Masterpiece cinematic 4K scene pack of Goblin. Includes raw soundtrack isolation stems for dialogue and background violin score.',
    downloadCount: 16200,
    totalViews: 38000,
    featured: true,
    dramaYear: 2016,
    actorTags: ['Gong Yoo', 'Kim Go-eun', 'Lee Dong-wook'],
    createdAt: '2026-07-05T08:00:00Z',
    rating: 4.98,
    ratingCount: 520
  },
  {
    id: 'pack-moving-flying-action',
    title: 'Moving - Flying Ability & High School Boxing Fight Scene Pack [4K 60FPS LOG]',
    dramaName: 'Moving (무빙)',
    episode: 'Ep 07 & Ep 12',
    quality: '4K UHD',
    fps: '60.00 fps',
    codec: 'ProRes / S-Log3 Color Space',
    size: '4.5 GB',
    duration: '22m 40s',
    coverUrl: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?q=80&w=1200&auto=format&fit=crop',
    videoPreviewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreet.mp4',
    categories: ['4k-60fps', 'action-thriller', 'log-color', 'twixor-slowmo'],
    downloadLinks: [
      { provider: 'Google Drive', name: 'Google Drive Ultra Speed', url: 'https://drive.google.com/file/d/moving_4k_pack', size: '4.5 GB', fastSpeed: true },
      { provider: 'Mega', name: 'Mega.nz Premium Mirror', url: 'https://mega.nz/#moving_4k_60fps', size: '4.5 GB', fastSpeed: true },
      { provider: 'PixelDrain', name: 'PixelDrain Link', url: 'https://pixeldrain.com/u/moving4k', size: '4.5 GB' }
    ],
    sceneBreakdown: [
      { timestamp: '00:00 - 07:15', description: 'Doo-sik Cloud Sky Flight Sequence' },
      { timestamp: '07:16 - 14:30', description: 'Joo-won 1 vs 100 Gangster Alley Fight' },
      { timestamp: '14:31 - 22:40', description: 'High School Auditorium Superpower Showdown' }
    ],
    description: 'High dynamic range S-Log3 raw video pack from Disney+ Moving. Unmatched detail, blood impact SFX stems, and smooth 60fps velocity edits.',
    downloadCount: 13100,
    totalViews: 28900,
    featured: true,
    dramaYear: 2023,
    actorTags: ['Ryu Seung-ryong', 'Han Hyo-joo', 'Jo In-sung'],
    createdAt: '2026-07-12T16:20:00Z',
    rating: 4.91,
    ratingCount: 310
  },
  {
    id: 'pack-the-glory-rain-confrontation',
    title: 'The Glory - Church Confrontation & Rain Umbrella Staredown [1080p Raw Clips]',
    dramaName: 'The Glory (더 글로리)',
    episode: 'Ep 06 & Ep 10',
    quality: '1080p FHD',
    fps: '23.976 fps',
    codec: 'x264 Clean Video No Logo',
    size: '1.7 GB',
    duration: '10m 20s',
    coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
    videoPreviewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    categories: ['action-thriller', 'sad-emotional', 'audio-sfx'],
    downloadLinks: [
      { provider: 'Mega', name: 'Mega.nz Fast Link', url: 'https://mega.nz/#theglory_pack', size: '1.7 GB', fastSpeed: true },
      { provider: 'MediaFire', name: 'MediaFire Mirror', url: 'https://mediafire.com/file/theglory.zip', size: '1.7 GB' }
    ],
    sceneBreakdown: [
      { timestamp: '00:00 - 04:10', description: 'Church Green Dress Laughing & Clapping Scene' },
      { timestamp: '04:11 - 10:20', description: 'Go Board Room Staredown & Rain Slap Sequence' }
    ],
    description: 'High contrast dark atmospheric scenes from The Glory. Clean raw audio track without music background for custom dialogue overlay.',
    downloadCount: 10400,
    totalViews: 22100,
    featured: false,
    dramaYear: 2023,
    actorTags: ['Song Hye-kyo', 'Lee Do-hyun', 'Lim Ji-yeon'],
    createdAt: '2026-07-02T11:45:00Z',
    rating: 4.87,
    ratingCount: 245
  }
];

export const DEFAULT_AD_CONFIG: AdConfig = {
  enabled: true,
  showAdPlaceholders: true,
  downloadTimerSeconds: 5,
  monetagHeaderScript: `<!-- Monetag Header Integration Placeholder -->
<script src="https://alwingulla.com/88/tag.min.js" data-zone="123456" async data-cfasync="false"></script>`,
  inPagePushScript: `<!-- Monetag In-Page Push Banner Placeholder -->
<script style="display:none">/* In-Page Push Ad Script active */</script>`,
  nativeBannerScript: `<!-- Monetag Native Banner 300x250 Placeholder -->
<div id="monetag-native-banner"></div>`,
  directLinkUrl: 'https://otourgod.com/4/8912345'
};
