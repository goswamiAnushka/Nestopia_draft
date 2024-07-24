import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html'
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          // Add more chunking logic as needed
        }
      }
    },
    sourcemap: false,
    chunkSizeWarningLimit: 1000, // Adjust if needed
  },
  server: {
    
  base: '/',}
});
