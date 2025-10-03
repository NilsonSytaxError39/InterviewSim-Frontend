// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const PORT = 4000;

export default defineConfig({
  plugins: [react()

  ],
  server: { port: PORT , host: true },
  preview: {port: PORT, host: true}
});
