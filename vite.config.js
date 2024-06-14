import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // "/api": "https://education-management-server-ruby.vercel.app",

      // "/api": " https://education-management-server.onrender.com/",

      "/api": "http://localhost:3000",
    },
  },
  plugins: [react()],
  // base: "/new-website/",
});
