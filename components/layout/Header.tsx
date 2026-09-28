'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/components/providers/AppProviders';
import { getDictionary } from '@/lib/i18n';
import { Moon, Sun, ArrowRight, ArrowLeft, Menu, Globe, Sparkles } from 'lucide-react';
import MobileMenu from './MobileMenu';

export default function Header() {
  const { lang, setLang, theme, toggleTheme } = useApp();
  const dict = getDictionary(lang);
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLang(lang === 'ar' ? 'en' : 'ar');
  };

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
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#0c0e10]/95 backdrop-blur-md border-b border-slate-200/90 dark:border-[#2a313a]/90 shadow-xs transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-3">
            {/* Brand Logo & Identity */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0 group py-1">
              <div className="relative flex items-center justify-center max-h-12 sm:max-h-16 overflow-hidden">
                {/* Light Mode Official Logo */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/logo/aacc_logo_transparent.png"
                  alt="شركة العاج الفضي للمقاولات - AACC"
                  className="h-10 sm:h-12 md:h-14 max-h-14 w-auto max-w-[160px] sm:max-w-[220px] object-contain dark:hidden transition-transform duration-200 group-hover:scale-105"
                  style={{ height: 'auto', maxHeight: '56px' }}
                />
                {/* Dark Mode Official Logo */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/logo/aacc_logo_gold.png"
                  alt="شركة العاج الفضي للمقاولات - AACC"
                  className="h-10 sm:h-12 md:h-14 max-h-14 w-auto max-w-[160px] sm:max-w-[220px] object-contain hidden dark:block transition-transform duration-200 group-hover:scale-105 drop-shadow-[0_0_10px_rgba(197,168,105,0.25)]"
                  style={{ height: 'auto', maxHeight: '56px' }}
                />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 2xl:gap-2 text-xs font-technical font-semibold text-slate-600 dark:text-zinc-300">
              {navLinks.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={idx}
                    href={link.href}
                    className={`relative px-2.5 py-1.5 rounded-lg transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? 'text-[#0f382a] dark:text-[#c5a869] font-bold bg-slate-100 dark:bg-[#161b20]'
                        : 'hover:text-[#0f382a] dark:hover:text-[#c5a869] hover:bg-slate-50 dark:hover:bg-[#13171b]'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 start-2 end-2 h-0.5 bg-[#0f382a] dark:bg-[#c5a869] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Side Controls & Call to Action */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Language Switcher */}
              <button
                type="button"
                onClick={toggleLanguage}
                title="Switch Language / تغيير اللغة"
                className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1.5 text-[11px] sm:text-xs font-technical font-bold text-slate-700 dark:text-zinc-200 bg-slate-100 hover:bg-slate-200 dark:bg-[#13171b] dark:hover:bg-[#20262d] rounded-lg border border-slate-200 dark:border-[#2a313a] transition-all whitespace-nowrap shadow-2xs cursor-pointer active:scale-95"
              >
                <Globe className="w-3.5 h-3.5 text-[#937338] dark:text-[#c5a869]" />
                <span className="hidden xs:inline">{dict.brand.switchLang}</span>
                <span className="xs:hidden uppercase">{lang === 'ar' ? 'EN' : 'AR'}</span>
              </button>

              {/* Theme Switcher Button */}
              <button
                type="button"
                onClick={toggleTheme}
                title={theme === 'light' ? dict.brand.switchThemeDark : dict.brand.switchThemeLight}
                className="inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 text-slate-700 dark:text-amber-200 bg-slate-100 hover:bg-slate-200 dark:bg-[#13171b] dark:hover:bg-[#20262d] rounded-lg border border-slate-200 dark:border-[#2a313a] transition-all whitespace-nowrap shadow-2xs cursor-pointer active:scale-95"
              >
                {theme === 'light' ? (
                  <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-700" />
                ) : (
                  <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
                )}
              </button>

              {/* Request RFQ CTA Button */}
              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-technical font-bold text-white dark:text-[#0c0e10] bg-[#0f382a] hover:bg-[#164e3b] dark:bg-[#c5a869] dark:hover:bg-[#d4b97a] transition-all rounded-xl shadow-xs whitespace-nowrap active:scale-95 hover:shadow-md"
              >
                <span>{dict.nav.rfqButton}</span>
                <ArrowIcon className="w-3.5 h-3.5" />
              </Link>

              {/* Mobile / Tablet Hamburger Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-1.5 sm:p-2 text-slate-700 dark:text-[#c5a869] hover:text-[#0f382a] dark:hover:text-white rounded-lg border border-slate-200 dark:border-[#2a313a] bg-slate-50 dark:bg-[#13171b] cursor-pointer"
                aria-label="Toggle navigation"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile / Tablet Navigation Drawer */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
