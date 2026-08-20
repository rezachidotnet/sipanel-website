'use client';

import {useCallback, useEffect, useRef, useState, type ReactNode} from 'react';

type Props = {
  previousLabel: string;
  nextLabel: string;
  children: ReactNode;
};

type EdgeState = {
  atStart: boolean;
  atEnd: boolean;
};

function ArrowIcon({direction}: {direction: 'start' | 'end'}) {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true" style={direction === 'start' ? {transform: 'scaleX(-1)'} : undefined}>
      <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * scrollLeft sign/range conventions diverge across browsers in RTL
 * (Chrome/Firefox go 0 -> -max, Safari/older WebKit go max -> 0), so start/end
 * are derived relative to direction rather than compared against raw sign.
 */
function readEdgeState(el: HTMLDivElement): EdgeState {
  const maxScroll = el.scrollWidth - el.clientWidth;
  if (maxScroll <= 1) return {atStart: true, atEnd: true};

  const isRtl = getComputedStyle(el).direction === 'rtl';
  const {scrollLeft} = el;

  if (!isRtl) {
    return {atStart: scrollLeft <= 1, atEnd: scrollLeft >= maxScroll - 1};
  }

  if (scrollLeft <= 0) {
    // Chrome/Firefox-style negative RTL scrollLeft (0 at start, -maxScroll at end)
    return {atStart: scrollLeft >= -1, atEnd: scrollLeft <= -maxScroll + 1};
  }

  // Safari-style positive RTL scrollLeft (maxScroll at start, 0 at end)
  return {atStart: scrollLeft >= maxScroll - 1, atEnd: scrollLeft <= 1};
}

export function SystemsShowcaseCarousel({previousLabel, nextLabel, children}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);
  const [edge, setEdge] = useState<EdgeState>({atStart: true, atEnd: false});

  const updateEdge = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setEdge(readEdgeState(el));
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    updateEdge();

    const handleScroll = () => updateEdge();
    const handleResize = () => updateEdge();

    el.addEventListener('scroll', handleScroll, {passive: true});
    window.addEventListener('resize', handleResize);

    return () => {
      el.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [updateEdge]);

  const stepScroll = useCallback((direction: 'start' | 'end') => {
    const el = trackRef.current;
    if (!el) return;

    const isRtl = getComputedStyle(el).direction === 'rtl';
    const firstCard = el.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(el).columnGap || '0') || 0;
    const step = (firstCard?.getBoundingClientRect().width ?? el.clientWidth * 0.8) + gap;
    const sign = (direction === 'end') !== isRtl ? 1 : -1;

    el.scrollBy({left: step * sign, behavior: 'smooth'});
  }, []);

  const handlePointerDown = useCallback((e: React.MouseEvent) => {
    const el = trackRef.current;
    if (!el) return;
    isDragging.current = true;
    el.style.cursor = 'grabbing';
    startX.current = e.pageX - el.offsetLeft;
    scrollLeftPos.current = el.scrollLeft;
  }, []);

  const handlePointerUp = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    isDragging.current = false;
    el.style.cursor = '';
  }, []);

  const handlePointerMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const el = trackRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    el.scrollLeft = scrollLeftPos.current - walk;
  }, []);

  return (
    <div className="systems-showcase__carousel">
      <button
        type="button"
        className="systems-showcase__arrow systems-showcase__arrow--start"
        onClick={() => stepScroll('start')}
        aria-label={previousLabel}
        disabled={edge.atStart}
      >
        <ArrowIcon direction="start" />
      </button>

      <div
        ref={trackRef}
        className="systems-showcase__track"
        onMouseDown={handlePointerDown}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onMouseMove={handlePointerMove}
      >
        {children}
      </div>

      <button
        type="button"
        className="systems-showcase__arrow systems-showcase__arrow--end"
        onClick={() => stepScroll('end')}
        aria-label={nextLabel}
        disabled={edge.atEnd}
      >
        <ArrowIcon direction="end" />
      </button>
    </div>
  );
}
