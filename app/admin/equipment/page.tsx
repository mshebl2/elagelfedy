'use client';

import React, { useState, useEffect } from 'react';
import { EquipmentType } from '@/types';
import {
  Plus,
  Edit2,
  Trash2,
  Upload,
  X,
  Sliders,
  FileText,
  TableProperties,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Search,
  Wrench,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  Tag,
  ArrowUpDown,
  Eye
} from 'lucide-react';

interface SpecRow {
  labelAr: string;
  valueAr: string;
  labelEn: string;
  valueEn: string;
}

export default function AdminEquipmentPage() {
  const [equipment, setEquipment] = useState<EquipmentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<EquipmentType | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingPlate, setUploadingPlate] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'footer' | 'basic' | 'media'>('specs');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedEquipmentId, setExpandedEquipmentId] = useState<string | null>(null);

  // Form state
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
    plateImage: '',
    featured: true,
    order: 1,
    footerNoteAr: '',
    footerNoteEn: '',
    specsAr: [],
    specsEn: [],
  });

  // Paired specs for convenient bilingual table editing
  const [specRows, setSpecRows] = useState<SpecRow[]>([]);

  // Show notification message
  const showToast = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const loadEquipment = async () => {
    try {
      const res = await fetch(`/api/admin/equipment?_t=${Date.now()}`, {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setEquipment(data.data);
      }
    } catch (err) {
      console.error('Error loading equipment:', err);
      showToast('error', 'تعذر تحميل بيانات المعدات');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEquipment();
  }, []);

  // Synchronize specRows whenever editingItem or formData.specs changes
  const buildSpecRows = (specsAr?: { label: string; value: string }[], specsEn?: { label: string; value: string }[]): SpecRow[] => {
    const arList = specsAr || [];
    const enList = specsEn || [];
    const maxLen = Math.max(arList.length, enList.length);
    const rows: SpecRow[] = [];

    for (let i = 0; i < maxLen; i++) {
      rows.push({
        labelAr: arList[i]?.label || '',
        valueAr: arList[i]?.value || '',
        labelEn: enList[i]?.label || '',
        valueEn: enList[i]?.value || '',
      });
    }

    if (rows.length === 0) {
      rows.push({
        labelAr: 'قوة السحب والدفع',
        valueAr: '36,000 lbs (160.1 kN)',
        labelEn: 'Thrust / Pullback',
        valueEn: '36,000 lbs (160.1 kN)',
      });
    }

    return rows;
  };

  const openCreateModal = () => {
    setEditingItem(null);
    const initialRows: SpecRow[] = [
      { labelAr: 'قوة السحب والدفع', valueAr: '36,000 lbs (160.1 kN)', labelEn: 'Thrust / Pullback', valueEn: '36,000 lbs (160.1 kN)' },
      { labelAr: 'أقصى عزم دوران', valueAr: '6,772 Nm (4,995 ft-lb)', labelEn: 'Max Spindle Torque', valueEn: '6,772 Nm (4,995 ft-lb)' },
      { labelAr: 'أقطار الحفر النموذجية', valueAr: '110 mm - 630 mm', labelEn: 'Bore Range', valueEn: '110 mm - 630 mm' },
      { labelAr: 'المحرك', valueAr: 'John Deere PowerTech Diesel (140 HP)', labelEn: 'Engine', valueEn: 'John Deere PowerTech Diesel (140 HP)' },
      { labelAr: 'السرعة الإنتاجية', valueAr: 'حتى 180 م / يوم عمل', labelEn: 'Daily Production Rate', valueEn: 'Up to 180 m / shift' },
    ];

    setSpecRows(initialRows);
    setFormData({
      nameAr: '',
      nameEn: '',
      categoryAr: 'حفارات متوسطة للمناطق الحضرية',
      categoryEn: 'Mid-Range Urban & Highway Rigs',
      tagAr: '36,000 رطل قوة سحب',
      tagEn: '36,000 lbs Pullback',
      descriptionAr: '',
      descriptionEn: '',
      image: '/images/equipment/drillto_zt75.jpg',
      plateImage: '/images/equipment/zlconn_metal_plate.jpg',
      featured: true,
      order: equipment.length + 1,
      footerNoteAr: 'مثالية لمشاريع المدن الذكية والأحياء السكنية',
      footerNoteEn: 'Ideal for smart-city utilities & residential corridors',
      specsAr: initialRows.map(r => ({ label: r.labelAr, value: r.valueAr })),
      specsEn: initialRows.map(r => ({ label: r.labelEn, value: r.valueEn })),
    });
    setActiveTab('specs');
    setModalOpen(true);
  };

  const openEditModal = (item: EquipmentType) => {
    setEditingItem(item);
    const rows = buildSpecRows(item.specsAr, item.specsEn);
    setSpecRows(rows);
    setFormData({
      ...item,
      specsAr: item.specsAr || [],
      specsEn: item.specsEn || [],
    });
    setActiveTab('specs');
    setModalOpen(true);
  };

  // Spec Rows Handlers
  const handleUpdateSpecRow = (index: number, field: keyof SpecRow, value: string) => {
    const updated = [...specRows];
    updated[index][field] = value;
    setSpecRows(updated);
  };

  const handleAddSpecRow = (preset?: { labelAr: string; valueAr: string; labelEn: string; valueEn: string }) => {
    const newRow: SpecRow = preset || {
      labelAr: '',
      valueAr: '',
      labelEn: '',
      valueEn: '',
    };
    setSpecRows(prev => [...prev, newRow]);
  };

  const handleRemoveSpecRow = (index: number) => {
    setSpecRows(prev => prev.filter((_, i) => i !== index));
  };

  const handleMoveSpecRow = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === specRows.length - 1) return;

    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const updated = [...specRows];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setSpecRows(updated);
  };

  // Upload handler
  const handleFileUpload = async (file: File, target: 'image' | 'plateImage') => {
    const data = new FormData();
    data.append('file', file);
    if (target === 'image') setUploadingImage(true);
    else setUploadingPlate(true);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: data,
      });
      const result = await res.json();
      if (result.success) {
        setFormData((prev) => ({ ...prev, [target]: result.url }));
        showToast('success', 'تم رفع الصورة بنجاح');
      } else {
        showToast('error', result.message || 'فشل رفع الصورة');
      }
    } catch (err) {
      showToast('error', 'حدث خطأ أثناء رفع الصورة');
    } finally {
      if (target === 'image') setUploadingImage(false);
      else setUploadingPlate(false);
    }
  };

  // Save handler
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Reconstruct specsAr and specsEn from specRows
      const cleanSpecsAr = specRows
        .filter(r => r.labelAr.trim() || r.valueAr.trim())
        .map(r => ({ label: r.labelAr.trim(), value: r.valueAr.trim() }));

      const cleanSpecsEn = specRows
        .filter(r => r.labelEn.trim() || r.valueEn.trim())
        .map(r => ({ label: r.labelEn.trim(), value: r.valueEn.trim() }));

      const payload = {
        ...formData,
        specsAr: cleanSpecsAr,
        specsEn: cleanSpecsEn,
      };

      const res = await fetch('/api/admin/equipment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        showToast('success', data.message || 'تم حفظ بيانات المعدة بنجاح');
        setModalOpen(false);
        if (Array.isArray(data.data)) {
          setEquipment(data.data);
        } else {
          await loadEquipment();
        }
      } else {
        showToast('error', data.message || 'فشل حفظ المعدة');
      }
    } catch (err: any) {
      showToast('error', err.message || 'حدث خطأ في الاتصال بالخادم');
    } finally {
      setSaving(false);
    }
  };

  // Delete handler
  const handleDelete = async (item: EquipmentType) => {
    const id = item._id || item.order || item.nameAr;
    if (!confirm(`هل أنت متأكد من حذف المعدة "${item.nameAr}" نهائياً من الأسطول؟`)) return;

    try {
      const res = await fetch(`/api/admin/equipment?id=${encodeURIComponent(String(id))}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', 'تم حذف المعدة بنجاح');
        if (Array.isArray(data.data)) {
          setEquipment(data.data);
        } else {
          await loadEquipment();
        }
      } else {
        showToast('error', data.message || 'فشل حذف المعدة');
      }
    } catch (err) {
      showToast('error', 'تعذر تنفيذ الحذف');
    }
  };

  // Filter equipment based on search query
  const filteredEquipment = equipment.filter((eq) => {
    const q = searchQuery.toLowerCase();
    const nameMatch = eq.nameAr.toLowerCase().includes(q) || eq.nameEn.toLowerCase().includes(q);
    const catMatch = (eq.categoryAr || '').toLowerCase().includes(q) || (eq.categoryEn || '').toLowerCase().includes(q);
    const tagMatch = (eq.tagAr || '').toLowerCase().includes(q) || (eq.tagEn || '').toLowerCase().includes(q);
    const specMatch = (eq.specsAr || []).some(s => s.label.toLowerCase().includes(q) || s.value.toLowerCase().includes(q));
    return nameMatch || catMatch || tagMatch || specMatch;
  });

  // Common Presets for HDD / Trenchless rigs
  const commonPresets = [
    { labelAr: 'قوة السحب والدفع', valueAr: '36,000 lbs (160.1 kN)', labelEn: 'Thrust / Pullback', valueEn: '36,000 lbs (160.1 kN)' },
    { labelAr: 'أقصى عزم دوران', valueAr: '6,772 Nm (4,995 ft-lb)', labelEn: 'Max Spindle Torque', valueEn: '6,772 Nm (4,995 ft-lb)' },
    { labelAr: 'أقطار الحفر النموذجية', valueAr: '110 mm - 630 mm', labelEn: 'Bore Range', valueEn: '110 mm - 630 mm' },
    { labelAr: 'المحرك', valueAr: 'John Deere PowerTech Diesel (140 HP)', labelEn: 'Engine', valueEn: 'John Deere PowerTech Diesel (140 HP)' },
    { labelAr: 'السرعة الإنتاجية', valueAr: 'حتى 180 م / يوم عمل', labelEn: 'Daily Production Rate', valueEn: 'Up to 180 m / shift' },
    { labelAr: 'أقصى عمق تتبع', valueAr: '38+ meters (125+ ft)', labelEn: 'Depth Tracking Range', valueEn: '38+ meters (125+ ft)' },
    { labelAr: 'دقة قراءة الميلان', valueAr: '0.1% Pitch Resolution', labelEn: 'Pitch Precision', valueEn: '0.1% Pitch Resolution' },
    { labelAr: 'سعة المعالجة والتدوير', valueAr: '500 GPM (1,892 L/min)', labelEn: 'Processing Capacity', valueEn: '500 GPM (1,892 L/min)' },
    { labelAr: 'سعة خزان الخلط', valueAr: '15,000 Liters', labelEn: 'Mixing Tank Volume', valueEn: '15,000 Liters' },
    { labelAr: 'نطاق الترددات', valueAr: 'Wideband (0.33 - 45 kHz)', labelEn: 'Frequency Spectrum', valueEn: 'Wideband (0.33 - 45 kHz)' },
  ];

  const footerPresets = [
    { ar: 'مثالية لمشاريع المدن الذكية والأحياء السكنية', en: 'Ideal for smart-city utilities & residential corridors' },
    { ar: 'جاهزة للتشغيل الفوري في المشاريع الكبرى بالمملكة', en: 'Mobilization ready across all KSA megaproject zones' },
    { ar: 'معتمد من أرامكو السعودية والشركة السعودية للكهرباء', en: 'Certified for Aramco & SEC high-interference easements' },
    { ar: 'مطابقة لمعايير الاستدامة البيئية لمشاريع البحر الأحمر ونيوم', en: 'Compliant with Red Sea & NEOM strict eco standards' },
    { ar: 'معايرة دورية معتمدة وفق اشتراطات الكود السعودي', en: 'Calibrated per SASO and Saudi Building Code standards' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Toast Notification */}
      {message && (
        <div
          className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-lg shadow-xl text-sm font-bold border transition-all ${
            message.type === 'success'
              ? 'bg-emerald-900 text-emerald-100 border-emerald-700'
              : 'bg-rose-900 text-rose-100 border-rose-700'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-300 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0f382a] animate-pulse"></span>
            <span className="text-xs uppercase font-technical tracking-wider text-[#0f382a] font-bold">
              INDUSTRIAL FLEET & MACHINERY
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            إدارة أسطول المعدات الثقيلة والحفارات الموجهة
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            تحكم كامل في مواصفات الحفارات، عزم الدوران، قوى السحب، المحركات، والملاحظات التشغيلية الميدانية.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openCreateModal}
            className="px-5 py-2.5 bg-[#0f382a] hover:bg-[#164e3b] text-white font-bold text-xs rounded-lg flex items-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <Plus className="w-4 h-4 text-[#c5a869]" />
            <span>إضافة معدة جديدة</span>
          </button>
        </div>
      </div>

      {/* Control Bar: Search & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2 relative">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="بحث باسم المعدة، قوة السحب، المحرك، أو المواصفات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-lg pr-9 pl-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0f382a] shadow-xs"
          />
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-3 flex items-center justify-between shadow-xs">
          <span className="text-xs text-slate-500 font-medium">إجمالي أسطول المعدات:</span>
          <span className="text-sm font-extrabold text-[#0f382a] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            {equipment.length} معدة
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-3 flex items-center justify-between shadow-xs">
          <span className="text-xs text-slate-500 font-medium">الحفارات الرئيسية:</span>
          <span className="text-sm font-extrabold text-[#c5a869] bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            {equipment.filter(e => e.featured).length} رئيسية
          </span>
        </div>
      </div>

      {/* Equipment Cards List */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 text-sm">
          <div className="w-8 h-8 border-3 border-[#0f382a] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          جاري تحميل بيانات الأسطول والمعدات...
        </div>
      ) : filteredEquipment.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500 space-y-3">
          <Wrench className="w-12 h-12 text-slate-300 mx-auto" />
          <p className="text-sm font-bold">لم يتم العثور على معدات مطابقة للبحث</p>
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs text-[#0f382a] underline font-semibold"
          >
            إعادة تعيين البحث
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredEquipment.map((item, idx) => {
            const isExpanded = expandedEquipmentId === (item._id || item.nameAr);
            const specs = item.specsAr || [];

            return (
              <div
                key={item._id || idx}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Card Top: Image & Badges */}
                  <div className="relative h-48 w-full bg-slate-100 overflow-hidden border-b border-slate-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image || '/images/equipment/drillto_zt75.jpg'}
                      alt={item.nameAr}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                    {/* Tag badge */}
                    {item.tagAr && (
                      <span className="absolute top-3 end-3 bg-white/95 backdrop-blur-xs px-3 py-1 border border-[#0f382a] text-[11px] font-technical text-[#0f382a] font-bold rounded-md shadow-sm">
                        {item.tagAr}
                      </span>
                    )}

                    {/* Featured Rig Badge */}
                    <span className={`absolute top-3 start-3 px-2.5 py-0.5 text-[10px] font-bold rounded-md uppercase tracking-wider ${
                      item.featured
                        ? 'bg-[#0f382a] text-white border border-emerald-600'
                        : 'bg-slate-800 text-slate-200'
                    }`}>
                      {item.featured ? 'حفارة رئيسية' : 'معدة مساعدة'}
                    </span>

                    {/* Order Badge */}
                    <span className="absolute bottom-3 start-3 bg-black/60 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                      الترتيب #{item.order || idx + 1}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-4">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="text-base font-extrabold text-slate-900">{item.nameAr}</h3>
                        <span className="text-[11px] text-[#0f382a] font-bold shrink-0 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                          {item.categoryAr || 'حفارات موجهة'}
                        </span>
                      </div>
                      <p className="text-xs font-technical text-slate-500 font-semibold">{item.nameEn}</p>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {item.descriptionAr}
                    </p>

                    {/* Specs Grid Preview (The core requirement requested by user) */}
                    <div className="border-t border-slate-100 pt-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                          <TableProperties className="w-3.5 h-3.5 text-[#0f382a]" />
                          <span>المواصفات الفنية المعتمدة ({specs.length}):</span>
                        </span>
                        {specs.length > 4 && (
                          <button
                            type="button"
                            onClick={() => setExpandedEquipmentId(isExpanded ? null : (item._id || item.nameAr))}
                            className="text-[11px] text-[#0f382a] hover:underline flex items-center gap-0.5"
                          >
                            <span>{isExpanded ? 'عرض أقل' : 'عرض الكل'}</span>
                            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] font-technical bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
                        {(isExpanded ? specs : specs.slice(0, 4)).map((sp, sIdx) => (
                          <div key={sIdx} className="bg-white p-1.5 rounded border border-slate-200/60">
                            <span className="text-slate-500 block text-[10px]">{sp.label}:</span>
                            <strong className="text-slate-900 font-bold text-xs truncate block">{sp.value}</strong>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer Note Preview (Bottom strip from user's screenshot) */}
                    {item.footerNoteAr && (
                      <div className="p-2.5 bg-emerald-50/60 border border-emerald-200/70 rounded-lg text-[11px] font-technical text-[#0f382a] flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#0f382a] shrink-0" />
                        <span className="truncate">
                          <strong>ملاحظة الكارت:</strong> {item.footerNoteAr}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="p-4 border-t border-slate-200 bg-slate-50/80 flex items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-400">
                    معرف المعدة: <span className="font-mono text-slate-500">{String(item._id || item.nameAr).slice(-6)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDelete(item)}
                      className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="حذف المعدة"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => openEditModal(item)}
                      className="px-4 py-2 bg-[#0f382a] hover:bg-[#164e3b] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all shadow-xs"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-[#c5a869]" />
                      <span>تعديل المواصفات والبيانات</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit / Create Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
          <div className="bg-white border border-slate-200 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0f382a] text-[#c5a869] flex items-center justify-center font-bold">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    {editingItem ? `تعديل مواصفات: ${editingItem.nameAr}` : 'إضافة معدة وحفارة جديدة للأسطول'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    تعديل جدول المعايير الهندسية، أقطار الحفر، المحرك، والملاحظة السفلية
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex border-b border-slate-200 bg-white px-6 gap-2 overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab('specs')}
                className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
                  activeTab === 'specs'
                    ? 'border-[#0f382a] text-[#0f382a] bg-emerald-50/40'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <TableProperties className="w-4 h-4 text-[#0f382a]" />
                <span>جدول المواصفات الفنية ({specRows.length})</span>
                <span className="bg-[#0f382a]/10 text-[#0f382a] text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                  المطلوبة في الصورة
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('footer')}
                className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
                  activeTab === 'footer'
                    ? 'border-[#0f382a] text-[#0f382a] bg-emerald-50/40'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-[#0f382a]" />
                <span>ملاحظة التشغيل السفلية</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('basic')}
                className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
                  activeTab === 'basic'
                    ? 'border-[#0f382a] text-[#0f382a] bg-emerald-50/40'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileText className="w-4 h-4 text-[#0f382a]" />
                <span>البيانات الأساسية والوصف</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('media')}
                className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
                  activeTab === 'media'
                    ? 'border-[#0f382a] text-[#0f382a] bg-emerald-50/40'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <ImageIcon className="w-4 h-4 text-[#0f382a]" />
                <span>الصور واللوحة المعدنية</span>
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
              {/* TAB 1: TECHNICAL SPECS (The Exact Request from User) */}
              {activeTab === 'specs' && (
                <div className="space-y-6">
                  {/* Tab Explanation Banner */}
                  <div className="bg-gradient-to-r from-emerald-50 to-amber-50/40 border border-emerald-200/80 p-4 rounded-xl space-y-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#0f382a]" />
                      <h4 className="font-extrabold text-slate-900 text-sm">
                        تعديل جدول المعايير والمواصفات الفنية الميدانية (Bilingual Specs Matrix)
                      </h4>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      هذا الجدول يتيح لك تعديل كافة الخصائص الموضحة في الصورة (قوة السحب والدفع، أقصى عزم دوران، أقطار الحفر، المحرك، والسرعة الإنتاجية). يتم حفظها ثنائية اللغة وتظهر في كروت العرض فوراً.
                    </p>
                  </div>

                  {/* Quick Add Presets Bar */}
                  <div className="space-y-2">
                    <label className="block text-slate-700 font-bold">
                      إضافة سريعة لمواصفات قياسية شائعة بنقرة واحدة:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {commonPresets.map((preset, pIdx) => (
                        <button
                          key={pIdx}
                          type="button"
                          onClick={() => handleAddSpecRow(preset)}
                          className="px-2.5 py-1.5 bg-slate-100 hover:bg-emerald-50 hover:text-[#0f382a] hover:border-emerald-300 border border-slate-200 text-slate-700 text-[11px] rounded-lg transition-all flex items-center gap-1 font-medium"
                        >
                          <Plus className="w-3 h-3 text-[#0f382a]" />
                          <span>{preset.labelAr}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Specs Table */}
                  <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs bg-white">
                    <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                      <span className="font-bold text-slate-800 flex items-center gap-1.5">
                        <TableProperties className="w-4 h-4 text-[#0f382a]" />
                        <span>قائمة المواصفات الحالية ({specRows.length})</span>
                      </span>

                      <button
                        type="button"
                        onClick={() => handleAddSpecRow()}
                        className="px-3 py-1.5 bg-[#0f382a] hover:bg-[#164e3b] text-white text-[11px] font-bold rounded-md flex items-center gap-1.5 transition-all shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5 text-[#c5a869]" />
                        <span>إضافة سطر مواصفة جديد</span>
                      </button>
                    </div>

                    <div className="divide-y divide-slate-200">
                      {specRows.length === 0 ? (
                        <div className="p-8 text-center text-slate-400">
                          لا توجد مواصفات فنية مضافة حالياً. انقر على الزر أعلاه لإضافة أول مواصفة.
                        </div>
                      ) : (
                        specRows.map((row, rIdx) => (
                          <div key={rIdx} className="p-3.5 hover:bg-slate-50/70 transition-colors space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                                {rIdx + 1}
                              </span>

                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => handleMoveSpecRow(rIdx, 'up')}
                                  disabled={rIdx === 0}
                                  className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded"
                                  title="تحريك لأعلى"
                                >
                                  <ChevronUp className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleMoveSpecRow(rIdx, 'down')}
                                  disabled={rIdx === specRows.length - 1}
                                  className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded"
                                  title="تحريك لأسفل"
                                >
                                  <ChevronDown className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveSpecRow(rIdx)}
                                  className="p-1 text-rose-500 hover:bg-rose-50 rounded transition-colors"
                                  title="حذف هذا السطر"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            {/* Dual Language Inputs */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {/* Arabic Fields */}
                              <div className="bg-emerald-50/30 p-2.5 rounded-lg border border-emerald-100 space-y-2">
                                <span className="text-[10px] font-bold text-[#0f382a] block">البيانات بالعربية (AR):</span>
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <label className="block text-[10px] text-slate-500 mb-0.5">اسم المواصفة (مثال: قوة السحب):</label>
                                    <input
                                      type="text"
                                      placeholder="مثال: قوة السحب والدفع"
                                      value={row.labelAr}
                                      onChange={(e) => handleUpdateSpecRow(rIdx, 'labelAr', e.target.value)}
                                      className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-900 focus:ring-1 focus:ring-[#0f382a]"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[10px] text-slate-500 mb-0.5">القيمة (مثال: 36,000 lbs):</label>
                                    <input
                                      type="text"
                                      placeholder="مثال: 36,000 lbs (160.1 kN)"
                                      value={row.valueAr}
                                      onChange={(e) => handleUpdateSpecRow(rIdx, 'valueAr', e.target.value)}
                                      className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-900 font-bold focus:ring-1 focus:ring-[#0f382a]"
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* English Fields */}
                              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 space-y-2">
                                <span className="text-[10px] font-bold text-slate-700 block">English Specs (EN):</span>
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <label className="block text-[10px] text-slate-500 mb-0.5">Spec Label (e.g. Thrust):</label>
                                    <input
                                      type="text"
                                      placeholder="e.g. Thrust / Pullback"
                                      value={row.labelEn}
                                      onChange={(e) => handleUpdateSpecRow(rIdx, 'labelEn', e.target.value)}
                                      className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-900 font-technical focus:ring-1 focus:ring-[#0f382a]"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[10px] text-slate-500 mb-0.5">Value (e.g. 36,000 lbs):</label>
                                    <input
                                      type="text"
                                      placeholder="e.g. 36,000 lbs (160.1 kN)"
                                      value={row.valueEn}
                                      onChange={(e) => handleUpdateSpecRow(rIdx, 'valueEn', e.target.value)}
                                      className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-900 font-bold font-technical focus:ring-1 focus:ring-[#0f382a]"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Live Visual Card Preview (Matching User Screenshot 100%) */}
                  <div className="border border-slate-300 rounded-xl overflow-hidden shadow-md bg-white">
                    <div className="bg-slate-900 text-white p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-[#c5a869]" />
                        <span className="font-extrabold text-xs">
                          معاينة حية لشكل كارت المواصفات بالموقع (مطابق للصورة تماماً)
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">Live Preview</span>
                    </div>

                    <div className="p-6 bg-white space-y-4">
                      {/* Name & Tag */}
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div>
                          <h4 className="text-base font-extrabold text-slate-900">
                            {formData.nameAr || 'حفارة موجهة فيرمير D36x50 Series II Navigator'}
                          </h4>
                          <span className="text-[11px] text-[#937338] font-bold">
                            {formData.categoryAr || 'حفارات متوسطة للمناطق الحضرية'}
                          </span>
                        </div>
                        <span className="bg-white px-2.5 py-1 border border-[#0f382a] text-[10px] font-technical text-[#0f382a] font-bold rounded shadow-xs">
                          {formData.tagAr || '36,000 رطل قوة سحب'}
                        </span>
                      </div>

                      {/* 2-Column Grid as in User Screenshot */}
                      <div className="grid grid-cols-2 gap-4 text-xs font-technical border-t border-slate-200 pt-3">
                        {specRows.map((row, i) => (
                          <div key={i} className="space-y-0.5">
                            <span className="text-slate-500 block text-[11px]">{row.labelAr || 'المواصفة'}:</span>
                            <strong className="text-slate-900 font-extrabold text-xs block">{row.valueAr || '-'}</strong>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer note strip at the bottom of the card */}
                    <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs font-technical text-slate-700 flex items-center justify-between">
                      <span>{formData.footerNoteAr || 'مثالية لمشاريع المدن الذكية والأحياء السكنية'}</span>
                      <span className="text-[10px] text-slate-400 font-mono">Footer Note</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: FOOTER NOTE & OPERATIONAL CORRIDOR */}
              {activeTab === 'footer' && (
                <div className="space-y-6">
                  <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl space-y-2">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-[#0f382a]" />
                      <h4 className="font-extrabold text-slate-900 text-sm">
                        الملاحظة السفلية ونطاق الاعتماد التشغيلي (Operational Corridor)
                      </h4>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      هذا النص يظهر في الشريط الرمادي الفاتح أسفل كارت المعدة تماماً كما في الصورة (مثال: &ldquo;مثالية لمشاريع المدن الذكية والأحياء السكنية&rdquo;)، ويمكن تخصيصه لبيان مدى جاهزية المعدة، اعتمادها من جهات كبرى كأرامكو، أو مطابقتها البيئية.
                    </p>
                  </div>

                  {/* Preset Suggestions */}
                  <div className="space-y-2">
                    <label className="block text-slate-700 font-bold">نماذج سريعة جاهزة للاعتماد:</label>
                    <div className="space-y-2">
                      {footerPresets.map((fp, idx) => (
                        <div
                          key={idx}
                          onClick={() => setFormData({ ...formData, footerNoteAr: fp.ar, footerNoteEn: fp.en })}
                          className="p-3 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 rounded-lg cursor-pointer transition-all flex items-center justify-between"
                        >
                          <div>
                            <span className="font-bold text-slate-900 block">{fp.ar}</span>
                            <span className="text-[10px] text-slate-500 font-technical">{fp.en}</span>
                          </div>
                          <span className="text-[10px] text-[#0f382a] font-bold bg-white px-2 py-1 rounded border border-slate-200">
                            تطبيق
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Manual Inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-slate-700 font-bold">
                        الملاحظة السفلية بالعربية (footerNoteAr) *
                      </label>
                      <input
                        type="text"
                        placeholder="مثال: مثالية لمشاريع المدن الذكية والأحياء السكنية"
                        value={formData.footerNoteAr || ''}
                        onChange={(e) => setFormData({ ...formData, footerNoteAr: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-[#0f382a]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-slate-700 font-bold">
                        الملاحظة السفلية بالإنجليزية (footerNoteEn)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Ideal for smart-city utilities & residential corridors"
                        value={formData.footerNoteEn || ''}
                        onChange={(e) => setFormData({ ...formData, footerNoteEn: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-xs text-slate-900 font-technical focus:ring-2 focus:ring-[#0f382a]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: BASIC INFO & DESCRIPTION */}
              {activeTab === 'basic' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">اسم المعدة بالعربية *</label>
                      <input
                        required
                        type="text"
                        placeholder="مثال: حفارة موجهة فيرمير D36x50 Series II Navigator"
                        value={formData.nameAr || ''}
                        onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-[#0f382a]"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">اسم المعدة بالإنجليزية *</label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Vermeer D36x50 Series II Navigator HDD Rig"
                        value={formData.nameEn || ''}
                        onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 font-technical focus:ring-2 focus:ring-[#0f382a]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">تصنيف المعدة بالعربية</label>
                      <input
                        type="text"
                        placeholder="مثال: حفارات متوسطة للمناطق الحضرية"
                        value={formData.categoryAr || ''}
                        onChange={(e) => setFormData({ ...formData, categoryAr: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">تصنيف المعدة بالإنجليزية</label>
                      <input
                        type="text"
                        placeholder="e.g. Mid-Range Urban & Highway Rigs"
                        value={formData.categoryEn || ''}
                        onChange={(e) => setFormData({ ...formData, categoryEn: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 font-technical"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">الشارة المميزة بالعربية (Tag)</label>
                      <input
                        type="text"
                        placeholder="مثال: 36,000 رطل قوة سحب"
                        value={formData.tagAr || ''}
                        onChange={(e) => setFormData({ ...formData, tagAr: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">الشارة المميزة بالإنجليزية (Tag EN)</label>
                      <input
                        type="text"
                        placeholder="e.g. 36,000 lbs Pullback"
                        value={formData.tagEn || ''}
                        onChange={(e) => setFormData({ ...formData, tagEn: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 font-technical"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">الوصف التفصيلي بالعربية *</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="اكتب وصفاً هندسياً دقيقاً لقدرات المعدة واستخداماتها الميدانية..."
                      value={formData.descriptionAr || ''}
                      onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-900 leading-relaxed focus:ring-2 focus:ring-[#0f382a]"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">الوصف التفصيلي بالإنجليزية *</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Detailed engineering capabilities, site mobilization specs, and usage scope..."
                      value={formData.descriptionEn || ''}
                      onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-900 font-technical leading-relaxed focus:ring-2 focus:ring-[#0f382a]"
                    ></textarea>
                  </div>
                </div>
              )}

              {/* TAB 4: MEDIA & OPTIONS */}
              {activeTab === 'media' && (
                <div className="space-y-6">
                  {/* Primary Rig Image */}
                  <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-3">
                    <label className="block text-slate-800 font-bold">الصورة الميدانية للمعدة *</label>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      {formData.image && (
                        <div className="w-28 h-24 rounded-lg overflow-hidden border border-slate-300 bg-white shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex-1 w-full space-y-2">
                        <input
                          required
                          type="text"
                          placeholder="/images/equipment/... أو رابط خارجي https://..."
                          value={formData.image || ''}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900"
                        />
                        <label className="inline-flex items-center gap-2 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg cursor-pointer transition-colors text-xs font-bold">
                          <Upload className="w-3.5 h-3.5 text-[#0f382a]" />
                          <span>{uploadingImage ? 'جاري الرفع...' : 'رفع صورة من الجهاز'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files?.[0]) handleFileUpload(e.target.files[0], 'image');
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Metal Nameplate / Factory Plate Image */}
                  <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-slate-800 font-bold">
                        صورة لوحة بيانات المصنع المعدنية أو شهادة المعايرة (OEM Factory Nameplate)
                      </label>
                      <span className="text-[10px] text-slate-400">اختياري</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      {formData.plateImage && (
                        <div className="w-28 h-24 rounded-lg overflow-hidden border border-slate-300 bg-white shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={formData.plateImage} alt="Plate" className="w-full h-full object-contain p-1" />
                        </div>
                      )}
                      <div className="flex-1 w-full space-y-2">
                        <input
                          type="text"
                          placeholder="/images/equipment/zlconn_metal_plate.jpg"
                          value={formData.plateImage || ''}
                          onChange={(e) => setFormData({ ...formData, plateImage: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900"
                        />
                        <label className="inline-flex items-center gap-2 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg cursor-pointer transition-colors text-xs font-bold">
                          <Upload className="w-3.5 h-3.5 text-[#0f382a]" />
                          <span>{uploadingPlate ? 'جاري الرفع...' : 'رفع صورة اللوحة المعدنية'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files?.[0]) handleFileUpload(e.target.files[0], 'plateImage');
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Display Settings: Featured & Order */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-slate-200 p-4 rounded-xl bg-white">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <div>
                        <span className="font-bold text-slate-900 block text-xs">معدة رئيسية مميزة (Featured Rig)</span>
                        <span className="text-[11px] text-slate-500">
                          تظهر في بطاقات العرض الكبرى العلوية بجدول المواصفات الكامل
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        checked={formData.featured ?? true}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="w-4 h-4 text-[#0f382a] rounded cursor-pointer"
                      />
                    </div>

                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <label className="block text-xs font-bold text-slate-900 mb-1">
                        ترتيب الظهور في الموقع (Order Number)
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={formData.order || 1}
                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                        className="w-full bg-white border border-slate-200 rounded px-3 py-1.5 text-xs text-slate-900 font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Actions Footer */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div className="text-[11px] text-slate-400">
                  {specRows.length} مواصفة فنية جاهزة للحفظ والمزامنة المباشرة
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
                  >
                    إلغاء
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="px-7 py-2.5 bg-[#0f382a] hover:bg-[#164e3b] text-white text-xs font-extrabold rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center gap-2"
                  >
                    {saving ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>جاري حفظ المعدة...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-[#c5a869]" />
                        <span>حفظ ومزامنة المعدة</span>
                      </>
                    )}
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
