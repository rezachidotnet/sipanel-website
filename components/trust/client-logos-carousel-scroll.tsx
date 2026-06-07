'use client';

import {useRef, useCallback, type ReactNode, type MouseEvent} from 'react';

type Props = {
  children: ReactNode;
};

export function ClientLogosCarouselScroll({children}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    el.style.cursor = 'grabbing';
    startX.current = e.pageX - el.offsetLeft;
    scrollLeft.current = el.scrollLeft;
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
    el.scrollLeft = scrollLeft.current - walk;
  }, []);

  return (
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
  );
}
