# 📁 Estructura del Proyecto Dekary

Este documento describe la organización completa del proyecto siguiendo las mejores prácticas de desarrollo web.

## 🏗️ Estructura General

```
dekary/
├── 📁 assets/                    # Recursos estáticos del sitio
│   ├── 📁 css/                   # Archivos CSS compilados y optimizados
│   ├── 📁 js/                    # Scripts JavaScript
│   ├── 📁 images/                # Imágenes del sitio
│   └── 📁 webfonts/              # Fuentes web (FontAwesome)
├── 📁 config/                     # Archivos de configuración
├── 📁 docs/                       # Documentación completa del proyecto
├── 📁 scss/                       # Archivos fuente SASS/SCSS
├── 📁 scripts/                    # Scripts de automatización y build
├── 📁 .github/                    # GitHub Actions para CI/CD
├── 📁 blog-dekary-com/            # Proyecto del blog (subdominio)
├── 📄 index.html                  # Página principal del sitio
├── 📄 tienda.html                 # Página de la tienda
├── 📄 componentes.html             # Página de componentes
├── 📄 404.html                    # Página de error 404
├── 📄 proximamente.html            # Página "próximamente"
├── 📄 package.json                # Dependencias y scripts npm
├── 📄 sw.js                       # Service Worker
└── 📄 README.md                   # Documentación principal
```

## 📁 assets/ - Recursos Estáticos

### 📁 css/
Contiene todos los archivos CSS compilados y optimizados:

- **Archivos principales por página:**
  - `home.css` - Estilos específicos de la página principal
  - `tienda.css` - Estilos de la página de tienda
  - `componentes.css` - Estilos de la página de componentes
  - `404.css` - Estilos de la página de error

- **Archivos compartidos:**
  - `shared-base.css` - Estilos base compartidos
  - `shared-layout.css` - Layout y grid compartidos
  - `styles.css` - Estilos generales del sitio

- **Archivos especializados:**
  - `blog.css` - Estilos del blog
  - `fontawesome.css` - Iconos FontAwesome
  - `animate.css` - Animaciones CSS
  - `contact-forms.css` - Estilos de formularios
  - `design-fixes.css` - Correcciones de diseño

- **Archivos optimizados:**
  - `critical/` - CSS crítico extraído
  - `purged/` - CSS purgado (sin estilos no utilizados)
  - `optimized/` - CSS procesado con PostCSS

### 📁 js/
Scripts JavaScript del sitio:

- **Scripts principales:**
  - `bootstrap.bundle.min.js` - Framework Bootstrap
  - `contact-forms-only.js` - Manejo de formularios
  - `modal-fix.js` - Solución para modales
  - `image-optimizer.js` - Optimización de imágenes
  - `lazy-loading.js` - Carga diferida de recursos
  - `sw-register.js` - Registro del Service Worker

### 📁 images/
Imágenes del sitio web:
- Logo y branding
- Imágenes de productos
- Elementos decorativos
- Iconos y gráficos

### 📁 webfonts/
Fuentes web de FontAwesome para iconos.

## 📁 config/ - Configuración del Proyecto

Archivos de configuración centralizados:

- **`index.js`** - Configuración principal que centraliza todo
- **`postcss.config.js`** - Configuración de PostCSS
- **`critical.config.js`** - Configuración de Critical CSS
- **`purgecss.config.js`** - Configuración de PurgeCSS
- **`.gitignore`** - Archivos ignorados por Git

## 📁 docs/ - Documentación

Documentación completa del proyecto:

- **`README.md`** - Documentación principal del proyecto
- **`CHANGELOG.md`** - Historial de cambios
- **`FEATURES.md`** - Características implementadas
- **`DEPLOYMENT.md`** - Guía de despliegue
- **`CSS-OPTIMIZATION-README.md`** - Optimizaciones CSS
- **`README-FASE-2-BLOG-MIGRATION.md`** - Migración del blog
- **`README-FASE-3-COMPLETADA.md`** - Estado actual
- **`README-FASE-3-OPTIMIZACIONES-AVANZADAS.md`** - Optimizaciones
- **`PROJECT-STRUCTURE.md`** - Este archivo

## 📁 scss/ - Archivos Fuente SASS

Estructura modular de SASS:

### 📁 pages/
Estilos específicos de cada página:
- `_home.scss` - Página principal
- `_tienda.scss` - Página de tienda
- `_componentes.scss` - Página de componentes
- `_404.scss` - Página de error

### 📁 shared/
Estilos compartidos entre páginas:
- `_base.scss` - Reset, tipografía, variables
- `_layout.scss` - Grid, flexbox, layout

### 📁 blog/
Estilos del blog:
- `_variables.scss` - Variables específicas del blog
- `_base.scss` - Estilos base del blog
- `_navigation.scss` - Navegación del blog
- `_posts.scss` - Estilos de posts
- `_sidebar.scss` - Estilos de sidebar
- `main.scss` - Archivo principal que importa todo

### Archivos de componentes:
- `_buttons.scss` - Estilos de botones
- `_secciones.scss` - Estilos de secciones
- `_typography.scss` - Tipografía
- `_animations.scss` - Animaciones
- `_colors.scss` - Paleta de colores
- `_mixins.scss` - Mixins reutilizables

## 📁 scripts/ - Automatización

Scripts de Node.js para automatizar tareas:

- **`extract-critical.js`** - Extrae CSS crítico de las páginas
- **`optimize-images.js`** - Optimiza y convierte imágenes a WebP
- **`performance-test.js`** - Ejecuta pruebas de rendimiento
- **`update-blog-css.js`** - Actualiza plantillas del blog

## 📁 .github/workflows/ - CI/CD

GitHub Actions para despliegue automático:

- **`static.yml`** - Despliega automáticamente en GitHub Pages

## 📁 blog-dekary-com/ - Proyecto del Blog

Proyecto separado para el subdominio del blog:
- Plantillas HTML
- Posts del blog
- Configuración específica del blog

## 🔧 Archivos de Configuración

### package.json
Define dependencias, scripts y metadatos del proyecto.

### sw.js
Service Worker para funcionalidad offline y caching.

## 📋 Mejores Prácticas Implementadas

### 1. **Separación de Responsabilidades**
- Configuración separada en `config/`
- Documentación centralizada en `docs/`
- Scripts de automatización en `scripts/`

### 2. **Modularización CSS**
- Estructura SASS modular por páginas
- Estilos compartidos separados
- CSS crítico implementado

### 3. **Optimización de Recursos**
- Imágenes optimizadas y WebP
- CSS purgado y minificado
- JavaScript no bloqueante

### 4. **Automatización**
- Scripts npm para build
- PostCSS para procesamiento
- GitHub Actions para CI/CD

### 5. **Documentación**
- README principal en la raíz
- Documentación detallada por fases
- Estructura del proyecto documentada

## 🚀 Flujo de Trabajo

1. **Desarrollo**: Editar archivos SASS en `scss/`
2. **Build**: Ejecutar scripts npm para compilar
3. **Optimización**: PostCSS, Critical CSS, PurgeCSS
4. **Despliegue**: Push a GitHub activa Actions automáticamente

## 📚 Referencias

- [README Principal](../README.md)
- [Guía de Despliegue](./DEPLOYMENT.md)
- [Optimizaciones CSS](./CSS-OPTIMIZATION-README.md)
- [Estado del Proyecto](./README-FASE-3-COMPLETADA.md)
