'use client';

import type {AnchorHTMLAttributes, MouseEvent, ReactNode} from 'react';
import {Link} from '@/i18n/routing';
import {
  getProjectFilterHref,
  getProjectFilterHash,
  projectFilterScrollStorageKey,
  type ProjectFilterKey
} from '@/lib/projects/project-filters';

type ProjectFilterLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  children: ReactNode;
  filter: ProjectFilterKey;
};

function normalizePathname(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }

  return pathname;
}

function isModifiedClick(event: MouseEvent<HTMLAnchorElement>) {
  return event.button !== 0 || event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;
}

function getScrollBehavior(): ScrollBehavior {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}

function scrollProjectsPageToTop() {
  window.requestAnimationFrame(() => {
    window.scrollTo({
      top: 0,
      behavior: getScrollBehavior()
    });
  });
}

function requestPostNavigationScroll() {
  try {
    window.sessionStorage.setItem(projectFilterScrollStorageKey, '1');
  } catch {
    // Session storage may be unavailable in hardened browser contexts.
  }
}

export function ProjectFilterLink({children, filter, onClick, target, ...props}: ProjectFilterLinkProps) {
  const href = getProjectFilterHref(filter);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      isModifiedClick(event) ||
      (target && target !== '_self')
    ) {
      return;
    }

    const rawHref = event.currentTarget.getAttribute('href') ?? href;
    const destination = new URL(rawHref, window.location.href);
    const current = new URL(window.location.href);

    if (
      destination.origin !== current.origin ||
      normalizePathname(destination.pathname) !== normalizePathname(current.pathname)
    ) {
      if (destination.origin === current.origin) {
        requestPostNavigationScroll();
      }

      return;
    }

    event.preventDefault();

    const oldUrl = window.location.href;
    const nextPath = `${destination.pathname}${destination.search}${getProjectFilterHash(filter)}`;
    const nextUrl = new URL(nextPath, window.location.href);

    if (nextUrl.href === oldUrl) {
      window.history.replaceState(window.history.state, '', nextPath);
    } else {
      window.history.pushState(window.history.state, '', nextPath);
    }

    window.dispatchEvent(new HashChangeEvent('hashchange', {oldURL: oldUrl, newURL: nextUrl.href}));
    scrollProjectsPageToTop();
  }

  return (
    <Link href={href} target={target} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
