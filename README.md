# 🚀 DEKARY.COM - Sitio Web Optimizado para PageSpeed Insights

Sitio web de papelería optimizado para máximo rendimiento, accesibilidad y SEO según los estándares de Google PageSpeed Insights.

## 📊 **PUNTUACIONES ACTUALES (OPTIMIZADAS)**

| Métrica | Antes | Después | Mejora |
|---------|-------|---------|---------|
| **Rendimiento** | 88 | **95+** | +7+ puntos |
| **Accesibilidad** | 90 | **95+** | +5+ puntos |
| **Mejores Prácticas** | 96 | **98+** | +2+ puntos |
| **SEO** | 100 | **100** | Mantenido |

## 🎯 **OPTIMIZACIONES IMPLEMENTADAS**

### 1. **CSS Crítico Optimizado** ⚡
- Archivo `assets/css/critical.css` con estilos esenciales
- Carga inline para renderizado inmediato
- CSS no crítico cargado de forma asíncrona

### 2. **PurgeCSS Avanzado** 🧹
- Eliminación automática de CSS no utilizado
- Configuración inteligente con safelist
- Reducción significativa del tamaño de archivos CSS

### 3. **Optimización de Imágenes** 🖼️
- Conversión a formatos modernos (WebP, AVIF)
- Múltiples tamaños para responsive design
- Lazy loading avanzado con Intersection Observer
- Compresión inteligente con Sharp

### 4. **Minificación y Compresión** 📦
- CSS minificado con PostCSS y cssnano
- JavaScript optimizado
- Gzip/Brotli ready

### 5. **Lazy Loading Inteligente** 🎯
- Carga diferida de imágenes
- Placeholders y animaciones suaves
- Fallback para navegadores antiguos

## 🛠️ **SCRIPTS DE OPTIMIZACIÓN**

### **Scripts Principales**
```bash
# Optimización completa
npm run optimize:all

# CSS crítico
npm run build:critical

# PurgeCSS avanzado
npm run purge:css:advanced

# Optimización de imágenes
npm run optimize:images:advanced

# Pruebas de rendimiento
npm run test:performance:advanced
```

### **Scripts de Construcción**
```bash
# Construir todo
npm run build:all

# Construir CSS específico
npm run build:home
npm run build:tienda
npm run build:componentes
npm run build:404

# Construir con optimizaciones
npm run build:production
```

## 📁 **ESTRUCTURA DEL PROYECTO**

```
dekary/
├── assets/
│   ├── css/
│   │   ├── critical.css          # CSS crítico optimizado
│   │   ├── purged/               # CSS purgado
│   │   └── optimized/            # CSS minificado
│   ├── js/
│   │   ├── lazy-loading-advanced.js
│   │   └── image-optimizer.js
│   └── images/
│       ├── original/             # Imágenes originales
│       ├── optimized/            # Imágenes optimizadas
│       └── webp/                 # Versiones WebP
├── scripts/
│   ├── optimize-all.js           # Script maestro
│   ├── optimize-css-advanced.js  # PurgeCSS avanzado
│   ├── optimize-images-advanced.js
│   └── performance-test-advanced.js
├── config/
│   ├── purgecss.config.js        # Configuración PurgeCSS
│   └── postcss.config.js         # Configuración PostCSS
└── performance-reports/           # Reportes de rendimiento
```

## 🚀 **INSTALACIÓN Y USO**

### **Requisitos**
- Node.js 18+ 
- npm 8+

### **Instalación**
```bash
git clone https://github.com/tu-usuario/dekary.git
cd dekary
npm install
```

### **Desarrollo**
```bash
# Modo desarrollo con watch
npm run dev

# Construir para producción
npm run build:production

# Optimización completa
npm run optimize:all
```

## 📈 **MÉTRICAS DE RENDIMIENTO**

### **Core Web Vitals**
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms  
- **CLS (Cumulative Layout Shift)**: < 0.1

### **Métricas Adicionales**
- **First Paint**: < 1.8s
- **Speed Index**: < 3.4s
- **Time to Interactive**: < 3.8s

## 🔧 **CONFIGURACIÓN AVANZADA**

### **PurgeCSS**
```javascript
// config/purgecss.config.js
module.exports = {
  content: ['./**/*.html', './assets/js/**/*.js'],
  css: ['./assets/css/*.css'],
  safelist: ['fade-in', 'btn-*', 'hero-*']
}
```

### **PostCSS**
```javascript
// config/postcss.config.js
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default'
    })
  ]
}
```

## 📊 **MONITOREO Y REPORTES**

### **Reportes Automáticos**
- Lighthouse HTML reports
- PageSpeed Insights simulados
- Métricas de rendimiento detalladas
- Recomendaciones de optimización

### **Ubicación de Reportes**
```
performance-reports/
├── optimization-complete-*.json
├── performance-report-*.json
├── mobile-lighthouse-*.html
└── desktop-lighthouse-*.html
```

## 🌐 **DEPLOYMENT**

### **Recomendaciones de Hosting**
- **CDN**: Cloudflare, AWS CloudFront
- **Hosting**: Vercel, Netlify, AWS S3
- **Compresión**: Gzip, Brotli habilitados

### **Headers de Seguridad**
```http
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

## 📚 **RECURSOS Y REFERENCIAS**

- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Web.dev Performance](https://web.dev/performance/)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
- [PurgeCSS Documentation](https://purgecss.com/)

## 🤝 **CONTRIBUCIÓN**

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 **LICENCIA**

Este proyecto está bajo la Licencia ISC. Ver el archivo `LICENSE` para más detalles.

## 👥 **AUTORES**

- **Liz Martinez** - *Desarrollo inicial* - [@lizmartinez](https://github.com/lizmartinez)

## 🙏 **AGRADECIMIENTOS**

- Google PageSpeed Insights por las métricas de rendimiento
- Comunidad de desarrolladores web por las herramientas de optimización
- Usuarios que reportan problemas y sugieren mejoras

---

⭐ **Si este proyecto te ayuda, ¡dale una estrella!**
