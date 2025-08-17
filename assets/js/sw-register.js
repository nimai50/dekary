// Registro del Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        // Service Worker registrado exitosamente
        
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
        // Error al registrar Service Worker
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
      // Caché limpiado
    });
  }
}

// Función para verificar estado del Service Worker
function checkSWStatus() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      registrations.forEach(registration => {
        if (registration.active) {
          // SW activo
        }
        if (registration.waiting) {
          // SW esperando
        }
        if (registration.installing) {
          // SW instalando
        }
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
