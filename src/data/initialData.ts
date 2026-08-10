import {
  SchoolProfile,
  NewsItem,
  AnnouncementItem,
  TeacherItem,
  AchievementItem,
  ExtracurricularItem,
  GalleryItem,
  AcademicCalendarEvent,
  ClassSchedule,
  SPMBApplication,
  ContactMessage,
  FeedbackItem,
  StudentItem
} from '../types';

export const initialSchoolProfile: SchoolProfile = {
  name: "SDN 004 Sebatik Tengah",
  npsn: "30401890",
  accreditation: "B",
  logoUrl: "https://i.ibb.co.com/Pvf7Mvwq/Logo-Sekolah.png",
  principalName: "Sittiara Razak, S.Pd.I.",
  principalTitle: "Kepala Sekolah SDN 004 Sebatik Tengah",
  principalPhoto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  principalGreeting: "Assalamu'alaikum Warahmatullahi Wabarakatuh, Selamat Sejahtera untuk kita semua. Selamat datang di Website Resmi SDN 004 Sebatik Tengah. Sebagai garda terdepan pendidikan di wilayah perbatasan NKRI, kami berkomitmen membentuk generasi cerdas berkarakter, berakhlak mulia, adaptif teknologi, dan berprestasi. Melalui semangat 'KEMENDIKDASMEN RAMAH', mari bersinergi mewujudkan pendidikan bermutu untuk semua anak bangsa.",
  tagline: "Mewujudkan Generasi Cerdas, Berkarakter, dan Berprestasi",
  slogan: "KEMENDIKDASMEN RAMAH – Responsif, Akuntabel, Melayani, Adaptif, Harmoni",
  hashtag: "#PENDIDIKANBERMUTUUNTUKSEMUA",
  address: "Desa Sungai Limau, Kecamatan Sebatik Tengah",
  village: "Desa Sungai Limau",
  district: "Kecamatan Sebatik Tengah",
  regency: "Kabupaten Nunukan",
  province: "Kalimantan Utara",
  phone: "+62 821-5432-1004",
  email: "sdn004sebatikten@gmail.com",
  whatsapp: "+62 821-5432-1004",
  stats: {
    students: 184,
    teachers: 14,
    staff: 4,
    classes: 6
  },
  vision: "Terwujudnya Peserta Didik yang Beriman, Budi Pekerti Luhur, Cerdas, Terampil, dan Berwawasan Lingkungan di Wilayah Perbatasan Negara.",
  mission: [
    "Menanamkan nilai-nilai keagamaan, toleransi, dan budi pekerti luhur dalam kehidupan sekolah.",
    "Menyelenggarakan pembelajaran berkualitas dengan Kurikulum Merdeka yang ramah anak dan adaptif.",
    "Mengembangkan potensi sains, olahraga, seni budaya, serta kecakapan digital & Coding/AI sejak dini.",
    "Membangun tata kelola sekolah yang RAMAH (Responsif, Akuntabel, Melayani, Adaptif, Harmoni).",
    "Memperkuat kerja sama harmonis antara sekolah, orang tua murid, dan masyarakat perbatasan Sebatik."
  ],
  goals: [
    "Mencapai standar kelulusan peserta didik berkarakter Profil Pelajar Pancasila 100%.",
    "Menciptakan budaya literasi dan digitalisasi pembelajaran berbasis teknologi modern.",
    "Meraih prestasi unggul dalam ajang O2SN, FLS2N, KSN, dan Kompetisi Robotik/Coding tingkat Kabupaten & Provinsi.",
    "Mewujudkan lingkungan sekolah yang bersih, hijau, sehat, dan ramah anak."
  ],
  values: [
    { letter: "R", word: "Responsif", meaning: "Cepat tanggap terhadap kebutuhan belajar siswa dan aspirasi orang tua." },
    { letter: "A", word: "Akuntabel", meaning: "Transparan dan jujur dalam mengelola administrasi serta pendidikan." },
    { letter: "M", word: "Melayani", meaning: "Memberikan pelayanan pendidikan sepenuh hati dengan senyum dan ramah." },
    { letter: "A", word: "Adaptif", meaning: "Siap berinovasi menyesuaikan diri dengan perkembangan era digital & AI." },
    { letter: "H", word: "Harmoni", meaning: "Menciptakan suasana kekeluargaan yang erat antar sesama warga sekolah." }
  ],
  socialMedia: {
    facebook: "https://facebook.com/sdn004sebatikten",
    instagram: "https://instagram.com/sdn004sebatiktengah",
    youtube: "https://youtube.com/@sdn004sebatiktengah",
    whatsapp: "https://wa.me/6282154321004"
  }
};

