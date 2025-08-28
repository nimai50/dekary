# 🏗️ ESTRUCTURA DEL PROYECTO - DEKARY.COM

Documentación completa de la arquitectura y organización del proyecto dekary.com.

## 📁 **ESTRUCTURA GENERAL**

```
dekary/
├── 📄 index.html                 # Página principal
├── 📄 tienda.html                # Página de tienda
├── 📄 componentes.html           # Página de componentes
├── 📄 404.html                   # Página de error 404
├── 📄 proximamente.html          # Página de próximamente
├── 📄 README.md                  # Documentación principal
├── 📄 CHANGELOG.md               # Historial de cambios
├── 📄 package.json               # Configuración del proyecto
├── 📄 .gitignore                 # Archivos ignorados por Git
│
├── 📁 assets/                    # Recursos estáticos
│   ├── 📁 css/                   # Hojas de estilo
│   │   ├── 📄 critical.css       # CSS crítico optimizado
│   │   ├── 📄 home.css           # Estilos de la página principal
│   │   ├── 📄 tienda.css         # Estilos de la tienda
│   │   ├── 📄 componentes.css    # Estilos de componentes
│   │   ├── 📄 404.css            # Estilos de página 404
│   │   ├── 📄 blog.css           # Estilos del blog
│   │   ├── 📁 purged/            # CSS purgado (generado)
│   │   │   ├── 📄 home-purged.css
│   │   │   ├── 📄 tienda-purged.css
│   │   │   ├── 📄 componentes-purged.css
│   │   │   ├── 📄 404-purged.css
│   │   │   └── 📄 blog-purged.css
│   │   └── 📁 optimized/         # CSS optimizado (generado)
│   │
│   ├── 📁 js/                    # JavaScript
│   │   ├── 📄 lazy-loading-advanced.js    # Lazy loading inteligente
│   │   ├── 📄 image-optimizer.js          # Optimizador de imágenes
│   │   ├── 📄 sw-register.js              # Registro de Service Worker
│   │   └── 📄 main.js                     # JavaScript principal
│   │
│   ├── 📁 images/                # Imágenes
│   │   ├── 📁 original/          # Imágenes originales
│   │   ├── 📁 optimized/         # Imágenes optimizadas (generado)
│   │   ├── 📁 webp/              # Versiones WebP (generado)
│   │   └── 📁 avif/              # Versiones AVIF (generado)
│   │
│   ├── 📁 webfonts/              # Fuentes web
│   └── 📁 icons/                 # Iconos y favicons
│
├── 📁 scss/                      # Archivos fuente SASS
│   ├── 📁 pages/                 # Estilos específicos de páginas
│   │   ├── 📄 _home.scss         # Estilos de la página principal
│   │   ├── 📄 _tienda.scss       # Estilos de la tienda
│   │   ├── 📄 _componentes.scss  # Estilos de componentes
│   │   └── 📄 _404.scss          # Estilos de página 404
│   │
│   ├── 📁 shared/                # Estilos compartidos
│   │   ├── 📄 _base.scss         # Estilos base
│   │   ├── 📄 _layout.scss       # Estilos de layout
│   │   ├── 📄 _colors.scss       # Variables de colores
│   │   ├── 📄 _typography.scss   # Tipografía
│   │   ├── 📄 _buttons.scss      # Botones
│   │   └── 📄 _animations.scss   # Animaciones
│   │
│   └── 📁 blog/                  # Estilos del blog
│       ├── 📄 main.scss          # Estilos principales del blog
│       ├── 📄 _variables.scss    # Variables del blog
│       ├── 📄 _base.scss         # Base del blog
│       ├── 📄 _navigation.scss   # Navegación del blog
│       ├── 📄 _posts.scss        # Estilos de posts
│       └── 📄 _sidebar.scss      # Estilos de sidebar
│
├── 📁 scripts/                   # Scripts de automatización
│   ├── 📄 optimize-all.js        # Script maestro de optimización
│   ├── 📄 optimize-css-advanced.js       # PurgeCSS avanzado
│   ├── 📄 optimize-images-advanced.js    # Optimización de imágenes
│   ├── 📄 performance-test-advanced.js   # Pruebas de rendimiento
│   ├── 📄 extract-critical.js    # Extracción de CSS crítico
│   └── 📄 update-blog-css.js    # Actualización de CSS del blog
│
├── 📁 config/                     # Archivos de configuración
│   ├── 📄 purgecss.config.js     # Configuración de PurgeCSS
│   ├── 📄 postcss.config.js      # Configuración de PostCSS
│   ├── 📄 critical.config.js     # Configuración de CSS crítico
│   └── 📄 index.js               # Configuración principal
│
├── 📁 docs/                       # Documentación del proyecto
│   ├── 📄 ESTRUCTURA.md          # Este archivo
│   ├── 📄 OPTIMIZACIONES-PAGESPEED-INSIGHTS.md
│   └── 📄 README.md              # Documentación principal
│
├── 📁 performance-reports/        # Reportes de rendimiento (generado)
│   ├── 📄 optimization-complete-*.json
│   ├── 📄 performance-report-*.json
│   ├── 📄 mobile-lighthouse-*.html
│   └── 📄 desktop-lighthouse-*.html
│
└── 📁 node_modules/               # Dependencias (generado)
```

