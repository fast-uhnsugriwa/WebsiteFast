import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Search, GraduationCap, Award, BookOpen, Mail, Loader2, AlertCircle, Briefcase } from 'lucide-react';
import Papa from 'papaparse';

interface Dosen {
  id: string;
  name: string;
  nip: string;
  golongan: string;
  jabatan: string;
  rumpunIlmu: string;
  pohonIlmu: string;
  rantingIlmu: string;
  email: string;
  foto: string | null;
}

// URL CSV Export dari Google Sheets
const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1tawkGCHEFUV7kCrkkyyr--5n10a7xCV-w46xNwMY0fo/export?format=csv";

// Fungsi utilitas untuk mengekstrak ID dari Google Drive link dan mengonversinya ke direct image link
function getDirectImageUrl(driveLink: string | null | undefined): string | null {
  if (!driveLink) return null;
  // Format: https://drive.google.com/file/d/1vu-ykQ1W-BWqySPdMCWPO1Cj3l_reJq4/view?usp=sharing
  const match = driveLink.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    // Menggunakan thumbnail API untuk melewati batasan CORS/embedding Google Drive terbaru
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
  }
  return driveLink; // Return as is if it doesn't match standard gdrive format
}

function cleanString(str: any): string {
  if (!str) return '-';
  return str.toString().replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
}

