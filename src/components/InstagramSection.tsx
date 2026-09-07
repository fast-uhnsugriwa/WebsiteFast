import React, { useState, useEffect } from 'react';
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
import { FacultyLogo } from './Logos';

export const InstagramSection: React.FC = () => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activeModalPost, setActiveModalPost] = useState<InstagramPost | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const categories = ['Semua', 'Akademik', 'Beasiswa', 'Prestasi', 'Workshop', 'Riset'];

  const loadPosts = async () => {
    try {
      const res = await InstagramService.fetchPosts();
      setPosts(res.posts);
    } catch (err) {
      console.error('Failed loading Instagram posts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const filteredPosts = selectedCategory === 'Semua'
    ? posts
    : posts.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="berita-instagram"
      aria-label="Berita dan Artikel Instagram FAST"
      className="py-16 sm:py-24 bg-white border-b border-stone-200/80 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:6 lg:px-8">
        {/* Section Title & Instagram Profile Header Box with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8"
        >
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-200/70 text-orange-800 text-xs font-bold uppercase tracking-wider shadow-2xs">
                <Instagram className="w-3.5 h-3.5 text-orange-600 animate-pulse" />
                <span>Kabar Terkini & Informasi Resmi</span>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Berita & Artikel @fastsugriwa
            </h2>
            <p className="mt-2 text-stone-600 text-sm sm:text-base max-w-2xl">
              Publikasi resmi seputar beasiswa, kuliah umum, prestasi mahasiswa, dan agenda fakultas yang terhubung dengan akun resmi Instagram <span className="font-semibold text-stone-800">@fastsugriwa</span>.
            </p>
          </div>

          {/* Instagram Account Card with Interactive Micro-Animations */}
          <motion.div
            whileHover={{ y: -2 }}
            className="flex flex-wrap items-center gap-3 shrink-0"
          >
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-200 shadow-2xs hover:shadow-md transition-shadow">
              <div className="relative">
                <div className="p-0.5 rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500">
                  <div className="p-0.5 bg-white rounded-full">
                    <FacultyLogo size="sm" showText={false} />
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

        {/* Informative Status Strip with Scroll Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200/90 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-700"
        >
          <div className="flex items-center gap-2">
            {posts.length > 0 ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span>
                  <strong>Feed Resmi Terverifikasi:</strong> Menyajikan publikasi pengumuman terkini akun <strong>@fastsugriwa</strong>
                </span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 animate-pulse" />
                <span>
                  <strong>Status Feed:</strong> Under Maintenance (Sedang Dalam Pemeliharaan hingga Konfigurasi Feed Dilakukan)
                </span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2 text-stone-500 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>Pembaruan Berkala</span>
          </div>
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
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
                  selectedCategory === cat
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
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, idx) => (
              <motion.article
                key={post.id}
                id={`post-card-${post.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
                className="flex flex-col justify-between rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-xl hover:border-amber-400/80 transition-all duration-300 overflow-hidden group"
              >
                <div>
                  {/* Post Header: Profile & Date */}
                  <div className="p-4 flex items-center justify-between border-b border-stone-100 bg-stone-50/50">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 p-0.5">
                        <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                          <FacultyLogo size="sm" showText={false} />
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-stone-900 group-hover:text-orange-600 transition-colors">
                          @fastsugriwa
                        </div>
                        <div className="text-[10px] text-stone-400 flex items-center gap-1">
                          <Calendar className="w-2.5 h-2.5" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        post.category === 'Beasiswa'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : post.category === 'Prestasi'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : post.category === 'Akademik'
                          ? 'bg-orange-50 text-orange-800 border border-orange-200'
                          : 'bg-stone-100 text-stone-700 border border-stone-200'
                      }`}
                    >
                      {post.category}
                    </span>
                  </div>

                  {/* Post Graphic Banner (Clean Vector Graphic - NO campus photography) */}
                  <div className="relative p-6 bg-gradient-to-br from-stone-900 via-stone-850 to-stone-900 text-white overflow-hidden border-b border-stone-100 min-h-[140px] flex flex-col justify-between">
                    {/* Subtle Geometric Balinese Sacred Line Pattern */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="20" r="15" fill="none" stroke="#f59e0b" strokeWidth="1" />
                        <circle cx="80" cy="80" r="40" fill="none" stroke="#ea580c" strokeWidth="1" />
                        <rect x="120" y="20" width="30" height="30" fill="none" stroke="#d97706" strokeWidth="1" transform="rotate(45 135 35)" />
                      </svg>
                    </div>

                    <div className="relative z-10 flex items-center justify-between">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400">
                        FAST SUGRIWA POST
                      </span>
                      <Instagram className="w-4 h-4 text-orange-400" />
                    </div>

                    <div className="relative z-10 my-3">
                      <h4 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug line-clamp-2">
                        {post.shortSnippet}
                      </h4>
                    </div>

                    <div className="relative z-10 flex items-center gap-2">
                      {post.tags.slice(0, 2).map((t) => (
                        <span key={t} className="text-[10px] text-stone-400 font-mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Post Caption Preview */}
                  <div className="p-4 text-xs text-stone-600 leading-relaxed">
                    <p className="line-clamp-3 whitespace-pre-line">
                      {post.caption}
                    </p>
                    <button
                      onClick={() => setActiveModalPost(post)}
                      className="text-orange-600 font-bold hover:underline mt-2 inline-block text-xs"
                    >
                      Baca selengkapnya...
                    </button>
                  </div>
                </div>

                {/* Card Footer: Engagement & Actions */}
                <div className="p-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 bg-stone-50/40">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-rose-600 font-medium">
                      <Heart className="w-3.5 h-3.5 fill-rose-600" />
                      <span>{post.likesCount}</span>
                    </span>
                    <span className="flex items-center gap-1 text-stone-600 font-medium">
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{post.commentsCount}</span>
                    </span>
                  </div>

                  <a
                    href={post.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-stone-700 hover:text-orange-600 font-semibold transition-colors"
                  >
                    <span>Lihat di IG</span>
                    <ExternalLink className="w-3 h-3 text-stone-400" />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* View All on Instagram CTA Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-orange-50 via-amber-50 to-stone-50 border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 text-white flex items-center justify-center shrink-0 shadow-md">
              <Instagram className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">
                Ikuti Pembaruan Harian di @fastsugriwa
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">
                Kunjungi Instagram resmi Fakultas Sains dan Teknologi untuk info beasiswa berkala, pengumuman PKL, dan prestasi mahasiswa.
              </p>
            </div>
          </div>

          <a
            href={INSTAGRAM_CONFIG.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-stone-900 hover:bg-orange-600 text-white font-bold text-xs tracking-wide shadow-md transition-all shrink-0"
          >
            <span>Kunjungi Profil @fastsugriwa</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
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
                <FacultyLogo size="sm" showText={false} />
                <div>
                  <div className="text-xs font-bold text-stone-900">
                    @fastsugriwa
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
