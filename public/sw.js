import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

const TODOS_CACHE_NAME = "todos";

cleanupOutdatedCaches();

const filteredManifest = self.__WB_MANIFEST.filter(
    entry => !entry.url.includes("css/background.css")
);
precacheAndRoute(filteredManifest);

const enableNavigationPreload = async () => {
    if (self.registration.navigationPreload) {
        await self.registration.navigationPreload.enable();
    }
};

self.addEventListener("activate", (event) => {
    console.log("[Service Worker] Activation...");
    event.waitUntil(
        (async () => {
            await enableNavigationPreload();
        })()
    );
});

registerRoute(
    ({ url }) => url.port === '7000',
    new NetworkFirst({
        cacheName: TODOS_CACHE_NAME,
        plugins: [
            new ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 30,
            }),
        ],
    })
);

registerRoute(
    ({ request, url }) => request.destination === 'style' && url.pathname.endsWith('background.css'),
    async ({ request }) => {
        try {
            return await fetch(request);
        } catch (error) {
            console.log("[Service Worker] background.css non disponible");
            return new Response(".main {background: orange;}", {
                headers: { "Content-Type": "text/css" },
            });
        }
    }
);
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        console.log('[Service Worker] Activation de la nouvelle version via SKIP_WAITING');
        self.skipWaiting();
    }
});
