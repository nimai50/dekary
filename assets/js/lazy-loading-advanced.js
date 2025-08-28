/**
 * 🚀 LAZY LOADING AVANZADO PARA DEKARY.COM
 * Sistema de carga diferida de imágenes con Intersection Observer
 * Optimiza el rendimiento y mejora Core Web Vitals
 */

class AdvancedLazyLoader {
  constructor() {
    this.images = [];
    this.observer = null;
    this.options = {
      root: null,
      rootMargin: '50px',
      threshold: 0.1
    };
    
    this.init();
  }

  init() {
    // Verificar soporte del navegador
    if (!('IntersectionObserver' in window)) {
      this.fallbackLazyLoading();
      return;
    }

    this.setupIntersectionObserver();
    this.findImages();
    this.observeImages();
    
    console.log('🚀 Lazy Loader Avanzado inicializado');
  }

  setupIntersectionObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage(entry.target);
          this.observer.unobserve(entry.target);
        }
      });
    }, this.options);
  }

  findImages() {
    // Buscar todas las imágenes con data-src o data-srcset
    this.images = document.querySelectorAll('img[data-src], img[data-srcset]');
    
    // También buscar imágenes con clase lazy
    const lazyImages = document.querySelectorAll('img.lazy');
    lazyImages.forEach(img => {
      if (!this.images.includes(img)) {
        this.images.push(img);
      }
    });

    console.log(`📸 Encontradas ${this.images.length} imágenes para lazy loading`);
  }

  observeImages() {
    this.images.forEach(img => {
      // Agregar placeholder si no existe
      this.addPlaceholder(img);
      
      // Observar la imagen
      this.observer.observe(img);
    });
  }

  addPlaceholder(img) {
    // Crear placeholder con dimensiones
    if (!img.style.width && !img.style.height) {
      const aspectRatio = img.dataset.aspectRatio || '16/9';
      const [width, height] = aspectRatio.split('/');
      const ratio = (height / width) * 100;
      
      img.style.backgroundColor = '#f0f0f0';
      img.style.backgroundImage = 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)';
      img.style.backgroundSize = '20px 20px';
      img.style.backgroundPosition = '0 0, 0 10px, 10px -10px, -10px 0px';
      
      // Agregar indicador de carga
      img.style.position = 'relative';
      const loader = document.createElement('div');
      loader.className = 'lazy-loader';
      loader.innerHTML = '🔄';
      loader.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 24px;
        color: #666;
        z-index: 1;
      `;
      img.parentNode.style.position = 'relative';
      img.parentNode.appendChild(loader);
    }
  }

  loadImage(img) {
    return new Promise((resolve, reject) => {
      const src = img.dataset.src || img.src;
      const srcset = img.dataset.srcset;
      
      if (!src) {
        reject(new Error('No source found for image'));
        return;
      }

      // Crear nueva imagen para precarga
      const tempImage = new Image();
      
      tempImage.onload = () => {
        // Imagen cargada exitosamente
        this.applyImage(img, tempImage, src, srcset);
        this.removeLoader(img);
        resolve(img);
      };

      tempImage.onerror = () => {
        // Error al cargar la imagen
        this.handleImageError(img);
        reject(new Error(`Failed to load image: ${src}`));
      };

      // Cargar imagen
      if (srcset) {
        tempImage.srcset = srcset;
        tempImage.sizes = img.dataset.sizes || '100vw';
      }
      tempImage.src = src;
    });
  }

  applyImage(img, tempImage, src, srcset) {
    // Aplicar la imagen cargada
    if (srcset) {
      img.srcset = srcset;
      img.sizes = tempImage.sizes;
    }
    img.src = src;
    
    // Remover atributos de lazy loading
    img.removeAttribute('data-src');
    img.removeAttribute('data-srcset');
    img.removeAttribute('data-sizes');
    img.classList.remove('lazy');
    
    // Agregar clase de imagen cargada
    img.classList.add('lazy-loaded');
    
    // Aplicar animación de fade-in
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease-in-out';
    
    setTimeout(() => {
      img.style.opacity = '1';
    }, 50);
  }

  removeLoader(img) {
    const loader = img.parentNode.querySelector('.lazy-loader');
    if (loader) {
      loader.remove();
    }
  }

  handleImageError(img) {
    // Manejar error de carga
    img.style.backgroundColor = '#f8f8f8';
    img.style.border = '2px dashed #ccc';
    
    // Agregar texto de error
    const errorText = document.createElement('div');
    errorText.textContent = 'Error al cargar imagen';
    errorText.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #999;
      font-size: 12px;
      text-align: center;
    `;
    
    img.parentNode.appendChild(errorText);
  }

  fallbackLazyLoading() {
    console.log('⚠️ Intersection Observer no soportado, usando fallback');
    
    // Implementar lazy loading básico con scroll
    this.images = document.querySelectorAll('img[data-src], img[data-srcset]');
    
    const checkImages = () => {
      this.images.forEach(img => {
        if (this.isInViewport(img)) {
          this.loadImage(img);
        }
      });
    };

    // Verificar en scroll y resize
    window.addEventListener('scroll', checkImages);
    window.addEventListener('resize', checkImages);
    
    // Verificación inicial
    checkImages();
  }

  isInViewport(img) {
    const rect = img.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Método para recargar imágenes (útil para SPA)
  reload() {
    this.images = [];
    this.findImages();
    this.observeImages();
  }

  // Método para destruir el observer
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.dekaryLazyLoader = new AdvancedLazyLoader();
  });
} else {
  window.dekaryLazyLoader = new AdvancedLazyLoader();
}

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AdvancedLazyLoader;
}
