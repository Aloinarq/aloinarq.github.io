# plan 1:1

The website for Plan 1:1, Levente's room-scanning service in Romania: Romanian (default), Hungarian and English.

## Run it

```sh
npm install
npm run dev       # http://127.0.0.1:4321 (redirects to /ro/)
npm run build     # static site in dist/
npm run preview
```

## Change things in one place

- `src/config.ts`: every price, time promise, contact detail and placeholder. Search for `[TODO` to see what is still missing (city, email, phone, form endpoint, domain, full name and address for the privacy policy, photo).
- `src/i18n/ro.ts`, `hu.ts`, `en.ts`: the words of each language. `src/i18n/legal.ts`: privacy policy and form terms.
- `astro.config.mjs`: set `site` to the real domain when it exists (it feeds canonical and hreflang links).

## Pages

| Page | Romanian | Hungarian | English |
| --- | --- | --- | --- |
| Home | `/ro/` | `/hu/` | `/en/` |
| Privacy policy | `/ro/confidentialitate/` | `/hu/adatvedelem/` | `/en/privacy/` |
| Form terms | `/ro/termeni-formular/` | `/hu/urlap-feltetelek/` | `/en/form-terms/` |

Audience sections for outreach emails (each opens its own panel):

| Audience | Romanian | Hungarian | English |
| --- | --- | --- | --- |
| Interior designers, architects | `/ro/#designeri` | `/hu/#tervezok` | `/en/#designers` |
| Kitchen, wardrobe, furniture makers | `/ro/#bucatarii` | `/hu/#konyhak` | `/en/#kitchen-makers` |
| Renovation contractors | `/ro/#renovari` | `/hu/#felujitok` | `/en/#contractors` |
| Real-estate agents, property managers | `/ro/#imobiliare` | `/hu/#ingatlan` | `/en/#real-estate` |
| Homeowners and renters | `/ro/#proprietari` | `/hu/#lakok` | `/en/#homeowners` |

## Other folders

- `contract/`: the Romanian contract template, English and Hungarian reading copies, and a note on the payment route. Have an accountant check them before first use.
- `src/assets/shots/` and `public/media/`: screenshots and two short clips of the 3D viewer showing Levente's own bedroom scan.
- `.taste-skill/`: design notes (direction, idea, critique rounds).

Fonts: Cabinet Grotesk by Indian Type Foundry, from Fontshare (ITF Free Font License), self-hosted in `public/fonts/`.
