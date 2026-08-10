import React from 'react';
import { Megaphone, Calendar, Pin, FileText, CheckCircle2 } from 'lucide-react';
import { AnnouncementItem } from '../types';
import { SectionTitle } from '../components/common/SectionTitle';

interface PengumumanPageProps {
  announcements: AnnouncementItem[];
}

export const PengumumanPage: React.FC<PengumumanPageProps> = ({ announcements }) => {
  return (
    <div className="space-y-16 pb-16">
      {/* HEADER BANNER */}
      <section className="bg-gradient-to-r from-slate-900 via-[#0F52BA] to-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8 rounded-3xl shadow-lg">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="bg-[#FFC107] text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Informasi Resmi
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Papan Pengumuman Sekolah
          </h1>
          <p className="text-sm text-slate-200">
            Pengumuman penting akademik, jadwal kegiatan, dan surat edaran resmi.
          </p>
        </div>
      </section>

      {/* ANNOUNCEMENT LIST */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {announcements.map((ann) => (
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
      </section>
    </div>
  );
};
