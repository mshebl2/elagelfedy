'use client';

import React, { useState, useEffect } from 'react';
import { HeroSlideType } from '@/types';
import {
  Plus,
  Trash2,
  Upload,
  Save,
  CheckCircle2,
  Image as ImageIcon,
  Eye,
  ArrowUp,
  ArrowDown,
  Layers,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export default function AdminHeroSlidesPage() {
  const [slides, setSlides] = useState<HeroSlideType[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);

  const loadSlides = async () => {
    try {
      const res = await fetch(`/api/admin/hero?_t=${Date.now()}`, {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' },
      });
      const data = await res.json();
      if (data.success) {
        setSlides(data.data);
      }
    } catch (err) {
      console.error('Error loading hero slides:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSlides();
  }, []);

  const handleAddSlide = () => {
    const newSlide: HeroSlideType = {
      id: `hero-${Date.now()}`,
      image: '/images/hero/hero_slide_1.jpg',
      titleAr: 'عنوان السلايد الجديد بالعربية',
      titleEn: 'New Hero Slide Title in English',
      subtitleAr: 'وصف تفصيلي للنشاط أو التقنية التخصصية المعروضة...',
      subtitleEn: 'Detailed engineering description of the displayed capability...',
      badgeAr: 'تقنية حفر تخصصية',
      badgeEn: 'Specialized Tech',
      active: true,
      order: slides.length + 1,
    };
    setSlides([...slides, newSlide]);
  };

  const handleDeleteSlide = (id?: string) => {
    if (slides.length <= 1) {
      alert('يجب الإبقاء على شريحة واحدة على الأقل للصفحة الرئيسية.');
      return;
    }
    if (!confirm('هل أنت متأكد من حذف هذه الصورة/الشريحة؟')) return;
    setSlides(slides.filter((s) => s.id !== id && s._id !== id));
  };

  const handleUpdateField = (index: number, field: keyof HeroSlideType, value: any) => {
    const updated = [...slides];
    updated[index] = { ...updated[index], [field]: value };
    setSlides(updated);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= slides.length) return;
    const copy = [...slides];
    const temp = copy[index];
    copy[index] = copy[targetIdx];
    copy[targetIdx] = temp;
    // Reassign order
    copy.forEach((item, idx) => {
      item.order = idx + 1;
    });
    setSlides(copy);
  };

  const handleFileUpload = async (file: File, index: number) => {
    const formData = new FormData();
    formData.append('file', file);
    setUploadingIdx(index);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        handleUpdateField(index, 'image', data.url);
      } else {
        alert(data.message || 'فشل رفع الصورة');
      }
    } catch (err) {
      alert('حدث خطأ أثناء رفع الصورة');
    } finally {
      setUploadingIdx(null);
    }
  };

  const handleSaveAll = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/hero', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slides),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: 'success', text: 'تم حفظ صور وإعدادات سلايدر الصفحة الرئيسية بنجاح!' });
        setTimeout(() => setMessage(null), 4000);
      } else {
        setMessage({ type: 'error', text: data.message || 'حدث خطأ أثناء الحفظ' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'خطأ في الاتصال بالخادم' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 text-[#0f382a]">
        <div className="w-6 h-6 border-2 border-[#c5a869] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0f382a]/10 text-[#0f382a] text-xs font-bold mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>سلايدر وخلفيات الصفحة الرئيسية</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-wide">
            التحكم في صور وسلايدر الصفحة الرئيسية (Hero Slides)
          </h1>
          <p className="text-xs text-slate-500">
            إضافة وحذف وتعديل صور الخلفية، العناوين والنصوص التعريفية الخاصة بسلايدر الهيرو الرئيسي
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAddSlide}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 font-bold text-xs rounded flex items-center gap-1.5 transition-all border border-slate-200"
          >
            <Plus className="w-4 h-4 text-[#0f382a]" />
            <span>إضافة شريحة جديدة</span>
          </button>

          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="px-5 py-2 bg-[#0f382a] hover:bg-[#164e3b] text-white shadow-xs font-bold text-xs rounded flex items-center gap-2 shadow-lg hover:brightness-110 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'جاري الحفظ...' : 'حفظ التعديلات'}</span>
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`p-3.5 rounded-lg border text-xs flex items-center gap-2 ${
            message.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-700'
          }`}
        >
          {message.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Slides List */}
      <div className="space-y-6">
        {slides.map((slide, idx) => (
          <div
            key={slide.id || idx}
            className="p-5 bg-white border border-slate-200 rounded-xl shadow-lg space-y-4 relative group"
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#0f382a] text-[#0c0e10] text-xs font-black flex items-center justify-center">
                  {idx + 1}
                </span>
                <h3 className="text-sm font-bold text-slate-900">
                  شريحة العرض #{idx + 1}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {/* Reorder Buttons */}
                <button
                  type="button"
                  onClick={() => handleMove(idx, 'up')}
                  disabled={idx === 0}
                  className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 rounded disabled:opacity-30"
                  title="تحريك لأعلى"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleMove(idx, 'down')}
                  disabled={idx === slides.length - 1}
                  className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 rounded disabled:opacity-30"
                  title="تحريك لأسفل"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>

                {/* Active Toggle */}
                <label className="flex items-center gap-1.5 cursor-pointer ps-2 border-s border-slate-200">
                  <input
                    type="checkbox"
                    checked={slide.active}
                    onChange={(e) => handleUpdateField(idx, 'active', e.target.checked)}
                    className="rounded border-slate-200 text-[#0f382a] focus:ring-[#0f382a]"
                  />
                  <span className="text-[11px] text-slate-600">مفعلة</span>
                </label>

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => handleDeleteSlide(slide.id || slide._id)}
                  className="p-1.5 bg-red-50 hover:bg-red-900/80 text-red-700 rounded transition-colors ms-2"
                  title="حذف الشريحة"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Slide Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              {/* Image Preview & Upload (5 Cols) */}
              <div className="lg:col-span-5 space-y-3">
                <div className="relative h-48 w-full rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slide.image}
                    alt={slide.titleAr}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 start-2 end-2 text-[11px] text-slate-700 truncate font-technical">
                    {slide.titleAr}
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={slide.image}
                    onChange={(e) => handleUpdateField(idx, 'image', e.target.value)}
                    placeholder="رابط الصورة /images/hero/..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-900"
                  />
                  <label className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 rounded text-xs cursor-pointer flex items-center gap-1 shrink-0 border border-slate-200">
                    <Upload className="w-3 h-3 text-[#0f382a]" />
                    <span>{uploadingIdx === idx ? 'رفع...' : 'رفع صورة'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) handleFileUpload(e.target.files[0], idx);
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Text Fields (7 Cols) */}
              <div className="lg:col-span-7 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-600 font-semibold mb-1">
                      العنوان بالعربية *
                    </label>
                    <input
                      type="text"
                      value={slide.titleAr}
                      onChange={(e) => handleUpdateField(idx, 'titleAr', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-600 font-semibold mb-1">
                      العنوان بالإنجليزية (English Title) *
                    </label>
                    <input
                      type="text"
                      value={slide.titleEn}
                      onChange={(e) => handleUpdateField(idx, 'titleEn', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-xs text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-600 font-semibold mb-1">
                      الوصف الفرعي بالعربية
                    </label>
                    <textarea
                      rows={2}
                      value={slide.subtitleAr}
                      onChange={(e) => handleUpdateField(idx, 'subtitleAr', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-600 font-semibold mb-1">
                      الوصف الفرعي بالإنجليزية
                    </label>
                    <textarea
                      rows={2}
                      value={slide.subtitleEn}
                      onChange={(e) => handleUpdateField(idx, 'subtitleEn', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-xs text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-600 font-semibold mb-1">
                      شارة التصنيف بالعربية (Badge)
                    </label>
                    <input
                      type="text"
                      value={slide.badgeAr || ''}
                      onChange={(e) => handleUpdateField(idx, 'badgeAr', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-xs text-slate-900"
                      placeholder="مثال: أسطول الحفر التخصصي"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-600 font-semibold mb-1">
                      شارة التصنيف بالإنجليزية
                    </label>
                    <input
                      type="text"
                      value={slide.badgeEn || ''}
                      onChange={(e) => handleUpdateField(idx, 'badgeEn', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-xs text-slate-900"
                      placeholder="e.g. Specialized Fleet"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Save Bar */}
      <div className="pt-4 border-t border-slate-200 flex items-center justify-end">
        <button
          onClick={handleSaveAll}
          disabled={saving}
          className="px-6 py-2.5 bg-[#0f382a] hover:bg-[#164e3b] text-white shadow-xs font-bold text-xs rounded flex items-center gap-2 shadow-xl hover:brightness-110 transition-all disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'جاري الحفظ...' : 'حفظ كل التغييرات الآن'}</span>
        </button>
      </div>
    </div>
  );
}
