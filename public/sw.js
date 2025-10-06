import { precacheAndRoute } from 'workbox-precaching';

const STATIC_CACHE_NAME = "todosApp-static.v3";
const TODOS_CACHE_NAME = "todos";

precacheAndRoute(self.__WB_MANIFEST || []);

const deleteCache = async (key) => {
    await caches.delete(key);
};

const deleteOldCaches = async () => {
    const cacheKeepList = [STATIC_CACHE_NAME, TODOS_CACHE_NAME];
    const keyList = await caches.keys();
    const cachesToDelete = keyList.filter((key) => !cacheKeepList.includes(key));
    await Promise.all(cachesToDelete.map(deleteCache));
    console.log("[Service Worker] Caches obsolètes supprimés :", cachesToDelete);
};

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
            await deleteOldCaches();
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

const putInCache = async (request, response) => {
    const cache = await caches.open(STATIC_CACHE_NAME);
    await cache.put(request, response);
};

const cacheFirst = async ({ request, preloadResponsePromise, fallbackUrl }) => {
    const responseFromCache = await caches.match(request);
    if (responseFromCache) {
        return responseFromCache;
    }

    const preloadResponse = await preloadResponsePromise;
    if (preloadResponse) {
        putInCache(request, preloadResponse.clone());
        return preloadResponse;
    }

    try {
        const responseFromNetwork = await fetch(request);
        putInCache(request, responseFromNetwork.clone());
        return responseFromNetwork;
    } catch (error) {
        const fallbackResponse = await caches.match(fallbackUrl);
        if (fallbackResponse) {
            return fallbackResponse;
        }
        return new Response("Network error happened", {
            status: 408,
            headers: { "Content-Type": "text/plain" },
        });
    }
};

self.addEventListener("fetch", (event) => {
    if (event.request.url.includes("background.css")) {
        event.respondWith(
            fetch(event.request).catch(() => {
                return new Response(".main {background: orange;}", {
                    headers: { "Content-Type": "text/css" },
                });
            })
        );
        return;
    }

    event.respondWith(
        cacheFirst({
            request: event.request,
            preloadResponsePromise: event.preloadResponse,
            fallbackUrl: "/screenshots/screenshot1.png",
        })
    );
});
