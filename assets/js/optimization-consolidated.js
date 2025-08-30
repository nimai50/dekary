/* ===== SCRIPT DE OPTIMIZACIÓN CONSOLIDADO - DEKARY.COM ===== */
/* Este archivo incluye solo la funcionalidad esencial para evitar JavaScript innecesario */

// Configuración global de optimización
window.DekaryOptimizer = {
  // Estado de inicialización
  initialized: false,
  
  // Configuración
  config: {
    lazyLoading: true,
    imageOptimization: true,
    mobileOptimization: true,
    serviceWorker: true
  }
};

// Función principal de inicialización
function initializeOptimizations() {
  if (window.DekaryOptimizer.initialized) return;
  
  console.log('🚀 Inicializando optimizaciones de Dekary...');
  
  // 1. Lazy Loading de imágenes
  if (window.DekaryOptimizer.config.lazyLoading) {
    initializeLazyLoading();
  }
  
  // 2. Optimización de imágenes críticas
  if (window.DekaryOptimizer.config.imageOptimization) {
    optimizeCriticalImages();
  }
  
  // 3. Optimizaciones móviles
  if (window.DekaryOptimizer.config.mobileOptimization) {
    initializeMobileOptimizations();
  }
  
  // 4. Service Worker
  if (window.DekaryOptimizer.config.serviceWorker && 'serviceWorker' in navigator) {
    initializeServiceWorker();
  }
  
  window.DekaryOptimizer.initialized = true;
  console.log('✅ Optimizaciones de Dekary inicializadas');
}

// Lazy Loading simplificado
function initializeLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback para navegadores antiguos
    images.forEach(img => {
      img.src = img.dataset.src || img.src;
    });
  }
}

// Optimización de imágenes críticas
function optimizeCriticalImages() {
  const criticalImages = document.querySelectorAll('img[src*="logo"], img[src*="Hola"]');
  
  criticalImages.forEach(img => {
    if (img.complete) {
      img.style.opacity = '1';
    } else {
      img.addEventListener('load', function() {
        this.style.opacity = '1';
      });
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.3s ease-in';
    }
  });
}

// Optimizaciones móviles
function initializeMobileOptimizations() {
  // Detectar dispositivo móvil
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    // Optimizaciones específicas para móvil
    document.body.classList.add('mobile-device');
    
    // Reducir animaciones en móvil
    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 768px) {
        * { animation-duration: 0.3s !important; }
        .hero-home { height: 80vh !important; }
      }
    `;
    document.head.appendChild(style);
  }
}

// Service Worker simplificado
function initializeServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('✅ Service Worker registrado:', registration.scope);
        })
        .catch(error => {
          console.log('❌ Error al registrar Service Worker:', error);
        });
    });
  }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeOptimizations);
} else {
  initializeOptimizations();
}

// Inicializar optimizaciones adicionales después de la carga completa
window.addEventListener('load', () => {
  // Optimizaciones post-carga
  console.log('🎯 Optimizaciones post-carga completadas');
});

// Exportar para uso global
window.DekaryOptimizer.init = initializeOptimizations;
