import type {ReactNode} from 'react';

interface RevealSectionProps {
  children: ReactNode;
  /** HTML tag to render */
  as?: 'section' | 'div';
  /** Additional className */
  className?: string;
}

// Server component: a plain block wrapper. The previous client implementation
// used an IntersectionObserver + hydration to toggle `.scroll-reveal` classes,
// but those classes have no CSS (the reveal animation was removed), so the JS
// produced no visual effect — only main-thread cost on every wrapped section.
// Rendering on the server keeps the identical DOM wrapper with zero hydration.
export function RevealSection({
  children,
  as: Tag = 'div',
  className = '',
}: RevealSectionProps) {
  return <Tag className={className || undefined}>{children}</Tag>;
}