export const initialNews: NewsItem[] = [
  {
    id: "news-1",
    title: "SDN 004 Sebatik Tengah Luncurkan Program Coding & AI Kids Perbatasan",
    slug: "program-coding-ai-kids-perbatasan",
    category: "Teknologi & Edukasi",
    summary: "Terobosan inovatif pembelajaran era digital, melatih logika logika visual Scratch dan pengenalan AI untuk siswa kelas 4, 5, dan 6 di Desa Sungai Limau.",
    content: "Dalam upaya memperkecil kesenjangan digital di kawasan perbatasan Indonesia - Malaysia, SDN 004 Sebatik Tengah secara resmi meluncurkan ekstrakurikuler & pembelajaran Coding & AI Kids. Kegiatan ini dipandu langsung oleh tim guru terlatih dengan memanfaatkan perangkat komputasi sekolah. Para siswa belajar membuat game matematika, animasi edukatif, dan mengenal dasar pemanfaatan kecerdasan buatan secara aman dan produktif.",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80",
    author: "Tim Digital Humas",
    publishedAt: "2026-08-01",
    isFeatured: true
  },
  {
    id: "news-2",
    title: "Upacara Peringatan Hari Pendidikan di Perbatasan Sebatik Tengah Berlangsung Khidmat",
    slug: "upacara-peringatan-hari-pendidikan",
    category: "Kegiatan Sekolah",
    summary: "Seluruh majelis guru dan siswa-siswi mengenakan busana adat Nusantara melambangkan kebhinnekaan yang kokoh di batas negeri.",
    content: "Semangat cinta tanah air membumbung tinggi di lapangan upacara SDN 004 Sebatik Tengah. Kepala Sekolah Ibu Sittiara Razak, S.Pd.I. bertindak sebagai pembina upacara dan menyampaikan amanat mengenai pentingnya pendidikan bermutu untuk semua anak tanpa terkecuali, khususnya bagi anak-anak di serambi depan perbatasan negara.",
    imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80",
    author: "Tim Kesiswaan",
    publishedAt: "2026-07-28",
    isFeatured: false
  },
  {
    id: "news-3",
    title: "Gelar Karya Proyek Penguatan Profil Pelajar Pancasila (P5) Bertema Kearifan Lokal",
    slug: "gelar-karya-p5-kearifan-lokal",
    category: "Kurikulum Merdeka",
    summary: "Siswa-siswi menampilkan kerajinan anyaman bambu, tarian tradisional Tidung/Dayak, dan kuliner khas Nunukan hasil karya mandiri.",
    content: "Implementasi Kurikulum Merdeka di SDN 004 Sebatik Tengah diwujudkan melalui Pameran dan Gelar Karya P5. Para orang tua murid diundang menyaksikan langsung hasil kreativitas dan pemikiran inovatif para siswa.",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80",
    author: "Koordinator P5",
    publishedAt: "2026-07-15",
    isFeatured: false
  },
  {
    id: "news-4",
    title: "Siswa SDN 004 Sebatik Tengah Sabet Medali Emas O2SN Cabang Bulutangkis Tingkat Kecamatan",
    slug: "sabet-medali-emas-o2sn-bulutangkis",
    category: "Prestasi & Olahraga",
    summary: "Ananda Muhammad Rizky kelas 5 berhasil mengungguli rivalnya dalam laga final berdurasi 3 set yang sangat mendebarkan.",
    content: "Prestasi membanggakan kembali diraih siswa SDN 004 Sebatik Tengah dalam ajang Olimpiade Olahraga Siswa Nasional (O2SN) tingkat Kecamatan Sebatik Tengah. Muhammad Rizky dipastikan mewakili kecamatan ke tingkat Kabupaten Nunukan.",
    imageUrl: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1000&q=80",
    author: "Pembina Olahraga",
    publishedAt: "2026-06-20",
    isFeatured: false
  }
];

