import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      // Add the folders you want to ignore here
      ignored: [
        '**/node_modules/**',  // Already ignored by default but explicit is good
        '**/.git/**',          // Git directory
        '**/dist/**',          // Build output
        '**/temp/**',          // Temporary files
        '**/cache/**',         // Cache directories
        // Add any other specific folders you want to ignore
        'api'
      ]
    }
  }
});