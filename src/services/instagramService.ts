import { InstagramPost } from '../types';

export const INSTAGRAM_CONFIG = {
  feedUrl:
    (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_BEHOLD_FEED_URL) ||
    'https://feeds.behold.so/ixTc8BrGBsXeSpLQs7wN',
  appId:
    (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_INSTAGRAM_APP_ID) ||
    (typeof process !== 'undefined' && process.env?.INSTAGRAM_APP_ID) ||
    '3162817783914832',
  appKey:
    (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_INSTAGRAM_APP_KEY) ||
    (typeof process !== 'undefined' && process.env?.INSTAGRAM_APP_KEY) ||
    '189490cf107cf96231414fcb3afd12e9',
  accessToken:
    (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_INSTAGRAM_ACCESS_TOKEN) ||
    (typeof process !== 'undefined' && process.env?.INSTAGRAM_ACCESS_TOKEN) ||
    'IGAAs8kOZAZC4VBBZAGJ3QUJjeEJjbU5iVzJhNE9PcDltODJEUFY2b3dDMzNuME1kSlBrcjMyTXlnY1ctNzJEUVR2ZAF91UTJVWl91cXpEVnFSb3NYYk9UVmNZAR3hFZAUc3cmhaSnJVd1lFdXNqVDJvYmJLYkYwNGZAiNEtXdGF5S1d2MAZDZD',
  handle: '@fastsugriwa',
  username: 'fastsugriwa',
  profileUrl: 'https://www.instagram.com/fastsugriwa/',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61588343014740',
  profilePictureUrl: '/fast_instagram_profile.webp',
  apiVersion: 'v21.0'
};

const STORAGE_KEY_TOKEN = 'fast_sugriwa_ig_access_token';
const STORAGE_KEY_POSTS = 'fast_sugriwa_ig_posts_cache';
const STORAGE_KEY_ACCUMULATED = 'fast_sugriwa_ig_accumulated_posts_v3';
const STORAGE_KEY_LAST_SYNC = 'fast_sugriwa_ig_last_sync';

/**
 * Deteksi Postingan yang di-pin HANYA melalui tagar / caption: #pinned
 * Sesuai instruksi: hanya postingan yang memiliki hashtag #pinned yang disematkan ke paling atas.
 */
export function isPostPinned(post: Partial<InstagramPost>): boolean {
  if (!post.caption) return false;
  return /#pinned\b/i.test(post.caption);
}

export interface InstagramApiStatus {
  appId: string;
  appKeyMasked: string;
  status: 'connected_live' | 'under_maintenance' | 'token_required' | 'rate_limited' | 'using_official_cache';
  message: string;
  lastChecked: string;
  hasUserToken: boolean;
  totalPosts: number;
}

