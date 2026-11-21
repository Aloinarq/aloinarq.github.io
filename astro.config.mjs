// @ts-check
import { defineConfig } from 'astro/config';

// Temporary GitHub Pages URL until a real domain is chosen. Change `site`
// (and `url` in src/config.ts) to the real domain once it exists.
export default defineConfig({
  site: 'https://aloinarq.github.io',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  devToolbar: { enabled: false },
  server: { host: '127.0.0.1' },
});
