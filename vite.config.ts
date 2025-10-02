import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
import svgr from "vite-plugin-svgr";
// import ClosePlugin from './vite-plugin-close';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    svgr(),
    // ClosePlugin(),
  ],
  define: {
    global: 'window', // 👈 polyfill global
  },
}); 