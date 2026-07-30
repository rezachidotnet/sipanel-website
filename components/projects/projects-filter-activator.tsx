'use client';

import {useEffect} from 'react';
import {useSearchParams} from 'next/navigation';
import {
  getProjectFilterHash,
  isProjectFilterKey,
  projectFilterScrollStorageKey,
  type ProjectFilterKey
} from '@/lib/projects/project-filters';

const filterInputPrefix = 'projects-filter-';

function parseProjectFilterHash(hash: string): ProjectFilterKey | null | 'invalid' {
  if (!hash.startsWith('#filter=')) return null;

  const filter = new URLSearchParams(hash.slice(1)).get('filter');
  return isProjectFilterKey(filter) ? filter : 'invalid';
}

function getRadio(filter: ProjectFilterKey) {
  return document.getElementById(`${filterInputPrefix}${filter}`) as HTMLInputElement | null;
}

function activateFilter(filter: ProjectFilterKey) {
  const radio = getRadio(filter);
  if (!radio || radio.checked) return;

  radio.checked = true;
  radio.dispatchEvent(new Event('change', {bubbles: true}));
}

function removeProjectFilterHash() {
  const url = new URL(window.location.href);
  url.hash = '';
  window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}`);
}

function syncUrlToFilter(filter: ProjectFilterKey) {
  const url = new URL(window.location.href);
  url.searchParams.delete('filter');
  url.hash = getProjectFilterHash(filter);
  window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`);
}

function shouldScrollAfterNavigation() {
  try {
    if (window.sessionStorage.getItem(projectFilterScrollStorageKey) !== '1') {
      return false;
    }

    window.sessionStorage.removeItem(projectFilterScrollStorageKey);
    return true;
  } catch {
    return false;
  }
}

function scrollProjectsPageToTop() {
  const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

  window.requestAnimationFrame(() => {
    window.scrollTo({
      top: 0,
      behavior
    });
  });
}

export function ProjectsFilterActivator() {
  const searchParams = useSearchParams();

  useEffect(() => {
    function activateFromUrl() {
      const shouldScroll = shouldScrollAfterNavigation();
      const hashFilter = parseProjectFilterHash(window.location.hash);

      if (hashFilter === 'invalid') {
        activateFilter('all');
        removeProjectFilterHash();
        if (shouldScroll) scrollProjectsPageToTop();
        return;
      }

      if (hashFilter) {
        activateFilter(hashFilter);
        if (shouldScroll) scrollProjectsPageToTop();
        return;
      }

      const queryFilter = searchParams.get('filter');
      activateFilter(isProjectFilterKey(queryFilter) ? queryFilter : 'all');
      if (shouldScroll) scrollProjectsPageToTop();
    }

    function handleChange(event: Event) {
      const radio = event.target as HTMLInputElement | null;
      if (!radio?.checked || radio.name !== 'projects-filter' || !radio.id.startsWith(filterInputPrefix)) {
        return;
      }

      const filter = radio.id.slice(filterInputPrefix.length);
      if (isProjectFilterKey(filter)) {
        syncUrlToFilter(filter);
      }
    }

    activateFromUrl();
    document.addEventListener('change', handleChange);
    window.addEventListener('hashchange', activateFromUrl);
    window.addEventListener('popstate', activateFromUrl);
    document.documentElement.dataset.projectsFilterActivator = 'ready';

    return () => {
      document.removeEventListener('change', handleChange);
      window.removeEventListener('hashchange', activateFromUrl);
      window.removeEventListener('popstate', activateFromUrl);
      delete document.documentElement.dataset.projectsFilterActivator;
    };
  }, [searchParams]);

  return null;
}
