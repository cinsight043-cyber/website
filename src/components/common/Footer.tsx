import React from 'react';
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
  ExternalLink,
  Heart,
  Award
} from 'lucide-react';
import { SchoolProfile } from '../../types';

interface FooterProps {
  profile: SchoolProfile;
  setActiveTab: (tab: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, setActiveTab, onOpenAdmin }) => {
  const handleNav = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t-4 border-[#0F52BA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: School Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center p-1 text-white shadow-md overflow-hidden">
                <img
                  src={profile.logoUrl || "https://i.ibb.co.com/Pvf7Mvwq/Logo-Sekolah.png"}
                  alt={profile.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-white text-base leading-tight">
                  {profile.name}
                </h3>
                <span className="inline-block bg-blue-900/60 text-[#FFC107] text-[10px] font-bold px-2 py-0.5 rounded border border-blue-700/50">
                  Akreditasi {profile.accreditation} • NPSN {profile.npsn}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              "{profile.tagline}"
            </p>

            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs">
              <span className="text-[#FFC107] font-semibold block mb-1">
                Slogan Sekolah:
              </span>
              <p className="text-slate-300 text-[11px] leading-tight">
                {profile.slogan}
              </p>
            </div>

            <div className="text-xs text-[#FFC107] font-bold tracking-wider">
              {profile.hashtag}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-[#FFC107] pl-2.5">
              Tautan Cepat
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { id: 'beranda', label: 'Beranda Utama' },
                { id: 'profil', label: 'Profil & Visi Misi' },
                { id: 'akademik', label: 'Informasi Akademik' },
                { id: 'kesiswaan', label: 'Kesiswaan & Tata Tertib' },
                { id: 'ekstrakurikuler', label: 'Program Ekstrakurikuler' },
                { id: 'berita', label: 'Berita & Informasi Terpadu' },
                { id: 'prestasi', label: 'Prestasi Siswa & Sekolah' },
                { id: 'pengumuman', label: 'Pengumuman Penting' },
                { id: 'galeri', label: 'Galeri Foto Kegiatan' },
                { id: 'spmb', label: 'Pendaftaran SPMB Online' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNav(link.id)}
                    className="hover:text-[#FFC107] transition duration-200 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="text-blue-500">›</span> {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact & Location */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-[#FFC107] pl-2.5">
              Kontak & Lokasi
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-[#FFC107] shrink-0 mt-0.5" />
              <span>{profile.address}, {profile.regency}, {profile.province}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <Phone className="w-4 h-4 text-[#FFC107] shrink-0" />
              <a href={`tel:${profile.phone}`} className="hover:text-white transition">
                {profile.phone}
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <Mail className="w-4 h-4 text-[#FFC107] shrink-0" />
              <a href={`mailto:${profile.email}`} className="hover:text-white transition">
                {profile.email}
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <a
                href={profile.socialMedia.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition"
              >
                WhatsApp Resmi Sekolah
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={() => handleNav('kontak')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FFC107] hover:underline"
              >
                Lihat Peta Lokasi Google Maps <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Col 4: Social Media & Admin */}
          <div className="space-y-4">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-[#FFC107] pl-2.5">
              Media Sosial & Admin
            </h4>
            <p className="text-xs text-slate-400">
              Ikuti dokumentasi kegiatan dan kabar terbaru dari SDN 004 Sebatik Tengah:
            </p>

            <div className="flex items-center gap-2 pt-1">
              {profile.socialMedia.facebook && (
                <a
                  href={profile.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-[#0F52BA] hover:text-white flex items-center justify-center transition text-slate-300"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {profile.socialMedia.instagram && (
                <a
                  href={profile.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-pink-600 hover:text-white flex items-center justify-center transition text-slate-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {profile.socialMedia.youtube && (
                <a
                  href={profile.socialMedia.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-red-600 hover:text-white flex items-center justify-center transition text-slate-300"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
              <a
                href={profile.socialMedia.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition text-slate-300"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={onOpenAdmin}
                className="w-full bg-slate-800 hover:bg-blue-900/80 text-blue-200 border border-slate-700 text-xs py-2.5 px-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Award className="w-4 h-4 text-[#FFC107]" />
                Masuk Dashboard Admin
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <p>© 2026 SDN 004 Sebatik Tengah. All Rights Reserved.</p>
          <div className="flex items-center gap-1 text-slate-400 text-[11px]">
            <span>Dikembangkan dengan</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>untuk Pendidikan Perbatasan Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
