const CACHE_NAME = "tussie-mussie-v2";

const urlsToCache = [
  "/",
  "/index.html",
  "/cart.html",
  "/style.css",
  "/app.js",
  "/manifest.json",
  "/flo.png",
  "/ro.png",
  "/sun.png",
  "/da.png",
  "/dai.png",
  "/or.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Cache-first for static files; let the browser handle page navigations
self.addEventListener("fetch", event => {
  const request = event.request;

  // For page loads (index.html, cart.html, etc.), don't interfere
  if (request.mode === "navigate") {
    return; // fall back to default network behavior
  }

  // For CSS/JS/images, use cache-first
  event.respondWith(
    caches.match(request).then(response => {
      if (response) return response;
      return fetch(request).then(networkResponse => {
        const copy = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        return networkResponse;
      });
    })
  );
});