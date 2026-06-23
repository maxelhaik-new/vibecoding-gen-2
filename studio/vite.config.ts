import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    allowedHosts: true,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
      '/assets': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
      '^/M[0-9]+': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
});
