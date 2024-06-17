import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://education-management-server-ruby.vercel.app",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, "/api"),
      },

      // "/api": " https://education-management-server.onrender.com",

      // "/api": "http://localhost:3000",
    },

    rewrites: [{ source: "/(.*)", destination: "/" }],
  },

  plugins: [react()],
  // base: "/new-website/",
});
