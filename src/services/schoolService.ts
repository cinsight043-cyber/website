import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase/config';
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
} from '../types';
import {
  initialSchoolProfile,
  initialNews,
  initialAnnouncements,
  initialTeachers,
  initialAchievements,
  initialExtracurriculars,
  initialGallery,
  initialSPMBApplications,
  initialMessages,
  initialFeedbacks,
  initialStudents
} from '../data/initialData';

// Helper to handle local cache fallback
const getLocalData = <T>(key: string, fallback: T): T => {
  try {
    const data = localStorage.getItem(`sdn004_${key}`);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
  }
  return fallback;
};

const setLocalData = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(`sdn004_${key}`, JSON.stringify(data));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage`, e);
  }
};

function withTimeout<T>(promise: Promise<T>, ms = 6000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Firestore operation timed out')), ms)
    )
  ]);
}

export const schoolService = {
  // --- SCHOOL PROFILE ---
  async getSchoolProfile(): Promise<SchoolProfile> {
    try {
      const docRef = doc(db, 'school_profile', 'main');
      const docSnap = await withTimeout(getDoc(docRef));
      if (docSnap.exists()) {
        const data = docSnap.data() as SchoolProfile;
        setLocalData('profile', data);
        return data;
      } else {
        // Auto seed profile if not exists
        await setDoc(docRef, initialSchoolProfile, { merge: true }).catch(() => {});
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'school_profile/main');
    }
    return getLocalData('profile', initialSchoolProfile);
  },

  async updateSchoolProfile(profile: SchoolProfile): Promise<void> {
    setLocalData('profile', profile);
    try {
      const docRef = doc(db, 'school_profile', 'main');
      await withTimeout(setDoc(docRef, profile, { merge: true }));
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, 'school_profile/main');
    }
  },

  // --- NEWS ---
  async getNews(): Promise<NewsItem[]> {
    try {
      const q = query(collection(db, 'news'), orderBy('publishedAt', 'desc'));
      const snap = await withTimeout(getDocs(q));
      if (!snap.empty) {
        const news = snap.docs.map(d => ({ id: d.id, ...d.data() } as NewsItem));
        setLocalData('news', news);
        return news;
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'news');
    }
    return getLocalData('news', initialNews);
  },

  async addNews(item: Omit<NewsItem, 'id'>): Promise<NewsItem> {
    const newItem: NewsItem = { ...item, id: `news-${Date.now()}` };
    try {
      const docRef = await withTimeout(addDoc(collection(db, 'news'), item));
      newItem.id = docRef.id;
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, 'news');
    }
    const current = await this.getNews();
    setLocalData('news', [newItem, ...current]);
    return newItem;
  },

  async updateNews(id: string, item: Partial<NewsItem>): Promise<void> {
    try {
      const docRef = doc(db, 'news', id);
      await withTimeout(updateDoc(docRef, item));
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `news/${id}`);
    }
    const current = await this.getNews();
    const updated = current.map(n => (n.id === id ? { ...n, ...item } : n));
    setLocalData('news', updated);
  },

  async deleteNews(id: string): Promise<void> {
    try {
      await withTimeout(deleteDoc(doc(db, 'news', id)));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `news/${id}`);
    }
    const current = await this.getNews();
    setLocalData('news', current.filter(n => n.id !== id));
  },

  // --- ANNOUNCEMENTS ---
  async getAnnouncements(): Promise<AnnouncementItem[]> {
    try {
      const q = query(collection(db, 'announcements'), orderBy('date', 'desc'));
      const snap = await withTimeout(getDocs(q));
      if (!snap.empty) {
        const anns = snap.docs.map(d => ({ id: d.id, ...d.data() } as AnnouncementItem));
        setLocalData('announcements', anns);
        return anns;
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'announcements');
    }
    return getLocalData('announcements', initialAnnouncements);
  },

  async addAnnouncement(item: Omit<AnnouncementItem, 'id'>): Promise<AnnouncementItem> {
    const newItem: AnnouncementItem = { ...item, id: `ann-${Date.now()}` };
    try {
      const docRef = await withTimeout(addDoc(collection(db, 'announcements'), item));
      newItem.id = docRef.id;
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, 'announcements');
    }
    const current = await this.getAnnouncements();
    setLocalData('announcements', [newItem, ...current]);
    return newItem;
  },

  async updateAnnouncement(id: string, item: Partial<AnnouncementItem>): Promise<void> {
    try {
      const docRef = doc(db, 'announcements', id);
      await withTimeout(updateDoc(docRef, item));
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `announcements/${id}`);
    }
    const current = await this.getAnnouncements();
    setLocalData('announcements', current.map(a => (a.id === id ? { ...a, ...item } : a)));
  },

  async deleteAnnouncement(id: string): Promise<void> {
    try {
      await withTimeout(deleteDoc(doc(db, 'announcements', id)));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `announcements/${id}`);
    }
    const current = await this.getAnnouncements();
    setLocalData('announcements', current.filter(a => a.id !== id));
  },

  // --- TEACHERS & STAFF ---
  async getTeachers(): Promise<TeacherItem[]> {
    try {
      const snap = await withTimeout(getDocs(collection(db, 'teachers')));
      if (!snap.empty) {
        const teachers = snap.docs.map(d => ({ id: d.id, ...d.data() } as TeacherItem));
        setLocalData('teachers', teachers);
        return teachers;
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'teachers');
    }
    return getLocalData('teachers', initialTeachers);
  },

  async addTeacher(item: Omit<TeacherItem, 'id'>): Promise<TeacherItem> {
    const newItem: TeacherItem = { ...item, id: `t-${Date.now()}` };
    try {
      const docRef = await withTimeout(addDoc(collection(db, 'teachers'), item));
      newItem.id = docRef.id;
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, 'teachers');
    }
    const current = await this.getTeachers();
    setLocalData('teachers', [...current, newItem]);
    return newItem;
  },

  async updateTeacher(id: string, item: Partial<TeacherItem>): Promise<void> {
    try {
      await withTimeout(updateDoc(doc(db, 'teachers', id), item));
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `teachers/${id}`);
    }
    const current = await this.getTeachers();
    setLocalData('teachers', current.map(t => (t.id === id ? { ...t, ...item } : t)));
  },

  async deleteTeacher(id: string): Promise<void> {
    try {
      await withTimeout(deleteDoc(doc(db, 'teachers', id)));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `teachers/${id}`);
    }
    const current = await this.getTeachers();
    setLocalData('teachers', current.filter(t => t.id !== id));
  },

  // --- ACHIEVEMENTS ---
  async getAchievements(): Promise<AchievementItem[]> {
    try {
      const snap = await withTimeout(getDocs(collection(db, 'achievements')));
      if (!snap.empty) {
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() } as AchievementItem));
        setLocalData('achievements', list);
        return list;
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'achievements');
    }
    return getLocalData('achievements', initialAchievements);
  },

  async addAchievement(item: Omit<AchievementItem, 'id'>): Promise<AchievementItem> {
    const newItem: AchievementItem = { ...item, id: `ach-${Date.now()}` };
    try {
      const docRef = await withTimeout(addDoc(collection(db, 'achievements'), item));
      newItem.id = docRef.id;
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, 'achievements');
    }
    const current = await this.getAchievements();
    setLocalData('achievements', [newItem, ...current]);
    return newItem;
  },

  async updateAchievement(id: string, item: Partial<AchievementItem>): Promise<void> {
    try {
      await withTimeout(updateDoc(doc(db, 'achievements', id), item));
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `achievements/${id}`);
    }
    const current = await this.getAchievements();
    setLocalData('achievements', current.map(a => (a.id === id ? { ...a, ...item } : a)));
  },

  async deleteAchievement(id: string): Promise<void> {
    try {
      await withTimeout(deleteDoc(doc(db, 'achievements', id)));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `achievements/${id}`);
    }
    const current = await this.getAchievements();
    setLocalData('achievements', current.filter(a => a.id !== id));
  },

  // --- EXTRACURRICULARS ---
  async getExtracurriculars(): Promise<ExtracurricularItem[]> {
    try {
      const snap = await withTimeout(getDocs(collection(db, 'extracurriculars')));
      if (!snap.empty) {
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() } as ExtracurricularItem));
        setLocalData('extracurriculars', list);
        return list;
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'extracurriculars');
    }
    return getLocalData('extracurriculars', initialExtracurriculars);
  },

  async addExtracurricular(item: Omit<ExtracurricularItem, 'id'>): Promise<ExtracurricularItem> {
    const newItem: ExtracurricularItem = { ...item, id: `ex-${Date.now()}` };
    try {
      const docRef = await withTimeout(addDoc(collection(db, 'extracurriculars'), item));
      newItem.id = docRef.id;
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, 'extracurriculars');
    }
    const current = await this.getExtracurriculars();
    setLocalData('extracurriculars', [...current, newItem]);
    return newItem;
  },

  async updateExtracurricular(id: string, item: Partial<ExtracurricularItem>): Promise<void> {
    try {
      await withTimeout(updateDoc(doc(db, 'extracurriculars', id), item));
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `extracurriculars/${id}`);
    }
    const current = await this.getExtracurriculars();
    setLocalData('extracurriculars', current.map(e => (e.id === id ? { ...e, ...item } : e)));
  },

  async deleteExtracurricular(id: string): Promise<void> {
    try {
      await withTimeout(deleteDoc(doc(db, 'extracurriculars', id)));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `extracurriculars/${id}`);
    }
    const current = await this.getExtracurriculars();
    setLocalData('extracurriculars', current.filter(e => e.id !== id));
  },

  // --- GALLERY ---
  async getGallery(): Promise<GalleryItem[]> {
    try {
      const snap = await withTimeout(getDocs(collection(db, 'gallery')));
      if (!snap.empty) {
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() } as GalleryItem));
        setLocalData('gallery', list);
        return list;
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'gallery');
    }
    return getLocalData('gallery', initialGallery);
  },

  async addGalleryItem(item: Omit<GalleryItem, 'id'>): Promise<GalleryItem> {
    const newItem: GalleryItem = { ...item, id: `gal-${Date.now()}` };
    try {
      const docRef = await withTimeout(addDoc(collection(db, 'gallery'), item));
      newItem.id = docRef.id;
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, 'gallery');
    }
    const current = await this.getGallery();
    setLocalData('gallery', [newItem, ...current]);
    return newItem;
  },

  async updateGalleryItem(id: string, item: Partial<GalleryItem>): Promise<void> {
    try {
      await withTimeout(updateDoc(doc(db, 'gallery', id), item));
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `gallery/${id}`);
    }
    const current = await this.getGallery();
    setLocalData('gallery', current.map(g => (g.id === id ? { ...g, ...item } : g)));
  },

  async deleteGalleryItem(id: string): Promise<void> {
    try {
      await withTimeout(deleteDoc(doc(db, 'gallery', id)));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `gallery/${id}`);
    }
    const current = await this.getGallery();
    setLocalData('gallery', current.filter(g => g.id !== id));
  },

  // --- SPMB (NEW STUDENT REGISTRATION) ---
  async submitSPMB(appData: Omit<SPMBApplication, 'id' | 'registrationNumber' | 'status' | 'createdAt'>): Promise<SPMBApplication> {
    const regNo = `SPMB-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newApp: SPMBApplication = {
      ...appData,
      registrationNumber: regNo,
      status: 'Menunggu Verifikasi',
      createdAt: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })
    };
    try {
      const docRef = await withTimeout(addDoc(collection(db, 'spmb'), newApp));
      newApp.id = docRef.id;
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, 'spmb');
    }
    const current = getLocalData('spmb', initialSPMBApplications);
    setLocalData('spmb', [newApp, ...current]);
    return newApp;
  },

  async getSPMBApplications(): Promise<SPMBApplication[]> {
    try {
      const snap = await withTimeout(getDocs(collection(db, 'spmb')));
      if (!snap.empty) {
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() } as SPMBApplication));
        setLocalData('spmb', list);
        return list;
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'spmb');
    }
    return getLocalData('spmb', initialSPMBApplications);
  },

  async updateSPMBStatus(id: string, status: SPMBApplication['status']): Promise<void> {
    try {
      await withTimeout(updateDoc(doc(db, 'spmb', id), { status }));
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `spmb/${id}`);
    }
    const current = await this.getSPMBApplications();
    setLocalData('spmb', current.map(a => (a.id === id ? { ...a, status } : a)));
  },

  async deleteSPMBApplication(id: string): Promise<void> {
    try {
      await withTimeout(deleteDoc(doc(db, 'spmb', id)));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `spmb/${id}`);
    }
    const current = await this.getSPMBApplications();
    setLocalData('spmb', current.filter(a => a.id !== id));
  },

  // --- MESSAGES / CONTACT ---
  async submitContactMessage(msg: Omit<ContactMessage, 'id' | 'createdAt' | 'isRead'>): Promise<ContactMessage> {
    const newMsg: ContactMessage = {
      ...msg,
      createdAt: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
      isRead: false
    };
    try {
      const docRef = await withTimeout(addDoc(collection(db, 'messages'), newMsg));
      newMsg.id = docRef.id;
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, 'messages');
    }
    const current = getLocalData('messages', initialMessages);
    setLocalData('messages', [newMsg, ...current]);
    return newMsg;
  },

  async getContactMessages(): Promise<ContactMessage[]> {
    try {
      const snap = await withTimeout(getDocs(collection(db, 'messages')));
      if (!snap.empty) {
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() } as ContactMessage));
        setLocalData('messages', list);
        return list;
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'messages');
    }
    return getLocalData('messages', initialMessages);
  },

  async markMessageRead(id: string): Promise<void> {
    try {
      await updateDoc(doc(db, 'messages', id), { isRead: true });
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `messages/${id}`);
    }
    const current = await this.getContactMessages();
    setLocalData('messages', current.map(m => (m.id === id ? { ...m, isRead: true } : m)));
  },

  async deleteContactMessage(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'messages', id));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `messages/${id}`);
    }
    const current = await this.getContactMessages();
    setLocalData('messages', current.filter(m => m.id !== id));
  },

  // --- PESAN DAN KESAN (FEEDBACK) ---
  async submitFeedback(feedback: Omit<FeedbackItem, 'id' | 'createdAt'>): Promise<FeedbackItem> {
    const newFb: FeedbackItem = {
      ...feedback,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      isApproved: true
    };
    try {
      const docRef = await withTimeout(addDoc(collection(db, 'feedbacks'), newFb));
      newFb.id = docRef.id;
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, 'feedbacks');
      newFb.id = `fb-${Date.now()}`;
    }
    const current = getLocalData('feedbacks', initialFeedbacks);
    setLocalData('feedbacks', [newFb, ...current]);
    return newFb;
  },

  async getFeedbacks(): Promise<FeedbackItem[]> {
    try {
      const snap = await withTimeout(getDocs(collection(db, 'feedbacks')));
      if (!snap.empty) {
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() } as FeedbackItem));
        setLocalData('feedbacks', list);
        return list;
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'feedbacks');
    }
    return getLocalData('feedbacks', initialFeedbacks);
  },

  async deleteFeedback(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'feedbacks', id));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `feedbacks/${id}`);
    }
    const current = await this.getFeedbacks();
    setLocalData('feedbacks', current.filter(f => f.id !== id));
  },

  // --- DATA SISWA (STUDENTS) ---
  async getStudents(): Promise<StudentItem[]> {
    try {
      const snap = await withTimeout(getDocs(collection(db, 'students')));
      if (!snap.empty) {
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() } as StudentItem));
        setLocalData('students', list);
        return list;
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'students');
    }
    return getLocalData('students', initialStudents);
  },

  async addStudent(student: Omit<StudentItem, 'id'>): Promise<StudentItem> {
    const id = `std-${Date.now()}`;
    const newStudent: StudentItem = { ...student, id };
    try {
      await withTimeout(setDoc(doc(db, 'students', id), newStudent));
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, `students/${id}`);
    }
    const current = await this.getStudents();
    const updated = [newStudent, ...current];
    setLocalData('students', updated);
    return newStudent;
  },

  async updateStudent(id: string, updates: Partial<StudentItem>): Promise<StudentItem> {
    try {
      await withTimeout(updateDoc(doc(db, 'students', id), updates));
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `students/${id}`);
    }
    const current = await this.getStudents();
    const updated = current.map(s => (s.id === id ? { ...s, ...updates } : s));
    setLocalData('students', updated);
    return updated.find(s => s.id === id)!;
  },

  async deleteStudent(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'students', id));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `students/${id}`);
    }
    const current = await this.getStudents();
    const updated = current.filter(s => s.id !== id);
    setLocalData('students', updated);
  },

  async bulkAddStudents(studentsList: Omit<StudentItem, 'id'>[]): Promise<StudentItem[]> {
    const created: StudentItem[] = [];
    for (let i = 0; i < studentsList.length; i++) {
      const id = `std-${Date.now()}-${i}`;
      const item: StudentItem = { ...studentsList[i], id };
      try {
        await setDoc(doc(db, 'students', id), item);
      } catch (e) {
        // Fallback for local
      }
      created.push(item);
    }
    const current = await this.getStudents();
    const updated = [...created, ...current];
    setLocalData('students', updated);
    return created;
  },

  // --- ONE-CLICK SEED TO FIRESTORE ---
  async seedInitialDataToFirestore(): Promise<boolean> {
    try {
      // 1. Profile
      await setDoc(doc(db, 'school_profile', 'main'), initialSchoolProfile, { merge: true });

      // 2. News
      for (const item of initialNews) {
        await setDoc(doc(db, 'news', item.id), item, { merge: true });
      }

      // 3. Announcements
      for (const item of initialAnnouncements) {
        await setDoc(doc(db, 'announcements', item.id), item, { merge: true });
      }

      // 4. Teachers
      for (const item of initialTeachers) {
        await setDoc(doc(db, 'teachers', item.id), item, { merge: true });
      }

      // 5. Achievements
      for (const item of initialAchievements) {
        await setDoc(doc(db, 'achievements', item.id), item, { merge: true });
      }

      // 6. Extracurriculars
      for (const item of initialExtracurriculars) {
        await setDoc(doc(db, 'extracurriculars', item.id), item, { merge: true });
      }

      // 7. Gallery
      for (const item of initialGallery) {
        await setDoc(doc(db, 'gallery', item.id), item, { merge: true });
      }

      // 8. Feedbacks
      for (const item of initialFeedbacks) {
        await setDoc(doc(db, 'feedbacks', item.id), item, { merge: true });
      }

      // 9. Students
      for (const item of initialStudents) {
        await setDoc(doc(db, 'students', item.id), item, { merge: true });
      }

      console.log('Successfully seeded all initial data to Firestore!');
      return true;
    } catch (e) {
      console.error('Error seeding data to Firestore:', e);
      return false;
    }
  }
};
