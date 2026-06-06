import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: "/todo-list-pwa/",

  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'js/app.js',
      },
    },
  },

  plugins: [
    react(),

    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'public',
      filename: 'sw.js',

      includeAssets: [
        'icons/*.png',
        'screenshots/*.png',
      ],

      manifest: {
        short_name: 'list',
        name: 'todolist',

        id: '/todo-list-pwa/?source=pwa',
        start_url: '/todo-list-pwa/?source=pwa',
        scope: '/todo-list-pwa/',

        display: 'standalone',
        background_color: '#3367D6',
        theme_color: '#3367D6',
        description: 'Application de gestion de tâches en PWA',

        screenshots: [
          {
            src: 'screenshots/screenshot1.png',
            sizes: '1342x786',
            type: 'image/png',
            form_factor: 'narrow'
          },
          {
            src: 'screenshots/screenshot1.png',
            sizes: '1342x786',
            type: 'image/png',
            form_factor: 'wide'
          }
        ],

        icons: [
          {
            src: 'icons/apple-touch-icon-180x180.png',
            type: 'image/png',
            sizes: '180x180'
          },
          {
            src: 'icons/favicon.ico',
            type: 'image/x-icon',
            sizes: '48x48'
          },
          {
            src: 'icons/maskable-icon-512x512.png',
            type: 'image/png',
            sizes: '512x512',
            purpose: 'maskable'
          },
          {
            src: 'icons/pwa-192x192.png',
            type: 'image/png',
            sizes: '192x192'
          },
          {
            src: 'icons/pwa-512x512.png',
            type: 'image/png',
            sizes: '512x512'
          }
        ]
      }
    })
  ]
})