// Helper to determine category from caption with high-precision filtering
function categorizeCaption(caption: string): 'Akademik' | 'Beasiswa' | 'Prestasi' | 'Workshop' | 'Riset' | 'Hari Raya' {
  const text = (caption || '').toLowerCase();

  // 1. PRESTASI & PENGHARGAAN
  // (Pemenang lomba, juara kompetisi, lulus doktor S3 dosen, pelantikan & sumpah PNS dosen FAST)
  const isPelantikanPNS = /pelantikan.*pns|pengambilan\s*sumpah.*pegawai\s*negeri|sumpah\s*pns|pns\s*100%/i.test(text);
  const isJuaraLomba = /\b(juara|juara\s*[1-3]|juara\s*umum|pemenang|gold medal|silver medal|bronze medal)\b/i.test(text);
  const isPrestasiAkademik = /lulus\s*s3|gelar\s*doktor|predikat\s*sangat\s*memuaskan|\bcumlaude\b|civitas\s*berprestasi/i.test(text);

  if (isPelantikanPNS || isJuaraLomba || isPrestasiAkademik) {
    return 'Prestasi';
  }

  // 2. HARI RAYA KEAGAMAAN & PERINGATAN HARI NASIONAL
  // Spesifik agar tidak mencocokkan nama orang (misal 'Gita Saraswati'), Dies Natalis, atau kata umum sehari-hari
  const isHariRaya =
    /hari\s*raya|rahina\s*suci|nyanggra\s*rahina/i.test(text) ||
    /\b(nyepi|galungan|kuningan|siwaratri|tumpek|tawur)\b/i.test(text) ||
    /(hari\s*(suci|raya)|rahina)\s*saraswati/i.test(text) ||
    /\b(pagerwesi)\b/i.test(text) ||
    /\b(idul\s*fitri|idul\s*adha|maulid|isra\s*mi'?raj)\b/i.test(text) ||
    /\b(waisak|imlek|jumat\s*agung|kenaikan\s*yesus)\b/i.test(text) ||
    /\b(dirgahayu|hari\s*kemerdekaan|hari\s*lahir\s*pancasila|hari\s*pendidikan|hari\s*buruh|hari\s*kartini|hari\s*kebangkitan\s*nasional|hari\s*anak\s*nasional|hari\s*pahlawan)\b/i.test(text);

  if (isHariRaya && !/dies\s*natalis/i.test(text) && !/aptikom/i.test(text)) {
    return 'Hari Raya';
  }

  // 3. RISET & PENGABDIAN KEPADA MASYARAKAT (Tri Dharma Perguruan Tinggi)
  const isRiset =
    /pengabdian\s*(kepada\s*)?masyarakat|\bpkm\b/i.test(text) ||
    /konferensi\s*internasional|international\s*conference|co-host\s*iconiq/i.test(text) ||
    /\b(publikasi\s*ilmiah|jurnal\s*ilmiah|scopus|sinta)\b/i.test(text) ||
    /jejaring\s*riset|penelitian\s*dan\s*pengabdian/i.test(text);

  if (isRiset && !/rapat\s*koordinasi|persiapan\s*perkuliahan/i.test(text)) {
    return 'Riset';
  }

  // 4. WORKSHOP, BOOTCAMP & TRAINING
  const isWorkshop =
    /\b(workshop|bootcamp|pelatihan|webinar|lokakarya)\b/i.test(text) ||
    /apple\s*developer\s*academy/i.test(text) ||
    /kuliah\s*umum|guest\s*lecture|study\s*tour|studi\s*ekskursi/i.test(text);

  if (isWorkshop) {
    return 'Workshop';
  }

  // 5. BEASISWA
  const isBeasiswa =
    /\b(beasiswa|beasiswa\s*dipa|beasiswa\s*bib|kip-k|kip\s*kuliah|bantuan\s*ukt)\b/i.test(text) ||
    /peluang\s*beasiswa|program\s*beasiswa/i.test(text);

  if (isBeasiswa && !/rapat\s*koordinasi|persiapan\s*perkuliahan/i.test(text)) {
    return 'Beasiswa';
  }

  // 6. DEFAULT: AKADEMIK (MASAYU/Maba, Rapat Koordinasi, Magang/PKL, Kurikulum, Dies Natalis, Promosi Prodi)
  return 'Akademik';
}

function extractTags(caption: string): string[] {
  const matches = caption.match(/#[a-zA-Z0-9_]+/g);
  if (!matches || matches.length === 0) return ['#FASTSugriwa', '#UHNSugriwa'];
  return matches.slice(0, 4);
}

import { INSTAGRAM_POSTS } from '../data/instagramPosts';

// Postingan resmi FAST UHN Sugriwa (100% foto dan data asli dari @fastsugriwa)
export const OFFICIAL_FAST_POSTS: InstagramPost[] = INSTAGRAM_POSTS;

export class InstagramService {
  private static userToken: string =
    (typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY_TOKEN)) ||
    INSTAGRAM_CONFIG.accessToken ||
    '';

  public static getToken(): string {
    return (
      this.userToken ||
      (typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_TOKEN) || '' : '') ||
      INSTAGRAM_CONFIG.accessToken ||
      ''
    );
  }

  public static setToken(token: string): void {
    this.userToken = token.trim();
    if (typeof window !== 'undefined') {
      if (token.trim()) {
        localStorage.setItem(STORAGE_KEY_TOKEN, token.trim());
      } else {
        localStorage.removeItem(STORAGE_KEY_TOKEN);
      }
    }
  }

  public static getAppCredentials() {
    return {
      appId: INSTAGRAM_CONFIG.appId,
      appKey: INSTAGRAM_CONFIG.appKey,
      appKeyMasked: `${INSTAGRAM_CONFIG.appKey.slice(0, 4)}••••••••••••••••${INSTAGRAM_CONFIG.appKey.slice(-4)}`,
      apiVersion: INSTAGRAM_CONFIG.apiVersion,
      handle: INSTAGRAM_CONFIG.handle,
      profileUrl: INSTAGRAM_CONFIG.profileUrl,
      facebookUrl: INSTAGRAM_CONFIG.facebookUrl
    };
  }

  /**
   * Helper Smart Merge: Menggabungkan postingan live baru dengan riwayat postingan lama
   * Menolak dan membuang semua gambar placeholder/unsplash agar 100% foto otentik FAST.
   */
  private static mergeAccumulatedPosts(
    newLivePosts: InstagramPost[],
    cachedPosts: InstagramPost[],
    archivePosts: InstagramPost[]
  ): InstagramPost[] {
    const map = new Map<string, InstagramPost>();

    // Hanya menerima postingan dengan foto asli (bukan unsplash / mockup)
    const isAuthentic = (p: InstagramPost) => {
      if (!p || !p.mediaUrl) return false;
      if (p.mediaUrl.includes('unsplash.com')) return false;
      return true;
    };

    // 1. Prioritas tertinggi: Postingan live terbaru (dari Behold atau Graph API)
    for (const p of newLivePosts) {
      if (isAuthentic(p)) {
        if (p.id) map.set(p.id, p);
        if (p.permalink) map.set(p.permalink, p);
      }
    }

    // 2. Postingan dari riwayat cache (hanya yang otentik)
    for (const p of cachedPosts) {
      if (isAuthentic(p)) {
        const key = p.id || p.permalink;
        if (key && !map.has(key) && (!p.permalink || !map.has(p.permalink))) {
          map.set(key, p);
        }
      }
    }

    // 3. Postingan kurasi arsip resmi fakultas (hanya yang otentik)
    for (const p of archivePosts) {
      if (isAuthentic(p)) {
        const key = p.id || p.permalink;
        if (key && !map.has(key) && (!p.permalink || !map.has(p.permalink))) {
          map.set(key, p);
        }
      }
    }

    // Urutkan dengan prioritas PINNED POSTS di paling atas, kemudian tanggal terbaru
    const combined = Array.from(new Set(map.values())).map((post) => ({
      ...post,
      category: categorizeCaption(post.caption || ''),
      isPinned: isPostPinned(post)
    }));

    return combined.sort((a, b) => {
      // 1. Postingan yang disematkan (isPinned) selalu berada di urutan teratas
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;

      // 2. Kemudian urutkan berdasarkan waktu/tanggal terbaru
      const tA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
      const tB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
      return tB - tA;
    });
  }

  /**
   * CARA 2: Mengambil postingan langsung dari Meta Instagram Graph API / Facebook Graph API
   * Mendukung hingga 100 postingan live secara resmi tanpa limit 6 Behold!
   */
  private static async fetchViaMetaGraphApi(token: string): Promise<InstagramPost[] | null> {
    try {
      // Coba Instagram Graph API endpoint
      const igUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,like_count,comments_count,username,children{media_type,media_url}&limit=100&access_token=${encodeURIComponent(
        token
      )}`;

      const res = await fetch(igUrl, { signal: AbortSignal.timeout(7000) });
      const data = await res.json();

      if (data.data && Array.isArray(data.data) && data.data.length > 0) {
        return data.data.map((item: any) => {
          const caption = item.caption || 'Pengumuman resmi dari @fastsugriwa';
          const lines = caption.split('\n').map((l: string) => l.trim()).filter((l: string) => l.length > 0);
          const shortSnippet = lines[0] || caption.slice(0, 100);
          const isVideo = item.media_type === 'VIDEO' || item.media_type === 'REEL';
          const displayImage = isVideo
            ? item.thumbnail_url || item.media_url
            : item.media_url || item.thumbnail_url;

          return {
            id: item.id,
            caption,
            shortSnippet,
            date: item.timestamp
              ? new Date(item.timestamp).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })
              : 'Terbaru',
            timestamp: item.timestamp,
            category: categorizeCaption(caption),
            likesCount: item.like_count ?? 0,
            commentsCount: item.comments_count ?? 0,
            tags: extractTags(caption),
            postUrl: item.permalink || INSTAGRAM_CONFIG.profileUrl,
            permalink: item.permalink || INSTAGRAM_CONFIG.profileUrl,
            mediaType: isVideo ? 'REEL' : (item.media_type || 'IMAGE'),
            mediaUrl: displayImage,
            thumbnailUrl: item.thumbnail_url || displayImage,
            videoUrl: isVideo ? item.media_url : undefined,
            videoEmbedUrl: isVideo && item.permalink ? `${item.permalink.replace(/\/+$/, '')}/embed/` : undefined,
            authorAvatar: INSTAGRAM_CONFIG.profilePictureUrl,
            source: 'api',
            isPinned: isPostPinned({ id: item.id, permalink: item.permalink, caption })
          };
        });
      }

      // Jika bukan token Instagram, coba sebagai Facebook Page Feed API
      const fbUrl = `https://graph.facebook.com/v21.0/me/feed?fields=id,message,created_time,full_picture,permalink_url,shares,attachments{media,subattachments}&limit=50&access_token=${encodeURIComponent(
        token
      )}`;
      const fbRes = await fetch(fbUrl, { signal: AbortSignal.timeout(7000) });
      const fbData = await fbRes.json();

      if (fbData.data && Array.isArray(fbData.data) && fbData.data.length > 0) {
        return fbData.data
          .filter((item: any) => item.message || item.full_picture)
          .map((item: any) => {
            const caption = item.message || 'Publikasi resmi Facebook FAST UHN Sugriwa';
            const lines = caption.split('\n').map((l: string) => l.trim()).filter((l: string) => l.length > 0);
            const shortSnippet = lines[0] || caption.slice(0, 100);
            const image =
              item.full_picture ||
              item.attachments?.data?.[0]?.media?.image?.src ||
              INSTAGRAM_CONFIG.profilePictureUrl;

            return {
              id: item.id,
              caption,
              shortSnippet,
              date: item.created_time
                ? new Date(item.created_time).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })
                : 'Terbaru',
              timestamp: item.created_time,
              category: categorizeCaption(caption),
              likesCount: item.shares?.count ?? 15,
              commentsCount: 0,
              tags: extractTags(caption),
              postUrl: item.permalink_url || INSTAGRAM_CONFIG.facebookUrl,
              permalink: item.permalink_url || INSTAGRAM_CONFIG.facebookUrl,
              mediaType: 'IMAGE',
              mediaUrl: image,
              thumbnailUrl: image,
              authorAvatar: INSTAGRAM_CONFIG.profilePictureUrl,
              source: 'api'
            };
          });
      }
    } catch (e) {
      console.warn('Meta Graph API request error:', e);
    }
    return null;
  }

  /**
   * Mengambil seluruh postingan dengan menggabungkan:
   * 1. Meta Graph API (jika token tersedia - Cara 2)
   * 2. Live feed Behold.so 6 postingan terbaru
   * 3. Smart accumulative merge dengan riwayat postingan (Cara 1)
   */
  public static async fetchPosts(): Promise<{ posts: InstagramPost[]; status: InstagramApiStatus }> {
    const token = this.getToken();
    const creds = this.getAppCredentials();
    const nowStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    // Baca riwayat cache yang tersimpan di browser
    let cachedAccumulated: InstagramPost[] = [];
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY_ACCUMULATED) || localStorage.getItem(STORAGE_KEY_POSTS);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            cachedAccumulated = parsed.filter((p: any) => p?.mediaUrl && !p.mediaUrl.includes('unsplash.com'));
          }
        }
      } catch (e) {
        // ignore JSON parse error
      }
    }

    // CARA 2: Jika token Meta terpasang, gunakan Meta Graph API resmi (hingga 100 postingan live)
    if (token) {
      const metaPosts = await this.fetchViaMetaGraphApi(token);
      if (metaPosts && metaPosts.length > 0) {
        const merged = this.mergeAccumulatedPosts(metaPosts, cachedAccumulated, OFFICIAL_FAST_POSTS);
        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_KEY_ACCUMULATED, JSON.stringify(merged));
          localStorage.setItem(STORAGE_KEY_LAST_SYNC, new Date().toISOString());
        }
        return {
          posts: merged,
          status: {
            appId: creds.appId,
            appKeyMasked: creds.appKeyMasked,
            status: 'connected_live',
            message: `Terhubung via Meta Graph API resmi (${metaPosts.length} postingan live)`,
            lastChecked: nowStr,
            hasUserToken: true,
            totalPosts: merged.length
          }
        };
      }
    }

    // CARA 1: Smart Merge dengan Live Behold Feed + Akumulasi Arsip Lengkap
    if (INSTAGRAM_CONFIG.feedUrl) {
      try {
        const res = await fetch(INSTAGRAM_CONFIG.feedUrl, { signal: AbortSignal.timeout(6000) });
        if (res.ok) {
          const data = await res.json();
          const profilePic = data.profilePictureUrl || INSTAGRAM_CONFIG.profilePictureUrl;
          const rawPosts = Array.isArray(data) ? data : data.posts || [];

          if (Array.isArray(rawPosts) && rawPosts.length > 0) {
            const liveFromBehold: InstagramPost[] = rawPosts.map((item: any) => {
              const caption = item.caption || 'Postingan resmi dari @fastsugriwa';
              const cleanLines = caption.split('\n').map((l: string) => l.trim()).filter((l: string) => l.length > 0);
              const shortSnippet = cleanLines[0] || caption.slice(0, 100);
              const isVideo = item.mediaType === 'VIDEO' || item.mediaType === 'REEL' || item.media_type === 'VIDEO';

              // Gunakan media resolusi tinggi
              const displayImage = isVideo
                ? item.sizes?.large?.mediaUrl || item.thumbnailUrl || item.mediaUrl
                : item.sizes?.large?.mediaUrl || item.mediaUrl || item.thumbnailUrl;

              return {
                id: item.id || `behold-${Math.random()}`,
                caption,
                shortSnippet,
                date: item.timestamp
                  ? new Date(item.timestamp).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })
                  : 'Terbaru',
                timestamp: item.timestamp,
                category: categorizeCaption(caption),
                likesCount: item.likeCount ?? item.like_count ?? 30,
                commentsCount: item.commentsCount ?? item.comments_count ?? 0,
                tags: extractTags(caption),
                postUrl: item.permalink || INSTAGRAM_CONFIG.profileUrl,
                permalink: item.permalink || INSTAGRAM_CONFIG.profileUrl,
                mediaType: isVideo ? 'REEL' : (item.mediaType || 'IMAGE'),
                mediaUrl: displayImage,
                thumbnailUrl: item.sizes?.small?.mediaUrl || item.thumbnailUrl || displayImage,
                videoUrl: isVideo ? item.mediaUrl : undefined,
                videoEmbedUrl: isVideo && (item.permalink || item.postUrl) ? `${(item.permalink || item.postUrl).replace(/\/+$/, '')}/embed/` : undefined,
                authorAvatar: profilePic,
                source: 'api'
              };
            });

            // GABUNGKAN 6 postingan live Behold + seluruh riwayat sebelumnya + arsip resmi FAST
            const mergedPosts = this.mergeAccumulatedPosts(liveFromBehold, cachedAccumulated, OFFICIAL_FAST_POSTS);

            // Simpan ke cache browser permanen
            if (typeof window !== 'undefined') {
              localStorage.setItem(STORAGE_KEY_ACCUMULATED, JSON.stringify(mergedPosts));
              localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(mergedPosts));
              localStorage.setItem(STORAGE_KEY_LAST_SYNC, new Date().toISOString());
            }

            return {
              posts: mergedPosts,
              status: {
                appId: creds.appId,
                appKeyMasked: creds.appKeyMasked,
                status: 'connected_live',
                message: `Sinkronisasi Instagram @fastsugriwa aktif (${liveFromBehold.length} live Behold + ${
                  mergedPosts.length - liveFromBehold.length
                } arsip riwayat = ${mergedPosts.length} postingan)`,
                lastChecked: nowStr,
                hasUserToken: Boolean(token),
                totalPosts: mergedPosts.length
              }
            };
          }
        }
      } catch (err) {
        console.warn('Error fetching live Instagram from Behold feed:', err);
      }
    }

    // Fallback darurat: Jika jaringan offline, sajikan akumulasi cache & arsip
    const fallbackList = this.mergeAccumulatedPosts([], cachedAccumulated, OFFICIAL_FAST_POSTS);
    return {
      posts: fallbackList,
      status: {
        appId: creds.appId,
        appKeyMasked: creds.appKeyMasked,
        status: 'using_official_cache',
        message: `Menampilkan ${fallbackList.length} postingan riwayat resmi FAST UHN Sugriwa`,
        lastChecked: nowStr,
        hasUserToken: Boolean(token),
        totalPosts: fallbackList.length
      }
    };
  }

  /**
   * Menukarkan short-lived token menjadi long-lived token (60 hari) menggunakan App Secret
   */
  public static async exchangeForLongLivedToken(
    shortLivedToken: string
  ): Promise<{ success: boolean; token?: string; error?: string }> {
    try {
      const url = `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${INSTAGRAM_CONFIG.appKey}&access_token=${shortLivedToken}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.access_token) {
        this.setToken(data.access_token);
        return { success: true, token: data.access_token };
      }
      return { success: false, error: data.error?.message || 'Gagal menukarkan token Meta' };
    } catch (e: any) {
      return { success: false, error: e.message || 'Koneksi ke server Meta gagal' };
    }
  }
}
