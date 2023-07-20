self.addEventListener('push', event => {
    console.log('hi');
    const data = event.data.json();
    const options = {
        body: data.body,
    };
    try{
        event.waitUntil(
            self.registration.showNotification(data.title, options)
        )
    } catch(e) {
        console.error(e)
    }
    console.log(data, 'hi');

    // if (self.clients && self.clients.matchAll) {
    //     event.waitUntil(
    //         self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clients => {
    //             if (!(clients && clients.length > 0)) {
    //                 return self.registration.showNotification(data.title, options);
    //             }
    //         })
    //     );
    // } else {
    //     event.waitUntil(self.registration.showNotification(data.title, options));
    // }
});

self.addEventListener('install', event => {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});