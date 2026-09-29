'use client';

import React, { useState, useEffect } from 'react';
import { CertificationType } from '@/types';
import { Plus, Edit2, Trash2, Upload, X, Award, ShieldCheck } from 'lucide-react';

export default function AdminCertificationsPage() {
  const [certs, setCerts] = useState<CertificationType[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<CertificationType | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState<Partial<CertificationType>>({
    titleAr: '',
    titleEn: '',
    certNumber: '',
    issuerAr: '',
    issuerEn: '',
    descriptionAr: '',
    descriptionEn: '',
    type: 'iso',
    image: '',
    order: 0,
  });

  const loadCerts = async () => {
    try {
      const res = await fetch(`/api/admin/certifications?_t=${Date.now()}`, {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' },
      });
      const data = await res.json();
      if (data.success) {
        setCerts(data.data);
      }
    } catch (err) {
      console.error('Error loading certifications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCerts();
  }, []);

  const openCreateModal = () => {
    setEditingCert(null);
    setFormData({
      titleAr: '',
      titleEn: '',
      certNumber: '',
      issuerAr: 'منظمة المعايير الدولية (ISO)',
      issuerEn: 'ISO',
      descriptionAr: '',
      descriptionEn: '',
      type: 'iso',
      image: '',
      order: certs.length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (item: CertificationType) => {
    setEditingCert(item);
    setFormData({ ...item });
    setModalOpen(true);
  };

  const handleFileUpload = async (file: File) => {
    const data = new FormData();
    data.append('file', file);
    setUploading(true);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: data,
      });
      const result = await res.json();
      if (result.success) {
        setFormData((prev) => ({ ...prev, image: result.url }));
      }
    } catch (err) {
      alert('Upload error');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch('/api/admin/certifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setModalOpen(false);
        await loadCerts();
      }
    } catch (err) {
      alert('Error saving certification');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-wide">
            شهادات الجودة والاعتمادات الرسمية (Quality & Governance)
          </h2>
          <p className="text-xs text-slate-500">
            إدارة شهادات ISO، وجوائز أرامكو للسلامة، واعتمادات وزارة التجارة وهيئة الزكاة
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 bg-[#0f382a] hover:bg-[#b39556] text-[#0c0e10] font-bold text-xs rounded flex items-center gap-2 transition-all shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة شهادة جديدة</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {certs.map((cert, idx) => (
          <div
            key={idx}
            className="border border-slate-200 bg-white rounded-lg overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="h-44 w-full bg-slate-50 border-b border-slate-200 p-3 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cert.image}
                  alt={cert.titleAr}
                  className="h-full w-auto object-contain"
                />
              </div>
              <div className="p-4 space-y-2">
                <span className="text-[10px] text-[#0f382a] font-bold uppercase block">
                  {cert.certNumber || cert.type}
                </span>
                <h3 className="text-sm font-bold text-slate-900">{cert.titleAr}</h3>
                <p className="text-xs font-technical text-slate-500">{cert.titleEn}</p>
                <p className="text-xs text-slate-600 line-clamp-2">{cert.descriptionAr}</p>
              </div>
            </div>

            <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2">
              <button
                onClick={() => openEditModal(cert)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs rounded flex items-center gap-1"
              >
                <Edit2 className="w-3.5 h-3.5 text-[#0f382a]" />
                <span>تعديل</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 w-full max-w-2xl rounded-lg shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-sm font-bold text-slate-900">
                {editingCert ? 'تعديل بيانات الشهادة' : 'إضافة شهادة / اعتماد جديد'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-500 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">اسم الشهادة بالعربية *</label>
                  <input
                    required
                    type="text"
                    value={formData.titleAr}
                    onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">اسم الشهادة بالإنجليزية *</label>
                  <input
                    required
                    type="text"
                    value={formData.titleEn}
                    onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">رقم الشهادة / المرجع</label>
                  <input
                    type="text"
                    placeholder="NO. 305025112242Q"
                    value={formData.certNumber}
                    onChange={(e) => setFormData({ ...formData, certNumber: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">نوع الاعتماد</label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value as CertificationType['type'] })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
                  >
                    <option value="iso">شهادة أيزو (ISO Certificate)</option>
                    <option value="award">جائزة / اعتماد أرامكو (Award/Authorization)</option>
                    <option value="credential">سجل حكومي (CR / ZATCA / SPL / GOSI)</option>
                  </select>
                </div>
              </div>

              {/* Image */}
              <div className="space-y-2 border border-slate-200 p-3 rounded bg-slate-50">
                <label className="block text-slate-600 font-semibold">صورة الوثيقة المعتمدة *</label>
                <div className="flex gap-2">
                  <input
                    required
                    type="text"
                    placeholder="رابط الصورة https://..."
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="flex-1 bg-white border border-slate-200 rounded px-3 py-2 text-slate-900"
                  />
                  <label className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded cursor-pointer flex items-center gap-1.5 shrink-0">
                    <Upload className="w-3.5 h-3.5 text-[#0f382a]" />
                    <span>{uploading ? 'رفع...' : 'رفع ملف'}</span>
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

              <div>
                <label className="block text-slate-600 font-semibold mb-1">الوصف بالعربية</label>
                <textarea
                  rows={2}
                  value={formData.descriptionAr}
                  onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
                ></textarea>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">الوصف بالإنجليزية</label>
                <textarea
                  rows={2}
                  value={formData.descriptionEn}
                  onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
                ></textarea>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-[#0f382a] hover:bg-[#b39556] text-[#0c0e10] font-bold rounded"
                >
                  {saving ? 'جاري الحفظ...' : 'حفظ الشهادة'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
