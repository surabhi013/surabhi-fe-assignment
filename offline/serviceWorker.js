const cacheName = 'site-cache';

const cacheAssets = [
    '/',
    '/pages/index.js',
    '/public/images/favicon.ico'
];

// Call Install Event
self.addEventListener('install', e => {
    e.waitUntil(caches.open(cacheName)
        .then(cache => {
            // Add assets to cache
            cache.addAll(cacheAssets);
        })
        .then(() => self.skipWaiting())
    );
});

// Call Activate Event
self.addEventListener('activate', e => {
    // Remove unwanted caches
    e.waitUntil( caches.keys().then(cacheNames => {
        return Promise.all(cacheNames.map(cache => {
            if (cache !== cacheName) {
                return caches.delete(cache);
            }
        }));
    }));
});

// Call Fetch Event
self.addEventListener('fetch', e => {
    e.respondWith(fetch(e.request).then(res => {
        // Clone the response and add to cache
        const resClone = res.clone();
        caches.open(cacheName).then(cache => {
            cache.put(e.request, resClone);
        });
        return res;
    })
    .catch(err => caches.match(e.request).then(res => res)));
});
