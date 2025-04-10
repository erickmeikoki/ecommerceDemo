const CACHE_NAME = "ecommerce-cache-v1";
const RUNTIME_CACHE = "runtime-cache";

// Assets to cache on install
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/favicon.ico",
  "/offline.html",
  // Add your static assets here
  "/src/assets/logo.png",
  // Add any other static assets you want to cache
];

// Cache strategies
const CACHE_FIRST = "cache-first";
const NETWORK_FIRST = "network-first";
const STALE_WHILE_REVALIDATE = "stale-while-revalidate";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME, RUNTIME_CACHE];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Claim clients so the service worker starts controlling them immediately
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Handle API requests with network-first strategy
  if (event.request.url.includes("/api/")) {
    event.respondWith(networkFirstStrategy(event.request));
    return;
  }

  // Handle static assets with cache-first strategy
  if (event.request.destination === "image") {
    event.respondWith(cacheFirstStrategy(event.request));
    return;
  }

  // Default to stale-while-revalidate for other requests
  event.respondWith(staleWhileRevalidateStrategy(event.request));
});

// Network First Strategy
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(RUNTIME_CACHE);
    await cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return caches.match("/offline.html");
  }
}

// Cache First Strategy
async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(RUNTIME_CACHE);
    await cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    return caches.match("/offline.html");
  }
}

// Stale While Revalidate Strategy
async function staleWhileRevalidateStrategy(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cachedResponse = await cache.match(request);

  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      cache.put(request, networkResponse.clone());
      return networkResponse;
    })
    .catch(() => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return caches.match("/offline.html");
    });

  return cachedResponse || fetchPromise;
}

// Handle background sync
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-cart") {
    event.waitUntil(syncCart());
  }
});

async function syncCart() {
  // Implement cart synchronization logic here
  // This will run when the user comes back online
}
