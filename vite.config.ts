import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    commonjsOptions: {
      include: [/react-hook-form/, /node_modules/],
    },
  },
  optimizeDeps: {
    include: ["react-hook-form"],
  },
  server: {
    port: 3000,
    open: true,
  },
});
