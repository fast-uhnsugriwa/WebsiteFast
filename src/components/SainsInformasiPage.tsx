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
  Wrench,
  Search,
  FileText,
  Layers,
  Info,
  ChevronDown,
  ChevronUp,
  Table,
  Sparkles as SparklesIcon,
  ChevronLeft as ChevronLeftIcon
} from 'lucide-react';
import { SAINS_INFORMASI_DETAILS } from '../data/sainsInformasiData';
import { CourseItem } from '../types';
import { FacultyLogo, UniversityLogo } from './Logos';
import { CinematicLightBackground } from './CinematicLightBackground';

interface SainsInformasiPageProps {
  onBackToHome: () => void;
}

export const SainsInformasiPage: React.FC<SainsInformasiPageProps> = ({
  onBackToHome
}) => {
  const [curriculumViewMode, setCurriculumViewMode] = useState<'sebaran' | 'mbkm'>('sebaran');
  const [selectedSemester, setSelectedSemester] = useState<number>(1);
  const [searchCourse, setSearchCourse] = useState<string>('');
  const [showRationale, setShowRationale] = useState<boolean>(false);

  // Filter courses across all 8 semesters if search is typed
  const filteredCourses = React.useMemo(() => {
    if (!searchCourse.trim()) return [];
    const q = searchCourse.toLowerCase().trim();
    const results: (CourseItem & { semesterRoman: string })[] = [];
    SAINS_INFORMASI_DETAILS.curriculumSemesters.forEach((sem) => {
      sem.courses.forEach((c) => {
        if (
          c.nama.toLowerCase().includes(q) ||
          c.kode.toLowerCase().includes(q) ||
          (c.keterangan && c.keterangan.toLowerCase().includes(q))
        ) {
          results.push({ ...c, semesterRoman: sem.semesterRoman });
        }
      });
    });
    return results;
  }, [searchCourse]);

  const currentSemesterData = SAINS_INFORMASI_DETAILS.curriculumSemesters.find(
    (s) => s.semesterNumber === selectedSemester
  ) || SAINS_INFORMASI_DETAILS.curriculumSemesters[0];

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
              viewport={{ once: false, amount: 0.15 }}
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
                      viewport={{ once: false, amount: 0.15 }}
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
              viewport={{ once: false, amount: 0.15 }}
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
                      viewport={{ once: false, amount: 0.15 }}
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
                    viewport={{ once: false, amount: 0.15 }}
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
            viewport={{ once: false, amount: 0.15 }}
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
                viewport={{ once: false, amount: 0.15 }}
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
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
              <BookOpen className="w-4 h-4 text-orange-600" />
              <span>Kurikulum Sarjana Berbasis OBE & MBKM</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
              Peta Sebaran Mata Kuliah & Implementasi MBKM
            </h2>
            <p className="mt-3.5 text-stone-600 text-sm sm:text-base leading-relaxed">
              Total <strong className="text-orange-600 font-extrabold">{SAINS_INFORMASI_DETAILS.totalSks} SKS</strong> terdistribusi dalam 8 semester dengan penekanan pada kemampuan komputasi, sains data terapan, tata kelola pengetahuan, preservasi budaya, dan hak belajar Merdeka Belajar Kampus Merdeka.
            </p>

            {/* Collapsible Rationale Box */}
            <div className="mt-6 text-left">
              <button
                type="button"
                onClick={() => setShowRationale(!showRationale)}
                className="w-full sm:w-auto mx-auto inline-flex items-center justify-between sm:justify-center gap-2 px-4 py-2.5 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-700 text-xs font-bold transition-all group cursor-pointer shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-orange-600" />
                  <span>Mengapa Sebaran Mata Kuliah Ini Sangat Penting?</span>
                </div>
                {showRationale ? (
                  <ChevronUp className="w-4 h-4 text-stone-400 group-hover:text-stone-700 transition-transform" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-stone-400 group-hover:text-stone-700 transition-transform" />
                )}
              </button>

              <AnimatePresence>
                {showRationale && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-3"
                  >
                    <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-50/70 via-stone-50 to-orange-50/50 border border-amber-200/80 shadow-xs space-y-4">
                      <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                        {SAINS_INFORMASI_DETAILS.curriculumRationale}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 border-t border-amber-200/60">
                        <div className="p-3 rounded-xl bg-white/80 border border-amber-100">
                          <div className="text-[11px] font-bold text-orange-700 uppercase tracking-wide mb-1">
                            1. Transparansi Informasi
                          </div>
                          <p className="text-[11px] text-stone-600 leading-snug">
                            Memberikan gambaran transparan mengenai struktur prodi dan keterkaitan mata kuliah menuju capaian pembelajaran.
                          </p>
                        </div>
                        <div className="p-3 rounded-xl bg-white/80 border border-amber-100">
                          <div className="text-[11px] font-bold text-amber-800 uppercase tracking-wide mb-1">
                            2. Perencanaan Studi Terarah
                          </div>
                          <p className="text-[11px] text-stone-600 leading-snug">
                            Mencegah jadwal tumpang tindih dan memastikan pemenuhan prasyarat mata kuliah berjenjang tepat waktu.
                          </p>
                        </div>
                        <div className="p-3 rounded-xl bg-white/80 border border-amber-100">
                          <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide mb-1">
                            3. Pilihan Cerdas Sesuai Minat
                          </div>
                          <p className="text-[11px] text-stone-600 leading-snug">
                            Memfasilitasi mahasiswa memilih jalur MBKM dan peminatan karier data/informasi sesuai bakat terbaiknya.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* View Mode Toggle: Sebaran Tiap Semester vs Implementasi MBKM */}
            <div className="mt-8 inline-flex p-1 rounded-xl bg-stone-100 border border-stone-200/80 shadow-2xs max-w-full">
              <button
                type="button"
                onClick={() => {
                  setCurriculumViewMode('sebaran');
                  setSearchCourse('');
                }}
                className={`px-4 sm:px-6 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  curriculumViewMode === 'sebaran'
                    ? 'bg-white text-orange-600 shadow-sm ring-1 ring-stone-200'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Tabel 8.1a Sebaran Semester (52 Mata Kuliah)
              </button>
              <button
                type="button"
                onClick={() => setCurriculumViewMode('mbkm')}
                className={`px-4 sm:px-6 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  curriculumViewMode === 'mbkm'
                    ? 'bg-white text-orange-600 shadow-sm ring-1 ring-stone-200'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Tabel 8.2 & 8.3 Implementasi MBKM
              </button>
            </div>
          </motion.div>

          {/* VIEW MODE 1: SEBARAN MATA KULIAH TIAP SEMESTER */}
          {curriculumViewMode === 'sebaran' && (
            <div className="space-y-6">
              {/* Quick Search & Filter Bar */}
              <div className="max-w-xl mx-auto">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-stone-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-10 py-2.5 rounded-xl border border-stone-200 bg-stone-50/70 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all text-xs sm:text-sm placeholder-stone-400 shadow-2xs"
                    placeholder="Cari nama atau kode mata kuliah (contoh: Machine Learning, PSI101, Basis Data)..."
                    value={searchCourse}
                    onChange={(e) => setSearchCourse(e.target.value)}
                  />
                  {searchCourse && (
                    <button
                      onClick={() => setSearchCourse('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-700 text-xs font-bold"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>

              {/* SEARCH RESULTS VIEW (IF USER IS SEARCHING) */}
              {searchCourse.trim() ? (
                <div className="max-w-4xl mx-auto p-4 sm:p-6 rounded-2xl bg-stone-50 border border-stone-200">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-200">
                    <span className="text-xs font-bold text-stone-600">
                      Hasil Pencarian: <span className="text-orange-600 font-extrabold">{filteredCourses.length}</span> mata kuliah ditemukan
                    </span>
                    <button
                      onClick={() => setSearchCourse('')}
                      className="text-xs font-semibold text-stone-500 hover:text-orange-600 underline cursor-pointer"
                    >
                      Kembali ke Tampilan Semester
                    </button>
                  </div>

                  {filteredCourses.length > 0 ? (
                    <div className="space-y-2">
                      {filteredCourses.map((c) => (
                        <div
                          key={c.no}
                          className="p-3 sm:p-3.5 rounded-xl bg-white border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-orange-300 transition-all"
                        >
                          <div className="flex items-start sm:items-center gap-3">
                            <span className="px-2 py-0.5 rounded-md bg-stone-100 font-mono text-[11px] font-bold text-stone-700 border border-stone-200">
                              {c.kode}
                            </span>
                            <div>
                              <h4 className="text-xs sm:text-sm font-bold text-stone-900">
                                {c.nama}
                              </h4>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-[10px] font-semibold text-stone-500">
                                  Semester {c.semesterRoman}
                                </span>
                                {c.keterangan && (
                                  <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                                    {c.keterangan}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <span className="self-end sm:self-center px-2.5 py-1 rounded-lg bg-orange-50 text-orange-800 font-extrabold text-xs border border-orange-200">
                            {c.sks} SKS
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center text-stone-500 text-xs">
                      Tidak ada mata kuliah yang cocok dengan "{searchCourse}". Coba kata kunci lain.
                    </div>
                  )}
                </div>
              ) : (
                /* SEMESTER TABS & SELECTED SEMESTER CONTENT */
                <div className="space-y-6">
                  {/* Semester Tabs (1 to 8) */}
                  <div className="flex items-center justify-center">
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 max-w-4xl w-full p-2 rounded-2xl bg-stone-100/90 border border-stone-200">
                      {SAINS_INFORMASI_DETAILS.curriculumSemesters.map((sem) => {
                        const isSelected = sem.semesterNumber === selectedSemester;
                        return (
                          <button
                            key={sem.semesterNumber}
                            type="button"
                            onClick={() => setSelectedSemester(sem.semesterNumber)}
                            className={`flex flex-col items-center justify-center py-2 sm:py-2.5 px-2 rounded-xl transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md font-bold scale-[1.03]'
                                : 'bg-white/70 hover:bg-white text-stone-700 hover:text-stone-900 border border-stone-200/60 font-semibold'
                            }`}
                          >
                            <span className="text-xs sm:text-sm tracking-wide">
                              Smt {sem.semesterRoman}
                            </span>
                            <span
                              className={`text-[10px] sm:text-[11px] mt-0.5 ${
                                isSelected ? 'text-orange-100 font-extrabold' : 'text-stone-500'
                              }`}
                            >
                              {sem.totalSks} SKS
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Active Semester Table Card */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedSemester}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.25 }}
                      className="max-w-4xl mx-auto rounded-2xl bg-stone-50/80 border border-stone-200 shadow-sm overflow-hidden"
                    >
                      {/* Semester Header Info */}
                      <div className="p-5 sm:p-6 bg-white border-b border-stone-200">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[10px] font-black uppercase tracking-wider">
                                Semester {currentSemesterData.semesterRoman}
                              </span>
                              <span className="text-[10px] text-stone-400 font-semibold">•</span>
                              <span className="text-xs font-semibold text-stone-500">
                                {currentSemesterData.courses.length} Mata Kuliah
                              </span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-black text-stone-900 mt-1">
                              {currentSemesterData.title}
                            </h3>
                            <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                              {currentSemesterData.description}
                            </p>
                          </div>

                          <div className="flex items-center sm:flex-col items-end gap-1.5 shrink-0">
                            <div className="px-3 py-1.5 rounded-xl bg-orange-50 border border-orange-200 text-right">
                              <div className="text-[10px] text-stone-500 font-medium">Beban Studi</div>
                              <div className="text-lg font-black text-orange-700 leading-none mt-0.5">
                                {currentSemesterData.totalSks} SKS
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* MBKM Tag Info */}
                        <div className="mt-3.5 pt-3 border-t border-stone-100 flex items-center gap-2 text-xs">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 shrink-0">
                            Skema MBKM:
                          </span>
                          <span className="text-[11px] font-semibold text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200/80">
                            {currentSemesterData.mbkmScheme}
                          </span>
                        </div>
                      </div>

                      {/* Course List Table (Desktop) */}
                      <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-stone-100/80 border-b border-stone-200 text-stone-500 uppercase font-bold text-[10px] tracking-wider">
                              <th className="py-3 px-4 w-12 text-center">No</th>
                              <th className="py-3 px-4 w-28">Kode MK</th>
                              <th className="py-3 px-4">Nama Mata Kuliah</th>
                              <th className="py-3 px-4 w-20 text-center">SKS</th>
                              <th className="py-3 px-4">Keterangan / Jalur MBKM</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-stone-200/70 bg-white">
                            {currentSemesterData.courses.map((course, idx) => (
                              <tr
                                key={course.no}
                                className={`hover:bg-orange-50/40 transition-colors ${
                                  idx % 2 === 1 ? 'bg-stone-50/40' : 'bg-white'
                                }`}
                              >
                                <td className="py-3 px-4 text-center font-semibold text-stone-400">
                                  {course.no}
                                </td>
                                <td className="py-3 px-4">
                                  <span className="px-2 py-0.5 rounded bg-stone-100 font-mono font-bold text-stone-700 border border-stone-200 text-[11px]">
                                    {course.kode}
                                  </span>
                                </td>
                                <td className="py-3 px-4 font-bold text-stone-900">
                                  {course.nama}
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-orange-100 text-orange-900 font-extrabold text-[11px]">
                                    {course.sks} SKS
                                  </span>
                                </td>
                                <td className="py-3 px-4">
                                  {course.keterangan ? (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-100/80 text-amber-900 border border-amber-300/70 font-bold text-[10px]">
                                      <SparklesIcon className="w-3 h-3 text-orange-600" />
                                      <span>{course.keterangan}</span>
                                    </span>
                                  ) : (
                                    <span className="text-stone-400 text-[11px]">—</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Course List Cards (Mobile) */}
                      <div className="md:hidden divide-y divide-stone-200 bg-white">
                        {currentSemesterData.courses.map((course) => (
                          <div key={course.no} className="p-3.5 space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <span className="text-stone-400 font-bold text-xs">#{course.no}</span>
                                <span className="px-2 py-0.5 rounded bg-stone-100 font-mono font-bold text-stone-700 text-[10px] border border-stone-200">
                                  {course.kode}
                                </span>
                              </div>
                              <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-900 font-extrabold text-[10px]">
                                {course.sks} SKS
                              </span>
                            </div>
                            <div className="font-bold text-stone-900 text-xs sm:text-sm">
                              {course.nama}
                            </div>
                            {course.keterangan && (
                              <div>
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 font-bold text-[9px]">
                                  <SparklesIcon className="w-2.5 h-2.5 text-orange-600" />
                                  <span>{course.keterangan}</span>
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Semester Summary & Navigation Bar */}
                      <div className="p-4 sm:p-5 bg-stone-100/90 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                        <div className="text-stone-600 font-semibold text-center sm:text-left">
                          Total Beban Semester {currentSemesterData.semesterRoman}:{' '}
                          <strong className="text-orange-700 font-black text-sm">
                            {currentSemesterData.totalSks} SKS
                          </strong>{' '}
                          ({currentSemesterData.courses.length} Mata Kuliah)
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            disabled={selectedSemester === 1}
                            onClick={() => setSelectedSemester((prev) => Math.max(1, prev - 1))}
                            className="px-3 py-1.5 rounded-lg bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 font-bold text-xs disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer inline-flex items-center gap-1"
                          >
                            <ChevronLeftIcon className="w-3.5 h-3.5" />
                            <span>Smt Sebelumnya</span>
                          </button>
                          <button
                            type="button"
                            disabled={selectedSemester === 8}
                            onClick={() => setSelectedSemester((prev) => Math.min(8, prev + 1))}
                            className="px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer inline-flex items-center gap-1"
                          >
                            <span>Smt Selanjutnya</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}
            </div>
          )}

          {/* VIEW MODE 2: TABEL 8.2 & 8.3 IMPLEMENTASI MBKM */}
          {curriculumViewMode === 'mbkm' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-10 max-w-5xl mx-auto"
            >
              {/* Tabel 8.2 Sebaran Implementasi MBKM */}
              <div className="p-6 sm:p-8 rounded-2xl bg-stone-50 border border-stone-200">
                <div className="mb-6">
                  <span className="text-[10px] font-black uppercase tracking-wider text-orange-600">
                    Tabel 8.2 Pedoman Kurikulum
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
                    Sebaran Implementasi MBKM (147 SKS)
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1">
                    Rancangan kegiatan pembelajaran mahasiswa jenjang Sarjana (S1) Sains Informasi FAST per semester:
                  </p>
                </div>

                {/* 8-Semester MBKM Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
                  {SAINS_INFORMASI_DETAILS.curriculumSemesters.map((sem) => (
                    <div
                      key={sem.semesterNumber}
                      className="p-3 rounded-xl bg-white border border-stone-200 flex flex-col justify-between hover:border-orange-300 transition-colors shadow-2xs"
                    >
                      <div>
                        <div className="text-[11px] font-black text-stone-800 uppercase tracking-wide">
                          Smt-{sem.semesterNumber}
                        </div>
                        <div className="text-xs font-black text-orange-600 mt-0.5">
                          {sem.totalSks} SKS
                        </div>
                      </div>
                      <div className="mt-3 pt-2 border-t border-stone-100 text-[10px] font-semibold text-stone-600 leading-tight">
                        {sem.mbkmScheme}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pembelajaran Mata Kuliah di Luar Program Studi */}
              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-stone-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-700">
                      Fleksibilitas Akademik
                    </span>
                    <h3 className="text-xl font-black text-stone-900 mt-0.5">
                      Pembelajaran Mata Kuliah di Luar Program Studi
                    </h3>
                  </div>
                  <div className="px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold shrink-0">
                    Total Bobot SKS Maksimum: <strong>60 SKS</strong>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {SAINS_INFORMASI_DETAILS.mbkmExternalOptions.map((opt) => (
                    <div
                      key={opt.no}
                      className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-800 text-[11px] font-bold flex items-center justify-center">
                            {opt.no}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-white text-orange-700 font-extrabold text-[10px] border border-orange-200">
                            Maks. {opt.bobotSks} SKS
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-stone-900 mb-2">
                          {opt.menempuhMk}
                        </h4>
                        <p className="text-xs text-stone-600 leading-relaxed">
                          {opt.keterangan}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tabel 8.3 Bentuk Kegiatan Pembelajaran di Luar Kampus */}
              <div className="p-6 sm:p-8 rounded-2xl bg-stone-50 border border-stone-200">
                <div className="mb-6">
                  <span className="text-[10px] font-black uppercase tracking-wider text-orange-600">
                    Tabel 8.3 Konversi SKS Luar Kampus
                  </span>
                  <h3 className="text-xl font-black text-stone-900 mt-0.5">
                    Bentuk Kegiatan Pembelajaran di Luar Kampus / Perguruan Tinggi
                  </h3>
                  <p className="text-xs text-stone-600 mt-1">
                    Pedoman pelaksanaan dan konversi SKS kegiatan MBKM di luar lingkungan universitas:
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs bg-white rounded-xl overflow-hidden border border-stone-200">
                    <thead>
                      <tr className="bg-stone-100/90 border-b border-stone-200 text-stone-600 font-bold uppercase text-[10px] tracking-wider">
                        <th className="py-3 px-3 w-10 text-center">No</th>
                        <th className="py-3 px-4">Bentuk Kegiatan Pembelajaran</th>
                        <th className="py-3 px-3 text-center">Reguler</th>
                        <th className="py-3 px-3 text-center">MBKM</th>
                        <th className="py-3 px-4">Ketentuan & Konversi CPL</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200 text-stone-700">
                      {SAINS_INFORMASI_DETAILS.mbkmActivities.map((act) => (
                        <tr key={act.no} className="hover:bg-orange-50/30 transition-colors">
                          <td className="py-3 px-3 text-center font-bold text-stone-400">
                            {act.no}
                          </td>
                          <td className="py-3 px-4 font-bold text-stone-900">
                            {act.bentukKegiatan}
                          </td>
                          <td className="py-3 px-3 text-center font-mono font-semibold text-stone-600 whitespace-nowrap">
                            {act.sksReguler} SKS
                          </td>
                          <td className="py-3 px-3 text-center font-mono font-bold text-orange-700 whitespace-nowrap">
                            {act.sksMbkm} SKS
                          </td>
                          <td className="py-3 px-4 text-stone-600 leading-relaxed">
                            {act.keterangan || '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Call To Action & Admissions */}
      <section className="py-16 bg-gradient-to-r from-orange-600 via-amber-600 to-amber-500 text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
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
