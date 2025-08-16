# 🚀 CSS OPTIMIZADO - DEKARY

## 📋 **DESCRIPCIÓN**

Sistema de CSS optimizado implementado para el sitio principal de Dekary, con CSS crítico inline y CSS específico por página para mejorar significativamente el rendimiento.

## 🏗️ **ESTRUCTURA DEL PROYECTO**

```
dekary/
├── scss/
│   ├── pages/              # CSS específico por página
│   │   ├── _home.scss      # Solo estilos de index.html
│   │   ├── _tienda.scss    # Solo estilos de tienda.html
│   │   ├── _componentes.scss # Solo estilos de componentes.html
│   │   └── _404.scss       # Solo estilos de 404.html
│   ├── shared/             # Estilos compartidos
│   │   ├── _base.scss      # Estilos base compartidos
│   │   └── _layout.scss    # Layout y grid compartidos
│   ├── critical/           # CSS crítico extraído
│   └── [archivos existentes]
├── assets/
│   └── css/
│       ├── home.css        # CSS compilado de home
│       ├── tienda.css      # CSS compilado de tienda
│       ├── componentes.css # CSS compilado de componentes
│       ├── 404.css         # CSS compilado de 404
│       ├── shared-base.css # CSS base compartido
│       ├── shared-layout.css # CSS layout compartido
│       └── critical/       # CSS crítico extraído
└── scripts/
    └── extract-critical.js # Script para extraer CSS crítico
```

## 🛠️ **SCRIPTS DISPONIBLES**

### **Build de CSS por Página**
```bash
# Construir CSS específico para cada página
npm run build:css

# Construir CSS compartido
npm run build:shared

# Construir todo el CSS
npm run build:all
```

### **Extracción de CSS Crítico**
```bash
# Extraer CSS crítico de todas las páginas
npm run extract:critical

# Build completo + CSS crítico
npm run build:critical
```

### **Desarrollo**
```bash
# Modo desarrollo con watch
npm run dev

# Build completo + watch
npm run watch:all
```

## 🎯 **IMPLEMENTACIÓN DE CSS CRÍTICO**

### **1. CSS Crítico Inline**
El CSS crítico se extrae automáticamente y se puede implementar inline en el `<head>` de cada página:

```html
<head>
  <!-- CSS crítico inline para above-the-fold -->
  <style>
    /* CSS crítico extraído automáticamente */
    :root { /* variables críticas */ }
    body { /* estilos base críticos */ }
    .hero-home { /* hero crítico */ }
    .My-Nav { /* navegación crítica */ }
  </style>
  
  <!-- CSS no crítico cargado de forma asíncrona -->
  <link rel="preload" href="home.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="home.css"></noscript>
</head>
```

### **2. Carga Asíncrona de CSS No Crítico**
```javascript
// Script para cargar CSS no crítico
function loadCSS(href) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}

// Cargar cuando la página esté lista
document.addEventListener('DOMContentLoaded', function() {
  loadCSS('home.css');
});
```

## 📱 **RESPONSIVE Y OPTIMIZACIONES**

### **Móvil First**
- Elementos decorativos ocultos en móvil para mejor rendimiento
- CSS crítico optimizado para viewports pequeños
- Grid responsivo que se adapta a diferentes tamaños

### **Performance**
- CSS crítico inline reduce FCP (First Contentful Paint)
- CSS no crítico cargado de forma asíncrona
- Minificación automática con PostCSS
- Autoprefixer para compatibilidad cross-browser

## 🔧 **CONFIGURACIÓN**

### **PostCSS**
```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('postcss-import'),
    require('autoprefixer'),
    require('cssnano')({
      preset: ['default', {
        discardComments: { removeAll: true },
        normalizeWhitespace: true,
        colormin: true,
        minifyFontValues: true,
        minifySelectors: true,
      }]
    })
  ]
}
```

### **Critical CSS**
```javascript
// critical.config.js
module.exports = {
  inline: false,
  dimensions: [
    { width: 320, height: 568 },   // Mobile
    { width: 768, height: 1024 },  // Tablet
    { width: 1200, height: 800 }   // Desktop
  ],
  penthouse: {
    timeout: 30000,
    maxEmbeddedBase64Length: 1000
  }
};
```

## 📊 **MÉTRICAS ESPERADAS**

### **Antes de la Optimización**
- CSS total: ~12,395 líneas
- CSS por página: 100% del CSS total
- FCP: No medido

### **Después de la Optimización**
- CSS crítico: ~200-400 líneas por página
- CSS no crítico: ~60-80% del CSS total
- FCP esperado: <1.2s
- Reducción de CSS: 40-60%

## 🚀 **PRÓXIMOS PASOS**

### **Fase 2: Migración del Blog**
- Extraer CSS inline del blog
- Migrar a sistema SCSS
- Implementar CSS crítico en blog

### **Fase 3: Optimizaciones Avanzadas**
- PurgeCSS para eliminar CSS no utilizado
- CSS Modules para componentes
- Service Worker para caché offline

## 📝 **NOTAS IMPORTANTES**

1. **Siempre ejecutar `npm run build:all` antes de `npm run extract:critical`**
2. **El CSS crítico se extrae basándose en el contenido visible above-the-fold**
3. **Los archivos CSS se minifican automáticamente en producción**
4. **El sistema es compatible con el CSS existente de Bootstrap**

## 🆘 **SOLUCIÓN DE PROBLEMAS**

### **Error: "Critical CSS extraction failed"**
- Verificar que las páginas HTML existan
- Asegurar que el CSS esté compilado
- Revisar la configuración de Puppeteer

### **CSS no se compila**
- Verificar dependencias: `npm install`
- Limpiar caché: `npm run build:all`
- Revisar sintaxis SCSS

### **CSS crítico muy grande**
- Ajustar dimensiones en `critical.config.js`
- Revisar selectores CSS no críticos
- Optimizar CSS base compartido

---

**Desarrollado para La Pape de Kary** 🎨📚
**Optimización de rendimiento web** ⚡🚀
