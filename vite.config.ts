import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

declare var process: any;

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    // Setting base to './' is the most important step for GitHub Pages.
    // It ensures that your site doesn't break if it's hosted at username.github.io/repo-name/
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