import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    // ⚡ Terser کے بجائے ڈیفالٹ Esbuild استعمال کر رہے ہیں جو الٹرا فاسٹ ہے
    minify: 'esbuild', 
    esbuild: {
      drop: ['console', 'debugger'], // پروڈکشن بلڈ میں ریم بچانے کے لیے لاگز خود بخود حذف ہو جائیں گے
    },
  },
});
