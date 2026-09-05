import { CareerProspect, CurriculumBlock } from '../types';

export const SAINS_INFORMASI_DETAILS = {
  name: 'Program Studi Sarjana (S1) Sains Informasi',
  faculty: 'Fakultas Sains dan Teknologi',
  university: 'Universitas Hindu Negeri I Gusti Bagus Sugriwa Denpasar',
  degree: 'Sarjana Sains Informasi (S.S.I.)',
  duration: '8 Semester (4 Tahun) / 144 - 146 SKS',
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
      role: 'Ilmuwan & Analis Data',
      description: 'Menganalisis himpunan data skala besar (big data) dengan algoritma machine learning, statistik terapan, dan pemodelan prediktif untuk memecahkan persoalan bisnis dan kebijakan publik.',
      skills: ['Python / R', 'Machine Learning', 'Statistical Modeling', 'SQL & NoSQL', 'Data Storytelling'],
      demand: 'Sangat Tinggi (Peringkat teratas talenta global)',
      iconName: 'BarChart3'
    },
    {
      title: 'Information Architect',
      role: 'Arsitek Informasi Sistem',
      description: 'Merancang struktur taksonomi, ontologi, navigasi, dan hierarki metadata pada sistem informasi korporat, repositori digital, dan platform aplikasi agar pengguna dapat mengakses informasi secara intuitif.',
      skills: ['Ontology Modeling', 'Taxonomy & Metadata Schema', 'UX Information Architecture', 'Content Structuring'],
      demand: 'Tinggi di perusahaan teknologi & e-commerce',
      iconName: 'Network'
    },
    {
      title: 'Knowledge Management Officer (KMO)',
      role: 'Spesialis Manajemen Pengetahuan',
      description: 'Mengelola siklus penciptaan, penyimpanan, transfer, dan utilisasi pengetahuan tacit maupun eksplisit dalam organisasi korporasi, kementerian, atau institusi riset.',
      skills: ['Knowledge Audit', 'Enterprise Search Systems', 'KM Strategy', 'Collaborative Tools', 'Organizational Learning'],
      demand: 'Stabil & Dibutuhkan di BUMN & Korporasi Multinasional',
      iconName: 'Brain'
    },
    {
      title: 'Digital Asset & Cultural Heritage Archivist',
      role: 'Kurator Arsip & Data Warisan Budaya',
      description: 'Memimpin digitalisasi, pengindeksan semantik, dan kurasi data digital untuk naskah lontar kuno, manuskrip bersejarah, museum digital, dan galeri budaya.',
      skills: ['Digital Preservation Standard (OAIS)', 'Dublin Core Metadata', 'Semantic Web & RDF', 'Cultural Informatics'],
      demand: 'Sangat Relevan di Bali & Lembaga Warisan Dunia UNESCO',
      iconName: 'Library'
    },
    {
      title: 'Business Intelligence (BI) Developer',
      role: 'Pengembang Business Intelligence',
      description: 'Membangun pipeline ekstraksi data (ETL), data warehouse, dan dashboard interaktif eksekutif yang menyajikan indikator performa utama secara real-time.',
      skills: ['PowerBI / Tableau', 'ETL Pipelines', 'Data Warehousing', 'DAX & SQL', 'KPI Modeling'],
      demand: 'Sangat Tinggi di sektor perbankan & startup',
      iconName: 'TrendingUp'
    },
    {
      title: 'Database & Information Governance Specialist',
      role: 'Spesialis Tata Kelola & Keamanan Informasi',
      description: 'Menjamin kepatuhan perlindungan data pribadi (UU PDP), kepatuhan standar keamanan data (ISO 27001), serta validitas integritas data dalam institusi.',
      skills: ['Data Governance Framework', 'Data Quality Assessment', 'UU PDP & Privacy Law', 'Security Controls'],
      demand: 'Meningkat Pesat seiring regulasi perlindungan data',
      iconName: 'ShieldCheck'
    }
  ] as CareerProspect[],

  curriculumBlocks: [
    {
      semester: 'Semester 1 - 2',
      credits: 40,
      description: 'Fondasi Logika, Matematika Komputasi, dan Teori Informasi.',
      sampleCourses: [
        'Pengantar Sains Informasi',
        'Dasar Pemrograman Python',
        'Logika & Matematika Diskrit',
        'Statistika Terapan untuk Sains Data',
        'Etika dan Nilai Kearifan Lokal Hindu'
      ]
    },
    {
      semester: 'Semester 3 - 4',
      credits: 42,
      description: 'Struktur Data, Sistem Basis Data Relasional, dan Arsitektur Informasi.',
      sampleCourses: [
        'Sistem Manajemen Basis Data (RDBMS & NoSQL)',
        'Arsitektur Informasi & Metadata',
        'Rekayasa Pengetahuan (Knowledge Engineering)',
        'Analisis Data Eksploratif & Visualisasi',
        'Sistem Temu Kembali Informasi (Information Retrieval)'
      ]
    },
    {
      semester: 'Semester 5 - 6',
      credits: 42,
      description: 'Big Data Analytics, Machine Learning, dan Digital Heritage Informatics.',
      sampleCourses: [
        'Big Data Analytics & Cloud Infrastructure',
        'Machine Learning untuk Sains Informasi',
        'Informatika Warisan Budaya & Preservasi Digital',
        'Business Intelligence & Decision Support',
        'Metodologi Penelitian Sains Informasi'
      ]
    },
    {
      semester: 'Semester 7 - 8',
      credits: 20,
      description: 'Magang Industri (Kerja Praktek / PKL), KKN, dan Skripsi / Tugas Akhir.',
      sampleCourses: [
        'Kerja Praktek / Magang Industri Bersertifikat',
        'Kuliah Kerja Nyata (KKN) Tematik Digital',
        'Seminar Proposal Riset',
        'Skripsi / Tugas Akhir Sarjana Sains Informasi'
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
    { label: 'SKS Masa Studi Normal', value: '144 SKS' },
    { label: 'Peluang Beasiswa Penuh', value: 'DIPA & BIB' }
  ]
};
