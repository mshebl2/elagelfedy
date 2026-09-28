'use client';

import React, { useState, useEffect } from 'react';
import { ClientType } from '@/types';
import {
  Plus,
  Trash2,
  Edit2,
  Upload,
  Save,
  CheckCircle2,
  Search,
  Building2,
  ExternalLink,
  X,
  AlertCircle
} from 'lucide-react';

export default function AdminClientsPage() {
  const [clients, setClients] = useState<ClientType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientType | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState<Partial<ClientType>>({
    name: '',
    nameAr: '',
    categoryAr: 'قطاع الطاقة والنفط والغاز',
    categoryEn: 'Energy & Infrastructure',
    logo: '',
    active: true,
    website: '',
  });

  const loadClients = async () => {
    try {
      const res = await fetch('/api/admin/clients');
      const data = await res.json();
      if (data.success) {
        setClients(data.data);
      }
    } catch (err) {
      console.error('Error loading clients:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  const openCreateModal = () => {
    setEditingClient(null);
    setFormData({
      name: '',
      nameAr: '',
      categoryAr: 'قطاع الطاقة والنفط والغاز',
      categoryEn: 'Energy & Infrastructure',
      logo: '',
      active: true,
      website: '',
    });
    setModalOpen(true);
  };

  const openEditModal = (client: ClientType) => {
    setEditingClient(client);
    setFormData({ ...client });
    setModalOpen(true);
  };

  const handleFileUpload = async (file: File) => {
    const data = new FormData();
    data.append('file', file);
    setUploadingLogo(true);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: data,
      });
      const result = await res.json();
      if (result.success) {
        setFormData((prev) => ({ ...prev, logo: result.url }));
      } else {
        alert(result.message || 'فشل رفع الشعار');
      }
    } catch (err) {
      alert('حدث خطأ أثناء رفع الشعار');
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      if (editingClient) {
        // Edit
        const res = await fetch('/api/admin/clients', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, id: editingClient.id || editingClient._id }),
        });
        const data = await res.json();
        if (data.success) {
          setModalOpen(false);
          await loadClients();
          setMessage({ type: 'success', text: 'تم تحديث بيانات العميل وشعاره بنجاح!' });
        }
      } else {
        // Create
        const res = await fetch('/api/admin/clients', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success) {
          setModalOpen(false);
          await loadClients();
          setMessage({ type: 'success', text: 'تمت إضافة العميل الجديد بنجاح!' });
        }
      }
      setTimeout(() => setMessage(null), 4000);
    } catch (err) {
      setMessage({ type: 'error', text: 'حدث خطأ في الاتصال بالخادم' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm('هل أنت متأكد من حذف هذا العميل من القائمة؟')) return;

    try {
      const res = await fetch(`/api/admin/clients?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        await loadClients();
        setMessage({ type: 'success', text: 'تم حذف العميل بنجاح' });
        setTimeout(() => setMessage(null), 4000);
      }
    } catch (err) {
      alert('حدث خطأ أثناء حذف العميل');
    }
  };

  const filteredClients = clients.filter(
    (c) =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.nameAr?.toLowerCase().includes(search.toLowerCase()) ||
      c.categoryAr?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0f382a]/10 text-[#0f382a] text-xs font-bold mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>قائمة الشركاء والعملاء</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-wide">
            إدارة العملاء وشعارات الشركاء (Clients & Logos)
          </h1>
          <p className="text-xs text-slate-500">
            إضافة وتعديل وحذف شعارات وأسماء كبرى الجهات والشركات المعتمدة في المملكة
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 bg-[#0f382a] hover:bg-[#164e3b] text-white shadow-xs font-bold text-xs rounded flex items-center gap-2 transition-all shadow-md hover:brightness-110"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة عميل وشعار جديد</span>
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

      {/* Search Bar */}
      <div className="relative max-w-md">
        <input
          type="text"
          placeholder="بحث عن عميل أو قطاع..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded px-3 py-2 ps-9 text-xs text-slate-900 focus:ring-1 focus:ring-[#0f382a]"
        />
        <Search className="w-4 h-4 text-slate-400 absolute start-3 top-2.5" />
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredClients.map((client, idx) => (
          <div
            key={client.id || client._id || idx}
            className="p-4 bg-white border border-slate-200 rounded-xl hover:border-[#0f382a]/60 transition-all flex flex-col justify-between space-y-3 group"
          >
            {/* Logo Container */}
            <div className="h-28 bg-white/95 rounded-lg border border-slate-200 p-3 flex items-center justify-center overflow-hidden shadow-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={client.logo}
                alt={client.nameAr}
                className="max-h-full max-w-full object-contain filter contrast-105"
              />
            </div>

            {/* Client Info */}
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#0f382a] transition-colors truncate">
                {client.nameAr}
              </h4>
              <p className="text-[11px] text-slate-500 truncate">{client.name}</p>
              <span className="inline-block text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200/40 px-2 py-0.5 rounded font-technical">
                {client.categoryAr}
              </span>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-technical">#{idx + 1}</span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => openEditModal(client)}
                  className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 rounded transition-colors"
                  title="تعديل"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(client.id || client._id)}
                  className="p-1.5 bg-red-50/40 hover:bg-red-900/60 text-red-700 rounded transition-colors"
                  title="حذف"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Client Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden animate-fadeIn">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">
                {editingClient ? 'تعديل بيانات العميل والشعار' : 'إضافة عميل وشعار جديد'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-500 hover:text-slate-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  اسم العميل بالعربية *
                </label>
                <input
                  required
                  type="text"
                  value={formData.nameAr}
                  onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                  placeholder="مثال: أرامكو السعودية"
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  اسم العميل بالإنجليزية (English Name) *
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Saudi Aramco"
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  القطاع والتصنيف بالعربية
                </label>
                <input
                  type="text"
                  value={formData.categoryAr}
                  onChange={(e) => setFormData({ ...formData, categoryAr: e.target.value })}
                  placeholder="مثال: قطاع الطاقة والنفط والغاز"
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  القطاع والتصنيف بالإنجليزية
                </label>
                <input
                  type="text"
                  value={formData.categoryEn}
                  onChange={(e) => setFormData({ ...formData, categoryEn: e.target.value })}
                  placeholder="e.g. Energy & Oil/Gas Sector"
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
                />
              </div>

              {/* Logo Upload */}
              <div className="space-y-2 border border-slate-200 p-3 rounded-lg bg-slate-50">
                <label className="block text-slate-600 font-semibold">
                  شعار العميل (SVG / PNG) *
                </label>
                <div className="flex gap-2">
                  <input
                    required
                    type="text"
                    value={formData.logo}
                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                    placeholder="رابط الشعار /images/clients/..."
                    className="flex-1 bg-white border border-slate-200 rounded px-3 py-2 text-slate-900"
                  />
                  <label className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 rounded cursor-pointer flex items-center gap-1.5 shrink-0 border border-slate-200">
                    <Upload className="w-3.5 h-3.5 text-[#0f382a]" />
                    <span>{uploadingLogo ? 'رفع...' : 'رفع ملف'}</span>
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

                {formData.logo && (
                  <div className="mt-2 h-16 w-32 bg-white rounded p-2 flex items-center justify-center border border-slate-300">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={formData.logo} alt="Preview" className="max-h-full max-w-full object-contain" />
                  </div>
                )}
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
                  {saving ? 'جاري الحفظ...' : 'حفظ بيانات العميل'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
