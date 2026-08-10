import React, { useState, useEffect } from 'react';
import {
  Navbar
} from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Toast, ToastMessage } from './components/common/Toast';
import { Modal } from './components/common/Modal';

// Pages
import { HomePage } from './pages/HomePage';
import { ProfilPage } from './pages/ProfilPage';
import { AkademikPage } from './pages/AkademikPage';
import { KesiswaanPage } from './pages/KesiswaanPage';
import { EkstrakurikulerPage } from './pages/EkstrakurikulerPage';
import { PrestasiPage } from './pages/PrestasiPage';
import { BeritaPage } from './pages/BeritaPage';
import { GaleriPage } from './pages/GaleriPage';
import { BeritaInformasiPage } from './pages/BeritaInformasiPage';
import { SPMBPage } from './pages/SPMBPage';
import { KontakPage } from './pages/KontakPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

// Types & Data Services
import {
  SchoolProfile,
  NewsItem,
  AnnouncementItem,
  TeacherItem,
  AchievementItem,
  ExtracurricularItem,
  GalleryItem,
  SPMBApplication,
  ContactMessage,
  FeedbackItem,
  StudentItem
} from './types';
import { schoolService } from './services/schoolService';
import { initialSchoolProfile } from './data/initialData';
import { Calendar, User, ArrowLeft, Lock, ArrowUp } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('beranda');

  // State data
  const [profile, setProfile] = useState<SchoolProfile>(initialSchoolProfile);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [teachers, setTeachers] = useState<TeacherItem[]>([]);
  const [achievements, setAchievements] = useState<AchievementItem[]>([]);
  const [extracurriculars, setExtracurriculars] = useState<ExtracurricularItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [spmbApps, setSpmbApps] = useState<SPMBApplication[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [students, setStudents] = useState<StudentItem[]>([]);

  // Modals state
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [showAdminLoginModal, setShowAdminLoginModal] = useState<boolean>(false);
  const [showSPMBQuickModal, setShowSPMBQuickModal] = useState<boolean>(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  // Admin login credentials state
  const [adminUsername, setAdminUsername] = useState<string>('');
  const [adminPassword, setAdminPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

  // Toast notification
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Back to top button visibility
  const [showBackToTop, setShowBackToTop] = useState(false);

  const triggerToast = (title: string, message?: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ id: `t-${Date.now()}`, title, message, type });
  };

  const loadAllData = async () => {
    try {
      const p = await schoolService.getSchoolProfile();
      setProfile(p);

      const n = await schoolService.getNews();
      setNews(n);

      const a = await schoolService.getAnnouncements();
      setAnnouncements(a);

      const t = await schoolService.getTeachers();
      setTeachers(t);

      const ach = await schoolService.getAchievements();
      setAchievements(ach);

      const ex = await schoolService.getExtracurriculars();
      setExtracurriculars(ex);

      const g = await schoolService.getGallery();
      setGallery(g);

      const spmb = await schoolService.getSPMBApplications();
      setSpmbApps(spmb);

      const msg = await schoolService.getContactMessages();
      setMessages(msg);

      const fb = await schoolService.getFeedbacks();
      setFeedbacks(fb);

      const std = await schoolService.getStudents();
      setStudents(std);
    } catch (e) {
      console.error('Error loading school data:', e);
    }
  };

  useEffect(() => {
    loadAllData();

    const handleScroll = () => {
      if (window.scrollY > 300) setShowBackToTop(true);
      else setShowBackToTop(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminUsername === 'admin' && adminPassword === 'admin123') {
      setIsAdminLoggedIn(true);
      setShowAdminLoginModal(false);
      setActiveTab('admin');
      triggerToast('Login Berhasil', 'Selamat datang di Portal Administrator SDN 004 Sebatik Tengah', 'success');
      setAdminUsername('');
      setAdminPassword('');
      setLoginError('');
    } else {
      setLoginError('Username atau password salah! (Gunakan demo: admin / admin123)');
    }
  };

  const handleOpenAdmin = () => {
    if (isAdminLoggedIn) {
      setActiveTab('admin');
    } else {
      setShowAdminLoginModal(true);
    }
  };

  const handleSPMBSubmit = async (appData: Omit<SPMBApplication, 'id' | 'registrationNumber' | 'status' | 'createdAt'>) => {
    const res = await schoolService.submitSPMB(appData);
    triggerToast('Pendaftaran Dikirim', `Nomor Pendaftaran: ${res.registrationNumber}`, 'success');
    loadAllData();
    return res;
  };

  const handleContactSubmit = async (msgData: Omit<ContactMessage, 'id' | 'createdAt' | 'isRead'>) => {
    const res = await schoolService.submitContactMessage(msgData);
    triggerToast('Pesan Dikirim', 'Terima kasih telah menghubungi SDN 004 Sebatik Tengah', 'success');
    loadAllData();
    return res;
  };

  const handleFeedbackSubmit = async (fbData: Omit<FeedbackItem, 'id' | 'createdAt'>) => {
    const res = await schoolService.submitFeedback(fbData);
    loadAllData();
    return res;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-[#FFC107] selection:text-slate-900">
      {/* NAVIGATION BAR */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAdmin={handleOpenAdmin}
        onOpenSPMBModal={() => setActiveTab('spmb')}
        logoUrl={profile?.logoUrl}
      />

      {/* PAGE CONTENT ROUTER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'beranda' && (
          <HomePage
            profile={profile}
            news={news}
            announcements={announcements}
            achievements={achievements}
            gallery={gallery}
            feedbacks={feedbacks}
            onSubmitFeedback={handleFeedbackSubmit}
            showToast={triggerToast}
            setActiveTab={setActiveTab}
            onSelectNews={(n) => setSelectedNews(n)}
            onOpenSPMBModal={() => setActiveTab('spmb')}
          />
        )}

        {activeTab === 'profil' && (
          <ProfilPage profile={profile} teachers={teachers} />
        )}

        {activeTab === 'akademik' && (
          <AkademikPage students={students} />
        )}

        {activeTab === 'kesiswaan' && (
          <KesiswaanPage />
        )}

        {activeTab === 'ekstrakurikuler' && (
          <EkstrakurikulerPage extracurriculars={extracurriculars} />
        )}

        {(activeTab === 'berita' || activeTab === 'prestasi' || activeTab === 'pengumuman') && (
          <BeritaInformasiPage
            news={news}
            achievements={achievements}
            announcements={announcements}
            onSelectNews={(n) => setSelectedNews(n)}
            defaultSubTab={
              activeTab === 'prestasi'
                ? 'prestasi'
                : activeTab === 'pengumuman'
                ? 'pengumuman'
                : 'berita'
            }
          />
        )}

        {activeTab === 'galeri' && (
          <GaleriPage gallery={gallery} />
        )}

        {activeTab === 'spmb' && (
          <SPMBPage onSubmitSPMB={handleSPMBSubmit} />
        )}

        {activeTab === 'kontak' && (
          <KontakPage profile={profile} onSubmitMessage={handleContactSubmit} />
        )}

        {activeTab === 'admin' && isAdminLoggedIn && (
          <AdminDashboardPage
            profile={profile}
            news={news}
            announcements={announcements}
            teachers={teachers}
            achievements={achievements}
            extracurriculars={extracurriculars}
            gallery={gallery}
            spmbApps={spmbApps}
            messages={messages}
            students={students}
            onRefreshData={loadAllData}
            onLogout={() => {
              setIsAdminLoggedIn(false);
              setActiveTab('beranda');
              triggerToast('Logout', 'Anda telah keluar dari Portal Admin', 'info');
            }}
            showToast={triggerToast}
          />
        )}
      </main>

      {/* FOOTER */}
      <Footer
        profile={profile}
        setActiveTab={setActiveTab}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* NEWS READER MODAL */}
      <Modal
        isOpen={!!selectedNews}
        onClose={() => setSelectedNews(null)}
        title={selectedNews?.title}
        maxWidth="2xl"
      >
        {selectedNews && (
          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden h-64 bg-slate-100">
              <img
                src={selectedNews.imageUrl}
                alt={selectedNews.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-500 border-b border-slate-100 pb-2">
              <span className="bg-[#0F52BA] text-white font-bold px-2.5 py-0.5 rounded">
                {selectedNews.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#0F52BA]" /> {selectedNews.publishedAt}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#0F52BA]" /> {selectedNews.author}
              </span>
            </div>

            <div className="text-xs sm:text-sm text-slate-800 leading-relaxed space-y-3 font-normal">
              <p className="font-semibold text-slate-900 bg-blue-50 p-3 rounded-xl border border-blue-100">
                {selectedNews.summary}
              </p>
              <p>{selectedNews.content}</p>
            </div>
          </div>
        )}
      </Modal>

      {/* ADMIN LOGIN MODAL */}
      <Modal
        isOpen={showAdminLoginModal}
        onClose={() => setShowAdminLoginModal(false)}
        title="Login Administrator Sekolah"
        maxWidth="md"
      >
        <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
          <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl text-blue-900 leading-relaxed">
            <strong>Kredensial Admin Demo:</strong>
            <br />
            Username: <code className="bg-white px-1 py-0.5 rounded border">admin</code> | Password: <code className="bg-white px-1 py-0.5 rounded border">admin123</code>
          </div>

          {loginError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl font-medium">
              {loginError}
            </div>
          )}

          <div className="space-y-1">
            <label className="font-bold text-slate-800">Username Admin</label>
            <input
              type="text"
              required
              placeholder="Masukkan username admin"
              value={adminUsername}
              onChange={(e) => setAdminUsername(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F52BA]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-800">Password</label>
            <input
              type="password"
              required
              placeholder="Masukkan password admin"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F52BA]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#0F52BA] hover:bg-blue-800 text-white font-extrabold text-xs py-3 rounded-xl transition cursor-pointer flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4 text-[#FFC107]" /> Masuk Dashboard
          </button>
        </form>
      </Modal>

      {/* TOAST NOTIFICATION */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* BACK TO TOP BUTTON */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 left-6 z-40 bg-[#0F52BA] text-white p-3 rounded-2xl shadow-xl hover:bg-blue-800 transition duration-200 cursor-pointer"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5 text-[#FFC107]" />
        </button>
      )}
    </div>
  );
}
