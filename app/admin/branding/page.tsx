'use client';

import React, { useState, useEffect } from 'react';
import { BrandingSettingsType } from '@/types';
import {
  Palette,
  Upload,
  Save,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  Eye,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

export default function AdminBrandingPage() {
  const [settings, setSettings] = useState<BrandingSettingsType>({
    logoUrl: '/images/logo/aacc_official_logo.png',
    logoHeight: 52,
    brandNameAr: 'شركة العاج الفضي للمقاولات',
    brandNameEn: 'Alaaj Alfedhi Contracting Company',
    taglineAr: 'حلول الحفر الأفقي الموجه والأنفاق الدقيقة (HDD & Microtunneling)',
    taglineEn: 'Directional Drilling & Microtunneling Specialists',
    primaryColor: '#0f382a',
    accentGold: '#c5a869',
    darkBg: '#0c0e10',
    faviconUrl: '/favicon.ico',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadSettings = async () => {
    try {
      const res = await fetch('/api/admin/branding');
      const data = await res.json();
      if (data.success) {
        setSettings(data.data);
      }
    } catch (err) {
      console.error('Error loading branding:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    setUploadingLogo(true);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setSettings((prev) => ({ ...prev, logoUrl: data.url }));
      } else {
        alert(data.message || 'فشل رفع الشعار');
      }
    } catch (err) {
      alert('حدث خطأ أثناء رفع ملف الشعار');
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/branding', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: 'success', text: 'تم حفظ وتطبيق إعدادات الشعار والألوان بنجاح!' });
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

  const handleResetColors = () => {
    setSettings((prev) => ({
      ...prev,
      primaryColor: '#0f382a',
      accentGold: '#c5a869',
      darkBg: '#0c0e10',
    }));
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
            <Palette className="w-3.5 h-3.5" />
            <span>الهوية البصرية والألوان</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-wide">
            التحكم في الشعار وحجمه وألوان الموقع (Branding & Colors)
          </h1>
          <p className="text-xs text-slate-500">
            تعديل شعار الشركة الرئيسي، مقاس الشعار بالبكسل، والألوان الرئيسية والثانوية للموقع
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 bg-[#0f382a] hover:bg-[#164e3b] text-white shadow-xs font-bold text-xs rounded flex items-center gap-2 shadow-lg hover:brightness-110 transition-all disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'جاري الحفظ...' : 'حفظ إعدادات الهوية'}</span>
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

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Settings Form (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Logo Section */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3">
              <ShieldCheck className="w-4 h-4 text-[#0f382a]" />
              <span>شعار الشركة والمقاس (Company Logo & Sizing)</span>
            </h3>

            {/* Logo URL / Upload */}
            <div>
              <label className="block text-xs text-slate-600 font-semibold mb-1.5">
                مسار / رابط الشعار (SVG / PNG) *
              </label>
              <div className="flex gap-2">
                <input
                  required
                  type="text"
                  value={settings.logoUrl}
                  onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
                  placeholder="/images/logo/aacc_logo_gold.svg"
                  className="flex-1 bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-900"
                />
                <label className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 rounded text-xs cursor-pointer flex items-center gap-1.5 shrink-0 border border-slate-200">
                  <Upload className="w-3.5 h-3.5 text-[#0f382a]" />
                  <span>{uploadingLogo ? 'رفع...' : 'رفع شعار'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
                    }}
                  />
                </label>
              </div>
            </div>

            {/* Logo Height Slider */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs text-slate-600 font-semibold flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[#0f382a]" />
                  <span>ارتفاع الشعار في الهيدر (Logo Height)</span>
                </label>
                <span className="text-xs font-bold text-[#0f382a] font-technical bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                  {settings.logoHeight}px
                </span>
              </div>
              <input
                type="range"
                min="32"
                max="90"
                value={settings.logoHeight}
                onChange={(e) => setSettings({ ...settings, logoHeight: Number(e.target.value) })}
                className="w-full accent-[#c5a869] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-technical">
                <span>صغير (32px)</span>
                <span>افتراضي (52px)</span>
                <span>كبير (90px)</span>
              </div>
            </div>
          </div>

          {/* Brand Names */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3">
              <span>اسم وهوية الشركة (Brand Identity Texts)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-600 font-semibold mb-1">
                  اسم الشركة الرسمي بالعربية *
                </label>
                <input
                  required
                  type="text"
                  value={settings.brandNameAr}
                  onChange={(e) => setSettings({ ...settings, brandNameAr: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-600 font-semibold mb-1">
                  اسم الشركة الرسمي بالإنجليزية *
                </label>
                <input
                  required
                  type="text"
                  value={settings.brandNameEn}
                  onChange={(e) => setSettings({ ...settings, brandNameEn: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-600 font-semibold mb-1">
                  الشعار اللفظي / الوصف المختصر بالعربية
                </label>
                <input
                  type="text"
                  value={settings.taglineAr}
                  onChange={(e) => setSettings({ ...settings, taglineAr: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-600 font-semibold mb-1">
                  الشعار اللفظي بالإنجليزية
                </label>
                <input
                  type="text"
                  value={settings.taglineEn}
                  onChange={(e) => setSettings({ ...settings, taglineEn: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Color Palette Controls */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Palette className="w-4 h-4 text-[#0f382a]" />
                <span>لوحة ألوان الموقع (Color Tokens)</span>
              </h3>
              <button
                type="button"
                onClick={handleResetColors}
                className="text-[11px] text-slate-500 hover:text-slate-900 flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>استعادة الألوان الافتراضية</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Primary Emerald */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <label className="block text-xs text-slate-600 font-semibold">
                  اللون الأخضر الملكي (Primary)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={settings.primaryColor}
                    onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                    className="w-9 h-9 rounded cursor-pointer border border-slate-200 bg-transparent"
                  />
                  <input
                    type="text"
                    value={settings.primaryColor}
                    onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                    className="flex-1 bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-900 font-mono"
                  />
                </div>
              </div>

              {/* Accent Gold */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <label className="block text-xs text-slate-600 font-semibold">
                  اللون الذهبي السعودي (Accent)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={settings.accentGold}
                    onChange={(e) => setSettings({ ...settings, accentGold: e.target.value })}
                    className="w-9 h-9 rounded cursor-pointer border border-slate-200 bg-transparent"
                  />
                  <input
                    type="text"
                    value={settings.accentGold}
                    onChange={(e) => setSettings({ ...settings, accentGold: e.target.value })}
                    className="flex-1 bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-900 font-mono"
                  />
                </div>
              </div>

              {/* Dark Bg */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <label className="block text-xs text-slate-600 font-semibold">
                  خلفية الوضع الليلي (Dark Bg)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={settings.darkBg}
                    onChange={(e) => setSettings({ ...settings, darkBg: e.target.value })}
                    className="w-9 h-9 rounded cursor-pointer border border-slate-200 bg-transparent"
                  />
                  <input
                    type="text"
                    value={settings.darkBg}
                    onChange={(e) => setSettings({ ...settings, darkBg: e.target.value })}
                    className="flex-1 bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-900 font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Mockup Preview Card (5 cols) */}
        <div className="lg:col-span-5 sticky top-24 space-y-4">
          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3">
              <Eye className="w-4 h-4 text-[#0f382a]" />
              <span>معاينة حية وفورية للهيدر والشعار (Live Preview)</span>
            </h3>

            {/* Mockup Header */}
            <div
              className="p-4 rounded-xl border border-slate-700 space-y-3 shadow-inner"
              style={{ backgroundColor: settings.darkBg }}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={settings.logoUrl}
                    alt="Logo Preview"
                    style={{ height: `${settings.logoHeight}px` }}
                    className="object-contain transition-all"
                  />
                  <div>
                    <span className="text-xs font-black block text-slate-900">
                      {settings.brandNameAr}
                    </span>
                    <span className="text-[9px] text-slate-500 block font-technical">
                      {settings.taglineAr}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  style={{
                    backgroundColor: settings.accentGold,
                    color: settings.darkBg,
                  }}
                  className="px-3 py-1.5 rounded text-[11px] font-bold shadow-sm"
                >
                  طلب تسعير
                </button>
              </div>

              {/* Color Swatch Badges */}
              <div className="pt-2 flex items-center justify-around gap-2 text-center text-[10px]">
                <div className="p-2 rounded bg-white/5 border border-white/10 flex-1">
                  <div
                    className="w-full h-4 rounded mb-1"
                    style={{ backgroundColor: settings.primaryColor }}
                  />
                  <span className="text-slate-600 font-mono">{settings.primaryColor}</span>
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/10 flex-1">
                  <div
                    className="w-full h-4 rounded mb-1"
                    style={{ backgroundColor: settings.accentGold }}
                  />
                  <span className="text-slate-600 font-mono">{settings.accentGold}</span>
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/10 flex-1">
                  <div
                    className="w-full h-4 rounded mb-1"
                    style={{ backgroundColor: settings.darkBg }}
                  />
                  <span className="text-slate-600 font-mono">{settings.darkBg}</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed font-technical">
              * يتم حفظ التعديلات فوراً وتطبيقها في جميع مكونات الموقع مثل الهيدر، الفوتر، والبطاقات التفاعلية.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
