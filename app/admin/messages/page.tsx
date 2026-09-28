'use client';

import React, { useState, useEffect } from 'react';
import { MessageType } from '@/types';
import { Inbox, Eye, Trash2, CheckCircle2, Phone, Mail, Clock, X } from 'lucide-react';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [activeMessage, setActiveMessage] = useState<MessageType | null>(null);
  const [updating, setUpdating] = useState(false);

  const loadMessages = async () => {
    try {
      const res = await fetch('/api/admin/messages');
      const data = await res.json();
      if (data.success) {
        setMessages(data.data);
      }
    } catch (err) {
      console.error('Error loading messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleStatusChange = async (id: string, newStatus: MessageType['status']) => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        if (activeMessage && activeMessage._id === id) {
          setActiveMessage({ ...activeMessage, status: newStatus });
        }
        await loadMessages();
      }
    } catch (err) {
      alert('Error updating message status');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm('هل أنت متأكد من حذف هذه الرسالة نهائياً؟')) return;

    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setActiveMessage(null);
        await loadMessages();
      }
    } catch (err) {
      alert('Error deleting message');
    }
  };

  const filteredMessages = messages.filter((m) => {
    if (statusFilter === 'all') return true;
    return m.status === statusFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-wide">
            صندوق طلبات الأسعار والمناقصات (RFQ & Tenders Inbox)
          </h2>
          <p className="text-xs text-slate-500">
            متابعة ودراسة عروض الأسعار والمواصفات الجيوتقنية الواردة من المقاولين
          </p>
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap gap-2 text-xs">
          {['all', 'new', 'reviewing', 'quoted', 'archived'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded uppercase font-bold transition-all ${
                statusFilter === status
                  ? 'bg-[#0f382a] text-[#0c0e10]'
                  : 'bg-white border border-slate-200 text-slate-500 hover:text-slate-900'
              }`}
            >
              {status === 'all'
                ? `الكل (${messages.length})`
                : status === 'new'
                ? `جديد (${messages.filter((m) => m.status === 'new').length})`
                : status === 'reviewing'
                ? `قيد الدراسة (${messages.filter((m) => m.status === 'reviewing').length})`
                : status === 'quoted'
                ? 'تم التسعير'
                : 'مؤرشف'}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Table */}
      <div className="border border-slate-200 bg-white rounded-lg overflow-hidden">
        {filteredMessages.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-xs">
            لا توجد رسائل مطابقة لهذا الفلتر.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs font-technical">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200">
                <tr>
                  <th className="p-3 text-start">رقم المرجع (Ref)</th>
                  <th className="p-3 text-start">المرسل / الشركة</th>
                  <th className="p-3 text-start">الخدمة المطلوبة</th>
                  <th className="p-3 text-start">الاتصال</th>
                  <th className="p-3 text-center">الحالة</th>
                  <th className="p-3 text-start">التاريخ</th>
                  <th className="p-3 text-end">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2a313a] text-slate-600">
                {filteredMessages.map((msg, idx) => (
                  <tr key={idx} className="hover:bg-slate-100/50">
                    <td className="p-3 font-bold text-[#0f382a]">{msg.referenceNo}</td>
                    <td className="p-3">
                      <strong className="text-slate-900 block">{msg.name}</strong>
                      <span className="text-[10px] text-slate-500">{msg.company}</span>
                    </td>
                    <td className="p-3 text-slate-600 max-w-xs truncate">{msg.subject}</td>
                    <td className="p-3">
                      <div className="text-[11px] text-slate-600">{msg.phone}</div>
                      <div className="text-[10px] text-slate-400">{msg.email}</div>
                    </td>
                    <td className="p-3 text-center">
                      <select
                        value={msg.status}
                        onChange={(e) =>
                          handleStatusChange(msg._id!, e.target.value as MessageType['status'])
                        }
                        className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-[10px] font-bold text-slate-700"
                      >
                        <option value="new">جديد (New)</option>
                        <option value="reviewing">قيد الدراسة (Reviewing)</option>
                        <option value="quoted">تم التسعير (Quoted)</option>
                        <option value="archived">مؤرشف (Archived)</option>
                      </select>
                    </td>
                    <td className="p-3 text-[10px] text-slate-500">
                      {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString('ar-SA') : '-'}
                    </td>
                    <td className="p-3 text-end space-s-2">
                      <button
                        onClick={() => setActiveMessage(msg)}
                        className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 rounded"
                        title="عرض كامل التفاصيل"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(msg._id)}
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
        )}
      </div>

      {/* Message Inspection Modal */}
      {activeMessage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 w-full max-w-2xl rounded-lg shadow-2xl p-6 space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-xs font-technical text-[#0f382a] font-bold">
                  {activeMessage.referenceNo}
                </span>
                <h3 className="text-base font-bold text-slate-900">تفاصيل طلب عرض السعر / المناقصة</h3>
              </div>
              <button
                onClick={() => setActiveMessage(null)}
                className="text-slate-500 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-1">
                <span className="text-slate-400 block text-[10px]">مقدم الطلب:</span>
                <strong className="text-slate-900 text-sm block">{activeMessage.name}</strong>
                <span className="text-slate-500 block">{activeMessage.company}</span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-1">
                <span className="text-slate-400 block text-[10px]">بيانات الاتصال:</span>
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Phone className="w-3.5 h-3.5 text-[#0f382a]" />
                  <span dir="ltr">{activeMessage.phone}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Mail className="w-3.5 h-3.5 text-[#0f382a]" />
                  <span>{activeMessage.email}</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-1 text-xs">
              <span className="text-slate-400 block text-[10px]">الخدمة المطلوبة:</span>
              <strong className="text-[#0f382a] block text-sm">{activeMessage.subject}</strong>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-1 text-xs">
              <span className="text-slate-400 block text-[10px]">
                تفاصيل المشروع والمواصفات الجيوتقنية (Soil Specs & Boreholes):
              </span>
              <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                {activeMessage.soilConditions || activeMessage.message || 'لا توجد ملاحظات إضافية'}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-200">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">تغيير حالة الطلب:</span>
                <select
                  value={activeMessage.status}
                  onChange={(e) =>
                    handleStatusChange(activeMessage._id!, e.target.value as MessageType['status'])
                  }
                  className="bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-xs text-slate-900"
                >
                  <option value="new">جديد (New)</option>
                  <option value="reviewing">قيد الدراسة (Reviewing)</option>
                  <option value="quoted">تم التسعير (Quoted)</option>
                  <option value="archived">مؤرشف (Archived)</option>
                </select>
              </div>

              <button
                onClick={() => setActiveMessage(null)}
                className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs rounded font-bold"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
