import React, { useState } from 'react';
import {
  MessageSquare,
  Star,
  Send,
  HeartHandshake,
  User,
  Quote,
  ThumbsUp,
  Sparkles,
  CheckCircle2,
  X,
  MessageCircle,
  PenTool
} from 'lucide-react';
import { FeedbackItem } from '../../types';
import { Modal } from '../common/Modal';

interface PesanKesanModalProps {
  isOpen: boolean;
  onClose: () => void;
  feedbacks: FeedbackItem[];
  onSubmitFeedback: (data: Omit<FeedbackItem, 'id' | 'createdAt'>) => Promise<void>;
  showToast: (title: string, message?: string, type?: 'success' | 'error' | 'info') => void;
}

export const PesanKesanModal: React.FC<PesanKesanModalProps> = ({
  isOpen,
  onClose,
  feedbacks,
  onSubmitFeedback,
  showToast
}) => {
  const [activeTab, setActiveTab] = useState<'list' | 'form'>('list');
  const [filterRole, setFilterRole] = useState<string>('semua');
  const [likes, setLikes] = useState<Record<string, number>>({});

  // Form state
  const [name, setName] = useState('');
  const [role, setRole] = useState<FeedbackItem['role']>('Orang Tua / Wali');
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [impression, setImpression] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      showToast('Form Belum Lengkap', 'Nama dan isi pesan/kesan wajib diisi.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmitFeedback({
        name: name.trim(),
        role,
        rating,
        impression: impression.trim() || 'Apresiasi & Harapan untuk SDN 004 Sebatik Tengah',
        message: message.trim(),
        isApproved: true
      });

      showToast('Terima Kasih!', 'Pesan dan kesan Anda berhasil terkirim dan ditayangkan.', 'success');
      // Reset form
      setName('');
      setImpression('');
      setMessage('');
      setRating(5);
      setActiveTab('list');
    } catch (err) {
      showToast('Gagal Mengirim', 'Terjadi kendala saat mengirim pesan. Coba lagi.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = (id: string) => {
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const filteredFeedbacks =
    filterRole === 'semua'
      ? feedbacks
      : feedbacks.filter((f) => f.role.toLowerCase().includes(filterRole.toLowerCase()));

  const roleBadgeColor = (r: FeedbackItem['role']) => {
    switch (r) {
      case 'Siswa':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Orang Tua / Wali':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Alumni':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Guru / Staf':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="2xl">
      <div className="flex flex-col space-y-5 p-1 sm:p-2">
        {/* Custom Header Banner inside Modal */}
        <div className="bg-gradient-to-r from-slate-900 via-[#0F52BA] to-blue-900 text-white p-5 rounded-2xl shadow-md relative overflow-hidden -mt-2">
          <div className="absolute right-0 top-0 -mr-6 -mt-6 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
          <div className="relative z-10 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 bg-[#FFC107] text-slate-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                <HeartHandshake className="w-3.5 h-3.5" /> Pesan & Kesan
              </div>
              <h2 className="text-xl font-black text-white tracking-tight">
                Suara Warga Sekolah & Masyarakat
              </h2>
              <p className="text-xs text-slate-200 leading-relaxed max-w-lg">
                Sampaikan kesan, apresiasi, dan harapan Anda untuk kemajuan SDN 004 Sebatik Tengah di perbatasan Kalimantan Utara.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Sub-Tabs */}
        <div className="flex items-center border-b border-slate-200 px-1 gap-2 text-xs font-bold">
          <button
            onClick={() => setActiveTab('list')}
            className={`pb-2.5 px-3 border-b-2 transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'list'
                ? 'border-[#0F52BA] text-[#0F52BA]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Lihat Pesan & Kesan ({feedbacks.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('form')}
            className={`pb-2.5 px-3 border-b-2 transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'form'
                ? 'border-[#0F52BA] text-[#0F52BA]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <PenTool className="w-4 h-4 text-amber-500" />
            <span>+ Tulis Pesan & Kesan</span>
          </button>
        </div>

        {/* TAB 1: LIST PESAN & KESAN */}
        {activeTab === 'list' && (
          <div className="space-y-4">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'semua', label: 'Semua' },
                  { id: 'orang tua', label: 'Orang Tua / Wali' },
                  { id: 'siswa', label: 'Siswa' },
                  { id: 'alumni', label: 'Alumni' },
                  { id: 'masyarakat', label: 'Tamu / Masyarakat' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFilterRole(f.id)}
                    className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                      filterRole === f.id
                        ? 'bg-[#0F52BA] text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setActiveTab('form')}
                className="text-[11px] font-bold text-[#0F52BA] hover:underline flex items-center gap-1 cursor-pointer"
              >
                + Tambah Baru
              </button>
            </div>

            {/* Feedbacks Grid */}
            <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
              {filteredFeedbacks.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-50 hover:bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm transition space-y-2.5 relative group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-[#0F52BA]/10 text-[#0F52BA] flex items-center justify-center font-black text-xs shrink-0">
                        {item.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-xs text-slate-900 leading-tight">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span
                            className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${roleBadgeColor(
                              item.role
                            )}`}
                          >
                            {item.role}
                          </span>
                          <span className="text-[10px] text-slate-400">{item.createdAt}</span>
                        </div>
                      </div>
                    </div>

                    {/* Star Rating */}
                    <div className="flex items-center text-amber-400 gap-0.5 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200/60 shrink-0">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < item.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Impression Box */}
                  {item.impression && (
                    <div className="bg-blue-50/70 text-slate-800 p-2.5 rounded-xl text-xs font-bold border border-blue-100 flex items-start gap-2">
                      <Quote className="w-3.5 h-3.5 text-[#0F52BA] shrink-0 mt-0.5" />
                      <p className="italic">"{item.impression}"</p>
                    </div>
                  )}

                  {/* Message Content */}
                  <p className="text-xs text-slate-600 leading-relaxed pl-1">
                    {item.message}
                  </p>

                  {/* Action Bar */}
                  <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px]">
                    <span className="text-emerald-700 font-semibold flex items-center gap-1 text-[10px]">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Warga Terverifikasi
                    </span>

                    <button
                      onClick={() => item.id && handleLike(item.id)}
                      className="text-slate-500 hover:text-rose-600 font-bold flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-slate-200 hover:border-rose-200 transition cursor-pointer text-[10px]"
                    >
                      <ThumbsUp className="w-3 h-3 text-rose-500" />
                      <span>Sangat Bermanfaat</span>
                      {item.id && likes[item.id] ? (
                        <span className="bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded font-extrabold text-[9px]">
                          +{likes[item.id]}
                        </span>
                      ) : null}
                    </button>
                  </div>
                </div>
              ))}

              {filteredFeedbacks.length === 0 && (
                <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-2">
                  <MessageSquare className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-xs text-slate-500 font-medium">
                    Belum ada pesan dan kesan pada kategori ini.
                  </p>
                  <button
                    onClick={() => setActiveTab('form')}
                    className="text-xs font-extrabold text-[#0F52BA] hover:underline"
                  >
                    Jadilah yang pertama menulis pesan & kesan &rarr;
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: FORM TULIS PESAN & KESAN */}
        {activeTab === 'form' && (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs animate-in fade-in duration-150">
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-amber-900 text-[11px] leading-relaxed flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                Pesan & kesan Anda akan langsung ditampilkan di halaman utama sekolah sebagai motivasi dan evaluasi positif.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Nama Lengkap Anda *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pak Supriyanto / Ibu Maria"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F52BA] bg-white text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Peran / Status Anda *
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F52BA] bg-white text-slate-900 font-semibold"
                >
                  <option value="Orang Tua / Wali">Orang Tua / Wali Murid</option>
                  <option value="Siswa">Siswa / Siswi Aktif</option>
                  <option value="Alumni">Alumni SDN 004</option>
                  <option value="Guru / Staf">Guru / Tenaga Pendidik</option>
                  <option value="Masyarakat / Tamu">Masyarakat / Tamu Umum</option>
                </select>
              </div>
            </div>

            {/* Interactive Rating Stars */}
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Penilaian Kepuasan untuk Sekolah *
              </label>
              <div className="flex items-center gap-1.5 py-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 text-amber-400 hover:scale-125 transition duration-150 cursor-pointer"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= (hoverRating || rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-extrabold text-slate-700 ml-2">
                  {rating === 5 && 'Sangat Memuaskan ⭐⭐⭐⭐⭐'}
                  {rating === 4 && 'Sangat Baik ⭐⭐⭐⭐'}
                  {rating === 3 && 'Cukup Baik ⭐⭐⭐'}
                  {rating === 2 && 'Perlu Peningkatan ⭐⭐'}
                  {rating === 1 && 'Kurang ⭐'}
                </span>
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Kesan Ringkas (Judul Kesan Utama)
              </label>
              <input
                type="text"
                placeholder="Contoh: Sekolah Ramah Anak, Guru Berdedikasi, Pembelajaran Digital Inovatif!"
                value={impression}
                onChange={(e) => setImpression(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F52BA] bg-white text-slate-900"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Isi Pesan, Kesan & Harapan Lengkap *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Tuliskan pengalaman, kesan berkesan, pesan untuk guru, atau saran membangun untuk SDN 004 Sebatik Tengah..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F52BA] bg-white text-slate-900"
              />
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-100">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#0F52BA] hover:bg-blue-700 text-white font-extrabold px-6 py-3 rounded-xl flex items-center gap-2 cursor-pointer transition shadow-md disabled:opacity-50"
              >
                <Send className="w-4 h-4 text-[#FFC107]" />
                {isSubmitting ? 'Mengirim Pesan...' : 'Kirim Pesan & Kesan'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('list')}
                className="bg-slate-100 text-slate-700 font-bold px-5 py-3 rounded-xl cursor-pointer hover:bg-slate-200 transition"
              >
                Batal / Kembali
              </button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};
