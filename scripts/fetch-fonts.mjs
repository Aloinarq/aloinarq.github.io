// Downloads Cabinet Grotesk (400, 500, 800) from Fontshare into public/fonts/ before dev and build.
// The ITF Free Font License allows self-hosting the fonts for your own website but not
// redistributing the files through a repository, so they are fetched here instead of committed.
// License: https://www.fontshare.com/licenses/itf-ffl
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'public', 'fonts');
const weights = [400, 500, 800];
const file = (w) => join(out, `cabinet-grotesk-${w}.woff2`);

if (weights.every((w) => existsSync(file(w)))) process.exit(0);
mkdirSync(out, { recursive: true });

try {
  const css = await (await fetch(`https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@${weights.join(',')}&display=swap`)).text();
  for (const block of css.split('@font-face').slice(1)) {
    const weight = Number(block.match(/font-weight:\s*(\d+)/)?.[1]);
    const url = block.match(/url\('([^']+\.woff2)'\)/)?.[1];
    if (!weights.includes(weight) || !url) continue;
    const res = await fetch(url.startsWith('//') ? `https:${url}` : url);
    if (!res.ok) throw new Error(`${res.status} for weight ${weight}`);
    const data = Buffer.from(await res.arrayBuffer());
    if (data.subarray(0, 4).toString() !== 'wOF2') throw new Error(`weight ${weight} is not a woff2 file`);
    writeFileSync(file(weight), data);
    console.log(`fonts: Cabinet Grotesk ${weight} (${data.length} bytes)`);
  }
  const missing = weights.filter((w) => !existsSync(file(w)));
  if (missing.length) throw new Error(`missing weights ${missing.join(', ')}`);
} catch (error) {
  // The site still builds and falls back to system fonts; the warning shows in the build log.
  console.warn(`fonts: could not download Cabinet Grotesk (${error.message}); the site will use fallback fonts.`);
}