## 🔧 **ARCHIVOS DE CONFIGURACIÓN**

### **package.json**
- Scripts de build y optimización
- Dependencias del proyecto
- Metadatos del proyecto

### **.gitignore**
- Archivos generados automáticamente
- Dependencias y cache
- Reportes de rendimiento

### **Configuraciones de Herramientas**
- **PurgeCSS**: Eliminación de CSS no utilizado
- **PostCSS**: Optimización y autoprefixer
- **SASS**: Preprocesador de CSS

## 📊 **FLUJO DE TRABAJO**

### **1. Desarrollo**
```bash
npm run dev                    # Watch SASS
npm run build:all             # Build completo
```

### **2. Optimización**
```bash
npm run optimize:all          # Optimización completa
npm run purge:css:advanced    # PurgeCSS avanzado
npm run optimize:images:advanced  # Optimización de imágenes
```

### **3. Producción**
```bash
npm run build:production      # Build optimizado para producción
npm run test:performance:advanced  # Pruebas de rendimiento
```

## 🎯 **CARACTERÍSTICAS CLAVE**

### **CSS Crítico**
- Archivo `assets/css/critical.css` optimizado manualmente
- Carga inline para renderizado inmediato
- Sin dependencias externas problemáticas

### **PurgeCSS Avanzado**
- Eliminación inteligente de CSS no utilizado
- Safelist inteligente para clases dinámicas
- Configuración centralizada y mantenible

### **Optimización de Imágenes**
- Conversión automática a WebP/AVIF
- Múltiples tamaños para responsive design
- Lazy loading inteligente

### **Scripts de Automatización**
- Script maestro de optimización
- Pruebas de rendimiento automatizadas
- Reportes detallados de optimización

## 🌐 **DESPLIEGUE**

### **GitHub Pages**
- Despliegue automático desde rama `main`
- Configuración en `.github/workflows/`

### **Dominio Personalizado**
- `dekary.com` configurado
- `CNAME` para redirección

## 📈 **MONITOREO**

### **Reportes Automáticos**
- Lighthouse reports (HTML)
- PageSpeed Insights simulados
- Métricas de rendimiento detalladas

### **Ubicación de Reportes**
```
performance-reports/
├── optimization-complete-*.json
├── performance-report-*.json
├── mobile-lighthouse-*.html
└── desktop-lighthouse-*.html
```

## 🔍 **ARCHIVOS IMPORTANTES**

### **HTML Principal**
- `index.html` - Página principal con CSS crítico
- `tienda.html` - Página de tienda optimizada
- `componentes.html` - Página de componentes

### **CSS Crítico**
- `assets/css/critical.css` - Estilos esenciales optimizados

### **Scripts de Optimización**
- `scripts/optimize-all.js` - Script maestro
- `scripts/optimize-css-advanced.js` - PurgeCSS avanzado
- `scripts/optimize-images-advanced.js` - Optimización de imágenes

## 🚀 **OPTIMIZACIONES IMPLEMENTADAS**

1. **CSS Crítico** - Renderizado inmediato
2. **PurgeCSS** - Eliminación de CSS no utilizado
3. **Imágenes** - Formatos modernos y múltiples tamaños
4. **Lazy Loading** - Carga diferida inteligente
5. **Minificación** - Compresión de archivos
6. **Pruebas** - Rendimiento automatizado

---

**Última actualización**: 2025-08-28  
**Versión**: 1.3.0  
**Estado**: ✅ Completamente optimizado
