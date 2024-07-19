import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  baseURL: 'https://nestopia-draft-api2.vercel.app',  // Note: The correct property name is 'base', not 'baseURL'
  build: {
    rollupOptions: {
      external: [
        'react-quill/dist/quill.snow.css'
      ]
    }
  }
});
