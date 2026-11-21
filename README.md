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

- `src/config.ts`: every price, time promise and contact detail (name, city, email, phone), the site URL, and how the enquiry form sends.
- `src/i18n/ro.ts`, `hu.ts`, `en.ts`: the words of each language. `src/i18n/legal.ts`: privacy policy and form terms.
- `astro.config.mjs`: `site` must match `url` in `src/config.ts` (it feeds canonical and hreflang links).

Live at https://aloinarq.github.io/ (GitHub Pages, deployed by `.github/workflows/deploy.yml` on every push to `main`).

### Optional, when you want them

- **Portrait in the About letter:** save a square photo as `src/assets/portrait.jpg` (or `.png` / `.webp`). It appears automatically; without it the letter starts with the text.
- **A form service instead of the email app:** by default the enquiry form opens the visitor's email app with the enquiry written out, addressed to the email in `src/config.ts`. To have the site send it instead, create an account with a form service, paste its endpoint URL into `formEndpoint`, and name the service in the "Who else sees it" section of `src/i18n/legal.ts`.
- **Your own domain:** set it in `src/config.ts` (`url`) and `astro.config.mjs` (`site`), add a `public/CNAME` file with the domain, and point the domain's DNS at GitHub Pages.
- **Where client models are hosted:** the privacy policy says the host is named in each contract; decide it before the first client.

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

Fonts: Cabinet Grotesk by Indian Type Foundry, from Fontshare, under the ITF Free Font License (https://www.fontshare.com/licenses/itf-ffl). The licence allows self-hosting on your own website but not redistributing the files through a repository, so `scripts/fetch-fonts.mjs` downloads them into `public/fonts/` before `dev` and `build` (including on GitHub Actions) and they are not committed.
