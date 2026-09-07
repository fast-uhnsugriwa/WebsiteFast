import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Cpu,
  Palette,
  Database,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Check,
  Briefcase,
  GraduationCap
} from 'lucide-react';

interface ProgramStudiesProps {
  onNavigateSainsInformasi: () => void;
}

export const ProgramStudies: React.FC<ProgramStudiesProps> = ({
  onNavigateSainsInformasi
}) => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    const handleHighlight = () => {
      setIsHighlighted(true);
      const timer = setTimeout(() => setIsHighlighted(false), 2200);
      return () => clearTimeout(timer);
    };

    window.addEventListener('highlight-program-studi', handleHighlight);
    return () => window.removeEventListener('highlight-program-studi', handleHighlight);
  }, []);

  return (
    <section
      id="program-studi"
      aria-label="Program Studi Fakultas Sains dan Teknologi"
      className="py-16 sm:py-24 bg-stone-50/70 border-b border-stone-200/80 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title with Animated Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <GraduationCap className="w-3.5 h-3.5 text-amber-700" />
            <span>Pilihan Program Sarjana (S1)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Tiga Program Studi Unggulan
          </h2>
          <p className="mt-3 text-stone-600 text-base sm:text-lg">
            Kurikulum berstandar internasional yang diselaraskan dengan kebutuhan industri digital dan keagungan budaya Nusantara.
          </p>
        </motion.div>

        {/* 3 Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Card 1: Prodi Informatika (Biru) */}
          <motion.div
            id="card-prodi-informatika"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className={`flex flex-col justify-between rounded-2xl bg-white border-2 shadow-lg transition-all duration-500 p-7 group relative overflow-hidden ${
              isHighlighted
                ? 'border-blue-500 ring-4 ring-blue-400/30 scale-[1.015] shadow-2xl'
                : 'border-blue-200 shadow-blue-900/5 hover:border-blue-500 hover:shadow-xl'
            }`}
          >
            {/* Top Accent Stripe - Blue */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600" />

            <div>
              {/* Header & Icon */}
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="w-13 h-13 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center p-3 border border-blue-200/70 group-hover:scale-105 transition-transform">
                  <Cpu className="w-7 h-7" />
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-blue-800 bg-blue-100/90 px-2.5 py-1 rounded-full border border-blue-200/60">
                    Gelar S.Kom
                  </span>
                </div>
              </div>

              {/* Title & Level */}
              <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                Program Studi Sarjana (S1)
              </div>
              <h3 className="text-2xl font-extrabold text-stone-900 tracking-tight mt-1 group-hover:text-blue-600 transition-colors">
                Informatika
              </h3>

              <p className="text-sm text-stone-600 mt-3 leading-relaxed">
                Mempelajari rekayasa perangkat lunak, arsitektur kecerdasan buatan, cloud computing, komputasi terdistribusi, serta digitalisasi naskah budaya.
              </p>

              {/* Core Competencies */}
              <div className="mt-6 pt-5 border-t border-stone-100 space-y-2.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-blue-900">
                  Fokus Kompetensi Utama
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-700">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Artificial Intelligence & Machine Learning</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-700">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Full-Stack Web & Mobile App Development</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-700">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Cyber Security & Cloud Infrastructure</span>
                </div>
              </div>
            </div>

            {/* Outbound Link CTA */}
            <div className="mt-8 pt-5 border-t border-stone-100">
              <a
                id="link-prodi-informatika"
                href="https://informatika.uhnsugriwa.ac.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-wide shadow-md shadow-blue-600/20 transition-all active:scale-98"
              >
                <span>Kunjungi Website Informatika</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <p className="text-[11px] text-center text-blue-600/70 mt-2 font-mono">
                informatika.uhnsugriwa.ac.id
              </p>
            </div>
          </motion.div>

          {/* Card 2: Prodi Desain Komunikasi Visual (DKV - Merah) */}
          <motion.div
            id="card-prodi-dkv"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className={`flex flex-col justify-between rounded-2xl bg-white border-2 shadow-lg transition-all duration-500 p-7 group relative overflow-hidden ${
              isHighlighted
                ? 'border-red-500 ring-4 ring-red-400/30 scale-[1.015] shadow-2xl'
                : 'border-red-200 shadow-red-900/5 hover:border-red-500 hover:shadow-xl'
            }`}
          >
            {/* Top Accent Stripe - Red */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-red-600 to-rose-600" />

            <div>
              {/* Header & Icon */}
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="w-13 h-13 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center p-3 border border-red-200/70 group-hover:scale-105 transition-transform">
                  <Palette className="w-7 h-7" />
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-red-800 bg-red-100/90 px-2.5 py-1 rounded-full border border-red-200/60">
                    Gelar S.Ds
                  </span>
                </div>
              </div>

              {/* Title & Level */}
              <div className="text-xs font-semibold text-red-600 uppercase tracking-wider">
                Program Studi Sarjana (S1)
              </div>
              <h3 className="text-2xl font-extrabold text-stone-900 tracking-tight mt-1 group-hover:text-red-600 transition-colors">
                Desain Komunikasi Visual
              </h3>

              <p className="text-sm text-stone-600 mt-3 leading-relaxed">
                Mengembangkan keahlian komunikasi visual, desain antarmuka digital (UI/UX), animasi 2D/3D, branding korporat, dan media kreatif berkarakter budaya Bali.
              </p>

              {/* Core Competencies */}
              <div className="mt-6 pt-5 border-t border-stone-100 space-y-2.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-red-900">
                  Fokus Kompetensi Utama
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-700">
                  <Check className="w-4 h-4 text-red-600 shrink-0" />
                  <span>UI/UX & Product Interactive Design</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-700">
                  <Check className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Brand Identity & Creative Advertising</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-700">
                  <Check className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Motion Graphics, Animation & Illustration</span>
                </div>
              </div>
            </div>

            {/* Outbound Link CTA */}
            <div className="mt-8 pt-5 border-t border-stone-100">
              <a
                id="link-prodi-dkv"
                href="https://dkvsugriwa.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs tracking-wide shadow-md shadow-red-600/20 transition-all active:scale-98"
              >
                <span>Kunjungi Website DKV</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <p className="text-[11px] text-center text-red-600/70 mt-2 font-mono">
                dkvsugriwa.id
              </p>
            </div>
          </motion.div>

          {/* Card 3: Prodi Sains Informasi (Cyan) */}
          <motion.div
            id="card-prodi-sains-informasi"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className={`flex flex-col justify-between rounded-2xl bg-white border-2 shadow-lg transition-all duration-500 p-7 group relative overflow-hidden ${
              isHighlighted
                ? 'border-cyan-500 ring-4 ring-cyan-400/30 scale-[1.015] shadow-2xl'
                : 'border-cyan-200 shadow-cyan-900/5 hover:border-cyan-500 hover:shadow-xl'
            }`}
          >
            {/* Top Accent Stripe - Cyan */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-cyan-500 to-teal-500" />

            <div>
              {/* Header & Icon */}
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="w-13 h-13 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center p-3 border border-cyan-200/70 group-hover:scale-105 transition-transform">
                  <Database className="w-7 h-7" />
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-900 bg-cyan-100/90 px-2.5 py-1 rounded-full border border-cyan-200/60">
                    Gelar S.S.I
                  </span>
                </div>
              </div>

              {/* Title & Level */}
              <div className="text-xs font-semibold text-cyan-700 uppercase tracking-wider">
                Program Studi Sarjana (S1)
              </div>
              <h3 className="text-2xl font-extrabold text-stone-900 tracking-tight mt-1 group-hover:text-cyan-700 transition-colors">
                Sains Informasi
              </h3>

              <p className="text-sm text-stone-600 mt-3 leading-relaxed">
                Membidangi sains data terapan, tata kelola pengetahuan organisasi, arsitektur metadata, dan preservasi repositori digital manuskrip kebudayaan.
              </p>

              {/* Core Competencies */}
              <div className="mt-6 pt-5 border-t border-stone-100 space-y-2.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-900">
                  Fokus Kompetensi Utama
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-700">
                  <Check className="w-4 h-4 text-cyan-600 shrink-0" />
                  <span>Data Science, Big Data & Business Analytics</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-700">
                  <Check className="w-4 h-4 text-cyan-600 shrink-0" />
                  <span>Knowledge Management & Information Architecture</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-700">
                  <Check className="w-4 h-4 text-cyan-600 shrink-0" />
                  <span>Digital Heritage Informatics & Open Science</span>
                </div>
              </div>
            </div>

            {/* In-Project Navigation CTA */}
            <div className="mt-8 pt-5 border-t border-stone-100">
              <button
                id="btn-open-sains-informasi-page"
                type="button"
                onClick={onNavigateSainsInformasi}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs tracking-wide shadow-md shadow-cyan-600/20 transition-all active:scale-98"
              >
                <span>Lihat Profil & Kurikulum Sains Informasi</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
