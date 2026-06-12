const STATIC_CACHE = "pppp-static-v6";
const RUNTIME_CACHE = "pppp-runtime-v6";
const MAX_RUNTIME_ITEMS = 100;

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

/* INSTALL */
self.addEventListener("install", event => {
event.waitUntil(
caches.open(STATIC_CACHE)
.then(cache => cache.addAll(urlsToCache))
.catch(error => {
console.error("Cache install failed:", error);
})
);

self.skipWaiting();
});

/* ACTIVATE */
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

/* CACHE LIMITER */
async function trimCache(cacheName, maxItems) {
const cache = await caches.open(cacheName);
const keys = await cache.keys();

if (keys.length > maxItems) {
await cache.delete(keys[0]);
await trimCache(cacheName, maxItems);
}
}

/* FETCH */
self.addEventListener("fetch", event => {

if (event.request.method !== "GET") {
return;
}

const url = new URL(event.request.url);

if (url.origin !== self.location.origin) {
return;
}

/* Navigation Requests */
if (event.request.mode === "navigate") {

event.respondWith(
  fetch(event.request)
    .then(response => {

      const clone = response.clone();

      caches.open(RUNTIME_CACHE)
        .then(cache => {
          cache.put(event.request, clone);
        });

      return response;

    })
    .catch(async () => {

      const cached =
        await caches.match(event.request);

      if (cached) {
        return cached;
      }

      return caches.match(
        "/pppp_bangladesh/offline.html"
      );

    })
);

return;

}

/* Cache First for Assets */
event.respondWith(

caches.match(event.request)
  .then(cachedResponse => {

    if (cachedResponse) {
      return cachedResponse;
    }

    return fetch(event.request)
      .then(async networkResponse => {

        if (
          !networkResponse ||
          networkResponse.status !== 200
        ) {
          return networkResponse;
        }

        const responseClone =
          networkResponse.clone();

        const cache =
          await caches.open(
            RUNTIME_CACHE
          );

        await cache.put(
          event.request,
          responseClone
        );

        await trimCache(
          RUNTIME_CACHE,
          MAX_RUNTIME_ITEMS
        );

        return networkResponse;

      });

  })
  .catch(async () => {

    if (
      event.request.destination ===
      "image"
    ) {
      return caches.match(
        "/pppp_bangladesh/offline.png"
      );
    }

    return new Response(
      "Offline",
      {
        status: 503,
        statusText: "Offline"
      }
    );

  })

);

});

/* BACKGROUND SYNC */
self.addEventListener("sync", event => {

if (
event.tag ===
"pppp-background-sync"
) {

event.waitUntil(
  fetch("/pppp_bangladesh/")
    .then(() => {
      console.log(
        "Background Sync Complete"
      );
    })
    .catch(error => {
      console.error(
        "Background Sync Error:",
        error
      );
    })
);

}
});

/* PERIODIC SYNC */
self.addEventListener(
"periodicsync",
event => {

if (
  event.tag ===
  "pppp-periodic-sync"
) {

  event.waitUntil(
    fetch("/pppp_bangladesh/")
      .then(() => {
        console.log(
          "Periodic Sync Complete"
        );
      })
      .catch(error => {
        console.error(
          "Periodic Sync Error:",
          error
        );
      })
  );
}

}
);

/* PUSH NOTIFICATION */
self.addEventListener(
"push",
event => {

let data = {
  title: "PPPP Bangladesh",
  body: "New update available",
  url: "/pppp_bangladesh/"
};

if (event.data) {

  try {
    data = event.data.json();
  } catch {

    data.body =
      event.data.text();

  }
}

event.waitUntil(

  self.registration
    .showNotification(
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

}
);

/* NOTIFICATION CLICK */
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