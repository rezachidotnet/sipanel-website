export const projectFilterKeys = [
  'all',
  'sandwich',
  'standing',
  'cladding',
  'transparent-roofing'
] as const;

export type ProjectFilterKey = (typeof projectFilterKeys)[number];

export const projectFilterScrollStorageKey = 'sipanel:project-filter-scroll-top';

export const selectableProjectFilterKeys = projectFilterKeys.filter(
  (filter) => filter !== 'all'
) as Exclude<ProjectFilterKey, 'all'>[];

export function isProjectFilterKey(value: string | null): value is ProjectFilterKey {
  return projectFilterKeys.includes(value as ProjectFilterKey);
}

export function getProjectFilterHash(filter: ProjectFilterKey) {
  return filter === 'all' ? '' : `#filter=${filter}`;
}

export function getProjectFilterHref(filter: ProjectFilterKey) {
  return `/projects${getProjectFilterHash(filter)}`;
}
