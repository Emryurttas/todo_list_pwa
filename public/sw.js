const STATIC_CACHE_NAME = "todosApp-static.v0";

const addResourcesToCache = async (resources) => {
  const cache = await caches.open(STATIC_CACHE_NAME);
  await cache.addAll(resources);
};

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
  self.skipWaiting();
});
