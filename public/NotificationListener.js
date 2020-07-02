//archivo de subscribciones de notificaciones
'use strict';

self.addEventListener('push',(event) => {
    const title = "Push Tabaco ta bello";
    console.log("llego", event)
    const options = {
        body: 'Yay it works.',
        icon: 'images/icon.png',
        badge: 'images/badge.png'
    };

    event.waitUntil(self.registration.showNotification(title, options));
});