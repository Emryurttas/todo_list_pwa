import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/todo-list-pwa/',

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        entryFileNames: 'assets/app.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  },

  plugins: [
    react(),

    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',

      strategies: 'injectManifest',
      srcDir: 'public',
      filename: 'sw.js',

      manifest: {
        id: '/todo-list-pwa/',
        name: 'todolist',
        short_name: 'list',

        start_url: '/todo-list-pwa/?source=pwa',
        scope: '/todo-list-pwa/',

        display: 'standalone',
        background_color: '#3367D6',
        theme_color: '#3367D6',

        icons: [
          {
            src: 'icons/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})