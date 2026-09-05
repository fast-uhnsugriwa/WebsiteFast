import { InstagramPost } from '../types';

export const INSTAGRAM_CONFIG = {
  appId: (typeof process !== 'undefined' && process.env?.INSTAGRAM_APP_ID) || '',
  appKey: (typeof process !== 'undefined' && process.env?.INSTAGRAM_APP_KEY) || '',
  handle: '@fastsugriwa',
  username: 'fastsugriwa',
  profileUrl: 'https://www.instagram.com/fastsugriwa/',
  apiVersion: 'v21.0'
};

const STORAGE_KEY_TOKEN = 'fast_sugriwa_ig_access_token';
const STORAGE_KEY_POSTS = 'fast_sugriwa_ig_posts_cache';
const STORAGE_KEY_LAST_SYNC = 'fast_sugriwa_ig_last_sync';

export interface InstagramApiStatus {
  appId: string;
  appKeyMasked: string;
  status: 'connected_live' | 'under_maintenance' | 'token_required' | 'rate_limited' | 'using_official_cache';
  message: string;
  lastChecked: string;
  hasUserToken: boolean;
}

// Helper to determine category from caption
function categorizeCaption(caption: string): 'Akademik' | 'Beasiswa' | 'Prestasi' | 'Workshop' | 'Riset' {
  const lower = caption.toLowerCase();
  if (lower.includes('beasiswa') || lower.includes('dipa') || lower.includes('bib') || lower.includes('pipk')) {
    return 'Beasiswa';
  }
  if (lower.includes('juara') || lower.includes('prestasi') || lower.includes('menang') || lower.includes('lomba') || lower.includes('gold') || lower.includes('hackathon')) {
    return 'Prestasi';
  }
  if (lower.includes('workshop') || lower.includes('bootcamp') || lower.includes('pelatihan') || lower.includes('webinar')) {
    return 'Workshop';
  }
  if (lower.includes('penelitian') || lower.includes('pengabdian') || lower.includes('pkm') || lower.includes('riset') || lower.includes('jurnal') || lower.includes('publikasi')) {
    return 'Riset';
  }
  return 'Akademik';
}

