import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  Clock,
  Download,
  FileText,
  Cpu,
  CheckCircle2,
  Sparkles,
  Layers,
  GraduationCap,
  Users,
  Search,
  UserCheck,
  User,
  Filter,
  BadgeCheck
} from 'lucide-react';
import { initialAcademicCalendar, initialStudents } from '../data/initialData';
import { SectionTitle } from '../components/common/SectionTitle';
import { StudentItem } from '../types';

interface AkademikPageProps {
  students?: StudentItem[];
}

export const AkademikPage: React.FC<AkademikPageProps> = ({ students = [] }) => {
  const [selectedClass, setSelectedClass] = useState<string>('Semua Kelas');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [genderFilter, setGenderFilter] = useState<string>('semua');

  const availableClasses = ['Semua Kelas', 'Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6'];

  const studentList = students && students.length > 0 ? students : initialStudents;

  // Filter students based on Class, Search term, and Gender
  const filteredStudents = studentList.filter((student) => {
    const matchesClass = selectedClass === 'Semua Kelas' || student.grade === selectedClass;
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.nisn.includes(searchTerm) ||
      (student.extracurricular && student.extracurricular.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesGender =
      genderFilter === 'semua' ||
      (genderFilter === 'L' && student.gender === 'Laki-laki') ||
      (genderFilter === 'P' && student.gender === 'Perempuan');

    return matchesClass && matchesSearch && matchesGender;
  });

  const totalFilteredCount = filteredStudents.length;
  const maleCount = filteredStudents.filter((s) => s.gender === 'Laki-laki').length;
  const femaleCount = filteredStudents.filter((s) => s.gender === 'Perempuan').length;

  return (
    <div className="space-y-16 pb-16">
      {/* HEADER BANNER */}
      <section className="bg-gradient-to-r from-slate-900 via-[#0F52BA] to-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8 rounded-3xl shadow-lg">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="bg-[#FFC107] text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Layanan Pendidikan
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Informasi Akademik & Data Siswa
          </h1>
          <p className="text-sm text-slate-200">
            Kurikulum Merdeka • Kalender Pendidikan • Data Siswa • Coding & AI Kids
          </p>
        </div>
      </section>

      {/* KURIKULUM MERDEKA OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="bg-blue-100 text-[#0F52BA] text-xs font-bold px-3 py-1 rounded-full uppercase border border-blue-200">
              Penerapan Kurikulum
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Kurikulum Merdeka Berbasis Pembelajaran Berkelanjutan
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              SDN 004 Sebatik Tengah menerapkan Kurikulum Merdeka yang memberikan keleluasaan kepada pendidik untuk menciptakan pembelajaran berkualitas yang sesuai dengan kebutuhan dan lingkungan belajar peserta didik di wilayah perbatasan.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="flex items-center gap-2 font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Penguatan Profil Pelajar Pancasila (P5)</span>
              </div>
              <div className="flex items-center gap-2 font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Pembelajaran Diferensiasi Ramah Anak</span>
              </div>
              <div className="flex items-center gap-2 font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Ekskul Coding & AI Kids Dasar</span>
              </div>
              <div className="flex items-center gap-2 font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Penguatan Literasi & Numerasi</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0F52BA] text-[#FFC107] flex items-center justify-center font-bold">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Inovasi Digitalisasi Sekolah</h3>
                <p className="text-[11px] text-slate-600">Pengenalan Teknologi Sejak Dini</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Siswa diajak memanfaatkan fasilitas Chromebook dan tablet sekolah untuk latihan soal interaktif, pembuatan animasi visual Scratch, serta pengenalan konsep AI dasar.
            </p>
          </div>
        </div>
      </section>

      {/* DATA SISWA INTERAKTIF */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Direktori Peserta Didik"
          title="Data Siswa SDN 004 Sebatik Tengah"
          subtitle="Informasi direktori siswa per rombongan belajar (Kelas I s/d VI) Tahun Ajaran 2026/2027."
        />

        {/* SUMMARY STATS CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0F52BA]/10 text-[#0F52BA] flex items-center justify-center font-black">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                Total Siswa Display
              </p>
              <h4 className="text-lg font-black text-slate-900">{totalFilteredCount} Murid</h4>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-black">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                Laki-laki
              </p>
              <h4 className="text-lg font-black text-slate-900">{maleCount} Murid</h4>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-black">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                Perempuan
              </p>
              <h4 className="text-lg font-black text-slate-900">{femaleCount} Murid</h4>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                Status Keaktifan
              </p>
              <h4 className="text-lg font-black text-emerald-700">100% Terdaftar</h4>
            </div>
          </div>
        </div>

        {/* FILTER BAR & SEARCH */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Class Tabs */}
            <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1">
              {availableClasses.map((cls) => (
                <button
                  key={cls}
                  onClick={() => setSelectedClass(cls)}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer whitespace-nowrap ${
                    selectedClass === cls
                      ? 'bg-[#0F52BA] text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80'
                  }`}
                >
                  {cls}
                </button>
              ))}
            </div>

            {/* Gender Filter Pills */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[11px] font-bold text-slate-500 mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Gender:
              </span>
              {[
                { id: 'semua', label: 'Semua' },
                { id: 'L', label: 'Laki-laki' },
                { id: 'P', label: 'Perempuan' }
              ].map((g) => (
                <button
                  key={g.id}
                  onClick={() => setGenderFilter(g.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                    genderFilter === g.id
                      ? 'bg-amber-500 text-slate-900 shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama siswa, NISN, atau kegiatan ekstrakurikuler..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F52BA] bg-slate-50 text-slate-900 text-xs font-semibold"
            />
          </div>
        </div>

        {/* DATA SISWA TABLE */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BadgeCheck className="w-4 h-4 text-[#FFC107]" />
              <h3 className="font-extrabold text-xs sm:text-sm">
                Direktori Siswa — {selectedClass}
              </h3>
            </div>
            <span className="text-[11px] text-slate-300 font-semibold">
              Menampilkan {totalFilteredCount} Siswa
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100 text-slate-800 font-extrabold uppercase tracking-wider text-[10px] border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">No</th>
                  <th className="px-4 py-3">NISN</th>
                  <th className="px-4 py-3">Nama Lengkap Siswa</th>
                  <th className="px-4 py-3">Jenis Kelamin</th>
                  <th className="px-4 py-3">Kelas / Wali Kelas</th>
                  <th className="px-4 py-3">Minat & Ekstrakurikuler</th>
                  <th className="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((std, idx) => (
                  <tr key={std.id} className="hover:bg-blue-50/50 transition">
                    <td className="px-4 py-3.5 font-bold text-slate-400">{idx + 1}</td>
                    <td className="px-4 py-3.5 font-mono font-bold text-slate-800 bg-slate-50/50 rounded-lg">
                      {std.nisn}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="font-extrabold text-slate-900 text-xs">{std.name}</div>
                      {std.birthPlaceDate && (
                        <span className="text-[10px] text-slate-400 block">{std.birthPlaceDate}</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          std.gender === 'Laki-laki'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}
                      >
                        {std.gender}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-[#0F52BA]">{std.grade}</div>
                      <div className="text-[10px] text-slate-500">Wali: {std.homeroomTeacher}</div>
                    </td>
                    <td className="px-4 py-3.5 font-semibold text-slate-700">
                      {std.extracurricular ? (
                        <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md text-[11px] font-bold inline-block">
                          {std.extracurricular}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-emerald-200 inline-block">
                        {std.status}
                      </span>
                    </td>
                  </tr>
                ))}

                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-slate-500 text-xs">
                      <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      Tidak ada data siswa yang cocok dengan kriteria pencarian.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* KALENDER PENDIDIKAN SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Agenda Tahunan"
          title="Kalender Pendidikan 2026/2027"
          subtitle="Jadwal kegiatan akademik, libur sekolah, dan asesmen nasional."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {initialAcademicCalendar.map((ev) => (
            <div key={ev.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#0F52BA] flex items-center justify-center font-black text-sm shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded">
                  {ev.category}
                </span>
                <h3 className="font-bold text-slate-900 text-sm">{ev.title}</h3>
                <p className="text-xs text-[#0F52BA] font-semibold">
                  {ev.startDate} {ev.endDate ? `- ${ev.endDate}` : ''}
                </p>
                {ev.description && <p className="text-xs text-slate-600 mt-1">{ev.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ASESMEN DAN PROGRAM SEKOLAH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="bg-[#FFC107] text-slate-900 text-xs font-extrabold px-3 py-1 rounded-full uppercase">
              Evaluasi Pembelajaran
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Asesmen Nasional (ANBK) & Evaluasi Diagnostik
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Asesmen di SDN 004 Sebatik Tengah dirancang ramah anak, bertujuan mengukur kompetensi literasi, numerasi, serta survei karakter untuk perbaikan mutu pembelajaran secara terus-menerus.
            </p>
          </div>

          <div className="space-y-3">
            <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 text-xs space-y-1">
              <h4 className="font-bold text-[#FFC107]">ANBK Kelas V</h4>
              <p className="text-slate-300">Asesmen berbasis komputer untuk memetakan mutu pendidikan sekolah.</p>
            </div>
            <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 text-xs space-y-1">
              <h4 className="font-bold text-blue-400">Sumatif Tengah & Akhir Semester</h4>
              <p className="text-slate-300">Evaluasi pemahaman materi pelajaran setiap pertengahan dan akhir semester.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
