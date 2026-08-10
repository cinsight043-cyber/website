import React, { useState, useEffect } from 'react';
import {
  Newspaper,
  Award,
  Megaphone,
  Search,
  Calendar,
  User,
  ArrowRight,
  Trophy,
  Pin,
  Tag,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { NewsItem, AchievementItem, AnnouncementItem } from '../types';
import { SectionTitle } from '../components/common/SectionTitle';

interface BeritaInformasiPageProps {
  news: NewsItem[];
  achievements: AchievementItem[];
  announcements: AnnouncementItem[];
  onSelectNews: (item: NewsItem) => void;
  defaultSubTab?: 'berita' | 'prestasi' | 'pengumuman' | 'semua';
}

export const BeritaInformasiPage: React.FC<BeritaInformasiPageProps> = ({
  news,
  achievements,
  announcements,
  onSelectNews,
  defaultSubTab = 'berita'
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'semua' | 'berita' | 'prestasi' | 'pengumuman'>(
    defaultSubTab === 'semua' ? 'semua' : defaultSubTab
  );

  useEffect(() => {
    if (defaultSubTab) {
      setActiveSubTab(defaultSubTab === 'semua' ? 'semua' : defaultSubTab);
    }
  }, [defaultSubTab]);

  // Filters state
  const [search, setSearch] = useState('');
  const [newsCategory, setNewsCategory] = useState('semua');
  const [achCategory, setAchCategory] = useState('semua');
  const [achLevel, setAchLevel] = useState('semua');

  // Filtered lists
  const filteredNews = news.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.summary.toLowerCase().includes(search.toLowerCase());
    const matchesCat =
      newsCategory === 'semua' || n.category.toLowerCase() === newsCategory.toLowerCase();
    return matchesSearch && matchesCat;
  });

  const filteredAchievements = achievements.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.studentName.toLowerCase().includes(search.toLowerCase());
    const matchesCat =
      achCategory === 'semua' || a.category.toLowerCase() === achCategory.toLowerCase();
    const matchesLevel =
      achLevel === 'semua' || a.level.toLowerCase().includes(achLevel.toLowerCase());
    return matchesSearch && matchesCat && matchesLevel;
  });

  const filteredAnnouncements = announcements.filter((a) => {
    return (
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.content.toLowerCase().includes(search.toLowerCase())
    );
  });

  const newsCategories = [
    'semua',
    'teknologi & edukasi',
    'kegiatan sekolah',
    'kurikulum merdeka',
    'prestasi & olahraga'
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* HEADER BANNER */}
      <section className="bg-gradient-to-r from-slate-900 via-[#0F52BA] to-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8 rounded-3xl shadow-lg">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="bg-[#FFC107] text-slate-900 text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider">
            Pusat Informasi Terpadu
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Berita, Prestasi & Pengumuman Sekolah
          </h1>
          <p className="text-sm text-slate-200">
            Satu wadah untuk mengakses seluruh kabar kegiatan, ukiran prestasi siswa, dan informasi resmi SDN 004 Sebatik Tengah.
          </p>
        </div>
      </section>

      {/* SUB-NAVIGATION TABS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-2 sm:p-3 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setActiveSubTab('semua')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeSubTab === 'semua'
                ? 'bg-[#0F52BA] text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Filter className="w-4 h-4 text-[#FFC107]" />
            Semua Informasi
          </button>

          <button
            onClick={() => setActiveSubTab('berita')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeSubTab === 'berita'
                ? 'bg-[#0F52BA] text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Newspaper className="w-4 h-4 text-[#FFC107]" />
            Berita & Artikel ({news.length})
          </button>

          <button
            onClick={() => setActiveSubTab('prestasi')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeSubTab === 'prestasi'
                ? 'bg-[#0F52BA] text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Award className="w-4 h-4 text-[#FFC107]" />
            Prestasi Siswa ({achievements.length})
          </button>

          <button
            onClick={() => setActiveSubTab('pengumuman')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeSubTab === 'pengumuman'
                ? 'bg-[#0F52BA] text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Megaphone className="w-4 h-4 text-[#FFC107]" />
            Pengumuman ({announcements.length})
          </button>
        </div>
      </section>

      {/* SEARCH AND SPECIFIC FILTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Global Search input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari kata kunci, nama siswa, atau berita..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F52BA]"
              />
            </div>

            {/* Category specific filters when Berita is active */}
            {activeSubTab === 'berita' && (
              <div className="flex flex-wrap gap-1.5 text-xs w-full md:w-auto">
                {newsCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setNewsCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg font-semibold capitalize transition cursor-pointer ${
                      newsCategory === cat
                        ? 'bg-[#0F52BA] text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            {/* Level filters when Prestasi is active */}
            {activeSubTab === 'prestasi' && (
              <div className="flex flex-wrap gap-1.5 text-xs w-full md:w-auto">
                <span className="text-slate-500 font-semibold my-auto">Tingkat:</span>
                {['semua', 'kecamatan', 'kabupaten', 'provinsi', 'nasional'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setAchLevel(lvl)}
                    className={`px-3 py-1.5 rounded-lg font-semibold capitalize transition cursor-pointer ${
                      achLevel === lvl
                        ? 'bg-[#0F52BA] text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Secondary category tabs for Prestasi */}
          {activeSubTab === 'prestasi' && (
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-500 font-semibold my-auto">Kategori Prestasi:</span>
              {['semua', 'akademik', 'olahraga', 'seni', 'keagamaan', 'coding & ai'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setAchCategory(cat)}
                  className={`px-3 py-1 rounded-full font-bold capitalize transition cursor-pointer ${
                    achCategory === cat
                      ? 'bg-[#FFC107] text-slate-900'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* SECTION CONTENT BASED ON ACTIVE SUB-TAB */}

        {/* --- ALL INFORMATIONS COMBINED VIEW --- */}
        {activeSubTab === 'semua' && (
          <div className="space-y-12">
            {/* Pinned / Latest Announcements */}
            {filteredAnnouncements.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-900 border-b border-slate-200 pb-2">
                  <Megaphone className="w-5 h-5 text-[#0F52BA]" />
                  <h2 className="font-extrabold text-lg">Pengumuman Resmi Terkini</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredAnnouncements.slice(0, 2).map((ann) => (
                    <div
                      key={ann.id}
                      className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2"
                    >
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="bg-blue-100 text-[#0F52BA] font-bold px-2.5 py-0.5 rounded-full">
                          {ann.category}
                        </span>
                        <span className="text-slate-400 font-medium">{ann.date}</span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm">{ann.title}</h3>
                      <p className="text-xs text-slate-600 line-clamp-2">{ann.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Latest News */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div className="flex items-center gap-2 text-slate-900">
                  <Newspaper className="w-5 h-5 text-[#0F52BA]" />
                  <h2 className="font-extrabold text-lg">Berita & Kegiatan Terbaru</h2>
                </div>
                <button
                  onClick={() => setActiveSubTab('berita')}
                  className="text-xs font-bold text-[#0F52BA] hover:underline"
                >
                  Lihat Berita Lainnya ›
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredNews.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onSelectNews(item)}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition duration-300 flex flex-col group cursor-pointer"
                  >
                    <div className="relative h-44 overflow-hidden bg-slate-100">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <span className="absolute top-2.5 left-2.5 bg-[#0F52BA] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                        {item.category}
                      </span>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-1.5">
                        <span className="text-[10px] text-slate-400 block">{item.publishedAt}</span>
                        <h3 className="font-bold text-slate-900 text-xs group-hover:text-[#0F52BA] transition line-clamp-2">
                          {item.title}
                        </h3>
                      </div>
                      <span className="text-xs font-bold text-[#0F52BA] flex items-center gap-1">
                        Baca Selengkapnya <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Latest Achievements */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div className="flex items-center gap-2 text-slate-900">
                  <Award className="w-5 h-5 text-[#0F52BA]" />
                  <h2 className="font-extrabold text-lg">Dokumentasi Prestasi Siswa</h2>
                </div>
                <button
                  onClick={() => setActiveSubTab('prestasi')}
                  className="text-xs font-bold text-[#0F52BA] hover:underline"
                >
                  Lihat Prestasi Lainnya ›
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAchievements.slice(0, 3).map((ach) => (
                  <div
                    key={ach.id}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm p-4 space-y-3"
                  >
                    <div className="relative h-40 rounded-xl overflow-hidden bg-slate-100">
                      <img
                        src={ach.imageUrl}
                        alt={ach.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 bg-[#FFC107] text-slate-900 text-[10px] font-extrabold px-2 py-0.5 rounded shadow">
                        {ach.level}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-slate-900 text-xs">{ach.title}</h3>
                      <p className="text-xs font-bold text-amber-600 flex items-center gap-1">
                        <Trophy className="w-3 h-3 text-[#FFC107]" />
                        {ach.studentName}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- BERITA TAB VIEW --- */}
        {activeSubTab === 'berita' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectNews(item)}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition duration-300 flex flex-col group cursor-pointer"
              >
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#0F52BA] text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow">
                    {item.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-[#0F52BA]" />
                      <span>{item.publishedAt}</span>
                      <span>•</span>
                      <User className="w-3.5 h-3.5 text-[#0F52BA]" />
                      <span>{item.author}</span>
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-base group-hover:text-[#0F52BA] transition leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0F52BA]">
                    <span className="flex items-center gap-1">
                      Baca Berita Lengkap <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- PRESTASI TAB VIEW --- */}
        {activeSubTab === 'prestasi' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map((ach) => (
              <div
                key={ach.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition duration-300 flex flex-col"
              >
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={ach.imageUrl}
                    alt={ach.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-[#FFC107] text-slate-900 text-[10px] font-extrabold px-3 py-1 rounded-lg shadow">
                    {ach.level}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    Tahun {ach.year}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-[#0F52BA] uppercase">
                      Kategori: {ach.category}
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-sm leading-snug">
                      {ach.title}
                    </h3>
                    <p className="text-xs font-bold text-amber-600 flex items-center gap-1 pt-1">
                      <Trophy className="w-3.5 h-3.5 text-[#FFC107]" />
                      {ach.studentName}
                    </p>
                    {ach.description && (
                      <p className="text-xs text-slate-600 leading-relaxed pt-1">
                        {ach.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- PENGUMUMAN TAB VIEW --- */}
        {activeSubTab === 'pengumuman' && (
          <div className="max-w-4xl mx-auto space-y-6">
            {filteredAnnouncements.map((ann) => (
              <div
                key={ann.id}
                className={`bg-white rounded-3xl p-6 border shadow-sm transition duration-200 space-y-3 ${
                  ann.isPinned ? 'border-[#0F52BA] ring-2 ring-blue-100' : 'border-slate-200'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    {ann.isPinned && (
                      <span className="bg-[#FFC107] text-slate-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <Pin className="w-3 h-3" /> Sematan Poin Penting
                      </span>
                    )}
                    <span className="bg-blue-100 text-[#0F52BA] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      {ann.category}
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      Status: {ann.status}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#0F52BA]" /> {ann.date}
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                  {ann.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {ann.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
