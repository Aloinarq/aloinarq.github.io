// @ts-check
import { defineConfig } from 'astro/config';

// The domain is not chosen yet: change `site` (and `url` in src/config.ts) once it is. [TODO: domain]
export default defineConfig({
  site: 'https://domain.example',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  devToolbar: { enabled: false },
  server: { host: '127.0.0.1' },
});
