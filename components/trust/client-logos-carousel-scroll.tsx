'use client';

import {useRef, useCallback, type ReactNode, type MouseEvent} from 'react';

type Props = {
  children: ReactNode;
};

function ArrowIcon({direction}: {direction: 'start' | 'end'}) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" style={direction === 'start' ? {transform: 'scaleX(-1)'} : undefined}>
      <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ClientLogosCarouselScroll({children}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);

  const scroll = useCallback((direction: 'start' | 'end') => {
    const el = scrollRef.current;
    if (!el) return;
    const isRtl = getComputedStyle(el).direction === 'rtl';
    const amount = 320;
    const sign = (direction === 'end') !== isRtl ? 1 : -1;
    el.scrollBy({left: amount * sign, behavior: 'smooth'});
  }, []);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    el.style.cursor = 'grabbing';
    startX.current = e.pageX - el.offsetLeft;
    scrollLeftPos.current = el.scrollLeft;
  }, []);

  const handleMouseUp = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = false;
    el.style.cursor = '';
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const el = scrollRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    el.scrollLeft = scrollLeftPos.current - walk;
  }, []);

  return (
    <div className="client-logos-carousel__wrapper">
      <button
        type="button"
        className="client-logos-carousel__arrow client-logos-carousel__arrow--start"
        onClick={() => scroll('start')}
        aria-label="Scroll left"
      >
        <ArrowIcon direction="start" />
      </button>

      <div
        ref={scrollRef}
        className="client-logos-carousel__track"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {children}
      </div>

      <button
        type="button"
        className="client-logos-carousel__arrow client-logos-carousel__arrow--end"
        onClick={() => scroll('end')}
        aria-label="Scroll right"
      >
        <ArrowIcon direction="end" />
      </button>
    </div>
  );
}
