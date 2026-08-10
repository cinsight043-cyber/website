import React, { useState } from 'react';
import { Award, Search, Trophy, Medal, Star } from 'lucide-react';
import { AchievementItem } from '../types';
import { SectionTitle } from '../components/common/SectionTitle';

interface PrestasiPageProps {
  achievements: AchievementItem[];
}

export const PrestasiPage: React.FC<PrestasiPageProps> = ({ achievements }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('semua');
  const [selectedLevel, setSelectedLevel] = useState('semua');

  const filtered = achievements.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.studentName.toLowerCase().includes(search.toLowerCase());

    const matchesCat =
      selectedCategory === 'semua' ||
      a.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesLevel =
      selectedLevel === 'semua' ||
      a.level.toLowerCase().includes(selectedLevel.toLowerCase());

    return matchesSearch && matchesCat && matchesLevel;
  });

  return (
    <div className="space-y-16 pb-16">
      {/* HEADER BANNER */}
      <section className="bg-gradient-to-r from-slate-900 via-[#0F52BA] to-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8 rounded-3xl shadow-lg">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="bg-[#FFC107] text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Kebanggaan Sekolah
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Dokumentasi Prestasi Siswa & Sekolah
          </h1>
          <p className="text-sm text-slate-200">
            Ajang Akademik • Olahraga • Seni • Keagamaan • Coding & AI
          </p>
        </div>
      </section>

      {/* SEARCH AND FILTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari nama prestasi atau nama siswa..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F52BA]"
              />
            </div>

            {/* Level filter */}
            <div className="flex flex-wrap gap-2 text-xs w-full md:w-auto">
              <span className="text-slate-500 font-semibold my-auto">Tingkat:</span>
              {['semua', 'kecamatan', 'kabupaten', 'provinsi', 'nasional'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3 py-1.5 rounded-lg font-semibold capitalize transition cursor-pointer ${
                    selectedLevel === lvl
                      ? 'bg-[#0F52BA] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Category filter tabs */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-500 font-semibold my-auto">Kategori:</span>
            {['semua', 'akademik', 'olahraga', 'seni', 'keagamaan', 'coding & ai'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full font-bold capitalize transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#FFC107] text-slate-900'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ACHIEVEMENTS CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((ach) => (
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
      </section>
    </div>
  );
};
