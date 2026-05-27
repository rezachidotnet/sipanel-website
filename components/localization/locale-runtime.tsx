'use client';

import {useEffect} from 'react';
import type {Locale} from '@/i18n/routing';

type Props = {
  locale: Locale;
  dir: 'ltr' | 'rtl';
};

export function LocaleRuntime({locale, dir}: Props) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    document.documentElement.dataset.locale = locale;
    window.localStorage.setItem('sipanel-locale', locale);
  }, [dir, locale]);

  return null;
}
