import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  Target,
  Shield,
  Award,
  Users,
  CheckCircle2,
  Quote,
  Sparkles
} from 'lucide-react';
import { FacultyLogo, UniversityLogo } from './Logos';

export const FacultyProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'visi-misi' | 'sambutan' | 'tata-kelola'>('visi-misi');

  return (
    <section
      id="profil-fakultas"
      aria-label="Profil Fakultas Sains dan Teknologi"
      className="py-16 sm:py-24 bg-white border-b border-stone-200/80 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-orange-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-orange-600 animate-pulse" />
            <span>Identitas & Visi Akademik</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Profil Fakultas Sains dan Teknologi
          </h2>
          <p className="mt-4 text-stone-600 text-base sm:text-lg leading-relaxed">
            Menyatukan kemajuan sains komputasi mutakhir dengan keluhuran etika dan nilai-nilai kearifan lokal Hindu Bali.
          </p>

          {/* Interactive Profile Tabs */}
          <div className="mt-8 inline-flex p-1.5 rounded-xl bg-stone-100 border border-stone-200/70 max-w-full overflow-x-auto">
            <motion.button
              id="tab-visi-misi"
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveTab('visi-misi')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'visi-misi'
                  ? 'bg-white text-orange-600 shadow-xs ring-1 ring-stone-200'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Visi, Misi & Nilai
            </motion.button>
            <motion.button
              id="tab-sambutan"
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveTab('sambutan')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'sambutan'
                  ? 'bg-white text-orange-600 shadow-xs ring-1 ring-stone-200'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Sambutan Dekan
            </motion.button>
            <motion.button
              id="tab-tata-kelola"
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveTab('tata-kelola')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'tata-kelola'
                  ? 'bg-white text-orange-600 shadow-xs ring-1 ring-stone-200'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Pimpinan & Tata Kelola
            </motion.button>
          </div>
        </motion.div>

        {/* Animated Tab Content with AnimatePresence */}
        <AnimatePresence mode="wait">
          {/* Tab 1: Visi, Misi & Nilai */}
          {activeTab === 'visi-misi' && (
            <motion.div
              key="tab-visi-misi"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Visi Card with Hover Glow & Tilt Effect */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-stone-900 via-stone-850 to-stone-900 text-white p-8 sm:p-10 border border-stone-800 shadow-xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 group-hover:bg-orange-500/20 rounded-full blur-2xl pointer-events-none transition-all duration-500" />
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30 group-hover:scale-110 transition-transform">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Visi Keilmuan FAST</h3>
                  </div>
                </div>

                <blockquote className="text-stone-200 text-base sm:text-lg leading-relaxed font-medium italic border-l-2 border-amber-500 pl-4 my-6">
                  “Menjadi Fakultas Sains dan Teknologi yang unggul dan inovatif dalam pengembangan sains, teknologi, desain, dan informasi berbasis budaya untuk menghasilkan lulusan yang bermanfaat bagi masyarakat menuju Indonesia Emas.”
                </blockquote>

                <div className="pt-6 border-t border-stone-800 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-stone-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Sains, Teknologi, Desain & Informasi Berbasis Budaya</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Lulusan Berdaya Saing Menuju Indonesia Emas</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Integritas Nilai Tri Dharma Perguruan Tinggi</span>
                  </div>
                </div>
              </motion.div>

              {/* Misi & Nilai Cards */}
              <div className="lg:col-span-7 space-y-6">
                {/* Misi Section */}
                <div className="p-8 rounded-2xl bg-stone-50/80 border border-stone-200/90 shadow-xs">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-700">
                      <Target className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-stone-900">Misi Tridharma FAST</h3>
                  </div>

                  <ol className="space-y-3.5">
                    {[
                      'Menyelenggarakan pendidikan sains, teknologi, desain, dan informasi yang unggul, inovatif, adaptif terhadap perkembangan ilmu pengetahuan yang berlandaskan budaya.',
                      'Mengembangkan penelitian multidisiplin dibidang sains, teknologi, desain, dan informasi yang inovatif berlandaskan budaya untuk menghasilkan publikasi dan kekayaan intelektual.',
                      'Menyelenggarakan pengabdian kepada masyarakat berbasis hasil penelitian dan inovasi sains, teknologi, desain, dan informasi melalui kolaborasi dengan masyarakat dan pemangku kepentingan untuk menghasilkan solusi yang berdampak dan berkelanjutan.',
                      'Menyelenggarakan tata kelola fakultas yang transparan, akuntabel, efektif, efisien, dan berbasis teknologi dengan berlandaskan budaya untuk mewujudkan layanan akademik dan non-akademik yang bermutu serta berorientasi pada kepuasan pemangku kepentingan.',
                      'Meningkatkan sumber daya manusia yang unggul dan kompetitif di fakultas pada bidang sains, teknologi, desain, dan informasi.'
                    ].map((misiText, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: index * 0.08 }}
                        className="flex items-start gap-3 text-sm text-stone-700 leading-relaxed"
                      >
                        <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                          {index + 1}
                        </span>
                        <span>{misiText}</span>
                      </motion.li>
                    ))}
                  </ol>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tab 2: Sambutan Dekan */}
          {activeTab === 'sambutan' && (
            <motion.div
              key="tab-sambutan"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl mx-auto rounded-2xl bg-stone-50 border border-stone-200 p-8 sm:p-12 shadow-xs relative"
            >
              <Quote className="w-12 h-12 text-amber-400/40 absolute top-6 right-8" />
              
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
                {/* Dekan Visual Badge with Floating Animation */}
                <motion.div
                  whileHover={{ rotate: [0, -4, 4, 0], scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-600 to-amber-600 flex items-center justify-center text-white shrink-0 shadow-md cursor-pointer"
                >
                  <FacultyLogo size="lg" showText={false} />
                </motion.div>

                <div>
                  <div className="text-xs uppercase font-extrabold text-orange-600 tracking-widest">
                    Sambutan Dekan Fakultas
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1 tracking-tight">
                    Dr. I Gede Sedana Suci, SE, M.Ag
                  </h3>
                  <p className="text-sm font-semibold text-amber-700 mt-0.5">
                    Dekan Fakultas Sains dan Teknologi
                  </p>
                  <p className="text-xs text-stone-500">
                    Universitas Hindu Negeri I Gusti Bagus Sugriwa Denpasar
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-stone-700 leading-relaxed text-sm sm:text-base border-t border-stone-200/80 pt-6">
                <p className="font-semibold text-stone-900 italic font-academic">
                  "Om Swastyastu,"
                </p>
                <p>
                  Selamat datang di laman resmi Fakultas Sains dan Teknologi (FAST) Universitas Hindu Negeri I Gusti Bagus Sugriwa Denpasar. Sebagai fakultas yang bertumbuh di era transformasi digital, kami memposisikan diri sebagai jembatan antara pesatnya sains komputasi global dan kekayaan nilai spiritual kebudayaan Nusantara.
                </p>
                <p>
                  Kami menyelenggarakan tiga program studi sarjana yang sangat dibutuhkan zaman: <strong>Informatika</strong>, <strong>Desain Komunikasi Visual (DKV)</strong>, dan <strong>Sains Informasi</strong>. Seluruh kurikulum kami rancang secara adaptif berbasis <em>Outcome-Based Education</em>, diperkuat jejaring magang industri, laboratorium mutakhir, serta dukungan beasiswa melimpah (DIPA, BIB LPDP, dan PIPK).
                </p>
                <p>
                  Kepada para calon mahasiswa baru, peneliti, dan mitra industri, kami mengundang Anda untuk bersama-sama melahirkan karya cipta teknologi yang tidak hanya canggih secara algoritma, tetapi juga teduh dan memanusiakan peradaban.
                </p>
                <p className="font-semibold text-stone-900 italic font-academic pt-2">
                  "Om Santih, Santih, Santih Om."
                </p>

                <div className="pt-6 border-t border-stone-200/80 flex flex-col items-end text-right">
                  <span className="font-bold text-stone-900 text-base">Dr. I Gede Sedana Suci, SE, M.Ag</span>
                  <span className="text-xs font-semibold text-orange-600">Dekan Fakultas Sains dan Teknologi</span>
                  <span className="text-[11px] text-stone-500">UHN I Gusti Bagus Sugriwa Denpasar</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tab 3: Tata Kelola & Pimpinan */}
          {activeTab === 'tata-kelola' && (
            <motion.div
              key="tab-tata-kelola"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl mx-auto space-y-8"
            >
              {/* Executive Leadership Hierarchy (Dekan & Wakil Dekan) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Card Dekan */}
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  whileHover={{ y: -5, transition: { duration: 0.25 } }}
                  className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-white border-2 border-amber-300/80 shadow-lg shadow-amber-900/5 relative overflow-hidden group hover:border-amber-400 hover:shadow-xl transition-all"
                >
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-500 to-orange-600" />
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-600 to-amber-600 flex items-center justify-center text-white shrink-0 shadow-md group-hover:scale-105 transition-transform">
                      <FacultyLogo size="md" showText={false} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-orange-100 text-orange-900 border border-orange-200">
                        Dekan FAST
                      </span>
                      <h4 className="text-lg sm:text-xl font-extrabold text-stone-900 tracking-tight mt-1.5 leading-snug">
                        Dr. I Gede Sedana Suci, SE, M.Ag
                      </h4>
                      <p className="text-xs font-semibold text-orange-700 mt-1">
                        Dekan Fakultas Sains dan Teknologi
                      </p>
                      <p className="text-xs text-stone-500 mt-2.5 leading-relaxed border-t border-stone-100 pt-2.5">
                        Penanggung jawab utama arah kebijakan strategis, kepemimpinan tata pamong, dan tridharma perguruan tinggi FAST UHN IGB Sugriwa.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Card Wakil Dekan */}
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  whileHover={{ y: -5, transition: { duration: 0.25 } }}
                  className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-white border-2 border-blue-300/80 shadow-lg shadow-blue-900/5 relative overflow-hidden group hover:border-blue-400 hover:shadow-xl transition-all"
                >
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600" />
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-md group-hover:scale-105 transition-transform">
                      <UniversityLogo size="md" showText={false} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-100 text-blue-900 border border-blue-200">
                        Wakil Dekan FAST
                      </span>
                      <h4 className="text-lg sm:text-xl font-extrabold text-stone-900 tracking-tight mt-1.5 leading-snug">
                        Dr.Eng. I Gede Agus Krisna Warmayana, S.Kom., MT
                      </h4>
                      <p className="text-xs font-semibold text-blue-700 mt-1">
                        Wakil Dekan Fakultas Sains dan Teknologi
                      </p>
                      <p className="text-xs text-stone-500 mt-2.5 leading-relaxed border-t border-stone-100 pt-2.5">
                        Mengemban koordinasi pelaksanaan bidang akademik, kemahasiswaan, tata kelola kelembagaan, riset inovasi, dan kerja sama kemitraan.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Structural Units / Tata Kelola Pendukung with Staggered Scroll Animations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  whileHover={{ y: -3 }}
                  className="p-5 rounded-xl bg-stone-50 border border-stone-200/80 hover:bg-white hover:border-amber-300 hover:shadow-md transition-all"
                >
                  <div className="text-[11px] font-bold uppercase text-amber-700 tracking-wider">
                    Unit Penjaminan Mutu
                  </div>
                  <div className="text-base font-bold text-stone-900 mt-1">Gugus Kendali Mutu (GKM)</div>
                  <p className="text-xs text-stone-500 mt-1">Monitoring SPMI, audit mutu internal, serta akreditasi LAM INFOKOM dan BAN-PT.</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  whileHover={{ y: -3 }}
                  className="p-5 rounded-xl bg-stone-50 border border-stone-200/80 hover:bg-white hover:border-orange-300 hover:shadow-md transition-all"
                >
                  <div className="text-[11px] font-bold uppercase text-orange-700 tracking-wider">
                    Laboratorium & Studio Terpadu
                  </div>
                  <div className="text-base font-bold text-stone-900 mt-1">Kepala Lab Komputasi & Studio</div>
                  <p className="text-xs text-stone-500 mt-1">Workstation AI, Studio Multimedia/DKV, & Lab Sains Data Terapan.</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  whileHover={{ y: -3 }}
                  className="p-5 rounded-xl bg-stone-50 border border-stone-200/80 hover:bg-white hover:border-stone-400 hover:shadow-md transition-all sm:col-span-2 lg:col-span-1"
                >
                  <div className="text-[11px] font-bold uppercase text-stone-700 tracking-wider">
                    Layanan Administrasi
                  </div>
                  <div className="text-base font-bold text-stone-900 mt-1">Tata Usaha & Akademik FAST</div>
                  <p className="text-xs text-stone-500 mt-1">Pelayanan registrasi perkuliahan, administrasi yudisium, beasiswa, dan persuratan.</p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
