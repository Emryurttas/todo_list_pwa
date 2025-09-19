const STATIC_CACHE_NAME = "todosApp-static.v0";

const addResourcesToCache = async (resources) => {
  const cache = await caches.open(STATIC_CACHE_NAME);
  await cache.addAll(resources);
};

const putInCache = async (request, response) => {
  const cache = await caches.open(STATIC_CACHE_NAME);
  await cache.put(request, response);
};

const cacheFirst = async ({ request, preloadResponsePromise, fallbackUrl }) => {
  // Pour commencer on essaie d'obtenir la ressource depuis le cache
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }

  // Ensuite, on tente d'utiliser et de mettre en cache
  // la réponse préchargée si elle existe
  const preloadResponse = await preloadResponsePromise;
  if (preloadResponse) {
    console.info("using preload response", preloadResponse);
    putInCache(request, preloadResponse.clone());
    return preloadResponse;
  }

  // Ensuite, on tente de l'obtenir du réseau
  try {
    const responseFromNetwork = await fetch(request);
    // Une réponse ne peut être utilisée qu'une fois
    // On la clone pour en mettre une copie en cache
    // et servir l'originale au navigateur
    putInCache(request, responseFromNetwork.clone());
    return responseFromNetwork;
  } catch (error) {
    const fallbackResponse = await caches.match(fallbackUrl);
    if (fallbackResponse) {
      return fallbackResponse;
    }
    // Quand il n'y a même pas de contenu par défaut associé
    // on doit tout de même renvoyer un objet Response
    return new Response("Network error happened", {
      status: 408,
      headers: { "Content-Type": "text/plain" },
    });
  }
};

// On active le préchargement à la navigation
const enableNavigationPreload = async () => {
  if (self.registration.navigationPreload) {
    await self.registration.navigationPreload.enable();
  }
};

self.addEventListener("activate", (event) => {
  event.waitUntil(enableNavigationPreload());
});


self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installation en cours");
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
      "/screenshots/screenshot1.png"
    ])
  );
});
self.addEventListener("fetch", (event) => {
  event.respondWith(
    cacheFirst({
      request: event.request,
      preloadResponsePromise: event.preloadResponse,
      fallbackUrl: "/screenshots/screenshot1.png",
    }),
  );
});
// self.skipWaiting();
