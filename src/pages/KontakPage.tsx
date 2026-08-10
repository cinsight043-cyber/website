import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Send, Clock, Check } from 'lucide-react';
import { SchoolProfile, ContactMessage } from '../types';
import { SectionTitle } from '../components/common/SectionTitle';

interface KontakPageProps {
  profile: SchoolProfile;
  onSubmitMessage: (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'isRead'>) => Promise<ContactMessage>;
}

export const KontakPage: React.FC<KontakPageProps> = ({ profile, onSubmitMessage }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      alert('Mohon isi Nama, No. WhatsApp, dan Pesan.');
      return;
    }

    setSubmitting(true);
    try {
      await onSubmitMessage(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error('Error submitting contact message:', err);
      alert('Gagal mengirim pesan. Silakan coba lagi.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-16 pb-16">
      {/* HEADER BANNER */}
      <section className="bg-gradient-to-r from-slate-900 via-[#0F52BA] to-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8 rounded-3xl shadow-lg">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="bg-[#FFC107] text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Hubungi Kami
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Pusat Informasi & Lokasi Sekolah
          </h1>
          <p className="text-sm text-slate-200">
            {profile.address}, {profile.regency}, {profile.province}
          </p>
        </div>
      </section>

      {/* CONTACT INFO & FORM GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Col - School Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-3">
                Informasi Alamat & Kontak
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0F52BA] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Alamat Sekolah</span>
                    <p className="text-slate-600 mt-0.5">{profile.address}, {profile.regency}, {profile.province}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0F52BA] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Telepon / WhatsApp</span>
                    <a href={`tel:${profile.phone}`} className="text-[#0F52BA] hover:underline">{profile.phone}</a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0F52BA] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Email Resmi</span>
                    <a href={`mailto:${profile.email}`} className="text-[#0F52BA] hover:underline">{profile.email}</a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Jam Pelayanan Tatap Muka</span>
                    <p className="text-slate-600">Senin - Sabtu: 07.30 - 13.00 WITA</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Maps Widget */}
            <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <h4 className="font-bold text-slate-900 text-xs">Lokasi Google Maps</h4>
              <div className="w-full h-56 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative">
                <iframe
                  title="Peta Lokasi SDN 004 Sebatik Tengah"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.5878239012!2d117.84!3d4.13!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3213a483580434ff%3A0x6b45398284712!2sSebatik%20Tengah!5e0!3m2!1sid!2sid!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Right Col - Contact Message Form */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-[#0F52BA] uppercase">Formulir Pesan</span>
              <h3 className="text-xl font-extrabold text-slate-900">Hubungi Sekolah</h3>
              <p className="text-xs text-slate-500">
                Sampaikan pertanyaan, masukan, atau permohonan informasi kepada kami.
              </p>
            </div>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-2">
                <Check className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-emerald-900 text-sm">Pesan Anda Berhasil Terkirim!</h4>
                <p className="text-xs text-slate-600">
                  Terima kasih telah menghubungi SDN 004 Sebatik Tengah. Tim admin kami akan segera merespons.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-[#0F52BA] text-white text-xs font-bold px-4 py-2 rounded-xl mt-2"
                >
                  Kirim Pesan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-800">Nama Lengkap *</label>
                    <input
                      type="text"
                      required
                      placeholder="Nama Anda"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F52BA]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-800">No. WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="08123456789"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F52BA]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800">Email (Opsional)</label>
                  <input
                    type="email"
                    placeholder="email@contoh.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F52BA]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800">Isi Pesan / Pertanyaan *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tuliskan pertanyaan atau tanggapan Anda..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F52BA]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#0F52BA] hover:bg-blue-800 text-white font-extrabold text-xs py-3 rounded-xl transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-[#FFC107]" />
                  {submitting ? 'Sending...' : 'Kirim Pesan Sekarang'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