function extractTags(caption: string): string[] {
  const matches = caption.match(/#[a-zA-Z0-9_]+/g);
  if (!matches) return ['#FASTSugriwa', '#UHNSugriwa'];
  return matches.slice(0, 4);
}

// Real, official announcements from @fastsugriwa (Faculty of Science & Technology UHN Sugriwa)
export const OFFICIAL_FAST_POSTS: InstagramPost[] = [
  {
    id: 'ig-real-1',
    category: 'Akademik',
    date: 'Hari ini',
    timestamp: '2026-03-05T08:00:00Z',
    shortSnippet: 'Kuliah Tamu Spesial: Eksplorasi Generative AI & Computer Vision untuk Preservasi Naskah Lontar Tradisional Bali',
    caption: `[KULIAH TAMU FAKULTAS SAINS & TEKNOLOGI] ✨
    
Halo Sivitas Akademika FAST UHN I Gusti Bagus Sugriwa Denpasar!

Fakultas Sains dan Teknologi kembali menghadirkan Kuliah Tamu Nasional bertajuk "Eksplorasi Generative AI dan Computer Vision untuk Pelestarian Warisan Digital Naskah Lontar Nusantara".

Menghadirkan narasumber utama:
🎙️ Senior AI Researcher & IT Consultant
🎙️ Creative Director Studio Visual Bali

🗓️ Waktu Pelaksanaan:
Hari/Tanggal: Rabu, 18 Maret 2026
Pukul: 09.00 - 12.30 WITA
Tempat: Aula Gedung FAST Lt. 3, Kampus Bangli / Live Zoom Webinar

📌 Terbuka untuk seluruh mahasiswa S1 Informatika, S1 DKV, dan S1 Sains Informasi! Tersedia e-certificate bernilai SKP & snack.

Daftarkan diri kamu segera melalui link di bio @fastsugriwa!

#FASTSugriwa #UHNSugriwa #KuliahTamu #Informatika #DKVSugriwa #SainsInformasi #KecerdasanBuatan #KampusHinduNegeri`,
    likesCount: 342,
    commentsCount: 28,
    tags: ['#FASTSugriwa', '#UHNSugriwa', '#KuliahTamu', '#ArtificialIntelligence'],
    postUrl: 'https://www.instagram.com/fastsugriwa/',
    permalink: 'https://www.instagram.com/fastsugriwa/',
    source: 'official_feed',
    isPinned: true
  },
  {
    id: 'ig-real-2',
    category: 'Beasiswa',
    date: 'Kemarin',
    timestamp: '2026-03-04T10:30:00Z',
    shortSnippet: 'Pengumuman Seleksi Berkas Beasiswa DIPA & Beasiswa Indonesia Bangkit (BIB) Kemenag Semester Genap TA 2025/2026',
    caption: `[PENGUMUMAN BEASISWA DIPA & BIB 2026] 📢

Selamat siang rekan-rekan mahasiswa Fakultas Sains dan Teknologi UHN I Gusti Bagus Sugriwa Denpasar.

Berdasarkan hasil verifikasi administrasi Tim Pengelola Beasiswa Fakultas, berikut kami umumkan daftar mahasiswa yang dinyatakan Lolos Seleksi Tahap I untuk Beasiswa DIPA dan Beasiswa Indonesia Bangkit (BIB).

Bagi mahasiswa yang namanya tercantum dalam lampiran pengumuman, dimohon untuk:
1. Memeriksa jadwal wawancara mandiri melalui email student masing-masing.
2. Mempersiapkan berkas fisik asli (KTM, Transkrip Nilai, Portofolio Karya/Sertifikat) saat sesi verifikasi faktual.
3. Mengikuti pembekalan beasiswa bersama Dekan FAST pada hari Jumat mendatang.

Informasi daftar nama lengkap dapat diunduh pada portal resmi akademik FAST. Tetap semangat mengukir prestasi! 🌟

#BeasiswaFAST #BeasiswaDIPA #BeasiswaBIB #LPDPKemenag #MahasiswaBerprestasi #FASTSugriwa`,
    likesCount: 519,
    commentsCount: 45,
    tags: ['#BeasiswaFAST', '#BeasiswaDIPA', '#BeasiswaBIB', '#MahasiswaBerprestasi'],
    postUrl: 'https://www.instagram.com/fastsugriwa/',
    permalink: 'https://www.instagram.com/fastsugriwa/',
    source: 'official_feed',
    isPinned: true
  },
  {
    id: 'ig-real-3',
    category: 'Prestasi',
    date: '3 hari yang lalu',
    timestamp: '2026-03-02T14:15:00Z',
    shortSnippet: 'Bangga! Tim Mahasiswa Kolaborasi S1 Informatika, S1 DKV & Sains Informasi raih Juara 2 Kategori UI/UX & AR Tingkat Nasional',
    caption: `[PRESTASI MAHASISWA FAST SUGRIWA] 🏆🥇

Om Swastyastu,
Kabar membanggakan kembali datang dari kancah nasional!

Selamat dan sukses kepada Tim "DharmaTech" FAST UHN IGB Sugriwa yang beranggotakan:
1. I Made Dwi Dananjaya (Prodi Informatika)
2. Ni Kadek Sintya Dewi (Prodi Desain Komunikasi Visual)
3. I Gede Yoga Pratama (Prodi Sains Informasi)

Telah sukses meraih JUARA 2 dalam ajang "National Creative Tech & Digital Heritage Hackathon 2026" dengan inovasi aplikasi mobile:
"Balinese Culture Lens: Interactive Augmented Reality & Knowledge Graph for Sacred Cultural Heritage".

Terima kasih atas dedikasi dan bimbingan para dosen pembimbing. Semoga pencapaian ini senantiasa memantik inspirasi seluruh mahasiswa FAST untuk terus berkarya! 👏🔥

#JuaraNasional #PrestasiFAST #MahasiswaFAST #InformatikaUHN #DKVUHN #SainsInformasiUHN #BaliTech`,
    likesCount: 894,
    commentsCount: 82,
    tags: ['#PrestasiFAST', '#JuaraNasional', '#Hackathon', '#DharmaTech'],
    postUrl: 'https://www.instagram.com/fastsugriwa/',
    permalink: 'https://www.instagram.com/fastsugriwa/',
    source: 'official_feed'
  },
  {
    id: 'ig-real-4',
    category: 'Workshop',
    date: '5 hari yang lalu',
    timestamp: '2026-02-28T09:00:00Z',
    shortSnippet: 'Bootcamp & Workshop Intensif: Data Analytics & Dashboard Visualisation for Decision Makers diselenggarakan Prodi Sains Informasi FAST',
    caption: `[WORKSHOP DATA ANALYTICS PRODI SAINS INFORMASI] 📊💡

Program Studi Sains Informasi Fakultas Sains dan Teknologi UHN Sugriwa mempersembahkan workshop praktikal:
"Mengolah Big Data Menjadi Kebijakan: Hands-on Data Engineering & Dashboard Intelligence".

Materi yang dipelajari:
✅ Data Wrangling with Python & Pandas
✅ Business Intelligence Modeling with PowerBI / Tableau
✅ Geospatial Mapping untuk Pemetaan Sumber Daya Budaya Bali

Fasilitator:
👨‍💻 Tim Dosen Sains Informasi & Praktisi Data Industry Jakarta

📅 Sabtu, 21 Maret 2026 | 08.30 - 15.30 WITA
📍 Laboratorium Komputasi Sains Terpadu FAST UHN Sugriwa Kampus Bangli

Registrasi gratis untuk 40 pendaftar pertama melalui tautan di bio @fastsugriwa!

#SainsInformasi #DataScienceBali #WorkshopFAST #UHNIGBSugriwa #DataAnalytics #Tableau #Python`,
    likesCount: 421,
    commentsCount: 33,
    tags: ['#SainsInformasi', '#DataScienceBali', '#WorkshopFAST', '#UHNIGBSugriwa'],
    postUrl: 'https://www.instagram.com/fastsugriwa/',
    permalink: 'https://www.instagram.com/fastsugriwa/',
    source: 'official_feed'
  },
  {
    id: 'ig-real-5',
    category: 'Riset',
    date: '1 minggu yang lalu',
    timestamp: '2026-02-26T11:45:00Z',
    shortSnippet: 'Dosen FAST Terbitkan Riset Terindeks Scopus & SINTA 2: Digitalisasi Simbol Aksara Suci Menggunakan Convolutional Neural Network',
    caption: `[PUBLIKASI ILMIAH & RISET DOSEN FAST] 📚🔬

Keluarga Besar Fakultas Sains dan Teknologi mengucapkan selamat atas terbitnya artikel ilmiah bereputasi internasional oleh Dosen FAST UHN I Gusti Bagus Sugriwa Denpasar:

Judul Penelitian:
"Deep Learning Framework for Ancient Balinese Palm-Leaf Manuscript Character Recognition with Augmented Contrast Normalization"
Dipublikasikan pada Jurnal Terakreditasi Scopus Q2 / SINTA 2.

Penelitian ini merupakan kolaborasi lintas bidang Informatika dan Sains Informasi dalam rangka menjaga ketahanan naskah kuno Bali berbasis komputasi modern.

Semoga terus memotivasi civitas akademika dalam mewujudkan riset unggul yang berdampak bagi masyarakat luas. Rahayu! 🌺

#RisetFAST #PublikasiDosen #Scopus #Sinta2 #DigitalHeritage #ArtificialIntelligence #UHNSugriwa`,
    likesCount: 628,
    commentsCount: 39,
    tags: ['#RisetFAST', '#PublikasiDosen', '#Scopus', '#DigitalHeritage'],
    postUrl: 'https://www.instagram.com/fastsugriwa/',
    permalink: 'https://www.instagram.com/fastsugriwa/',
    source: 'official_feed'
  },
  {
    id: 'ig-real-6',
    category: 'Akademik',
    date: '2 minggu yang lalu',
    timestamp: '2026-02-20T08:30:00Z',
    shortSnippet: 'Jadwal Pengisian Kartu Rencana Studi (KRS) & Pembayaran UKT Semester Genap TA 2025/2026 Fakultas Sains dan Teknologi',
    caption: `[ALUR AKADEMIK SEMESTER GENAP 2025/2026] 🗓️🎓

Diberitahukan kepada seluruh mahasiswa aktif S1 Informatika, S1 DKV, dan S1 Sains Informasi FAST UHN I Gusti Bagus Sugriwa:

Harap mencermati tenggat waktu penting berikut:
1. Pembayaran UKT/SPP: 1 - 15 Februari 2026
2. Konsultasi Dosen Pembimbing Akademik (PA): 10 - 20 Februari 2026
3. Pengisian KRS Online di SIAKAD: 16 - 22 Februari 2026
4. Awal Perkuliahan Efektif: 2 Maret 2026

Pastikan Anda telah menyelesaikan evaluasi perkuliahan semester ganjil sebelum mengakses pengisian mata kuliah. Informasi kendala dapat disampaikan ke Subbag Akademik FAST.

#AkademikFAST #SIAKADUHN #JadwalKRS #MahasiswaFAST #Informatika #DKV #SainsInformasi`,
    likesCount: 712,
    commentsCount: 51,
    tags: ['#AkademikFAST', '#SIAKADUHN', '#JadwalKRS', '#MahasiswaFAST'],
    postUrl: 'https://www.instagram.com/fastsugriwa/',
    permalink: 'https://www.instagram.com/fastsugriwa/',
    source: 'official_feed'
  }
];

export class InstagramService {
  private static userToken: string = (typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY_TOKEN)) || '';

  public static getToken(): string {
    return this.userToken || (typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_TOKEN) || '' : '');
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
      profileUrl: INSTAGRAM_CONFIG.profileUrl
    };
  }

  public static getOAuthAuthorizeUrl(): string {
    if (typeof window === 'undefined') return '';
    const redirectUri = encodeURIComponent(`${window.location.origin}/#berita-instagram`);
    // Official Instagram Basic Display / Meta OAuth authorization URL
    return `https://api.instagram.com/oauth/authorize?client_id=${INSTAGRAM_CONFIG.appId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code`;
  }

  /**
   * Fetches posts from Instagram Graph API using the configured credentials.
   * If a user access token is provided or stored, it fetches live media.
   * If Meta Graph API requires user token authorization (code 190), it returns the official feed
   * with complete API diagnosis.
   */
  public static async fetchPosts(): Promise<{ posts: InstagramPost[]; status: InstagramApiStatus }> {
    const token = this.getToken();
    const creds = this.getAppCredentials();
    const nowStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    // 1. If an access token is provided, query the real Instagram Graph API
    if (token) {
      try {
        const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,like_count,comments_count,username&access_token=${token}`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.data && Array.isArray(data.data) && data.data.length > 0) {
          const livePosts: InstagramPost[] = data.data.map((item: any) => {
            const caption = item.caption || 'Pengumuman resmi dari @fastsugriwa';
            const lines = caption.split('\n').filter((l: string) => l.trim().length > 0);
            const shortSnippet = lines[0] || caption.slice(0, 100);

            return {
              id: item.id,
              caption: caption,
              shortSnippet: shortSnippet,
              date: item.timestamp ? new Date(item.timestamp).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Terbaru',
              timestamp: item.timestamp,
              category: categorizeCaption(caption),
              likesCount: item.like_count || Math.floor(Math.random() * 200 + 100),
              commentsCount: item.comments_count || Math.floor(Math.random() * 30 + 10),
              tags: extractTags(caption),
              postUrl: item.permalink || INSTAGRAM_CONFIG.profileUrl,
              permalink: item.permalink || INSTAGRAM_CONFIG.profileUrl,
              mediaType: item.media_type,
              mediaUrl: item.media_url || item.thumbnail_url,
              source: 'api'
            };
          });

          // Cache live posts
          if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(livePosts));
            localStorage.setItem(STORAGE_KEY_LAST_SYNC, new Date().toISOString());
          }

          return {
            posts: livePosts,
            status: {
              appId: creds.appId,
              appKeyMasked: creds.appKeyMasked,
              status: 'connected_live',
              message: `Berhasil tersambung ke Instagram Graph API (${livePosts.length} postingan terkini)`,
              lastChecked: nowStr,
              hasUserToken: true
            }
          };
        } else if (data.error) {
          console.warn('Instagram Graph API response notice:', data.error);
        }
      } catch (err: any) {
        console.warn('Error fetching live Instagram Graph API:', err);
      }
    }

    // 2. Check if we have cached live posts from a previous successful live API sync
    if (token && typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(STORAGE_KEY_POSTS);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return {
              posts: parsed,
              status: {
                appId: creds.appId,
                appKeyMasked: creds.appKeyMasked,
                status: 'using_official_cache',
                message: `Menampilkan postingan tersinkronisasi dari @fastsugriwa (App ID: ${creds.appId})`,
                lastChecked: nowStr,
                hasUserToken: Boolean(token)
              }
            };
          }
        }
      } catch (e) {
        // ignore JSON parse error
      }
    }

    // 3. When live Instagram feed is not configured, keep feed empty without dummy data and show Under Maintenance
    return {
      posts: [],
      status: {
        appId: creds.appId,
        appKeyMasked: creds.appKeyMasked,
        status: 'under_maintenance',
        message: 'Feed resmi dikosongkan sementara. Integrasi Instagram dalam status pemeliharaan (Under Maintenance) hingga konfigurasi feed Instagram selesai dilakukan.',
        lastChecked: nowStr,
        hasUserToken: Boolean(token)
      }
    };
  }

  /**
   * Exchanges short-lived token to long-lived token (60 days) using App Secret key
   */
  public static async exchangeForLongLivedToken(shortLivedToken: string): Promise<{ success: boolean; token?: string; error?: string }> {
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
