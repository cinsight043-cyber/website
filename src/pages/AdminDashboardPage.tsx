import React, { useState } from 'react';
import {
  LayoutDashboard,
  Newspaper,
  Megaphone,
  Users,
  Award,
  Sparkles,
  Image as ImageIcon,
  UserCheck,
  MessageSquare,
  Settings,
  Plus,
  Trash2,
  Edit,
  Save,
  LogOut,
  Database,
  CheckCircle2,
  XCircle,
  Lock,
  Search,
  Eye,
  X,
  PhoneCall,
  Mail,
  User,
  BookOpen,
  Calendar,
  Check,
  Building,
  GraduationCap,
  FileSpreadsheet,
  Upload,
  Download,
  Copy,
  FileText,
  Filter
} from 'lucide-react';
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
  StudentItem
} from '../types';
import { schoolService } from '../services/schoolService';

interface AdminDashboardPageProps {
  profile: SchoolProfile;
  news: NewsItem[];
  announcements: AnnouncementItem[];
  teachers: TeacherItem[];
  achievements: AchievementItem[];
  extracurriculars: ExtracurricularItem[];
  gallery: GalleryItem[];
  spmbApps: SPMBApplication[];
  messages: ContactMessage[];
  students?: StudentItem[];
  onRefreshData: () => void;
  onLogout: () => void;
  showToast: (title: string, message?: string, type?: 'success' | 'error' | 'info') => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  profile,
  news,
  announcements,
  teachers,
  achievements,
  extracurriculars,
  gallery,
  spmbApps,
  messages,
  students = [],
  onRefreshData,
  onLogout,
  showToast
}) => {
  const [activeMenu, setActiveMenu] = useState<
    'overview' | 'news' | 'announcements' | 'teachers' | 'achievements' | 'extracurriculars' | 'gallery' | 'spmb' | 'students' | 'messages' | 'settings'
  >('overview');

  // Search filter inside tables
  const [searchTerm, setSearchTerm] = useState('');

  // Editing state variables
  const [editingNews, setEditingNews] = useState<Partial<NewsItem> | null>(null);
  const [editingAnn, setEditingAnn] = useState<Partial<AnnouncementItem> | null>(null);
  const [editingTeacher, setEditingTeacher] = useState<Partial<TeacherItem> | null>(null);
  const [editingAchievement, setEditingAchievement] = useState<Partial<AchievementItem> | null>(null);
  const [editingExtracurricular, setEditingExtracurricular] = useState<Partial<ExtracurricularItem> | null>(null);
  const [editingGallery, setEditingGallery] = useState<Partial<GalleryItem> | null>(null);
  const [editingSPMB, setEditingSPMB] = useState<Partial<SPMBApplication> | null>(null);
  const [editingStudent, setEditingStudent] = useState<Partial<StudentItem> | null>(null);
  const [showBulkImportModal, setShowBulkImportModal] = useState<boolean>(false);
  const [bulkInputText, setBulkInputText] = useState<string>('');
  const [studentClassFilter, setStudentClassFilter] = useState<string>('Semua Kelas');
  const [studentGenderFilter, setStudentGenderFilter] = useState<string>('semua');
  const [viewingMessage, setViewingMessage] = useState<ContactMessage | null>(null);

  // Settings form
  const [settingsForm, setSettingsForm] = useState<SchoolProfile>(profile);
  const [newMissionText, setNewMissionText] = useState('');
  const [seeding, setSeeding] = useState(false);

  // Filter helper
  const filterList = <T extends Record<string, any>>(items: T[], fields: string[]): T[] => {
    if (!searchTerm.trim()) return items;
    const term = searchTerm.toLowerCase();
    return items.filter(item =>
      fields.some(field => {
        const val = item[field];
        return val && String(val).toLowerCase().includes(term);
      })
    );
  };

  // --- CRUD: BERITA ---
  const handleSaveNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNews?.title || !editingNews?.summary) {
      showToast('Error', 'Judul dan ringkasan berita wajib diisi', 'error');
      return;
    }
    if (editingNews.id) {
      await schoolService.updateNews(editingNews.id, editingNews);
      showToast('Berhasil', 'Berita berhasil diperbarui', 'success');
    } else {
      await schoolService.addNews({
        title: editingNews.title || 'Judul Baru',
        slug: editingNews.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'berita',
        category: editingNews.category || 'Kegiatan Sekolah',
        summary: editingNews.summary || '',
        content: editingNews.content || editingNews.summary || '',
        imageUrl: editingNews.imageUrl || 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80',
        author: editingNews.author || 'Humas SDN 004',
        publishedAt: editingNews.publishedAt || new Date().toISOString().split('T')[0],
        isFeatured: editingNews.isFeatured || false
      });
      showToast('Berhasil', 'Berita baru berhasil ditambahkan', 'success');
    }
    setEditingNews(null);
    onRefreshData();
  };

  const handleDeleteNews = async (id: string, title: string) => {
    if (confirm(`Yakin ingin menghapus berita "${title}"?`)) {
      await schoolService.deleteNews(id);
      showToast('Terhapus', 'Berita telah dihapus', 'info');
      onRefreshData();
    }
  };

  // --- CRUD: PENGUMUMAN ---
  const handleSaveAnn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAnn?.title || !editingAnn?.content) {
      showToast('Error', 'Judul dan isi pengumuman wajib diisi', 'error');
      return;
    }
    if (editingAnn.id) {
      await schoolService.updateAnnouncement(editingAnn.id, editingAnn);
      showToast('Berhasil', 'Pengumuman berhasil diperbarui', 'success');
    } else {
      await schoolService.addAnnouncement({
        title: editingAnn.title || '',
        content: editingAnn.content || '',
        category: editingAnn.category || 'Umum',
        date: editingAnn.date || new Date().toISOString().split('T')[0],
        status: editingAnn.status || 'Aktif',
        isPinned: editingAnn.isPinned || false
      });
      showToast('Berhasil', 'Pengumuman baru berhasil ditambahkan', 'success');
    }
    setEditingAnn(null);
    onRefreshData();
  };

  const handleDeleteAnn = async (id: string, title: string) => {
    if (confirm(`Hapus pengumuman "${title}"?`)) {
      await schoolService.deleteAnnouncement(id);
      showToast('Terhapus', 'Pengumuman telah dihapus', 'info');
      onRefreshData();
    }
  };

  // --- CRUD: GURU & STAF ---
  const handleSaveTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeacher?.name) {
      showToast('Error', 'Nama guru wajib diisi', 'error');
      return;
    }
    if (editingTeacher.id) {
      await schoolService.updateTeacher(editingTeacher.id, editingTeacher);
      showToast('Berhasil', 'Data guru diperbarui', 'success');
    } else {
      await schoolService.addTeacher({
        name: editingTeacher.name || '',
        nip: editingTeacher.nip || '-',
        position: editingTeacher.position || 'Guru Kelas',
        subject: editingTeacher.subject || 'Guru Kelas',
        education: editingTeacher.education || 'S1 Pendidikan',
        imageUrl: editingTeacher.imageUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
      });
      showToast('Berhasil', 'Guru baru ditambahkan', 'success');
    }
    setEditingTeacher(null);
    onRefreshData();
  };

  const handleDeleteTeacher = async (id: string, name: string) => {
    if (confirm(`Hapus data guru "${name}"?`)) {
      await schoolService.deleteTeacher(id);
      showToast('Terhapus', 'Data guru dihapus', 'info');
      onRefreshData();
    }
  };

  // --- CRUD: PRESTASI ---
  const handleSaveAchievement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAchievement?.title || !editingAchievement?.studentName) {
      showToast('Error', 'Judul prestasi dan nama siswa wajib diisi', 'error');
      return;
    }
    if (editingAchievement.id) {
      await schoolService.updateAchievement(editingAchievement.id, editingAchievement);
      showToast('Berhasil', 'Data prestasi diperbarui', 'success');
    } else {
      await schoolService.addAchievement({
        title: editingAchievement.title || '',
        studentName: editingAchievement.studentName || '',
        level: editingAchievement.level || 'Tingkat Kecamatan',
        category: editingAchievement.category || 'Akademik',
        year: editingAchievement.year || new Date().getFullYear().toString(),
        description: editingAchievement.description || '',
        imageUrl: editingAchievement.imageUrl || 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80'
      });
      showToast('Berhasil', 'Prestasi baru berhasil ditambahkan', 'success');
    }
    setEditingAchievement(null);
    onRefreshData();
  };

  const handleDeleteAchievement = async (id: string, title: string) => {
    if (confirm(`Hapus prestasi "${title}"?`)) {
      await schoolService.deleteAchievement(id);
      showToast('Terhapus', 'Data prestasi dihapus', 'info');
      onRefreshData();
    }
  };

  // --- CRUD: EKSTRAKURIKULER ---
  const handleSaveExtracurricular = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExtracurricular?.name) {
      showToast('Error', 'Nama ekstrakurikuler wajib diisi', 'error');
      return;
    }
    if (editingExtracurricular.id) {
      await schoolService.updateExtracurricular(editingExtracurricular.id, editingExtracurricular);
      showToast('Berhasil', 'Data ekstrakurikuler diperbarui', 'success');
    } else {
      await schoolService.addExtracurricular({
        name: editingExtracurricular.name || '',
        category: editingExtracurricular.category || 'Olahraga',
        schedule: editingExtracurricular.schedule || 'Sabtu, 15.00 WITA',
        instructor: editingExtracurricular.instructor || 'Pembina Ekskul',
        description: editingExtracurricular.description || '',
        achievements: editingExtracurricular.achievements || '',
        imageUrl: editingExtracurricular.imageUrl || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80'
      });
      showToast('Berhasil', 'Ekstrakurikuler baru ditambahkan', 'success');
    }
    setEditingExtracurricular(null);
    onRefreshData();
  };

  const handleDeleteExtracurricular = async (id: string, name: string) => {
    if (confirm(`Hapus ekskul "${name}"?`)) {
      await schoolService.deleteExtracurricular(id);
      showToast('Terhapus', 'Data ekskul dihapus', 'info');
      onRefreshData();
    }
  };

  // --- CRUD: GALERI ---
  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGallery?.title || !editingGallery?.imageUrl) {
      showToast('Error', 'Judul dan URL foto galeri wajib diisi', 'error');
      return;
    }
    if (editingGallery.id) {
      await schoolService.updateGalleryItem(editingGallery.id, editingGallery);
      showToast('Berhasil', 'Foto galeri diperbarui', 'success');
    } else {
      await schoolService.addGalleryItem({
        title: editingGallery.title || '',
        category: editingGallery.category || 'Pembelajaran',
        imageUrl: editingGallery.imageUrl || '',
        date: editingGallery.date || new Date().toISOString().split('T')[0],
        description: editingGallery.description || ''
      });
      showToast('Berhasil', 'Foto galeri baru ditambahkan', 'success');
    }
    setEditingGallery(null);
    onRefreshData();
  };

  const handleDeleteGallery = async (id: string, title: string) => {
    if (confirm(`Hapus foto "${title}" dari galeri?`)) {
      await schoolService.deleteGalleryItem(id);
      showToast('Terhapus', 'Foto dihapus dari galeri', 'info');
      onRefreshData();
    }
  };

  // --- CRUD: SPMB APPLICATION ---
  const handleSaveSPMB = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSPMB?.studentName || !editingSPMB?.parentName) {
      showToast('Error', 'Nama murid dan nama orang tua wajib diisi', 'error');
      return;
    }
    if (editingSPMB.id) {
      await schoolService.updateSPMBStatus(editingSPMB.id, editingSPMB.status || 'Menunggu Verifikasi');
      showToast('Berhasil', 'Pendaftaran SPMB diperbarui', 'success');
    } else {
      await schoolService.submitSPMB({
        studentName: editingSPMB.studentName || '',
        nik: editingSPMB.nik || '6503020000000000',
        pob: editingSPMB.pob || 'Sebatik',
        dob: editingSPMB.dob || '2017-05-12',
        gender: editingSPMB.gender || 'Laki-laki',
        religion: editingSPMB.religion || 'Islam',
        parentName: editingSPMB.parentName || '',
        parentPhone: editingSPMB.parentPhone || '08123456789',
        address: editingSPMB.address || 'Sebatik Tengah',
        previousSchool: editingSPMB.previousSchool || 'TK / PAUD Local'
      });
      showToast('Berhasil', 'Pendaftar baru berhasil dibuat secara manual', 'success');
    }
    setEditingSPMB(null);
    onRefreshData();
  };

  const handleDeleteSPMB = async (id: string, name: string) => {
    if (confirm(`Hapus pendaftaran murid "${name}"?`)) {
      await schoolService.deleteSPMBApplication(id);
      showToast('Terhapus', 'Pendaftaran SPMB dihapus', 'info');
      onRefreshData();
    }
  };

  const handleUpdateSPMBStatus = async (id: string, status: SPMBApplication['status']) => {
    await schoolService.updateSPMBStatus(id, status);
    showToast('Status Diperbarui', `Status pendaftaran diubah menjadi "${status}"`, 'success');
    onRefreshData();
  };

  // --- CRUD: DATA SISWA (AKADEMIK) ---
  const handleSaveStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent?.name || !editingStudent?.nisn) {
      showToast('Error', 'Nama lengkap siswa dan NISN wajib diisi', 'error');
      return;
    }
    if (editingStudent.id) {
      await schoolService.updateStudent(editingStudent.id, editingStudent);
      showToast('Berhasil', 'Data siswa berhasil diperbarui', 'success');
    } else {
      await schoolService.addStudent({
        nisn: editingStudent.nisn || '',
        name: editingStudent.name || '',
        gender: editingStudent.gender || 'Laki-laki',
        grade: editingStudent.grade || 'Kelas 1',
        homeroomTeacher: editingStudent.homeroomTeacher || 'Nurhayati, S.Pd.',
        extracurricular: editingStudent.extracurricular || '',
        status: editingStudent.status || 'Aktif',
        birthPlaceDate: editingStudent.birthPlaceDate || 'Sebatik, 01 Januari 2018'
      });
      showToast('Berhasil', 'Data siswa baru berhasil ditambahkan', 'success');
    }
    setEditingStudent(null);
    onRefreshData();
  };

  const handleDeleteStudent = async (id: string, name: string) => {
    if (confirm(`Hapus data siswa "${name}" dari sistem?`)) {
      await schoolService.deleteStudent(id);
      showToast('Terhapus', 'Data siswa telah dihapus', 'info');
      onRefreshData();
    }
  };

  const handleLoadTemplateExample = () => {
    const sampleCSV = `NISN,Nama,JenisKelamin,Kelas,WaliKelas,Ekstrakurikuler,TempatTglLahir
0178923091,Ahmad Rifai,Laki-laki,Kelas 1,Nurhayati S.Pd.,Coding & AI Kids,Sebatik 12 Jan 2019
0178923092,Siti Aminah,Perempuan,Kelas 1,Nurhayati S.Pd.,Sanggar Seni,Nunukan 15 Maret 2019
0178923093,Muhammad Syahrul,Laki-laki,Kelas 2,Masitah S.Pd.I.,Bulutangkis,Tarakan 08 April 2018
0178923094,Nur Aini Zahra,Perempuan,Kelas 3,Jumarni S.Pd.,Pramuka,Sebatik 20 Mei 2017
0178923095,Bagas Pratama,Laki-laki,Kelas 4,Dwi Rahayu S.Kom.,Coding & Scratch,Sebatik 11 Juni 2016`;
    setBulkInputText(sampleCSV);
  };

  const handleBulkImportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkInputText.trim()) {
      showToast('Error', 'Teks data template / CSV masih kosong', 'error');
      return;
    }

    const lines = bulkInputText.trim().split('\n');
    const studentList: Omit<StudentItem, 'id'>[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line || line.toLowerCase().startsWith('nisn')) continue; // skip header

      const parts = line.split(/[,;\t]/).map(p => p.trim());
      if (parts.length >= 2) {
        const nisn = parts[0] || `017${Math.floor(1000000 + Math.random() * 9000000)}`;
        const name = parts[1] || 'Siswa Baru';
        const genderRaw = parts[2] ? parts[2].toLowerCase() : 'laki-laki';
        const gender: 'Laki-laki' | 'Perempuan' =
          genderRaw.includes('p') || genderRaw.includes('perempuan') ? 'Perempuan' : 'Laki-laki';
        const gradeRaw = parts[3] || 'Kelas 1';
        let grade: StudentItem['grade'] = 'Kelas 1';
        if (gradeRaw.includes('2')) grade = 'Kelas 2';
        else if (gradeRaw.includes('3')) grade = 'Kelas 3';
        else if (gradeRaw.includes('4')) grade = 'Kelas 4';
        else if (gradeRaw.includes('5')) grade = 'Kelas 5';
        else if (gradeRaw.includes('6')) grade = 'Kelas 6';

        const homeroomTeacher = parts[4] || 'Wali Kelas SDN 004';
        const extracurricular = parts[5] || 'Pramuka';
        const birthPlaceDate = parts[6] || 'Sebatik, 01 Januari 2018';

        studentList.push({
          nisn,
          name,
          gender,
          grade,
          homeroomTeacher,
          extracurricular,
          status: 'Aktif',
          birthPlaceDate
        });
      }
    }

    if (studentList.length === 0) {
      showToast('Error', 'Format data tidak valid. Pastikan dipisahkan koma atau tab.', 'error');
      return;
    }

    await schoolService.bulkAddStudents(studentList);
    showToast('Import Berhasil!', `Berhasil mengimport ${studentList.length} data siswa dari template.`, 'success');
    setShowBulkImportModal(false);
    setBulkInputText('');
    onRefreshData();
  };

  // --- CRUD: CONTACT MESSAGES ---
  const handleMarkMessageRead = async (msg: ContactMessage) => {
    if (msg.id && !msg.isRead) {
      await schoolService.markMessageRead(msg.id);
      showToast('Dibaca', 'Pesan telah ditandai sebagai dibaca', 'info');
      onRefreshData();
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (confirm('Hapus pesan kontak ini?')) {
      await schoolService.deleteContactMessage(id);
      showToast('Terhapus', 'Pesan kontak dihapus', 'info');
      onRefreshData();
    }
  };

  // --- SETTINGS FORM HANDLERS ---
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await schoolService.updateSchoolProfile(settingsForm);
    showToast('Disimpan', 'Profil dan informasi sekolah berhasil diperbarui di Firestore & Local', 'success');
    onRefreshData();
  };

  const handleAddMissionPoint = () => {
    if (newMissionText.trim()) {
      setSettingsForm({
        ...settingsForm,
        mission: [...settingsForm.mission, newMissionText.trim()]
      });
      setNewMissionText('');
    }
  };

  const handleRemoveMissionPoint = (index: number) => {
    const updated = settingsForm.mission.filter((_, i) => i !== index);
    setSettingsForm({ ...settingsForm, mission: updated });
  };

  // Seed data handler
  const handleSeedFirebase = async () => {
    if (confirm('Ingin menyinkronkan data lengkap SDN 004 Sebatik Tengah ke Cloud Firestore?')) {
      setSeeding(true);
      const ok = await schoolService.seedInitialDataToFirestore();
      setSeeding(false);
      if (ok) {
        showToast('Sukses Sync!', 'Seluruh koleksi data sekolah telah disimpan di Cloud Firestore', 'success');
        onRefreshData();
      } else {
        showToast('Gagal Sync', 'Periksa koneksi atau aturan Firestore', 'error');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col xl:flex-row rounded-3xl overflow-hidden border border-slate-200 shadow-xl my-4">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full xl:w-72 bg-slate-900 text-white p-5 flex flex-col justify-between shrink-0 border-r border-slate-800">
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-[#0F52BA] text-[#FFC107] flex items-center justify-center font-bold shadow-md">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-sm text-white leading-tight">Portal Admin Terpadu</h2>
              <p className="text-[11px] text-slate-400">SDN 004 Sebatik Tengah</p>
            </div>
          </div>

          <nav className="space-y-1 text-xs font-semibold">
            {[
              { id: 'overview', label: 'Dashboard Ringkasan', icon: <LayoutDashboard className="w-4 h-4" /> },
              { id: 'news', label: 'Kelola Berita & Artikel', icon: <Newspaper className="w-4 h-4" />, count: news.length },
              { id: 'announcements', label: 'Kelola Pengumuman', icon: <Megaphone className="w-4 h-4" />, count: announcements.length },
              { id: 'teachers', label: 'Kelola Guru & Staf', icon: <Users className="w-4 h-4" />, count: teachers.length },
              { id: 'achievements', label: 'Kelola Prestasi', icon: <Award className="w-4 h-4" />, count: achievements.length },
              { id: 'extracurriculars', label: 'Kelola Ekskul', icon: <Sparkles className="w-4 h-4" />, count: extracurriculars.length },
              { id: 'gallery', label: 'Kelola Galeri Foto', icon: <ImageIcon className="w-4 h-4" />, count: gallery.length },
              { id: 'spmb', label: 'Pendaftaran SPMB', icon: <UserCheck className="w-4 h-4" />, count: spmbApps.length },
              { id: 'students', label: 'Kelola Data Siswa', icon: <GraduationCap className="w-4 h-4" />, count: students.length },
              { id: 'messages', label: 'Pesan Masuk', icon: <MessageSquare className="w-4 h-4" />, count: messages.filter(m => !m.isRead).length },
              { id: 'settings', label: 'Profil & Settings', icon: <Settings className="w-4 h-4" /> },
            ].map((menu) => (
              <button
                key={menu.id}
                onClick={() => {
                  setActiveMenu(menu.id as any);
                  setSearchTerm('');
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition cursor-pointer ${
                  activeMenu === menu.id
                    ? 'bg-[#0F52BA] text-white font-bold shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {menu.icon}
                  <span>{menu.label}</span>
                </div>
                {menu.count !== undefined && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      activeMenu === menu.id ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {menu.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-800">
          <button
            onClick={onLogout}
            className="w-full bg-rose-900/60 hover:bg-rose-900 text-rose-200 text-xs font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> Keluar dari Admin
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 bg-slate-50 p-6 md:p-8 overflow-y-auto min-h-[700px]">
        {/* OVERVIEW MODULE */}
        {activeMenu === 'overview' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Selamat Datang, Admin Portal</h1>
                <p className="text-xs text-slate-500 mt-1">
                  Kelola seluruh data informasi, berita, guru, pengumuman, SPMB, dan pengaturan SDN 004 Sebatik Tengah secara real-time.
                </p>
              </div>

              <button
                onClick={handleSeedFirebase}
                disabled={seeding}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer shadow-md shrink-0"
              >
                <Database className="w-4 h-4 text-[#FFC107]" />
                {seeding ? 'Proses Sinkronisasi...' : 'Sinkronkan Data ke Cloud Firestore'}
              </button>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div
                onClick={() => setActiveMenu('news')}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-400 cursor-pointer transition space-y-1"
              >
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider">Berita & Artikel</span>
                  <Newspaper className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-3xl font-black text-slate-900">{news.length}</p>
                <p className="text-[11px] text-blue-600 font-bold">Klik untuk kelola berita &rarr;</p>
              </div>

              <div
                onClick={() => setActiveMenu('announcements')}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-amber-400 cursor-pointer transition space-y-1"
              >
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider">Pengumuman</span>
                  <Megaphone className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-3xl font-black text-[#0F52BA]">{announcements.length}</p>
                <p className="text-[11px] text-amber-600 font-bold">Klik untuk kelola pengumuman &rarr;</p>
              </div>

              <div
                onClick={() => setActiveMenu('spmb')}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-400 cursor-pointer transition space-y-1"
              >
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider">Pendaftar SPMB</span>
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-3xl font-black text-emerald-700">{spmbApps.length}</p>
                <p className="text-[11px] text-emerald-600 font-bold">
                  {spmbApps.filter(a => a.status === 'Menunggu Verifikasi').length} perlu verifikasi &rarr;
                </p>
              </div>

              <div
                onClick={() => setActiveMenu('messages')}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-purple-400 cursor-pointer transition space-y-1"
              >
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider">Pesan Masuk</span>
                  <MessageSquare className="w-4 h-4 text-purple-600" />
                </div>
                <p className="text-3xl font-black text-purple-900">{messages.length}</p>
                <p className="text-[11px] text-purple-600 font-bold">
                  {messages.filter(m => !m.isRead).length} pesan baru &rarr;
                </p>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#0F52BA]" /> Tambah Data Cepat (Aksi Kilat Admin)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
                <button
                  onClick={() => {
                    setActiveMenu('news');
                    setEditingNews({ title: '', summary: '', content: '', category: 'Kegiatan Sekolah' });
                  }}
                  className="p-3 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-2xl font-bold flex flex-col items-center gap-2 transition cursor-pointer text-center"
                >
                  <Newspaper className="w-5 h-5 text-blue-600" />
                  + Berita Baru
                </button>

                <button
                  onClick={() => {
                    setActiveMenu('announcements');
                    setEditingAnn({ title: '', content: '', category: 'Umum', status: 'Aktif' });
                  }}
                  className="p-3 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-2xl font-bold flex flex-col items-center gap-2 transition cursor-pointer text-center"
                >
                  <Megaphone className="w-5 h-5 text-amber-600" />
                  + Pengumuman
                </button>

                <button
                  onClick={() => {
                    setActiveMenu('teachers');
                    setEditingTeacher({ name: '', position: 'Guru Kelas', subject: 'Guru Kelas' });
                  }}
                  className="p-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-2xl font-bold flex flex-col items-center gap-2 transition cursor-pointer text-center"
                >
                  <Users className="w-5 h-5 text-emerald-600" />
                  + Guru / Staf
                </button>

                <button
                  onClick={() => {
                    setActiveMenu('achievements');
                    setEditingAchievement({ title: '', studentName: '', level: 'Tingkat Kecamatan', category: 'Akademik' });
                  }}
                  className="p-3 bg-purple-50 hover:bg-purple-100 text-purple-900 rounded-2xl font-bold flex flex-col items-center gap-2 transition cursor-pointer text-center"
                >
                  <Award className="w-5 h-5 text-purple-600" />
                  + Prestasi
                </button>

                <button
                  onClick={() => {
                    setActiveMenu('extracurriculars');
                    setEditingExtracurricular({ name: '', category: 'Olahraga' });
                  }}
                  className="p-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 rounded-2xl font-bold flex flex-col items-center gap-2 transition cursor-pointer text-center"
                >
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                  + Ekstrakurikuler
                </button>

                <button
                  onClick={() => {
                    setActiveMenu('gallery');
                    setEditingGallery({ title: '', category: 'Pembelajaran' });
                  }}
                  className="p-3 bg-pink-50 hover:bg-pink-100 text-pink-900 rounded-2xl font-bold flex flex-col items-center gap-2 transition cursor-pointer text-center"
                >
                  <ImageIcon className="w-5 h-5 text-pink-600" />
                  + Foto Galeri
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- MENU: BERITA & ARTIKEL --- */}
        {activeMenu === 'news' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Kelola Berita & Artikel</h2>
                <p className="text-xs text-slate-500">Tambah, sunting, dan hapus berita sekolah.</p>
              </div>
              <button
                onClick={() => setEditingNews({ title: '', summary: '', content: '', category: 'Kegiatan Sekolah' })}
                className="bg-[#0F52BA] hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" /> Tambah Berita Baru
              </button>
            </div>

            {/* Editor Modal/Form */}
            {editingNews && (
              <form onSubmit={handleSaveNews} className="bg-white p-6 rounded-3xl border border-blue-300 space-y-4 text-xs shadow-xl animate-in fade-in">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="font-extrabold text-sm text-slate-900">
                    {editingNews.id ? 'Edit Berita' : 'Tambah Berita Baru'}
                  </h3>
                  <button type="button" onClick={() => setEditingNews(null)} className="text-slate-400 hover:text-slate-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Judul Berita *</label>
                    <input
                      type="text"
                      required
                      value={editingNews.title || ''}
                      onChange={(e) => setEditingNews({ ...editingNews, title: e.target.value })}
                      placeholder="Contoh: Siswa SDN 004 Meraih Medali Emas"
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Kategori</label>
                    <select
                      value={editingNews.category || 'Kegiatan Sekolah'}
                      onChange={(e) => setEditingNews({ ...editingNews, category: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                    >
                      <option value="Kegiatan Sekolah">Kegiatan Sekolah</option>
                      <option value="Prestasi">Prestasi</option>
                      <option value="Akademik">Akademik</option>
                      <option value="Teknologi & Coding">Teknologi & Coding</option>
                      <option value="Ekstrakurikuler">Ekstrakurikuler</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Ringkasan Singkat *</label>
                  <input
                    type="text"
                    required
                    value={editingNews.summary || ''}
                    onChange={(e) => setEditingNews({ ...editingNews, summary: e.target.value })}
                    placeholder="Ringkasan 1-2 kalimat untuk kartu berita..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Isi Berita Lengkap</label>
                  <textarea
                    rows={5}
                    value={editingNews.content || ''}
                    onChange={(e) => setEditingNews({ ...editingNews, content: e.target.value })}
                    placeholder="Tuliskan isi berita lengkap di sini..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">URL Gambar Header</label>
                    <input
                      type="text"
                      value={editingNews.imageUrl || ''}
                      onChange={(e) => setEditingNews({ ...editingNews, imageUrl: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Penulis / Sumber</label>
                    <input
                      type="text"
                      value={editingNews.author || 'Humas SDN 004'}
                      onChange={(e) => setEditingNews({ ...editingNews, author: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Tanggal Terbit</label>
                    <input
                      type="date"
                      value={editingNews.publishedAt || new Date().toISOString().split('T')[0]}
                      onChange={(e) => setEditingNews({ ...editingNews, publishedAt: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={editingNews.isFeatured || false}
                    onChange={(e) => setEditingNews({ ...editingNews, isFeatured: e.target.checked })}
                    className="rounded text-blue-600"
                  />
                  <label htmlFor="isFeatured" className="font-bold text-slate-700 cursor-pointer">
                    Jadikan Berita Utama / Highlight (Featured)
                  </label>
                </div>

                <div className="flex gap-2 pt-3 border-t border-slate-100">
                  <button type="submit" className="bg-[#0F52BA] text-white font-extrabold px-5 py-2.5 rounded-xl cursor-pointer">
                    Simpan Berita
                  </button>
                  <button type="button" onClick={() => setEditingNews(null)} className="bg-slate-200 text-slate-700 font-bold px-5 py-2.5 rounded-xl cursor-pointer">
                    Batal
                  </button>
                </div>
              </form>
            )}

            {/* Filter Search */}
            <div className="relative max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Cari berita..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* News Table */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 uppercase font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Gambar</th>
                    <th className="p-3.5">Judul</th>
                    <th className="p-3.5">Kategori</th>
                    <th className="p-3.5">Tanggal</th>
                    <th className="p-3.5 text-right">Aksi (Edit / Hapus)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filterList(news, ['title', 'category', 'summary']).map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition">
                      <td className="p-3.5 w-16">
                        <img src={item.imageUrl} alt={item.title} className="w-12 h-10 object-cover rounded-lg border border-slate-200" />
                      </td>
                      <td className="p-3.5 font-bold text-slate-900 max-w-xs">
                        {item.title}
                        {item.isFeatured && (
                          <span className="ml-2 bg-amber-100 text-amber-900 font-extrabold text-[9px] px-1.5 py-0.5 rounded">
                            UTAMA
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 text-slate-600 font-semibold">{item.category}</td>
                      <td className="p-3.5 text-slate-500">{item.publishedAt}</td>
                      <td className="p-3.5 text-right space-x-1">
                        <button
                          onClick={() => setEditingNews(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition inline-flex items-center gap-1 font-bold"
                          title="Edit Berita"
                        >
                          <Edit className="w-4 h-4" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteNews(item.id, item.title)}
                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition inline-flex items-center gap-1 font-bold"
                          title="Hapus Berita"
                        >
                          <Trash2 className="w-4 h-4" /> Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                  {news.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-400">
                        Belum ada berita tersimpan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- MENU: PENGUMUMAN --- */}
        {activeMenu === 'announcements' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Kelola Pengumuman Sekolah</h2>
                <p className="text-xs text-slate-500">Tambah, sunting, dan hapus pengumuman resmi.</p>
              </div>
              <button
                onClick={() => setEditingAnn({ title: '', content: '', category: 'Umum', status: 'Aktif' })}
                className="bg-[#0F52BA] hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" /> Tambah Pengumuman Baru
              </button>
            </div>

            {/* Announcement Form Editor */}
            {editingAnn && (
              <form onSubmit={handleSaveAnn} className="bg-white p-6 rounded-3xl border border-amber-300 space-y-4 text-xs shadow-xl animate-in fade-in">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="font-extrabold text-sm text-slate-900">
                    {editingAnn.id ? 'Edit Pengumuman' : 'Tambah Pengumuman Baru'}
                  </h3>
                  <button type="button" onClick={() => setEditingAnn(null)} className="text-slate-400 hover:text-slate-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Judul Pengumuman *</label>
                    <input
                      type="text"
                      required
                      value={editingAnn.title || ''}
                      onChange={(e) => setEditingAnn({ ...editingAnn, title: e.target.value })}
                      placeholder="Contoh: Pengumuman Libur Hari Raya"
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Kategori</label>
                    <select
                      value={editingAnn.category || 'Umum'}
                      onChange={(e) => setEditingAnn({ ...editingAnn, category: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500"
                    >
                      <option value="Umum">Umum</option>
                      <option value="Akademik">Akademik</option>
                      <option value="SPMB">SPMB</option>
                      <option value="Penting">Penting / Urgent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Isi Pengumuman Lengkap *</label>
                  <textarea
                    rows={4}
                    required
                    value={editingAnn.content || ''}
                    onChange={(e) => setEditingAnn({ ...editingAnn, content: e.target.value })}
                    placeholder="Tuliskan rincian pengumuman di sini..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Tanggal Pengumuman</label>
                    <input
                      type="date"
                      value={editingAnn.date || new Date().toISOString().split('T')[0]}
                      onChange={(e) => setEditingAnn({ ...editingAnn, date: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Status Publikasi</label>
                    <select
                      value={editingAnn.status || 'Aktif'}
                      onChange={(e) => setEditingAnn({ ...editingAnn, status: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500"
                    >
                      <option value="Aktif">Aktif</option>
                      <option value="Arsip">Arsip</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="isPinned"
                    checked={editingAnn.isPinned || false}
                    onChange={(e) => setEditingAnn({ ...editingAnn, isPinned: e.target.checked })}
                    className="rounded text-amber-600"
                  />
                  <label htmlFor="isPinned" className="font-bold text-slate-700 cursor-pointer">
                    Sematkan di Atas (Pinned Announcement)
                  </label>
                </div>

                <div className="flex gap-2 pt-3 border-t border-slate-100">
                  <button type="submit" className="bg-[#0F52BA] text-white font-extrabold px-5 py-2.5 rounded-xl cursor-pointer">
                    Simpan Pengumuman
                  </button>
                  <button type="button" onClick={() => setEditingAnn(null)} className="bg-slate-200 text-slate-700 font-bold px-5 py-2.5 rounded-xl cursor-pointer">
                    Batal
                  </button>
                </div>
              </form>
            )}

            {/* Filter Search */}
            <div className="relative max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Cari pengumuman..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Announcements Table */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 uppercase font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Judul</th>
                    <th className="p-3.5">Kategori</th>
                    <th className="p-3.5">Tanggal</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Aksi (Edit / Hapus)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filterList(announcements, ['title', 'category', 'content']).map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition">
                      <td className="p-3.5 font-bold text-slate-900">
                        {item.title}
                        {item.isPinned && (
                          <span className="ml-2 bg-amber-100 text-amber-900 font-extrabold text-[9px] px-1.5 py-0.5 rounded">
                            PINNED
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 text-slate-600 font-semibold">{item.category}</td>
                      <td className="p-3.5 text-slate-500">{item.date}</td>
                      <td className="p-3.5">
                        <span
                          className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                            item.status === 'Aktif' ? 'bg-emerald-100 text-emerald-900' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right space-x-1">
                        <button
                          onClick={() => setEditingAnn(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition inline-flex items-center gap-1 font-bold"
                          title="Edit Pengumuman"
                        >
                          <Edit className="w-4 h-4" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteAnn(item.id, item.title)}
                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition inline-flex items-center gap-1 font-bold"
                          title="Hapus Pengumuman"
                        >
                          <Trash2 className="w-4 h-4" /> Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                  {announcements.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-400">
                        Belum ada pengumuman tersimpan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- MENU: GURU & STAF --- */}
        {activeMenu === 'teachers' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Kelola Guru & Tenaga Kependidikan</h2>
                <p className="text-xs text-slate-500">Tambah, edit, dan hapus profil guru serta staf sekolah.</p>
              </div>
              <button
                onClick={() => setEditingTeacher({ name: '', nip: '-', position: 'Guru Kelas', subject: 'Guru Kelas' })}
                className="bg-[#0F52BA] hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" /> Tambah Guru Baru
              </button>
            </div>

            {/* Teacher Form Editor */}
            {editingTeacher && (
              <form onSubmit={handleSaveTeacher} className="bg-white p-6 rounded-3xl border border-emerald-300 space-y-4 text-xs shadow-xl animate-in fade-in">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="font-extrabold text-sm text-slate-900">
                    {editingTeacher.id ? 'Edit Data Guru' : 'Tambah Guru / Staf Baru'}
                  </h3>
                  <button type="button" onClick={() => setEditingTeacher(null)} className="text-slate-400 hover:text-slate-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Nama Lengkap & Gelar *</label>
                    <input
                      type="text"
                      required
                      value={editingTeacher.name || ''}
                      onChange={(e) => setEditingTeacher({ ...editingTeacher, name: e.target.value })}
                      placeholder="Contoh: Ahmad Subagyo, S.Pd."
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">NIP / NUPTK</label>
                    <input
                      type="text"
                      value={editingTeacher.nip || ''}
                      onChange={(e) => setEditingTeacher({ ...editingTeacher, nip: e.target.value })}
                      placeholder="19850112 201001 1 002"
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Jabatan / Posisi</label>
                    <input
                      type="text"
                      value={editingTeacher.position || ''}
                      onChange={(e) => setEditingTeacher({ ...editingTeacher, position: e.target.value })}
                      placeholder="Guru Kelas / Kepala Sekolah"
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Mata Pelajaran / Tugas</label>
                    <input
                      type="text"
                      value={editingTeacher.subject || ''}
                      onChange={(e) => setEditingTeacher({ ...editingTeacher, subject: e.target.value })}
                      placeholder="Guru Kelas IV / PJOK / Agama"
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Pendidikan Terakhir</label>
                    <input
                      type="text"
                      value={editingTeacher.education || ''}
                      onChange={(e) => setEditingTeacher({ ...editingTeacher, education: e.target.value })}
                      placeholder="S1 Pendidikan Guru Sekolah Dasar"
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">URL Foto Profil</label>
                  <input
                    type="text"
                    value={editingTeacher.imageUrl || ''}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, imageUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="flex gap-2 pt-3 border-t border-slate-100">
                  <button type="submit" className="bg-[#0F52BA] text-white font-extrabold px-5 py-2.5 rounded-xl cursor-pointer">
                    Simpan Data Guru
                  </button>
                  <button type="button" onClick={() => setEditingTeacher(null)} className="bg-slate-200 text-slate-700 font-bold px-5 py-2.5 rounded-xl cursor-pointer">
                    Batal
                  </button>
                </div>
              </form>
            )}

            {/* Filter Search */}
            <div className="relative max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Cari nama guru, NIP, atau mata pelajaran..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Teacher Table */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 uppercase font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Foto</th>
                    <th className="p-3.5">Nama Guru</th>
                    <th className="p-3.5">NIP</th>
                    <th className="p-3.5">Jabatan / Mapel</th>
                    <th className="p-3.5 text-right">Aksi (Edit / Hapus)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filterList(teachers, ['name', 'nip', 'position', 'subject']).map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition">
                      <td className="p-3.5 w-14">
                        <img src={item.imageUrl} alt={item.name} className="w-10 h-10 object-cover rounded-full border border-slate-200" />
                      </td>
                      <td className="p-3.5 font-bold text-slate-900">{item.name}</td>
                      <td className="p-3.5 text-slate-500 font-mono text-[11px]">{item.nip}</td>
                      <td className="p-3.5 text-slate-600">
                        <span className="font-bold">{item.position}</span>
                        {item.subject && <span className="block text-[11px] text-slate-400">{item.subject}</span>}
                      </td>
                      <td className="p-3.5 text-right space-x-1">
                        <button
                          onClick={() => setEditingTeacher(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition inline-flex items-center gap-1 font-bold"
                          title="Edit Guru"
                        >
                          <Edit className="w-4 h-4" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTeacher(item.id, item.name)}
                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition inline-flex items-center gap-1 font-bold"
                          title="Hapus Guru"
                        >
                          <Trash2 className="w-4 h-4" /> Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                  {teachers.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-400">
                        Belum ada data guru tersimpan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- MENU: PRESTASI --- */}
        {activeMenu === 'achievements' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Kelola Prestasi Siswa & Sekolah</h2>
                <p className="text-xs text-slate-500">Tambah, edit, dan hapus rekam jejak prestasi siswa.</p>
              </div>
              <button
                onClick={() => setEditingAchievement({ title: '', studentName: '', level: 'Tingkat Kecamatan', category: 'Akademik' })}
                className="bg-[#0F52BA] hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" /> Tambah Prestasi Baru
              </button>
            </div>

            {/* Form Editor Prestasi */}
            {editingAchievement && (
              <form onSubmit={handleSaveAchievement} className="bg-white p-6 rounded-3xl border border-purple-300 space-y-4 text-xs shadow-xl animate-in fade-in">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="font-extrabold text-sm text-slate-900">
                    {editingAchievement.id ? 'Edit Data Prestasi' : 'Tambah Prestasi Baru'}
                  </h3>
                  <button type="button" onClick={() => setEditingAchievement(null)} className="text-slate-400 hover:text-slate-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Judul Prestasi / Juara *</label>
                    <input
                      type="text"
                      required
                      value={editingAchievement.title || ''}
                      onChange={(e) => setEditingAchievement({ ...editingAchievement, title: e.target.value })}
                      placeholder="Juara 1 Lomba Cerdas Cermat"
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Nama Siswa / Tim *</label>
                    <input
                      type="text"
                      required
                      value={editingAchievement.studentName || ''}
                      onChange={(e) => setEditingAchievement({ ...editingAchievement, studentName: e.target.value })}
                      placeholder="Ananda Budi Pratama (Kelas VB)"
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Tingkat Kejuaraan</label>
                    <select
                      value={editingAchievement.level || 'Tingkat Kecamatan'}
                      onChange={(e) => setEditingAchievement({ ...editingAchievement, level: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-purple-500"
                    >
                      <option value="Tingkat Kecamatan">Tingkat Kecamatan</option>
                      <option value="Tingkat Kabupaten">Tingkat Kabupaten</option>
                      <option value="Tingkat Provinsi">Tingkat Provinsi</option>
                      <option value="Tingkat Nasional">Tingkat Nasional</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Kategori</label>
                    <select
                      value={editingAchievement.category || 'Akademik'}
                      onChange={(e) => setEditingAchievement({ ...editingAchievement, category: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-purple-500"
                    >
                      <option value="Akademik">Akademik</option>
                      <option value="Olahraga">Olahraga</option>
                      <option value="Seni">Seni</option>
                      <option value="Keagamaan">Keagamaan</option>
                      <option value="Coding & AI">Coding & AI</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Tahun Perolehan</label>
                    <input
                      type="text"
                      value={editingAchievement.year || new Date().getFullYear().toString()}
                      onChange={(e) => setEditingAchievement({ ...editingAchievement, year: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Deskripsi Singkat</label>
                  <textarea
                    rows={3}
                    value={editingAchievement.description || ''}
                    onChange={(e) => setEditingAchievement({ ...editingAchievement, description: e.target.value })}
                    placeholder="Rincian mengenai perlombaan..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">URL Foto Piala / Dokumentasi</label>
                  <input
                    type="text"
                    value={editingAchievement.imageUrl || ''}
                    onChange={(e) => setEditingAchievement({ ...editingAchievement, imageUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="flex gap-2 pt-3 border-t border-slate-100">
                  <button type="submit" className="bg-[#0F52BA] text-white font-extrabold px-5 py-2.5 rounded-xl cursor-pointer">
                    Simpan Prestasi
                  </button>
                  <button type="button" onClick={() => setEditingAchievement(null)} className="bg-slate-200 text-slate-700 font-bold px-5 py-2.5 rounded-xl cursor-pointer">
                    Batal
                  </button>
                </div>
              </form>
            )}

            {/* Filter Search */}
            <div className="relative max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Cari judul atau nama siswa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Achievement Table */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 uppercase font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Foto</th>
                    <th className="p-3.5">Prestasi</th>
                    <th className="p-3.5">Siswa</th>
                    <th className="p-3.5">Tingkat & Kategori</th>
                    <th className="p-3.5">Tahun</th>
                    <th className="p-3.5 text-right">Aksi (Edit / Hapus)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filterList(achievements, ['title', 'studentName', 'level', 'category']).map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition">
                      <td className="p-3.5 w-16">
                        <img src={item.imageUrl} alt={item.title} className="w-12 h-10 object-cover rounded-lg border border-slate-200" />
                      </td>
                      <td className="p-3.5 font-bold text-slate-900">{item.title}</td>
                      <td className="p-3.5 text-slate-700 font-semibold">{item.studentName}</td>
                      <td className="p-3.5 text-slate-600">
                        <span className="bg-purple-100 text-purple-900 font-bold px-2 py-0.5 rounded text-[10px] block w-fit mb-1">
                          {item.level}
                        </span>
                        <span className="text-[11px] text-slate-500">{item.category}</span>
                      </td>
                      <td className="p-3.5 text-slate-500 font-mono">{item.year}</td>
                      <td className="p-3.5 text-right space-x-1">
                        <button
                          onClick={() => setEditingAchievement(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition inline-flex items-center gap-1 font-bold"
                          title="Edit Prestasi"
                        >
                          <Edit className="w-4 h-4" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteAchievement(item.id, item.title)}
                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition inline-flex items-center gap-1 font-bold"
                          title="Hapus Prestasi"
                        >
                          <Trash2 className="w-4 h-4" /> Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                  {achievements.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-400">
                        Belum ada data prestasi tersimpan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- MENU: EKSTRAKURIKULER --- */}
        {activeMenu === 'extracurriculars' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Kelola Ekstrakurikuler</h2>
                <p className="text-xs text-slate-500">Tambah, edit, dan hapus kegiatan ekstrakurikuler sekolah.</p>
              </div>
              <button
                onClick={() => setEditingExtracurricular({ name: '', category: 'Olahraga', schedule: 'Sabtu, 15.00 WITA' })}
                className="bg-[#0F52BA] hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" /> Tambah Ekskul Baru
              </button>
            </div>

            {/* Extracurricular Form Editor */}
            {editingExtracurricular && (
              <form onSubmit={handleSaveExtracurricular} className="bg-white p-6 rounded-3xl border border-indigo-300 space-y-4 text-xs shadow-xl animate-in fade-in">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="font-extrabold text-sm text-slate-900">
                    {editingExtracurricular.id ? 'Edit Ekstrakurikuler' : 'Tambah Ekstrakurikuler Baru'}
                  </h3>
                  <button type="button" onClick={() => setEditingExtracurricular(null)} className="text-slate-400 hover:text-slate-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Nama Ekstrakurikuler *</label>
                    <input
                      type="text"
                      required
                      value={editingExtracurricular.name || ''}
                      onChange={(e) => setEditingExtracurricular({ ...editingExtracurricular, name: e.target.value })}
                      placeholder="Pramuka Penggalang / Robotik Coding"
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Kategori</label>
                    <input
                      type="text"
                      value={editingExtracurricular.category || ''}
                      onChange={(e) => setEditingExtracurricular({ ...editingExtracurricular, category: e.target.value })}
                      placeholder="Wajib / Olahraga / Seni / Sains"
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Jadwal Latihan</label>
                    <input
                      type="text"
                      value={editingExtracurricular.schedule || ''}
                      onChange={(e) => setEditingExtracurricular({ ...editingExtracurricular, schedule: e.target.value })}
                      placeholder="Jumat, 15.30 WITA"
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Pembina / Pelatih</label>
                    <input
                      type="text"
                      value={editingExtracurricular.instructor || ''}
                      onChange={(e) => setEditingExtracurricular({ ...editingExtracurricular, instructor: e.target.value })}
                      placeholder="Kak Ahmad & Pembina"
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Deskripsi Kegiatan</label>
                  <textarea
                    rows={3}
                    value={editingExtracurricular.description || ''}
                    onChange={(e) => setEditingExtracurricular({ ...editingExtracurricular, description: e.target.value })}
                    placeholder="Gambaran aktivitas ekskul..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">URL Foto Sampul</label>
                  <input
                    type="text"
                    value={editingExtracurricular.imageUrl || ''}
                    onChange={(e) => setEditingExtracurricular({ ...editingExtracurricular, imageUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex gap-2 pt-3 border-t border-slate-100">
                  <button type="submit" className="bg-[#0F52BA] text-white font-extrabold px-5 py-2.5 rounded-xl cursor-pointer">
                    Simpan Ekskul
                  </button>
                  <button type="button" onClick={() => setEditingExtracurricular(null)} className="bg-slate-200 text-slate-700 font-bold px-5 py-2.5 rounded-xl cursor-pointer">
                    Batal
                  </button>
                </div>
              </form>
            )}

            {/* Filter Search */}
            <div className="relative max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Cari ekskul..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Extracurricular Table */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 uppercase font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Gambar</th>
                    <th className="p-3.5">Nama Ekskul</th>
                    <th className="p-3.5">Jadwal</th>
                    <th className="p-3.5">Pembina</th>
                    <th className="p-3.5 text-right">Aksi (Edit / Hapus)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filterList(extracurriculars, ['name', 'category', 'instructor', 'schedule']).map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition">
                      <td className="p-3.5 w-16">
                        <img src={item.imageUrl} alt={item.name} className="w-12 h-10 object-cover rounded-lg border border-slate-200" />
                      </td>
                      <td className="p-3.5 font-bold text-slate-900">
                        {item.name}
                        <span className="block text-[10px] text-indigo-600 font-semibold">{item.category}</span>
                      </td>
                      <td className="p-3.5 text-slate-600">{item.schedule}</td>
                      <td className="p-3.5 text-slate-500">{item.instructor}</td>
                      <td className="p-3.5 text-right space-x-1">
                        <button
                          onClick={() => setEditingExtracurricular(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition inline-flex items-center gap-1 font-bold"
                          title="Edit Ekskul"
                        >
                          <Edit className="w-4 h-4" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteExtracurricular(item.id, item.name)}
                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition inline-flex items-center gap-1 font-bold"
                          title="Hapus Ekskul"
                        >
                          <Trash2 className="w-4 h-4" /> Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                  {extracurriculars.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-400">
                        Belum ada data ekskul tersimpan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- MENU: GALERI FOTO --- */}
        {activeMenu === 'gallery' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Kelola Galeri Foto Kegiatan</h2>
                <p className="text-xs text-slate-500">Tambah, edit, dan hapus foto dokementasi kegiatan sekolah.</p>
              </div>
              <button
                onClick={() => setEditingGallery({ title: '', category: 'Pembelajaran', date: new Date().toISOString().split('T')[0] })}
                className="bg-[#0F52BA] hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" /> Tambah Foto Galeri
              </button>
            </div>

            {/* Gallery Form Editor */}
            {editingGallery && (
              <form onSubmit={handleSaveGallery} className="bg-white p-6 rounded-3xl border border-pink-300 space-y-4 text-xs shadow-xl animate-in fade-in">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="font-extrabold text-sm text-slate-900">
                    {editingGallery.id ? 'Edit Foto Galeri' : 'Tambah Foto Galeri Baru'}
                  </h3>
                  <button type="button" onClick={() => setEditingGallery(null)} className="text-slate-400 hover:text-slate-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Judul / Caption Foto *</label>
                    <input
                      type="text"
                      required
                      value={editingGallery.title || ''}
                      onChange={(e) => setEditingGallery({ ...editingGallery, title: e.target.value })}
                      placeholder="Upacara Bendera Senin Pagi"
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-pink-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Kategori Foto</label>
                    <select
                      value={editingGallery.category || 'Pembelajaran'}
                      onChange={(e) => setEditingGallery({ ...editingGallery, category: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-pink-500"
                    >
                      <option value="Pembelajaran">Pembelajaran</option>
                      <option value="Upacara">Upacara</option>
                      <option value="Olahraga">Olahraga</option>
                      <option value="Pramuka">Pramuka</option>
                      <option value="Coding & AI">Coding & AI</option>
                      <option value="Keagamaan">Keagamaan</option>
                      <option value="Lomba">Lomba</option>
                      <option value="Kegiatan Guru">Kegiatan Guru</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">URL Foto (Unsplash/HTTPS) *</label>
                    <input
                      type="text"
                      required
                      value={editingGallery.imageUrl || ''}
                      onChange={(e) => setEditingGallery({ ...editingGallery, imageUrl: e.target.value })}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-pink-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Tanggal Kegiatan</label>
                    <input
                      type="date"
                      value={editingGallery.date || new Date().toISOString().split('T')[0]}
                      onChange={(e) => setEditingGallery({ ...editingGallery, date: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-pink-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Deskripsi Tambahan</label>
                  <textarea
                    rows={2}
                    value={editingGallery.description || ''}
                    onChange={(e) => setEditingGallery({ ...editingGallery, description: e.target.value })}
                    placeholder="Penjelasan singkat mengenai dokumentasi foto ini..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div className="flex gap-2 pt-3 border-t border-slate-100">
                  <button type="submit" className="bg-[#0F52BA] text-white font-extrabold px-5 py-2.5 rounded-xl cursor-pointer">
                    Simpan Foto
                  </button>
                  <button type="button" onClick={() => setEditingGallery(null)} className="bg-slate-200 text-slate-700 font-bold px-5 py-2.5 rounded-xl cursor-pointer">
                    Batal
                  </button>
                </div>
              </form>
            )}

            {/* Filter Search */}
            <div className="relative max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Cari foto galeri..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-pink-500"
              />
            </div>

            {/* Gallery Grid View */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filterList(gallery, ['title', 'category', 'description']).map((item) => (
                <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between group">
                  <div>
                    <div className="relative h-40 overflow-hidden bg-slate-100">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                      <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-sm text-white font-bold text-[10px] px-2 py-0.5 rounded-full">
                        {item.category}
                      </span>
                    </div>
                    <div className="p-3.5 space-y-1">
                      <h4 className="font-bold text-xs text-slate-900 line-clamp-1">{item.title}</h4>
                      <p className="text-[10px] text-slate-400">{item.date}</p>
                      {item.description && <p className="text-[11px] text-slate-600 line-clamp-2">{item.description}</p>}
                    </div>
                  </div>
                  <div className="p-3 pt-0 flex justify-end gap-1 border-t border-slate-50">
                    <button
                      onClick={() => setEditingGallery(item)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg text-xs font-bold flex items-center gap-1"
                    >
                      <Edit className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteGallery(item.id, item.title)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-bold flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Hapus
                    </button>
                  </div>
                </div>
              ))}
              {gallery.length === 0 && (
                <div className="col-span-full p-8 text-center text-slate-400 bg-white rounded-3xl border border-slate-200">
                  Belum ada foto galeri tersimpan.
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- MENU: PENDAFTARAN SPMB --- */}
        {activeMenu === 'spmb' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Kelola Pendaftaran SPMB Online</h2>
                <p className="text-xs text-slate-500">Verifikasi berkas, ubah status pendaftaran, tambah pendaftar manual, atau hapus data.</p>
              </div>
              <button
                onClick={() => setEditingSPMB({ studentName: '', parentName: '', status: 'Menunggu Verifikasi' })}
                className="bg-[#0F52BA] hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" /> Tambah Pendaftar Manual
              </button>
            </div>

            {/* SPMB Form Editor */}
            {editingSPMB && (
              <form onSubmit={handleSaveSPMB} className="bg-white p-6 rounded-3xl border border-blue-300 space-y-4 text-xs shadow-xl animate-in fade-in">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="font-extrabold text-sm text-slate-900">
                    {editingSPMB.id ? 'Edit Data SPMB / Ubah Status' : 'Input Pendaftar Manual SPMB'}
                  </h3>
                  <button type="button" onClick={() => setEditingSPMB(null)} className="text-slate-400 hover:text-slate-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Nama Lengkap Murid *</label>
                    <input
                      type="text"
                      required
                      value={editingSPMB.studentName || ''}
                      onChange={(e) => setEditingSPMB({ ...editingSPMB, studentName: e.target.value })}
                      placeholder="Ananda Rizky Saputra"
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">NIK Calon Murid</label>
                    <input
                      type="text"
                      value={editingSPMB.nik || ''}
                      onChange={(e) => setEditingSPMB({ ...editingSPMB, nik: e.target.value })}
                      placeholder="6503020000000000"
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Nama Orang Tua / Wali *</label>
                    <input
                      type="text"
                      required
                      value={editingSPMB.parentName || ''}
                      onChange={(e) => setEditingSPMB({ ...editingSPMB, parentName: e.target.value })}
                      placeholder="Bapak / Ibu Wali"
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">No. WhatsApp Wali</label>
                    <input
                      type="text"
                      value={editingSPMB.parentPhone || ''}
                      onChange={(e) => setEditingSPMB({ ...editingSPMB, parentPhone: e.target.value })}
                      placeholder="08123456789"
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Status Pendaftaran</label>
                    <select
                      value={editingSPMB.status || 'Menunggu Verifikasi'}
                      onChange={(e) => setEditingSPMB({ ...editingSPMB, status: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                    >
                      <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
                      <option value="Diterima">Diterima</option>
                      <option value="Ditolak">Ditolak</option>
                      <option value="Berkas Kurang">Berkas Kurang</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Asal Sekolah (PAUD/TK)</label>
                    <input
                      type="text"
                      value={editingSPMB.previousSchool || ''}
                      onChange={(e) => setEditingSPMB({ ...editingSPMB, previousSchool: e.target.value })}
                      placeholder="TK Negeri Sebatik"
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Alamat Tinggal</label>
                    <input
                      type="text"
                      value={editingSPMB.address || ''}
                      onChange={(e) => setEditingSPMB({ ...editingSPMB, address: e.target.value })}
                      placeholder="Aji Kuning, Sebatik Tengah"
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-3 border-t border-slate-100">
                  <button type="submit" className="bg-[#0F52BA] text-white font-extrabold px-5 py-2.5 rounded-xl cursor-pointer">
                    Simpan Pendaftar
                  </button>
                  <button type="button" onClick={() => setEditingSPMB(null)} className="bg-slate-200 text-slate-700 font-bold px-5 py-2.5 rounded-xl cursor-pointer">
                    Batal
                  </button>
                </div>
              </form>
            )}

            {/* Filter Search */}
            <div className="relative max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Cari no reg, nama murid, atau orang tua..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* SPMB Applications Table */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 uppercase font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">No. Reg</th>
                    <th className="p-3.5">Nama Murid & Ortu</th>
                    <th className="p-3.5">WhatsApp / Alamat</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Aksi Status & Edit/Hapus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filterList(spmbApps, ['registrationNumber', 'studentName', 'parentName', 'parentPhone', 'status']).map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50 transition">
                      <td className="p-3.5 font-black text-[#0F52BA]">{app.registrationNumber}</td>
                      <td className="p-3.5">
                        <span className="font-bold text-slate-900 block">{app.studentName}</span>
                        <span className="text-[11px] text-slate-500">Wali: {app.parentName}</span>
                      </td>
                      <td className="p-3.5 text-slate-600">
                        <a
                          href={`https://wa.me/${app.parentPhone?.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="font-bold text-emerald-600 hover:underline flex items-center gap-1"
                        >
                          <PhoneCall className="w-3 h-3" /> {app.parentPhone}
                        </a>
                        <span className="text-[11px] text-slate-400 block line-clamp-1">{app.address}</span>
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                            app.status === 'Diterima'
                              ? 'bg-emerald-100 text-emerald-900'
                              : app.status === 'Ditolak'
                              ? 'bg-rose-100 text-rose-900'
                              : app.status === 'Berkas Kurang'
                              ? 'bg-purple-100 text-purple-900'
                              : 'bg-amber-100 text-amber-900'
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right space-x-1">
                        <button
                          onClick={() => handleUpdateSPMBStatus(app.id!, 'Diterima')}
                          className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold text-[10px]"
                        >
                          Terima
                        </button>
                        <button
                          onClick={() => handleUpdateSPMBStatus(app.id!, 'Ditolak')}
                          className="px-2 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded font-bold text-[10px]"
                        >
                          Tolak
                        </button>
                        <button
                          onClick={() => setEditingSPMB(app)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg font-bold"
                          title="Edit Data Pendaftar"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteSPMB(app.id!, app.studentName)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg font-bold"
                          title="Hapus Data Pendaftar"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {spmbApps.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-400">
                        Belum ada pendaftaran SPMB masuk.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- MENU: KELOLA DATA SISWA (AKADEMIK) --- */}
        {activeMenu === 'students' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <GraduationCap className="w-6 h-6 text-[#0F52BA]" /> Kelola Data Siswa (Akademik)
                </h2>
                <p className="text-xs text-slate-500">
                  Tambah data siswa secara individual, ubah data rombel, atau gunakan template import massal (CSV/Excel).
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setShowBulkImportModal(true)}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-extrabold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <FileSpreadsheet className="w-4 h-4 text-slate-900" />
                  Gunakan Template / Import Massal
                </button>
                <button
                  onClick={() =>
                    setEditingStudent({
                      nisn: '',
                      name: '',
                      gender: 'Laki-laki',
                      grade: 'Kelas 1',
                      homeroomTeacher: 'Nurhayati, S.Pd.',
                      extracurricular: '',
                      status: 'Aktif',
                      birthPlaceDate: ''
                    })
                  }
                  className="bg-[#0F52BA] hover:bg-blue-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  Tambah Siswa Manual
                </button>
              </div>
            </div>

            {/* FORM EDIT / TAMBAH SISWA MANUAL */}
            {editingStudent && (
              <form onSubmit={handleSaveStudent} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <User className="w-4 h-4 text-[#0F52BA]" />
                    {editingStudent.id ? 'Edit Data Siswa' : 'Tambah Siswa Baru (Manual)'}
                  </h3>
                  <button type="button" onClick={() => setEditingStudent(null)} className="text-slate-400 hover:text-slate-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1 text-xs">NISN *</label>
                    <input
                      type="text"
                      required
                      value={editingStudent.nisn || ''}
                      onChange={(e) => setEditingStudent({ ...editingStudent, nisn: e.target.value })}
                      placeholder="Contoh: 0178923011"
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0F52BA]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1 text-xs">Nama Lengkap Siswa *</label>
                    <input
                      type="text"
                      required
                      value={editingStudent.name || ''}
                      onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                      placeholder="Contoh: Ahmad Rizky Ramadhan"
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0F52BA]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1 text-xs">Jenis Kelamin</label>
                    <select
                      value={editingStudent.gender || 'Laki-laki'}
                      onChange={(e) => setEditingStudent({ ...editingStudent, gender: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0F52BA]"
                    >
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1 text-xs">Rombongan Belajar / Kelas</label>
                    <select
                      value={editingStudent.grade || 'Kelas 1'}
                      onChange={(e) => setEditingStudent({ ...editingStudent, grade: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0F52BA]"
                    >
                      <option value="Kelas 1">Kelas 1</option>
                      <option value="Kelas 2">Kelas 2</option>
                      <option value="Kelas 3">Kelas 3</option>
                      <option value="Kelas 4">Kelas 4</option>
                      <option value="Kelas 5">Kelas 5</option>
                      <option value="Kelas 6">Kelas 6</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1 text-xs">Wali Kelas</label>
                    <input
                      type="text"
                      value={editingStudent.homeroomTeacher || ''}
                      onChange={(e) => setEditingStudent({ ...editingStudent, homeroomTeacher: e.target.value })}
                      placeholder="Contoh: Nurhayati, S.Pd."
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0F52BA]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1 text-xs">Ekstrakurikuler / Minat</label>
                    <input
                      type="text"
                      value={editingStudent.extracurricular || ''}
                      onChange={(e) => setEditingStudent({ ...editingStudent, extracurricular: e.target.value })}
                      placeholder="Contoh: Coding & AI Kids"
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0F52BA]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1 text-xs">Tempat & Tanggal Lahir</label>
                    <input
                      type="text"
                      value={editingStudent.birthPlaceDate || ''}
                      onChange={(e) => setEditingStudent({ ...editingStudent, birthPlaceDate: e.target.value })}
                      placeholder="Contoh: Sebatik, 15 Mei 2018"
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0F52BA]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1 text-xs">Status Siswa</label>
                    <select
                      value={editingStudent.status || 'Aktif'}
                      onChange={(e) => setEditingStudent({ ...editingStudent, status: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0F52BA]"
                    >
                      <option value="Aktif">Aktif</option>
                      <option value="Alumni">Alumni</option>
                      <option value="Pindah">Pindah</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-2 pt-3 border-t border-slate-100">
                  <button type="submit" className="bg-[#0F52BA] text-white font-extrabold px-5 py-2.5 rounded-xl text-xs cursor-pointer">
                    Simpan Data Siswa
                  </button>
                  <button type="button" onClick={() => setEditingStudent(null)} className="bg-slate-200 text-slate-700 font-bold px-5 py-2.5 rounded-xl text-xs cursor-pointer">
                    Batal
                  </button>
                </div>
              </form>
            )}

            {/* FILTER & PENCARIAN SISWA */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-bold text-slate-500 mr-1 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" /> Kelas:
                </span>
                {['Semua Kelas', 'Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6'].map((cls) => (
                  <button
                    key={cls}
                    onClick={() => setStudentClassFilter(cls)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                      studentClassFilter === cls
                        ? 'bg-[#0F52BA] text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {cls}
                  </button>
                ))}
              </div>

              <div className="relative max-w-xs w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Cari siswa, NISN, wali kelas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F52BA]"
                />
              </div>
            </div>

            {/* TABEL DATA SISWA */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
                <span className="font-extrabold text-xs">
                  Tabel Siswa Terdaftar ({students.length} Total Murid)
                </span>
                <span className="text-[11px] text-slate-300 font-semibold">
                  Tahun Ajaran 2026/2027
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="p-3.5">No</th>
                      <th className="p-3.5">NISN</th>
                      <th className="p-3.5">Nama Siswa</th>
                      <th className="p-3.5">L/P</th>
                      <th className="p-3.5">Kelas & Wali</th>
                      <th className="p-3.5">Ekstrakurikuler</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {students
                      .filter((s) => {
                        const matchesClass = studentClassFilter === 'Semua Kelas' || s.grade === studentClassFilter;
                        const matchesTerm =
                          !searchTerm ||
                          s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.nisn.includes(searchTerm) ||
                          (s.extracurricular && s.extracurricular.toLowerCase().includes(searchTerm.toLowerCase()));
                        return matchesClass && matchesTerm;
                      })
                      .map((s, index) => (
                        <tr key={s.id} className="hover:bg-slate-50 transition">
                          <td className="p-3.5 text-slate-400 font-bold">{index + 1}</td>
                          <td className="p-3.5 font-mono font-bold text-slate-800">{s.nisn}</td>
                          <td className="p-3.5">
                            <span className="font-extrabold text-slate-900 block">{s.name}</span>
                            <span className="text-[10px] text-slate-400">{s.birthPlaceDate || '-'}</span>
                          </td>
                          <td className="p-3.5 font-bold">{s.gender === 'Laki-laki' ? 'L' : 'P'}</td>
                          <td className="p-3.5">
                            <span className="font-bold text-[#0F52BA] block">{s.grade}</span>
                            <span className="text-[10px] text-slate-500">{s.homeroomTeacher}</span>
                          </td>
                          <td className="p-3.5">
                            <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded text-[11px] font-bold">
                              {s.extracurricular || '-'}
                            </span>
                          </td>
                          <td className="p-3.5">
                            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">
                              {s.status}
                            </span>
                          </td>
                          <td className="p-3.5 text-right space-x-1">
                            <button
                              onClick={() => setEditingStudent(s)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg font-bold"
                              title="Edit Data Siswa"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteStudent(s.id, s.name)}
                              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg font-bold"
                              title="Hapus Data Siswa"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}

                    {students.length === 0 && (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-slate-400">
                          Belum ada data siswa. Silakan klik "Tambah Siswa Manual" atau "Gunakan Template / Import Massal".
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* --- MENU: PESAN MASUK --- */}
        {activeMenu === 'messages' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Pesan Masuk dari Pengunjung</h2>
              <p className="text-xs text-slate-500">Pesan dari formulir Kontak & Pengaduan sekolah.</p>
            </div>

            {/* Modal Detail Pesan */}
            {viewingMessage && (
              <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl animate-in zoom-in-95">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h3 className="font-extrabold text-slate-900 text-sm">Rincian Pesan Kontak</h3>
                    <button onClick={() => setViewingMessage(null)} className="text-slate-400 hover:text-slate-700">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-2 text-xs text-slate-700">
                    <p>
                      <strong className="text-slate-900">Pengirim:</strong> {viewingMessage.name}
                    </p>
                    <p>
                      <strong className="text-slate-900">Email:</strong> {viewingMessage.email}
                    </p>
                    <p>
                      <strong className="text-slate-900">Telepon / WA:</strong> {viewingMessage.phone}
                    </p>
                    <p>
                      <strong className="text-slate-900">Waktu Kirim:</strong> {viewingMessage.createdAt}
                    </p>
                    <div className="mt-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 leading-relaxed font-sans">
                      {viewingMessage.message}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                    <a
                      href={`https://wa.me/${viewingMessage.phone?.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
                    >
                      <PhoneCall className="w-3.5 h-3.5" /> Balas Via WhatsApp
                    </a>
                    <button
                      onClick={() => setViewingMessage(null)}
                      className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-4 py-2 rounded-xl text-xs"
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Messages Table */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 uppercase font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Pengirim</th>
                    <th className="p-3.5">Kontak</th>
                    <th className="p-3.5">Pesan</th>
                    <th className="p-3.5">Waktu</th>
                    <th className="p-3.5 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {messages.map((msg) => (
                    <tr key={msg.id} className={`hover:bg-slate-50 transition ${!msg.isRead ? 'bg-blue-50/50 font-semibold' : ''}`}>
                      <td className="p-3.5 font-bold text-slate-900">{msg.name}</td>
                      <td className="p-3.5 text-slate-600">
                        {msg.email}
                        <span className="block text-[10px] text-slate-400">{msg.phone}</span>
                      </td>
                      <td className="p-3.5 text-slate-700 max-w-xs truncate">{msg.message}</td>
                      <td className="p-3.5 text-slate-400 text-[11px]">{msg.createdAt}</td>
                      <td className="p-3.5 text-right space-x-1">
                        <button
                          onClick={() => {
                            setViewingMessage(msg);
                            handleMarkMessageRead(msg);
                          }}
                          className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg font-bold text-xs inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" /> Baca
                        </button>
                        <button
                          onClick={() => handleDeleteMessage(msg.id!)}
                          className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg font-bold text-xs inline-flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {messages.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-400">
                        Belum ada pesan masuk.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- MENU: PENGATURAN SEKOLAH & PROFIL --- */}
        {activeMenu === 'settings' && (
          <div className="space-y-6 max-w-4xl">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Pengaturan Profil Sekolah</h2>
              <p className="text-xs text-slate-500">Kelola identitas, sambutan Kepala Sekolah, Visi-Misi, dan statistik sekolah.</p>
            </div>

            <form onSubmit={handleSaveSettings} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-xs">
              {/* Identitas Umum */}
              <div className="space-y-3">
                <h3 className="font-extrabold text-sm text-[#0F52BA] border-b border-slate-100 pb-2 flex items-center gap-2">
                  <Building className="w-4 h-4" /> Identitas Utama Sekolah
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Nama Sekolah</label>
                    <input
                      type="text"
                      value={settingsForm.name}
                      onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">NPSN</label>
                    <input
                      type="text"
                      value={settingsForm.npsn}
                      onChange={(e) => setSettingsForm({ ...settingsForm, npsn: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Akreditasi</label>
                    <input
                      type="text"
                      value={settingsForm.accreditation}
                      onChange={(e) => setSettingsForm({ ...settingsForm, accreditation: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">URL Logo Sekolah</label>
                    <input
                      type="text"
                      value={settingsForm.logoUrl || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, logoUrl: e.target.value })}
                      placeholder="https://i.ibb.co.com/Pvf7Mvwq/Logo-Sekolah.png"
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Tagline Sekolah</label>
                    <input
                      type="text"
                      value={settingsForm.tagline}
                      onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Slogan / Motto</label>
                    <input
                      type="text"
                      value={settingsForm.slogan}
                      onChange={(e) => setSettingsForm({ ...settingsForm, slogan: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Headmaster Profile */}
              <div className="space-y-3 pt-2">
                <h3 className="font-extrabold text-sm text-[#0F52BA] border-b border-slate-100 pb-2 flex items-center gap-2">
                  <User className="w-4 h-4" /> Profil & Sambutan Kepala Sekolah
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Nama Kepala Sekolah & Gelar</label>
                    <input
                      type="text"
                      value={settingsForm.principalName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, principalName: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">URL Foto Kepala Sekolah</label>
                    <input
                      type="text"
                      value={settingsForm.principalPhoto}
                      onChange={(e) => setSettingsForm({ ...settingsForm, principalPhoto: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">Sambutan Kepala Sekolah</label>
                  <textarea
                    rows={4}
                    value={settingsForm.principalGreeting}
                    onChange={(e) => setSettingsForm({ ...settingsForm, principalGreeting: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Stats Counters */}
              <div className="space-y-3 pt-2">
                <h3 className="font-extrabold text-sm text-[#0F52BA] border-b border-slate-100 pb-2 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" /> Statistik Jumlah Sekolah
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Jumlah Siswa</label>
                    <input
                      type="number"
                      value={settingsForm.stats.students}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          stats: { ...settingsForm.stats, students: parseInt(e.target.value) || 0 }
                        })
                      }
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Jumlah Guru</label>
                    <input
                      type="number"
                      value={settingsForm.stats.teachers}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          stats: { ...settingsForm.stats, teachers: parseInt(e.target.value) || 0 }
                        })
                      }
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Jumlah Staf</label>
                    <input
                      type="number"
                      value={settingsForm.stats.staff}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          stats: { ...settingsForm.stats, staff: parseInt(e.target.value) || 0 }
                        })
                      }
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Jumlah Rombel</label>
                    <input
                      type="number"
                      value={settingsForm.stats.classes}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          stats: { ...settingsForm.stats, classes: parseInt(e.target.value) || 0 }
                        })
                      }
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Visi & Misi */}
              <div className="space-y-3 pt-2">
                <h3 className="font-extrabold text-sm text-[#0F52BA] border-b border-slate-100 pb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" /> Visi & Misi Sekolah
                </h3>
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Visi Sekolah</label>
                  <textarea
                    rows={2}
                    value={settingsForm.vision}
                    onChange={(e) => setSettingsForm({ ...settingsForm, vision: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">Misi Sekolah (Daftar Poin)</label>
                  <div className="space-y-2 mb-3">
                    {settingsForm.mission.map((m, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
                        <span className="font-bold text-slate-400 w-6 text-center">{idx + 1}.</span>
                        <span className="flex-1 text-slate-800">{m}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveMissionPoint(idx)}
                          className="text-rose-600 hover:text-rose-800 p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMissionText}
                      onChange={(e) => setNewMissionText(e.target.value)}
                      placeholder="Tambah poin misi baru..."
                      className="flex-1 p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddMissionPoint}
                      className="bg-slate-800 text-white font-bold px-4 py-2.5 rounded-xl hover:bg-slate-900 cursor-pointer"
                    >
                      + Tambah Misi
                    </button>
                  </div>
                </div>
              </div>

              {/* Kontak & Lokasi */}
              <div className="space-y-3 pt-2">
                <h3 className="font-extrabold text-sm text-[#0F52BA] border-b border-slate-100 pb-2 flex items-center gap-2">
                  <PhoneCall className="w-4 h-4" /> Kontak & Lokasi Sekolah
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Telepon</label>
                    <input
                      type="text"
                      value={settingsForm.phone}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Email Official</label>
                    <input
                      type="text"
                      value={settingsForm.email}
                      onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">WhatsApp Center</label>
                    <input
                      type="text"
                      value={settingsForm.whatsapp}
                      onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">Alamat Lengkap</label>
                  <input
                    type="text"
                    value={settingsForm.address}
                    onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="bg-[#0F52BA] hover:bg-blue-700 text-white font-black text-xs px-8 py-3 rounded-2xl transition cursor-pointer shadow-lg flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Simpan Seluruh Pengaturan Sekolah
                </button>
              </div>
            </form>
          </div>
        )}

      {/* MODAL BULK IMPORT DATA SISWA DENGAN TEMPLATE */}
      {showBulkImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-5 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-900">
                <FileSpreadsheet className="w-5 h-5 text-amber-500" />
                <h3 className="font-extrabold text-base">Import Data Siswa Menggunakan Template</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowBulkImportModal(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1.5">
                <p className="font-extrabold flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-amber-600" /> Format Susunan Kolom Template (Dipisahkan Koma / Tab):
                </p>
                <code className="block bg-white p-2 rounded-lg text-[11px] font-mono border border-amber-200 text-slate-800">
                  NISN, Nama, JenisKelamin, Kelas, WaliKelas, Ekstrakurikuler, TempatTglLahir
                </code>
                <p className="text-[11px] text-amber-800">
                  Anda dapat menyalin data dari Microsoft Excel atau Google Sheets lalu menempelkan (paste) langsung ke dalam kotak di bawah ini.
                </p>
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleLoadTemplateExample}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-3.5 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5 text-[#0F52BA]" /> Muat Contoh Template 5 Siswa
                </button>
                <span className="text-[11px] text-slate-400">1 baris = 1 siswa</span>
              </div>

              <form onSubmit={handleBulkImportSubmit} className="space-y-4">
                <textarea
                  rows={8}
                  required
                  value={bulkInputText}
                  onChange={(e) => setBulkInputText(e.target.value)}
                  placeholder={`Tempelkan data siswa di sini...\nContoh:\n0178923091, Ahmad Rifai, Laki-laki, Kelas 1, Nurhayati S.Pd., Coding & AI Kids, Sebatik 12 Jan 2019\n0178923092, Siti Aminah, Perempuan, Kelas 1, Nurhayati S.Pd., Sanggar Seni, Nunukan 15 Maret 2019`}
                  className="w-full p-3 font-mono text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-[#0F52BA] bg-slate-50 text-slate-800"
                />

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowBulkImportModal(false)}
                    className="bg-slate-200 text-slate-700 font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-extrabold text-xs px-6 py-2.5 rounded-xl cursor-pointer shadow-md flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" /> Proses Import Siswa
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      </main>
    </div>
  );
};
