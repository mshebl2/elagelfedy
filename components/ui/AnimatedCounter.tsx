'use client';

import React, { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  separator?: string;
}

export function AnimatedCounter({
  end,
  duration = 2200,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
  separator = ',',
}: AnimatedCounterProps) {
  const [count, setCount] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const hasAnimated = useRef<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const currentElem = elementRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) {
        observer.unobserve(currentElem);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    // Smooth easeOutExpo for premium physics feeling
    const easeOutExpo = (x: number): number => {
      return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    };

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutExpo(progress);
      
      const currentVal = easedProgress * end;
      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isVisible, end, duration]);

  const formatNumber = (num: number): string => {
    const fixed = num.toFixed(decimals);
    const parts = fixed.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return parts.join('.');
  };

  return (
    <span ref={elementRef} className={`inline-block tabular-nums transition-transform ${className}`}>
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  );
}

interface StatCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  unit?: string;
  unitHighlight?: string;
  subtitle: string;
  icon?: React.ReactNode;
  isPrimary?: boolean;
  tag?: string;
}

export function StatCard({
  title,
  value,
  prefix = '',
  suffix = '',
  unit = '',
  unitHighlight = '',
  subtitle,
  icon,
  isPrimary = false,
  tag,
}: StatCardProps) {
  return (
    <div
      className={`group relative p-5 rounded-2xl transition-all duration-300 transform hover:-translate-y-1.5 overflow-hidden backdrop-blur-sm ${
        isPrimary
          ? 'bg-gradient-to-br from-white via-[#fcfaf7] to-amber-50/40 dark:from-[#15191e] dark:via-[#13171b] dark:to-[#1a1710] border-2 border-[#937338]/40 dark:border-[#c5a869]/50 shadow-md hover:shadow-xl hover:border-[#937338] dark:hover:border-[#c5a869]'
          : 'bg-white dark:bg-[#12161a] border border-slate-200/90 dark:border-[#2a313a] shadow-sm hover:shadow-lg hover:border-[#0f382a]/30 dark:hover:border-[#c5a869]/40'
      }`}
    >
      {/* Top Corner Ambient Glow */}
      <div
        className={`absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl pointer-events-none transition-opacity duration-500 opacity-20 group-hover:opacity-60 ${
          isPrimary
            ? 'bg-gradient-to-br from-[#c5a869] to-[#937338]'
            : 'bg-gradient-to-br from-[#0f382a] to-emerald-500 dark:from-[#c5a869] dark:to-amber-500'
        }`}
      />

      {/* Header Info & Icon */}
      <div className="flex items-start justify-between gap-2 mb-3 relative z-10">
        <span className="text-[11px] font-technical uppercase tracking-wider text-slate-500 dark:text-zinc-400 font-bold leading-tight line-clamp-1">
          {title}
        </span>
        {icon && (
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${
              isPrimary
                ? 'bg-[#937338]/15 dark:bg-[#c5a869]/20 text-[#937338] dark:text-[#c5a869]'
                : 'bg-slate-100 dark:bg-[#1c2229] text-slate-600 dark:text-zinc-300 group-hover:text-[#0f382a] dark:group-hover:text-[#c5a869]'
            }`}
          >
            {icon}
          </div>
        )}
      </div>

      {/* Main Animated Number */}
      <div
        className={`text-2xl sm:text-3xl font-extrabold font-technical tracking-tight flex items-baseline gap-1.5 relative z-10 ${
          isPrimary
            ? 'text-[#0f382a] dark:text-[#c5a869]'
            : 'text-slate-900 dark:text-white'
        }`}
        dir="ltr"
      >
        <AnimatedCounter
          end={value}
          prefix={prefix}
          suffix={suffix}
          className="transition-all duration-300 group-hover:drop-shadow-sm"
        />
        {unit && (
          <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400">
            {unit}
          </span>
        )}
        {unitHighlight && (
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 animate-pulse">
            {unitHighlight}
          </span>
        )}
      </div>

      {/* Subtitle / Verification Tag */}
      <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-[#222830] flex items-center justify-between text-[10px] font-technical relative z-10">
        <span
          className={`font-medium line-clamp-1 ${
            isPrimary
              ? 'text-emerald-700 dark:text-emerald-400 font-bold'
              : 'text-slate-500 dark:text-zinc-400'
          }`}
        >
          {subtitle}
        </span>
        {tag && (
          <span className="shrink-0 px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-100 dark:bg-[#181d22] text-slate-600 dark:text-zinc-400">
            {tag}
          </span>
        )}
      </div>

      {/* Bottom accent glow bar */}
      <div
        className={`absolute bottom-0 inset-x-0 h-[2px] transition-all duration-300 scale-x-0 group-hover:scale-x-100 ${
          isPrimary
            ? 'bg-gradient-to-r from-transparent via-[#c5a869] to-transparent'
            : 'bg-gradient-to-r from-transparent via-[#0f382a] dark:via-[#c5a869] to-transparent'
        }`}
      />
    </div>
  );
}
