import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import MarkdownParser from './plugins/markdown-parser';

export default defineConfig({
  plugins: [react(), MarkdownParser()],
  resolve: {
    alias: {
      '@nc-assets': fileURLToPath(new URL('./src/assets/', import.meta.url)),
      '@nc-core': fileURLToPath(new URL('./src/core/', import.meta.url)),
      '@nc-icons': fileURLToPath(
        new URL('./src/icons/index.ts', import.meta.url),
      ),
      '@nc-ui': fileURLToPath(new URL('./src/ui/index.ts', import.meta.url)),
    },
  },
});
