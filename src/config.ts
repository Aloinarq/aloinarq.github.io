/**
 * Every number, contact detail and placeholder on the site lives here.
 * Change a value once and it changes on every page, in all three languages.
 */

export const site = {
  /** The wordmark, set in lowercase on the page. */
  name: 'plan 1:1',
  /** The name inside running text. */
  nameInText: 'Plan 1:1',
  owner: 'Levente',
  /** Full name as each language writes it: family name first in Hungarian and Romanian. */
  ownerFullName: { ro: 'Horvath Levente', hu: 'Horvath Levente', en: 'Levente Horvath' },
  /** Base city, as each language names it. Travel inside it is included in the price. */
  city: { ro: 'Târgu Mureș', hu: 'Marosvásárhely', en: 'Târgu Mureș' },
  email: 'horvathlevente14@gmail.com',
  /** Shown as written; the tel: link strips the spaces. */
  phone: '+40 740 234 096',
  /** Used for canonical, hreflang and social-share links. Change it (and `site` in astro.config.mjs) for a custom domain. */
  url: 'https://aloinarq.github.io',
  /**
   * Where the enquiry form posts. Empty: the form opens the visitor's email app with the enquiry
   * written out, addressed to `email` (no form service, nothing stored by the site). To use a form
   * service instead, paste its endpoint URL here and name the service in src/i18n/legal.ts.
   */
  formEndpoint: '',
  /** Where email is received, named in the privacy policy. */
  emailProvider: 'Google (Gmail)',
  /** Who hosts this website, named in the privacy policy. */
  host: 'GitHub Pages (GitHub)',
} as const;
/* The About letter shows a round portrait when a file named portrait.jpg, .jpeg, .png or .webp
   exists in src/assets/; without one, the letter starts with the text. */

/** Prices in lei. All are "from" prices; the contract states the final price. */
export const prices = {
  oneRoom: 250,
  apartmentPerSquareMetre: 9,
  apartmentMinimum: 450,
  /** The worked example shown under the apartment price. */
  apartmentExampleArea: 60,
  planningPerRoom: 150,
  planningPiecesPerRoom: 5,
  /** First room for a business near the base city: 0 means free; any other number is shown as a price. */
  businessFirstRoom: 0,
  /** The first-room offer applies to businesses within this distance of the base city (Reghin included by name). */
  businessFirstRoomRadiusKm: 50,
} as const;

/** Promises the site makes about time. Keep them true. */
export const service = {
  replyWorkingDays: 2,
  minutesPerRoomOnSite: 10,
  deliveryWorkingDays: 5,
  /** How long the private link to the model stays online after delivery. */
  linkOnlineMonths: 12,
  /** How long an enquiry that did not lead to a contract is kept. */
  enquiryKeptMonths: 6,
} as const;

export const languages = ['ro', 'hu', 'en'] as const;
export type Lang = (typeof languages)[number];
export const defaultLang: Lang = 'ro';