export const initialAnnouncements: AnnouncementItem[] = [
  {
    id: "ann-1",
    title: "Pendaftaran Murid Baru (SPMB) Tahun Ajaran 2026/2027 Telah Dibuka",
    date: "2026-08-01",
    category: "SPMB",
    content: "SDN 004 Sebatik Tengah menerima pendaftaran calon peserta didik baru untuk Kelas I. Pendaftaran dapat dilakukan secara online melalui website ini atau datang langsung ke sekretariat panitia SPMB di Desa Sungai Limau. Bebas Biaya Pendaftaran!",
    status: "Aktif",
    isPinned: true
  },
  {
    id: "ann-2",
    title: "Jadwal Sosialisasi Asesmen Nasional Berbasis Komputer (ANBK) untuk Orang Tua Kelas 5",
    date: "2026-08-05",
    category: "Akademik",
    content: "Diimbau kepada seluruh Orang Tua/Wali Murid Kelas V untuk hadir dalam Pertemuan Sosialisasi ANBK & Simulasi Digital pada Sabtu, 15 Agustus 2026 Pukul 09.00 WITA di Ruang Serbaguna Sekolah.",
    status: "Aktif",
    isPinned: true
  },
  {
    id: "ann-3",
    title: "Pemeriksaan Kesehatan Berkala dan Pembagian Obat Cacing Gratis dari Puskesmas",
    date: "2026-07-20",
    category: "Kesehatan",
    content: "Tim Medis Puskesmas Sebatik Tengah akan melakukan penjaringan kesehatan gigi, mata, dan pembagian vitamin untuk siswa kelas 1 hingga 6 pada hari Kamis depan.",
    status: "Aktif",
    isPinned: false
  }
];

export const initialTeachers: TeacherItem[] = [
  {
    id: "t-1",
    name: "Sittiara Razak, S.Pd.I.",
    nip: "19780512 200501 2 008",
    position: "Kepala Sekolah",
    subject: "Manajemen Sekolah & Agama Islam",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    education: "S1 Pendidikan Agama Islam"
  },
  {
    id: "t-2",
    name: "Ahmad Kusuma, S.Pd.",
    nip: "19850315 201001 1 012",
    position: "Guru Kelas VI & Pembina Pramuka",
    subject: "Guru Kelas VI",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    education: "S1 PGSD Universitas Negeri"
  },
  {
    id: "t-3",
    name: "Nurhayati, S.Pd.",
    nip: "19900220 201502 2 005",
    position: "Guru Kelas I & Koordinator P5",
    subject: "Guru Kelas I",
    imageUrl: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=600&q=80",
    education: "S1 PGSD"
  },
  {
    id: "t-4",
    name: "Bambang Kurniawan, S.Pd.",
    nip: "19920711 201801 1 009",
    position: "Guru PJOK & Pembina Olahraga",
    subject: "Pendidikan Jasmani & Olahraga",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    education: "S1 Pendidikan Olahraga"
  },
  {
    id: "t-5",
    name: "Dwi Rahayu, S.Kom., S.Pd.",
    nip: "19941108 202001 2 018",
    position: "Guru Kelas IV & Instruktur Coding/AI",
    subject: "Guru Kelas IV & Informatika Dasar",
    imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
    education: "S1 Pendidikan Teknik Informatika"
  },
  {
    id: "t-6",
    name: "Siti Zubaidah, A.Md.",
    nip: "19950401 202201 2 022",
    position: "Tenaga Administrasi & Operator Sekolah",
    subject: "Administrasi & Data Dapodik",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    education: "D3 Manajemen Informatika"
  }
];

