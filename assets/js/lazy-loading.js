// Lazy Loading de Imágenes
class LazyLoader {
  constructor() {
    this.images = document.querySelectorAll('img[data-src]');
    this.observer = null;
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(this.handleIntersection.bind(this), {
        rootMargin: '50px 0px',
        threshold: 0.01
      });
      
      this.images.forEach(img => this.observer.observe(img));
    } else {
      // Fallback para navegadores antiguos
      this.loadAllImages();
    }
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.loadImage(entry.target);
        this.observer.unobserve(entry.target);
      }
    });
  }

  loadImage(img) {
    const src = img.dataset.src;
    if (!src) return;

    // Crear imagen temporal para precarga
    const tempImage = new Image();
    
    tempImage.onload = () => {
      img.src = src;
      img.classList.add('loaded');
      img.removeAttribute('data-src');
      
      // Aplicar animación de fade-in
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.3s ease-in';
      
      setTimeout(() => {
        img.style.opacity = '1';
      }, 10);
    };

    tempImage.onerror = () => {
      img.classList.add('error');
    };

    tempImage.src = src;
  }

  loadAllImages() {
    this.images.forEach(img => this.loadImage(img));
  }

  // Método para recargar imágenes
  refresh() {
    this.images = document.querySelectorAll('img[data-src]');
    this.images.forEach(img => this.observer.observe(img));
  }
}

// Lazy Loading de CSS
class CSSLazyLoader {
  constructor() {
    this.cssLinks = document.querySelectorAll('link[data-href]');
    this.init();
  }

  init() {
    this.cssLinks.forEach(link => {
      if (this.isElementInViewport(link)) {
        this.loadCSS(link);
      }
    });
  }

  isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  loadCSS(link) {
    const href = link.dataset.href;
    if (!href) return;

    link.href = href;
    link.removeAttribute('data-href');
    link.classList.add('loaded');
  }
}

// Lazy Loading de JavaScript
class JSLazyLoader {
  constructor() {
    this.scripts = document.querySelectorAll('script[data-src]');
    this.init();
  }

  init() {
    this.scripts.forEach(script => {
      if (this.isElementInViewport(script)) {
        this.loadScript(script);
      }
    });
  }

  isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  loadScript(script) {
    const src = script.dataset.src;
    if (!src) return;

    const newScript = document.createElement('script');
    newScript.src = src;
    newScript.async = true;
    
    if (script.dataset.defer) {
      newScript.defer = true;
    }

    script.parentNode.replaceChild(newScript, script);
  }
}

// Inicializar lazy loading cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // Lazy loading de imágenes
  window.lazyImageLoader = new LazyLoader();
  
  // Lazy loading de CSS
  window.lazyCSSLoader = new CSSLazyLoader();
  
  // Lazy loading de JavaScript
  window.lazyJSLoader = new JSLazyLoader();
});

// Lazy loading de imágenes con Intersection Observer v2 (si está disponible)
if ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img.lazy');
    lazyImages.forEach(img => imageObserver.observe(img));
  });
}
