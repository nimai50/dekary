// Optimización de Imágenes y Soporte WebP
class ImageOptimizer {
  constructor() {
    this.webpSupported = this.checkWebPSupport();
    this.init();
  }

  init() {
    console.log('🔄 Optimizador de imágenes inicializado');
    
    // TEMPORALMENTE DESHABILITADO: WebP está causando errores 404
    // Hasta que confirmemos que las imágenes están disponibles en el servidor
    if (false && this.webpSupported) {
      console.log('✅ WebP soportado - Convirtiendo imágenes automáticamente');
      this.convertImagesToWebP();
    } else {
      console.log('ℹ️  WebP deshabilitado temporalmente - Usando imágenes originales');
      console.log('💡 Para reactivar: Verificar que las imágenes WebP estén disponibles en el servidor');
    }
  }

  // Verificar soporte de WebP
  checkWebPSupport() {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    } catch (e) {
      return false;
    }
  }

  // Convertir imágenes a WebP (deshabilitado temporalmente)
  convertImagesToWebP() {
    const images = document.querySelectorAll('img[src*=".png"], img[src*=".jpg"], img[src*=".jpeg"]');
    
    images.forEach(img => {
      const originalSrc = img.src;
      const webpSrc = this.getWebPSrc(originalSrc);
      
      if (webpSrc && webpSrc !== originalSrc) {
        // Crear imagen WebP para verificar si existe
        const testImg = new Image();
        testImg.onload = () => {
          img.src = webpSrc;
          console.log(`🔄 Imagen convertida a WebP: ${this.getImageName(originalSrc)}`);
        };
        testImg.onerror = () => {
          // Silenciar el error 404 - solo log interno
          console.log(`ℹ️  WebP no disponible para: ${this.getImageName(originalSrc)} - usando original`);
        };
        testImg.src = webpSrc;
      }
    });
  }

  // Obtener nombre limpio de la imagen
  getImageName(src) {
    try {
      const url = new URL(src);
      return url.pathname.split('/').pop();
    } catch (e) {
      return src.split('/').pop();
    }
  }

  // Obtener URL de WebP
  getWebPSrc(originalSrc) {
    if (originalSrc.includes('.webp')) return originalSrc;
    
    const baseUrl = originalSrc.substring(0, originalSrc.lastIndexOf('.'));
    const extension = originalSrc.substring(originalSrc.lastIndexOf('.'));
    
    if (['.png', '.jpg', '.jpeg'].includes(extension.toLowerCase())) {
      return `${baseUrl}.webp`;
    }
    
    return originalSrc;
  }

  // Comprimir imagen en el cliente
  compressImage(file, quality = 0.8, maxWidth = 1920) {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Calcular nuevas dimensiones
        let { width, height } = img;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Dibujar imagen comprimida
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convertir a blob
        canvas.toBlob(resolve, 'image/jpeg', quality);
      };
      
      img.src = URL.createObjectURL(file);
    });
  }

  // Generar thumbnail
  generateThumbnail(file, size = 150) {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = size;
        canvas.height = size;
        
        // Mantener aspect ratio
        const scale = Math.min(size / img.width, size / img.height);
        const x = (size - img.width * scale) / 2;
        const y = (size - img.height * scale) / 2;
        
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        
        canvas.toBlob(resolve, 'image/jpeg', 0.8);
      };
      
      img.src = URL.createObjectURL(file);
    });
  }

  // Optimizar imagen antes de subir
  async optimizeForUpload(file, options = {}) {
    const {
      quality = 0.8,
      maxWidth = 1920,
      generateThumbnail = true,
      thumbnailSize = 150
    } = options;

    try {
      // Comprimir imagen principal
      const compressed = await this.compressImage(file, quality, maxWidth);
      
      // Generar thumbnail si se solicita
      let thumbnail = null;
      if (generateThumbnail) {
        thumbnail = await this.generateThumbnail(file, thumbnailSize);
      }
      
      return {
        original: file,
        compressed,
        thumbnail,
        originalSize: file.size,
        compressedSize: compressed.size,
        savings: ((file.size - compressed.size) / file.size * 100).toFixed(1)
      };
    } catch (error) {
      console.error('❌ Error optimizando imagen:', error);
      return { original: file, error: error.message };
    }
  }

  // Método para reactivar WebP manualmente
  enableWebP() {
    if (this.webpSupported) {
      console.log('✅ WebP reactivado - Convirtiendo imágenes automáticamente');
      this.convertImagesToWebP();
    } else {
      console.log('❌ WebP no soportado en este navegador');
    }
  }

  // Método para verificar disponibilidad de WebP
  async checkWebPAvailability() {
    const testImages = [
      'assets/images/webp/logo.webp',
      'assets/images/webp/placeholder.webp',
      'assets/images/webp/blog image.webp'
    ];

    let availableCount = 0;
    
    for (const webpPath of testImages) {
      try {
        const response = await fetch(webpPath, { method: 'HEAD' });
        if (response.ok) {
          availableCount++;
          console.log(`✅ ${webpPath} disponible`);
        } else {
          console.log(`❌ ${webpPath} no disponible (${response.status})`);
        }
      } catch (error) {
        console.log(`❌ ${webpPath} error: ${error.message}`);
      }
    }

    if (availableCount === testImages.length) {
      console.log('🎉 Todas las imágenes WebP están disponibles - Reactivando conversión automática');
      this.enableWebP();
    } else {
      console.log(`⚠️  Solo ${availableCount}/${testImages.length} imágenes WebP disponibles`);
    }
  }
}

// Inicializar optimizador
document.addEventListener('DOMContentLoaded', () => {
  window.imageOptimizer = new ImageOptimizer();
  
  // Verificar disponibilidad de WebP después de 5 segundos
  setTimeout(() => {
    if (window.imageOptimizer) {
      window.imageOptimizer.checkWebPAvailability();
    }
  }, 5000);
});

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ImageOptimizer;
}
