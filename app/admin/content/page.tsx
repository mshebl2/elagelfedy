'use client';

import React, { useState, useEffect } from 'react';
import { SiteContentType } from '@/types';
import {
  Save,
  CheckCircle2,
  AlertCircle,
  FileText,
  Target,
  Users,
  BarChart3,
  Sparkles,
  Layers,
  Upload
} from 'lucide-react';

export default function AdminContentPage() {
  const [content, setContent] = useState<SiteContentType | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'about' | 'vision' | 'leadership' | 'metrics' | 'hero'>('about');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadContent = async () => {
    try {
      const res = await fetch('/api/admin/content');
      const data = await res.json();
      if (data.success) {
        setContent(data.data);
      }
    } catch (err) {
      console.error('Error loading content:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: 'success', text: 'تم حفظ ونشر التعديلات على المحتوى بنجاح!' });
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

  if (loading || !content) {
    return (
      <div className="flex items-center justify-center p-12 text-[#0f382a]">
        <div className="w-6 h-6 border-2 border-[#c5a869] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const tabs = [
    { id: 'about', label: 'عن الشركة (About)', icon: FileText },
    { id: 'vision', label: 'الرؤية والرسالة والقيم', icon: Target },
    { id: 'leadership', label: 'الإدارة والقيادة (Leadership)', icon: Users },
    { id: 'metrics', label: 'الأرقام والإحصائيات (Stats)', icon: BarChart3 },
    { id: 'hero', label: 'نصوص الواجهة الرئيسية (Hero)', icon: Layers },
  ];

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0f382a]/10 text-[#0f382a] text-xs font-bold mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>إدارة المحتوى المكتوب</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-wide">
            التحكم في المحتوى ونصوص صفحات الموقع (Site Content CMS)
          </h1>
          <p className="text-xs text-slate-500">
            تعديل نصوص من نحن، الرؤية والرسالة، قيم الشركة، نبذات القادة، وأرقام وإحصائيات الإنجاز
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-[#0f382a] hover:bg-[#164e3b] text-white shadow-xs font-bold text-xs rounded flex items-center gap-2 shadow-lg hover:brightness-110 transition-all disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'جاري الحفظ...' : 'حفظ ونشر التعديلات'}</span>
        </button>
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

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all shrink-0 ${
                isActive
                  ? 'bg-[#0f382a] text-[#0c0e10] shadow-md'
                  : 'bg-white text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: About Section */}
      {activeTab === 'about' && (
        <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-3">
            نصوص صفحة وقسم عن الشركة (About Alaaj Alfedhi)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-600 font-semibold mb-1">
                عنوان قسم عن الشركة بالعربية *
              </label>
              <input
                type="text"
                value={content.about.titleAr}
                onChange={(e) =>
                  setContent({
                    ...content,
                    about: { ...content.about, titleAr: e.target.value },
                  })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">
                عنوان قسم عن الشركة بالإنجليزية *
              </label>
              <input
                type="text"
                value={content.about.titleEn}
                onChange={(e) =>
                  setContent({
                    ...content,
                    about: { ...content.about, titleEn: e.target.value },
                  })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block text-slate-600 font-semibold mb-1">
              النص التعريفي الشامل بالعربية (Arabic Description) *
            </label>
            <textarea
              rows={4}
              value={content.about.descriptionAr}
              onChange={(e) =>
                setContent({
                  ...content,
                  about: { ...content.about, descriptionAr: e.target.value },
                })
              }
              className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900 leading-relaxed"
            />
          </div>

          <div className="text-xs">
            <label className="block text-slate-600 font-semibold mb-1">
              النص التعريفي الشامل بالإنجليزية (English Description) *
            </label>
            <textarea
              rows={4}
              value={content.about.descriptionEn}
              onChange={(e) =>
                setContent({
                  ...content,
                  about: { ...content.about, descriptionEn: e.target.value },
                })
              }
              className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900 leading-relaxed"
            />
          </div>
        </div>
      )}

      {/* Tab 2: Vision, Mission & Values */}
      {activeTab === 'vision' && (
        <div className="space-y-6">
          {/* Vision & Mission */}
          <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-3">
              الرؤية والرسالة المؤسسية (Vision & Mission)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">نص الرؤية بالعربية</label>
                <textarea
                  rows={3}
                  value={content.about.vision.textAr}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      about: {
                        ...content.about,
                        vision: { ...content.about.vision, textAr: e.target.value },
                      },
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">نص الرؤية بالإنجليزية</label>
                <textarea
                  rows={3}
                  value={content.about.vision.textEn}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      about: {
                        ...content.about,
                        vision: { ...content.about.vision, textEn: e.target.value },
                      },
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">نص الرسالة بالعربية</label>
                <textarea
                  rows={3}
                  value={content.about.mission.textAr}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      about: {
                        ...content.about,
                        mission: { ...content.about.mission, textAr: e.target.value },
                      },
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">نص الرسالة بالإنجليزية</label>
                <textarea
                  rows={3}
                  value={content.about.mission.textEn}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      about: {
                        ...content.about,
                        mission: { ...content.about.mission, textEn: e.target.value },
                      },
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-3">
              القيم الجوهرية (Core Values)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {content.about.values?.map((val, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                  <span className="text-xs font-bold text-[#0f382a] font-technical">{val.number}</span>
                  <div>
                    <input
                      type="text"
                      value={val.titleAr}
                      onChange={(e) => {
                        const updated = [...content.about.values];
                        updated[idx].titleAr = e.target.value;
                        setContent({ ...content, about: { ...content.about, values: updated } });
                      }}
                      className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-900 font-bold"
                    />
                  </div>
                  <div>
                    <textarea
                      rows={2}
                      value={val.descriptionAr}
                      onChange={(e) => {
                        const updated = [...content.about.values];
                        updated[idx].descriptionAr = e.target.value;
                        setContent({ ...content, about: { ...content.about, values: updated } });
                      }}
                      className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-[11px] text-slate-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Leadership Team */}
      {activeTab === 'leadership' && (
        <div className="space-y-6">
          {content.about.leadership?.map((leader, idx) => (
            <div key={idx} className="p-6 bg-white border border-slate-200 rounded-xl space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between border-b border-slate-200 pb-3">
                <span>الملف القيادي #{idx + 1} - {leader.nameAr}</span>
                <span className="text-[10px] text-[#0f382a] font-technical">{leader.experienceAr}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">الاسم بالعربية</label>
                  <input
                    type="text"
                    value={leader.nameAr}
                    onChange={(e) => {
                      const updated = [...content.about.leadership];
                      updated[idx].nameAr = e.target.value;
                      setContent({ ...content, about: { ...content.about, leadership: updated } });
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">الاسم بالإنجليزية</label>
                  <input
                    type="text"
                    value={leader.nameEn}
                    onChange={(e) => {
                      const updated = [...content.about.leadership];
                      updated[idx].nameEn = e.target.value;
                      setContent({ ...content, about: { ...content.about, leadership: updated } });
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">المنصب بالعربية</label>
                  <input
                    type="text"
                    value={leader.roleAr}
                    onChange={(e) => {
                      const updated = [...content.about.leadership];
                      updated[idx].roleAr = e.target.value;
                      setContent({ ...content, about: { ...content.about, leadership: updated } });
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">المنصب بالإنجليزية</label>
                  <input
                    type="text"
                    value={leader.roleEn}
                    onChange={(e) => {
                      const updated = [...content.about.leadership];
                      updated[idx].roleEn = e.target.value;
                      setContent({ ...content, about: { ...content.about, leadership: updated } });
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="block text-slate-600 font-semibold mb-1">الكلمة الاقتباسية بالعربية</label>
                <textarea
                  rows={3}
                  value={leader.quoteAr}
                  onChange={(e) => {
                    const updated = [...content.about.leadership];
                    updated[idx].quoteAr = e.target.value;
                    setContent({ ...content, about: { ...content.about, leadership: updated } });
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Metrics and Stats */}
      {activeTab === 'metrics' && (
        <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-3">
            الأرقام والإحصائيات الميدانية للشركة (Key Engineering Metrics)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {content.hero.metrics?.map((metric, idx) => (
              <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-technical">المعيار #{idx + 1}</span>
                  <label className="flex items-center gap-1 cursor-pointer text-[10px] text-emerald-700">
                    <input
                      type="checkbox"
                      checked={metric.highlight}
                      onChange={(e) => {
                        const updated = [...content.hero.metrics];
                        updated[idx].highlight = e.target.checked;
                        setContent({ ...content, hero: { ...content.hero, metrics: updated } });
                      }}
                      className="rounded border-slate-200 text-[#0f382a]"
                    />
                    <span>إبراز الرقم (Gold Highlight)</span>
                  </label>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">القيمة الرقمية (Value) *</label>
                  <input
                    type="text"
                    dir="ltr"
                    value={metric.value}
                    onChange={(e) => {
                      const updated = [...content.hero.metrics];
                      updated[idx].value = e.target.value;
                      setContent({ ...content, hero: { ...content.hero, metrics: updated } });
                    }}
                    className="w-full bg-white border border-slate-200 rounded px-3 py-2 text-slate-900 font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">المسمى بالعربية</label>
                    <input
                      type="text"
                      value={metric.labelAr}
                      onChange={(e) => {
                        const updated = [...content.hero.metrics];
                        updated[idx].labelAr = e.target.value;
                        setContent({ ...content, hero: { ...content.hero, metrics: updated } });
                      }}
                      className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">المسمى بالإنجليزية</label>
                    <input
                      type="text"
                      value={metric.labelEn}
                      onChange={(e) => {
                        const updated = [...content.hero.metrics];
                        updated[idx].labelEn = e.target.value;
                        setContent({ ...content, hero: { ...content.hero, metrics: updated } });
                      }}
                      className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-slate-900"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Hero Main Texts */}
      {activeTab === 'hero' && (
        <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-3">
            النصوص الرئيسية للواجهة (Hero Headlines & Subtitle)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-600 font-semibold mb-1">العنوان الرئيسي بالعربية</label>
              <input
                type="text"
                value={content.hero.titleAr}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, titleAr: e.target.value },
                  })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-semibold mb-1">العنوان الرئيسي بالإنجليزية</label>
              <input
                type="text"
                value={content.hero.titleEn}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, titleEn: e.target.value },
                  })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-600 font-semibold mb-1">النص المميز (Highlight) بالعربية</label>
              <input
                type="text"
                value={content.hero.highlightAr}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, highlightAr: e.target.value },
                  })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-semibold mb-1">النص المميز بالإنجليزية</label>
              <input
                type="text"
                value={content.hero.highlightEn}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, highlightEn: e.target.value },
                  })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block text-slate-600 font-semibold mb-1">النص التعريفي للواجهة بالعربية</label>
            <textarea
              rows={3}
              value={content.hero.subtitleAr}
              onChange={(e) =>
                setContent({
                  ...content,
                  hero: { ...content.hero, subtitleAr: e.target.value },
                })
              }
              className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
            />
          </div>
        </div>
      )}
    </form>
  );
}