export const initialAchievements: AchievementItem[] = [
  {
    id: "ach-1",
    title: "Juara 1 Lomba Sains & Matematika Terpadu",
    studentName: "Raihan Ardiansyah (Kelas 5)",
    level: "Tingkat Kabupaten",
    category: "Akademik",
    year: "2026",
    imageUrl: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80",
    description: "Meraih skor tertinggi dalam Olimpiade Sains & Matematika SD se-Kabupaten Nunukan."
  },
  {
    id: "ach-2",
    title: "Juara 1 Lomba Coding Visual Kids Perbatasan",
    studentName: "Tim Robotik Mini SDN 004",
    level: "Tingkat Provinsi",
    category: "Coding & AI",
    year: "2026",
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    description: "Menciptakan aplikasi simulasi kuis matematika berbasis Scratch Scratch karya siswa perbatasan."
  },
  {
    id: "ach-3",
    title: "Juara 1 O2SN Cabang Bulutangkis Putra",
    studentName: "Muhammad Rizky (Kelas 5)",
    level: "Tingkat Kecamatan",
    category: "Olahraga",
    year: "2026",
    imageUrl: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80",
    description: "Memenangkan medali emas tanpa kekalahan dalam kompetisi bulutangkis antar SD."
  },
  {
    id: "ach-4",
    title: "Juara 2 FLS2N Seni Tari Tradisional Khas Kaltara",
    studentName: "Tim Tari Sanggar Minung",
    level: "Tingkat Kabupaten",
    category: "Seni",
    year: "2025",
    imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
    description: "Menampilkan Tarian Khas Perbatasan dengan kostum etnik yang sangat memukau dewan juri."
  }
];

export const initialExtracurriculars: ExtracurricularItem[] = [
  {
    id: "ex-1",
    name: "Pramuka Penggalang & Siaga",
    category: "Kepramukaan",
    schedule: "Sabtu, 15.00 - 17.00 WITA",
    instructor: "Ahmad Kusuma, S.Pd.",
    description: "Ekskul wajib melatih kemandirian, kedisiplinan, pertolongan pertama, dan rasa cinta tanah air di garis perbatasan negara.",
    imageUrl: "https://images.unsplash.com/photo-1526976668912-1a811878dd37?auto=format&fit=crop&w=800&q=80",
    achievements: "Juara Umum Kemah Bakti Pramuka Kecamatan 2025"
  },
  {
    id: "ex-2",
    name: "Klub Coding & AI Kids",
    category: "Sains & Teknologi",
    schedule: "Rabu, 14.00 - 15.30 WITA",
    instructor: "Dwi Rahayu, S.Kom., S.Pd.",
    description: "Melatih cara berpikir logis, animasi visual Scratch, pemrograman gim sederhana, dan pemanfaatan AI dasar.",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    achievements: "Juara 1 Lomba Coding Perbatasan 2026"
  },
  {
    id: "ex-3",
    name: "Klub Olahraga (Bulutangkis & Futsal)",
    category: "Olahraga",
    schedule: "Selasa & Jumat, 15.30 - 17.00 WITA",
    instructor: "Bambang Kurniawan, S.Pd.",
    description: "Mengasah ketangkasan fisik, kerja sama tim, serta daya tahan atlet cilik SDN 004 Sebatik Tengah.",
    imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
    achievements: "Medali Emas O2SN Kecamatan 2026"
  },
  {
    id: "ex-4",
    name: "Seni Tari & Musik Tradisional",
    category: "Seni & Budaya",
    schedule: "Kamis, 14.30 - 16.00 WITA",
    instructor: "Nurhayati, S.Pd.",
    description: "Melestarikan seni budaya Nusantara dan kearifan lokal Tidung, Dayak, serta tarian kreasi anak.",
    imageUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80",
    achievements: "Juara 2 FLS2N Kabupaten 2025"
  }
];

