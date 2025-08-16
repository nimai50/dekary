// Registro del Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registrado exitosamente:', registration.scope);
        
        // Verificar actualizaciones
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // Nueva versión disponible
              showUpdateNotification();
            }
          });
        });
      })
      .catch(error => {
        console.log('Error al registrar Service Worker:', error);
      });
  });
}

// Notificación de actualización
function showUpdateNotification() {
  if (Notification.permission === 'granted') {
    new Notification('Dekary Actualizado', {
      body: 'Hay una nueva versión disponible. Recarga la página para actualizar.',
      icon: '/assets/images/favicon.ico'
    });
  }
}

// Solicitar permisos de notificación
function requestNotificationPermission() {
  if ('Notification' in window) {
    Notification.requestPermission();
  }
}

// Función para limpiar caché manualmente
function clearCache() {
  if ('caches' in window) {
    caches.keys().then(cacheNames => {
      cacheNames.forEach(cacheName => {
        caches.delete(cacheName);
      });
      console.log('Caché limpiado');
    });
  }
}

// Función para verificar estado del Service Worker
function checkSWStatus() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      console.log('Service Workers registrados:', registrations.length);
      registrations.forEach(registration => {
        console.log('SW activo:', registration.active);
        console.log('SW esperando:', registration.waiting);
        console.log('SW instalando:', registration.installing);
      });
    });
  }
}

// Exportar funciones para uso global
window.DekarySW = {
  clearCache,
  checkSWStatus,
  requestNotificationPermission
};
