const CACHE_NAME = 'dekary-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/tienda.html',
  '/componentes.html',
  '/404.html',
  '/assets/css/shared-base.css',
  '/assets/css/shared-layout.css',
  '/assets/css/home.css',
  '/assets/css/tienda.css',
  '/assets/css/componentes.css',
  '/assets/css/404.css',
  '/assets/css/blog.css',
  '/assets/css/fontawesome.css',
  '/assets/css/contact-forms.css',
  '/assets/css/animate.css',
  '/assets/js/bootstrap.bundle.min.js',
  '/assets/images/logo.svg',
  '/assets/images/favicon.ico'
];

// Instalación del Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Activación y limpieza de caches antiguos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Estrategia de caché: Network First, fallback a cache
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Si la respuesta es válida, la guardamos en caché
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
        }
        return response;
      })
      .catch(() => {
        // Si falla la red, intentamos desde caché
        return caches.match(event.request);
      })
  );
});

// Estrategia específica para CSS crítico
self.addEventListener('fetch', event => {
  if (event.request.url.includes('.css')) {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) {
            // CSS desde caché para carga rápida
            return response;
          }
          return fetch(event.request);
        })
    );
  }
});

// Estrategia para imágenes
self.addEventListener('fetch', event => {
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) {
            return response;
          }
          return fetch(event.request)
            .then(response => {
              if (response && response.status === 200) {
                const responseToCache = response.clone();
                caches.open(CACHE_NAME)
                  .then(cache => {
                    cache.put(event.request, responseToCache);
                  });
              }
              return response;
            });
        })
    );
  }
});
