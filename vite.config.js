import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  ssgOptions: {
    // Prerendered HTML is the entry point for crawlers; keep the hydration
    // script non-blocking so it never delays first paint.
    script: 'defer',
    // Flat output (`about.html`, `blog/slug.html`) pairs with Vercel's
    // `cleanUrls`, and puts `404.html` at the output root where Vercel picks it
    // up automatically as the not-found page — with a real 404 status.
    dirStyle: 'flat',
    formatting: 'none',
    // Critical-CSS inlining needs `beasties` installed; skip it for now and
    // rely on the single stylesheet being small.
    beastiesOptions: false,
  },
  build: {
    rollupOptions: {
      output: {
        // Split the single 325 KB bundle so page chunks are not invalidated
        // every time an unrelated vendor updates. Function form (rather than an
        // object) is required because the SSR pass treats these packages as
        // externals, which a static manualChunks map cannot reference.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (/[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(id)) {
            return 'react';
          }
          if (/[\\/]node_modules[\\/](framer-motion|motion-dom|motion-utils)[\\/]/.test(id)) {
            return 'motion';
          }
          if (/[\\/]node_modules[\\/](react-markdown|remark-.*|rehype-.*|unified|mdast-.*|hast-.*|micromark.*|vfile.*|unist-.*)[\\/]/.test(id)) {
            return 'markdown';
          }
          if (/[\\/]node_modules[\\/]yet-another-react-lightbox[\\/]/.test(id)) {
            return 'lightbox';
          }
          return undefined;
        },
      },
    },
  },
})
