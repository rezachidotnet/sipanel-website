'use client';

import {useScrollReveal} from '@/lib/use-scroll-reveal';

interface RevealSectionProps {
  children: React.ReactNode;
  /** HTML tag to render */
  as?: 'section' | 'div';
  /** Additional className */
  className?: string;
  /** Stagger delay in ms for child card animations */
  staggerDelay?: number;
}

export function RevealSection({
  children,
  as: Tag = 'div',
  className = '',
  staggerDelay,
}: RevealSectionProps) {
  const {ref, mounted, isVisible} = useScrollReveal();

  // Before JS hydrates: no scroll-reveal class → content is fully visible.
  // After hydration: scroll-reveal is added (opacity:0), then observer reveals it.
  const revealClass = mounted
    ? `scroll-reveal ${isVisible ? 'scroll-reveal--visible' : ''}`
    : '';

  return (
    <Tag
      ref={ref}
      className={`${revealClass} ${className}`.trim() || undefined}
      style={
        staggerDelay !== undefined
          ? ({'--reveal-stagger': `${staggerDelay}ms`} as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </Tag>
  );
}
