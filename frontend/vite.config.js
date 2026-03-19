import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Allow the Google OAuth popup to communicate back to the opener window.
    // Without this, Vite's default 'same-origin' COOP policy blocks
    // window.closed / window.close calls from the Firebase auth popup.
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
    },
  },
  build: {
    outDir: '../backend/frontend_dist',
    emptyOutDir: true,
    // Increase warning threshold to 1MB to reduce noise
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Split large vendor libraries into separate cacheable chunks
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Firebase gets its own chunk (very large)
            if (id.includes('firebase')) return 'vendor-firebase';
            // Maps libraries
            if (id.includes('leaflet') || id.includes('react-leaflet')) return 'vendor-maps';
            if (id.includes('@react-google-maps')) return 'vendor-gmaps';
            // Chart library (only used in admin)
            if (id.includes('recharts')) return 'vendor-recharts';
            // Animation libraries
            if (id.includes('framer-motion')) return 'vendor-framer';
            if (id.includes('lottie-react') || id.includes('@lottiefiles')) return 'vendor-lottie';
            // React core
            if (id.includes('react-dom') || id.includes('react-router')) return 'vendor-react';
            // Everything else in node_modules
            return 'vendor-misc';
          }
        },
      },
    },
  },
})
