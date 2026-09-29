'use client';

import React, { useState, useEffect } from 'react';
import { ProjectType } from '@/types';
import { Plus, Edit2, Trash2, Search, Upload, X, CheckCircle2, Image as ImageIcon } from 'lucide-react';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectType | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingCert, setUploadingCert] = useState(false);

  const [formData, setFormData] = useState<Partial<ProjectType>>({
    titleAr: '',
    titleEn: '',
    client: '',
    mainContractor: '',
    location: 'الرياض',
    year: '2025',
    lengthLm: '100 m',
    diameter: '',
    category: 'HDD Drilling',
    descriptionAr: '',
    descriptionEn: '',
    mainImage: '',
    certificateImage: '',
    featured: false,
    order: 0,
  });

  const loadProjects = async () => {
    try {
      const res = await fetch(`/api/admin/projects?_t=${Date.now()}`, {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' },
      });
      const data = await res.json();
      if (data.success) {
        setProjects(data.data);
      }
    } catch (err) {
      console.error('Error loading projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData({
      titleAr: '',
      titleEn: '',
      client: '',
      mainContractor: '',
      location: 'الرياض',
      year: '2025',
      lengthLm: '100 m',
      diameter: '',
      category: 'HDD Drilling',
      descriptionAr: '',
      descriptionEn: '',
      mainImage: '',
      certificateImage: '',
      featured: false,
      order: projects.length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (project: ProjectType) => {
    setEditingProject(project);
    setFormData({ ...project });
    setModalOpen(true);
  };

  const handleFileUpload = async (file: File, type: 'main' | 'cert') => {
    const data = new FormData();
    data.append('file', file);

    if (type === 'main') setUploadingMain(true);
    else setUploadingCert(true);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: data,
      });
      const result = await res.json();
      if (result.success) {
        if (type === 'main') {
          setFormData((prev) => ({ ...prev, mainImage: result.url }));
        } else {
          setFormData((prev) => ({ ...prev, certificateImage: result.url }));
        }
      } else {
        alert(result.message || 'Upload failed');
      }
    } catch (err) {
      alert('Upload error');
    } finally {
      if (type === 'main') setUploadingMain(false);
      else setUploadingCert(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = '/api/admin/projects';
      const method = editingProject ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, _id: editingProject?._id || editingProject?.slug }),
      });

      const data = await res.json();
      if (data.success) {
        setModalOpen(false);
        await loadProjects();
      } else {
        alert(data.message || 'Save error');
      }
    } catch (err) {
      alert('Network error saving project');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm('هل أنت متأكد من حذف هذا المشروع نهائياً؟')) return;

    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        await loadProjects();
      }
    } catch (err) {
      alert('Error deleting project');
    }
  };

  const filteredProjects = projects.filter(
    (p) =>
      p.titleAr?.toLowerCase().includes(search.toLowerCase()) ||
      p.titleEn?.toLowerCase().includes(search.toLowerCase()) ||
      p.client?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-wide">
            إدارة المشاريع وسجل الإنجازات (Projects Management)
          </h2>
          <p className="text-xs text-slate-500">
            إضافة وتعديل وحذف مشاريع الحفر الموجه وشهادات الإنجاز المعتمدة
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 bg-[#0f382a] hover:bg-[#b39556] text-[#0c0e10] font-bold text-xs rounded flex items-center gap-2 transition-all shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة مشروع جديد</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <input
          type="text"
          placeholder="بحث عن مشروع أو عميل..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded px-3 py-2 ps-9 text-xs text-slate-900 focus:ring-1 focus:ring-[#0f382a]"
        />
        <Search className="w-4 h-4 text-slate-400 absolute start-3 top-2.5" />
      </div>

      {/* Projects Table */}
      <div className="border border-slate-200 bg-white rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs font-technical">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="p-3 text-start">الصورة</th>
                <th className="p-3 text-start">اسم المشروع</th>
                <th className="p-3 text-start">العميل</th>
                <th className="p-3 text-start">الطول</th>
                <th className="p-3 text-start">القطر</th>
                <th className="p-3 text-center">مميز (Featured)</th>
                <th className="p-3 text-end">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a313a] text-slate-600">
              {filteredProjects.map((p, idx) => (
                <tr key={idx} className="hover:bg-slate-100/50">
                  <td className="p-3">
                    <div className="w-12 h-12 rounded overflow-hidden bg-slate-900 border border-slate-200 flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.mainImage}
                        alt={p.titleAr}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="p-3">
                    <strong className="text-slate-900 block">{p.titleAr}</strong>
                    <span className="text-[10px] text-slate-500">{p.titleEn}</span>
                  </td>
                  <td className="p-3 text-slate-600">{p.client}</td>
                  <td className="p-3 font-bold text-slate-900" dir="ltr">{p.lengthLm}</td>
                  <td className="p-3 text-slate-500">{p.diameter || '-'}</td>
                  <td className="p-3 text-center">
                    {p.featured ? (
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold rounded">
                        نعم
                      </span>
                    ) : (
                      <span className="text-zinc-600">-</span>
                    )}
                  </td>
                  <td className="p-3 text-end space-s-2">
                    <button
                      onClick={() => openEditModal(p)}
                      className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 rounded"
                      title="تعديل"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="p-1.5 bg-red-50/40 hover:bg-red-900/60 text-red-700 rounded"
                      title="حذف"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Project Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 w-full max-w-3xl rounded-lg shadow-2xl max-h-[90vh] flex flex-col overflow-hidden animate-fadeIn">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">
                {editingProject ? 'تعديل بيانات المشروع' : 'إضافة مشروع جديد'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-500 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    اسم المشروع بالعربية *
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
                    اسم المشروع بالإنجليزية *
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">العميل *</label>
                  <input
                    required
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">المقاول الرئيسي</label>
                  <input
                    type="text"
                    value={formData.mainContractor}
                    onChange={(e) => setFormData({ ...formData, mainContractor: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">الموقع *</label>
                  <input
                    required
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    الطول المنجز (Length LM) *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.lengthLm}
                    onChange={(e) => setFormData({ ...formData, lengthLm: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    القطر / الأنبوب
                  </label>
                  <input
                    type="text"
                    value={formData.diameter}
                    onChange={(e) => setFormData({ ...formData, diameter: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">سنة الإنجاز</label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
                  />
                </div>
              </div>

              {/* Main Image Upload / URL */}
              <div className="space-y-2 border border-slate-200 p-3 rounded bg-slate-50">
                <label className="block text-slate-600 font-semibold">
                  الصورة الرئيسية للمشروع (Cloudinary / CDN Image) *
                </label>
                <div className="flex gap-2">
                  <input
                    required
                    type="text"
                    placeholder="رابط الصورة https://..."
                    value={formData.mainImage}
                    onChange={(e) => setFormData({ ...formData, mainImage: e.target.value })}
                    className="flex-1 bg-white border border-slate-200 rounded px-3 py-2 text-slate-900"
                  />
                  <label className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded cursor-pointer flex items-center gap-1.5 shrink-0">
                    <Upload className="w-3.5 h-3.5 text-[#0f382a]" />
                    <span>{uploadingMain ? 'رفع...' : 'رفع ملف'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) handleFileUpload(e.target.files[0], 'main');
                      }}
                    />
                  </label>
                </div>
                {formData.mainImage && (
                  <div className="w-20 h-16 rounded overflow-hidden border border-slate-200 mt-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={formData.mainImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Certificate Image Upload / URL */}
              <div className="space-y-2 border border-slate-200 p-3 rounded bg-slate-50">
                <label className="block text-slate-600 font-semibold">
                  شهادة إنجاز العمل المعتمدة من العميل (Certificate Image)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="رابط شهادة الإنجاز https://..."
                    value={formData.certificateImage}
                    onChange={(e) => setFormData({ ...formData, certificateImage: e.target.value })}
                    className="flex-1 bg-white border border-slate-200 rounded px-3 py-2 text-slate-900"
                  />
                  <label className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded cursor-pointer flex items-center gap-1.5 shrink-0">
                    <Upload className="w-3.5 h-3.5 text-[#0f382a]" />
                    <span>{uploadingCert ? 'رفع...' : 'رفع شهادة'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) handleFileUpload(e.target.files[0], 'cert');
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Descriptions */}
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

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured-check"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded border-slate-200 text-[#0f382a] focus:ring-[#0f382a]"
                />
                <label htmlFor="featured-check" className="text-slate-600 font-semibold">
                  عرض كمشروع مميز في الصفحة الرئيسية (Featured Project)
                </label>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
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
                  {saving ? 'جاري الحفظ...' : 'حفظ المشروع'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
