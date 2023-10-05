self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('my-cache').then(cache => {
            return cache.addAll([
                '/',
                'index.html',
                'style.css',
                'main.js',
                'icon.png'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('sync', event => {
    if (event.tag === 'notification-sync') {
        event.waitUntil(sendNotification());
    }
});

function sendNotification() {
    return self.registration.showNotification('PWA Notification', {
        body: 'This is a local notification.',
        icon: 'icon.png',
    });
}