export const DosenProfilePage: React.FC<{ onBackToHome: () => void }> = ({ onBackToHome }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'dosen' | 'pegawai'>('all');
  const [dosenList, setDosenList] = useState<Dosen[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    
    // Fetch CSV dari Google Sheets
    Papa.parse(SHEET_CSV_URL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (!mounted) return;
        
        try {
          const parsedData = results.data.map((row: any, index) => {
            const rawName = row['Nama'] || row['NAMA'] || row['nama'];
            return {
              id: row['No']?.toString() || (index + 1).toString(),
              name: cleanString(rawName) === '-' ? 'Tanpa Nama' : cleanString(rawName),
              nip: cleanString(row['NIP']),
              golongan: cleanString(row['Golongan']),
              jabatan: cleanString(row['Jabatan']),
              rumpunIlmu: cleanString(row['Rumpun Ilmu']),
              pohonIlmu: cleanString(row['Pohon / Cabang Ilmu']),
              rantingIlmu: cleanString(row['Ranting Keilmuan']),
              email: cleanString(row['Email'] || row['email']) || '-',
              foto: getDirectImageUrl(row['Link Foto'] || row['Foto'])
            };
          });
          
          setDosenList(parsedData);
          setIsLoading(false);
        } catch (err) {
          console.error("Error processing CSV data", err);
          setError("Terjadi kesalahan saat memproses data dosen.");
          setIsLoading(false);
        }
      },
      error: (err) => {
        if (!mounted) return;
        console.error("Error fetching CSV", err);
        setError("Gagal memuat data dari Google Sheets. Pastikan link dapat diakses publik.");
        setIsLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);
  
  const isDosen = (d: Dosen) => d.rumpunIlmu !== '-' || d.pohonIlmu !== '-' || d.rantingIlmu !== '-';

  const filteredDosen = dosenList.filter(dosen => {
    const matchesSearch = dosen.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          dosen.jabatan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          dosen.rumpunIlmu.toLowerCase().includes(searchTerm.toLowerCase());
                          
    const matchesType = filterType === 'all' 
                     || (filterType === 'dosen' && isDosen(dosen))
                     || (filterType === 'pegawai' && !isDosen(dosen));
                     
    return matchesSearch && matchesType;
  });

  return (
    <div className="relative min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Navigation & Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <button
            onClick={onBackToHome}
            className="group flex items-center gap-2 text-sm font-semibold text-stone-500 hover:text-orange-600 transition-colors mb-6"
          >
            <div className="p-1.5 rounded-lg bg-white/50 border border-stone-200/60 group-hover:bg-orange-50 group-hover:border-orange-200 transition-all">
              <ChevronLeft className="w-4 h-4" />
            </div>
            Kembali ke Beranda
          </button>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-bold uppercase tracking-wider mb-4">
                <GraduationCap className="w-4 h-4 text-amber-600" />
                <span>Akademik FAST</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-stone-900 tracking-tight">
                Direktori Dosen dan Pegawai
              </h1>
              <p className="mt-4 text-stone-600 max-w-2xl text-lg leading-relaxed">
                Menampilkan profil lengkap staf pengajar, tenaga kependidikan, dan praktisi ahli Fakultas Sains dan Teknologi UHN IGB Sugriwa secara *real-time*.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto md:items-center">
              {/* Filter Buttons */}
              <div className="flex p-1 bg-white/60 backdrop-blur-md rounded-xl border border-stone-200/80 shadow-sm w-full md:w-auto">
                <button
                  onClick={() => setFilterType('all')}
                  className={`flex-1 md:flex-none px-4 py-2 text-sm font-semibold rounded-lg transition-all ${filterType === 'all' ? 'bg-orange-100 text-orange-800' : 'text-stone-500 hover:text-stone-700 hover:bg-stone-50'}`}
                >
                  Semua
                </button>
                <button
                  onClick={() => setFilterType('dosen')}
                  className={`flex-1 md:flex-none px-4 py-2 text-sm font-semibold rounded-lg transition-all ${filterType === 'dosen' ? 'bg-orange-100 text-orange-800' : 'text-stone-500 hover:text-stone-700 hover:bg-stone-50'}`}
                >
                  Dosen
                </button>
                <button
                  onClick={() => setFilterType('pegawai')}
                  className={`flex-1 md:flex-none px-4 py-2 text-sm font-semibold rounded-lg transition-all ${filterType === 'pegawai' ? 'bg-orange-100 text-orange-800' : 'text-stone-500 hover:text-stone-700 hover:bg-stone-50'}`}
                >
                  Pegawai
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-72">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-stone-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200/80 bg-white/60 backdrop-blur-md focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all text-sm placeholder-stone-400 shadow-sm disabled:opacity-50"
                placeholder="Cari nama, jabatan, atau keahlian..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={isLoading || !!error}
              />
            </div>
          </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-32 text-orange-600">
            <Loader2 className="w-12 h-12 animate-spin mb-4" />
            <p className="text-stone-600 font-medium animate-pulse">Menghubungkan Ke Data FAST...</p>
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="p-4 bg-red-50 text-red-600 rounded-full mb-4">
              <AlertCircle className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-2">Gagal Memuat Data</h3>
            <p className="text-stone-600 text-center max-w-md">{error}</p>
          </div>
        )}

        {/* Dosen Grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredDosen.map((dosen, index) => (
                <motion.div
                  key={dosen.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group flex flex-col bg-white/70 backdrop-blur-md rounded-2xl border border-stone-200/80 overflow-hidden hover:shadow-xl hover:shadow-orange-900/5 hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Photo Area */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-100 flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/20 to-transparent z-10" />
                    
                    {dosen.foto && dosen.foto !== '-' ? (
                      <img 
                        src={dosen.foto} 
                        alt={dosen.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-stone-400">
                        <GraduationCap className="w-16 h-16 mb-2 opacity-50" />
                        <span className="text-xs font-medium uppercase tracking-wider">Foto Tidak Tersedia</span>
                      </div>
                    )}

                    {/* Name overlay on photo */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                      <h3 className="text-lg font-bold text-white leading-snug drop-shadow-md">
                        {dosen.name}
                      </h3>
                      <p className="text-orange-300 text-xs font-semibold mt-1">
                        {dosen.jabatan !== '-' ? dosen.jabatan : 'Tenaga Pendidik'}
                      </p>
                    </div>
                  </div>

                  {/* Info Area */}
                  <div className="p-5 flex-1 flex flex-col gap-4 bg-white/50">
                    {/* Keahlian Tags ATAU Jabatan untuk Non-Dosen */}
                    {(dosen.rumpunIlmu !== '-' || dosen.pohonIlmu !== '-' || dosen.rantingIlmu !== '-') ? (
                      <div className="space-y-3">
                        {dosen.rumpunIlmu !== '-' && (
                          <div className="flex items-start gap-2.5">
                            <BookOpen className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Rumpun Ilmu</p>
                              <p className="text-sm font-medium text-stone-700 leading-tight mt-0.5">
                                {dosen.rumpunIlmu}
                              </p>
                            </div>
                          </div>
                        )}
                        
                        {(dosen.rantingIlmu !== '-' || dosen.pohonIlmu !== '-') && (
                          <div className="flex items-start gap-2.5">
                            <Award className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                                {dosen.rantingIlmu !== '-' ? 'Spesialisasi (Ranting)' : 'Pohon / Cabang Ilmu'}
                              </p>
                              <p className="text-sm font-medium text-stone-700 leading-tight mt-0.5">
                                {dosen.rantingIlmu !== '-' ? dosen.rantingIlmu : dosen.pohonIlmu}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-start gap-2.5">
                          <Briefcase className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Jabatan / Posisi</p>
                            <p className="text-sm font-medium text-stone-700 leading-tight mt-0.5">
                              {dosen.jabatan !== '-' ? dosen.jabatan : 'Tenaga Kependidikan'}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mt-auto pt-4 border-t border-stone-100 flex items-center justify-between text-[11px] font-semibold text-stone-500">
                      <span className="bg-stone-100 px-2 py-1 rounded-md">NIP: {dosen.nip !== '-' ? dosen.nip : 'N/A'}</span>
                      <span>Gol: {dosen.golongan !== '-' ? dosen.golongan : '-'}</span>
                    </div>

                    {dosen.email !== '-' ? (
                      <a 
                        href={`mailto:${dosen.email}`}
                        className="mt-2 w-full py-2 flex items-center justify-center gap-2 rounded-lg bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200 transition-colors text-xs font-bold"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        {dosen.email}
                      </a>
                    ) : (
                      <div className="mt-2 w-full py-2 flex items-center justify-center gap-2 rounded-lg bg-stone-50 text-stone-400 border border-stone-200 text-xs font-bold">
                        <Mail className="w-3.5 h-3.5" />
                        -
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredDosen.length === 0 && (
              <div className="col-span-full py-20 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-stone-100 mb-4">
                  <Search className="w-8 h-8 text-stone-400" />
                </div>
                <h3 className="text-lg font-bold text-stone-900">Tidak ada dosen ditemukan</h3>
                <p className="text-stone-500 text-sm mt-1">Coba gunakan kata kunci pencarian yang lain.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
