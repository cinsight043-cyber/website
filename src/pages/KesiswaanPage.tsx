import React from 'react';
import {
  ShieldCheck,
  Heart,
  UserCheck,
  Smile,
  BookCheck,
  Award,
  Users
} from 'lucide-react';
import { SectionTitle } from '../components/common/SectionTitle';

export const KesiswaanPage: React.FC = () => {
  return (
    <div className="space-y-16 pb-16">
      {/* HEADER BANNER */}
      <section className="bg-gradient-to-r from-slate-900 via-[#0F52BA] to-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8 rounded-3xl shadow-lg">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="bg-[#FFC107] text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Pengembangan Siswa
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Bidang Kesiswaan & Sekolah Ramah Anak
          </h1>
          <p className="text-sm text-slate-200">
            Pembinaan Karakter • Kebiasaan Positif • Anti Bullying • Budaya Disiplin
          </p>
        </div>
      </section>

      {/* PROGRAM PEMBINAAN KARAKTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Pembinaan Karakter"
          title="Program Pembinaan Karakter Siswa"
          subtitle="Menanamkan adab, kemandirian, kejujuran, dan jiwa nasionalisme."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#0F52BA] flex items-center justify-center font-bold">
              <Smile className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">
              Program 5S (Senyum, Salam, Sapa, Sopan, Santun)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Membiasakan murid menyapa guru, staf, dan teman dengan santun setiap kali memasuki lingkungan sekolah.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#0F52BA] flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6 text-[#FFC107]" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">
              Deklarasi Sekolah Anti-Bullying (Perundungan)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Komitmen tegas menciptakan ruang aman dan menyenangkan tanpa diskriminasi, kekerasan verbal, maupun fisik.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">
              Jumat Berkah & Cinta Lingkungan
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Kegiatan keagamaan rutin, doa bersama, serta kerja bakti menjaga kebersihan taman dan lingkungan sekolah.
            </p>
          </div>
        </div>
      </section>

      {/* TATA TERTIB SEKOLAH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-[#0F52BA] font-extrabold text-xs uppercase tracking-wider">
            <BookCheck className="w-4 h-4 text-[#FFC107]" /> Pedoman Perilaku
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            Ringkasan Tata Tertib Siswa SDN 004 Sebatik Tengah
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
            <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm text-[#0F52BA]">1. Kehadiran & Seragam</h3>
              <ul className="space-y-2 list-disc pl-4">
                <li>Siswa wajib hadir paling lambat pukul 07.15 WITA sebelum bel masuk dibunyikan.</li>
                <li>Mengenakan seragam lengkap sesuai jadwal (Merah Putih, Batik Sekolah, Pramuka, Olahraga).</li>
                <li>Membawa perlengkapan alat tulis dan buku pelajaran sesuai jadwal hari berjalan.</li>
              </ul>
            </div>

            <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm text-[#0F52BA]">2. Sikap & Kebersihan</h3>
              <ul className="space-y-2 list-disc pl-4">
                <li>Saling menghormati sesama teman, guru, dan warga sekolah.</li>
                <li>Menjaga kebersihan fasilitas kelas, WC, lapangan, serta membuang sampah pada tempatnya.</li>
                <li>Dilarang membawa barang berbahaya atau perangkat permain luar yang mengganggu konsentrasi belajar.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
