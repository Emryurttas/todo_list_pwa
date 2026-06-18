import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: "/",

  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",

      includeAssets: ["favicon.ico", "icons/*.png"],

      manifest: {
        name: "todolist",
        short_name: "list",
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#3367D6",
        theme_color: "#3367D6",
        description: "Todo PWA",

        icons: [
          {
            src: "icons/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "icons/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ]
})