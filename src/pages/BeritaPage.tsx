import React, { useState } from 'react';
import { Search, Calendar, User, ArrowRight, Tag, Eye } from 'lucide-react';
import { NewsItem } from '../types';
import { SectionTitle } from '../components/common/SectionTitle';

interface BeritaPageProps {
  news: NewsItem[];
  onSelectNews: (item: NewsItem) => void;
}

export const BeritaPage: React.FC<BeritaPageProps> = ({ news, onSelectNews }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('semua');

  const filtered = news.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.summary.toLowerCase().includes(search.toLowerCase());

    const matchesCat =
      selectedCategory === 'semua' ||
      n.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCat;
  });

  const categories = ['semua', 'teknologi & edukasi', 'kegiatan sekolah', 'kurikulum merdeka', 'prestasi & olahraga'];

  return (
    <div className="space-y-16 pb-16">
      {/* HEADER BANNER */}
      <section className="bg-gradient-to-r from-slate-900 via-[#0F52BA] to-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8 rounded-3xl shadow-lg">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="bg-[#FFC107] text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Kabar & Artikel
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Berita & Publikasi Sekolah
          </h1>
          <p className="text-sm text-slate-200">
            Informasi terkini kegiatan siswa, guru, serta perkembangan pendidikan di SDN 004 Sebatik Tengah.
          </p>
        </div>
      </section>

      {/* SEARCH AND FILTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari kata kunci berita..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F52BA]"
            />
          </div>

          <div className="flex flex-wrap gap-2 text-xs w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl font-semibold capitalize transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0F52BA] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* NEWS LIST GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
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
      </section>
    </div>
  );
};
