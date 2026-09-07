import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Sparkles,
  ExternalLink,
  BookOpen,
  Cpu,
  Layers,
  Award,
  Users
} from 'lucide-react';
import { CinematicLightBackground } from './CinematicLightBackground';

interface HeroProps {
  onExplorePrograms: () => void;
  onNavigateSainsInformasi: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExplorePrograms,
  onNavigateSainsInformasi
}) => {
  return (
    <section
      id="beranda-hero"
      aria-label="Pusat Informasi Fakultas Sains dan Teknologi"
      className="relative overflow-hidden bg-gradient-to-b from-stone-50 via-amber-50/20 to-white pt-10 pb-20 lg:pt-16 lg:pb-28 border-b border-stone-200/60"
    >
      {/* Subtle Geometric Balinese Sacred Line Art & Circuit Patterns (NO Campus Photography) */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-[0.035]" aria-hidden="true">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="sacred-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M40 0 L80 40 L40 80 L0 40 Z" fill="none" stroke="#ea580c" strokeWidth="1" />
              <circle cx="40" cy="40" r="16" fill="none" stroke="#d97706" strokeWidth="1" />
              <path d="M40 24 L56 40 L40 56 L24 40 Z" fill="none" stroke="#b45309" strokeWidth="0.8" />
              <circle cx="40" cy="40" r="4" fill="#ea580c" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sacred-pattern)" />
        </svg>
      </div>

      {/* Cinematic Slow-Moving Ambient Orange & Yellow Lighting */}
      <CinematicLightBackground variant="light" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Animated Institutional Tag Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-transparent border border-orange-200/80 text-orange-800 text-xs font-bold uppercase tracking-wider mb-5 shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-600 animate-pulse" />
            <span>Pusat Unggulan Sains Komputasi & Desain Digital</span>
          </motion.div>

          {/* Primary Academic Typography Heading with Staggered Entrance */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.15]"
          >
            Selamat Datang di <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-amber-500 drop-shadow-xs">
              Fakultas Sains dan Teknologi
            </span> <br />
            <span className="text-2xl sm:text-4xl lg:text-5xl text-stone-800 font-bold block mt-2">
              UHN I Gusti Bagus Sugriwa Denpasar
            </span>
          </motion.h1>

          {/* Subtitle with Generous Whitespace */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-base sm:text-xl text-stone-600 font-normal leading-relaxed max-w-3xl"
          >
            Kami hadir sebagai pusat keunggulan dalam pendidikan, penelitian, dan penerapan teknologi yang berlandaskan pada nilai-nilai Tri Dharma Perguruan Tinggi. Fakultas Sains dan Teknologi menaungi tiga program studi unggulan yang dirancang sesuai dengan kebutuhan industri masa kini, yaitu <span className="font-semibold text-blue-700">Informatika</span>, <span className="font-semibold text-rose-700">Desain Komunikasi Visual</span>, dan <span className="font-semibold text-cyan-700">Sains Informasi</span>.
          </motion.p>

          {/* Action CTAs with Interactive Micro-Animations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <motion.button
              id="hero-btn-explore"
              onClick={onExplorePrograms}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-sm tracking-wide shadow-lg shadow-orange-600/25 hover:shadow-orange-600/40 hover:brightness-105 active:scale-95 transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Jelajahi 3 Program Studi</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <motion.a
              id="hero-btn-instagram"
              href="https://www.instagram.com/fastsugriwa/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, x: 2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-white/70 border border-stone-200/80 text-stone-700 hover:text-orange-600 hover:border-orange-300 font-semibold text-sm transition-all shadow-2xs"
            >
              <span>Instagram @fastsugriwa</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
            </motion.a>
          </motion.div>

          {/* Minimalist Graphic Diagram / Identity Seal with Scroll Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 w-full max-w-4xl p-6 sm:p-8 rounded-2xl bg-white/85 backdrop-blur-md border border-stone-200/90 shadow-xl shadow-stone-900/5 relative hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              {/* Left: Emblem Showcase */}
              <div className="flex items-center gap-4 text-left">
                <motion.div
                  whileHover={{ rotate: [0, -5, 5, 0], scale: 1.08 }}
                  transition={{ duration: 0.4 }}
                  className="p-2 rounded-2xl bg-amber-50/80 border border-amber-200/80 shadow-xs flex items-center justify-center shrink-0 cursor-pointer"
                >
                  <img
                    src="/FASTlogo.png"
                    alt="Logo FAST UHN Sugriwa"
                    className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                  />
                </motion.div>
                <div>
                  <div className="text-xs uppercase tracking-widest font-extrabold text-amber-700">
                    Akreditasi Resmi Perguruan Tinggi
                  </div>
                  <div className="text-sm font-bold text-stone-900">
                    Kementerian Agama RI & BAN-PT / LAM INFOKOM
                  </div>
                  <div className="text-xs text-stone-500">
                    SK Pendirian Fakultas Sains dan Teknologi UHN IGB Sugriwa
                  </div>
                </div>
              </div>

              {/* Right: Quick Program Jump Tags */}
              <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-end">
                <motion.a
                  href="https://informatika.uhnsugriwa.ac.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-blue-50 hover:text-blue-700 border border-transparent hover:border-blue-200 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Cpu className="w-3.5 h-3.5 text-blue-600" />
                  <span>S1 Informatika</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </motion.a>

                <motion.a
                  href="https://dkvsugriwa.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-rose-50 hover:text-rose-700 border border-transparent hover:border-rose-200 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Layers className="w-3.5 h-3.5 text-rose-600" />
                  <span>S1 DKV</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </motion.a>

                <motion.button
                  onClick={onNavigateSainsInformasi}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 border border-amber-300/80 text-amber-900 text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>S1 Sains Informasi</span>
                </motion.button>
              </div>
            </div>

            {/* Academic Stats Counters Grid with Staggered Motion */}
            <div className="mt-8 pt-6 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -3 }}
                className="p-3 rounded-xl hover:bg-orange-50/50 transition-colors"
              >
                <div className="text-2xl sm:text-3xl font-black text-orange-600 font-display">
                  3
                </div>
                <div className="text-xs font-semibold text-stone-700 mt-0.5">
                  Program Studi Unggulan
                </div>
                <div className="text-[11px] text-stone-400">Informatika, DKV & Sains Info</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -3 }}
                className="p-3 rounded-xl hover:bg-amber-50/50 transition-colors"
              >
                <div className="text-2xl sm:text-3xl font-black text-amber-600 font-display">
                  100%
                </div>
                <div className="text-xs font-semibold text-stone-700 mt-0.5">
                  Kurikulum OBE & MBKM
                </div>
                <div className="text-[11px] text-stone-400">Siap Magang & Karir Industri</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ y: -3 }}
                className="p-3 rounded-xl hover:bg-stone-50 transition-colors"
              >
                <div className="text-2xl sm:text-3xl font-black text-stone-800 font-display">
                  3 Jalur
                </div>
                <div className="text-xs font-semibold text-stone-700 mt-0.5">
                  Beasiswa Kuliah
                </div>
                <div className="text-[11px] text-stone-400">DIPA, BIB LPDP & PIPK</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