export const initialGallery: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Pembelajaran Coding Visual Scratch di Lab Komputer",
    category: "Coding & AI",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80",
    date: "2026-08-01",
    description: "Antusiasme anak-anak kelas 5 belajar membikin game perkalian matematika."
  },
  {
    id: "gal-2",
    title: "Upacara Peringatan Hari Pendidikan di Halaman Sekolah",
    category: "Upacara",
    imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80",
    date: "2026-07-28",
    description: "Seluruh murid dan guru berfoto bersama mengenakan busana adat Nusantara."
  },
  {
    id: "gal-3",
    title: "Kegiatan Pramuka Latihan Sandi & Semaphore",
    category: "Pramuka",
    imageUrl: "https://images.unsplash.com/photo-1526976668912-1a811878dd37?auto=format&fit=crop&w=1000&q=80",
    date: "2026-07-20",
    description: "Kegiatan outdoor Pramuka penggalang di halaman hijau sekolah."
  },
  {
    id: "gal-4",
    title: "Latihan Bulutangkis Persiapan O2SN",
    category: "Olahraga",
    imageUrl: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1000&q=80",
    date: "2026-06-15",
    description: "Pembinaan fisik dan teknik bulutangkis di lapangan serbaguna."
  },
  {
    id: "gal-5",
    title: "Gelar Karya P5 Kuliner & Kerajinan Khas Kaltara",
    category: "Pembelajaran",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80",
    date: "2026-07-10",
    description: "Pameran proyek Kurikulum Merdeka yang dikunjungi orang tua murid."
  },
  {
    id: "gal-6",
    title: "Rapat Kerja dan Pembinaan GTK SDN 004 Sebatik Tengah",
    category: "Kegiatan Guru",
    imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80",
    date: "2026-07-02",
    description: "Majelis guru menyusun rencana modul ajar Kurikulum Merdeka."
  }
];

export const initialAcademicCalendar: AcademicCalendarEvent[] = [
  {
    id: "cal-1",
    title: "Hari Pertama Masuk Sekolah & MPLS Ramah Anak",
    startDate: "2026-07-13",
    endDate: "2026-07-17",
    category: "Kegiatan",
    description: "Masa Pengenalan Lingkungan Sekolah yang gembira dan menyenangkan."
  },
  {
    id: "cal-2",
    title: "Peringatan HUT Kemerdekaan RI Ke-81",
    startDate: "2026-08-17",
    category: "Kegiatan",
    description: "Upacara dan lomba tradisional antar kelas."
  },
  {
    id: "cal-3",
    title: "Simulasi & Gladi Bersih ANBK Kelas V",
    startDate: "2026-09-08",
    endDate: "2026-09-11",
    category: "Ujian",
    description: "Pelaksanaan simulasi tes berbasis komputer."
  },
  {
    id: "cal-4",
    title: "Asesmen Sumatif Tengah Semester (ASTS) Ganjil",
    startDate: "2026-09-21",
    endDate: "2026-09-26",
    category: "Ujian",
    description: "Evaluasi capaian pembelajaran siswa pertengahan semester."
  }
];

export const initialSchedules: Record<string, ClassSchedule[]> = {
  "Kelas 1": [
    {
      day: "Senin",
      subjects: [
        { time: "07.15 - 08.00", subject: "Upacara Bendera", teacher: "Seluruh Guru" },
        { time: "08.00 - 09.30", subject: "Pendidikan Agama & Budi Pekerti", teacher: "Sittiara Razak, S.Pd.I." },
        { time: "09.45 - 11.15", subject: "Pancasila & Bahasa Indonesia", teacher: "Nurhayati, S.Pd." }
      ]
    },
    {
      day: "Selasa",
      subjects: [
        { time: "07.30 - 09.00", subject: "Matematika Ceria", teacher: "Nurhayati, S.Pd." },
        { time: "09.15 - 10.45", subject: "Seni & Budaya", teacher: "Nurhayati, S.Pd." }
      ]
    }
  ],
  "Kelas 4": [
    {
      day: "Senin",
      subjects: [
        { time: "07.15 - 08.00", subject: "Upacara Bendera", teacher: "Seluruh Guru" },
        { time: "08.00 - 09.30", subject: "IPAS (Ilmu Pengetahuan Alam & Sosial)", teacher: "Dwi Rahayu, S.Kom., S.Pd." },
        { time: "09.45 - 11.45", subject: "Informatika / Coding Kids Dasar", teacher: "Dwi Rahayu, S.Kom., S.Pd." }
      ]
    }
  ]
};

