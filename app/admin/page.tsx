'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FolderGit2,
  Inbox,
  Briefcase,
  Building2,
  Palette,
  Phone,
  Layers,
  FileText,
  KeyRound,
  Plus,
  ArrowRight,
  Eye,
  ShieldCheck,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { ProjectType, MessageType } from '@/types';

export default function AdminDashboardPage() {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [projRes, msgRes] = await Promise.all([
          fetch('/api/admin/projects'),
          fetch('/api/admin/messages'),
        ]);
        const projData = await projRes.json();
        const msgData = await msgRes.json();

        if (projData.success) setProjects(projData.data);
        if (msgData.success) setMessages(msgData.data);
      } catch (err) {
        console.error('Error fetching admin dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const quickCards = [
    {
      title: 'سلايدر وخلفيات الرئيسية',
      desc: 'إضافة وحذف وتعديل صور وعناوين السلايدر',
      href: '/admin/hero',
      icon: Layers,
    },
    {
      title: 'سجل المشاريع الميدانية',
      desc: 'إضافة وتعديل المشاريع والأقطار والأطوال',
      href: '/admin/projects',
      icon: FolderGit2,
      count: `${projects.length} مشاريع`,
    },
    {
      title: 'الأنشطة والخدمات',
      desc: 'إدارة وتعديل خدمات السجل التجاري المعتمدة',
      href: '/admin/services',
      icon: Briefcase,
    },
    {
      title: 'الشركاء والعملاء',
      desc: 'إضافة شعارات وأسماء الجهات والشركاء',
      href: '/admin/clients',
      icon: Building2,
    },
    {
      title: 'الهوية والشعار والألوان',
      desc: 'تعديل الشعار وحجمه ولوحة ألوان الموقع',
      href: '/admin/branding',
      icon: Palette,
    },
    {
      title: 'وسائل الاتصال والسوشيال',
      desc: 'رقم الهاتف، الواتساب، العنوان، والسجلات',
      href: '/admin/contact',
      icon: Phone,
    },
    {
      title: 'نصوص ومحتوى الموقع',
      desc: 'عن الشركة، الرؤية والرسالة، والقيم',
      href: '/admin/content',
      icon: FileText,
    },
    {
      title: 'الأمان وكلمة المرور',
      desc: 'تعديل البريد وكلمة مرور لوحة التحكم',
      href: '/admin/profile',
      icon: KeyRound,
    },
  ];

  return (
    <div className="space-y-8 font-technical">
      {/* Welcome Banner (Light Executive Theme) */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0f382a] via-[#164e3b] to-[#1e5d48] text-white border border-[#0f382a] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-[#dfbe76] text-xs font-bold border border-white/20 backdrop-blur-xs">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>نظام الإدارة المركزي المتكامل • AACC Enterprise CMS</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white pt-1 tracking-tight">
            مرحباً بك في لوحة تحكم شركة العاج الفضي للمقاولات
          </h1>
          <p className="text-xs sm:text-sm text-slate-200">
            تحكم كامل وسهل في كافة محتويات، صور، مشاريع، خدمات، وهيكل الموقع الرسمي
          </p>
        </div>

        <Link
          href="/"
          target="_blank"
          className="px-5 py-2.5 bg-white hover:bg-slate-100 text-[#0f382a] text-xs font-bold rounded-xl border border-white/20 flex items-center gap-2 transition-all shadow-sm shrink-0 active:scale-95"
        >
          <span>معاينة الموقع المباشر</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#0f382a]" />
        </Link>
      </div>

      {/* 8 Feature Action Cards */}
      <div>
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <span>أقسام وإمكانيات لوحة التحكم (Control Capabilities)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Link
                key={idx}
                href={card.href}
                className="p-5 bg-white border border-slate-200 hover:border-[#0f382a] rounded-2xl transition-all space-y-3 group hover:shadow-md hover:-translate-y-0.5 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 group-hover:border-[#0f382a]/30 group-hover:bg-emerald-50 transition-colors">
                      <Icon className="w-5 h-5 text-[#0f382a] group-hover:scale-110 transition-transform" />
                    </div>
                    {card.count && (
                      <span className="text-[10px] font-technical bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full text-slate-700 font-bold">
                        {card.count}
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#0f382a] transition-colors">
                    {card.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#0f382a] font-bold">
                  <span>إدارة القسم</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent RFQ Messages Table */}
      <div className="border border-slate-200 bg-white rounded-2xl overflow-hidden space-y-4 p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
              <Inbox className="w-4 h-4 text-[#0f382a]" />
              <span>أحدث طلبات عروض الأسعار والمناقصات (Recent RFQs)</span>
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              الواردة مباشرة من نموذج التقديم التفاعلي بالموقع
            </p>
          </div>
          <Link
            href="/admin/messages"
            className="text-xs text-[#0f382a] hover:underline flex items-center gap-1 font-bold"
          >
            <span>عرض كل الطلبات ({messages.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {messages.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-xs">
            لا توجد طلبات واردة حالياً.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs font-technical">
              <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider text-[11px] border-b border-slate-200">
                <tr>
                  <th className="p-3.5 text-start font-bold">رقم المرجع (Ref)</th>
                  <th className="p-3.5 text-start font-bold">اسم العميل / الشركة</th>
                  <th className="p-3.5 text-start font-bold">الخدمة المطلوبة</th>
                  <th className="p-3.5 text-start font-bold">التاريخ</th>
                  <th className="p-3.5 text-center font-bold">الحالة</th>
                  <th className="p-3.5 text-end font-bold">إجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800 text-xs">
                {messages.slice(0, 5).map((msg, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-bold text-[#0f382a]">{msg.referenceNo}</td>
                    <td className="p-3.5">
                      <strong className="text-slate-900 block font-bold">{msg.name}</strong>
                      <span className="text-[10px] text-slate-500 font-medium">{msg.company}</span>
                    </td>
                    <td className="p-3.5 text-slate-700 max-w-xs truncate">{msg.subject}</td>
                    <td className="p-3.5 text-slate-500 text-[11px]">
                      {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString('ar-SA') : 'الآن'}
                    </td>
                    <td className="p-3.5 text-center">
                      <span
                        className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full ${
                          msg.status === 'new'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : msg.status === 'quoted'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}
                      >
                        {msg.status === 'new'
                          ? 'جديد'
                          : msg.status === 'reviewing'
                          ? 'قيد الدراسة'
                          : msg.status === 'quoted'
                          ? 'تم التسعير'
                          : 'مؤرشف'}
                      </span>
                    </td>
                    <td className="p-3.5 text-end">
                      <Link
                        href="/admin/messages"
                        className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg inline-flex items-center gap-1 font-bold transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span className="text-[11px]">معاينة</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
