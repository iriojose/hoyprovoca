//archivo de subscribciones de notificaciones
'use strict';

self.addEventListener('push',() => {
    const title = 'Push Codelab';
    
    const options = {
        body: 'Yay it works.',
        icon: 'images/icon.png',
        badge: 'images/badge.png'
    };

    event.waitUntil(self.registration.showNotification(title, options));
});