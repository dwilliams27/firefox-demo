import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        'iframe-content': 'iframe-content.html',
        'iframe-vanilla': 'iframe-vanilla.html'
      }
    }
  }
});
