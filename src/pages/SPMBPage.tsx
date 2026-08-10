import React, { useState } from 'react';
import {
  UserCheck,
  CheckCircle2,
  FileText,
  Calendar,
  HelpCircle,
  PhoneCall,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Send,
  Search,
  Check
} from 'lucide-react';
import { SPMBApplication } from '../types';
import { SectionTitle } from '../components/common/SectionTitle';

interface SPMBPageProps {
  onSubmitSPMB: (appData: Omit<SPMBApplication, 'id' | 'registrationNumber' | 'status' | 'createdAt'>) => Promise<SPMBApplication>;
  onCheckStatus?: (query: string) => void;
}

export const SPMBPage: React.FC<SPMBPageProps> = ({ onSubmitSPMB }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<SPMBApplication | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    studentName: '',
    nik: '',
    pob: 'Nunukan',
    dob: '2019-05-10',
    gender: 'Laki-laki' as 'Laki-laki' | 'Perempuan',
    religion: 'Islam',
    parentName: '',
    parentPhone: '',
    address: '',
    previousSchool: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.nik || !formData.parentName || !formData.parentPhone) {
      alert('Mohon lengkapi semua bidang bertanda wajib (*)');
      return;
    }

    setSubmitting(true);
    try {
      const res = await onSubmitSPMB(formData);
      setSubmittedApp(res);
    } catch (err) {
      console.error('Error submitting SPMB:', err);
      alert('Gagal mengirim pendaftaran. Silakan coba lagi.');
    } finally {
      setSubmitting(false);
    }
  };

  const faqs = [
    {
      q: 'Berapa biaya pendaftaran murid baru di SDN 004 Sebatik Tengah?',
      a: 'Pendaftaran Murid Baru (SPMB) di SDN 004 Sebatik Tengah 100% BEBAS BIAYA (GRATIS) tanpa dipungut biaya apapun.'
    },
    {
      q: 'Berapa usia minimal calon peserta didik kelas I SD?',
      a: 'Sesuai aturan Kemendikdasmen, calon peserta didik baru kelas 1 SD berusia minimal 6 (enam) tahun pada tanggal 1 Juli tahun berjalan.'
    },
    {
      q: 'Dokumen apa saja yang harus disiapkan saat daftar ulang?',
      a: 'Dokumen yang diperlukan: 1. Akta Kelahiran (Fotokopi), 2. Kartu Keluarga / KK (Fotokopi), 3. KTP Orang Tua (Fotokopi), 4. Pas foto 3x4 (3 lembar), 5. Ijazah TK/PAUD jika ada.'
    },
    {
      q: 'Apakah bisa mendaftar secara tatap muka (offline) langsung di sekolah?',
      a: 'Bisa. Bapak/Ibu dapat datang langsung ke Sekretariat Panitia SPMB di kampus SDN 004 Sebatik Tengah, Desa Sungai Limau pada jam kerja (08.00 - 12.00 WITA).'
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* HEADER BANNER */}
      <section className="bg-gradient-to-r from-slate-900 via-[#0F52BA] to-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8 rounded-3xl shadow-lg">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="bg-[#FFC107] text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Tahun Ajaran 2026/2027
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Sistem Penerimaan Murid Baru (SPMB)
          </h1>
          <p className="text-sm text-slate-200">
            Gratis Biaya Pendaftaran • Pelayanan Ramah & Mudah untuk Orang Tua
          </p>
        </div>
      </section>

      {/* ALUR PENDAFTARAN ALUR 1-2-3-4 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Langkah Mudah"
          title="Alur Pendaftaran Murid Baru"
          subtitle="Empat tahapan sederhana pendaftaran sekolah di SDN 004 Sebatik Tengah."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0F52BA] text-[#FFC107] font-black text-lg flex items-center justify-center">
              1
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">Isi Formulir</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Lengkapi data calon murid dan orang tua melalui formulir online di halaman ini atau datang ke sekolah.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0F52BA] text-[#FFC107] font-black text-lg flex items-center justify-center">
              2
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">Verifikasi Berkas</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Panitia SPMB memeriksa kelengkapan Kartu Keluarga, Akta Kelahiran, dan data administratif.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0F52BA] text-[#FFC107] font-black text-lg flex items-center justify-center">
              3
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">Pengumuman Hasil</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Status penerimaan disampaikan melalui WhatsApp resmi sekolah dan papan pengumuman.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white font-black text-lg flex items-center justify-center">
              4
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">Daftar Ulang</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Konfirmasi kehadiran dan persiapan seragam serta kelengkapan murid baru.
            </p>
          </div>
        </div>
      </section>

      {/* FORMULIR PENDAFTARAN ONLINE */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border-2 border-[#0F52BA] p-8 shadow-xl space-y-6">
          <div className="border-b border-slate-100 pb-4 text-center space-y-1">
            <span className="bg-blue-100 text-[#0F52BA] text-xs font-bold px-3 py-1 rounded-full uppercase">
              Formulir Pendaftaran SPMB Online
            </span>
            <h2 className="text-2xl font-black text-slate-900">
              Data Calon Peserta Didik Baru
            </h2>
            <p className="text-xs text-slate-500">
              Isi data di bawah dengan benar. Bebas Biaya Pendaftaran.
            </p>
          </div>

          {submittedApp ? (
            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-emerald-900">
                Pendaftaran Berhasil Dikirim!
              </h3>
              <div className="bg-white p-4 rounded-xl text-left border border-emerald-200 space-y-1.5 text-xs text-slate-800 max-w-md mx-auto">
                <p><strong>Nomor Pendaftaran:</strong> <span className="text-[#0F52BA] font-extrabold">{submittedApp.registrationNumber}</span></p>
                <p><strong>Nama Murid:</strong> {submittedApp.studentName}</p>
                <p><strong>Orang Tua / Wali:</strong> {submittedApp.parentName}</p>
                <p><strong>Status:</strong> <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded">{submittedApp.status}</span></p>
              </div>
              <p className="text-xs text-slate-600">
                Simpan nomor pendaftaran di atas. Panitia SPMB akan menghubungi nomor WhatsApp Anda.
              </p>
              <button
                onClick={() => setSubmittedApp(null)}
                className="bg-[#0F52BA] text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-blue-800 transition"
              >
                Isi Formulir Baru
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-800">Nama Lengkap Murid *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Aditya Pratama"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F52BA]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800">NIK Murid (Sesuai KK) *</label>
                  <input
                    type="text"
                    required
                    placeholder="16 digit NIK"
                    value={formData.nik}
                    onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F52BA]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800">Tempat Lahir</label>
                  <input
                    type="text"
                    value={formData.pob}
                    onChange={(e) => setFormData({ ...formData, pob: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F52BA]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800">Tanggal Lahir</label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F52BA]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800">Jenis Kelamin</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F52BA] bg-white"
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800">Nama Orang Tua / Wali *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama ayah / ibu / wali"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F52BA]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800">No. WhatsApp Orang Tua *</label>
                  <input
                    type="tel"
                    required
                    placeholder="08123456789"
                    value={formData.parentPhone}
                    onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F52BA]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800">Asal TK / PAUD (Jika Ada)</label>
                  <input
                    type="text"
                    placeholder="Contoh: TK Pembina Sebatik"
                    value={formData.previousSchool}
                    onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F52BA]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800">Alamat Tempat Tinggal Lengkap *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="RT / RW, Desa Sungai Limau, Sebatik Tengah..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F52BA]"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-[#0F52BA] to-blue-800 text-white font-extrabold text-sm py-3.5 rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-[#FFC107]" />
                {submitting ? 'Mengirim Data...' : 'Kirim Pendaftaran Murid Baru'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <SectionTitle
          badge="Pertanyaan Umum"
          title="Tanya Jawab SPMB (FAQ)"
          subtitle="Jawaban atas pertanyaan yang sering ditanyakan orang tua murid."
        />

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-900 flex justify-between items-center gap-3 cursor-pointer hover:bg-slate-50"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-[#0F52BA]" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-slate-600 border-t border-slate-100 bg-slate-50/50 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
