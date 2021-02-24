

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/worker.js")
    .then(serviceWorker => {
      console.log("Service Worker registered: ", serviceWorker);
    })
    .catch(error => {
      console.error("Error registering the Service Worker: ", error);
    });
}
const CACHE_NAME = "V1";
const STATIC_CACHE_URLS = ["/", "style.css", "main.js","manifest.json","images"];
self.addEventListener("install", event => {
    console.log("Service Worker installing.");
    event.waitUntil(
      caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_CACHE_URLS))
    );
  });

  self.addEventListener("fetch", event => {
    // Cache-First Strategy
    event.respondWith(
      caches
        .match(event.request) // check if the request has already been cached
        .then(cached => cached || fetch(event.request)) // otherwise request network
    );
  });