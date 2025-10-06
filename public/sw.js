const STATIC_CACHE_NAME = "todosApp-static.v2";

const addResourcesToCache = async (resources) => {
    const cache = await caches.open(STATIC_CACHE_NAME);
    await cache.addAll(resources);
};

self.addEventListener("install", (event) => {
    console.log("[Service Worker] Installation en cours...");
    event.waitUntil(
        addResourcesToCache([
            "/",
            "/css/style.css",
            "/js/app.js",

            "/icons/apple-touch-icon-180x180.png",
            "/icons/favicon.ico",
            "/icons/icon-512x512.png",
            "/icons/maskable-icon-512x512.png",
            "/icons/pwa-64x64.png",
            "/icons/pwa-192x192.png",
            "/icons/pwa-512x512.png",

            "/manifest.json",
            "/screenshots/screenshot1.png",
        ])
    );
    self.skipWaiting();
});

const deleteCache = async (key) => {
    await caches.delete(key);
};

const deleteOldCaches = async () => {
    const cacheKeepList = [STATIC_CACHE_NAME];
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
        console.info("Using preload response", preloadResponse);
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
