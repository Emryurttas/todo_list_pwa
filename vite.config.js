import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		rollupOptions: {
			output: {
			entryFileNames: 'js/app.js'
			},
		},
  },
  plugins: [
    react(),
    VitePWA({
		strategies: 'injectManifest',
		srcDir: 'public',
		filename: 'sw.js',
		registerType: 'autoUpdate',
	}),
  ],
})
