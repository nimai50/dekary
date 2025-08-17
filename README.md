# 🎨 Dekary - Papelería Digital

**La papelería de Kary** - Sitio web optimizado para papelería y productos de oficina.

## 🚀 Características Principales

- **Sitio principal**: https://dekary.com
- **Blog**: https://blog.dekary.com
- **Diseño responsive** y optimizado para móviles
- **CSS crítico** implementado para máximo rendimiento
- **Optimización de imágenes** con soporte WebP
- **Service Worker** para funcionalidad offline
- **Sistema de build** automatizado con SASS y PostCSS

## 📁 Estructura del Proyecto

```
dekary/
├── 📁 assets/           # Recursos estáticos (CSS, JS, imágenes)
├── 📁 config/           # Archivos de configuración
├── 📁 docs/             # Documentación completa del proyecto
├── 📁 scss/             # Archivos fuente SASS
├── 📁 scripts/          # Scripts de automatización
├── 📁 .github/          # GitHub Actions para despliegue
└── 📄 index.html        # Página principal
```

## 🛠️ Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Preprocesador**: SASS/SCSS
- **Framework**: Bootstrap 3.3.1
- **Build Tools**: PostCSS, Critical CSS, PurgeCSS
- **Optimización**: WebP, Lazy Loading, Service Worker
- **Despliegue**: GitHub Pages + GitHub Actions

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 16+ 
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/nimai50/dekary.git
cd dekary

# Instalar dependencias
npm install

# Desarrollo local
npm run dev

# Build de producción
npm run build:production
```

## 📚 Documentación

Toda la documentación detallada se encuentra en la carpeta [`docs/`](./docs/):

- **[README Principal](./docs/README.md)** - Documentación completa del proyecto
- **[Changelog](./docs/CHANGELOG.md)** - Historial de cambios
- **[Features](./docs/FEATURES.md)** - Características implementadas
- **[Deployment](./docs/DEPLOYMENT.md)** - Guía de despliegue
- **[CSS Optimization](./docs/CSS-OPTIMIZATION-README.md)** - Optimizaciones CSS
- **[Blog Migration](./docs/README-FASE-2-BLOG-MIGRATION.md)** - Migración del blog
- **[Fase 3 Completada](./docs/README-FASE-3-COMPLETADA.md)** - Estado actual del proyecto
- **[Optimizaciones Avanzadas](./docs/README-FASE-3-OPTIMIZACIONES-AVANZADAS.md)** - Optimizaciones implementadas

## ⚙️ Configuración

Los archivos de configuración se encuentran en la carpeta [`config/`](./config/):

- **PostCSS**: `postcss.config.js`
- **Critical CSS**: `critical.config.js`
- **PurgeCSS**: `purgecss.config.js`
- **Git**: `.gitignore`

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev                    # Watch SASS
npm run compile:sass          # Compilar SASS una vez

# Build
npm run build:css             # Build CSS de todas las páginas
npm run build:shared          # Build CSS compartido
npm run build:blog            # Build CSS del blog
npm run build:all             # Build completo
npm run build:production      # Build de producción con optimizaciones

# Optimización
npm run extract:critical      # Extraer CSS crítico
npm run purge:css             # Purgar CSS no utilizado
npm run optimize:images       # Optimizar imágenes
npm run performance:test      # Pruebas de rendimiento

# Blog
npm run update:blog           # Actualizar plantillas del blog
npm run build:blog:complete  # Build completo del blog
```

## 📊 Métricas de Rendimiento

- **Core Web Vitals** optimizados
- **PageSpeed Insights** mejorado significativamente
- **Lighthouse** score optimizado
- **CSS crítico** implementado
- **Imágenes optimizadas** con WebP

## 🌐 Despliegue

El sitio se despliega automáticamente en GitHub Pages cada vez que se hace push a la rama `main`.

- **Sitio principal**: https://dekary.com
- **Blog**: https://blog.dekary.com

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👤 Autor

**Liz Martinez** - [@nimai50](https://github.com/nimai50)

---

⭐ **Si este proyecto te ayuda, ¡dale una estrella!**
