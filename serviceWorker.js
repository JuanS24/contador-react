const CACHE_ELEMENTS = [
  "./",
  "https://unpkg.com/react@17/umd/react.production.min.js",
  "https://unpkg.com/react-dom@17/umd/react-dom.production.min.js",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css",
  "https://unpkg.com/@babel/standalone/babel.min.js",
  "./estilos.css",
  "./components/Contador.js",
];
const CACHE_NAME = "v1_cache_contador_react";

self.addEventListener("install", (e) => {
  e.waitUntil(
    //esperamos a ejecutar al cache del navegador
    caches.open(CACHE_NAME).then((cache) => {
      //agregamos las rutas al cache
      cache
        .addAll(CACHE_ELEMENTS)
        .then(() => {
          self.skipWaiting();
          //catcheamos el error si hubiera
        })
        .catch(console.log);
    })
  );
});

//Activamos el ServiceWorker cache
self.addEventListener("activate", (e) => {
  const cacheWhiteList = [CACHE_NAME];

  e.waitUntil(
    //esperamos a ejecutar al cache del navegador
    //Capturamos los caches y hacemos una comparacion
    caches
      .keys()
      .then((cacheNames) => {
        //Recibimos un array para resolver todas las promesas
        return Promise.all(
          cacheNames.map((cacheName) => {
            return (
              cacheWhiteList.indexOf(cacheName) === -1 &&
              caches.delete(cacheName)
            );
          })
        );
      })
      .then(() => self.clients.claim)
  );
});

//disparamos el cache
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      if (res) {
        return res;
      }
      return fetch(e.request);
    })
  );
});
