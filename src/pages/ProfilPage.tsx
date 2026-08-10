import React, { useState } from 'react';
import {
  GraduationCap,
  Award,
  CheckCircle2,
  Users,
  Search,
  BookOpen,
  MapPin,
  Calendar,
  Building2,
  Sparkles,
  User
} from 'lucide-react';
import { SchoolProfile, TeacherItem } from '../types';
import { SectionTitle } from '../components/common/SectionTitle';

interface ProfilPageProps {
  profile: SchoolProfile;
  teachers: TeacherItem[];
}

export const ProfilPage: React.FC<ProfilPageProps> = ({ profile, teachers }) => {
  const [searchTeacher, setSearchTeacher] = useState('');
  const [filterRole, setFilterRole] = useState('semua');

  const filteredTeachers = teachers.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchTeacher.toLowerCase()) ||
      t.position.toLowerCase().includes(searchTeacher.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchTeacher.toLowerCase());

    if (filterRole === 'semua') return matchesSearch;
    if (filterRole === 'kepala') return matchesSearch && t.position.toLowerCase().includes('kepala');
    if (filterRole === 'guru') return matchesSearch && t.position.toLowerCase().includes('guru');
    if (filterRole === 'staf') return matchesSearch && (t.position.toLowerCase().includes('administrasi') || t.position.toLowerCase().includes('staf'));
    return matchesSearch;
  });

  return (
    <div className="space-y-16 pb-16">
      {/* HEADER BANNER */}
      <section className="bg-gradient-to-r from-slate-900 via-[#0F52BA] to-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8 rounded-3xl shadow-lg">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="bg-[#FFC107] text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Profil Resmi Sekolah
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            {profile.name}
          </h1>
          <p className="text-sm text-slate-200">
            {profile.address}, {profile.regency}, {profile.province}
          </p>
        </div>
      </section>

      {/* IDENTITAS SEKOLAH GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Data Pokok"
          title="Identitas Resmi SDN 004 Sebatik Tengah"
          subtitle="Data administratif terdaftar di Kementerian Pendidikan Dasar dan Menengah."
        />

        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Nama Sekolah</span>
            <p className="font-bold text-slate-900 text-sm">{profile.name}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase">NPSN / Akreditasi</span>
            <p className="font-bold text-[#0F52BA] text-sm">{profile.npsn} • Akreditasi {profile.accreditation}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Kepala Sekolah</span>
            <p className="font-bold text-slate-900 text-sm">{profile.principalName}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Kurikulum Opsional</span>
            <p className="font-bold text-emerald-700 text-sm">Kurikulum Merdeka</p>
          </div>
        </div>
      </section>

      {/* SEJARAH & SAMBUTAN DEDICATED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Sambutan Kepala Sekolah */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 text-center">
            <img
              src={profile.principalPhoto}
              alt={profile.principalName}
              className="w-48 h-56 object-cover rounded-2xl border-4 border-[#0F52BA] mx-auto shadow-md"
            />
            <h3 className="font-bold text-slate-900 text-sm mt-3">{profile.principalName}</h3>
            <p className="text-xs text-slate-500 font-medium">{profile.principalTitle}</p>
          </div>
          <div className="lg:col-span-8 space-y-3">
            <span className="text-xs font-bold text-[#0F52BA] uppercase tracking-wider">
              Sambutan Kepala Sekolah
            </span>
            <h2 className="text-xl font-extrabold text-slate-900">
              Mewujudkan Pendidikan Bermutu dan Berkarakter di Perbatasan
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {profile.principalGreeting}
            </p>
          </div>
        </div>

        {/* Sejarah Singkat */}
        <div className="bg-slate-50 rounded-3xl border border-slate-200 p-8 space-y-3">
          <div className="flex items-center gap-2 text-[#0F52BA] font-bold text-xs uppercase tracking-wider">
            <Building2 className="w-4 h-4" /> Sejarah Singkat Sekolah
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">
            Perjalanan SDN 004 Sebatik Tengah
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            SDN 004 Sebatik Tengah didirikan sebagai lembaga pendidikan dasar negeri di Desa Sungai Limau, Kecamatan Sebatik Tengah, Kabupaten Nunukan, Kalimantan Utara. Terletak di perbatasan langsung antara Republik Indonesia dan Malaysia, sekolah ini memegang peran strategis dalam membentuk benih-benih unggul penerus bangsa yang cinta tanah air, cerdas, berkarakter mulia, serta siap bersaing di era sains dan digital modern.
          </p>
        </div>
      </section>

      {/* VISI, MISI, TUJUAN & VALUES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionTitle
          badge="Haluan & Nilai Organisasi"
          title="Visi, Misi, Tujuan & Budaya RAMAH"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Visi Misi */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold text-[#0F52BA] uppercase">Visi Sekolah</span>
              <p className="text-base font-extrabold text-slate-900 mt-1">
                "{profile.vision}"
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <span className="text-xs font-bold text-[#0F52BA] uppercase">Misi Sekolah</span>
              <ul className="space-y-2 text-xs text-slate-700">
                {profile.mission.map((m, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tujuan Sekolah */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold text-[#0F52BA] uppercase">Tujuan Sekolah</span>
              <ul className="space-y-3 text-xs text-slate-700 mt-3">
                {profile.goals.map((g, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-blue-100 text-[#0F52BA] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Values RAMAH */}
        <div className="bg-gradient-to-r from-[#0F52BA] to-blue-900 text-white p-8 rounded-3xl shadow-md space-y-4">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="bg-[#FFC107] text-slate-900 text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase">
              Slogan Resmi Sekolah
            </span>
            <h3 className="text-2xl font-black">
              KEMENDIKDASMEN RAMAH
            </h3>
            <p className="text-xs text-slate-200">
              Responsif • Akuntabel • Melayani • Adaptif • Harmoni
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
            {profile.values.map((v, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center space-y-1">
                <div className="w-10 h-10 mx-auto rounded-xl bg-[#FFC107] text-slate-900 font-black text-lg flex items-center justify-center">
                  {v.letter}
                </div>
                <h4 className="font-bold text-white text-xs">{v.word}</h4>
                <p className="text-[11px] text-slate-200 leading-tight">{v.meaning}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STRUKTUR ORGANISASI VISUAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Tata Kelola"
          title="Struktur Organisasi Sekolah"
          subtitle="Bagan kepemimpinan dan manajemen operasional di SDN 004 Sebatik Tengah."
        />

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center space-y-6">
          {/* Principal Top Box */}
          <div className="max-w-xs mx-auto bg-blue-50 border-2 border-[#0F52BA] p-4 rounded-2xl shadow-sm space-y-1">
            <span className="text-[10px] font-extrabold text-[#0F52BA] uppercase">Kepala Sekolah</span>
            <h4 className="font-extrabold text-slate-900 text-sm">{profile.principalName}</h4>
            <p className="text-[11px] text-slate-600">{profile.principalTitle}</p>
          </div>

          <div className="w-0.5 h-6 bg-slate-300 mx-auto" />

          {/* Committee & Admin Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs font-semibold text-slate-800">
              Komite Sekolah & Tokoh Masyarakat
            </div>
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs font-semibold text-slate-800">
              Tenaga Administrasi / Operator Sekolah
            </div>
          </div>

          <div className="w-0.5 h-6 bg-slate-300 mx-auto" />

          {/* Teachers Row */}
          <div className="bg-blue-900 text-white p-4 rounded-2xl max-w-3xl mx-auto">
            <h4 className="font-bold text-xs uppercase text-[#FFC107]">Majelis Guru Kelas & Guru Mata Pelajaran</h4>
            <p className="text-xs text-slate-200 mt-1">
              Guru Kelas I - VI • Guru PJOK • Guru Agama • Instruktur Coding & AI
            </p>
          </div>
        </div>
      </section>

      {/* DIREKTORI GURU DAN TENAGA KEPENDIDIKAN (GTK) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Sumber Daya Manusia"
          title="Guru & Tenaga Kependidikan (GTK)"
          subtitle="Pendidik profesional yang berdedikasi membimbing para siswa SDN 004 Sebatik Tengah."
        />

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama atau jabatan guru..."
              value={searchTeacher}
              onChange={(e) => setSearchTeacher(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F52BA]"
            />
          </div>

          <div className="flex flex-wrap gap-2 text-xs w-full sm:w-auto">
            {[
              { id: 'semua', label: 'Semua GTK' },
              { id: 'kepala', label: 'Kepala Sekolah' },
              { id: 'guru', label: 'Guru Kelas & Mapel' },
              { id: 'staf', label: 'Staf Administrasi' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterRole(f.id)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                  filterRole === f.id
                    ? 'bg-[#0F52BA] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Teachers Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition duration-300 flex flex-col p-5 space-y-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={t.imageUrl}
                  alt={t.name}
                  className="w-20 h-20 object-cover rounded-2xl border-2 border-[#0F52BA] shrink-0"
                />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm leading-snug">{t.name}</h3>
                  <span className="inline-block bg-blue-50 text-[#0F52BA] text-[10px] font-bold px-2 py-0.5 rounded mt-1 border border-blue-100">
                    {t.position}
                  </span>
                  {t.education && (
                    <p className="text-[11px] text-slate-500 mt-1">{t.education}</p>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 text-xs space-y-1 bg-slate-50 p-3 rounded-xl">
                <div className="text-slate-600 font-medium">
                  <span className="font-semibold text-slate-800">NIP:</span> {t.nip}
                </div>
                <div className="text-slate-600 font-medium">
                  <span className="font-semibold text-slate-800">Tugas/Mapel:</span> {t.subject}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
