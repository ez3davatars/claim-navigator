import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const appRoutes = [
  'checkout',
  'success',
  'admin',
  'admin/login',
  'admin/forgot-password',
  'admin/reset-password',
  'disclaimer',
  'terms',
  'privacy',
  'small-claims-court-document-templates',
  'small-claims-demand-letter-template',
  'small-claims-complaint-template',
  'self-represented-litigant-help',
  'pro-se-court-document-preparation',
  'how-it-works',
  'pricing',
  'faq',
  'about',
  'contact',
];

function emitSpaRouteFallbacks() {
  return {
    name: 'emit-spa-route-fallbacks',
    closeBundle() {
      const builtIndex = resolve('dist/index.html');

      for (const route of appRoutes) {
        const routeIndex = resolve('dist', route, 'index.html');
        mkdirSync(dirname(routeIndex), { recursive: true });
        copyFileSync(builtIndex, routeIndex);
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), emitSpaRouteFallbacks()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
