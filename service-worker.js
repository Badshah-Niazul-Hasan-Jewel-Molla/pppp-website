const STATIC_CACHE = "pppp-static-v4";
const RUNTIME_CACHE = "pppp-runtime-v4";

const urlsToCache = [
  "/pppp_bangladesh/",
  "/pppp_bangladesh/index.html",
  "/pppp_bangladesh/offline.html",
  "/pppp_bangladesh/site.webmanifest",

  "/pppp_bangladesh/web-app-manifest-192x192.png",
  "/pppp_bangladesh/web-app-manifest-512x512.png",
  "/pppp_bangladesh/icon-maskable-512.png",

  "/pppp_bangladesh/offline.png",

  "/pppp_bangladesh/screenshots/home.png",
  "/pppp_bangladesh/screenshots/about.png",
  "/pppp_bangladesh/screenshots/leadership.png",
  "/pppp_bangladesh/screenshots/membership.png",
  "/pppp_bangladesh/screenshots/contact.png"
];

/* Install */
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(urlsToCache))
  );

  self.skipWaiting();
});

/* Activate */
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (
            key !== STATIC_CACHE &&
            key !== RUNTIME_CACHE
          ) {
            return caches.delete(key);
          }
        })
      )
    )
  );

  self.clients.claim();
});

/* Fetch */
self.addEventListener("fetch", event => {

  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(

    caches.match(event.request)
      .then(cachedResponse => {

        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request)
          .then(networkResponse => {

            if (
              !networkResponse ||
              networkResponse.status !== 200
            ) {
              return networkResponse;
            }

            const responseClone =
              networkResponse.clone();

            caches.open(RUNTIME_CACHE)
              .then(cache => {
                cache.put(
                  event.request,
                  responseClone
                );
              });

            return networkResponse;
          });

      })
      .catch(() => {

        /* Offline page fallback */
        if (event.request.mode === "navigate") {
          return caches.match(
            "/pppp_bangladesh/offline.html"
          );
        }

        /* Offline image fallback */
        if (
          event.request.destination === "image"
        ) {
          return caches.match(
            "/pppp_bangladesh/offline.png"
          );
        }

      })
  );
});

/* Background Sync */
self.addEventListener("sync", event => {

  if (event.tag === "pppp-background-sync") {

    event.waitUntil(
      fetch("/pppp_bangladesh/")
        .then(() => {
          console.log(
            "Background Sync Complete"
          );
        })
        .catch(error => {
          console.error(error);
        })
    );
  }
});

/* Periodic Background Sync */
self.addEventListener("periodicsync", event => {

  if (event.tag === "pppp-periodic-sync") {

    event.waitUntil(
      fetch("/pppp_bangladesh/")
        .then(() => {
          console.log(
            "Periodic Sync Complete"
          );
        })
        .catch(error => {
          console.error(error);
        })
    );
  }
});

/* Push Notification */
self.addEventListener("push", event => {

  let data = {
    title: "PPPP Bangladesh",
    body: "New update available",
    url: "/pppp_bangladesh/"
  };

  if (event.data) {
    try {
      data = event.data.json();
    } catch {
      data.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(
      data.title,
      {
        body: data.body,
        icon:
          "/pppp_bangladesh/web-app-manifest-192x192.png",
        badge:
          "/pppp_bangladesh/web-app-manifest-192x192.png",
        data: {
          url: data.url
        }
      }
    )
  );
});

/* Notification Click */
self.addEventListener(
  "notificationclick",
  event => {

    event.notification.close();

    event.waitUntil(
      clients.openWindow(
        event.notification.data?.url ||
        "/pppp_bangladesh/"
      )
    );
  }
);