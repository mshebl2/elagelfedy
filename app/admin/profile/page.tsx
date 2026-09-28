'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  KeyRound,
  User,
  Mail,
  Lock,
  Save,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';

export default function AdminProfileSecurityPage() {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    role: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadProfile = async () => {
    try {
      const res = await fetch('/api/admin/auth/profile');
      const data = await res.json();
      if (data.success) {
        setProfile({
          username: data.data.username,
          email: data.data.email,
          role: data.data.role,
        });
      }
    } catch (err) {
      console.error('Error loading profile:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (newPassword && newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'كلمة المرور الجديدة غير متطابقة مع تأكيد كلمة المرور' });
      return;
    }

    if (newPassword && newPassword.length < 6) {
      setMessage({ type: 'error', text: 'يجب أن لا تقل كلمة المرور الجديدة عن 6 خانات' });
      return;
    }

    if (newPassword && !currentPassword) {
      setMessage({ type: 'error', text: 'يرجى إدخال كلمة المرور الحالية لتأكيد التغيير' });
      return;
    }

    setSaving(true);

    try {
      const res = await fetch('/api/admin/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: profile.username,
          email: profile.email,
          currentPassword: currentPassword || undefined,
          newPassword: newPassword || undefined,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ type: 'success', text: data.message || 'تم تحديث البيانات وكلمة المرور بنجاح!' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setMessage(null), 5000);
      } else {
        setMessage({ type: 'error', text: data.message || 'حدث خطأ أثناء التحديث' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'خطأ في الاتصال بالخادم' });
    } finally {
      setSaving(false);
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
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0f382a]/10 text-[#0f382a] text-xs font-bold mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>الأمان وبيانات الدخول</span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 tracking-wide">
          إدارة حساب المشرف وتغيير كلمة المرور (Security & Credentials)
        </h1>
        <p className="text-xs text-slate-500">
          تعديل البريد الإلكتروني الخاص بتسجيل الدخول وتحديث كلمة المرور لحماية لوحة التحكم
        </p>
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

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {/* Account Info */}
        <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3">
            <User className="w-4 h-4 text-[#0f382a]" />
            <span>بيانات المشرف الأساسية (Account Information)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-600 font-semibold mb-1">
                اسم المستخدم (Username) *
              </label>
              <div className="relative">
                <input
                  required
                  type="text"
                  value={profile.username}
                  onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 ps-9 text-slate-900"
                />
                <User className="w-4 h-4 text-slate-400 absolute start-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">
                البريد الإلكتروني لتسجيل الدخول (Email Address) *
              </label>
              <div className="relative">
                <input
                  required
                  type="email"
                  dir="ltr"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 ps-9 text-slate-900"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute start-3 top-2.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Password Change Section */}
        <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3">
            <KeyRound className="w-4 h-4 text-[#0f382a]" />
            <span>تغيير كلمة المرور (Change Password)</span>
          </h3>

          <p className="text-slate-500 text-[11px]">
            * اترك حقول كلمة المرور فارغة إذا كنت تريد فقط تعديل اسم المستخدم أو البريد الإلكتروني.
          </p>

          <div className="space-y-4 max-w-lg">
            {/* Current Password */}
            <div>
              <label className="block text-slate-600 font-semibold mb-1">
                كلمة المرور الحالية (Current Password)
              </label>
              <div className="relative">
                <input
                  type={showCurrentPass ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="أدخل كلمة المرور الحالية للتأكيد..."
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 ps-9 pe-10 text-slate-900"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute start-3 top-2.5" />
                <button
                  type="button"
                  onClick={() => setShowCurrentPass(!showCurrentPass)}
                  className="absolute end-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  كلمة المرور الجديدة (New Password)
                </label>
                <div className="relative">
                  <input
                    type={showNewPass ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 ps-9 pe-10 text-slate-900"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute start-3 top-2.5" />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute end-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  تأكيد كلمة المرور الجديدة
                </label>
                <div className="relative">
                  <input
                    type={showNewPass ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 ps-9 text-slate-900"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute start-3 top-2.5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-[#0f382a] hover:bg-[#164e3b] text-white shadow-xs font-bold text-xs rounded flex items-center gap-2 shadow-xl hover:brightness-110 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'جاري الحفظ والتأمين...' : 'حفظ بيانات الحساب والأمان'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
