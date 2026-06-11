'use client';

import {useEffect, useRef, useState} from 'react';

interface UseScrollRevealOptions {
  /** IntersectionObserver rootMargin */
  rootMargin?: string;
  /** IntersectionObserver threshold */
  threshold?: number;
}

export function useScrollReveal({
  rootMargin = '0px 0px -10% 0px',
  threshold = 0.1,
}: UseScrollRevealOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Step 1: mark as mounted so the hidden class renders
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    setMounted(true);
  }, []);

  // Step 2: after hidden state has painted, start observing
  useEffect(() => {
    if (!mounted) return;
    const el = ref.current;
    if (!el) return;

    // Wait one frame so opacity:0 is painted before observer can fire
    const raf = requestAnimationFrame(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(el);
          }
        },
        {rootMargin, threshold}
      );

      observer.observe(el);
      observerRef.current = observer;
    });

    return () => {
      cancelAnimationFrame(raf);
      observerRef.current?.disconnect();
    };
  }, [mounted, rootMargin, threshold]);

  return {ref, mounted, isVisible};
}
