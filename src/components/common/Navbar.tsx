import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Menu,
  X,
  ChevronRight,
  UserCheck,
  PhoneCall,
  Lock,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAdmin: () => void;
  onOpenSPMBModal?: () => void;
  logoUrl?: string;
}

export const navItems = [
  { id: 'beranda', label: 'Beranda' },
  { id: 'profil', label: 'Profil' },
  { id: 'akademik', label: 'Akademik' },
  { id: 'kesiswaan', label: 'Kesiswaan' },
  { id: 'ekstrakurikuler', label: 'Ekstrakurikuler' },
  { id: 'berita', label: 'Berita & Informasi' },
  { id: 'galeri', label: 'Galeri' },
  { id: 'spmb', label: 'SPMB' },
  { id: 'kontak', label: 'Kontak' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAdmin,
  onOpenSPMBModal,
  logoUrl = "https://i.ibb.co.com/Pvf7Mvwq/Logo-Sekolah.png"
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 transition-all duration-300">
      {/* Top Bar Announcement Banner */}
      <div className="bg-gradient-to-r from-[#0F52BA] via-[#0D47A1] to-[#1565C0] text-white py-1.5 px-4 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5 text-center sm:text-left">
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <span className="bg-[#FFC107] text-[#0F52BA] px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
              SPMB 2026/2027
            </span>
            <span>Pendaftaran Murid Baru Bebas Biaya (Gratis) - Desa Sungai Limau, Sebatik Tengah</span>
          </div>
          <div className="flex items-center gap-4 text-slate-200 text-[11px]">
            <a href="tel:+6282154321004" className="hover:text-white transition flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-[#FFC107]" /> +62 821-5432-1004
            </a>
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 hover:text-[#FFC107] transition cursor-pointer font-semibold bg-white/10 px-2 py-0.5 rounded"
            >
              <Lock className="w-3 h-3 text-[#FFC107]" /> Portal Admin
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5 border-b border-slate-100'
            : 'bg-white py-3 border-b border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand Name */}
          <div
            onClick={() => handleNavClick('beranda')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative">
              <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center p-1 shadow-md shadow-blue-500/10 border border-slate-100 group-hover:scale-105 transition duration-300 overflow-hidden">
                <img
                  src={logoUrl}
                  alt="Logo SDN 004 Sebatik Tengah"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-[#FFC107] text-[#0F52BA] rounded-full p-0.5 text-[9px] font-bold">
                <Sparkles className="w-2.5 h-2.5" />
              </div>
            </div>
            <div>
              <h1 className="font-bold text-slate-900 text-base sm:text-lg leading-tight tracking-tight group-hover:text-[#0F52BA] transition">
                SDN 004 Sebatik Tengah
              </h1>
              <p className="text-[11px] text-slate-500 font-medium">
                Mewujudkan Generasi Cerdas & Berkarakter
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                activeTab === item.id ||
                (item.id === 'berita' && (activeTab === 'prestasi' || activeTab === 'pengumuman'));
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#0F52BA] text-white shadow-sm shadow-blue-600/30'
                      : 'text-slate-700 hover:text-[#0F52BA] hover:bg-slate-100/80'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Desktop Right CTA */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => {
                if (onOpenSPMBModal) onOpenSPMBModal();
                else handleNavClick('spmb');
              }}
              className="bg-gradient-to-r from-[#FFC107] to-[#FFA000] text-slate-900 font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-amber-500/20 hover:shadow-lg hover:brightness-105 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-[#0F52BA]" />
              Daftar SPMB
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('spmb')}
              className="bg-[#FFC107] text-slate-900 font-bold text-xs px-3 py-1.5 rounded-lg sm:hidden flex items-center gap-1"
            >
              SPMB
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-[#0F52BA] hover:bg-slate-100 transition focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-1 animate-in slide-in-from-top-2 duration-200 shadow-xl">
            <div className="grid grid-cols-2 gap-1.5 py-2">
              {navItems.map((item) => {
                const isActive =
                  activeTab === item.id ||
                  (item.id === 'berita' && (activeTab === 'prestasi' || activeTab === 'pengumuman'));
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left transition cursor-pointer ${
                      isActive
                        ? 'bg-[#0F52BA] text-white shadow-sm'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#FFC107]" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('spmb')}
                className="w-full bg-gradient-to-r from-[#FFC107] to-[#FFA000] text-slate-900 font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <UserCheck className="w-4 h-4 text-[#0F52BA]" />
                Pendaftaran Murid Baru (SPMB 2026)
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full bg-slate-100 text-slate-700 font-semibold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 hover:bg-slate-200 transition cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-[#0F52BA]" />
                Login Administrator Sekolah
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
