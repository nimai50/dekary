# Changelog - La Pape de Kary

Todos los cambios notables en este proyecto serán documentados en este archivo.

## [1.2.0] - Diciembre 2024

### 🔧 **Correcciones de SEO**
- **Eliminación de marcado estructurado de productos** para resolver errores de Google Search Console
- **Corrección de errores "Fragmentos de productos"** que indicaban propiedades faltantes
- **Limpieza del Schema.org JSON-LD** para reflejar la funcionalidad actual del sitio
- **Eliminación de `hasOfferCatalog`** que causaba conflictos con la funcionalidad real

### 📊 **Cambios en Marcado Estructurado**
- **Eliminado**: Sección `hasOfferCatalog` completa del marcado `LocalBusiness`
- **Mantenido**: Información del negocio local (`LocalBusiness`) para SEO local
- **Resultado**: Marcado estructurado limpio y honesto con los motores de búsqueda

### 🎯 **Motivo de los Cambios**
- **Sitio no vende productos directamente** - la sección "tienda" es solo un mockup de diseño
- **Prevención de errores de GSC** relacionados con propiedades faltantes de productos
- **SEO más honesto** que refleja la funcionalidad real del sitio

## [1.1.0] - Diciembre 2024

### ✨ **Nuevas Funcionalidades**
- **Página 404 personalizada** con ilustración temática de impresora
- **Diseño coherente** con la identidad visual del sitio principal
- **Ilustración SVG** de impresora moderna con tóner bajo
- **Hoja de papel realista** con error "404" impreso
- **Líneas de tóner** simulando fallas de impresión
- **Formulario de contacto funcional** integrado en la página 404
- **Modal de contacto** que se abre sin redirección

### 🎨 **Mejoras de Diseño**
- **Borde superior multicolor** con degradado (amarillo → rosa → azul)
- **Logo prominente** de La Pape de Kary (64px de altura)
- **Tipografía Quicksand** para mejor legibilidad
- **Paleta de colores** optimizada para mejor contraste
- **Botón púrpura sólido** sin degradados para mejor coherencia

### 🔧 **Mejoras Técnicas**
- **HTML5 semántico** con estructura optimizada
- **CSS con variables personalizadas** para consistencia
- **Diseño responsive** optimizado para todos los dispositivos
- **Animaciones CSS** suaves para elementos de entrada
- **Optimización SEO** con metadatos apropiados
- **Integración Bootstrap** para funcionalidad del modal
- **Formulario de contacto** con validación y envío funcional

### 📱 **Responsive Design**
- **Mobile First** approach
- **Grid system** flexible y adaptable
- **Breakpoints** optimizados para tablets y desktop
- **Imágenes** optimizadas para diferentes resoluciones

### 🚀 **Integración con GitHub Pages**
- **Configuración automática** para página 404
- **Despliegue automático** al hacer push a main
- **Sin configuración adicional** del servidor requerida

## [1.0.0] - Versión Inicial

### 🎯 **Funcionalidades Base**
- Sitio web principal con diseño moderno
- Páginas de tienda y próximamente
- Sistema de componentes reutilizables
- Integración con Bootstrap y FontAwesome
- Compilación automática de SCSS

### 🛠️ **Tecnologías Implementadas**
- HTML5, CSS3, SCSS
- Bootstrap 5.3.3
- FontAwesome 6.7.2
- Google Fonts (Quicksand)
- GitHub Pages para hosting

---

## 📝 **Notas de Versión**

### **v1.1.0 - Página 404 Personalizada**
Esta versión introduce una página de error 404 completamente personalizada que:
- Mantiene la coherencia visual con el sitio principal
- Proporciona una experiencia de usuario mejorada
- Incluye elementos temáticos relacionados con papelería
- Se integra perfectamente con GitHub Pages
- **Incluye formulario de contacto funcional** integrado en la misma página
- **Permite a los usuarios reportar errores** sin salir de la página 404

### **v1.0.0 - Lanzamiento Inicial**
Versión base del sitio web con todas las funcionalidades principales implementadas.

---

**Desarrollado con ❤️ para La Pape de Kary**
