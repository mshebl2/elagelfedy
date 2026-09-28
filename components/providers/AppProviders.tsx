'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Language, Theme } from '@/types';

interface LightboxState {
  isOpen: boolean;
  src: string;
  title: string;
}

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  selectedServiceForRfq: string;
  setSelectedServiceForRfq: (service: string) => void;
  lightbox: LightboxState;
  openLightbox: (src: string, title?: string) => void;
  closeLightbox: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProviders({
  children,
  initialLang = 'ar',
}: {
  children: React.ReactNode;
  initialLang?: Language;
}) {
  const [lang, setLangState] = useState<Language>(initialLang);
  const [theme, setThemeState] = useState<Theme>('light');
  const [selectedServiceForRfq, setSelectedServiceForRfq] = useState<string>('');
  const [lightbox, setLightbox] = useState<LightboxState>({
    isOpen: false,
    src: '',
    title: '',
  });

  const applyThemeToDom = useCallback((targetTheme: Theme) => {
    if (typeof window === 'undefined') return;
    const root = document.documentElement;
    const body = document.body;

    if (targetTheme === 'dark') {
      root.classList.add('dark');
      body.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
    }
  }, []);

  useEffect(() => {
    // Check localStorage or document class
    const savedTheme = localStorage.getItem('aacc_theme') as Theme | null;
    const initial = savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : 'light';
    setThemeState(initial);
    applyThemeToDom(initial);

    const savedLang = localStorage.getItem('aacc_lang') as Language | null;
    if (savedLang === 'ar' || savedLang === 'en') {
      setLangState(savedLang);
    }
  }, [applyThemeToDom]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('aacc_lang', newLang);
      document.documentElement.lang = newLang;
      document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    applyThemeToDom(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('aacc_theme', newTheme);
    }
  };

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }
  }, [lang]);

  const openLightbox = (src: string, title: string = '') => {
    setLightbox({
      isOpen: true,
      src,
      title,
    });
  };

  const closeLightbox = () => {
    setLightbox({
      isOpen: false,
      src: '',
      title: '',
    });
  };

  // Universal Click Listener: Makes any content image on the site clickable to enlarge
  useEffect(() => {
    const handleGlobalImageClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Check if clicked element is an image or inside an image wrapper
      const img = target.tagName === 'IMG' ? (target as HTMLImageElement) : target.closest('img');
      if (img && img.src) {
        // Skip if clicking inside the open lightbox modal or small UI elements/avatars/admin icons
        if (img.closest('[role="dialog"]') || img.classList.contains('no-zoom') || img.src.includes('data:image')) {
          return;
        }

        // Check if inside a presentation container, card, or has image class
        const isContentImage =
          img.classList.contains('img-zoom') ||
          img.closest('.group') ||
          img.closest('section') ||
          img.closest('article') ||
          img.closest('main') ||
          img.naturalWidth > 150;

        if (isContentImage) {
          e.preventDefault();
          e.stopPropagation();
          const title = img.alt || img.title || (lang === 'ar' ? 'معاينة الصورة بجودة عالية' : 'High-Resolution Inspection');
          openLightbox(img.src, title);
        }
      }
    };

    document.addEventListener('click', handleGlobalImageClick, true);
    return () => document.removeEventListener('click', handleGlobalImageClick, true);
  }, [lang]);

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        theme,
        setTheme,
        toggleTheme,
        selectedServiceForRfq,
        setSelectedServiceForRfq,
        lightbox,
        openLightbox,
        closeLightbox,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProviders');
  }
  return context;
}
