// Optimización de Imágenes y Soporte WebP
class ImageOptimizer {
  constructor() {
    this.webpSupported = this.checkWebPSupport();
    this.init();
  }

  // Verificar soporte de WebP
  checkWebPSupport() {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }

  init() {
    this.optimizeImages();
    this.setupResponsiveImages();
    this.setupProgressiveLoading();
  }

  // Optimizar imágenes existentes
  optimizeImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      // Agregar atributos de optimización
      if (!img.loading) {
        img.loading = 'lazy';
      }
      
      if (!img.decoding) {
        img.decoding = 'async';
      }

      // Convertir a WebP si es soportado
      if (this.webpSupported && img.src) {
        this.convertToWebP(img);
      }

      // Agregar fallback para imágenes que fallan
      img.addEventListener('error', () => {
        this.handleImageError(img);
      });
    });
  }

  // Convertir imagen a WebP
  convertToWebP(img) {
    const originalSrc = img.src;
    const webpSrc = this.getWebPUrl(originalSrc);
    
    if (webpSrc && webpSrc !== originalSrc) {
      const webpImg = new Image();
      webpImg.onload = () => {
        img.src = webpSrc;
        img.classList.add('webp');
      };
      webpImg.src = webpSrc;
    }
  }

  // Obtener URL de WebP
  getWebPUrl(originalUrl) {
    // Si ya es WebP, no hacer nada
    if (originalUrl.includes('.webp')) {
      return originalUrl;
    }

    // Intentar encontrar versión WebP
    const baseUrl = originalUrl.replace(/\.[^/.]+$/, '');
    const webpUrl = `${baseUrl}.webp`;
    
    return webpUrl;
  }

  // Manejar errores de imagen
  handleImageError(img) {
    const fallbackSrc = img.dataset.fallback || '/assets/images/placeholder.png';
    
    if (img.src !== fallbackSrc) {
      img.src = fallbackSrc;
      img.classList.add('error-fallback');
    }
  }

  // Configurar imágenes responsivas
  setupResponsiveImages() {
    const responsiveImages = document.querySelectorAll('img[data-srcset]');
    
    responsiveImages.forEach(img => {
      if (img.dataset.sizes) {
        img.sizes = img.dataset.sizes;
      }
      
      if (img.dataset.srcset) {
        img.srcset = img.dataset.srcset;
      }
    });
  }

  // Configurar carga progresiva
  setupProgressiveLoading() {
    const progressiveImages = document.querySelectorAll('img[data-progressive]');
    
    progressiveImages.forEach(img => {
      const lowResSrc = img.dataset.lowRes || img.src;
      const highResSrc = img.dataset.highRes || img.src;
      
      // Cargar versión de baja resolución primero
      if (lowResSrc && lowResSrc !== img.src) {
        img.src = lowResSrc;
        img.classList.add('progressive-low');
        
        // Cargar versión de alta resolución
        const highResImg = new Image();
        highResImg.onload = () => {
          img.src = highResSrc;
          img.classList.remove('progressive-low');
          img.classList.add('progressive-high');
        };
        highResImg.src = highResSrc;
      }
    });
  }

  // Comprimir imagen en el cliente (para subidas)
  async compressImage(file, quality = 0.8, maxWidth = 1920) {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Calcular dimensiones
        let { width, height } = img;
        
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Dibujar imagen redimensionada
        ctx.drawImage(img, 0, 0, width, height);
        
        // Comprimir
        canvas.toBlob(resolve, 'image/jpeg', quality);
      };
      
      img.src = URL.createObjectURL(file);
    });
  }

  // Generar thumbnail
  async generateThumbnail(file, size = 150) {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      canvas.width = size;
      canvas.height = size;
      
      img.onload = () => {
        // Calcular dimensiones para mantener proporción
        const ratio = Math.min(size / img.width, size / img.height);
        const newWidth = img.width * ratio;
        const newHeight = img.height * ratio;
        
        // Centrar imagen
        const x = (size - newWidth) / 2;
        const y = (size - newHeight) / 2;
        
        ctx.drawImage(img, x, y, newWidth, newHeight);
        canvas.toBlob(resolve, 'image/jpeg', 0.8);
      };
      
      img.src = URL.createObjectURL(file);
    });
  }
}

// Inicializar optimizador de imágenes
document.addEventListener('DOMContentLoaded', () => {
  window.imageOptimizer = new ImageOptimizer();
});

// Función global para comprimir imágenes
window.compressImage = async (file, quality, maxWidth) => {
  if (window.imageOptimizer) {
    return await window.imageOptimizer.compressImage(file, quality, maxWidth);
  }
};

// Función global para generar thumbnails
window.generateThumbnail = async (file, size) => {
  if (window.imageOptimizer) {
    return await window.imageOptimizer.generateThumbnail(file, size);
  }
};
