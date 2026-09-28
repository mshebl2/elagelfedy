'use client';

import React, { useState, useEffect } from 'react';
import { ServiceType } from '@/types';
import {
  Edit2,
  Plus,
  Trash2,
  X,
  Save,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  Upload,
  Layers
} from 'lucide-react';

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceType | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState<Partial<ServiceType>>({
    number: '',
    code: '',
    titleAr: '',
    titleEn: '',
    subtitleAr: '',
    subtitleEn: '',
    descriptionAr: '',
    descriptionEn: '',
    image: '',
    tagsAr: [],
    tagsEn: [],
    featuresAr: [],
    featuresEn: [],
    order: 0,
  });

  const loadServices = async () => {
    try {
      const res = await fetch('/api/admin/services');
      const data = await res.json();
      if (data.success) {
        setServices(data.data);
      }
    } catch (err) {
      console.error('Error loading services:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const openCreateModal = () => {
    setEditingService(null);
    const nextNum = String(services.length + 1).padStart(2, '0');
    setFormData({
      number: nextNum,
      code: `4322${String(services.length + 1).padStart(2, '0')}`,
      titleAr: '',
      titleEn: '',
      subtitleAr: '',
      subtitleEn: '',
      descriptionAr: '',
      descriptionEn: '',
      image: '/images/services/service_01_hdd.jpg',
      tagsAr: ['حفر موجه', 'معتمد'],
      tagsEn: ['Trenchless', 'Certified'],
      featuresAr: ['دقة هندسية عالية', 'سجل أمان تام'],
      featuresEn: ['High Precision', 'Zero Harm Record'],
      order: services.length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (service: ServiceType) => {
    setEditingService(service);
    setFormData({ ...service });
    setModalOpen(true);
  };

  const handleFileUpload = async (file: File) => {
    const data = new FormData();
    data.append('file', file);
    setUploadingImage(true);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: data,
      });
      const result = await res.json();
      if (result.success) {
        setFormData((prev) => ({ ...prev, image: result.url }));
      } else {
        alert(result.message || 'فشل رفع الصورة');
      }
    } catch (err) {
      alert('حدث خطأ أثناء رفع الصورة');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      if (editingService) {
        // Edit
        const res = await fetch('/api/admin/services', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, _id: editingService._id || editingService.number }),
        });
        const data = await res.json();
        if (data.success) {
          setModalOpen(false);
          await loadServices();
          setMessage({ type: 'success', text: 'تم تحديث بيانات النشاط بنجاح!' });
        }
      } else {
        // Create
        const res = await fetch('/api/admin/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success) {
          setModalOpen(false);
          await loadServices();
          setMessage({ type: 'success', text: 'تمت إضافة النشاط والخدمة بنجاح!' });
        }
      }
      setTimeout(() => setMessage(null), 4000);
    } catch (err) {
      setMessage({ type: 'error', text: 'حدث خطأ أثناء الحفظ' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm('هل أنت متأكد من حذف هذا النشاط؟')) return;

    try {
      const res = await fetch(`/api/admin/services?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        await loadServices();
        setMessage({ type: 'success', text: 'تم حذف النشاط بنجاح' });
        setTimeout(() => setMessage(null), 4000);
      }
    } catch (err) {
      alert('خطأ أثناء الحذف');
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
            <Briefcase className="w-3.5 h-3.5" />
            <span>الأنشطة والخدمات المعتمدة</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-wide">
            إدارة الأنشطة والخدمات الهندسية (Services Management)
          </h1>
          <p className="text-xs text-slate-500">
            إضافة خدمات جديدة، وتعديل تفاصيل وأوصاف وأكواد الأنشطة المعتمدة في السجل التجاري
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 bg-[#0f382a] hover:bg-[#164e3b] text-white shadow-xs font-bold text-xs rounded flex items-center gap-2 transition-all shadow-md hover:brightness-110"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة نشاط / خدمة جديدة</span>
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

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {services.map((srv, idx) => (
          <div
            key={srv._id || idx}
            className="p-5 border border-slate-200 bg-white rounded-xl shadow-lg space-y-4 flex flex-col justify-between group hover:border-[#0f382a]/50 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-technical text-lg font-bold text-[#0f382a] bg-slate-50 px-2.5 py-0.5 rounded border border-slate-200">
                    {srv.number}
                  </span>
                  <span className="text-[10px] font-technical px-2 py-0.5 bg-slate-50 border border-slate-200 text-slate-500 rounded">
                    Code: {srv.code}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(srv)}
                    className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 rounded"
                    title="تعديل"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(srv._id || srv.number)}
                    className="p-1.5 bg-red-50/40 hover:bg-red-900/60 text-red-700 rounded"
                    title="حذف"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {srv.image && (
                <div className="h-32 rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={srv.image} alt={srv.titleAr} className="w-full h-full object-cover" />
                </div>
              )}

              <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0f382a] transition-colors">
                {srv.titleAr}
              </h3>
              <p className="text-xs font-technical text-slate-500">{srv.titleEn}</p>
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {srv.descriptionAr}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400 font-technical">
              <span>ترتيب العرض: #{srv.order || idx + 1}</span>
              <button
                onClick={() => openEditModal(srv)}
                className="text-[#0f382a] hover:underline"
              >
                تعديل التفاصيل والمواصفات
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Service Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 w-full max-w-3xl rounded-xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden animate-fadeIn">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">
                {editingService ? `تعديل النشاط ${formData.number} - ${formData.titleAr}` : 'إضافة نشاط وخدمة جديدة'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-500 hover:text-slate-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    رقم النشاط (Number) *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    كود النشاط المعتمد (Code) *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    ترتيب العرض (Order)
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    اسم النشاط بالعربية *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.titleAr}
                    onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    اسم النشاط بالإنجليزية *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.titleEn}
                    onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
                  />
                </div>
              </div>

              {/* Image Upload / URL */}
              <div className="space-y-2 border border-slate-200 p-3 rounded-lg bg-slate-50">
                <label className="block text-slate-600 font-semibold">
                  صورة النشاط الميدانية (Image)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.image || ''}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="/images/services/..."
                    className="flex-1 bg-white border border-slate-200 rounded px-3 py-2 text-slate-900"
                  />
                  <label className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 rounded cursor-pointer flex items-center gap-1.5 shrink-0 border border-slate-200">
                    <Upload className="w-3.5 h-3.5 text-[#0f382a]" />
                    <span>{uploadingImage ? 'رفع...' : 'رفع صورة'}</span>
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
                <label className="block text-slate-600 font-semibold mb-1">
                  الوصف التفصيلي بالعربية *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.descriptionAr}
                  onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
                ></textarea>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  الوصف التفصيلي بالإنجليزية *
                </label>
                <textarea
                  rows={3}
                  required
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
                  className="px-6 py-2 bg-gradient-to-r from-[#c5a869] to-[#b89758] text-[#0c0e10] font-bold rounded shadow-md hover:brightness-110"
                >
                  {saving ? 'جاري الحفظ...' : 'حفظ النشاط'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
