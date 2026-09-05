import { NavMenu, DetailContent } from '../types';

export const NAVIGATION_MENUS: NavMenu[] = [
  {
    title: 'Beasiswa',
    slug: 'beasiswa',
    items: [
      {
        id: 'beasiswa-dipa',
        title: 'Beasiswa Dipa',
        description: 'Bantuan pembiayaan pendidikan dari alokasi DIPA kementerian untuk mahasiswa berprestasi & membutuhkan.',
        category: 'beasiswa',
        badge: 'Tahunan'
      },
      {
        id: 'beasiswa-bib',
        title: 'Beasiswa BIB',
        description: 'Beasiswa Indonesia Bangkit (Kemenag - LPDP) untuk jenjang sarjana saintis dan teknologi unggul.',
        category: 'beasiswa',
        badge: 'Penuh (Full)'
      },
      {
        id: 'beasiswa-pipk',
        title: 'Beasiswa PIPK',
        description: 'Program Indonesia Pintar Kuliah menjamin akses pendidikan tinggi merata bagi putra-putri berpotensi.',
        category: 'beasiswa',
        badge: 'Reguler'
      }
    ]
  },
  {
    title: 'Riset & Inovasi',
    slug: 'riset',
    items: [
      {
        id: 'kegiatan-penelitian',
        title: 'Kegiatan Penelitian',
        description: 'Fokus riset terapan kecerdasan buatan, visual computing, sains data, dan digitalisasi kearifan lokal Bali.',
        category: 'riset',
        badge: 'Hibah 2026'
      },
      {
        id: 'kegiatan-pengabdian',
        title: 'Kegiatan Pengabdian',
        description: 'Pemberdayaan desa adat, digitalisasi UMKM lokal, dan transformasi digital institusi keagamaan Hindu.',
        category: 'riset',
        badge: 'PkM Terpadu'
      },
      {
        id: 'publikasi',
        title: 'Publikasi',
        description: 'Jurnal ilmiah terindeks SINTA, prosiding konferensi internasional, dan repositori karya ilmiah FAST.',
        category: 'riset',
        badge: 'SINTA & Scopus'
      }
    ]
  },
  {
    title: 'Akademik',
    slug: 'akademik',
    items: [
      {
        id: 'profil-dosen',
        title: 'Profil Dosen',
        description: 'Tenaga pendidik berkualifikasi Magister (S2) dan Doktor (S3) serta praktisi teknologi bereputasi.',
        category: 'akademik',
        badge: 'Pengajar'
      },
      {
        id: 'modul-mata-kuliah',
        title: 'Modul Mata Kuliah',
        description: 'Rencana Pembelajaran Semester (RPS), bahan ajar terbuka, dan modul praktikum laboratorium.',
        category: 'akademik',
        badge: 'Kurikulum OBE'
      },
      {
        id: 'kerja-praktek',
        title: 'Kerja Praktek / PKL',
        description: 'Magang industri bersertifikat di instansi pemerintah, BUMN, agensi kreatif, dan perusahaan rintisan teknologi.',
        category: 'akademik',
        badge: 'Semester 6-7'
      },
      {
        id: 'kkn',
        title: 'KKN (Kuliah Kerja Nyata)',
        description: 'Pengabdian mahasiswa berbasis pemberdayaan teknologi informasi dan pemetaan data di desa binaan.',
        category: 'akademik',
        badge: 'Interdisipliner'
      },
      {
        id: 'tugas-akhir',
        title: 'Tugas Akhir / Skripsi',
        description: 'Prosedur pengajuan proposal, pedoman penulisan, seminar hasil, dan sidang ujian komprehensif sarjana.',
        category: 'akademik',
        badge: 'Kelulusan'
      }
    ]
  },
  {
    title: 'Belajar Bersama Kami',
    slug: 'belajar',
    items: [
      {
        id: 'prospek-karir',
        title: 'Prospek Karir',
        description: 'Peluang lulusan di bidang Software Engineer, Data Scientist, UI/UX Designer, hingga Akademisi.',
        category: 'belajar',
        badge: 'Karier'
      },
      {
        id: 'kehidupan-kampus',
        title: 'Kehidupan Kampus',
        description: 'Ekosistem akademik harmonis mengintegrasikan teknologi modern dengan nilai kearifan Tri Hita Karana.',
        category: 'belajar',
        badge: 'Budaya Kampus'
      },
      {
        id: 'kegiatan-dosen',
        title: 'Kegiatan Dosen',
        description: 'Aktivitas pengajaran, pembimbingan riset, partisipasi simposium teknologi, dan pengabdian masyarakat.',
        category: 'belajar',
        badge: 'Tridharma'
      },
      {
        id: 'kegiatan-mahasiswa',
        title: 'Kegiatan Mahasiswa',
        description: 'Himpunan Mahasiswa (HIMA), klub robotika, komunitas coding, festival desain, dan kompetisi inovasi.',
        category: 'belajar',
        badge: 'Organisasi'
      },
      {
        id: 'fasilitas-pembelajaran',
        title: 'Fasilitas Pembelajaran',
        description: 'Laboratorium komputer canggih, studio multimedia & DKV, perpustakaan digital, dan jejaring internet berkecepatan tinggi.',
        category: 'belajar',
        badge: 'Smart Campus'
      }
    ]
  }
];

