'use client';

import type {AnchorHTMLAttributes, MouseEvent} from 'react';
import {Link} from '@/i18n/routing';

type HashAnchorLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

function normalizePathname(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }

  return pathname;
}

function getHashTarget(hash: string) {
  if (!hash.startsWith('#') || hash.length <= 1) return null;

  try {
    return decodeURIComponent(hash.slice(1));
  } catch {
    return hash.slice(1);
  }
}

function isModifiedClick(event: MouseEvent<HTMLAnchorElement>) {
  return event.button !== 0 || event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;
}

export function HashAnchorLink({href, onClick, target, ...props}: HashAnchorLinkProps) {
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
    const targetId = getHashTarget(destination.hash);

    if (
      !targetId ||
      destination.origin !== current.origin ||
      normalizePathname(destination.pathname) !== normalizePathname(current.pathname)
    ) {
      return;
    }

    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    event.preventDefault();
    targetElement.scrollIntoView({behavior: 'smooth', block: 'start'});

    const nextUrl = `${destination.pathname}${destination.search}${destination.hash}`;
    if (current.hash === destination.hash) {
      window.history.replaceState(window.history.state, '', nextUrl);
    } else {
      window.history.pushState(window.history.state, '', nextUrl);
    }
  }

  return <Link href={href} target={target} onClick={handleClick} {...props} />;
}
