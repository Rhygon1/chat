let notifSent = false;

self.addEventListener('push', event => {
    const data = event.data.json();
    const options = {
        body: data.body
    };

    event.waitUntil(
        self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clients => {
            const isPageActive = clients.some(client => client.visibilityState === 'visible');

            if (!notifSent && !isPageActive) {
                console.log(data.title, data.body)
                notifSent = true;
                return self.registration.showNotification(data.title, options);
            }
        })
    );
});

self.addEventListener('notificationclick', event => {
    const url = 'https://qchat.onrender.com';
    event.waitUntil(clients.openWindow(url).then(() => {
        event.notification.close()
        notifSent = false;
    }));
});

self.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        notificationSent = false; // Reset the flag when the user opens the web page
    }
});

self.addEventListener('install', event => {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});