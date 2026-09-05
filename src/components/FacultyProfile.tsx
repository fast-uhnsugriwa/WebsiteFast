import React, { useState } from 'react';
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
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-orange-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
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
            <button
              id="tab-visi-misi"
              onClick={() => setActiveTab('visi-misi')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'visi-misi'
                  ? 'bg-white text-orange-600 shadow-xs ring-1 ring-stone-200'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Visi, Misi & Nilai
            </button>
            <button
              id="tab-sambutan"
              onClick={() => setActiveTab('sambutan')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'sambutan'
                  ? 'bg-white text-orange-600 shadow-xs ring-1 ring-stone-200'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Sambutan Dekan
            </button>
            <button
              id="tab-tata-kelola"
              onClick={() => setActiveTab('tata-kelola')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'tata-kelola'
                  ? 'bg-white text-orange-600 shadow-xs ring-1 ring-stone-200'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Pimpinan & Tata Kelola
            </button>
          </div>
        </div>

        {/* Tab 1: Visi, Misi & Nilai */}
        {activeTab === 'visi-misi' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Visi Card */}
            <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-stone-900 via-stone-850 to-stone-900 text-white p-8 sm:p-10 border border-stone-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400">
                    Arah Strategis 2035
                  </span>
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
            </div>

            {/* Misi & Nilai Cards */}
            <div className="lg:col-span-7 space-y-6">
              {/* Misi Section */}
              <div className="p-8 rounded-2xl bg-stone-50/80 border border-stone-200/90">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-700">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900">Misi Tridharma FAST</h3>
                </div>

                <ol className="space-y-3.5">
                  <li className="flex items-start gap-3 text-sm text-stone-700 leading-relaxed">
                    <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </span>
                    <span>
                      Menyelenggarakan pendidikan sains, teknologi, desain, dan informasi yang unggul, inovatif, adaptif terhadap perkembangan ilmu pengetahuan yang berlandaskan budaya.
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-stone-700 leading-relaxed">
                    <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </span>
                    <span>
                      Mengembangkan penelitian multidisiplin dibidang sains, teknologi, desain, dan informasi yang inovatif berlandaskan budaya untuk menghasilkan publikasi dan kekayaan intelektual.
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-stone-700 leading-relaxed">
                    <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </span>
                    <span>
                      Menyelenggarakan pengabdian kepada masyarakat berbasis hasil penelitian dan inovasi sains, teknologi, desain, dan informasi melalui kolaborasi dengan masyarakat dan pemangku kepentingan untuk menghasilkan solusi yang berdampak dan berkelanjutan.
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-stone-700 leading-relaxed">
                    <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      4
                    </span>
                    <span>
                      Menyelenggarakan tata kelola fakultas yang transparan, akuntabel, efektif, efisien, dan berbasis teknologi dengan berlandaskan budaya untuk mewujudkan layanan akademik dan non-akademik yang bermutu serta berorientasi pada kepuasan pemangku kepentingan.
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-stone-700 leading-relaxed">
                    <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      5
                    </span>
                    <span>
                      Meningkatkan sumber daya manusia yang unggul dan kompetitif di fakultas pada bidang sains, teknologi, desain, dan informasi.
                    </span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Sambutan Dekan */}
        {activeTab === 'sambutan' && (
          <div className="max-w-4xl mx-auto rounded-2xl bg-stone-50 border border-stone-200 p-8 sm:p-12 shadow-xs relative">
            <Quote className="w-12 h-12 text-amber-400/40 absolute top-6 right-8" />
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
              {/* Dekan Visual Badge */}
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-600 to-amber-600 flex items-center justify-center text-white shrink-0 shadow-md">
                <FacultyLogo size="lg" showText={false} />
              </div>

              <div>
                <div className="text-xs uppercase font-extrabold text-orange-600 tracking-widest">
                  Sambutan Pimpinan Fakultas
                </div>
                <h3 className="text-2xl font-bold text-stone-900 mt-1">
                  Dekan Fakultas Sains dan Teknologi
                </h3>
                <p className="text-sm text-stone-600">
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
            </div>
          </div>
        )}

        {/* Tab 3: Tata Kelola & Pimpinan */}
        {activeTab === 'tata-kelola' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-xl bg-stone-50 border border-stone-200">
                <div className="text-[11px] font-bold uppercase text-orange-700 tracking-wider">
                  Pimpinan Fakultas
                </div>
                <div className="text-base font-bold text-stone-900 mt-1">Dekan FAST</div>
                <p className="text-xs text-stone-500 mt-0.5">Penanggung Jawab Utama Kebijakan & Tridharma</p>
              </div>

              <div className="p-5 rounded-xl bg-stone-50 border border-stone-200">
                <div className="text-[11px] font-bold uppercase text-amber-700 tracking-wider">
                  Wakil Dekan I
                </div>
                <div className="text-base font-bold text-stone-900 mt-1">Bidang Akademik & Kelembagaan</div>
                <p className="text-xs text-stone-500 mt-0.5">Kurikulum OBE, Perkuliahan & Penjaminan Mutu</p>
              </div>

              <div className="p-5 rounded-xl bg-stone-50 border border-stone-200">
                <div className="text-[11px] font-bold uppercase text-amber-700 tracking-wider">
                  Unit Penjaminan Mutu
                </div>
                <div className="text-base font-bold text-stone-900 mt-1">Gugus Kendali Mutu FAST</div>
                <p className="text-xs text-stone-500 mt-0.5">Monitoring Akreditasi LAM INFOKOM & BAN-PT</p>
              </div>

              <div className="p-5 rounded-xl bg-stone-50 border border-stone-200">
                <div className="text-[11px] font-bold uppercase text-stone-700 tracking-wider">
                  Laboratorium Terpadu
                </div>
                <div className="text-base font-bold text-stone-900 mt-1">Kepala Lab & Studio</div>
                <p className="text-xs text-stone-500 mt-0.5">Workstation AI, Multimedia DKV, & Sains Data</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
