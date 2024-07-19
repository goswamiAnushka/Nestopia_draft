import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  baseURL: 'https://nestopia-draft-api2.vercel.app'
});