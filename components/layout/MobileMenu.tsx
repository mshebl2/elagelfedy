'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/components/providers/AppProviders';
import { getDictionary } from '@/lib/i18n';
import { X, Moon, Sun, Globe, ArrowLeft, ArrowRight, Phone, MessageSquare } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { lang, setLang, theme, toggleTheme } = useApp();
  const dict = getDictionary(lang);
  const pathname = usePathname();

  // Lock background body scroll when mobile drawer is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navLinks = [
    { label: dict.nav.home, href: '/' },
    { label: dict.nav.about, href: '/about' },
    { label: dict.nav.services, href: '/services' },
    { label: dict.nav.projects, href: '/projects' },
    { label: dict.nav.equipment, href: '/equipment' },
    { label: dict.nav.qualityAndCerts, href: '/certifications' },
    { label: dict.nav.clients, href: '/clients' },
    { label: dict.nav.contact, href: '/contact' },
  ];

  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 inset-x-0 bg-white dark:bg-[#13171b] border-b border-slate-200 dark:border-[#2a313a] px-5 py-5 space-y-4 font-technical text-xs uppercase tracking-wider font-semibold shadow-2xl animate-slide-down max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#2a313a]">
          <div className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo/aacc_logo_transparent.png"
              alt="شركة العاج الفضي للمقاولات"
              className="h-9 max-h-9 w-auto max-w-[120px] object-contain dark:hidden"
              style={{ maxHeight: '36px', width: 'auto' }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo/aacc_logo_gold.png"
              alt="شركة العاج الفضي للمقاولات"
              className="h-9 max-h-9 w-auto max-w-[120px] object-contain hidden dark:block"
              style={{ maxHeight: '36px', width: 'auto' }}
            />
            <span className="text-sm font-extrabold text-slate-900 dark:text-white">
              {lang === 'ar' ? 'العاج الفضي للمقاولات' : 'AACC Contracting'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white rounded hover:bg-slate-100 dark:hover:bg-[#22272d] transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="space-y-1.5">
          {navLinks.map((link, idx) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={idx}
                href={link.href}
                onClick={onClose}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-emerald-50 dark:bg-[#0f382a]/30 text-[#0f382a] dark:text-[#c5a869] font-black border-s-4 border-[#0f382a] dark:border-[#c5a869]'
                    : 'text-slate-700 dark:text-zinc-300 hover:text-[#0f382a] dark:hover:text-[#c5a869] hover:bg-slate-50 dark:hover:bg-[#1a1f26]'
                }`}
              >
                <span>{link.label}</span>
                <ArrowIcon className="w-3.5 h-3.5 opacity-60" />
              </Link>
            );
          })}
        </nav>

        <div className="pt-3 border-t border-slate-200 dark:border-[#2a313a] space-y-2">
          {/* Request RFQ CTA */}
          <Link
            href="/contact"
            onClick={onClose}
            className="w-full py-3 flex items-center justify-center gap-2 text-white dark:text-[#0c0e10] bg-[#0f382a] dark:bg-gradient-to-r dark:from-[#c5a869] dark:via-amber-400 dark:to-[#b89758] rounded-xl font-technical font-extrabold shadow-sm"
          >
            <span>{dict.nav.rfqButton}</span>
            <ArrowIcon className="w-4 h-4" />
          </Link>

          {/* Theme switch in drawer */}
          <button
            type="button"
            onClick={() => {
              toggleTheme();
              onClose();
            }}
            className="w-full py-2.5 flex items-center justify-center gap-2 text-slate-700 dark:text-amber-200 bg-slate-100 dark:bg-[#22272d] rounded-xl font-technical font-bold border border-slate-200 dark:border-[#2a313a] cursor-pointer active:scale-98 transition-transform"
          >
            {theme === 'light' ? (
              <>
                <Moon className="w-4 h-4 text-slate-700" />
                <span>التحويل للوضع الداكن (Dark Mode)</span>
              </>
            ) : (
              <>
                <Sun className="w-4 h-4 text-amber-300" />
                <span>التحويل للوضع الفاتح (Light Mode)</span>
              </>
            )}
          </button>

          {/* Language switch in drawer */}
          <button
            type="button"
            onClick={() => {
              setLang(lang === 'ar' ? 'en' : 'ar');
              onClose();
            }}
            className="w-full py-2.5 flex items-center justify-center gap-2 text-slate-700 dark:text-zinc-200 bg-slate-100 dark:bg-[#22272d] rounded-xl font-technical font-bold border border-slate-200 dark:border-[#2a313a] cursor-pointer active:scale-98 transition-transform"
          >
            <Globe className="w-4 h-4 text-[#937338] dark:text-[#c5a869]" />
            <span>{lang === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}</span>
          </button>

          {/* Direct Mobile Quick Call & WhatsApp Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href="tel:+966509424820"
              className="py-2.5 px-3 flex items-center justify-center gap-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#181d22] dark:hover:bg-[#202730] border border-slate-200 dark:border-[#2a313a] text-slate-800 dark:text-zinc-200 text-[11px] font-bold font-technical"
            >
              <Phone className="w-3.5 h-3.5 text-[#b89758] dark:text-[#c5a869]" />
              <span dir="ltr">0509424820</span>
            </a>
            <a
              href="https://wa.me/966509424820"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 flex items-center justify-center gap-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold font-technical"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>واتساب فوري</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
