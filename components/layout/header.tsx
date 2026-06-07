'use client';

import Image from 'next/image';
import {useRef, useState} from 'react';
import {useTranslations} from 'next-intl';
import logo from '@/assets/brand/logos/logo.png';
import {Link, locales, usePathname, type Locale} from '@/i18n/routing';
import {LanguageSwitcher} from '@/components/localization/language-switcher';
import {CatalogDownloadModal} from '@/components/home/catalog-download-modal';
import {trackCatalogEvent} from '@/lib/analytics/events';

const navKeys = ['home', 'systems', 'projects', 'process', 'resources', 'about', 'contact'] as const;
const navHref: Record<(typeof navKeys)[number], string> = {
  home: '/',
  systems: '/systems',
  projects: '/projects',
  process: '/#process',
  resources: '/resources',
  about: '/about',
  contact: '/contact'
};

type Props = {
  locale: Locale;
};

function normalizePathname(pathname: string) {
  const withoutQuery = pathname.split('?')[0]?.split('#')[0] || '/';
  const parts = withoutQuery.split('/').filter(Boolean);

  if (parts.length > 0 && locales.includes(parts[0] as Locale)) {
    return `/${parts.slice(1).join('/')}` || '/';
  }

  return withoutQuery === '' ? '/' : withoutQuery;
}

function isNavItemActive(key: (typeof navKeys)[number], pathname: string) {
  const normalizedPathname = normalizePathname(pathname);

  if (key === 'home') {
    return normalizedPathname === '/';
  }

  if (key === 'process') {
    return false;
  }

  const href = navHref[key];
  return normalizedPathname === href || normalizedPathname.startsWith(`${href}/`);
}

function getNavHref(key: (typeof navKeys)[number]) {
  if (key === 'process') {
    return navHref.process;
  }

  return navHref[key];
}

export function Header({locale}: Props) {
  const nav = useTranslations('nav');
  const header = useTranslations('header');
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);
  const [catalogOpen, setCatalogOpen] = useState(false);

  function closeMobileMenu() {
    if (mobileMenuRef.current) {
      mobileMenuRef.current.open = false;
    }
  }

  function handleCatalogClick() {
    trackCatalogEvent('catalog_cta_clicked', {component_id: 'header_cta'});
    closeMobileMenu();
    setCatalogOpen(true);
  }

  return (
    <header className="site-header">
      <div className="main-header">
        <div className="container-shell main-header__inner">
          <Link href="/" className="brand-link" aria-label="SIPANEL home">
            <Image
              src={logo}
              alt="SIPANEL"
              width={220}
              height={110}
              priority
              className="brand-link__logo"
            />
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navKeys.map((key) => {
              const isActive = isNavItemActive(key, pathname);
              const href = getNavHref(key);

              return (
                <Link
                  key={key}
                  href={href}
                  aria-current={isActive ? 'page' : undefined}
                  className={isActive ? 'desktop-nav__item is-active' : 'desktop-nav__item'}
                >
                  {nav(key)}
                </Link>
              );
            })}
          </nav>

          <div className="main-header__actions">
            {/* track: catalog_cta_clicked */}
            <button type="button" className="header-cta" onClick={handleCatalogClick}>
              {header('cta')}
            </button>
            {/* track: language_switcher_open, language_change */}
            <div className="desktop-language">
              <LanguageSwitcher activeLocale={locale} />
            </div>
            <details className="mobile-menu" ref={mobileMenuRef}>
              {/* track: mobile_menu_open */}
              <summary aria-label={header('menu')}>
                <span />
                <span />
                <span />
              </summary>
              <div className="mobile-menu__panel">
                {/* track: language_switcher_open, language_change */}
                <LanguageSwitcher activeLocale={locale} compact onNavigate={closeMobileMenu} />
                <nav className="mobile-menu__nav" aria-label="Mobile navigation">
                  {navKeys.map((key) => {
                    const isActive = isNavItemActive(key, pathname);
                    const href = getNavHref(key);

                    return (
                      /* track: mobile_menu_item_click */
                      <Link
                        key={key}
                        href={href}
                        aria-current={isActive ? 'page' : undefined}
                        className={isActive ? 'mobile-menu__link is-active' : 'mobile-menu__link'}
                        onClick={closeMobileMenu}
                      >
                        {nav(key)}
                      </Link>
                    );
                  })}
                </nav>
                <button type="button" className="mobile-menu__cta" onClick={handleCatalogClick}>
                  {header('cta')}
                </button>
              </div>
            </details>
          </div>
        </div>
      </div>

      <CatalogDownloadModal isOpen={catalogOpen} onClose={() => setCatalogOpen(false)} />
    </header>
  );
}
