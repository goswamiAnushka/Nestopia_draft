import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Define the configuration
export default defineConfig({
  plugins: [react()],
  base: 'https://nestopia-api-backend.onrender.com', // Adjust according to your deployment environment
  build: {
    outDir: 'dist', // Output directory for the build files
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/main.jsx'), // Path to the main entry file
        index: path.resolve(__dirname, 'index.html'), // Path to the HTML file
      },
    },
  },
});
