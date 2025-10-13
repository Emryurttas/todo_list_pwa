import {cleanupOutdatedCaches, precacheAndRoute} from 'workbox-precaching';
import {registerRoute} from 'workbox-routing';

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
            self.clients.claim();
        })()
    );
});

self.addEventListener("fetch", (event) => {
    const { request } = event;

    if (request.method === "GET" && request.url.includes(":7000")) {
        event.respondWith(
            (async () => {
                try {
                    const responseFromNetwork = await fetch(request);
                    const todosCache = await caches.open(TODOS_CACHE_NAME);
                    todosCache.put(request, responseFromNetwork.clone());
                    console.log("[Service Worker] Liste des todos mise à jour depuis le réseau");
                    return responseFromNetwork;
                } catch (error) {
                    console.log("[Service Worker] Réseau indisponible, récupération depuis la cache");
                    const cachedResponse = await caches.match(request);
                    if (cachedResponse) {
                        return cachedResponse;
                    }

                    return new Response(JSON.stringify([]), {
                        headers: { "Content-Type": "application/json" },
                        status: 200,
                    });
                }
            })()
        );
    }
});

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
