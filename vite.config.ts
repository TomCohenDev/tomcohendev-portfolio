import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    // The lead form posts to the Worker; run `npm run dev:api` alongside `npm run dev`.
    proxy: {
      "/api": "http://127.0.0.1:8787",
    },
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      // automation.html is the same app with Hebrew metadata, served for /automation.
      input: {
        main: path.resolve(__dirname, "index.html"),
        automation: path.resolve(__dirname, "automation.html"),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
