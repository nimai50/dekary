/**
 * Font Loader para Dekary.com
 * Detecta cuando las fuentes están cargadas y evita FOUT (Flash of Unstyled Text)
 */

(function() {
  'use strict';

  // Lista de fuentes a monitorear
  const fontsToLoad = [
    'Quicksand',
    'Playwrite HU'
  ];

  // Función para verificar si una fuente está cargada
  function isFontLoaded(fontFamily) {
    return document.fonts.check(`12px "${fontFamily}"`);
  }

  // Función para esperar a que todas las fuentes estén cargadas
  function waitForFonts() {
    return Promise.all(
      fontsToLoad.map(font => {
        return new Promise((resolve) => {
          if (isFontLoaded(font)) {
            resolve();
          } else {
            document.fonts.ready.then(() => {
              resolve();
            });
          }
        });
      })
    );
  }

  // Función para aplicar la clase fonts-loaded
  function applyFontsLoaded() {
    document.documentElement.classList.add('fonts-loaded');
    document.body.classList.add('fonts-loaded');
    
    // Reportar que las fuentes están cargadas
    console.log('Font Loader: Todas las fuentes cargadas');
    
    // Disparar evento personalizado
    window.dispatchEvent(new CustomEvent('fontsLoaded'));
  }

  // Función para optimizar el renderizado
  function optimizeRendering() {
    // Forzar reflow para asegurar que las fuentes se apliquen correctamente
    document.body.offsetHeight;
    
    // Aplicar optimizaciones adicionales
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
      heroText.style.visibility = 'visible';
    }
  }

  // Función principal
  function init() {
    // Verificar si las fuentes ya están cargadas
    if (document.fonts && document.fonts.ready) {
      waitForFonts().then(() => {
        applyFontsLoaded();
        optimizeRendering();
      });
    } else {
      // Fallback para navegadores que no soportan Font Loading API
      setTimeout(() => {
        applyFontsLoaded();
        optimizeRendering();
      }, 100);
    }
  }

  // Inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // También inicializar cuando la página esté completamente cargada
  window.addEventListener('load', () => {
    // Asegurar que las fuentes estén aplicadas
    if (!document.documentElement.classList.contains('fonts-loaded')) {
      applyFontsLoaded();
      optimizeRendering();
    }
  });

})();
