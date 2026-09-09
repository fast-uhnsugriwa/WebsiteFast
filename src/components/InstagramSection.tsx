import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'motion/react';
import {
  Instagram,
  Heart,
  MessageCircle,
  ExternalLink,
  Calendar,
  X,
  ArrowUpRight,
  RefreshCw,
  Wrench
} from 'lucide-react';
import { InstagramPost } from '../types';
import { InstagramService, INSTAGRAM_CONFIG } from '../services/instagramService';

export const InstagramSection: React.FC = () => {
  // 1. Inisialisasi instan (0 ms) dari cache/arsip lokal agar tidak ada lag saat pertama kali load
  const [posts, setPosts] = useState<InstagramPost[]>(() => InstagramService.getInitialPosts());
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activeModalPost, setActiveModalPost] = useState<InstagramPost | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [videoPlayerMode, setVideoPlayerMode] = useState<'video' | 'embed'>('video');

  const categories = useMemo(
    () => ['Semua', 'Akademik', 'Beasiswa', 'Prestasi', 'Workshop', 'Riset', 'Hari Raya'],
    []
  );

  const handleOpenModal = useCallback((post: InstagramPost) => {
    setActiveModalPost(post);
    setVideoPlayerMode(post.videoUrl ? 'video' : 'embed');
  }, []);

  const handleCategoryChange = useCallback((cat: string) => {
    setSelectedCategory(cat);
    setVisibleCount(6);
  }, []);

  // 2. Background Sync (Stale-While-Revalidate): sinkronisasi live tanpa memblokir thread UI
  useEffect(() => {
    let isMounted = true;
    const syncLatestFeed = async () => {
      try {
        const res = await InstagramService.fetchPosts();
        if (isMounted && res.posts && res.posts.length > 0) {
          setPosts(res.posts);
        }
      } catch (err) {
        console.warn('Background sync Instagram feed skipped:', err);
      }
    };

    // Jalankan sync setelah frame pertama selesai agar tidak mengganggu rendering awal
    const timeoutId = setTimeout(() => {
      syncLatestFeed();
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  // 3. Memoized filtering & pagination untuk mencegah kalkulasi ulang saat re-render
  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'Semua') return posts;
    return posts.filter((p) => p.category === selectedCategory);
  }, [posts, selectedCategory]);

  const displayedPosts = useMemo(() => {
    return filteredPosts.slice(0, visibleCount);
  }, [filteredPosts, visibleCount]);

  return (
    <section
      id="berita-instagram"
      aria-label="Berita dan Artikel Instagram FAST"
      className="py-16 sm:py-24 bg-white/80 backdrop-blur-2xs border-b border-stone-200/80 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:6 lg:px-8">
        {/* Section Title & Instagram Profile Header Box with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8"
        >
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-200/70 text-orange-800 text-xs font-bold uppercase tracking-wider shadow-2xs">
                <Instagram className="w-3.5 h-3.5 text-orange-600 animate-pulse" />
                <span>Kabar Terkini & Informasi Resmi {posts.length > 0 ? `(${posts.length} Postingan)` : ''}</span>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Berita & Artikel @fastsugriwa
            </h2>
            <p className="mt-2 text-stone-600 text-sm sm:text-base max-w-2xl">
              Publikasi resmi seputar beasiswa, kuliah umum, prestasi mahasiswa, dan agenda fakultas.
            </p>
          </div>

          {/* Instagram Account Card with Interactive Micro-Animations */}
          <motion.div
            whileHover={{ y: -2 }}
            className="flex flex-wrap items-center gap-3 shrink-0"
          >
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-200 shadow-2xs hover:shadow-md transition-shadow">
              <div className="relative">
                <div className="p-0.5 rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 shadow-2xs">
                  <div className="w-10 h-10 rounded-full bg-white p-0.5 overflow-hidden flex items-center justify-center">
                    <img
                      src={INSTAGRAM_CONFIG.profilePictureUrl}
                      alt="Foto Profil Instagram FAST"
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) => {
                        e.currentTarget.src = '/fast_instagram_profile.webp';
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-stone-900">
                    {INSTAGRAM_CONFIG.handle}
                  </span>
                  <span className="w-3.5 h-3.5 rounded-full bg-orange-500 text-white flex items-center justify-center text-[9px] font-black">
                    ✓
                  </span>
                </div>
                <div className="text-[11px] text-stone-500 font-medium">
                  Akun Resmi FAST UHN Sugriwa
                </div>
              </div>

              <motion.a
                id="link-official-instagram"
                href={INSTAGRAM_CONFIG.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-xs tracking-wide shadow-2xs transition-all cursor-pointer"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Buka Instagram</span>
                <ArrowUpRight className="w-3 h-3" />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Category Filter Pills */}
        {posts.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileTap={{ scale: 0.95 }}
                whileHover={{ y: -1 }}
                id={`filter-category-${cat.toLowerCase()}`}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${selectedCategory === cat
                    ? 'bg-orange-600 text-white shadow-2xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <RefreshCw className="w-8 h-8 text-orange-600 animate-spin mb-3" />
            <p className="text-sm font-semibold text-stone-600">
              Memeriksa konfigurasi Instagram API @fastsugriwa...
            </p>
          </div>
        )}

        {/* Under Maintenance Display (When Feed is Empty / Pending Configuration) with Floating Animation */}
        {!isLoading && posts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 25 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.01 }}
            className="rounded-2xl border-2 border-dashed border-amber-300/90 bg-amber-50/40 p-8 sm:p-14 text-center max-w-3xl mx-auto shadow-xs hover:shadow-md transition-all"
          >
            <motion.div
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-5 border border-amber-200 shadow-xs cursor-pointer"
            >
              <Wrench className="w-8 h-8" />
            </motion.div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
              <span>Status: Under Maintenance</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight mb-3">
              Integrasi Feed Instagram Sedang Dalam Pemeliharaan
            </h3>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl mx-auto mb-6">
              Feed resmi Instagram <strong className="text-stone-900">@fastsugriwa</strong> saat ini dikosongkan sementara selama proses pemeliharaan (<em>under maintenance</em>) sampai konfigurasi feed Instagram selesai dilakukan.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <motion.a
                id="btn-visit-ig-maintenance"
                href={INSTAGRAM_CONFIG.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-xs tracking-wide shadow-md shadow-orange-600/20 transition-all cursor-pointer"
              >
                <Instagram className="w-4 h-4" />
                <span>Kunjungi Akun Resmi @fastsugriwa</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </motion.a>
            </div>
          </motion.div>
        )}

        {/* Instagram Post Cards Grid (Shown when posts are available) */}
        {!isLoading && posts.length > 0 && (
          <div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {displayedPosts.map((post) => (
              <article
                key={post.id}
                id={`post-card-${post.id}`}
                className={`flex flex-col justify-between rounded-xl sm:rounded-2xl bg-white border shadow-2xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden group transform-gpu ${
                  post.isPinned
                    ? 'border-amber-300/90 shadow-amber-500/5 ring-1 ring-amber-400/40'
                    : 'border-stone-200/90 hover:border-amber-400/80'
                }`}
              >
                <div>
                  {/* Post Header: Profile & Date */}
                  <div className="p-2.5 sm:p-4 flex items-center justify-between border-b border-stone-100 bg-stone-50/50 gap-1.5">
                    <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 shrink-0 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 p-0.5 shadow-2xs">
                        <div className="w-full h-full bg-white rounded-full overflow-hidden flex items-center justify-center">
                          <img
                            src={post.authorAvatar || INSTAGRAM_CONFIG.profilePictureUrl}
                            alt="@fastsugriwa"
                            className="w-full h-full object-cover rounded-full"
                            loading="lazy"
                            decoding="async"
                            onError={(e) => {
                              e.currentTarget.src = '/fast_instagram_profile.webp';
                            }}
                          />
                        </div>
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] sm:text-xs font-bold text-stone-900 group-hover:text-orange-600 transition-colors truncate max-w-[65px] sm:max-w-none">
                          @fastsugriwa
                        </div>
                        <div className="text-[9px] sm:text-[10px] text-stone-400 flex items-center gap-0.5 sm:gap-1 truncate">
                          <Calendar className="w-2 h-2 sm:w-2.5 sm:h-2.5 shrink-0" />
                          <span className="truncate">{post.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {post.isPinned && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 text-amber-900 text-[9px] sm:text-[10px] font-extrabold shadow-2xs">
                          <span>📌</span>
                          <span className="hidden xs:inline">Disematkan</span>
                        </span>
                      )}
                      <span
                        className={`shrink-0 text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full ${post.category === 'Beasiswa'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : post.category === 'Prestasi'
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : post.category === 'Akademik'
                                ? 'bg-orange-50 text-orange-800 border border-orange-200'
                                : post.category === 'Hari Raya'
                                  ? 'bg-purple-50 text-purple-800 border border-purple-200'
                                  : post.category === 'Workshop'
                                    ? 'bg-blue-50 text-blue-800 border border-blue-200'
                                    : post.category === 'Riset'
                                      ? 'bg-teal-50 text-teal-800 border border-teal-200'
                                      : 'bg-stone-100 text-stone-700 border border-stone-200'
                          }`}
                      >
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Post Media / Banner (Menggunakan Thumbnail ringan ~30-50KB untuk rendering cepat & bebas lag) */}
                  {post.mediaUrl ? (
                    <div
                      onClick={() => handleOpenModal(post)}
                      className="relative aspect-square sm:aspect-[4/3] w-full overflow-hidden bg-stone-100 border-b border-stone-100 cursor-pointer"
                    >
                      <img
                        src={post.thumbnailUrl || post.mediaUrl}
                        alt={post.shortSnippet}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (post.mediaUrl && target.src !== post.mediaUrl) {
                            target.src = post.mediaUrl;
                          } else {
                            target.src = '/fast_instagram_profile.webp';
                          }
                        }}
                      />
                      <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md bg-stone-900/75 backdrop-blur-xs text-white flex items-center gap-1 text-[9px] sm:text-[10px] font-medium shadow-xs">
                        {post.mediaType === 'REEL' || post.mediaType === 'VIDEO' ? (
                          <>
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                            <span className="font-bold text-rose-300">Reel</span>
                          </>
                        ) : post.mediaType === 'CAROUSEL_ALBUM' ? (
                          <>
                            <Instagram className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400" />
                            <span className="hidden xs:inline">Album</span>
                          </>
                        ) : (
                          <>
                            <Instagram className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-orange-400" />
                            <span className="hidden xs:inline">Post</span>
                          </>
                        )}
                      </div>

                      {/* Play overlay for Reels / Videos */}
                      {(post.mediaType === 'REEL' || post.mediaType === 'VIDEO') && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/40 transition-colors">
                          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <span className="ml-0.5 text-[11px] sm:text-xs font-black">▶</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      onClick={() => handleOpenModal(post)}
                      className="relative p-3.5 sm:p-6 bg-gradient-to-br from-stone-900 via-stone-850 to-stone-900 text-white overflow-hidden border-b border-stone-100 min-h-[120px] sm:min-h-[140px] flex flex-col justify-between cursor-pointer"
                    >
                      {/* Subtle Geometric Balinese Sacred Line Pattern */}
                      <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="20" cy="20" r="15" fill="none" stroke="#f59e0b" strokeWidth="1" />
                          <circle cx="80" cy="80" r="40" fill="none" stroke="#ea580c" strokeWidth="1" />
                          <rect x="120" y="20" width="30" height="30" fill="none" stroke="#d97706" strokeWidth="1" transform="rotate(45 135 35)" />
                        </svg>
                      </div>

                      <div className="relative z-10 flex items-center justify-between">
                        <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-widest text-amber-400">
                          FAST SUGRIWA
                        </span>
                        <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400" />
                      </div>

                      <div className="relative z-10 my-2 sm:my-3">
                        <h4 className="text-xs sm:text-base md:text-lg font-bold text-white tracking-tight leading-snug line-clamp-2">
                          {post.shortSnippet}
                        </h4>
                      </div>

                      <div className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                        {post.tags.slice(0, 2).map((t) => (
                          <span key={t} className="text-[9px] sm:text-[10px] text-stone-400 font-mono truncate max-w-[80px]">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Post Caption Preview */}
                  <div className="p-2.5 sm:p-4 text-[11px] sm:text-xs text-stone-600 leading-relaxed">
                    <p className="line-clamp-2 sm:line-clamp-3 whitespace-pre-line">
                      {post.caption}
                    </p>
                    <button
                      onClick={() => handleOpenModal(post)}
                      className="text-orange-600 font-bold hover:underline mt-1.5 sm:mt-2 inline-block text-[10px] sm:text-xs"
                    >
                      Baca selengkapnya...
                    </button>
                  </div>
                </div>

                {/* Card Footer: Engagement & Actions */}
                <div className="p-2.5 sm:p-4 border-t border-stone-100 flex items-center justify-between text-[10px] sm:text-xs text-stone-500 bg-stone-50/40">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="flex items-center gap-0.5 sm:gap-1 text-rose-600 font-medium">
                      <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-rose-600" />
                      <span>{post.likesCount}</span>
                    </span>
                    <span className="flex items-center gap-0.5 sm:gap-1 text-stone-600 font-medium">
                      <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>{post.commentsCount}</span>
                    </span>
                  </div>

                  <a
                    href={post.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 sm:gap-1 text-stone-700 hover:text-orange-600 font-semibold transition-colors"
                  >
                    <span>Lihat</span>
                    <span className="hidden sm:inline"> di IG</span>
                    <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-stone-400" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Load More / Pagination Button */}
          {filteredPosts.length > visibleCount && (
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setVisibleCount((prev) => Math.min(prev + 6, filteredPosts.length))}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-600/20 transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>Muat Lebih Banyak Postingan</span>
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-[11px]">
                  +{Math.min(6, filteredPosts.length - visibleCount)}
                </span>
              </motion.button>
              <button
                onClick={() => setVisibleCount(filteredPosts.length)}
                className="text-xs font-semibold text-stone-600 hover:text-orange-600 py-2 px-3 transition-colors cursor-pointer"
              >
                Tampilkan Semua ({filteredPosts.length} Postingan)
              </button>
            </div>
          )}
        </div>
        )}

        {/* View All on Instagram CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5 }}
          className="mt-10 sm:mt-12 p-5 sm:p-7 md:p-8 rounded-2xl bg-gradient-to-br from-amber-50/80 via-orange-50/50 to-stone-50 border border-amber-200/80 shadow-xs flex flex-col md:flex-row items-center md:items-center justify-between gap-5 sm:gap-6 text-center md:text-left"
        >
          <div className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 max-w-2xl">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 text-white flex items-center justify-center shrink-0 shadow-md">
              <Instagram className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight">
                Ikuti Pembaruan Harian di @fastsugriwa
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                Kunjungi Instagram resmi Fakultas Sains dan Teknologi untuk info beasiswa berkala, pengumuman PKL, dan prestasi mahasiswa.
              </p>
            </div>
          </div>

          <a
            href={INSTAGRAM_CONFIG.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-stone-900 hover:bg-orange-600 active:bg-orange-700 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all shrink-0"
          >
            <span>Kunjungi Profil @fastsugriwa</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* Modal for Full Instagram Post Content */}
      {activeModalPost && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-post-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-200">
            {/* Modal Top Bar */}
            <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-stone-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 p-0.5 shrink-0 shadow-2xs">
                  <div className="w-full h-full bg-white rounded-full overflow-hidden flex items-center justify-center">
                    <img
                      src={activeModalPost.authorAvatar || INSTAGRAM_CONFIG.profilePictureUrl}
                      alt="@fastsugriwa"
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) => {
                        e.currentTarget.src = '/fast_instagram_profile.webp';
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-900">
                      @fastsugriwa
                    </span>
                    {activeModalPost.isPinned && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                        📌 Disematkan
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-stone-400">
                    {activeModalPost.date} • {activeModalPost.category}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveModalPost(null)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
                aria-label="Tutup Postingan"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4">
              {/* Media Display: Video/Reels Player or Image Banner */}
              {activeModalPost.mediaType === 'REEL' || activeModalPost.mediaType === 'VIDEO' ? (
                <div className="space-y-2.5">
                  <div className="rounded-xl sm:rounded-2xl overflow-hidden w-full bg-stone-950 border border-stone-800 shadow-md relative flex items-center justify-center min-h-[420px] sm:min-h-[500px]">
                    {videoPlayerMode === 'video' && activeModalPost.videoUrl ? (
                      <video
                        src={activeModalPost.videoUrl}
                        poster={activeModalPost.mediaUrl}
                        controls
                        autoPlay
                        playsInline
                        referrerPolicy="no-referrer"
                        className="w-full max-h-[500px] object-contain"
                        onError={() => setVideoPlayerMode('embed')}
                      />
                    ) : (
                      <iframe
                        src={activeModalPost.videoEmbedUrl || `${(activeModalPost.permalink || activeModalPost.postUrl).replace(/\/+$/, '')}/embed/`}
                        className="w-full h-[460px] sm:h-[520px] border-0 rounded-xl sm:rounded-2xl bg-black"
                        frameBorder="0"
                        scrolling="no"
                        allowTransparency={true}
                        allow="encrypted-media; autoplay; clipboard-write; picture-in-picture"
                        title={activeModalPost.shortSnippet}
                      />
                    )}
                  </div>

                  {/* Reel Player Controls & Quick Switch Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs">
                    <div className="flex items-center gap-2">
                      {activeModalPost.videoUrl && (
                        <div className="inline-flex rounded-lg p-0.5 bg-stone-200/70">
                          <button
                            onClick={() => setVideoPlayerMode('video')}
                            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                              videoPlayerMode === 'video'
                                ? 'bg-white text-orange-600 shadow-2xs'
                                : 'text-stone-600 hover:text-stone-900'
                            }`}
                          >
                            Video Langsung
                          </button>
                          <button
                            onClick={() => setVideoPlayerMode('embed')}
                            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                              videoPlayerMode === 'embed'
                                ? 'bg-white text-orange-600 shadow-2xs'
                                : 'text-stone-600 hover:text-stone-900'
                            }`}
                          >
                            Instagram Player
                          </button>
                        </div>
                      )}
                      <span className="text-stone-500 text-[11px] font-medium hidden xs:inline">
                        {videoPlayerMode === 'embed' ? 'Memutar via Instagram Player' : 'Pemutar Video HD'}
                      </span>
                    </div>

                    <a
                      href={activeModalPost.permalink || activeModalPost.postUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-50 text-orange-700 hover:bg-orange-100 font-bold text-[11px] transition-colors"
                    >
                      <span>Buka di Instagram</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ) : activeModalPost.mediaUrl ? (
                <div className="rounded-xl sm:rounded-2xl overflow-hidden aspect-[4/3] w-full bg-stone-100 border border-stone-200 shadow-2xs">
                  <img
                    src={activeModalPost.mediaUrl}
                    alt={activeModalPost.shortSnippet}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (activeModalPost.thumbnailUrl && target.src !== activeModalPost.thumbnailUrl) {
                        target.src = activeModalPost.thumbnailUrl;
                      } else {
                        target.src = '/fast_instagram_profile.webp';
                      }
                    }}
                  />
                </div>
              ) : null}

              <div className="p-4 rounded-xl bg-stone-900 text-white text-xs space-y-2">
                <div className="text-amber-400 font-mono text-[10px] uppercase">
                  PENGUMUMAN RESMI FAST UHN SUGRIWA
                </div>
                <div id="modal-post-title" className="font-bold text-sm leading-snug">
                  {activeModalPost.shortSnippet}
                </div>
              </div>

              <div className="text-xs sm:text-sm text-stone-700 whitespace-pre-line leading-relaxed font-sans">
                {activeModalPost.caption}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-stone-100">
                {activeModalPost.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-mono text-orange-700 bg-orange-50 px-2 py-0.5 rounded-md"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 border-t border-stone-100 bg-stone-50 flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-stone-600">
                <span className="flex items-center gap-1 text-rose-600 font-bold">
                  <Heart className="w-4 h-4 fill-rose-600" />
                  {activeModalPost.likesCount} suka
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  {activeModalPost.commentsCount} komentar
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveModalPost(null)}
                  className="px-3 py-1.5 rounded-lg text-stone-600 text-xs font-semibold hover:bg-stone-200"
                >
                  Tutup
                </button>
                <a
                  href={activeModalPost.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-2xs"
                >
                  <span>Buka di Instagram</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
