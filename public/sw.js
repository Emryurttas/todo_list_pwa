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
      "/index.html",
      "/css/style.css",
      "/src/main.jsx",
      "/icons/favicon.ico",
      "/js/app.js",
      "/icons/icon-512x512.png",
      "/icons/apple-touch-icon-180x180.png",
      "/icons/pwa-192x192.png",
      "/icons/pwa-512x512.png",
      "/icons/pwa-64x64.png",
      "/manifest.json"
    ])
  );
  self.skipWaiting();
});
