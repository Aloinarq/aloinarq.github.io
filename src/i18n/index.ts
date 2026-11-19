import { languages, type Lang } from '../config';
import { en, type Dict } from './en';
import { hu } from './hu';
import { ro } from './ro';

export const dictionaries: Record<Lang, Dict> = { ro, hu, en };
export const t = (lang: Lang): Dict => dictionaries[lang];

export type Page = 'home' | 'privacy' | 'terms';

/** The path of a page in a language, always with a trailing slash. */
export function pathFor(lang: Lang, page: Page): string {
  if (page === 'home') return `/${lang}/`;
  return `/${lang}/${dictionaries[lang].slugs[page]}/`;
}

/** The same page in every language, for the language switcher and hreflang. */
export const alternates = (page: Page) => languages.map((lang) => ({ lang, href: pathFor(lang, page) }));

/** Replace {name} placeholders in a string. */
export const fill = (text: string, values: Record<string, string | number>) =>
  text.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? `{${key}}`));

export { languages, type Lang };
