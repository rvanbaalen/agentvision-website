import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://agentvision.robinvanbaalen.nl',
  adapter: process.argv.includes('dev') ? undefined : cloudflare(),
  vite: {
    plugins: [tailwindcss()],
  },
});
