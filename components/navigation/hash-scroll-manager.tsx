'use client';

import {useEffect} from 'react';
import {usePathname} from 'next/navigation';
import {scrollToHashTarget} from './hash-anchor-link';

function getHashTarget() {
  if (!window.location.hash || window.location.hash.length <= 1) return null;

  try {
    return decodeURIComponent(window.location.hash.slice(1));
  } catch {
    return window.location.hash.slice(1);
  }
}

function scrollToCurrentHash(behavior: ScrollBehavior = 'auto') {
  const targetId = getHashTarget();
  if (!targetId) return;

  const targetElement = document.getElementById(targetId);
  if (!targetElement) return;

  scrollToHashTarget(targetElement, behavior);
}

export function HashScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    const animationFrame = window.requestAnimationFrame(() => scrollToCurrentHash('auto'));
    const timeout = window.setTimeout(() => scrollToCurrentHash('auto'), 250);

    function handleHashChange() {
      window.requestAnimationFrame(() => scrollToCurrentHash());
    }

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(timeout);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [pathname]);

  return null;
}
