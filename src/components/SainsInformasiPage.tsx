import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  GraduationCap,
  Sparkles,
  Compass,
  Target,
  Briefcase,
  BookOpen,
  Award,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Database,
  BarChart3,
  Network,
  Brain,
  Library,
  TrendingUp,
  ShieldCheck,
  Building,
  HelpCircle,
  Wrench
} from 'lucide-react';
import { SAINS_INFORMASI_DETAILS } from '../data/sainsInformasiData';
import { FacultyLogo, UniversityLogo } from './Logos';
import { CinematicLightBackground } from './CinematicLightBackground';

interface SainsInformasiPageProps {
  onBackToHome: () => void;
}

export const SainsInformasiPage: React.FC<SainsInformasiPageProps> = ({
  onBackToHome
}) => {
  const [activeCurriculumTab, setActiveCurriculumTab] = useState<number>(0);

  const prospectIcons: Record<string, React.ReactNode> = {
    BarChart3: <BarChart3 className="w-6 h-6 text-orange-600" />,
    Network: <Network className="w-6 h-6 text-amber-600" />,
    Brain: <Brain className="w-6 h-6 text-orange-600" />,
    Library: <Library className="w-6 h-6 text-amber-600" />,
    TrendingUp: <TrendingUp className="w-6 h-6 text-orange-600" />,
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-amber-600" />
  };

  return (
    <div id="halaman-sains-informasi" className="min-h-screen bg-stone-50/60 text-stone-800">
      {/* Top Breadcrumb & Return Bar */}
      <div className="bg-white border-b border-stone-200/80 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-stone-500">
            <button
              onClick={onBackToHome}
              className="hover:text-orange-600 font-medium transition-colors cursor-pointer"
            >
              Beranda
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-stone-400">Program Studi</span>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-stone-900 font-bold">Sains Informasi (S1)</span>
          </nav>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            id="btn-back-to-home"
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-stone-700 hover:text-orange-600 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda</span>
          </motion.button>
        </div>
      </div>

      {/* Hero Banner for Program Studi Sains Informasi */}
      <section className="relative overflow-hidden bg-gradient-to-b from-stone-900 via-stone-850 to-stone-900 text-white py-16 sm:py-24 border-b border-stone-800">
        {/* Cinematic Slow-Moving Ambient Orange & Yellow Lighting */}
        <CinematicLightBackground variant="dark" />

        {/* Sacred Subtle Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern id="sains-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="20" fill="none" stroke="#f59e0b" strokeWidth="1" />
              <path d="M0 30 L60 30 M30 0 L30 60" stroke="#ea580c" strokeWidth="0.8" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#sains-pattern)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            {/* Under Maintenance Notification Banner */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 p-4 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-200 flex items-start gap-3 text-xs sm:text-sm shadow-inner backdrop-blur-xs"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/40 mt-0.5">
                <Wrench className="w-4 h-4" />
              </div>
              <div>
                <div className="font-extrabold uppercase tracking-wider text-amber-400 text-xs flex items-center gap-2 mb-0.5">
                  <span>Status: Under Maintenance (Pemeliharaan Sistem)</span>
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                </div>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  Halaman profil dan kurikulum Program Studi Sains Informasi saat ini sedang dalam proses pemeliharaan serta pembaruan data sistem. Mohon kembali lagi secara berkala.
                </p>
              </div>
            </motion.div>

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap items-center gap-2.5 mb-6"
            >
              <span className="px-3 py-1 rounded-full bg-orange-600/20 text-orange-400 border border-orange-500/30 text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Program Sarjana (S1)</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
                Gelar {SAINS_INFORMASI_DETAILS.degree}
              </span>
              <span className="px-3 py-1 rounded-full bg-stone-800 text-stone-300 border border-stone-700 text-xs font-medium">
                {SAINS_INFORMASI_DETAILS.duration}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight"
            >
              Program Studi <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-amber-300">Sains Informasi</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-stone-300 text-base sm:text-lg leading-relaxed max-w-3xl"
            >
              {SAINS_INFORMASI_DETAILS.summary}
            </motion.p>

            {/* Quick Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 pt-8 border-t border-stone-800 grid grid-cols-2 sm:grid-cols-4 gap-6"
            >
              {SAINS_INFORMASI_DETAILS.stats.map((s, idx) => (
                <div key={idx} className="group">
                  <div className="text-2xl sm:text-3xl font-black text-amber-400 font-display group-hover:scale-105 group-hover:text-orange-400 transition-all origin-left">
                    {s.value}
                  </div>
                  <div className="text-xs text-stone-400 mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Direct CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <motion.a
                whileHover={{ scale: 1.04, boxShadow: '0 10px 25px -5px rgba(234, 88, 12, 0.4)' }}
                whileTap={{ scale: 0.96 }}
                href="https://taplink.cc/uhnmaba2026"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-xs tracking-wide shadow-lg hover:brightness-110 transition-all"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Daftar Prodi Sains Informasi</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                href="#kurikulum"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-stone-800 text-stone-200 hover:bg-stone-700 font-bold text-xs transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span>Lihat Struktur Kurikulum</span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Profil, Visi, Misi Section */}
      <section className="py-16 sm:py-20 bg-white border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Visi Keilmuan Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-6"
            >
              <div className="p-8 rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-transparent border-2 border-orange-500/30 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-700 mb-2">
                  <Compass className="w-4 h-4" />
                  <span>Visi Program Studi</span>
                </div>
                <h2 className="text-xl font-extrabold text-stone-900 tracking-tight">
                  Visi Keilmuan 2035
                </h2>
                <p className="mt-4 text-stone-700 text-sm sm:text-base leading-relaxed italic border-l-2 border-orange-600 pl-4">
                  "{SAINS_INFORMASI_DETAILS.vision}"
                </p>
              </div>

              {/* Objectives */}
              <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-700">
                  <Target className="w-4 h-4 text-amber-600" />
                  <span>Tujuan Pendidikan Sarjana (PEO)</span>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-stone-600">
                  {SAINS_INFORMASI_DETAILS.objectives.map((obj, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      className="flex items-start gap-2.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0" />
                      <span>{obj}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Right: Misi Tridharma */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="p-8 rounded-2xl bg-stone-50/70 border border-stone-200">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-3">
                  <Target className="w-4 h-4" />
                  <span>Misi Tridharma Perguruan Tinggi</span>
                </div>
                <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight mb-6">
                  Misi Program Studi Sains Informasi
                </h2>

                <div className="space-y-4">
                  {SAINS_INFORMASI_DETAILS.mission.map((m, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ x: 6, borderColor: '#fdba74' }}
                      className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-stone-100 shadow-xs transition-colors cursor-default"
                    >
                      <div className="w-7 h-7 rounded-lg bg-orange-100 text-orange-800 font-extrabold text-xs flex items-center justify-center shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                        {m}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* 3 Keunggulan Peminatan */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {SAINS_INFORMASI_DETAILS.specializations.map((spec, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    whileHover={{ y: -4, borderColor: '#ea580c', boxShadow: '0 10px 15px -3px rgba(234, 88, 12, 0.1)' }}
                    className="p-4 rounded-xl bg-white border border-stone-200/90 shadow-xs transition-all cursor-default"
                  >
                    <div className="text-xs font-bold text-orange-600 mb-1">
                      Peminatan 0{i + 1}
                    </div>
                    <div className="text-sm font-extrabold text-stone-900 leading-tight">
                      {spec.title}
                    </div>
                    <p className="text-[11px] text-stone-500 mt-2 leading-relaxed">
                      {spec.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Prospek Karir Lulusan Section (Prominently Highlighted) */}
      <section
        id="prospek-karir"
        aria-label="Prospek Karir Lulusan Sains Informasi"
        className="py-16 sm:py-24 bg-gradient-to-b from-stone-50 via-amber-50/20 to-white border-b border-stone-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-900 border border-orange-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Briefcase className="w-3.5 h-3.5 text-orange-700" />
              <span>Karier Masa Depan</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Prospek Karir Lulusan Sarjana Sains Informasi
            </h2>
            <p className="mt-3 text-stone-600 text-base sm:text-lg">
              Permintaan terhadap spesialis data dan arsitek pengetahuan terus melesat di seluruh sektor industri, BUMN, pemerintahan, dan organisasi internasional.
            </p>
          </motion.div>

          {/* 6 Career Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SAINS_INFORMASI_DETAILS.careerProspects.map((career, idx) => (
              <motion.div
                key={idx}
                id={`career-card-${idx}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgba(234, 88, 12, 0.15), 0 8px 10px -6px rgba(234, 88, 12, 0.1)' }}
                className="flex flex-col justify-between p-6 rounded-2xl bg-white border border-stone-200/90 shadow-sm hover:border-orange-400 transition-all group cursor-default"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-orange-50 border border-orange-200/60 group-hover:scale-110 group-hover:bg-orange-100 transition-all">
                      {prospectIcons[career.iconName] || <Briefcase className="w-6 h-6 text-orange-600" />}
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                      {career.demand}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-orange-700 uppercase tracking-wider">
                    {career.role}
                  </div>
                  <h3 className="text-lg font-extrabold text-stone-900 mt-0.5 group-hover:text-orange-600 transition-colors">
                    {career.title}
                  </h3>

                  <p className="text-xs text-stone-600 mt-2.5 leading-relaxed">
                    {career.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-stone-100">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-2">
                    Keahlian Kunci
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {career.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] font-medium px-2 py-0.5 rounded bg-stone-100 text-stone-700 group-hover:bg-orange-50 group-hover:text-orange-800 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum & Study Blocks */}
      <section
        id="kurikulum"
        aria-label="Struktur Kurikulum"
        className="py-16 sm:py-24 bg-white border-b border-stone-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
              <BookOpen className="w-3.5 h-3.5 text-amber-700" />
              <span>Struktur Perkuliahan</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Kurikulum Berbasis OBE & MBKM
            </h2>
            <p className="mt-3 text-stone-600 text-base">
              Total 144 SKS terdistribusi dalam 8 semester dengan penekanan pada kemampuan komputasi, analitika data, etika kebudayaan, dan magang industri.
            </p>

            {/* Semester Tabs */}
            <div className="mt-8 inline-flex p-1 rounded-xl bg-stone-100 border border-stone-200 overflow-x-auto max-w-full">
              {SAINS_INFORMASI_DETAILS.curriculumBlocks.map((block, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCurriculumTab(idx)}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                    activeCurriculumTab === idx
                      ? 'bg-white text-orange-600 shadow-xs ring-1 ring-stone-200'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {block.semester}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Active Curriculum Content with AnimatePresence */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCurriculumTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto p-6 sm:p-8 rounded-2xl bg-stone-50 border border-stone-200"
            >
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-stone-200">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                    {SAINS_INFORMASI_DETAILS.curriculumBlocks[activeCurriculumTab].semester}
                  </span>
                  <h3 className="text-xl font-extrabold text-stone-900">
                    {SAINS_INFORMASI_DETAILS.curriculumBlocks[activeCurriculumTab].description}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-amber-700">
                    {SAINS_INFORMASI_DETAILS.curriculumBlocks[activeCurriculumTab].credits} SKS
                  </span>
                  <div className="text-[10px] text-stone-500">Beban Studi</div>
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Contoh Mata Kuliah Inti:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {SAINS_INFORMASI_DETAILS.curriculumBlocks[activeCurriculumTab].sampleCourses.map((course, cIdx) => (
                    <motion.div
                      key={cIdx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: cIdx * 0.05 }}
                      whileHover={{ scale: 1.02, backgroundColor: '#ffffff' }}
                      className="p-3 rounded-xl bg-white border border-stone-100 flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-stone-800 shadow-2xs"
                    >
                      <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                      <span>{course}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Call To Action & Admissions */}
      <section className="py-16 bg-gradient-to-r from-orange-600 via-amber-600 to-amber-500 text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Mulai Perjalananmu Bersama Prodi Sains Informasi
          </h2>
          <p className="mt-4 text-orange-100 text-base leading-relaxed">
            Dapatkan kesempatan beasiswa penuh (BIB LPDP Kemenag, Beasiswa DIPA, dan PIPK) serta fasilitas laboratorium komputasi modern di kampus Hindu Negeri pertama di Indonesia.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://taplink.cc/uhnmaba2026"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-orange-700 font-extrabold text-xs sm:text-sm tracking-wide shadow-lg hover:bg-stone-50 transition-all cursor-pointer"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Pendaftaran PMB 2026 Online</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-orange-950/30 hover:bg-orange-950/40 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Beranda FAST</span>
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
