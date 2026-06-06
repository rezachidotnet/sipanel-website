type BreadcrumbItem = {
  label: string;
  href: string;
};

type Props = {
  items: BreadcrumbItem[];
  ariaLabel: string;
};

export function ResourceBreadcrumb({items, ariaLabel}: Props) {
  if (items.length === 0) return null;

  const lastIndex = items.length - 1;

  return (
    <nav className="resource-breadcrumb" aria-label={ariaLabel}>
      <ol className="resource-breadcrumb__list">
        {items.map((item, index) => (
          <li className="resource-breadcrumb__item" key={item.href}>
            {index < lastIndex ? (
              <a href={item.href} className="resource-breadcrumb__link">
                {item.label}
              </a>
            ) : (
              <span className="resource-breadcrumb__current" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
