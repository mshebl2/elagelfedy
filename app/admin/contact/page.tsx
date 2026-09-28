'use client';

import React, { useState, useEffect } from 'react';
import { ContactSettingsType } from '@/types';
import {
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Share2,
  FileCheck2,
  Save,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Building
} from 'lucide-react';

export default function AdminContactPage() {
  const [settings, setSettings] = useState<ContactSettingsType>({
    phone: '+966 55 522 7109',
    secondaryPhone: '+966 50 123 4567',
    whatsapp: '+966555227109',
    email: 'info@aacc-ksa.com',
    tendersEmail: 'tenders@aacc-ksa.com',
    addressAr: 'المملكة العربية السعودية - الرياض - حي الملقا - طريق أنس بن مالك',
    addressEn: 'Anas Bin Malik Road, Al-Malqa District, Riyadh, Kingdom of Saudi Arabia',
    cr: '1010892415',
    unifiedNo: '7028913401',
    vatNo: '311289451200003',
    gosiNo: '629810452',
    chamberNo: '101000892415',
    mapEmbedUrl: '',
    social: {
      twitter: 'https://x.com/aacc_ksa',
      linkedin: 'https://linkedin.com/company/aacc-ksa',
      instagram: 'https://instagram.com/aacc_ksa',
      youtube: 'https://youtube.com/@aacc_ksa',
      facebook: 'https://facebook.com/aacc.ksa',
    },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadSettings = async () => {
    try {
      const res = await fetch('/api/admin/contact');
      const data = await res.json();
      if (data.success) {
        setSettings(data.data);
      }
    } catch (err) {
      console.error('Error loading contact settings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: 'success', text: 'تم حفظ وسائل الاتصال وروابط السوشيال بنجاح!' });
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
            <Phone className="w-3.5 h-3.5" />
            <span>بيانات الاتصال والتواصل</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-wide">
            التحكم في وسائل الاتصال وروابط التواصل (Contact & Social)
          </h1>
          <p className="text-xs text-slate-500">
            تعديل أرقام الهاتف، الواتساب المباشر، البريد الرسمي، العنوان الميداني، والسجلات الرسمية
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 bg-[#0f382a] hover:bg-[#164e3b] text-white shadow-xs font-bold text-xs rounded flex items-center gap-2 shadow-lg hover:brightness-110 transition-all disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'جاري الحفظ...' : 'حفظ بيانات الاتصال'}</span>
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

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. Phone & WhatsApp */}
        <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3">
            <Phone className="w-4 h-4 text-[#0f382a]" />
            <span>أرقام الاتصال والواتساب السريع (Direct Phone & WhatsApp)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-slate-600 font-semibold mb-1">
                رقم الهاتف المباشر (Primary Phone) *
              </label>
              <input
                required
                type="text"
                dir="ltr"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                placeholder="+966 55 522 7109"
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-600 font-semibold mb-1">
                رقم الواتساب للتواصل الفوري (WhatsApp) *
              </label>
              <div className="relative">
                <input
                  required
                  type="text"
                  dir="ltr"
                  value={settings.whatsapp}
                  onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                  placeholder="+966555227109"
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-emerald-700 font-bold"
                />
                <MessageSquare className="w-3.5 h-3.5 text-emerald-700 absolute end-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-600 font-semibold mb-1">
                رقم هاتف إضافي (Secondary Phone)
              </label>
              <input
                type="text"
                dir="ltr"
                value={settings.secondaryPhone || ''}
                onChange={(e) => setSettings({ ...settings, secondaryPhone: e.target.value })}
                placeholder="+966 50 123 4567"
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-900"
              />
            </div>
          </div>
        </div>

        {/* 2. Emails & Addresses */}
        <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3">
            <Mail className="w-4 h-4 text-[#0f382a]" />
            <span>عناوين البريد الإلكتروني والموقع الجغرافي (Emails & Location)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-600 font-semibold mb-1">
                البريد الإلكتروني العام (General Inquiries) *
              </label>
              <input
                required
                type="email"
                dir="ltr"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                placeholder="info@aacc-ksa.com"
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-600 font-semibold mb-1">
                بريد المناقصات والمشاريع (Tenders & RFQs)
              </label>
              <input
                type="email"
                dir="ltr"
                value={settings.tendersEmail || ''}
                onChange={(e) => setSettings({ ...settings, tendersEmail: e.target.value })}
                placeholder="tenders@aacc-ksa.com"
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-600 font-semibold mb-1">
                العنوان الرئيسي بالعربية *
              </label>
              <input
                required
                type="text"
                value={settings.addressAr}
                onChange={(e) => setSettings({ ...settings, addressAr: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-600 font-semibold mb-1">
                العنوان الرئيسي بالإنجليزية *
              </label>
              <input
                required
                type="text"
                value={settings.addressEn}
                onChange={(e) => setSettings({ ...settings, addressEn: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-600 font-semibold mb-1">
              رابط تضمين خرائط جوجل (Google Maps Embed URL)
            </label>
            <input
              type="text"
              dir="ltr"
              value={settings.mapEmbedUrl || ''}
              onChange={(e) => setSettings({ ...settings, mapEmbedUrl: e.target.value })}
              placeholder="https://www.google.com/maps/embed?pb=..."
              className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-900"
            />
          </div>
        </div>

        {/* 3. Official IDs and Registrations */}
        <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3">
            <FileCheck2 className="w-4 h-4 text-[#0f382a]" />
            <span>السجلات الحكومية والاعتمادات الرسمية (Corporate Governance IDs)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-[11px] text-slate-600 font-semibold mb-1">
                السجل التجاري (CR No.)
              </label>
              <input
                type="text"
                dir="ltr"
                value={settings.cr}
                onChange={(e) => setSettings({ ...settings, cr: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-900 font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-600 font-semibold mb-1">
                الرقم الموحد (Unified No. 700)
              </label>
              <input
                type="text"
                dir="ltr"
                value={settings.unifiedNo}
                onChange={(e) => setSettings({ ...settings, unifiedNo: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-900 font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-600 font-semibold mb-1">
                الرقم الضريبي (VAT ID)
              </label>
              <input
                type="text"
                dir="ltr"
                value={settings.vatNo}
                onChange={(e) => setSettings({ ...settings, vatNo: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-900 font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-600 font-semibold mb-1">
                اشتراك التأمينات (GOSI ID)
              </label>
              <input
                type="text"
                dir="ltr"
                value={settings.gosiNo}
                onChange={(e) => setSettings({ ...settings, gosiNo: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-900 font-mono"
              />
            </div>
          </div>
        </div>

        {/* 4. Social Media Links */}
        <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3">
            <Share2 className="w-4 h-4 text-[#0f382a]" />
            <span>روابط منصات التواصل الاجتماعي (Social Media Links)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] text-slate-600 font-semibold mb-1">
                منصة إكس / تويتر (Twitter / X)
              </label>
              <input
                type="url"
                dir="ltr"
                value={settings.social.twitter}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    social: { ...settings.social, twitter: e.target.value },
                  })
                }
                placeholder="https://x.com/aacc_ksa"
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-900"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-600 font-semibold mb-1">
                لينكد إن (LinkedIn)
              </label>
              <input
                type="url"
                dir="ltr"
                value={settings.social.linkedin}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    social: { ...settings.social, linkedin: e.target.value },
                  })
                }
                placeholder="https://linkedin.com/company/aacc-ksa"
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-900"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-600 font-semibold mb-1">
                إنستغرام (Instagram)
              </label>
              <input
                type="url"
                dir="ltr"
                value={settings.social.instagram}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    social: { ...settings.social, instagram: e.target.value },
                  })
                }
                placeholder="https://instagram.com/aacc_ksa"
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-900"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-600 font-semibold mb-1">
                يوتيوب (YouTube)
              </label>
              <input
                type="url"
                dir="ltr"
                value={settings.social.youtube}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    social: { ...settings.social, youtube: e.target.value },
                  })
                }
                placeholder="https://youtube.com/@aacc_ksa"
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-900"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-600 font-semibold mb-1">
                فيسبوك (Facebook)
              </label>
              <input
                type="url"
                dir="ltr"
                value={settings.social.facebook || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    social: { ...settings.social, facebook: e.target.value },
                  })
                }
                placeholder="https://facebook.com/aacc.ksa"
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-900"
              />
            </div>
          </div>
        </div>

        {/* Bottom Save Bar */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-[#0f382a] hover:bg-[#164e3b] text-white shadow-xs font-bold text-xs rounded flex items-center gap-2 shadow-xl hover:brightness-110 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'جاري الحفظ...' : 'حفظ كل التغييرات الآن'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