export const DETAIL_CONTENTS: Record<string, DetailContent> = {
  'beasiswa-dipa': {
    id: 'beasiswa-dipa',
    title: 'Beasiswa DIPA Kementerian Agama',
    categoryName: 'Beasiswa',
    subtitle: 'Dukungan finansial bagi mahasiswa berprestasi dan berdedikasi tinggi di Fakultas Sains dan Teknologi.',
    summary: 'Beasiswa DIPA (Daftar Isian Pelaksanaan Anggaran) dialokasikan secara berkala oleh Universitas Hindu Negeri I Gusti Bagus Sugriwa Denpasar guna memfasilitasi mahasiswa berprestasi akademik maupun non-akademik di program studi Informatika, Desain Komunikasi Visual, dan Sains Informasi.',
    keyPoints: [
      {
        heading: 'Komponen Bantuan',
        points: [
          'Subsidi biaya UKT (Uang Kuliah Tunggal) per semester.',
          'Bantuan biaya operasional perkuliahan dan praktikum laboratorium.',
          'Sertifikat penerima penghargaan akademik dekanat.'
        ]
      },
      {
        heading: 'Kriteria & Persyaratan',
        points: [
          'Mahasiswa aktif minimal semester 3 dengan IPK minimal 3.25.',
          'Tidak sedang menerima beasiswa lain dari APBN/APBD atau pihak swasta.',
          'Memiliki rekam jejak perilaku baik dan aktif dalam kegiatan kemahasiswaan FAST.'
        ]
      }
    ],
    requirements: [
      'Fotokopi Kartu Tanda Mahasiswa (KTM) aktif.',
      'Transkrip nilai legalisir terakhir.',
      'Surat pernyataan tidak menerima beasiswa lain bertandatangan materai.',
      'Portofolio prestasi atau sertifikat penghargaan (jika ada).'
    ],
    actionLink: {
      label: 'Unduh Formulir & Panduan Beasiswa DIPA',
      url: '#',
      isExternal: false
    },
    contactPerson: {
      role: 'Subbagian Kemahasiswaan & Alumni',
      name: 'Tim Beasiswa FAST UHN Sugriwa',
      email: 'fast@uhnsugriwa.ac.id'
    }
  },
  'beasiswa-bib': {
    id: 'beasiswa-bib',
    title: 'Beasiswa Indonesia Bangkit (BIB)',
    categoryName: 'Beasiswa',
    subtitle: 'Kolaborasi strategis Kementerian Agama RI dan LPDP Kementerian Keuangan untuk melahirkan talenta sains-teknologi nasional.',
    summary: 'Beasiswa Indonesia Bangkit (BIB) merupakan skema beasiswa bergengsi berbiaya penuh (full scholarship) bagi calon sarjana yang ingin menekuni bidang sains terapan, teknologi informasi, komputasi, dan desain berbasis kebudayaan di lingkungan perguruan tinggi keagamaan negeri.',
    keyPoints: [
      {
        heading: 'Cakupan Pembiayaan Lengkap',
        points: [
          'Biaya pendaftaran dan SPP/UKT 100% ditanggung hingga lulus (maksimal 8 semester).',
          'Biaya hidup bulanan (living allowance), tunjangan buku, dan dana darurat.',
          'Bantuan biaya riset tugas akhir atau skripsi inovasi teknologi.'
        ]
      },
      {
        heading: 'Kualifikasi Pelamar',
        points: [
          'Lulusan SMA/SMK/MA sederajat dengan nilai akademik terakreditasi unggul.',
          'Memiliki komitmen integritas kebangsaan dan moderasi beragama.',
          'Lolos seleksi administrasi, bakat skolastik, dan wawancara panelis nasional.'
        ]
      }
    ],
    requirements: [
      'Ijazah / Surat Keterangan Lulus resmi.',
      'Esai motivasi studi dan rancangan kontribusi keilmuan untuk bangsa.',
      'Surat rekomendasi dari kepala sekolah atau tokoh masyarakat.',
      'Sertifikat kecakapan bahasa atau portofolio karya digital (untuk DKV/Informatika).'
    ],
    actionLink: {
      label: 'Kunjungi Portal Resmi Pendaftaran BIB Kemenag',
      url: 'https://beasiswa.kemenag.go.id/',
      isExternal: true
    },
    contactPerson: {
      role: 'Helpdesk Beasiswa BIB FAST',
      name: 'Pusat Layanan Mahasiswa UHN',
      email: 'fast@uhnsugriwa.ac.id'
    }
  },
  'beasiswa-pipk': {
    id: 'beasiswa-pipk',
    title: 'Program Indonesia Pintar Kuliah (KIP-K / PIPK)',
    categoryName: 'Beasiswa',
    subtitle: 'Membuka pintu asa bagi calon mahasiswa berpotensi akademik tinggi dari keluarga prasejahtera.',
    summary: 'PIPK / KIP Kuliah di UHN I Gusti Bagus Sugriwa Denpasar memberikan jaminan akses perkuliahan tanpa beban biaya UKT serta subsidi biaya hidup bagi mahasiswa FAST, memastikan tidak ada generasi muda yang putus kuliah karena keterbatasan ekonomi.',
    keyPoints: [
      {
        heading: 'Fasilitas Penerima PIPK',
        points: [
          'Pembebasan biaya kuliah secara penuh sepanjang masa studi normal.',
          'Bantuan biaya hidup langsung disalurkan ke rekening bank mahasiswa setiap semester.',
          'Pendampingan akademik intensif dan bimbingan karir oleh dosen wali.'
        ]
      },
      {
        heading: 'Jadwal & Verifikasi',
        points: [
          'Pendaftaran dibuka selaras dengan gelombang Penerimaan Mahasiswa Baru (PMB).',
          'Verifikasi faktual dokumen dan visitasi tim kemahasiswaan ke domisili pelamar.',
          'Evaluasi capaian IPK secara berkala setiap akhir semester ganjil dan genap.'
        ]
      }
    ],
    requirements: [
      'Memiliki Kartu Indonesia Pintar (KIP) atau terdaftar dalam Data Terpadu Kesejahteraan Sosial (DTKS).',
      'Surat keterangan penghasilan orang tua dari kelurahan/desa setempat.',
      'Foto tempat tinggal dan kelengkapan data keluarga.',
      'Diterima di salah satu program studi di Fakultas Sains dan Teknologi.'
    ],
    actionLink: {
      label: 'Sistem Informasi KIP Kuliah Kemdikbudristek',
      url: 'https://kip-kuliah.kemdikbud.go.id/',
      isExternal: true
    },
    contactPerson: {
      role: 'Koordinator Verifikasi PIPK',
      name: 'Sekretariat FAST UHN Sugriwa',
      email: 'fast@uhnsugriwa.ac.id'
    }
  },
  'kegiatan-penelitian': {
    id: 'kegiatan-penelitian',
    title: 'Kegiatan Penelitian & Riset FAST',
    categoryName: 'Riset & Inovasi',
    subtitle: 'Riset multidisipliner memadukan computational science, human-computer interaction, dan kearifan lokal Bali.',
    summary: 'Fakultas Sains dan Teknologi UHN I Gusti Bagus Sugriwa mengarahkan peta jalan (roadmap) riset pada solusi cerdas masa depan. Dosen dan mahasiswa berkolaborasi dalam proyek kecerdasan buatan, visual identity, visual storytelling naskah lontar Hindu, arsitektur data kebudayaan, hingga sistem informasi cerdas perdesaan.',
    keyPoints: [
      {
        heading: 'Fokus Riset Utama',
        points: [
          'Digitalisasi & Preservasi AI Manuskrip Budaya: Alih aksara otomatis naskah lontar Bali berbasis Convolutional Neural Network (CNN).',
          'Sains Data & Knowledge Graph Kebudayaan: Pemodelan data ontologi keagamaan Hindu dan kearifan Tri Hita Karana.',
          'Komputasi Visual & Desain Interaktif: Perancangan antarmuka pengguna berbasis augmented reality (AR) untuk edukasi warisan budaya.',
          'Sistem Cerdas Lingkungan: Monitoring IoT kualitas air, kesuburan tanah subak, dan pertanian presisi.'
        ]
      },
      {
        heading: 'Skema Pendanaan Riset',
        points: [
          'Hibah Penelitian Dosen Pemula (PDP) dan Terapan Kemendiktisaintek / Kemenag.',
          'Kolaborasi Riset Mahasiswa-Dosen terintegrasi dalam mata kuliah Tugas Akhir.',
          'Konsorsium riset bersama universitas mitra di dalam dan luar negeri.'
        ]
      }
    ],
    actionLink: {
      label: 'Lihat Roadmap Riset & Panduan Proposal',
      url: '#',
      isExternal: false
    },
    contactPerson: {
      role: 'Ketua Unit Riset & Pengabdian FAST',
      name: 'Dr. I Wayan Sudiarta, S.Kom., M.Cs.',
      email: 'fast@uhnsugriwa.ac.id'
    }
  },
  'kegiatan-pengabdian': {
    id: 'kegiatan-pengabdian',
    title: 'Kegiatan Pengabdian kepada Masyarakat (PkM)',
    categoryName: 'Riset & Inovasi',
    subtitle: 'Mendedikasikan ilmu pengetahuan dan teknologi demi kemakmuran masyarakat Bali dan Nusantara.',
    summary: 'Pengabdian kepada Masyarakat FAST berfokus pada hilirisasi teknologi. Melalui pelatihan literasi digital, perancangan identitas visual produk UMKM desa adat, serta instalasi sistem informasi tata kelola banjar dan desa wisata cerdas (smart village).',
    keyPoints: [
      {
        heading: 'Program Unggulan Pengabdian',
        points: [
          'Digitalisasi Tata Kelola Desa Adat: Pelatihan sistem administrasi digital kependudukan dan pencatatan kas banjar.',
          'Rebranding & Packaging Kreatif UMKM: Pendampingan mahasiswa DKV bagi pengrajin lokal untuk go-digital ke pasar global.',
          'Literasi Keamanan Siber & Privasi Data: Edukasi etika digital, anti-hoaks, dan perlindungan privasi data keluarga.',
          'Sistem Arsip Digital Pura & Tempat Suci: Pendataan dan katalogisasi artefak budaya berkoordinasi dengan pemangku adat.'
        ]
      }
    ],
    actionLink: {
      label: 'Unduh Laporan & Usulan Mitra PkM',
      url: '#',
      isExternal: false
    },
    contactPerson: {
      role: 'Koordinator PkM FAST',
      name: 'Tim Pengabdian Masyarakat UHN Sugriwa',
      email: 'fast@uhnsugriwa.ac.id'
    }
  },
  'publikasi': {
    id: 'publikasi',
    title: 'Publikasi Ilmiah & Repositori FAST',
    categoryName: 'Riset & Inovasi',
    subtitle: 'Wadah desiminasi ilmiah dosen dan mahasiswa di panggung jurnal nasional dan internasional.',
    summary: 'Seluruh hasil penelitian sivitas akademika Fakultas Sains dan Teknologi dipublikasikan secara terbuka melalui jurnal terakreditasi SINTA serta dipresentasikan pada simposium internasional di bidang sains data, informatika, dan desain grafis.',
    keyPoints: [
      {
        heading: 'Koleksi Publikasi & Jurnal Fakultas',
        points: [
          'Jurnal Sains dan Teknologi Cendekia (J-STEC): Jurnal peer-reviewed terbit 2 kali setahun.',
          'Prosiding Konferensi Nasional Teknologi Informasi & Desain Kebudayaan (KONSTID).',
          'Koleksi Skripsi Digital dan Naskah Publikasi Mahasiswa Terindeks Google Scholar.'
        ]
      }
    ],
    actionLink: {
      label: 'Buka Portal E-Journal FAST UHN Sugriwa',
      url: 'https://ejournal.uhnsugriwa.ac.id/',
      isExternal: true
    },
    contactPerson: {
      role: 'Dewan Redaksi Jurnal FAST',
      name: 'Tim Publikasi & Repositori Digital',
      email: 'fast@uhnsugriwa.ac.id'
    }
  },
  'profil-dosen': {
    id: 'profil-dosen',
    title: 'Profil Tenaga Pendidik & Dosen FAST',
    categoryName: 'Akademik',
    subtitle: 'Dosen berkompetensi tinggi lulusan universitas terkemuka dalam dan luar negeri, berdedikasi membimbing mahasiswa.',
    summary: 'Fakultas Sains dan Teknologi UHN IGB Sugriwa Denpasar didukung oleh tenaga pendidik yang dinamis, memiliki sertifikasi keahlian industri (Cisco, Adobe Certified, AWS, Google Cloud, Data Science Professional), serta aktif meneliti di tingkat internasional.',
    keyPoints: [
      {
        heading: 'Kualifikasi Dosen FAST',
        points: [
          '100% Dosen berpendidikan minimal Magister (S2) dan Doktor (S3) linier di bidang ilmu komputasi, desain grafis, dan sains informasi.',
          'Rasio dosen dan mahasiswa yang ideal guna menjamin bimbingan personal dan intensif.',
          'Praktisi industri aktif sebagai dosen tamu dari studio kreatif, software house, dan instansi data terkemuka.'
        ]
      }
    ],
    actionLink: {
      label: 'Lihat Direktori Lengkap Dosen & Publikasi SINTA',
      url: '#',
      isExternal: false
    },
    contactPerson: {
      role: 'Wakil Dekan I Bidang Akademik',
      name: 'Sekretariat Pimpinan FAST',
      email: 'fast@uhnsugriwa.ac.id'
    }
  },
  'modul-mata-kuliah': {
    id: 'modul-mata-kuliah',
    title: 'Modul Mata Kuliah & Bahan Ajar Digital',
    categoryName: 'Akademik',
    subtitle: 'Kurikulum adaptif berbasis Outcome-Based Education (OBE) dan Merdeka Belajar Kampus Merdeka (MBKM).',
    summary: 'Modul mata kuliah disusun secara terstruktur dengan penekanan pada studi kasus nyata, hands-on coding, praktikum laboratorium studio, dan pemecahan masalah kontekstual. Mahasiswa dapat mengunduh RPS dan modul praktikum sebelum perkuliahan dimulai.',
    keyPoints: [
      {
        heading: 'Pilar Kurikulum FAST',
        points: [
          'Fondasi Sains & Matematika Komputasi: Aljabar Linier, Probabilitas, dan Logika Komputasi.',
          'Core Skillsets: Pemrograman Terstruktur, Struktur Data, Rekayasa Perangkat Lunak, Tipografi, Branding, Data Mining.',
          'Integrasi Kearifan Lokal: Etika Profesi Berlandaskan Catur Purusa Artha & Tri Kaya Parisudha.',
          'Modul Praktikum Laboratorium Terbuka: Dapat diakses via Learning Management System (LMS) Sugriwa.'
        ]
      }
    ],
    actionLink: {
      label: 'Akses Portal E-Learning / LMS UHN Sugriwa',
      url: 'https://elearning.uhnsugriwa.ac.id/',
      isExternal: true
    },
    contactPerson: {
      role: 'Pusat Kurikulum & Pembelajaran FAST',
      name: 'Koordinator Akademik FAST',
      email: 'fast@uhnsugriwa.ac.id'
    }
  },
  'kerja-praktek': {
    id: 'kerja-praktek',
    title: 'Kerja Praktek & Magang Industri (PKL)',
    categoryName: 'Akademik',
    subtitle: 'Menjembatani teori akademik dengan realitas tantangan industri teknologi dan industri kreatif.',
    summary: 'Program Kerja Praktek (PKL) mewajibkan mahasiswa menempuh magang selama 2-6 bulan di perusahaan teknologi, kantor pemerintahan bidang komunikasi informatika, perbankan, agensi desain, atau laboratorium riset terakreditasi.',
    keyPoints: [
      {
        heading: 'Mitra Kerja Sama Industri',
        points: [
          'Dinas Komunikasi, Informatika, dan Statistik (Diskominfos) Provinsi Bali & Kabupaten/Kota.',
          'Agensi Desain & Studio Kreatif di Denpasar, Badung, dan Jakarta.',
          'Start-up teknologi rintisan, software houses, dan penyedia infrastruktur cloud.',
          'Organisasi nirlaba dan museum budaya untuk proyek dokumentasi digital.'
        ]
      },
      {
        heading: 'Alur & Persyaratan PKL',
        points: [
          'Telah menyelesaikan minimal 100 SKS dengan IPK sekurang-kurangnya 2.75.',
          'Pengajuan proposal kerja praktek disetujui oleh Koordinator Program Studi.',
          'Penyusunan laporan akhir dan presentasi seminar di hadapan dosen pembimbing dan mentor industri.'
        ]
      }
    ],
    actionLink: {
      label: 'Unduh Panduan PKL & Format Proposal',
      url: '#',
      isExternal: false
    },
    contactPerson: {
      role: 'Koordinator PKL & Hubungan Industri',
      name: 'Tim Magang Mahasiswa FAST',
      email: 'fast@uhnsugriwa.ac.id'
    }
  },
  'kkn': {
    id: 'kkn',
    title: 'Kuliah Kerja Nyata (KKN) Tematik Digital',
    categoryName: 'Akademik',
    subtitle: 'Pengabdian kolaboratif mahasiswa di pedesaan dengan sentuhan transformasi teknologi tepat guna.',
    summary: 'KKN merupakan program wajib universitas yang dijalankan oleh mahasiswa lintas program studi. Di Fakultas Sains dan Teknologi, mahasiswa membawa program kerja tematik digitalisasi, pembuatan profil desa berbasis web, edukasi literasi media, dan optimalisasi inventarisasi desa adat.',
    keyPoints: [
      {
        heading: 'Fokus KKN FAST UHN Sugriwa',
        points: [
          'Pengembangan Website & Sistem Informasi Desa / Kelurahan di wilayah Bali.',
          'Pelatihan pemanfaatan canva dan media sosial untuk kelompok wanita tani (KWT) dan UMKM desa.',
          'Perancangan peta digital potensi pariwisata spiritual dan budaya lokal desa adat.'
        ]
      }
    ],
    actionLink: {
      label: 'Panduan KKN LP2M UHN Sugriwa',
      url: '#',
      isExternal: false
    },
    contactPerson: {
      role: 'Lembaga Penelitian & Pengabdian (LP2M)',
      name: 'Pusat KKN UHN IGB Sugriwa',
      email: 'fast@uhnsugriwa.ac.id'
    }
  },
  'tugas-akhir': {
    id: 'tugas-akhir',
    title: 'Tugas Akhir & Skripsi Sarjana (S.Kom / S.Ds / S.S.I)',
    categoryName: 'Akademik',
    subtitle: 'Mahakarya riset orisinal sebagai puncak pencapaian akademik mahasiswa jenjang sarjana.',
    summary: 'Tugas Akhir merupakan karya ilmiah mandiri berupa riset eksperimental, perancangan prototipe perangkat lunak, karya visual desain terpadu, atau analisis arsitektur informasi yang dibimbing oleh dua dosen pembimbing berkompeten.',
    keyPoints: [
      {
        heading: 'Tahapan Tugas Akhir',
        points: [
          'Tahap 1: Pengajuan dan persetujuan Topik / Judul Skripsi.',
          'Tahap 2: Bimbingan intensif dan Seminar Proposal (Sempro).',
          'Tahap 3: Implementasi, pengujian sistem, dan Seminar Hasil (Semhas).',
          'Tahap 4: Sidang Ujian Komprehensif Skripsi dan revisi kelulusan.'
        ]
      }
    ],
    actionLink: {
      label: 'Unduh Template Skripsi & Jadwal Sidang',
      url: '#',
      isExternal: false
    },
    contactPerson: {
      role: 'Ketua Panitia Tugas Akhir FAST',
      name: 'Sekretariat Ujian Skripsi FAST',
      email: 'fast@uhnsugriwa.ac.id'
    }
  },
  'prospek-karir': {
    id: 'prospek-karir',
    title: 'Prospek Karir & Peluang Lulusan FAST',
    categoryName: 'Belajar Bersama Kami',
    subtitle: 'Menyiapkan talenta digital adaptif, inovatif, dan siap bersaing di era revolusi industri 5.0.',
    summary: 'Kebutuhan nasional dan global terhadap tenaga ahli teknologi dan desain grafis terus meningkat eksponensial. Lulusan Fakultas Sains dan Teknologi UHN IGB Sugriwa memiliki kombinasi langka antara kecakapan teknis komputasi terkini dan pemahaman mendalam etika kebudayaan.',
    keyPoints: [
      {
        heading: 'Pilihan Karir Lulusan per Prodi',
        points: [
          'Lulusan Informatika: Full-stack Developer, Mobile App Engineer, AI Specialist, Cloud Infrastructure Engineer, Cyber Security Consultant.',
          'Lulusan DKV: Creative Director, UI/UX Designer, Motion Graphic Artist, Brand Identity Designer, Illustrator, Video Editor.',
          'Lulusan Sains Informasi: Data Scientist, Business Intelligence Analyst, Information Architect, Digital Archivist, Knowledge Management Officer.'
        ]
      }
    ],
    actionLink: {
      label: 'Kunjungi Tracer Study & Pusat Karir UHN',
      url: '#',
      isExternal: false
    },
    contactPerson: {
      role: 'Pusat Karir & Hubungan Alumni FAST',
      name: 'Biro Pengembangan Karir UHN Sugriwa',
      email: 'fast@uhnsugriwa.ac.id'
    }
  },
  'kehidupan-kampus': {
    id: 'kehidupan-kampus',
    title: 'Kehidupan Kampus Harmonis & Beretika',
    categoryName: 'Belajar Bersama Kami',
    subtitle: 'Suasana akademik kondusif di Pulau Dewata yang memadukan modernitas saintifik dan spiritualitas damai.',
    summary: 'Belajar di Fakultas Sains dan Teknologi UHN IGB Sugriwa memberikan pengalaman unik: lingkungan yang asri, perayaan kebersamaan hari suci Saraswati sebagai dewi ilmu pengetahuan, komunitas mahasiswa yang inklusif, dan interaksi hangat antara dosen dan mahasiswa.',
    keyPoints: [
      {
        heading: 'Nilai-Nilai Pembentuk Karakter',
        points: [
          'Integritas & Etika Akademik: Menjunjung tinggi kebenaran ilmiah, objektivitas, dan etika profesional dalam inovasi teknologi.',
          'Vasudhaiva Kutumbakam: Pandangan dunia bahwa seluruh umat manusia adalah satu keluarga besar dalam keberagaman.',
          'Semangat Kolaboratif: Budaya gotong royong (Ngrombo/Menyama Braya) dalam menyelesaikan proyek riset bersama.'
        ]
      }
    ],
    actionLink: {
      label: 'Jelajahi Agenda Kegiatan Kampus',
      url: '#',
      isExternal: false
    },
    contactPerson: {
      role: 'Biro Humas & Protokoler Kampus',
      name: 'Sekretariat Mahasiswa FAST',
      email: 'fast@uhnsugriwa.ac.id'
    }
  },
  'kegiatan-dosen': {
    id: 'kegiatan-dosen',
    title: 'Aktivitas Tridharma & Kiprah Dosen FAST',
    categoryName: 'Belajar Bersama Kami',
    subtitle: 'Dosen tidak sekadar mengajar di kelas, tetapi juga menjadi peneliti aktif, pembicara seminar, dan konsultan industri.',
    summary: 'Para dosen FAST secara teratur terlibat dalam forum ilmiah nasional dan internasional, memenangkan hibah penelitian bereputasi, menyelenggarakan workshop pengembangan kurikulum AI, serta menulis buku ajar referensi perguruan tinggi.',
    keyPoints: [
      {
        heading: 'Agenda Unggulan Dosen',
        points: [
          'Seminar Nasional & Internasional tahunan di bidang komputasi dan media visual.',
          'Uji kompetensi asesor Badan Nasional Sertifikasi Profesi (BNSP) bidang TI.',
          'Pembimbingan intensif mahasiswa dalam Program Kreativitas Mahasiswa (PKM) dan lomba Gemastik.'
        ]
      }
    ],
    actionLink: {
      label: 'Lihat Catatan Kinerja & Karya Dosen',
      url: '#',
      isExternal: false
    },
    contactPerson: {
      role: 'Staf Ahli Dekan FAST',
      name: 'Bagian Penjaminan Mutu FAST',
      email: 'fast@uhnsugriwa.ac.id'
    }
  },
  'kegiatan-mahasiswa': {
    id: 'kegiatan-mahasiswa',
    title: 'Kegiatan Mahasiswa & Organisasi HIMA FAST',
    categoryName: 'Belajar Bersama Kami',
    subtitle: 'Wadah dinamis mengasah kepemimpinan, kreativitas, kompetisi sains, dan jaringan persahabatan.',
    summary: 'Mahasiswa FAST bernaung dalam Badan Eksekutif Mahasiswa (BEM) FAST dan Himpunan Mahasiswa Program Studi (HIMA Informatika, HIMA DKV, dan HIMA Sains Informasi). Berbagai program kerja mulai dari Fast Tech Fair, Pameran Seni Visual, Hackathon, hingga bakti sosial digelar sepanjang tahun.',
    keyPoints: [
      {
        heading: 'Klub & Unit Kegiatan Mahasiswa',
        points: [
          'FAST Coding & Competitive Programming Club.',
          'Studio Kreatif & Animasi FAST (DKV Circle).',
          'Komunitas Data Science & Artificial Intelligence Sugriwa.',
          'FAST E-Sport & Game Development Society.'
        ]
      }
    ],
    actionLink: {
      label: 'Kunjungi Instagram @fastsugriwa',
      url: 'https://www.instagram.com/fastsugriwa/',
      isExternal: true
    },
    contactPerson: {
      role: 'Ketua Himpunan Mahasiswa FAST',
      name: 'Pengurus HIMA FAST UHN Sugriwa',
      email: 'fast@uhnsugriwa.ac.id'
    }
  },
  'fasilitas-pembelajaran': {
    id: 'fasilitas-pembelajaran',
    title: 'Fasilitas & Sarana Pembelajaran Canggih',
    categoryName: 'Belajar Bersama Kami',
    subtitle: 'Infrastruktur modern yang menunjang eksplorasi tanpa batas bagi mahasiswa dan peneliti.',
    summary: 'Fakultas Sains dan Teknologi dilengkapi dengan ruang kuliah ber-AC, proyektor interaktif, laboratorium komputer berspesifikasi tinggi untuk deep learning dan rendering 3D, studio fotografi & videografi, serta perpustakaan digital dengan akses jutaan jurnal internasional.',
    keyPoints: [
      {
        heading: 'Daftar Fasilitas Utama',
        points: [
          'Laboratorium Rekayasa Perangkat Lunak & Kecerdasan Buatan (Workstation GPU NVIDIA).',
          'Studio Desain Komunikasi Visual & Multimedia (Pen Tablet Display, Studio Lighting, Audio Booth).',
          'Laboratorium Sains Data & Jaringan Komputer (Cisco Network Racks, Server Virtualization).',
          'Perpustakaan Universitas Terintegrasi RFID & Ruang Diskusi Kolaboratif Co-Working Space.',
          'Koneksi Internet Kampus Dedicated 1 Gbps & Wi-Fi Eduroam di seluruh area gedung.'
        ]
      }
    ],
    actionLink: {
      label: 'Lihat Jadwal Pemakaian Laboratorium',
      url: '#',
      isExternal: false
    },
    contactPerson: {
      role: 'Kepala Laboratorium Terpadu FAST',
      name: 'Subbagian Sarana & Prasarana FAST',
      email: 'fast@uhnsugriwa.ac.id'
    }
  }
};
