import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(rootDir, 'index.html'),
        contact: resolve(rootDir, 'contact.html'),
        devis: resolve(rootDir, 'devis.html'),
        pageTest: resolve(rootDir, 'page-test.html'),
        demoSite: resolve(rootDir, 'demo-site.html'),
        admin: resolve(rootDir, 'admin.html')
      }
    }
  },
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8787',
        changeOrigin: true
      }
    }
  }
});
