export interface SchoolStats {
  students: number;
  teachers: number;
  staff: number;
  classes: number;
}

export interface SchoolProfile {
  id?: string;
  name: string;
  npsn: string;
  accreditation: string;
  logoUrl?: string;
  principalName: string;
  principalTitle: string;
  principalPhoto: string;
  principalGreeting: string;
  tagline: string;
  slogan: string;
  hashtag: string;
  address: string;
  village: string;
  district: string;
  regency: string;
  province: string;
  phone: string;
  email: string;
  whatsapp: string;
  stats: SchoolStats;
  vision: string;
  mission: string[];
  goals: string[];
  values: {
    letter: string;
    word: string;
    meaning: string;
  }[];
  socialMedia: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    whatsapp?: string;
  };
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  content: string;
  imageUrl: string;
  author: string;
  publishedAt: string;
  isFeatured?: boolean;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  date: string;
  category: string;
  content: string;
  status: 'Aktif' | 'Arsip';
  isPinned?: boolean;
  fileAttachment?: string;
}

export interface TeacherItem {
  id: string;
  name: string;
  nip: string;
  position: string;
  subject: string;
  imageUrl: string;
  education?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  studentName: string;
  level: 'Tingkat Kecamatan' | 'Tingkat Kabupaten' | 'Tingkat Provinsi' | 'Tingkat Nasional';
  category: 'Akademik' | 'Olahraga' | 'Seni' | 'Keagamaan' | 'Coding & AI';
  year: string;
  imageUrl: string;
  description?: string;
}

export interface ExtracurricularItem {
  id: string;
  name: string;
  category: string;
  schedule: string;
  instructor: string;
  description: string;
  imageUrl: string;
  achievements?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Pembelajaran' | 'Upacara' | 'Olahraga' | 'Pramuka' | 'Coding & AI' | 'Keagamaan' | 'Lomba' | 'Kegiatan Guru';
  imageUrl: string;
  date: string;
  description?: string;
}

export interface SPMBApplication {
  id?: string;
  registrationNumber: string;
  studentName: string;
  nik: string;
  pob: string;
  dob: string;
  gender: 'Laki-laki' | 'Perempuan';
  religion: string;
  parentName: string;
  parentPhone: string;
  address: string;
  previousSchool?: string;
  status: 'Menunggu Verifikasi' | 'Diterima' | 'Ditolak' | 'Berkas Kurang';
  createdAt: string;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  isRead?: boolean;
}

export interface StudentItem {
  id: string;
  nisn: string;
  name: string;
  gender: 'Laki-laki' | 'Perempuan';
  grade: 'Kelas 1' | 'Kelas 2' | 'Kelas 3' | 'Kelas 4' | 'Kelas 5' | 'Kelas 6';
  homeroomTeacher: string;
  extracurricular?: string;
  status: 'Aktif' | 'Alumni' | 'Pindah';
  birthPlaceDate?: string;
}

export interface ClassSchedule {
  day: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu';
  subjects: { time: string; subject: string; teacher: string }[];
}

export interface AcademicCalendarEvent {
  id: string;
  title: string;
  startDate: string;
  endDate?: string;
  category: 'Libur' | 'Ujian' | 'Kegiatan' | 'Semester';
  description?: string;
}

export interface FeedbackItem {
  id?: string;
  name: string;
  role: 'Siswa' | 'Orang Tua / Wali' | 'Alumni' | 'Masyarakat / Tamu' | 'Guru / Staf';
  rating: number;
  impression: string;
  message: string;
  createdAt: string;
  isApproved?: boolean;
}

