import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  baseURL: 'https://nestopia-backend.onrender.com', // Adjust according to your deployment environment
});
