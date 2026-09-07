import { CareerProspect, CurriculumBlock } from '../types';

export const SAINS_INFORMASI_DETAILS = {
  name: 'Program Studi Sarjana (S1) Sains Informasi',
  faculty: 'Fakultas Sains dan Teknologi',
  university: 'Universitas Hindu Negeri I Gusti Bagus Sugriwa Denpasar',
  degree: 'Sarjana Sains Informasi (S.S.I.)',
  duration: '8 Semester (4 Tahun) / 147 SKS',
  accreditation: 'Terakreditasi Baik Sekali oleh LAM INFOKOM / BAN-PT',
  summary: 'Program Studi S1 Sains Informasi memadukan ilmu komputasi, analitika data besar (Big Data), manajemen pengetahuan (Knowledge Management), dan preservasi informasi kebudayaan. Program ini dirancang untuk menjawab ledakan informasi global dengan melahirkan sarjana yang cakap mengorganisasi, menganalisis, dan mentransformasikan data menjadi wawasan strategis pengambil keputusan.',
  
  vision: 'Menjadi Program Studi Sains Informasi yang unggul, inovatif, dan berdaya saing global dalam pengelolaan data dan pengetahuan berbasis kearifan lokal Hindu pada tahun 2035.',
  
  mission: [
    'Menyelenggarakan pendidikan tinggi berkualitas dalam bidang sains data, arsitektur informasi, dan manajemen pengetahuan berstandar internasional.',
    'Melaksanakan penelitian mutakhir yang berfokus pada kecerdasan data, analisis semantik informasi, dan preservasi digital naskah warisan budaya Nusantara.',
    'Mendarmabaktikan kepakaran sains informasi bagi pemberdayaan masyarakat, digitalisasi desa adat, dan efisiensi tata kelola institusi publik maupun swasta.',
    'Membangun jejaring kolaborasi nasional dan global dengan industri teknologi informasi, lembaga riset data, dan pusat dokumentasi kebudayaan.'
  ],

  objectives: [
    'Menghasilkan sarjana sains informasi yang memiliki keahlian analitis tinggi dalam mengolah dan memvisualisasikan data terstruktur maupun tidak terstruktur.',
    'Mencetak profesional yang berintegritas dan memegang teguh etika privasi data serta nilai Tri Kaya Parisudha.',
    'Menumbuhkan jiwa kewirausahaan berbasis data (data-driven entrepreneurship) yang adaptif terhadap disrupsi teknologi cerdas.',
    'Mendorong lahirnya publikasi ilmiah dan hak kekayaan intelektual (HKI) berbasis inovasi sains informasi.'
  ],

  careerProspects: [
    {
      title: 'Data Scientist & Analytics Specialist',
      role: 'Sains Data Terapan',
      description: 'Menganalisis himpunan data kompleks, merancang model machine learning, dan menghasilkan insight prediktif guna pengambilan keputusan strategis instansi atau korporasi.',
      skills: ['Python / R', 'Statistical Modeling', 'Predictive Analytics', 'Machine Learning'],
      demand: 'Permintaan Sangat Tinggi',
      iconName: 'Database'
    },
    {
      title: 'Information & Metadata Architect',
      role: 'Arsitektur Informasi',
      description: 'Merancang taksonomi informasi, skema metadata, serta struktur repositori digital agar data dapat diakses, diklasifikasi, dan ditemukan kembali dengan cepat dan presisi.',
      skills: ['Metadata Schemas (Dublin Core, MODS)', 'Ontology Engineering', 'Knowledge Graph', 'Information Retrieval'],
      demand: 'Keahlian Kunci',
      iconName: 'Network'
    },
    {
      title: 'Knowledge Management Officer',
      role: 'Manajemen Pengetahuan',
      description: 'Mengelola siklus hidup pengetahuan organisasi, memfasilitasi transfer aset intelektual, dan mengimplementasikan sistem repository pengetahuan enterprise.',
      skills: ['Knowledge Audit', 'Enterprise Knowledge Base', 'Organizational Learning', 'Content Strategy'],
      demand: 'Permintaan Tinggi',
      iconName: 'BookOpen'
    },
    {
      title: 'Digital Cultural Heritage Specialist',
      role: 'Preservasi Budaya Digital',
      description: 'Mendokumentasikan, mendigitasi, mengindeks manuskrip kuno (seperti lontar Bali) dan artefak budaya menggunakan teknologi semantik dan preservasi digital modern.',
      skills: ['Digital Preservation', 'Manuscript Digitization', 'Semantic Web', 'Cultural Informatics'],
      demand: 'Keunggulan Unik',
      iconName: 'Layers'
    },
    {
      title: 'Business Intelligence & Data Analyst',
      role: 'Intelijensi Bisnis',
      description: 'Mengubah data operasional menjadi dashboard analitik interaktif, memantau indikator kinerja utama (KPI), serta menyusun rekomendasi bisnis berbasis bukti (evidence-based).',
      skills: ['Power BI / Tableau', 'SQL Advanced', 'Data Warehousing', 'KPI Dashboards'],
      demand: 'Permintaan Sangat Tinggi',
      iconName: 'TrendingUp'
    },
    {
      title: 'Data Governance & Privacy Analyst',
      role: 'Tata Kelola Data',
      description: 'Menjamin kepatuhan standar regulasi perlindungan data pribadi (UU PDP), menetapkan protokol etika data, dan mengawal keamanan siklus data organisasi.',
      skills: ['Data Privacy Law', 'Data Governance Frameworks', 'Risk Assessment', 'Ethical AI'],
      demand: 'Kebutuhan Strategis',
      iconName: 'ShieldCheck'
    }
  ] as CareerProspect[],

  curriculumRationale: 'Sebaran mata kuliah pada prodi penting untuk dilaksanakan atas beberapa pandangan sebagai berikut: Pertama, transparansi dan Informasi Penjelasan sebaran mata kuliah memberikan informasi yang transparan kepada mahasiswa tentang struktur program studi mereka. Ini membantu mahasiswa untuk memahami bagaimana mata kuliah tertentu berhubungan satu sama lain dan bagaimana mata kuliah tersebut membantu mencapai tujuan pendidikan mereka. Selanjutnya, dengan mengetahui sebaran mata kuliah, mahasiswa dapat merencanakan program studi mereka dengan lebih baik. Mereka dapat mengidentifikasi mata kuliah yang harus diambil pada semester tertentu, menghindari tumpang tindih jadwal, dan memastikan bahwa mereka memenuhi prasyarat yang diperlukan untuk mata kuliah tertentu. Sebaran mata kuliah juga memungkinkan mahasiswa dapat membuat pilihan mata kuliah yang lebih cerdas berdasarkan minat dan tujuan mereka. Mereka dapat melihat mata kuliah pilihan yang tersedia dalam program studi dan memilih yang sesuai dengan minat mereka.',

  totalSks: 147,

  curriculumSemesters: [
    {
      semesterNumber: 1,
      semesterRoman: 'I',
      title: 'Semester 1 - Fondasi Sains Informasi & Nilai Kebangsaan',
      totalSks: 21,
      mbkmScheme: 'MKPN, MKPU MK-Prodi di dlm Prodi',
      description: 'Mata kuliah dasar umum nasional, kebahasaan, etika agama, serta pengantar ilmu dan teknologi informasi.',
      courses: [
        { no: 1, kode: 'MKWN01', nama: 'Pendidikan Agama', sks: 2, semester: 'I' },
        { no: 2, kode: 'MKWN02', nama: 'Pendidikan Pancasila', sks: 2, semester: 'I' },
        { no: 3, kode: 'MKWN03', nama: 'Bahasa Indonesia', sks: 2, semester: 'I' },
        { no: 4, kode: 'MKWN04', nama: 'Kewarganegaraan', sks: 2, semester: 'I' },
        { no: 5, kode: 'MKWU01', nama: 'Bahasa Bali', sks: 2, semester: 'I' },
        { no: 6, kode: 'PSI101', nama: 'Pengantar Ilmu Informasi', sks: 2, semester: 'I' },
        { no: 7, kode: 'PSI102', nama: 'Pengantar Teknologi Informasi', sks: 2, semester: 'I' },
        { no: 8, kode: 'PSI103', nama: 'Representasi Informasi', sks: 3, semester: 'I' },
        { no: 9, kode: 'PSI104', nama: 'Pengantar Ilmu Komunikasi', sks: 2, semester: 'I' },
        { no: 10, kode: 'PSI105', nama: 'Teori Komunikasi', sks: 2, semester: 'I' }
      ]
    },
    {
      semesterNumber: 2,
      semesterRoman: 'II',
      title: 'Semester 2 - Komputasi, Basis Data & Manajemen Pengetahuan',
      totalSks: 21,
      mbkmScheme: 'MKPN, MKPU MK-Prodi di dlm Prodi',
      description: 'Penguasaan pemrograman fundamental, struktur basis data, analisis pengetahuan, dan komunikasi interpersonal.',
      courses: [
        { no: 11, kode: 'PSI201', nama: 'Pengantar Bisnis', sks: 2, semester: 'II' },
        { no: 12, kode: 'PS1202', nama: 'Komunikasi antar pribadi', sks: 3, semester: 'II' },
        { no: 13, kode: 'PS1203', nama: 'Algoritma dan Pemrograman', sks: 3, semester: 'II' },
        { no: 14, kode: 'PS1204', nama: 'Basis Data', sks: 3, semester: 'II' },
        { no: 15, kode: 'MKWU04', nama: 'Bahasa Inggris', sks: 2, semester: 'II' },
        { no: 16, kode: 'PS1205', nama: 'Analisis dan Manajemen Pengetahuan', sks: 3, semester: 'II' },
        { no: 17, kode: 'PS1206', nama: 'Manajemen Komunikasi', sks: 3, semester: 'II' },
        { no: 18, kode: 'MKWU02', nama: 'Moderasi Beragama', sks: 2, semester: 'II' }
      ]
    },
    {
      semesterNumber: 3,
      semesterRoman: 'III',
      title: 'Semester 3 - Analitika Data, Riset Kuantitatif & Visualisasi',
      totalSks: 21,
      mbkmScheme: 'MKPN, MKPU MK-Prodi di dlm Prodi',
      description: 'Pengembangan kemampuan manajemen proyek data, metode riset kuantitatif, statistik, dan visualisasi informasi interaktif.',
      courses: [
        { no: 19, kode: 'PS1301', nama: 'Layanan Data dan Informasi', sks: 3, semester: 'III' },
        { no: 20, kode: 'PS1302', nama: 'Project Management', sks: 3, semester: 'III' },
        { no: 21, kode: 'PS1303', nama: 'Metode Penelitian Kuantitatif', sks: 3, semester: 'III' },
        { no: 22, kode: 'PS1304', nama: 'Visualisasi Informasi', sks: 3, semester: 'III' },
        { no: 23, kode: 'PS1305', nama: 'Komunikasi Massa', sks: 3, semester: 'III' },
        { no: 24, kode: 'PS1306', nama: 'Komunikasi Organisasi', sks: 3, semester: 'III' },
        { no: 25, kode: 'PS1307', nama: 'Statistika', sks: 3, semester: 'III' }
      ]
    },
    {
      semesterNumber: 4,
      semesterRoman: 'IV',
      title: 'Semester 4 - Data Mining, Metadata & Arsitektur Informasi',
      totalSks: 20,
      mbkmScheme: 'MKPU MK-Prodi di dlm Prodi',
      description: 'Penambangan data tingkat lanjut, standar metadata, desain sistem informasi, dan strategi media digital terkini.',
      courses: [
        { no: 26, kode: 'PSI401', nama: 'Data Mining', sks: 3, semester: 'IV' },
        { no: 27, kode: 'PS1402', nama: 'Metadata', sks: 3, semester: 'IV' },
        { no: 28, kode: 'PS1403', nama: 'Metode Penelitian Kualitatif', sks: 3, semester: 'IV' },
        { no: 29, kode: 'PS1404', nama: 'Komunikasi Digital/New Media', sks: 3, semester: 'IV' },
        { no: 30, kode: 'PS1405', nama: 'Analisis dan Desain', sks: 3, semester: 'IV' },
        { no: 31, kode: 'PS1406', nama: 'Strategi Pengembangan Pesan Informasi', sks: 2, semester: 'IV' },
        { no: 32, kode: 'PS1407', nama: 'Arsitektur Informasi', sks: 3, semester: 'IV' }
      ]
    },
    {
      semesterNumber: 5,
      semesterRoman: 'V',
      title: 'Semester 5 - AI/Machine Learning, Inovasi & Jalur MBKM',
      totalSks: 21,
      mbkmScheme: 'MKPU diluar Prodi di dalam PT',
      description: 'Integrasi kecerdasan buatan, techno-sociopreneurship, dan implementasi program MBKM lintas program studi di dalam kampus.',
      courses: [
        { no: 33, kode: 'PS1501', nama: 'Machine Learning and AI', sks: 3, semester: 'V' },
        { no: 34, kode: 'PS1502', nama: 'Manajemen Inovasi dan Perencanaan Informasi', sks: 3, semester: 'V' },
        { no: 35, kode: 'PS1503', nama: 'Techno Socio Preneurship', sks: 3, semester: 'V' },
        { no: 36, kode: 'PS1504', nama: 'Keamanan Informasi', sks: 3, semester: 'V', keterangan: 'MBKM PRODI BEDA, KAMPUS SAMA' },
        { no: 37, kode: 'PS1505', nama: 'Komunikasi Bisnis', sks: 3, semester: 'V', keterangan: 'MBKM PRODI BEDA, KAMPUS SAMA' },
        { no: 38, kode: 'PS1506', nama: 'Lobi dan Negosiasi', sks: 3, semester: 'V', keterangan: 'MBKM PRODI BEDA, KAMPUS SAMA' },
        { no: 39, kode: 'MKWU03', nama: 'Bahasa Sanskerta', sks: 3, semester: 'V' }
      ]
    },
    {
      semesterNumber: 6,
      semesterRoman: 'VI',
      title: 'Semester 6 - HCI, ERP, CRM & MBKM Lintas Perguruan Tinggi',
      totalSks: 21,
      mbkmScheme: 'MK-Prodi di luar prodi di luar PT',
      description: 'Interaksi manusia-komputer, kepemimpinan digital, sistem enterprise, dan pertukaran mahasiswa antar-kampus sejenis.',
      courses: [
        { no: 40, kode: 'PS1601', nama: 'Human-Computer Interaction', sks: 3, semester: 'VI' },
        { no: 41, kode: 'PS1602', nama: 'Leadership', sks: 3, semester: 'VI' },
        { no: 42, kode: 'PS1603', nama: 'Enterprise Resource Planning', sks: 3, semester: 'VI', keterangan: 'MBKM PRODI SAMA, KAMPUS BEDA' },
        { no: 43, kode: 'PS1604', nama: 'Manajemen Hubungan Pelanggan', sks: 3, semester: 'VI', keterangan: 'MBKM PRODI SAMA, KAMPUS BEDA' },
        { no: 44, kode: 'PS1605', nama: 'Perilaku Sosial Pengguna Informasi (Social Behaviour and Data User)', sks: 3, semester: 'VI', keterangan: 'MBKM PRODI SAMA, KAMPUS BEDA' },
        { no: 45, kode: 'PS1606', nama: 'Digital Marketing Data dan Informasi', sks: 3, semester: 'VI' },
        { no: 46, kode: 'PS1607', nama: 'Human and Public Relation', sks: 3, semester: 'VI' }
      ]
    },
    {
      semesterNumber: 7,
      semesterRoman: 'VII',
      title: 'Semester 7 - PKL / Magang Industri, KKN & Riset Lanjutan',
      totalSks: 16,
      mbkmScheme: 'Kegiatan belajar diluar kampus / Magang',
      description: 'Penerjunan langsung di dunia kerja industri dan pengabdian masyarakat terintegrasi seminar usulan riset kelulusan.',
      courses: [
        { no: 47, kode: 'PS1701', nama: 'Praktek Kerja Lapangan (PKL)', sks: 4, semester: 'VII', keterangan: 'MBKM BEDA PRODI BEDA KAMPUS' },
        { no: 48, kode: 'PS1702', nama: 'KKN', sks: 4, semester: 'VII' },
        { no: 49, kode: 'PS1703', nama: 'Sistem Temu Balik Informasi', sks: 3, semester: 'VII' },
        { no: 50, kode: 'PS1704', nama: 'Kecerdasan Bisnis dan Marketing', sks: 3, semester: 'VII' },
        { no: 51, kode: 'PS1705', nama: 'Seminar Usulan Riset', sks: 2, semester: 'VII' }
      ]
    },
    {
      semesterNumber: 8,
      semesterRoman: 'VIII',
      title: 'Semester 8 - Penyusunan & Ujian Skripsi / Tugas Akhir',
      totalSks: 6,
      mbkmScheme: 'Skripsi TA',
      description: 'Penyelesaian karya ilmiah sarjana orisinil di bawah bimbingan intensif dosen ahli Sains Informasi FAST.',
      courses: [
        { no: 52, kode: 'PS1801', nama: 'Skripsi/Tugas Akhir', sks: 6, semester: 'VIII' }
      ]
    }
  ],

  mbkmExternalOptions: [
    {
      no: 1,
      menempuhMk: 'Di luar PRODI di dalam kampus',
      bobotSks: 20,
      keterangan: 'MK yg diambil memiliki total bobot sks yg sama, memiliki kesesuaian CPL dan Kompetensi tambahan yang gayut.'
    },
    {
      no: 2,
      menempuhMk: 'Di PRODI yg sama di luar Kampus',
      bobotSks: 20,
      keterangan: 'MK yg diambil memiliki total bobot sks yg sama, disarankan melalui MK yg disepakati oleh asosiasi/himpunan PRODI sejenis.'
    },
    {
      no: 3,
      menempuhMk: 'Magang di luar Universitas sesuai program penawaran',
      bobotSks: 20,
      keterangan: 'MK yg diambil memiliki total bobot sks yg sama, memiliki kesesuaian CPL dan Kompetensi tambahan yang gayut.'
    }
  ],

  mbkmActivities: [
    {
      no: 1,
      bentukKegiatan: 'KP / Magang',
      sksReguler: '<20',
      sksMbkm: '<20',
      keterangan: 'Kegiatan Magang MBKM dpt dikonversikan ke beberapa MK yg memiliki kesesuaian CPL dan waktu kegiatan belajar yg sesuai dg bobot sks MK tsb.'
    },
    {
      no: 2,
      bentukKegiatan: 'KKN / KKNT',
      sksReguler: '<20',
      sksMbkm: '<20',
      keterangan: 'Kegiatan KKNT MBKM yg merupakan perpanjangan KKN-Reguler dpt dikonversikan ke beberapa MK yg memiliki kesesuaian CPL dan waktu kegiatan belajar yg sesuai dg bobot sks MK tsb.'
    },
    {
      no: 3,
      bentukKegiatan: 'Wirausaha',
      sksReguler: '<20',
      sksMbkm: '<20',
      keterangan: 'Kegiatan Wirausaha MBKM dpt dikonversikan ke beberapa MK yg memiliki kesesuaian CPL dan waktu kegiatan belajar yg sesuai dg bobot sks MK tsb, termasuk MK Sains Informasi jika ada.'
    },
    {
      no: 4,
      bentukKegiatan: 'Asisten Mengajar di Satuan Pendidikan (AMSP)',
      sksReguler: '≤20',
      sksMbkm: '<20',
      keterangan: 'Kegiatan AMSP MBKM dpt dikonversikan ke beberapa MK yg memiliki kesesuaian CPL dan waktu kegiatan belajar yg sesuai dg bobot sks MK tsb.'
    },
    {
      no: 5,
      bentukKegiatan: 'Penelitian / Riset',
      sksReguler: '<20',
      sksMbkm: '<20',
      keterangan: 'Dapat dikonversikan ke beberapa MK yg memiliki kesesuaian CPL dan waktu kegiatan belajar yg sesuai dg bobot sks MK tsb.'
    },
    {
      no: 6,
      bentukKegiatan: 'Studi / Proyek Independen',
      sksReguler: '<20',
      sksMbkm: '<20',
      keterangan: 'Dapat dikonversikan ke beberapa MK yg memiliki kesesuaian CPL dan waktu kegiatan belajar yg sesuai dg bobot sks MK tsb.'
    },
    {
      no: 7,
      bentukKegiatan: 'Proyek Kemanusiaan',
      sksReguler: '<20',
      sksMbkm: '<20',
      keterangan: 'Dapat dikonversikan ke beberapa MK yg memiliki kesesuaian CPL dan waktu kegiatan belajar yg sesuai dg bobot sks MK tsb.'
    }
  ],

  curriculumBlocks: [
    {
      semester: 'Semester 1 - 2',
      credits: 42,
      description: 'Fondasi Logika, Komputasi, Bahasa & Teori Informasi.',
      sampleCourses: [
        'Pengantar Ilmu Informasi',
        'Representasi Informasi',
        'Algoritma dan Pemrograman',
        'Basis Data',
        'Analisis dan Manajemen Pengetahuan'
      ]
    },
    {
      semester: 'Semester 3 - 4',
      credits: 41,
      description: 'Metode Riset, Data Mining, Metadata & Arsitektur Informasi.',
      sampleCourses: [
        'Visualisasi Informasi & Layanan Data',
        'Metode Penelitian Kuantitatif & Kualitatif',
        'Data Mining',
        'Metadata',
        'Arsitektur Informasi'
      ]
    },
    {
      semester: 'Semester 5 - 6',
      credits: 42,
      description: 'Machine Learning/AI, Enterprise Systems & Implementasi MBKM.',
      sampleCourses: [
        'Machine Learning and AI',
        'Human-Computer Interaction',
        'Enterprise Resource Planning (ERP)',
        'Keamanan Informasi & CRM',
        'Techno Socio Preneurship'
      ]
    },
    {
      semester: 'Semester 7 - 8',
      credits: 22,
      description: 'Magang Industri (PKL), KKN, dan Skripsi / Tugas Akhir.',
      sampleCourses: [
        'Praktek Kerja Lapangan (PKL / Magang)',
        'Kuliah Kerja Nyata (KKN)',
        'Sistem Temu Balik Informasi',
        'Kecerdasan Bisnis dan Marketing',
        'Skripsi / Tugas Akhir (6 SKS)'
      ]
    }
  ] as CurriculumBlock[],

  specializations: [
    {
      title: 'Data Science & Intelligent Analytics',
      desc: 'Fokus pada pengolahan data volume tinggi, deep learning, visualisasi data interaktif, dan pemodelan prediktif untuk bisnis serta pemerintahan cerdas.'
    },
    {
      title: 'Knowledge Management & Enterprise Informatics',
      desc: 'Fokus pada tata kelola modal intelektual korporasi, sistem arsitektur informasi, arsitektur pencarian enterprise, dan kepatuhan privasi data.'
    },
    {
      title: 'Cultural Heritage Informatics & Digital Preservation',
      desc: 'Fokus unik keunggulan UHN Sugriwa pada preservasi digital naskah lontar kuno Bali, semantic web, ontologi kebudayaan Nusantara, dan museum digital.'
    }
  ],

  stats: [
    { label: 'Rasio Bimbingan Dosen', value: '1 : 15' },
    { label: 'Persentase Lulusan Bekerja < 6 Bulan', value: '94%' },
    { label: 'SKS Masa Studi Normal', value: '147 SKS' },
    { label: 'Peluang Beasiswa Penuh', value: 'DIPA & BIB' }
  ]
};
