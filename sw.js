// sw.js
const CACHE_NAME = 'shubarium-cache-v1';
const ASSETS_TO_CACHE = [
  '/',               // Главная страница
  '/index.html',     // Версия с путями, актуальными для GitHub Pages
  '/style.css',
  '/loader.js',
  '/assets/models/tripo.glb', // 3D-модель
  // Добавьте другие файлы (изображения, иконки, шрифты) при необходимости
];

// Установка Service Worker (загрузка файлов в кэш)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Активация Service Worker (очистка старых кэшей, если нужно)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Обработка запросов (Offline-first)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Если в кэше есть ресурс, используем его, иначе запросим из сети
      return cachedResponse || fetch(event.request);
    })
  );
});
