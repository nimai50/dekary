# Dekary - La Papelería de Kary

Un sitio web moderno para una papelería, construido con HTML, CSS (SASS), Bootstrap y FontAwesome.

## 🚀 Características

- Diseño responsive y moderno
- Compilación automática de SASS
- Iconos de FontAwesome
- Componentes de Bootstrap
- Animaciones CSS personalizadas

## 📁 Estructura del Proyecto

```
dekary/
├── assets/
│   ├── css/          # Archivos CSS compilados
│   ├── images/       # Imágenes del proyecto
│   ├── js/           # Archivos JavaScript
│   └── webfonts/     # Fuentes de FontAwesome
├── scss/             # Archivos SASS fuente
├── index.html        # Página principal
├── tienda.html       # Página de tienda
├── proximamente.html  # Página próximamente
└── componentes.html  # Página de componentes
```

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm

### Pasos de instalación

1. **Clonar el repositorio**
   ```bash
   git clone [URL-del-repositorio]
   cd dekary
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Compilar SASS**
   ```bash
   npm run dev
   # o
   npm run compile:sass
   ```

## 🎯 Scripts Disponibles

- `npm run dev` - Compila SASS en modo watch
- `npm run compile:sass` - Compila SASS en modo watch

## 🔧 Solución de Problemas

### Error: "sass no se reconoce como un comando"
**Problema:** SASS no está disponible globalmente en el sistema.
**Solución:** Los scripts usan `npx sass` para ejecutar SASS desde las dependencias locales.

### Error: "Missing script: dev"
**Problema:** El script "dev" no estaba definido en `package.json`.
**Solución:** Se agregó el script "dev" que ejecuta `npx sass --watch scss:assets/css`.

### Error: "Can't find stylesheet to import"
**Problema:** Rutas de importación incorrectas en archivos SASS.
**Solución:** Se corrigieron las rutas para usar `../node_modules/` en lugar de `../../node_modules/`.

## 📝 Dependencias

### Dependencias de Desarrollo
- `sass`: ^1.82.0 - Compilador de SASS

### Dependencias Principales
- `@fortawesome/fontawesome-free`: ^6.7.2 - Iconos
- `animate.css`: ^4.1.1 - Animaciones CSS
- `bootstrap`: ^5.3.3 - Framework CSS

## 🎨 Desarrollo

### Estructura SASS
Los archivos SASS están organizados en módulos:
- `_animations.scss` - Animaciones personalizadas
- `_buttons.scss` - Estilos de botones
- `_colors.scss` - Variables de colores
- `_custom.scss` - Estilos personalizados y Bootstrap
- `_mixins.scss` - Mixins reutilizables
- `_primitives.scss` - Componentes básicos
- `_secciones.scss` - Estilos de secciones
- `_typography.scss` - Tipografía
- `fontawesome.scss` - Importación de FontAwesome
- `styles.scss` - Archivo principal que importa todos los módulos

### Compilación
El archivo principal `styles.scss` importa todos los módulos y se compila a `assets/css/styles.css`.

## 🌐 Páginas Disponibles

- **index.html** - Página principal
- **tienda.html** - Página de tienda
- **proximamente.html** - Página próximamente
- **componentes.html** - Página de componentes

## 📱 Responsive Design

El sitio está optimizado para diferentes tamaños de pantalla:
- Desktop
- Tablet
- Mobile

## 🚀 Despliegue

Para desplegar el sitio:
1. Compilar SASS: `npm run dev`
2. Subir todos los archivos al servidor web
3. Asegurarse de que las rutas de los archivos CSS y JS sean correctas

## ✅ Estado Actual del Proyecto

**Última actualización:** Diciembre 2024
- ✅ SASS compilando correctamente
- ✅ FontAwesome funcionando
- ✅ Bootstrap integrado
- ✅ Archivos CSS generados automáticamente
- ✅ Scripts de desarrollo funcionando

## 👥 Autor

**Liz Martinez** - Diseñadora del proyecto
**Hugo Arrazola Dotor** - IA Engineer del proyecto


## 📄 Licencia

ISC License

---

**Nota:** Asegúrate de tener SASS compilándose en modo watch (`npm run dev`) mientras desarrollas para ver los cambios en tiempo real.