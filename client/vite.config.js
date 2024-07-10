import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  baseURL: 'http://localhost:8800', // Adjust according to your deployment environment
});
