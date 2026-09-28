'use client';

import React, { useState, useEffect } from 'react';
import { SiteContentType } from '@/types';
import { Save, CheckCircle, Search, Globe, Share2 } from 'lucide-react';

export default function AdminSeoPage() {
  const [content, setContent] = useState<SiteContentType | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/admin/content');
        const data = await res.json();
        if (data.success) {
          setContent(data.data);
        }
      } catch (err) {
        console.error('Error loading SEO data:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;
    setSaving(true);
    setSavedSuccess(false);

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      const data = await res.json();
      if (data.success) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (err) {
      alert('Error saving SEO settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !content) {
    return (
      <div className="py-12 text-center text-slate-500 text-xs">
        جاري تحميل إعدادات محركات البحث...
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-wide">
            إعدادات محركات البحث والـ SEO (Search Engine Optimization)
          </h2>
          <p className="text-xs text-slate-500">
            التحكم في العناوين والكلمات المفتاحية وبطاقات التواصل الاجتماعي OpenGraph
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-[#0f382a] hover:bg-[#b39556] text-[#0c0e10] font-bold text-xs rounded flex items-center gap-2 transition-all shadow-md cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'جاري الحفظ...' : 'حفظ إعدادات SEO'}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>تم تحديث إعدادات الـ SEO بنجاح!</span>
        </div>
      )}

      {/* Meta Titles */}
      <div className="border border-slate-200 bg-white p-6 rounded-lg space-y-4">
        <h3 className="text-sm font-bold text-[#0f382a] uppercase tracking-wider flex items-center gap-2">
          <Search className="w-4 h-4" />
          <span>عناوين صفحات محركات البحث (Meta Titles)</span>
        </h3>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-600 font-semibold mb-1">
              عنوان الموقع في نتائج البحث بالعربية (Arabic Meta Title)
            </label>
            <input
              type="text"
              value={content.seo.titleAr}
              onChange={(e) =>
                setContent({
                  ...content,
                  seo: { ...content.seo, titleAr: e.target.value },
                })
              }
              className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1">
              عنوان الموقع في نتائج البحث بالإنجليزية (English Meta Title)
            </label>
            <input
              type="text"
              value={content.seo.titleEn}
              onChange={(e) =>
                setContent({
                  ...content,
                  seo: { ...content.seo, titleEn: e.target.value },
                })
              }
              className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
            />
          </div>
        </div>
      </div>

      {/* Meta Descriptions */}
      <div className="border border-slate-200 bg-white p-6 rounded-lg space-y-4">
        <h3 className="text-sm font-bold text-[#0f382a] uppercase tracking-wider flex items-center gap-2">
          <Globe className="w-4 h-4" />
          <span>وصف الموقع لمحركات البحث (Meta Descriptions)</span>
        </h3>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-600 font-semibold mb-1">
              الوصف بالعربية (Arabic Meta Description)
            </label>
            <textarea
              rows={3}
              value={content.seo.descriptionAr}
              onChange={(e) =>
                setContent({
                  ...content,
                  seo: { ...content.seo, descriptionAr: e.target.value },
                })
              }
              className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
            ></textarea>
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1">
              الوصف بالإنجليزية (English Meta Description)
            </label>
            <textarea
              rows={3}
              value={content.seo.descriptionEn}
              onChange={(e) =>
                setContent({
                  ...content,
                  seo: { ...content.seo, descriptionEn: e.target.value },
                })
              }
              className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
            ></textarea>
          </div>
        </div>
      </div>

      {/* OpenGraph Image */}
      <div className="border border-slate-200 bg-white p-6 rounded-lg space-y-4">
        <h3 className="text-sm font-bold text-[#0f382a] uppercase tracking-wider flex items-center gap-2">
          <Share2 className="w-4 h-4" />
          <span>صورة المشاركة على وسائل التواصل (OpenGraph & Twitter Image)</span>
        </h3>

        <div className="text-xs space-y-2">
          <label className="block text-slate-600 font-semibold">رابط صورة المعاينة (OG Image URL)</label>
          <input
            type="text"
            value={content.seo.ogImage}
            onChange={(e) =>
              setContent({
                ...content,
                seo: { ...content.seo, ogImage: e.target.value },
              })
            }
            className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
          />
        </div>
      </div>
    </form>
  );
}
