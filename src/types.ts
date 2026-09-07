export interface NavDropdownItem {
  id: string;
  title: string;
  description: string;
  category: 'beasiswa' | 'riset' | 'akademik' | 'belajar';
  badge?: string;
  href?: string;
  external?: boolean;
}

export interface NavMenu {
  title: string;
  slug: string;
  items: NavDropdownItem[];
}

export interface InstagramPost {
  id: string;
  caption: string;
  shortSnippet: string;
  date: string;
  category: 'Akademik' | 'Beasiswa' | 'Prestasi' | 'Workshop' | 'Riset';
  likesCount: number;
  commentsCount: number;
  tags: string[];
  postUrl: string;
  mediaType?: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  mediaUrl?: string;
  permalink?: string;
  timestamp?: string;
  source?: 'api' | 'cache' | 'official_feed';
  isPinned?: boolean;
}

export interface DetailContent {
  id: string;
  title: string;
  categoryName: string;
  subtitle: string;
  summary: string;
  keyPoints: {
    heading: string;
    points: string[];
  }[];
  requirements?: string[];
  actionLink?: {
    label: string;
    url: string;
    isExternal?: boolean;
  };
  contactPerson?: {
    role: string;
    name: string;
    email: string;
  };
}

export interface CareerProspect {
  title: string;
  role: string;
  description: string;
  skills: string[];
  demand: string;
  iconName: string;
}

export interface CurriculumBlock {
  semester: string;
  credits: number;
  description: string;
  sampleCourses: string[];
}

export interface CourseItem {
  no: number;
  kode: string;
  nama: string;
  sks: number;
  semester: string;
  keterangan?: string;
}

export interface SemesterCurriculum {
  semesterNumber: number;
  semesterRoman: string;
  title: string;
  totalSks: number;
  mbkmScheme: string;
  description: string;
  courses: CourseItem[];
}

export interface MbkmExternalOption {
  no: number;
  menempuhMk: string;
  bobotSks: number;
  keterangan: string;
}

export interface MbkmActivity {
  no: number;
  bentukKegiatan: string;
  sksReguler: string;
  sksMbkm: string;
  keterangan: string;
}
