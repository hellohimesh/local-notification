if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
            console.error('Service Worker registration failed:', error);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    const testNotificationButton = document.getElementById('testNotificationButton'); // Get the test notification button
    testNotificationButton.addEventListener('click', () => {
        showLocalNotification('Test Notification', 'This is a test notification.');
    });
    startButton.addEventListener('click', () => {
        navigator.serviceWorker.ready.then(registration => {
            registration.sync.register('notification-sync')
                .then(() => {
                    console.log('Background sync registered');
                })
                .catch(err => {
                    console.error('Background sync registration failed:', err);
                });
        });
    });
    function showLocalNotification(title, message) {
        if ('Notification' in window) {
            Notification.requestPermission().then(permission => {
                console.log('Notification permission:', permission);
                if (permission === 'granted') {
                    const options = {
                        body: message,
                        icon: 'icon.png',
                    };
                    new Notification(title, options);
                }
            });
        }
    }
    stopButton.addEventListener('click', () => {
        clearInterval(notificationInterval);
    });
});
