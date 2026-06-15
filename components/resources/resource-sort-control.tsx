'use client';

import './resources.css';
import {useCallback, useRef, type ChangeEvent} from 'react';

type SortOption = 'recommended' | 'newest' | 'oldest' | 'shorter_read';

type Props = {
  labels: {
    sortLabel: string;
    sortNewest: string;
    sortOldest: string;
    sortRecommended: string;
    sortShorterRead: string;
  };
  gridSelector: string;
  hasReadTime: boolean;
};

function applySortOrder(gridSelector: string, sortKey: SortOption) {
  const grid = document.querySelector(gridSelector);
  if (!grid) return;

  const cards = grid.querySelectorAll<HTMLElement>('.resource-hub-card');

  cards.forEach((card) => {
    let order: number;

    switch (sortKey) {
      case 'newest': {
        const date = card.dataset.sortDate ?? '2026-01';
        // Higher date = lower order (appears first)
        // Date format: "2026-03" → parse as sortable number
        const [y, m] = date.split('-').map(Number);
        order = -((y ?? 2026) * 100 + (m ?? 1));
        break;
      }
      case 'oldest': {
        const date = card.dataset.sortDate ?? '2026-01';
        const [y, m] = date.split('-').map(Number);
        order = (y ?? 2026) * 100 + (m ?? 1);
        break;
      }
      case 'shorter_read': {
        const readTime = Number.parseInt(card.dataset.sortReadtime ?? '0', 10);
        order = readTime || 999;
        break;
      }
      default: {
        order = Number.parseInt(card.dataset.sortOrder ?? '0', 10);
        break;
      }
    }

    card.style.order = String(order);
  });
}

export function ResourceSortControl({labels, gridSelector, hasReadTime}: Props) {
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      applySortOrder(gridSelector, event.target.value as SortOption);
    },
    [gridSelector]
  );

  return (
    <div className="resource-sort-control">
      <label className="resource-sort-label" htmlFor="resource-sort-select">
        {labels.sortLabel}
      </label>
      <select
        ref={selectRef}
        id="resource-sort-select"
        className="resource-sort-select"
        defaultValue="recommended"
        onChange={handleChange}
      >
        <option value="recommended">{labels.sortRecommended}</option>
        <option value="newest">{labels.sortNewest}</option>
        <option value="oldest">{labels.sortOldest}</option>
        {hasReadTime && (
          <option value="shorter_read">{labels.sortShorterRead}</option>
        )}
      </select>
    </div>
  );
}
