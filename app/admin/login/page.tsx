'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (data.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.message || 'اسم المستخدم أو كلمة المرور غير صحيحة');
      }
    } catch (err: any) {
      setError('تعذر الاتصال بالخادم، يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4 text-slate-900 font-technical">
      <div className="max-w-md w-full border border-slate-200/90 bg-white p-8 rounded-2xl shadow-xl space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex p-3 bg-slate-50 border border-slate-200 rounded-2xl shadow-xs mb-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo/aacc_logo_transparent.png"
              alt="شركة العاج الفضي للمقاولات"
              className="h-16 max-h-16 w-auto max-w-[200px] object-contain"
              style={{ maxHeight: '64px', width: 'auto' }}
            />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            شركة العاج الفضي للمقاولات
          </h1>
          <p className="text-xs text-[#937338] font-bold font-mono">
            AACC HDD-MT Enterprise Admin Portal
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-technical">
          <div>
            <label className="block text-slate-700 font-bold mb-1.5">
              اسم المستخدم / البريد الإلكتروني
            </label>
            <div className="relative">
              <input
                required
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 ps-9 text-slate-900 focus:ring-1 focus:ring-[#0f382a] focus:border-[#0f382a] text-xs transition-colors"
              />
              <User className="w-4 h-4 text-slate-400 absolute start-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1.5">
              كلمة المرور
            </label>
            <div className="relative">
              <input
                required
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 ps-9 text-slate-900 focus:ring-1 focus:ring-[#0f382a] focus:border-[#0f382a] text-xs transition-colors"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute start-3 top-3" />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#0f382a] hover:bg-[#164e3b] text-slate-900 font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 shadow-sm"
            >
              <span>{loading ? 'جاري التحقق...' : 'تسجيل الدخول إلى لوحة التحكم'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="border-t border-slate-100 pt-4 text-center text-[11px] text-slate-500 font-technical">
          AACC HDD-MT • Kingdom of Saudi Arabia • Secure Protected Area
        </div>
      </div>
    </div>
  );
}
