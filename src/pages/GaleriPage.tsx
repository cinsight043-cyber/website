import React, { useState } from 'react';
import { GalleryItem } from '../types';
import { SectionTitle } from '../components/common/SectionTitle';
import { Modal } from '../components/common/Modal';
import { Calendar, Tag, Image as ImageIcon } from 'lucide-react';

interface GaleriPageProps {
  gallery: GalleryItem[];
}

export const GaleriPage: React.FC<GaleriPageProps> = ({ gallery }) => {
  const [selectedCategory, setSelectedCategory] = useState('semua');
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const categories = [
    'semua',
    'pembelajaran',
    'upacara',
    'olahraga',
    'pramuka',
    'coding & ai',
    'kegiatan guru'
  ];

  const filtered =
    selectedCategory === 'semua'
      ? gallery
      : gallery.filter((g) => g.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="space-y-16 pb-16">
      {/* HEADER BANNER */}
      <section className="bg-gradient-to-r from-slate-900 via-[#0F52BA] to-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8 rounded-3xl shadow-lg">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="bg-[#FFC107] text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Dokumentasi Visual
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Galeri Foto SDN 004 Sebatik Tengah
          </h1>
          <p className="text-sm text-slate-200">
            Rekaman momen keceriaan, belajar mengajar, lomba, dan kegiatan luar kelas.
          </p>
        </div>
      </section>

      {/* FILTER BUTTONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-wrap justify-center gap-2 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl font-bold capitalize transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#0F52BA] text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GALLERY GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item)}
              className="group relative rounded-3xl overflow-hidden shadow-sm border border-slate-200 h-64 cursor-pointer bg-slate-100"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent p-5 flex flex-col justify-end text-white">
                <span className="bg-[#0F52BA] text-white text-[10px] font-bold px-2.5 py-0.5 rounded w-max mb-1">
                  {item.category}
                </span>
                <h3 className="font-extrabold text-sm line-clamp-2 leading-snug">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      <Modal
        isOpen={!!activeImage}
        onClose={() => setActiveImage(null)}
        title={activeImage?.title}
        maxWidth="2xl"
      >
        {activeImage && (
          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden border border-slate-200 max-h-[60vh]">
              <img
                src={activeImage.imageUrl}
                alt={activeImage.title}
                className="w-full h-auto object-contain bg-slate-950"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
              <span className="font-bold text-[#0F52BA] bg-blue-50 px-2.5 py-1 rounded-lg">
                Kategori: {activeImage.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" /> {activeImage.date}
              </span>
            </div>
            {activeImage.description && (
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                {activeImage.description}
              </p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};
