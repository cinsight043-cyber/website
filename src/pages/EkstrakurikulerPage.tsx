import React, { useState } from 'react';
import {
  Award,
  Calendar,
  Clock,
  User,
  Sparkles,
  Search,
  CheckCircle2
} from 'lucide-react';
import { ExtracurricularItem } from '../types';
import { SectionTitle } from '../components/common/SectionTitle';

interface EkstrakurikulerPageProps {
  extracurriculars: ExtracurricularItem[];
}

export const EkstrakurikulerPage: React.FC<EkstrakurikulerPageProps> = ({
  extracurriculars
}) => {
  const [search, setSearch] = useState('');

  const filtered = extracurriculars.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.category.toLowerCase().includes(search.toLowerCase()) ||
      e.instructor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-16 pb-16">
      {/* HEADER BANNER */}
      <section className="bg-gradient-to-r from-slate-900 via-[#0F52BA] to-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8 rounded-3xl shadow-lg">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="bg-[#FFC107] text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Pengembangan Bakat
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Program Ekstrakurikuler
          </h1>
          <p className="text-sm text-slate-200">
            Pramuka • Coding & AI Kids • Olahraga • Seni Tari Tradisional • Dokter Kecil
          </p>
        </div>
      </section>

      {/* EXTRACURRICULAR CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionTitle
          badge="Wadah Inovasi & Minat"
          title="Ekstrakurikuler Unggulan Sekolah"
          subtitle="Mengasah bakat fisik, kreativitas seni, kepemimpinan, hingga keterampilan teknologi digital."
        />

        {/* Search Filter */}
        <div className="max-w-md mx-auto relative mb-8">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari ekstrakurikuler..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-xs rounded-2xl border border-slate-200 shadow-sm focus:outline-none focus:border-[#0F52BA] bg-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition duration-300 flex flex-col"
            >
              <div className="relative h-56 overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#0F52BA] text-white text-[10px] font-bold px-3 py-1 rounded-lg shadow">
                  {item.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-extrabold text-slate-900 text-lg">{item.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-700 font-medium">
                    <Clock className="w-4 h-4 text-[#0F52BA] shrink-0" />
                    <span>Jadwal: <strong>{item.schedule}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 font-medium">
                    <User className="w-4 h-4 text-[#0F52BA] shrink-0" />
                    <span>Pembina: <strong>{item.instructor}</strong></span>
                  </div>
                  {item.achievements && (
                    <div className="flex items-center gap-2 text-amber-700 font-semibold bg-amber-50 p-2 rounded-xl">
                      <Award className="w-4 h-4 text-[#FFC107] shrink-0" />
                      <span>{item.achievements}</span>
                    </div>
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
