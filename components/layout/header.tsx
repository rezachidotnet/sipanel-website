'use client';

import Image from 'next/image';
import {useRef, useState, useEffect, useCallback} from 'react';
import {useTranslations} from 'next-intl';
import logo from '@/assets/brand/logos/logo.png';
import {Link, locales, usePathname, type Locale} from '@/i18n/routing';
import {LanguageSwitcher} from '@/components/localization/language-switcher';
import {CatalogDownloadModal} from '@/components/home/catalog-download-modal';
import {trackCatalogEvent, trackLanguageChange, trackEvent} from '@/lib/analytics/events';

const localeLabels: Record<Locale, {short: string; full: string}> = {
  fa: {short: 'FA', full: 'فارسی'},
  en: {short: 'EN', full: 'English'},
  ar: {short: 'AR', full: 'العربية'},
  ru: {short: 'RU', full: 'Русский'},
};

const navKeys = ['home', 'systems', 'projects', 'resources', 'process', 'about', 'contact'] as const;
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
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener('scroll', onScroll, {passive: true});
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!langOpen) return;
    function onClickOutside(e: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener('click', onClickOutside, true);
    return () => document.removeEventListener('click', onClickOutside, true);
  }, [langOpen]);

  const handleLangKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setLangOpen(false);
    }
  }, []);

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
    <header className={scrolled ? 'site-header is-scrolled' : 'site-header'}>
      <div className="main-header">
        <div className="container-shell main-header__inner">
          <Link href="/" className="brand-link" aria-label="SIPANEL home">
            <Image
              src={logo}
              alt="SIPANEL"
              width={1547}
              height={330}
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
            <div className="desktop-language-dropdown" ref={langDropdownRef} onKeyDown={handleLangKeyDown}>
              <button
                type="button"
                className="lang-trigger"
                aria-expanded={langOpen}
                aria-haspopup="true"
                aria-label={header('selectLanguage')}
                onClick={() => {
                  setLangOpen((prev) => !prev);
                  trackEvent('language_switcher_open', {component_id: 'language_dropdown'});
                }}
              >
                {localeLabels[locale].short}
                <svg className="lang-trigger__chevron" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {langOpen && (
                <nav className="lang-dropdown" aria-label={header('selectLanguage')}>
                  {locales.map((loc) => (
                    <Link
                      key={loc}
                      href={pathname}
                      locale={loc}
                      aria-current={loc === locale ? 'true' : undefined}
                      className={loc === locale ? 'lang-dropdown__item is-active' : 'lang-dropdown__item'}
                      onClick={() => {
                        setLangOpen(false);
                        if (loc !== locale) {
                          trackLanguageChange(locale, loc);
                        }
                      }}
                    >
                      {localeLabels[loc].full}
                    </Link>
                  ))}
                </nav>
              )}
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