export const initialSPMBApplications: SPMBApplication[] = [
  {
    id: "spmb-1",
    registrationNumber: "SPMB-2026-001",
    studentName: "Aditya Pratama",
    nik: "6503021203190001",
    pob: "Nunukan",
    dob: "2019-03-12",
    gender: "Laki-laki",
    religion: "Islam",
    parentName: "Budi Santoso",
    parentPhone: "081234567890",
    address: "Desa Sungai Limau RT 03, Sebatik Tengah",
    previousSchool: "TK Pembina Sebatik",
    status: "Diterima",
    createdAt: "2026-08-02 09:30"
  },
  {
    id: "spmb-2",
    registrationNumber: "SPMB-2026-002",
    studentName: "Siti Humairah",
    nik: "6503025505190002",
    pob: "Sebatik",
    dob: "2019-05-15",
    gender: "Perempuan",
    religion: "Islam",
    parentName: "Rahmatullah",
    parentPhone: "082198765432",
    address: "Desa Aru Dasan, Sebatik Tengah",
    previousSchool: "PAUD Bunga Bangsa",
    status: "Menunggu Verifikasi",
    createdAt: "2026-08-04 14:15"
  }
];

export const initialMessages: ContactMessage[] = [
  {
    id: "msg-1",
    name: "Irwan Wijaya",
    email: "irwan.parent@gmail.com",
    phone: "085244112233",
    message: "Selamat pagi Ibu Kepala Sekolah, mau menanyakan jadwal jam pelayanan pendaftaran SPMB secara tatap muka di sekolah untuk hari Sabtu apakah tetap buka?",
    createdAt: "2026-08-03 10:11",
    isRead: false
  }
];

export const initialFeedbacks: FeedbackItem[] = [
  {
    id: "fb-1",
    name: "Hj. Rosdiana, S.Pd.",
    role: "Orang Tua / Wali",
    rating: 5,
    impression: "Sekolah perbatasan unggulan dengan pembelajaran modern!",
    message: "Saya sangat bersyukur dan bangga anak saya bersekolah di SDN 004 Sebatik Tengah. Walau berada di wilayah perbatasan Indonesia-Malaysia, pembentukan karakter, kedisiplinan, serta ekstra Coding & AI sangat luar biasa.",
    createdAt: "2026-08-05 14:20",
    isApproved: true
  },
  {
    id: "fb-2",
    name: "Ahmad Raihan",
    role: "Alumni",
    rating: 5,
    impression: "Bekal kedisiplinan dan kasih sayang guru yang tak ternilai.",
    message: "Kenangan berkesan selama bersekolah di SDN 004 Sebatik Tengah. Bapak dan Ibu guru senantiasa mendidik dengan kehangatan dan keteladanan. Sukses selalu untuk almamater tercinta!",
    createdAt: "2026-08-03 09:15",
    isApproved: true
  },
  {
    id: "fb-3",
    name: "Drs. M. Syukri",
    role: "Masyarakat / Tamu",
    rating: 5,
    impression: "Lingkungan sekolah bersih, asri, dan berbasis digital.",
    message: "Apresiasi setinggi-tingginya untuk jajaran manajemen SDN 004 Sebatik Tengah. Pelayanan sekolah yang RAMAH dan fasilitas belajar yang memadai membuktikan komitmen tinggi untuk anak-anak perbatasan.",
    createdAt: "2026-08-01 16:45",
    isApproved: true
  }
];

