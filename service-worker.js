```javascript
const CACHE_NAME = "pppp-cache-v2";

const urlsToCache = [
  "/pppp_bangladesh/",
  "/pppp_bangladesh/index.html",
  "/pppp_bangladesh/site.webmanifest",
  "/pppp_bangladesh/web-app-manifest-192x192.png",
  "/pppp_bangladesh/web-app-manifest-512x512.png",
  "/pppp_bangladesh/icon-maskable-512.png"
];

/* Install */
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );

  self.skipWaiting();
});

/* Activate */
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );

  self.clients.claim();
});

/* Fetch - Offline First */
self.addEventListener("fetch", event => {

  /* Cache only GET requests */
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {

        if (response) {
          return response;
        }

        return fetch(event.request)
          .then(networkResponse => {

            if (!networkResponse || networkResponse.status !== 200) {
              return networkResponse;
            }

            const responseClone = networkResponse.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseClone);
              });

            return networkResponse;
          });

      })
      .catch(() => {
        return caches.match("/pppp_bangladesh/index.html");
      })
  );
});

/* Background Sync */
self.addEventListener("sync", event => {
  if (event.tag === "pppp-background-sync") {
    event.waitUntil(
      fetch("/pppp_bangladesh/")
        .then(() => console.log("Background Sync Complete"))
        .catch(err => console.error("Background Sync Error:", err))
    );
  }
});

/* Periodic Background Sync */
self.addEventListener("periodicsync", event => {
  if (event.tag === "pppp-periodic-sync") {
    event.waitUntil(
      fetch("/pppp_bangladesh/")
        .then(() => console.log("Periodic Sync Complete"))
        .catch(err => console.error("Periodic Sync Error:", err))
    );
  }
});

/* Push Notifications */
self.addEventListener("push", event => {

  let data = {
    title: "PPPP Bangladesh",
    body: "New update available",
    url: "/pppp_bangladesh/"
  };

  if (event.data) {
    try {
      data = event.data.json();
    } catch (error) {
      data.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/pppp_bangladesh/web-app-manifest-192x192.png",
      badge: "/pppp_bangladesh/web-app-manifest-192x192.png",
      data: {
        url: data.url
      }
    })
  );
});

/* Notification Click */
self.addEventListener("notificationclick", event => {

  event.notification.close();

  event.waitUntil(
    clients.openWindow(
      event.notification.data?.url || "/pppp_bangladesh/"
    )
  );
});
```