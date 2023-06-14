import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      exportAsDefault: true,
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  define: {
    __IS_DEV__: JSON.stringify(true),
    __API_BASE__: JSON.stringify('http://localhost:8888'),
    __PROJECT__: JSON.stringify('frontend'),
  },
  css: {
    modules: {
      generateScopedName: '[path][name]__[local]--[hash:base64:5]',
    },
  },
});
