'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Layers,
  FolderGit2,
  Briefcase,
  Building2,
  Palette,
  Phone,
  FileText,
  Truck,
  Award,
  Inbox,
  KeyRound,
  ExternalLink,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<{ username: string; email?: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);

  // Skip auth layout on login page
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    async function checkAuth() {
      try {
        const res = await fetch('/api/admin/auth/me');
        const data = await res.json();
        if (data.success) {
          setUser(data.user);
        } else {
          router.push('/admin/login');
        }
      } catch (err) {
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [isLoginPage, router]);

  const handleLogout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-[#0f382a] font-technical">
        <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-5 h-5 border-2 border-[#0f382a] border-t-transparent rounded-full animate-spin"></div>
          <span className="font-bold text-slate-700">جاري تحميل لوحة تحكم شركة العاج الفضي...</span>
        </div>
      </div>
    );
  }

  const navItems = [
    { label: 'نظرة عامة (Overview)', href: '/admin', icon: LayoutDashboard },
    { label: 'سلايدر وخلفيات الرئيسية (Hero)', href: '/admin/hero', icon: Layers },
    { label: 'سجل المشاريع (Projects)', href: '/admin/projects', icon: FolderGit2 },
    { label: 'الأنشطة والخدمات (Services)', href: '/admin/services', icon: Briefcase },
    { label: 'الشركاء والعملاء (Clients)', href: '/admin/clients', icon: Building2 },
    { label: 'الهوية والشعار والألوان (Branding)', href: '/admin/branding', icon: Palette },
    { label: 'بيانات الاتصال والسوشيال (Contact)', href: '/admin/contact', icon: Phone },
    { label: 'محتوى ونصوص الموقع (Content)', href: '/admin/content', icon: FileText },
    { label: 'الأسطول والمعدات (Equipment)', href: '/admin/equipment', icon: Truck },
    { label: 'شهادات الجودة (Certifications)', href: '/admin/certifications', icon: Award },
    { label: 'طلبات الأسعار والرسائل (RFQs)', href: '/admin/messages', icon: Inbox },
    { label: 'الأمان وكلمة المرور (Security)', href: '/admin/profile', icon: KeyRound },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900 font-technical selection:bg-[#0f382a]/15 selection:text-[#0f382a]">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar (Light Theme) */}
      <aside
        className={`fixed lg:sticky top-0 start-0 h-screen w-72 bg-white border-e border-slate-200/90 z-50 flex flex-col justify-between transition-transform duration-300 shadow-sm ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 rtl:translate-x-full rtl:lg:translate-x-0'
        }`}
      >
        <div className="overflow-y-auto flex-1">
          {/* Logo Bar */}
          <div className="h-20 flex items-center justify-between px-6 border-b border-slate-200 sticky top-0 bg-white z-10">
            <Link href="/admin" className="flex items-center gap-3 group">
              <div className="p-1.5 bg-slate-50 rounded-xl border border-slate-200 group-hover:border-[#0f382a] flex items-center justify-center shadow-xs transition-colors">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/logo/aacc_logo_transparent.png"
                  alt="AACC Official Logo"
                  className="h-9 max-h-9 w-auto max-w-[120px] object-contain"
                  style={{ maxHeight: '36px', width: 'auto' }}
                />
              </div>
              <div>
                <span className="font-extrabold text-sm tracking-wide text-slate-900 block group-hover:text-[#0f382a] transition-colors">
                  العاج الفضي
                </span>
                <span className="text-[10px] text-[#937338] font-bold block font-mono">
                  لوحة التحكم الإدارية
                </span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav List */}
          <nav className="p-3 space-y-1 text-xs font-semibold">
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-[#0f382a] text-white font-bold shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#c5a869]' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info & Footer Actions */}
        <div className="p-4 border-t border-slate-200 space-y-3 bg-slate-50/70">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 text-xs font-bold rounded-xl border border-slate-200 transition-colors shadow-2xs"
          >
            <span>زيارة الموقع المباشر</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#0f382a]" />
          </Link>

          <div className="flex items-center justify-between pt-1">
            <Link
              href="/admin/profile"
              className="flex items-center gap-2.5 group hover:opacity-90 transition-opacity"
            >
              <div className="w-8 h-8 rounded-full bg-[#0f382a] text-white flex items-center justify-center text-xs font-bold uppercase shadow-2xs">
                {user?.username?.[0] || 'A'}
              </div>
              <div className="text-start">
                <span className="text-xs font-bold text-slate-900 block truncate max-w-[110px] group-hover:text-[#0f382a]">
                  {user?.username || 'Admin'}
                </span>
                <span className="text-[9px] text-emerald-700 font-bold uppercase block">
                  {user?.role || 'Superadmin'}
                </span>
              </div>
            </Link>

            <button
              onClick={handleLogout}
              title="تسجيل الخروج"
              className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-wide">
              {navItems.find((i) => i.href === pathname)?.label || 'لوحة التحكم'}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-bold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              Live Sync Active
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto bg-slate-50">{children}</main>
      </div>
    </div>
  );
}
