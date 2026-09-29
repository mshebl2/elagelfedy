'use client';

import React, { useState, useEffect } from 'react';
import { ServiceType } from '@/types';
import {
  Edit2,
  Plus,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  Upload,
  Layers,
  Sliders,
  ListPlus,
  Tag,
  FileText,
  Search,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  TableProperties
} from 'lucide-react';

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceType | null>(null);
  const [activeTab, setActiveTab] = useState<'specs' | 'table' | 'basic' | 'tags'>('specs');
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);

  // New tag inputs
  const [newTagAr, setNewTagAr] = useState('');
  const [newTagEn, setNewTagEn] = useState('');

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
    specsAr: [],
    specsEn: [],
    order: 0,
  });

  const loadServices = async () => {
    try {
      const res = await fetch(`/api/admin/services?_t=${Date.now()}`, {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' },
      });
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
    setActiveTab('basic');
    const nextNum = String(services.length + 1).padStart(2, '0');
    setFormData({
      number: nextNum,
      code: `CODE-${nextNum}`,
      titleAr: '',
      titleEn: '',
      subtitleAr: '',
      subtitleEn: '',
      descriptionAr: '',
      descriptionEn: '',
      image: '/images/services/service_01_hdd.jpg',
      tagsAr: ['حفر موجه', 'معتمد أرامكو'],
      tagsEn: ['Trenchless', 'Aramco Approved'],
      featuresAr: [
        'توجيه جيرسكوبي ورقمي تحت سطحي بدقة ملليمترية',
        'حفر في جميع أنواع التربة والتكوينات الصخرية القاسية',
        'صفر إغلاق للطرق المرورية وحماية البنى التحتية القائمة'
      ],
      featuresEn: [
        'Millimeter-precision gyroscopic and magnetic guidance telemetry',
        'Full capability across hard basalt rock and saturated soil',
        'Zero surface traffic disruption and asset protection'
      ],
      specsAr: [
        { label: 'أقصى قطر للمواسير', value: '1,500 ملم (60 بوصة)' },
        { label: 'المعايير المعتمدة', value: 'أرامكو / الهيئة الملكية / SEC' }
      ],
      specsEn: [
        { label: 'Max Pipe Diameter', value: '1,500 mm (60")' },
        { label: 'Approved Standard', value: 'Saudi Aramco / Royal Commission / SEC' }
      ],
      order: services.length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (service: ServiceType, initialTab: 'specs' | 'table' | 'basic' | 'tags' = 'specs') => {
    setEditingService(service);
    setActiveTab(initialTab);
    setFormData({
      ...service,
      subtitleAr: service.subtitleAr || '',
      subtitleEn: service.subtitleEn || '',
      tagsAr: Array.isArray(service.tagsAr) ? [...service.tagsAr] : [],
      tagsEn: Array.isArray(service.tagsEn) ? [...service.tagsEn] : [],
      featuresAr: Array.isArray(service.featuresAr) ? [...service.featuresAr] : [],
      featuresEn: Array.isArray(service.featuresEn) ? [...service.featuresEn] : [],
      specsAr: Array.isArray(service.specsAr) ? service.specsAr.map((s) => ({ ...s })) : [],
      specsEn: Array.isArray(service.specsEn) ? service.specsEn.map((s) => ({ ...s })) : [],
    });
    setModalOpen(true);
  };

  // Feature (Specification bullet point) helpers
  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      featuresAr: [...(prev.featuresAr || []), ''],
      featuresEn: [...(prev.featuresEn || []), ''],
    }));
  };

  const updateFeatureAr = (idx: number, val: string) => {
    setFormData((prev) => {
      const updated = [...(prev.featuresAr || [])];
      updated[idx] = val;
      return { ...prev, featuresAr: updated };
    });
  };

  const updateFeatureEn = (idx: number, val: string) => {
    setFormData((prev) => {
      const updated = [...(prev.featuresEn || [])];
      updated[idx] = val;
      return { ...prev, featuresEn: updated };
    });
  };

  const removeFeature = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      featuresAr: (prev.featuresAr || []).filter((_, i) => i !== idx),
      featuresEn: (prev.featuresEn || []).filter((_, i) => i !== idx),
    }));
  };

  // Structured Specs table helpers
  const addSpecRow = () => {
    setFormData((prev) => ({
      ...prev,
      specsAr: [...(prev.specsAr || []), { label: '', value: '' }],
      specsEn: [...(prev.specsEn || []), { label: '', value: '' }],
    }));
  };

  const updateSpecAr = (idx: number, field: 'label' | 'value', val: string) => {
    setFormData((prev) => {
      const updated = [...(prev.specsAr || [])];
      if (!updated[idx]) updated[idx] = { label: '', value: '' };
      updated[idx] = { ...updated[idx], [field]: val };
      return { ...prev, specsAr: updated };
    });
  };

  const updateSpecEn = (idx: number, field: 'label' | 'value', val: string) => {
    setFormData((prev) => {
      const updated = [...(prev.specsEn || [])];
      if (!updated[idx]) updated[idx] = { label: '', value: '' };
      updated[idx] = { ...updated[idx], [field]: val };
      return { ...prev, specsEn: updated };
    });
  };

  const removeSpecRow = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      specsAr: (prev.specsAr || []).filter((_, i) => i !== idx),
      specsEn: (prev.specsEn || []).filter((_, i) => i !== idx),
    }));
  };

  // Tag helpers
  const addTagAr = () => {
    if (!newTagAr.trim()) return;
    setFormData((prev) => ({
      ...prev,
      tagsAr: [...(prev.tagsAr || []), newTagAr.trim()],
    }));
    setNewTagAr('');
  };

  const removeTagAr = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      tagsAr: (prev.tagsAr || []).filter((_, i) => i !== idx),
    }));
  };

  const addTagEn = () => {
    if (!newTagEn.trim()) return;
    setFormData((prev) => ({
      ...prev,
      tagsEn: [...(prev.tagsEn || []), newTagEn.trim()],
    }));
    setNewTagEn('');
  };

  const removeTagEn = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      tagsEn: (prev.tagsEn || []).filter((_, i) => i !== idx),
    }));
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

    // Clean empty specs and features
    const cleanedFeaturesAr = (formData.featuresAr || []).map((s) => s.trim()).filter(Boolean);
    const cleanedFeaturesEn = (formData.featuresEn || []).map((s) => s.trim()).filter(Boolean);
    const cleanedSpecsAr = (formData.specsAr || []).filter((s) => s.label.trim() || s.value.trim());
    const cleanedSpecsEn = (formData.specsEn || []).filter((s) => s.label.trim() || s.value.trim());

    const payload = {
      ...formData,
      featuresAr: cleanedFeaturesAr,
      featuresEn: cleanedFeaturesEn,
      specsAr: cleanedSpecsAr,
      specsEn: cleanedSpecsEn,
    };

    try {
      if (editingService) {
        // Edit
        const res = await fetch('/api/admin/services', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...payload, _id: editingService._id || editingService.number }),
        });
        const data = await res.json();
        if (data.success) {
          setModalOpen(false);
          await loadServices();
          setMessage({ type: 'success', text: `تم تحديث مواصفات وبيانات الخدمة (${formData.titleAr}) بنجاح!` });
        } else {
          setMessage({ type: 'error', text: data.message || 'فشل الحفظ' });
        }
      } else {
        // Create
        const res = await fetch('/api/admin/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          setModalOpen(false);
          await loadServices();
          setMessage({ type: 'success', text: 'تمت إضافة الخدمة والمواصفات بنجاح!' });
        } else {
          setMessage({ type: 'error', text: data.message || 'فشل الحفظ' });
        }
      }
      setTimeout(() => setMessage(null), 5000);
    } catch (err) {
      setMessage({ type: 'error', text: 'حدث خطأ أثناء الحفظ' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm('هل أنت متأكد من حذف هذه الخدمة بكامل مواصفاتها؟')) return;

    try {
      const res = await fetch(`/api/admin/services?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        await loadServices();
        setMessage({ type: 'success', text: 'تم حذف الخدمة بنجاح' });
        setTimeout(() => setMessage(null), 4000);
      }
    } catch (err) {
      alert('خطأ أثناء الحذف');
    }
  };

  const filteredServices = services.filter((srv) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const matchTitle = srv.titleAr?.toLowerCase().includes(q) || srv.titleEn?.toLowerCase().includes(q);
    const matchCode = srv.code?.toLowerCase().includes(q) || srv.number?.includes(q);
    const matchDesc = srv.descriptionAr?.toLowerCase().includes(q) || srv.descriptionEn?.toLowerCase().includes(q);
    const matchSpecs =
      srv.featuresAr?.some((f) => f.toLowerCase().includes(q)) ||
      srv.featuresEn?.some((f) => f.toLowerCase().includes(q)) ||
      srv.tagsAr?.some((t) => t.toLowerCase().includes(q));
    return matchTitle || matchCode || matchDesc || matchSpecs;
  });

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
            <span>الأنشطة والخدمات المعتمدة والمواصفات الفنية</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-wide">
            إدارة الخدمات والمواصفات التنفيذية (Services & Technical Specifications)
          </h1>
          <p className="text-xs text-slate-500">
            تعديل وتخصيص مواصفات كل خدمة، وقدراتها التنفيذية، والمعايير الفنية، والأقطار ونطاقات العمل
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 bg-[#0f382a] hover:bg-[#164e3b] text-white shadow-xs font-bold text-xs rounded flex items-center gap-2 transition-all shadow-md hover:brightness-110"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة خدمة جديدة</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
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

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="بحث بالاسم، الكود، أو مواصفات الخدمة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full ps-9 pe-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-[#0f382a]"
          />
        </div>

        <span className="text-xs font-technical text-slate-500 shrink-0">
          إجمالي الخدمات: <strong>{services.length}</strong> (المعروض: {filteredServices.length})
        </span>
      </div>

      {/* Services Grid with Spec Summaries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredServices.map((srv, idx) => {
          const specCount = (srv.featuresAr || []).length;
          const tableSpecCount = (srv.specsAr || []).length;
          const tagCount = (srv.tagsAr || []).length;
          const isExpanded = expandedServiceId === (srv._id || srv.number);

          return (
            <div
              key={srv._id || idx}
              className="p-5 border border-slate-200 bg-white rounded-xl shadow-xs space-y-4 flex flex-col justify-between group hover:border-[#0f382a]/50 transition-all"
            >
              <div className="space-y-3">
                {/* Card Top: Number, Code, Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-technical text-lg font-bold text-[#0f382a] bg-slate-50 px-2.5 py-0.5 rounded border border-slate-200">
                      {srv.number}
                    </span>
                    <span className="text-[10px] font-technical px-2 py-0.5 bg-slate-50 border border-slate-200 text-slate-600 rounded font-semibold">
                      {srv.code}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(srv, 'specs')}
                      className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-[#0f382a] border border-emerald-200 rounded text-xs font-bold flex items-center gap-1 transition-all"
                      title="تعديل المواصفات الفنية مباشرة"
                    >
                      <Sliders className="w-3 h-3 text-[#0f382a]" />
                      <span>تعديل المواصفات</span>
                    </button>
                    <button
                      onClick={() => openEditModal(srv, 'basic')}
                      className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 rounded"
                      title="تعديل عام"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(srv._id || srv.number)}
                      className="p-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded"
                      title="حذف"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Image and Badges */}
                {srv.image && (
                  <div className="h-32 rounded-lg overflow-hidden border border-slate-200 bg-slate-50 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={srv.image} alt={srv.titleAr} className="w-full h-full object-cover" />
                    <div className="absolute bottom-2 start-2 flex flex-wrap gap-1">
                      <span className="px-2 py-0.5 bg-black/70 backdrop-blur-xs text-white text-[10px] font-technical font-bold rounded">
                        {specCount} مواصفات تنفيذية
                      </span>
                      {tableSpecCount > 0 && (
                        <span className="px-2 py-0.5 bg-[#c5a869] text-[#0c0e10] text-[10px] font-technical font-bold rounded">
                          {tableSpecCount} معايير فنية
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Title & Subtitle (Headline Spec) */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0f382a] transition-colors">
                    {srv.titleAr}
                  </h3>
                  <p className="text-xs font-technical text-slate-500">{srv.titleEn}</p>
                  {srv.subtitleAr && (
                    <div className="mt-1.5 text-xs text-[#0f382a] font-semibold flex items-center gap-1.5 bg-emerald-50/70 p-1.5 px-2 rounded border border-emerald-100">
                      <Sparkles className="w-3 h-3 text-[#c5a869] shrink-0" />
                      <span>{srv.subtitleAr}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {srv.descriptionAr}
                </p>

                {/* Quick Tags */}
                {(srv.tagsAr || []).length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {srv.tagsAr?.slice(0, 4).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-technical px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                    {(srv.tagsAr?.length || 0) > 4 && (
                      <span className="text-[10px] text-slate-400 font-technical self-center">
                        +{(srv.tagsAr?.length || 0) - 4}
                      </span>
                    )}
                  </div>
                )}

                {/* Expandable Specifications Preview */}
                <div className="border border-slate-200/80 rounded-lg overflow-hidden bg-slate-50/60">
                  <button
                    type="button"
                    onClick={() => setExpandedServiceId(isExpanded ? null : srv._id || srv.number)}
                    className="w-full px-3 py-2 text-start flex items-center justify-between text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <ListPlus className="w-3.5 h-3.5 text-[#0f382a]" />
                      <span>مواصفات وقدرات الخدمة ({specCount})</span>
                    </span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {isExpanded && (
                    <div className="p-3 border-t border-slate-200 bg-white space-y-2 text-xs">
                      {specCount === 0 ? (
                        <p className="text-slate-400 text-[11px] italic">
                          لم يتم تحديد مواصفات تنفيذية بعد. انقر على &quot;تعديل المواصفات&quot; لإضافتها.
                        </p>
                      ) : (
                        srv.featuresAr?.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2 text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="leading-snug">{feat}</span>
                          </div>
                        ))
                      )}

                      {tableSpecCount > 0 && (
                        <div className="pt-2 mt-2 border-t border-slate-100">
                          <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                            المعايير المجدولة:
                          </span>
                          <div className="grid grid-cols-2 gap-1.5">
                            {srv.specsAr?.map((sp, sIdx) => (
                              <div key={sIdx} className="p-1.5 bg-slate-50 rounded border border-slate-200 text-[11px]">
                                <span className="text-slate-500 block truncate">{sp.label}</span>
                                <span className="font-bold text-slate-900 block truncate">{sp.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400 font-technical">
                <span>ترتيب العرض: #{srv.order || idx + 1}</span>
                <button
                  onClick={() => openEditModal(srv, 'specs')}
                  className="text-[#0f382a] font-bold hover:underline flex items-center gap-1"
                >
                  <span>تعديل المواصفات والتفاصيل</span>
                  <span>&larr;</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Service Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white border border-slate-200 w-full max-w-4xl rounded-2xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden animate-fadeIn">
            {/* Modal Header */}
            <div className="p-4 sm:px-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-[#0f382a] text-white flex items-center justify-center text-xs font-bold font-technical">
                  {formData.number || '00'}
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    {editingService
                      ? `تعديل مواصفات وبيانات الخدمة: ${formData.titleAr || formData.titleEn}`
                      : 'إضافة نشاط وخدمة هندسية جديدة'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    كود النشاط: <span className="font-technical font-semibold">{formData.code || 'N/A'}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex border-b border-slate-200 bg-white px-4 sm:px-6 overflow-x-auto gap-1">
              <button
                type="button"
                onClick={() => setActiveTab('specs')}
                className={`py-3 px-3.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 shrink-0 ${
                  activeTab === 'specs'
                    ? 'border-[#0f382a] text-[#0f382a] bg-emerald-50/50'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>المواصفات والقدرات التنفيذية ({(formData.featuresAr || []).length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('table')}
                className={`py-3 px-3.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 shrink-0 ${
                  activeTab === 'table'
                    ? 'border-[#0f382a] text-[#0f382a] bg-emerald-50/50'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <TableProperties className="w-3.5 h-3.5" />
                <span>جدول المعايير الفنية ({(formData.specsAr || []).length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('tags')}
                className={`py-3 px-3.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 shrink-0 ${
                  activeTab === 'tags'
                    ? 'border-[#0f382a] text-[#0f382a] bg-emerald-50/50'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Tag className="w-3.5 h-3.5" />
                <span>الوسوم والنطاق التشغيلي</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('basic')}
                className={`py-3 px-3.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 shrink-0 ${
                  activeTab === 'basic'
                    ? 'border-[#0f382a] text-[#0f382a] bg-emerald-50/50'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>البيانات الأساسية والأوصاف</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-xs">
              {/* TAB 1: SPECIFICATIONS & FEATURES */}
              {activeTab === 'specs' && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-emerald-900">
                    <div className="flex items-center gap-2 font-bold mb-1">
                      <Sparkles className="w-4 h-4 text-[#c5a869]" />
                      <span>القدرات والمواصفات التنفيذية (Execution Specifications & Features)</span>
                    </div>
                    <p className="text-[11px] text-emerald-800 leading-relaxed">
                      هذه المواصفات تظهر كبنود رئيسية مع علامة التحقق (Checkmark) أسفل كل خدمة في صفحة الأنشطة والخدمات. يمكنك إضافة أو تعديل أو حذف أي بند بالعربية والإنجليزية مباشرة.
                    </p>
                  </div>

                  {/* Headline Specification / Subtitle Quick Access */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                    <label className="block text-slate-800 font-bold text-xs">
                      المواصفة الرئيسية البارزة / النطاق التشغيلي (Headline Specification Subtitle)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <span className="text-[10px] text-slate-500 mb-1 block">بالعربية (مثال: أقطار تصل إلى 1,500 ملم وقوة سحب 100,000 رطل)</span>
                        <input
                          type="text"
                          value={formData.subtitleAr || ''}
                          onChange={(e) => setFormData({ ...formData, subtitleAr: e.target.value })}
                          placeholder="المواصفة السريعة بالعربية..."
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 mb-1 block">In English (e.g. Diameters up to 1,500 mm & 100,000 lbs Pullback)</span>
                        <input
                          type="text"
                          value={formData.subtitleEn || ''}
                          onChange={(e) => setFormData({ ...formData, subtitleEn: e.target.value })}
                          placeholder="Headline spec in English..."
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  {/* List of Specs / Capabilities */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800 text-xs">
                        قائمة المواصفات والقدرات التنفيذية للخدمة ({(formData.featuresAr || []).length} مواصفات)
                      </span>
                      <button
                        type="button"
                        onClick={addFeature}
                        className="px-3 py-1.5 bg-[#0f382a] hover:bg-[#164e3b] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>إضافة مواصفة جديدة</span>
                      </button>
                    </div>

                    {(formData.featuresAr || []).length === 0 ? (
                      <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 text-slate-400">
                        <Sliders className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                        <p className="font-semibold text-xs text-slate-600">لا توجد مواصفات محددة لهذه الخدمة بعد</p>
                        <p className="text-[11px] text-slate-400 mt-1">انقر على &quot;إضافة مواصفة جديدة&quot; للبدء</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {formData.featuresAr?.map((featAr, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 hover:border-[#0f382a]/40 transition-colors"
                          >
                            <div className="flex items-center justify-between pb-1 border-b border-slate-200/60">
                              <span className="font-technical text-[11px] font-bold text-[#0f382a] flex items-center gap-1">
                                <span className="w-4 h-4 rounded-full bg-[#0f382a] text-white text-[10px] flex items-center justify-center">
                                  {idx + 1}
                                </span>
                                <span>المواصفة رقم #{idx + 1}</span>
                              </span>
                              <button
                                type="button"
                                onClick={() => removeFeature(idx)}
                                className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                                title="حذف هذه المواصفة"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                              <div>
                                <label className="block text-[10px] text-slate-500 font-semibold mb-1">
                                  نص المواصفة بالعربية *
                                </label>
                                <textarea
                                  rows={2}
                                  value={featAr}
                                  onChange={(e) => updateFeatureAr(idx, e.target.value)}
                                  placeholder="اكتب تفاصيل ومواصفات البند بالعربية..."
                                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-900 leading-relaxed focus:border-[#0f382a]"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] text-slate-500 font-semibold mb-1">
                                  Specification Text in English
                                </label>
                                <textarea
                                  rows={2}
                                  value={formData.featuresEn?.[idx] || ''}
                                  onChange={(e) => updateFeatureEn(idx, e.target.value)}
                                  placeholder="Write specification in English..."
                                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-900 leading-relaxed focus:border-[#0f382a]"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: STRUCTURED TECHNICAL SPECS TABLE */}
              {activeTab === 'table' && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl text-amber-900">
                    <div className="flex items-center gap-2 font-bold mb-1">
                      <TableProperties className="w-4 h-4 text-[#c5a869]" />
                      <span>جدول المعايير الفنية المجدولة (Key-Value Technical Parameters)</span>
                    </div>
                    <p className="text-[11px] text-amber-800 leading-relaxed">
                      هذا الجدول يتيح لك إضافة أزواج (اسم المعيار والقيمة) مثل: &quot;أقصى قطر&quot; = &quot;1,500 ملم&quot;، أو &quot;قوة السحب&quot; = &quot;100,000 رطل&quot;، وتظهر كبطاقات معيارية دقيقة للعملاء والمقاولين.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800 text-xs">
                        المعايير المحددة ({(formData.specsAr || []).length} معايير)
                      </span>
                      <button
                        type="button"
                        onClick={addSpecRow}
                        className="px-3 py-1.5 bg-[#0f382a] hover:bg-[#164e3b] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>إضافة معيار فني</span>
                      </button>
                    </div>

                    {(formData.specsAr || []).length === 0 ? (
                      <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 text-slate-400">
                        <TableProperties className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                        <p className="font-semibold text-xs text-slate-600">لا توجد معايير فنية مجدولة بعد</p>
                        <p className="text-[11px] text-slate-400 mt-1">انقر على &quot;إضافة معيار فني&quot; لإضافة معايير دقيقة كالأقطار والأعماق والقوى</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {formData.specsAr?.map((spAr, idx) => (
                          <div
                            key={idx}
                            className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 hover:border-[#0f382a]/40 transition-colors"
                          >
                            <div className="flex items-center justify-between pb-1 border-b border-slate-200/60">
                              <span className="text-[11px] font-bold text-slate-700">المعيار الفني #{idx + 1}</span>
                              <button
                                type="button"
                                onClick={() => removeSpecRow(idx)}
                                className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                                title="حذف هذا المعيار"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {/* Arabic Pair */}
                              <div className="grid grid-cols-2 gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
                                <div>
                                  <label className="block text-[10px] text-slate-500 font-semibold mb-1">اسم المعيار (عربي)</label>
                                  <input
                                    type="text"
                                    placeholder="مثال: القطر الأقصى"
                                    value={spAr.label}
                                    onChange={(e) => updateSpecAr(idx, 'label', e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-xs text-slate-900"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] text-slate-500 font-semibold mb-1">القيمة (عربي)</label>
                                  <input
                                    type="text"
                                    placeholder="مثال: 1,500 ملم"
                                    value={spAr.value}
                                    onChange={(e) => updateSpecAr(idx, 'value', e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-xs text-slate-900 font-bold text-[#0f382a]"
                                  />
                                </div>
                              </div>

                              {/* English Pair */}
                              <div className="grid grid-cols-2 gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
                                <div>
                                  <label className="block text-[10px] text-slate-500 font-semibold mb-1">Parameter (EN)</label>
                                  <input
                                    type="text"
                                    placeholder="e.g. Max Diameter"
                                    value={formData.specsEn?.[idx]?.label || ''}
                                    onChange={(e) => updateSpecEn(idx, 'label', e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-xs text-slate-900"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] text-slate-500 font-semibold mb-1">Value (EN)</label>
                                  <input
                                    type="text"
                                    placeholder="e.g. 1,500 mm"
                                    value={formData.specsEn?.[idx]?.value || ''}
                                    onChange={(e) => updateSpecEn(idx, 'value', e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-xs text-slate-900 font-bold text-[#0f382a]"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: TAGS & DOMAIN BADGES */}
              {activeTab === 'tags' && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Arabic Tags */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                    <label className="block text-slate-800 font-bold text-xs">
                      الوسوم الفنية بالعربية (Technical Tags - Arabic)
                    </label>
                    <p className="text-[11px] text-slate-500">
                      أضف مواصفات وكلمات دلالية سريعة مثل (أقطار 60 بوصة، توجيه ليزري، مواسير بولي إيثيلين)
                    </p>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="اكتب وسماً جديداً ثم اضغط إضافة..."
                        value={newTagAr}
                        onChange={(e) => setNewTagAr(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addTagAr();
                          }
                        }}
                        className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                      />
                      <button
                        type="button"
                        onClick={addTagAr}
                        className="px-4 py-2 bg-[#0f382a] text-white rounded-lg font-bold text-xs hover:bg-[#164e3b]"
                      >
                        إضافة
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {(formData.tagsAr || []).map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 shadow-2xs"
                        >
                          <span>{tag}</span>
                          <button
                            type="button"
                            onClick={() => removeTagAr(idx)}
                            className="text-slate-400 hover:text-red-600 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* English Tags */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                    <label className="block text-slate-800 font-bold text-xs">
                      Technical Tags in English
                    </label>
                    <p className="text-[11px] text-slate-500">
                      Add quick engineering badges (e.g. Laser Navigation, PE100 SDR11, Up to 60&quot; Dia)
                    </p>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Type English tag and press Add..."
                        value={newTagEn}
                        onChange={(e) => setNewTagEn(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addTagEn();
                          }
                        }}
                        className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                      />
                      <button
                        type="button"
                        onClick={addTagEn}
                        className="px-4 py-2 bg-[#0f382a] text-white rounded-lg font-bold text-xs hover:bg-[#164e3b]"
                      >
                        Add Tag
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {(formData.tagsEn || []).map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 shadow-2xs"
                        >
                          <span>{tag}</span>
                          <button
                            type="button"
                            onClick={() => removeTagEn(idx)}
                            className="text-slate-400 hover:text-red-600 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: BASIC INFO & DESCRIPTIONS */}
              {activeTab === 'basic' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">
                        رقم النشاط (Number) *
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.number || ''}
                        onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">
                        كود النشاط المعتمد (Code) *
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.code || ''}
                        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-technical font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">
                        ترتيب العرض (Order)
                      </label>
                      <input
                        type="number"
                        value={formData.order || 0}
                        onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">
                        اسم النشاط / الخدمة بالعربية *
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.titleAr || ''}
                        onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">
                        اسم النشاط / الخدمة بالإنجليزية *
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.titleEn || ''}
                        onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-bold"
                      />
                    </div>
                  </div>

                  {/* Image Upload / URL */}
                  <div className="space-y-2 border border-slate-200 p-3.5 rounded-xl bg-slate-50">
                    <label className="block text-slate-700 font-semibold">
                      صورة الخدمة الميدانية (Image)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.image || ''}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="/images/services/..."
                        className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                      />
                      <label className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 rounded-lg cursor-pointer flex items-center gap-1.5 shrink-0 border border-slate-200 font-bold">
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
                    {formData.image && (
                      <div className="mt-2 h-24 w-40 rounded-lg overflow-hidden border border-slate-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">
                      الوصف التفصيلي بالعربية *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.descriptionAr || ''}
                      onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 leading-relaxed"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">
                      الوصف التفصيلي بالإنجليزية *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.descriptionEn || ''}
                      onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 leading-relaxed"
                    ></textarea>
                  </div>
                </div>
              )}

              {/* Modal Footer */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
                <div className="text-slate-400 text-[11px] font-technical">
                  <span>{(formData.featuresAr || []).length} مواصفات تنفيذية</span>
                  <span className="mx-1.5">&bull;</span>
                  <span>{(formData.specsAr || []).length} معايير مجدولة</span>
                  <span className="mx-1.5">&bull;</span>
                  <span>{(formData.tagsAr || []).length} وسوم</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg font-bold"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2 bg-gradient-to-r from-[#0f382a] to-[#164e3b] text-white font-bold rounded-lg shadow-md hover:brightness-110 flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#c5a869]" />
                    <span>{saving ? 'جاري الحفظ والتحديث...' : 'حفظ مواصفات الخدمة'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
