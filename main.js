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

    stopButton.addEventListener('click', () => {
        clearInterval(notificationInterval);
    });
});
