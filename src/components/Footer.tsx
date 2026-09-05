import React from 'react';
import {
  Instagram,
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
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 text-xs">
      {/* Top Academic Credo Banner */}
      <div className="bg-stone-950 py-3 px-4 sm:px-6 lg:px-8 border-b border-stone-800/80">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 text-amber-400 font-semibold tracking-wide text-xs">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span className="font-academic italic">"Dharmo Rakshati Rakshitah"</span>
            <span className="text-stone-500 hidden md:inline">— Kebajikan yang dijaga akan senantiasa menjaga.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-stone-400 hover:text-amber-400 transition-colors text-[11px] font-bold"
          >
            <span>Kembali ke Atas</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Institutional Identity */}
          <div className="lg:col-span-4 space-y-4">
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
                <a href="mailto:fast@uhnsugriwa.ac.id" className="hover:text-amber-400 transition-colors">
                  fast@uhnsugriwa.ac.id
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4 text-rose-500 shrink-0" />
                <a
                  href="https://www.instagram.com/fastsugriwa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors font-semibold"
                >
                  @fastsugriwa (Akun Resmi)
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Program Studi */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs uppercase font-extrabold text-amber-400 tracking-wider">
              Program Studi (S1)
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://informatika.uhnsugriwa.ac.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-stone-300 hover:text-orange-400 transition-colors"
                >
                  <span>S1 Informatika</span>
                  <ExternalLink className="w-3 h-3 text-stone-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://dkvsugriwa.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-stone-300 hover:text-amber-400 transition-colors"
                >
                  <span>S1 Desain Komunikasi Visual</span>
                  <ExternalLink className="w-3 h-3 text-stone-500" />
                </a>
              </li>
              <li>
                <button
                  onClick={onNavigateSainsInformasi}
                  className="flex items-center justify-between text-stone-300 hover:text-orange-400 transition-colors w-full text-left"
                >
                  <span>S1 Sains Informasi</span>
                  <ExternalLink className="w-3 h-3 text-stone-500" />
                </button>
              </li>
            </ul>

            <div className="pt-4">
              <h4 className="text-[11px] uppercase font-bold text-stone-400 tracking-wider mb-2">
                Penerimaan Mahasiswa Baru
              </h4>
              <a
                href="https://taplink.cc/uhnmaba2026"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-xs transition-colors"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Portal PMB Online</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Col 3: Layanan Akademik & Beasiswa */}
          <div className="lg:col-span-3 space-y-3">
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
                  className="hover:text-amber-300 transition-colors text-left"
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
                  className="hover:text-amber-300 transition-colors text-left"
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
                  className="hover:text-amber-300 transition-colors text-left"
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
                  className="hover:text-amber-300 transition-colors text-left"
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
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Publikasi Jurnal SINTA
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Akademik & Mahasiswa */}
          <div className="lg:col-span-2 space-y-3">
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
                  className="hover:text-amber-300 transition-colors text-left"
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
                  className="hover:text-amber-300 transition-colors text-left"
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
                  className="hover:text-amber-300 transition-colors text-left"
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
                  className="hover:text-amber-300 transition-colors text-left"
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
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Fasilitas Laboratorium
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Accreditations */}
        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
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
        </div>
      </div>
    </footer>
  );
};
