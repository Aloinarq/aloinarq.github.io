/**
 * Every number, contact detail and placeholder on the site lives here.
 * Change a value once and it changes on every page, in all three languages.
 * Search for "[TODO" to find what still has to be filled in before publishing.
 */

export const site = {
  /** The wordmark, set in lowercase on the page. */
  name: 'plan 1:1',
  /** The name inside running text. */
  nameInText: 'Plan 1:1',
  owner: 'Levente',
  /** Shown only in the privacy policy, as the data controller. */
  ownerFullName: '[TODO: full name]',
  ownerAddress: '[TODO: postal address]',
  city: '[TODO: city]',
  email: '[TODO: email]',
  phone: '[TODO: phone]',
  /** Used for canonical, hreflang and social-share links. */
  url: 'https://aloinarq.github.io', // temporary GitHub Pages URL; swap for the real domain later
  /** Where the enquiry form posts (a form service or your own endpoint). */
  formEndpoint: '[TODO: form endpoint]',
  /** Photo for the About letter: put the file in src/assets and import it in Letter.astro. */
  photo: '[TODO: photo]',
} as const;

/** Prices in lei. All are "from" prices; the contract states the final price. */
export const prices = {
  oneRoom: 250,
  apartmentPerSquareMetre: 9,
  apartmentMinimum: 450,
  /** The worked example shown under the apartment price. */
  apartmentExampleArea: 60,
  planningPerRoom: 150,
  planningPiecesPerRoom: 5,
  /** First room for a business: 0 means free; any other number is shown as a price. */
  businessFirstRoom: 0,
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
