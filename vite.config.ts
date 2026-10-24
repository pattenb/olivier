import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(({ command }) => {
  // In dev mode (AI Studio), keep base at '/' so dev server preview loads instantly without 404s.
  // In production builds (GitHub Pages), default to '/olivier/' (or BASE_PATH env var).
  const isDev = command === 'serve';
  // Use BASE_PATH if explicitly specified, otherwise '/' in dev and './' in production
  // This allows the build to load on any server (domain root, subfolder, GitHub Pages, or VS Code Live Server) without 404s.
  const base = process.env.BASE_PATH || (isDev ? '/' : './');

  return {
    base,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});