export const initialStudents: StudentItem[] = [
  // Kelas 1
  {
    id: "std-101",
    nisn: "0178923011",
    name: "Aditya Pratama",
    gender: "Laki-laki",
    grade: "Kelas 1",
    homeroomTeacher: "Nurhayati, S.Pd.",
    extracurricular: "Coding & AI Kids Dasar",
    status: "Aktif",
    birthPlaceDate: "Nunukan, 12 Maret 2019"
  },
  {
    id: "std-102",
    nisn: "0178923012",
    name: "Siti Humairah",
    gender: "Perempuan",
    grade: "Kelas 1",
    homeroomTeacher: "Nurhayati, S.Pd.",
    extracurricular: "Sanggar Seni & Tari",
    status: "Aktif",
    birthPlaceDate: "Sebatik, 15 Mei 2019"
  },
  {
    id: "std-103",
    nisn: "0178923013",
    name: "Muhammad Al-Fatih",
    gender: "Laki-laki",
    grade: "Kelas 1",
    homeroomTeacher: "Nurhayati, S.Pd.",
    extracurricular: "Pramuka Siaga",
    status: "Aktif",
    birthPlaceDate: "Tarakan, 08 Agustus 2019"
  },
  {
    id: "std-104",
    nisn: "0178923014",
    name: "Nur Aisyah Azzahra",
    gender: "Perempuan",
    grade: "Kelas 1",
    homeroomTeacher: "Nurhayati, S.Pd.",
    extracurricular: "Dokter Cilik",
    status: "Aktif",
    birthPlaceDate: "Sebatik, 20 November 2019"
  },

  // Kelas 2
  {
    id: "std-201",
    nisn: "0168923021",
    name: "Ahmad Rizky Ramadhan",
    gender: "Laki-laki",
    grade: "Kelas 2",
    homeroomTeacher: "Masitah, S.Pd.I.",
    extracurricular: "Bulutangkis",
    status: "Aktif",
    birthPlaceDate: "Tawau, 10 Juni 2018"
  },
  {
    id: "std-202",
    nisn: "0168923022",
    name: "Puteri Kayla Safira",
    gender: "Perempuan",
    grade: "Kelas 2",
    homeroomTeacher: "Masitah, S.Pd.I.",
    extracurricular: "Sanggar Seni & Kaligrafi",
    status: "Aktif",
    birthPlaceDate: "Sebatik, 04 September 2018"
  },
  {
    id: "std-203",
    nisn: "0168923023",
    name: "Fajar Siddiq",
    gender: "Laki-laki",
    grade: "Kelas 2",
    homeroomTeacher: "Masitah, S.Pd.I.",
    extracurricular: "Pramuka Siaga",
    status: "Aktif",
    birthPlaceDate: "Nunukan, 17 Januari 2018"
  },

  // Kelas 3
  {
    id: "std-301",
    nisn: "0158923031",
    name: "Bilal Hasim",
    gender: "Laki-laki",
    grade: "Kelas 3",
    homeroomTeacher: "Jumarni, S.Pd.",
    extracurricular: "Sepak Bola / Futsal",
    status: "Aktif",
    birthPlaceDate: "Sebatik, 22 April 2017"
  },
  {
    id: "std-302",
    nisn: "0158923032",
    name: "Amanda Zhafira",
    gender: "Perempuan",
    grade: "Kelas 3",
    homeroomTeacher: "Jumarni, S.Pd.",
    extracurricular: "Coding & AI Kids",
    status: "Aktif",
    birthPlaceDate: "Tarakan, 02 Februari 2017"
  },
  {
    id: "std-303",
    nisn: "0158923033",
    name: "Rayhan Saputra",
    gender: "Laki-laki",
    grade: "Kelas 3",
    homeroomTeacher: "Jumarni, S.Pd.",
    extracurricular: "Pramuka Penggalang",
    status: "Aktif",
    birthPlaceDate: "Nunukan, 19 Oktober 2017"
  },

  // Kelas 4
  {
    id: "std-401",
    nisn: "0148923041",
    name: "Farhan Nabil",
    gender: "Laki-laki",
    grade: "Kelas 4",
    homeroomTeacher: "Dwi Rahayu, S.Kom., S.Pd.",
    extracurricular: "Coding & AI Kids ( Scratch )",
    status: "Aktif",
    birthPlaceDate: "Sebatik, 11 Maret 2016"
  },
  {
    id: "std-402",
    nisn: "0148923042",
    name: "Zahra Nabila",
    gender: "Perempuan",
    grade: "Kelas 4",
    homeroomTeacher: "Dwi Rahayu, S.Kom., S.Pd.",
    extracurricular: "Dokter Cilik / PMR",
    status: "Aktif",
    birthPlaceDate: "Sebatik, 28 Juli 2016"
  },
  {
    id: "std-403",
    nisn: "0148923043",
    name: "Tegar Maulana",
    gender: "Laki-laki",
    grade: "Kelas 4",
    homeroomTeacher: "Dwi Rahayu, S.Kom., S.Pd.",
    extracurricular: "Bulutangkis O2SN",
    status: "Aktif",
    birthPlaceDate: "Nunukan, 05 Desember 2016"
  },
  {
    id: "std-404",
    nisn: "0148923044",
    name: "Nabila Syakirah",
    gender: "Perempuan",
    grade: "Kelas 4",
    homeroomTeacher: "Dwi Rahayu, S.Kom., S.Pd.",
    extracurricular: "Sanggar Seni Tari Tradisional",
    status: "Aktif",
    birthPlaceDate: "Sebatik, 14 Mei 2016"
  },

  // Kelas 5
  {
    id: "std-501",
    nisn: "0138923051",
    name: "Muhammad Rayhan Al-Ghazali",
    gender: "Laki-laki",
    grade: "Kelas 5",
    homeroomTeacher: "Supriadi, S.Pd.",
    extracurricular: "Coding & Robotik Perbatasan",
    status: "Aktif",
    birthPlaceDate: "Nunukan, 09 Januari 2015"
  },
  {
    id: "std-502",
    nisn: "0138923052",
    name: "Kirana Larasati",
    gender: "Perempuan",
    grade: "Kelas 5",
    homeroomTeacher: "Supriadi, S.Pd.",
    extracurricular: "Dokter Cilik & KSR",
    status: "Aktif",
    birthPlaceDate: "Sebatik, 30 Juni 2015"
  },
  {
    id: "std-503",
    nisn: "0138923053",
    name: "Daniel Kristanto",
    gender: "Laki-laki",
    grade: "Kelas 5",
    homeroomTeacher: "Supriadi, S.Pd.",
    extracurricular: "Bulutangkis & Atletik",
    status: "Aktif",
    birthPlaceDate: "Tarakan, 18 Agustus 2015"
  },
  {
    id: "std-504",
    nisn: "0138923054",
    name: "Suci Ramadhani",
    gender: "Perempuan",
    grade: "Kelas 5",
    homeroomTeacher: "Supriadi, S.Pd.",
    extracurricular: "Pramuka Penggalang",
    status: "Aktif",
    birthPlaceDate: "Sebatik, 24 Desember 2015"
  },

  // Kelas 6
  {
    id: "std-601",
    nisn: "0128923061",
    name: "Andi Muhammad Haikal",
    gender: "Laki-laki",
    grade: "Kelas 6",
    homeroomTeacher: "Andi Sukmawati, S.Pd.",
    extracurricular: "Pramuka Penggalang Utama",
    status: "Aktif",
    birthPlaceDate: "Sebatik, 03 Februari 2014"
  },
  {
    id: "std-602",
    nisn: "0128923062",
    name: "Annisa Nurul Jannah",
    gender: "Perempuan",
    grade: "Kelas 6",
    homeroomTeacher: "Andi Sukmawati, S.Pd.",
    extracurricular: "Olimpiade MIPA & Coding",
    status: "Aktif",
    birthPlaceDate: "Nunukan, 16 September 2014"
  },
  {
    id: "std-603",
    nisn: "0128923063",
    name: "Brandon Nicholas",
    gender: "Laki-laki",
    grade: "Kelas 6",
    homeroomTeacher: "Andi Sukmawati, S.Pd.",
    extracurricular: "Futsal Perbatasan",
    status: "Aktif",
    birthPlaceDate: "Sebatik, 29 Oktober 2014"
  },
  {
    id: "std-604",
    nisn: "0128923064",
    name: "Tri Utami",
    gender: "Perempuan",
    grade: "Kelas 6",
    homeroomTeacher: "Andi Sukmawati, S.Pd.",
    extracurricular: "Seni Musik & Paduan Suara",
    status: "Aktif",
    birthPlaceDate: "Tarakan, 07 Juli 2014"
  }
];

