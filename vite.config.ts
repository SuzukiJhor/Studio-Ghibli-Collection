import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './src/test/setup.ts',
    css: true,
    coverage: {
      provider: 'v8',
    },
    server: {
      deps: {
        inline: [/html-encoding-sniffer/, /@exodus\/bytes/]
      }
    }
  },
});