'use client';

import {useEffect} from 'react';
import {useSearchParams} from 'next/navigation';

export function ProjectsFilterActivator() {
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter');

  useEffect(() => {
    if (!filter) {
      return;
    }

    const radio = document.getElementById(`projects-filter-${filter}`) as HTMLInputElement | null;

    if (!radio) {
      return;
    }

    radio.checked = true;
    radio.dispatchEvent(new Event('change', {bubbles: true}));
  }, [filter]);

  return null;
}
