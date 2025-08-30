/**
 * LCP (Largest Contentful Paint) Optimizer
 * Carga las imágenes críticas de forma prioritaria para mejorar el LCP
 */

(function() {
  'use strict';

  // Lista de imágenes críticas para LCP
  const criticalImages = [
    'assets/images/logo.svg',
    'assets/images/Hola.svg'
  ];

  // Función para precargar imágenes críticas
  function preloadCriticalImages() {
    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }

  // Función para optimizar carga de imágenes decorativas
  function optimizeDecorativeImages() {
    const decorativeImages = document.querySelectorAll('.sol, .flor-azul, .flor-amarilla, .flor-aqua, .flor-morada, .flor-naranja, .flor-rosa');
    
    decorativeImages.forEach(img => {
      // Asegurar que las imágenes tengan dimensiones reservadas
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

  // Función para optimizar el hero
  function optimizeHero() {
    const hero = document.querySelector('.hero-home');
    const heroText = document.querySelector('.hero-text');
    
    if (hero && heroText) {
      // Asegurar que el hero tenga dimensiones estables
      hero.style.minHeight = '100vh';
      heroText.style.minHeight = '200px';
    }
  }

  // Función para detectar y reportar CLS
  function detectCLS() {
    let clsValue = 0;
    let clsEntries = [];
    
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          clsEntries.push(entry);
        }
      }
      
      // Reportar CLS si es alto
      if (clsValue > 0.1) {
        console.warn('CLS detectado:', clsValue, 'Entradas:', clsEntries);
      }
    });
    
    observer.observe({ entryTypes: ['layout-shift'] });
  }

  // Inicializar optimizaciones cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      preloadCriticalImages();
      optimizeDecorativeImages();
      optimizeHero();
      detectCLS();
    });
  } else {
    preloadCriticalImages();
    optimizeDecorativeImages();
    optimizeHero();
    detectCLS();
  }

  // Optimizaciones adicionales cuando la página esté completamente cargada
  window.addEventListener('load', function() {
    // Asegurar que todas las imágenes estén optimizadas
    optimizeDecorativeImages();
    
    // Reportar métricas de rendimiento
    if ('performance' in window) {
      const perfData = performance.getEntriesByType('navigation')[0];
      if (perfData) {
        console.log('LCP Optimizer: Página cargada en', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
      }
    }
  });

})();
