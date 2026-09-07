import React from 'react';
import { motion } from 'motion/react';
import {
  Instagram,
  Youtube,
  Facebook,
  Mail,
  MapPin,
  ExternalLink,
  GraduationCap,
  Globe,
  ArrowUp,
  Sparkles,
  Phone
} from 'lucide-react';
import { InstitutionalBrandLockup, UniversityLogo, FacultyLogo } from './Logos';
import { NavDropdownItem } from '../types';

const TikTokIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.43c.24-.24.45-.5.64-.78V9.17a8.16 8.16 0 0 0 5.09 1.76V7.48a4.84 4.84 0 0 1 0-.79Z" />
  </svg>
);

interface FooterProps {
  onSelectNavItem: (item: NavDropdownItem) => void;
  onNavigateHome: () => void;
  onNavigateSainsInformasi: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectNavItem,
  onNavigateHome,
  onNavigateSainsInformasi
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 bg-stone-900 text-stone-300 border-t border-stone-800 text-xs overflow-hidden">
      {/* Top Academic Credo Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.5 }}
        className="bg-stone-950 py-3 px-4 sm:px-6 lg:px-8 border-b border-stone-800/80"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-stone-400 hover:text-amber-400 transition-colors text-[11px] font-bold cursor-pointer group"
          >
            <span>Kembali ke Atas</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        </div>
      </motion.div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Institutional Identity */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-1 rounded-xl bg-white/5 border border-white/10">
                <UniversityLogo size="sm" showText={false} />
              </div>
              <div className="p-1 rounded-xl bg-white/5 border border-white/10">
                <FacultyLogo size="sm" showText={false} />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-amber-500 tracking-wider">
                  UHN IGB SUGRIWA DENPASAR
                </div>
                <div className="text-sm font-extrabold text-white tracking-tight">
                  Fakultas Sains dan Teknologi
                </div>
              </div>
            </div>

            <p className="text-stone-400 leading-relaxed text-xs">
              Pusat keunggulan pendidikan tinggi sains, rekayasa perangkat lunak, desain komunikasi visual, dan sains informasi yang menjunjung tinggi etika Tri Kaya Parisudha.
            </p>

            <div className="pt-2 space-y-2 text-stone-400 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Kampus Bangli:</strong> Jl. Nusantara, Kubu, Kec. Bangli, Kabupaten Bangli, Bali 80614
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Kampus Denpasar:</strong> Jl. Ratna No.51, Tonja, Kec. Denpasar Utara, Bali 80239
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <a href="mailto:fast@uhnsugriwa.ac.id" className="hover:text-amber-400 hover:translate-x-0.5 transition-all inline-block">
                  fast@uhnsugriwa.ac.id
                </a>
              </div>
              {/* Media Sosial Resmi FAST */}
              <div className="pt-2.5 mt-2.5 border-t border-stone-800/90 space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                  Media Sosial Resmi:
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <a
                    href="https://www.instagram.com/fastsugriwa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-1.5 rounded-lg bg-stone-900/80 hover:bg-stone-800 border border-stone-800 hover:border-rose-500/50 hover:text-rose-300 transition-all group"
                    title="Instagram @fastsugriwa"
                  >
                    <Instagram className="w-3.5 h-3.5 text-rose-500 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="truncate">@fastsugriwa</span>
                  </a>

                  <a
                    href="https://www.youtube.com/@fastsugriwa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-1.5 rounded-lg bg-stone-900/80 hover:bg-stone-800 border border-stone-800 hover:border-red-500/50 hover:text-red-300 transition-all group"
                    title="YouTube @fastsugriwa"
                  >
                    <Youtube className="w-3.5 h-3.5 text-red-500 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="truncate">@fastsugriwa</span>
                  </a>

                  <a
                    href="https://www.tiktok.com/@fastsugriwa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-1.5 rounded-lg bg-stone-900/80 hover:bg-stone-800 border border-stone-800 hover:border-cyan-400/50 hover:text-cyan-300 transition-all group"
                    title="TikTok @fastsugriwa"
                  >
                    <TikTokIcon className="w-3.5 h-3.5 text-stone-300 group-hover:text-cyan-300 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="truncate">@fastsugriwa</span>
                  </a>

                  <a
                    href="https://www.facebook.com/sainteksugriwa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-1.5 rounded-lg bg-stone-900/80 hover:bg-stone-800 border border-stone-800 hover:border-blue-500/50 hover:text-blue-300 transition-all group"
                    title="Facebook Saintek Sugriwa"
                  >
                    <Facebook className="w-3.5 h-3.5 text-blue-500 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="truncate">Saintek Sugriwa</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Col 2: Program Studi */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3 space-y-3"
          >
            <h3 className="text-xs uppercase font-extrabold text-amber-400 tracking-wider">
              Program Studi (S1)
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://informatika.uhnsugriwa.ac.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-stone-300 hover:text-orange-400 hover:translate-x-1 transition-all group"
                >
                  <span>S1 Informatika</span>
                  <ExternalLink className="w-3 h-3 text-stone-500 group-hover:text-orange-400 transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href="https://dkvsugriwa.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-stone-300 hover:text-amber-400 hover:translate-x-1 transition-all group"
                >
                  <span>S1 Desain Komunikasi Visual</span>
                  <ExternalLink className="w-3 h-3 text-stone-500 group-hover:text-amber-400 transition-colors" />
                </a>
              </li>
              <li>
                <button
                  onClick={onNavigateSainsInformasi}
                  className="flex items-center justify-between text-stone-300 hover:text-orange-400 hover:translate-x-1 transition-all w-full text-left group cursor-pointer"
                >
                  <span>S1 Sains Informasi</span>
                  <ExternalLink className="w-3 h-3 text-stone-500 group-hover:text-orange-400 transition-colors" />
                </button>
              </li>
            </ul>

            <div className="pt-4">
              <h4 className="text-[11px] uppercase font-bold text-stone-400 tracking-wider mb-2">
                Penerimaan Mahasiswa Baru
              </h4>
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="https://taplink.cc/uhnmaba2026"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md transition-colors"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Portal PMB Online</span>
                <ExternalLink className="w-3 h-3" />
              </motion.a>
            </div>
          </motion.div>

          {/* Col 3: Layanan Akademik & Beasiswa */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 space-y-3"
          >
            <h3 className="text-xs uppercase font-extrabold text-amber-400 tracking-wider">
              Beasiswa & Riset
            </h3>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  onClick={() =>
                    onSelectNavItem({
                      id: 'beasiswa-dipa',
                      title: 'Beasiswa Dipa',
                      description: 'Beasiswa DIPA kementerian',
                      category: 'beasiswa'
                    })
                  }
                  className="hover:text-amber-300 hover:translate-x-1 transition-all text-left block cursor-pointer"
                >
                  Beasiswa Dipa FAST
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    onSelectNavItem({
                      id: 'beasiswa-bib',
                      title: 'Beasiswa BIB',
                      description: 'Beasiswa Indonesia Bangkit',
                      category: 'beasiswa'
                    })
                  }
                  className="hover:text-amber-300 hover:translate-x-1 transition-all text-left block cursor-pointer"
                >
                  Beasiswa Indonesia Bangkit (BIB)
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    onSelectNavItem({
                      id: 'beasiswa-pipk',
                      title: 'Beasiswa PIPK',
                      description: 'Program Indonesia Pintar Kuliah',
                      category: 'beasiswa'
                    })
                  }
                  className="hover:text-amber-300 hover:translate-x-1 transition-all text-left block cursor-pointer"
                >
                  Program Indonesia Pintar Kuliah (PIPK)
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    onSelectNavItem({
                      id: 'kegiatan-penelitian',
                      title: 'Kegiatan Penelitian',
                      description: 'Riset FAST',
                      category: 'riset'
                    })
                  }
                  className="hover:text-amber-300 hover:translate-x-1 transition-all text-left block cursor-pointer"
                >
                  Riset & Hibah Penelitian
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    onSelectNavItem({
                      id: 'publikasi',
                      title: 'Publikasi',
                      description: 'Jurnal & Publikasi',
                      category: 'riset'
                    })
                  }
                  className="hover:text-amber-300 hover:translate-x-1 transition-all text-left block cursor-pointer"
                >
                  Publikasi Jurnal SINTA
                </button>
              </li>
            </ul>
          </motion.div>

          {/* Col 4: Akademik & Mahasiswa */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2 space-y-3"
          >
            <h3 className="text-xs uppercase font-extrabold text-amber-400 tracking-wider">
              Akademik
            </h3>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  onClick={() =>
                    onSelectNavItem({
                      id: 'profil-dosen',
                      title: 'Profil Dosen',
                      description: 'Dosen FAST',
                      category: 'akademik'
                    })
                  }
                  className="hover:text-amber-300 hover:translate-x-1 transition-all text-left block cursor-pointer"
                >
                  Profil Dosen
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    onSelectNavItem({
                      id: 'modul-mata-kuliah',
                      title: 'Modul Mata Kuliah',
                      description: 'RPS & Modul',
                      category: 'akademik'
                    })
                  }
                  className="hover:text-amber-300 hover:translate-x-1 transition-all text-left block cursor-pointer"
                >
                  Modul Mata Kuliah
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    onSelectNavItem({
                      id: 'kerja-praktek',
                      title: 'Kerja Praktek / PKL',
                      description: 'Magang PKL',
                      category: 'akademik'
                    })
                  }
                  className="hover:text-amber-300 hover:translate-x-1 transition-all text-left block cursor-pointer"
                >
                  Kerja Praktek (PKL)
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    onSelectNavItem({
                      id: 'tugas-akhir',
                      title: 'Tugas Akhir / Skripsi',
                      description: 'Skripsi',
                      category: 'akademik'
                    })
                  }
                  className="hover:text-amber-300 hover:translate-x-1 transition-all text-left block cursor-pointer"
                >
                  Tugas Akhir & Skripsi
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    onSelectNavItem({
                      id: 'fasilitas-pembelajaran',
                      title: 'Fasilitas Pembelajaran',
                      description: 'Lab & Fasilitas',
                      category: 'belajar'
                    })
                  }
                  className="hover:text-amber-300 hover:translate-x-1 transition-all text-left block cursor-pointer"
                >
                  Fasilitas Laboratorium
                </button>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Legal & Accreditations */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]"
        >
          <div>
            © {new Date().getFullYear()} Fakultas Sains dan Teknologi UHN I Gusti Bagus Sugriwa Denpasar. Hak Cipta Dilindungi.
          </div>

          <div className="flex items-center gap-4">
            <span>Terakreditasi BAN-PT & LAM INFOKOM</span>
            <span>•</span>
            <a
              href="https://uhnsugriwa.ac.id"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <span>Portal Universitas (uhnsugriwa.ac.id)</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
