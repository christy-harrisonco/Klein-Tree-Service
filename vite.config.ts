import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

declare var process: any;

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    // This is the "smoother" fix for GitHub Pages
    base: './', 
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY || process.env.API_KEY || '')
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      minify: 'esbuild',
    }
  };
});