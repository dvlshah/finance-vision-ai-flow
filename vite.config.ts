
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize chunks
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-tabs'],
          animations: ['framer-motion'],
          charts: ['recharts'],
          router: ['react-router-dom'],
          query: ['@tanstack/react-query'],
        },
      },
    },
    // Use esbuild for minification instead of terser to avoid dependency issues
    minify: mode === 'production' ? 'esbuild' : false,
    // Target modern browsers for smaller bundles
    target: 'es2020',
    // Enable source maps for production debugging
    sourcemap: mode === 'development',
  },
}));
