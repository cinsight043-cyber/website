import React, { useState } from 'react';
import {
  GraduationCap,
  Users,
  Award,
  BookOpen,
  Calendar,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  UserCheck,
  ChevronRight,
  Layers,
  Cpu,
  HeartHandshake,
  Megaphone,
  Image as ImageIcon,
  MessageSquare,
  Star,
  Quote,
  MessageCircle
} from 'lucide-react';
import {
  SchoolProfile,
  NewsItem,
  AnnouncementItem,
  TeacherItem,
  AchievementItem,
  ExtracurricularItem,
  GalleryItem,
  FeedbackItem
} from '../types';
import { SectionTitle } from '../components/common/SectionTitle';
import { AnimatedCounter } from '../components/common/AnimatedCounter';
import { PesanKesanModal } from '../components/modals/PesanKesanModal';

interface HomePageProps {
  profile: SchoolProfile;
  news: NewsItem[];
  announcements: AnnouncementItem[];
  achievements: AchievementItem[];
  gallery: GalleryItem[];
  feedbacks: FeedbackItem[];
  onSubmitFeedback: (data: Omit<FeedbackItem, 'id' | 'createdAt'>) => Promise<void>;
  showToast: (title: string, message?: string, type?: 'success' | 'error' | 'info') => void;
  setActiveTab: (tab: string) => void;
  onSelectNews: (item: NewsItem) => void;
  onOpenSPMBModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  profile,
  news,
  announcements,
  achievements,
  gallery,
  feedbacks = [],
  onSubmitFeedback,
  showToast,
  setActiveTab,
  onSelectNews,
  onOpenSPMBModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('semua');
  const [showPesanKesanModal, setShowPesanKesanModal] = useState<boolean>(false);

