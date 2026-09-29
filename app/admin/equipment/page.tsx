'use client';

import React, { useState, useEffect } from 'react';
import { EquipmentType } from '@/types';
import { Plus, Edit2, Trash2, Upload, X } from 'lucide-react';

export default function AdminEquipmentPage() {
  const [equipment, setEquipment] = useState<EquipmentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<EquipmentType | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState<Partial<EquipmentType>>({
    nameAr: '',
    nameEn: '',
    categoryAr: '',
    categoryEn: '',
    tagAr: '',
    tagEn: '',
    descriptionAr: '',
    descriptionEn: '',
    image: '',
    specsAr: [
      { label: 'المواصفة 1', value: 'القيمة 1' },
      { label: 'المواصفة 2', value: 'القيمة 2' },
    ],
    specsEn: [
      { label: 'Spec 1', value: 'Value 1' },
      { label: 'Spec 2', value: 'Value 2' },
    ],
  });

  const loadEquipment = async () => {
    try {
      const res = await fetch(`/api/admin/equipment?_t=${Date.now()}`, {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' },
      });
      const data = await res.json();
      if (data.success) {
        setEquipment(data.data);
      }
    } catch (err) {
      console.error('Error loading equipment:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEquipment();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({
      nameAr: '',
      nameEn: '',
      categoryAr: '',
      categoryEn: '',
      tagAr: '',
      tagEn: '',
      descriptionAr: '',
      descriptionEn: '',
      image: '',
      specsAr: [
        { label: 'قوة السحب', value: '100,000 lbs' },
        { label: 'عزم الدوران', value: '12,000 ft-lb' },
      ],
      specsEn: [
        { label: 'Pullback', value: '100,000 lbs' },
        { label: 'Torque', value: '12,000 ft-lb' },
      ],
    });
    setModalOpen(true);
  };

  const openEditModal = (item: EquipmentType) => {
    setEditingItem(item);
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
      const res = await fetch('/api/admin/equipment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setModalOpen(false);
        await loadEquipment();
      }
    } catch (err) {
      alert('Error saving equipment');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-wide">
            إدارة الأسطول والمعدات الثقيلة (Industrial Fleet & Machinery)
          </h2>
          <p className="text-xs text-slate-500">
            تعديل وإضافة حفارات الصخور عالية العزم وماكينات اللحام ورؤوس التوسيع
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 bg-[#0f382a] hover:bg-[#b39556] text-[#0c0e10] font-bold text-xs rounded flex items-center gap-2 transition-all shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة معدة جديدة</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {equipment.map((item, idx) => (
          <div
            key={idx}
            className="border border-slate-200 bg-white rounded-lg overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="h-44 w-full bg-slate-50 border-b border-slate-200 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.nameAr}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">{item.nameAr}</h3>
                  <span className="text-[10px] text-[#0f382a] font-bold">{item.tagAr}</span>
                </div>
                <p className="text-xs font-technical text-slate-500">{item.nameEn}</p>
                <p className="text-xs text-slate-600 line-clamp-3">{item.descriptionAr}</p>
              </div>
            </div>

            <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2">
              <button
                onClick={() => openEditModal(item)}
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
                {editingItem ? 'تعديل بيانات المعدة' : 'إضافة معدة جديدة للأسطول'}
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
                  <label className="block text-slate-600 font-semibold mb-1">اسم المعدة بالعربية *</label>
                  <input
                    required
                    type="text"
                    value={formData.nameAr}
                    onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">اسم المعدة بالإنجليزية *</label>
                  <input
                    required
                    type="text"
                    value={formData.nameEn}
                    onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">الشارة المميزة بالعربية (Tag)</label>
                  <input
                    type="text"
                    placeholder="قوة سحب 100,000 رطل"
                    value={formData.tagAr}
                    onChange={(e) => setFormData({ ...formData, tagAr: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">الشارة المميزة بالإنجليزية</label>
                  <input
                    type="text"
                    placeholder="100,000 lbs Pullback"
                    value={formData.tagEn}
                    onChange={(e) => setFormData({ ...formData, tagEn: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
                  />
                </div>
              </div>

              {/* Image */}
              <div className="space-y-2 border border-slate-200 p-3 rounded bg-slate-50">
                <label className="block text-slate-600 font-semibold">صورة المعدة *</label>
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
                    <span>{uploading ? 'رفع...' : 'رفع صورة'}</span>
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
                <label className="block text-slate-600 font-semibold mb-1">الوصف بالعربية *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.descriptionAr}
                  onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
                ></textarea>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">الوصف بالإنجليزية *</label>
                <textarea
                  rows={2}
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
                  className="px-6 py-2 bg-[#0f382a] hover:bg-[#b39556] text-[#0c0e10] font-bold rounded"
                >
                  {saving ? 'جاري الحفظ...' : 'حفظ المعدة'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
