'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useApp } from '@/components/providers/AppProviders';
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Maximize,
  Minimize,
  Download,
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Eye
} from 'lucide-react';

export default function LightboxModal() {
  const { lightbox, closeLightbox, lang } = useApp();
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset transform state whenever a new image opens
  useEffect(() => {
    if (lightbox.isOpen) {
      setScale(1);
      setRotation(0);
      setPosition({ x: 0, y: 0 });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [lightbox.isOpen, lightbox.src]);

  // Zoom Helpers
  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.35, 4));
  };

  const handleZoomOut = () => {
    setScale((prev) => {
      const next = Math.max(prev - 0.35, 0.6);
      if (next <= 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleReset = () => {
    setScale(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handleDownload = () => {
    if (!lightbox.src) return;
    const a = document.createElement('a');
    a.href = lightbox.src;
    a.download = `AACC-${(lightbox.title || 'image').replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, '_')}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Keyboard controls
  useEffect(() => {
    if (!lightbox.isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === '+' || e.key === '=') {
        handleZoomIn();
      } else if (e.key === '-' || e.key === '_') {
        handleZoomOut();
      } else if (e.key === '0') {
        handleReset();
      } else if (e.key === 'r' || e.key === 'R') {
        handleRotate();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox.isOpen, closeLightbox]);

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  // Drag to pan when zoomed
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch drag for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && scale > 1 && e.touches.length === 1) {
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    }
  };

  // Double click / tap to zoom toggle
  const handleDoubleClick = () => {
    if (scale > 1) {
      handleReset();
    } else {
      setScale(2);
    }
  };

  if (!lightbox.isOpen || !lightbox.src) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex flex-col justify-between select-none animate-fadeIn transition-all duration-300"
      onClick={closeLightbox}
      onWheel={handleWheel}
    >
      {/* Top Bar (Header & Actions) */}
      <div
        className="w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 py-3.5 flex items-center justify-between z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2.5 max-w-[65%] sm:max-w-[75%]">
          <div className="p-1.5 rounded-lg bg-[#0f382a]/80 text-[#c5a869] border border-[#c5a869]/30 shrink-0">
            <Eye className="w-4 h-4" />
          </div>
          <div className="truncate">
            <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide truncate">
              {lightbox.title || (lang === 'ar' ? 'معاينة الصورة عالية الدقة' : 'High-Resolution Inspection')}
            </h3>
            <span className="text-[10px] text-zinc-400 font-technical flex items-center gap-1.5">
              <span>AACC HDD-MT Heavy Infrastructure</span>
              <span>•</span>
              <span className="text-[#c5a869] font-bold">{Math.round(scale * 100)}%</span>
            </span>
          </div>
        </div>

        {/* Top Right Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Download Button */}
          <button
            type="button"
            onClick={handleDownload}
            title={lang === 'ar' ? 'تحميل الصورة الأصلية' : 'Download Original Image'}
            className="p-2 text-zinc-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Fullscreen Button */}
          <button
            type="button"
            onClick={toggleFullscreen}
            title={lang === 'ar' ? 'ملء الشاشة' : 'Toggle Fullscreen'}
            className="hidden sm:inline-flex p-2 text-zinc-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>

          {/* Close Button */}
          <button
            type="button"
            onClick={closeLightbox}
            title={lang === 'ar' ? 'إغلاق (Esc)' : 'Close (Esc)'}
            className="p-2 text-zinc-300 hover:text-red-400 bg-slate-900/90 hover:bg-red-950/60 border border-slate-700/80 hover:border-red-800/80 rounded-xl transition-all cursor-pointer shadow-xs active:scale-95 ms-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Stage (Draggable & Zoomable) */}
      <div
        ref={containerRef}
        className="flex-1 relative flex items-center justify-center overflow-hidden p-4 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        onClick={(e) => {
          if (e.target === containerRef.current) closeLightbox();
        }}
      >
        <div
          className="transition-transform duration-100 ease-out will-change-transform flex items-center justify-center"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(${rotation}deg)`,
          }}
          onClick={(e) => e.stopPropagation()}
          onDoubleClick={handleDoubleClick}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imageRef}
            src={lightbox.src}
            alt={lightbox.title || 'Enlarged inspection'}
            className="max-h-[75vh] max-w-[92vw] sm:max-w-[85vw] object-contain rounded-2xl shadow-2xl border border-slate-700/50 bg-[#080d12]"
            draggable={false}
          />
        </div>
      </div>

      {/* Bottom Floating Inspection Control Bar */}
      <div
        className="w-full bg-slate-950/80 backdrop-blur-md border-t border-slate-800/80 py-3 px-4 sm:px-6 flex items-center justify-center gap-2 sm:gap-3 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Zoom Out Button */}
        <button
          type="button"
          onClick={handleZoomOut}
          disabled={scale <= 0.6}
          title={lang === 'ar' ? 'تصغير (-)' : 'Zoom Out (-)'}
          className="p-2.5 text-zinc-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all cursor-pointer disabled:opacity-40 shadow-sm active:scale-95 flex items-center gap-1.5"
        >
          <ZoomOut className="w-4 h-4" />
          <span className="hidden sm:inline text-xs font-technical">تصغير</span>
        </button>

        {/* Zoom Scale Pill / Reset Button */}
        <button
          type="button"
          onClick={handleReset}
          title={lang === 'ar' ? 'إعادة ضبط الحجم (0)' : 'Reset Zoom (0)'}
          className="px-3.5 py-2 text-xs font-technical font-bold text-[#c5a869] bg-slate-900/90 hover:bg-slate-800 border border-[#c5a869]/40 hover:border-[#c5a869] rounded-xl transition-all cursor-pointer shadow-sm active:scale-95"
        >
          <span>{Math.round(scale * 100)}%</span>
          <span className="text-[10px] text-zinc-400 ms-1">(إعادة ضبط)</span>
        </button>

        {/* Zoom In Button */}
        <button
          type="button"
          onClick={handleZoomIn}
          disabled={scale >= 4}
          title={lang === 'ar' ? 'تكبير (+)' : 'Zoom In (+)'}
          className="p-2.5 text-zinc-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all cursor-pointer disabled:opacity-40 shadow-sm active:scale-95 flex items-center gap-1.5"
        >
          <ZoomIn className="w-4 h-4" />
          <span className="hidden sm:inline text-xs font-technical">تكبير</span>
        </button>

        {/* Rotate Button */}
        <button
          type="button"
          onClick={handleRotate}
          title={lang === 'ar' ? 'تدوير الصورة (R)' : 'Rotate Image (R)'}
          className="p-2.5 text-zinc-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all cursor-pointer shadow-sm active:scale-95 flex items-center gap-1.5 ms-1 sm:ms-2"
        >
          <RotateCw className="w-4 h-4" />
          <span className="hidden sm:inline text-xs font-technical">تدوير 90°</span>
        </button>

        <span className="hidden md:inline text-[11px] font-technical text-zinc-400 ms-3">
          💡 {lang === 'ar' ? 'نقر مزدوج للتكبير • اسحب للتحريك • عجلة الماوس للتكبير والتصغير' : 'Double click to zoom • Drag to pan • Scroll wheel to zoom'}
        </span>
      </div>
    </div>
  );
}