  const filteredGallery =
    selectedCategory === 'semua'
      ? gallery.slice(0, 6)
      : gallery.filter((g) => g.category.toLowerCase() === selectedCategory.toLowerCase()).slice(0, 6);

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-[#0F52BA] to-blue-900 text-white pt-12 pb-20 lg:pt-16 lg:pb-28">
        {/* Decorative background shapes */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-96 h-96 rounded-full bg-[#FFC107]/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column - Headline & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-semibold text-[#FFC107]">
                <Sparkles className="w-4 h-4" />
                <span>{profile.slogan}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                Selamat Datang di <br />
                <span className="text-[#FFC107] drop-shadow-md">
                  {profile.name}
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Garda terdepan pendidikan dasar di kawasan perbatasan Sebatik Tengah. Berkomitmen mencetak generasi cerdas, mandiri, berkarakter mulia, dan adaptif teknologi digital.
              </p>

              {/* Tagline & Badges */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 pt-1 text-xs">
                <span className="bg-blue-950/80 text-white px-3 py-1 rounded-lg border border-blue-700/60 font-medium">
                  📍 {profile.address}
                </span>
                <span className="bg-[#FFC107] text-slate-900 px-3 py-1 rounded-lg font-bold">
                  Akreditasi {profile.accreditation}
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-lg border border-emerald-500/30 font-medium">
                  NPSN {profile.npsn}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-4">
                <button
                  onClick={() => setActiveTab('profil')}
                  className="bg-white text-[#0F52BA] hover:bg-slate-100 font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-[#0F52BA]" />
                  Tentang Sekolah
                </button>
                <button
                  onClick={onOpenSPMBModal}
                  className="bg-gradient-to-r from-[#FFC107] to-[#FFA000] text-slate-900 font-black text-sm px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:brightness-105 transition-all duration-200 flex items-center gap-2 cursor-pointer"
                >
                  <UserCheck className="w-4 h-4 text-[#0F52BA]" />
                  Pendaftaran SPMB Online
                </button>
                <button
                  onClick={() => setShowPesanKesanModal(true)}
                  className="bg-[#0F52BA]/80 hover:bg-[#0F52BA] text-white font-bold text-sm px-5 py-3.5 rounded-xl border border-blue-400/30 transition duration-200 flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <HeartHandshake className="w-4 h-4 text-[#FFC107]" />
                  Pesan & Kesan
                </button>
                <button
                  onClick={() => setActiveTab('kontak')}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-5 py-3.5 rounded-xl border border-white/20 transition duration-200 flex items-center gap-1.5 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-[#FFC107]" />
                  Hubungi Kami
                </button>
              </div>
            </div>

            {/* Right Column - Hero Visual Card & Pinned Announcement */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 group">
                <img
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80"
                  alt="Siswa SDN 004 Sebatik Tengah Belajar Coding & AI"
                  className="w-full h-80 object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent p-6 flex flex-col justify-end text-white">
                  <span className="bg-[#FFC107] text-slate-900 font-extrabold text-[10px] uppercase px-2.5 py-1 rounded-md w-max mb-2">
                    Inovasi Pembelajaran Digital
                  </span>
                  <h3 className="font-bold text-base sm:text-lg leading-snug">
                    Pembelajaran Coding & AI Kids untuk Anak Perbatasan
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                    Melatih logika berpikir visual, inovasi teknologi, dan wawasan sains sejak usia Sekolah Dasar.
                  </p>
                </div>
              </div>

              {/* Pinned Announcement Widget */}
              {announcements.length > 0 && (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-[#FFC107]">
                      <Megaphone className="w-4 h-4" /> Pengumuman Terbaru
                    </span>
                    <button
                      onClick={() => setActiveTab('pengumuman')}
                      className="text-[11px] text-slate-300 hover:text-white flex items-center gap-0.5"
                    >
                      Lihat Semua <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                  <h4 className="font-semibold text-xs text-white line-clamp-1">
                    {announcements[0].title}
                  </h4>
                  <p className="text-[11px] text-slate-300 line-clamp-2 mt-1">
                    {announcements[0].content}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* STATISTIK SEKOLAH SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 lg:-mt-24 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100/80">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-[#0F52BA] text-white flex items-center justify-center mb-3 shadow-md shadow-blue-500/20">
              <Users className="w-6 h-6 text-[#FFC107]" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              <AnimatedCounter target={profile.stats.students} suffix="+" />
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
              Jumlah Murid
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100/80">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-[#FFC107] text-slate-900 flex items-center justify-center mb-3 shadow-md shadow-amber-500/20">
              <GraduationCap className="w-6 h-6 text-[#0F52BA]" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              <AnimatedCounter target={profile.stats.teachers} />
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
              Guru & Tenaga Pendidik
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100/80">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-3 shadow-md shadow-emerald-500/20">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              <AnimatedCounter target={profile.stats.staff} />
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
              Tenaga Kependidikan
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100/80">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-purple-600 text-white flex items-center justify-center mb-3 shadow-md shadow-purple-500/20">
              <Layers className="w-6 h-6 text-[#FFC107]" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              <AnimatedCounter target={profile.stats.classes} />
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
              Rombongan Belajar (Rombel)
            </p>
          </div>
        </div>
      </section>

      {/* SAMBUTAN KEPALA SEKOLAH SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Principal Image Card */}
            <div className="lg:col-span-4 text-center">
              <div className="relative inline-block">
                <img
                  src={profile.principalPhoto}
                  alt={profile.principalName}
                  className="w-56 h-64 sm:w-64 sm:h-72 object-cover rounded-2xl shadow-2xl border-4 border-[#FFC107]/80 mx-auto"
                />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#0F52BA] text-[#FFC107] text-[10px] font-extrabold px-3 py-1 rounded-full border border-[#FFC107]/50 whitespace-nowrap shadow-md">
                  KEPALA SEKOLAH
                </div>
              </div>
              <h3 className="font-bold text-lg text-white mt-5">
                {profile.principalName}
              </h3>
              <p className="text-xs text-slate-300 font-medium">
                {profile.principalTitle}
              </p>
            </div>

            {/* Principal Message Text */}
            <div className="lg:col-span-8 space-y-4 text-slate-200">
              <span className="bg-white/10 text-[#FFC107] text-xs font-bold px-3 py-1 rounded-full inline-block border border-white/20">
                Sambutan Kepala Sekolah
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                "Mendidik dengan Hati, Membangun Karakter di Batas Negeri"
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic border-l-4 border-[#FFC107] pl-4 py-1">
                "{profile.principalGreeting}"
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('profil')}
                  className="bg-[#FFC107] text-slate-900 hover:bg-amber-400 font-bold text-xs px-5 py-2.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                >
                  Baca Selengkapnya Profil Sekolah <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TENTANG SEKOLAH & VALUES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Visi & Misi Sekolah"
          title="Pendidikan Unggul & Berkarakter RAMAH"
          subtitle="Landasan utama penyelenggaraan pendidikan di SDN 004 Sebatik Tengah."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Visi & Misi Card */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F52BA]">
                Visi Sekolah
              </h3>
              <p className="text-base font-bold text-slate-900 leading-snug">
                "{profile.vision}"
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F52BA]">
                Misi Utama Sekolah
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-700">
                {profile.mission.map((m, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Slogan RAMAH Values Grid */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 p-8 rounded-3xl border border-blue-100 space-y-4">
            <div>
              <span className="text-xs font-bold text-[#0F52BA] uppercase tracking-wider">
                Nilai Utama Sekolah
              </span>
              <h3 className="text-xl font-extrabold text-slate-900">
                KEMENDIKDASMEN RAMAH
              </h3>
              <p className="text-xs text-slate-600">
                Prinsip pelayanan dan budaya kerja seluruh majelis guru dan staf SDN 004 Sebatik Tengah:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {profile.values.map((v, idx) => (
                <div key={idx} className="bg-white p-3.5 rounded-2xl border border-blue-100 shadow-sm flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0F52BA] text-[#FFC107] font-black text-base flex items-center justify-center shrink-0">
                    {v.letter}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">{v.word}</h4>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-tight">{v.meaning}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BERITA TERBARU SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
          <div>
            <span className="bg-blue-100 text-[#0F52BA] text-xs font-bold uppercase px-3 py-1 rounded-full border border-blue-200">
              Kabar Terbaru
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Berita & Kegiatan Sekolah
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('berita')}
            className="text-xs font-bold text-[#0F52BA] hover:underline flex items-center gap-1 cursor-pointer"
          >
            Lihat Semua Berita <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.slice(0, 3).map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectNews(item)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition duration-300 flex flex-col group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#0F52BA] text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow">
                  {item.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-[#0F52BA]" />
                    <span>{item.publishedAt}</span>
                    <span>•</span>
                    <span>{item.author}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-[#0F52BA] transition line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-[#0F52BA] group-hover:translate-x-1 transition duration-200">
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRESTASI SISWA & SEKOLAH SECTION */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="Kebanggaan Sekolah"
            title="Prestasi Murid SDN 004 Sebatik Tengah"
            subtitle="Bukti kerja keras dan bakat luar biasa anak-anak perbatasan di tingkat Kabupaten, Provinsi, dan Nasional."
            light
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.slice(0, 4).map((ach) => (
              <div
                key={ach.id}
                className="bg-slate-800/90 rounded-2xl overflow-hidden border border-slate-700 p-4 space-y-3 hover:border-[#FFC107] transition duration-300"
              >
                <div className="relative h-40 rounded-xl overflow-hidden">
                  <img
                    src={ach.imageUrl}
                    alt={ach.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-[#FFC107] text-slate-900 text-[10px] font-extrabold px-2 py-0.5 rounded shadow">
                    {ach.level}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-blue-400 uppercase">
                    {ach.category} • {ach.year}
                  </span>
                  <h3 className="font-bold text-white text-xs mt-1 leading-snug">
                    {ach.title}
                  </h3>
                  <p className="text-xs text-[#FFC107] font-medium mt-1">
                    {ach.studentName}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => setActiveTab('prestasi')}
              className="bg-[#0F52BA] hover:bg-blue-600 text-white font-bold text-xs px-6 py-3 rounded-xl transition duration-200 cursor-pointer inline-flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-[#FFC107]" />
              Lihat Seluruh Daftar Prestasi
            </button>
          </div>
        </div>
      </section>

      {/* GALERI FOTO KEGIATAN PREVIEW SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Dokumentasi Visual"
          title="Galeri Kegiatan SDN 004 Sebatik Tengah"
          subtitle="Potret keceriaan, semangat belajar, dan kebersamaan di lingkungan sekolah."
        />

        {/* Filter categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 text-xs">
          {['semua', 'pembelajaran', 'upacara', 'pramuka', 'olahraga', 'coding & ai'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl font-semibold capitalize transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#0F52BA] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 h-64 cursor-pointer"
              onClick={() => setActiveTab('galeri')}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent p-4 flex flex-col justify-end text-white opacity-95 group-hover:opacity-100 transition">
                <span className="bg-[#0F52BA] text-white text-[10px] font-bold px-2 py-0.5 rounded w-max mb-1">
                  {item.category}
                </span>
                <h3 className="font-bold text-xs sm:text-sm line-clamp-2">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => setActiveTab('galeri')}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-6 py-3 rounded-xl transition duration-200 cursor-pointer inline-flex items-center gap-1.5"
          >
            <ImageIcon className="w-4 h-4 text-[#0F52BA]" />
            Buka Galeri Foto Lengkap
          </button>
        </div>
      </section>

      {/* PESAN & KESAN SECTION ON HOMEPAGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden border border-blue-800/40">
          <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-64 h-64 rounded-full bg-[#FFC107]/10 blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <span className="bg-[#FFC107] text-slate-900 font-extrabold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5">
                  <HeartHandshake className="w-3.5 h-3.5 text-[#0F52BA]" /> Testimoni & Suara Perbatasan
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                  Pesan & Kesan Mengenai <br />
                  <span className="text-[#FFC107]">{profile.name}</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Apresiasi, cerita pengalaman berkesan, dan harapan dari orang tua murid, alumni, dan masyarakat perbatasan Sebatik Tengah.
                </p>
              </div>

              <button
                onClick={() => setShowPesanKesanModal(true)}
                className="bg-[#FFC107] hover:bg-amber-400 text-slate-900 font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg transition cursor-pointer flex items-center gap-2 self-start md:self-auto shrink-0"
              >
                <MessageSquare className="w-4 h-4 text-[#0F52BA]" />
                Buka Popup Pesan & Kesan ({feedbacks.length})
              </button>
            </div>

            {/* Testimonials Preview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {feedbacks.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-3 flex flex-col justify-between hover:bg-white/15 transition cursor-pointer group"
                  onClick={() => setShowPesanKesanModal(true)}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="bg-blue-500/20 text-blue-200 border border-blue-400/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        {item.role}
                      </span>
                      <div className="flex items-center text-amber-400 gap-0.5">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400" />
                        ))}
                      </div>
                    </div>

                    <h3 className="font-bold text-sm text-white italic group-hover:text-[#FFC107] transition line-clamp-2">
                      "{item.impression}"
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {item.message}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#FFC107] text-slate-900 font-black text-xs flex items-center justify-center shrink-0">
                      {item.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="font-bold text-xs text-white truncate">{item.name}</h4>
                      <p className="text-[10px] text-slate-400">{item.createdAt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION (CTA) SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0F52BA] via-blue-700 to-indigo-800 text-white rounded-3xl p-8 sm:p-12 shadow-xl text-center space-y-6 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <span className="bg-[#FFC107] text-slate-900 font-extrabold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              Penerimaan Murid Baru 2026/2027
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              Kenali Lebih Dekat SDN 004 Sebatik Tengah
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Bergabunglah bersama kami untuk mewujudkan masa depan putra-putri yang cerdas, adaptif teknologi, dan berakhlak mulia di sekolah perbatasan.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                onClick={onOpenSPMBModal}
                className="bg-[#FFC107] hover:bg-amber-400 text-slate-900 font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg transition cursor-pointer flex items-center gap-2"
              >
                <UserCheck className="w-4 h-4 text-[#0F52BA]" />
                Daftar Online Sekarang
              </button>
              <button
                onClick={() => setActiveTab('kontak')}
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl border border-white/20 transition cursor-pointer flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#FFC107]" />
                Hubungi Panitia SPMB
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FLOATING QUICK TRIGGER BUTTON FOR PESAN & KESAN */}
      <div className="fixed bottom-6 right-20 z-40">
        <button
          onClick={() => setShowPesanKesanModal(true)}
          className="bg-[#0F52BA] hover:bg-blue-700 text-white font-extrabold text-xs px-4 py-3 rounded-full shadow-2xl border-2 border-white/80 transition duration-200 cursor-pointer flex items-center gap-2 hover:scale-105 active:scale-95 animate-bounce hover:animate-none"
          title="Buka Popup Pesan dan Kesan"
        >
          <MessageCircle className="w-4 h-4 text-[#FFC107]" />
          <span className="hidden sm:inline">Pesan & Kesan</span>
        </button>
      </div>

      {/* POPUP MODAL PESAN & KESAN */}
      <PesanKesanModal
        isOpen={showPesanKesanModal}
        onClose={() => setShowPesanKesanModal(false)}
        feedbacks={feedbacks}
        onSubmitFeedback={onSubmitFeedback}
        showToast={showToast}
      />
    </div>
  );
};
