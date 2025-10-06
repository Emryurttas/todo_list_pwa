import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
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
			registerType: 'autoUpdate',
			includeAssets: [
				'icons/favicon.ico',
				'icons/apple-touch-icon-180x180.png',
				'icons/maskable-icon-512x512.png',
				'screenshots/screenshot1.png',
				'icons/pwa-512x512.png',
			],
			manifest: {
				short_name: 'list',
				name: 'todolist',
				id: '/?source=pwa',
				start_url: '/?source=pwa',
				scope: '/',
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
						src: 'icons/icon-512x512.png',
						type: 'image/png',
						sizes: '512x512'
					},
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
						src: 'icons/pwa-64x64.png',
						type: 'image/png',
						sizes: '64x64'
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
