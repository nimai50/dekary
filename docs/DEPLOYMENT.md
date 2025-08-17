# 🚀 Guía de Despliegue - GitHub Pages

Esta guía te ayudará a desplegar tu sitio web en GitHub Pages y configurar la página 404 personalizada.

## 📋 **Prerrequisitos**

- ✅ Cuenta de GitHub
- ✅ Repositorio configurado con GitHub Pages
- ✅ Archivo `404.html` en la raíz del repositorio

## 🔧 **Configuración de GitHub Pages**

### **1. Habilitar GitHub Pages**

1. Ve a tu repositorio en GitHub
2. Haz clic en **Settings** (Configuración)
3. Desplázate hacia abajo hasta **Pages**
4. En **Source**, selecciona **Deploy from a branch**
5. En **Branch**, selecciona **main** (o **master**)
6. Haz clic en **Save**

### **2. Verificar Configuración**

- **URL del sitio**: Aparecerá en la sección Pages
- **Estado**: Debería mostrar "Your site is published at [URL]"
- **Tiempo de despliegue**: 5-10 minutos después de cada push

## 📁 **Estructura de Archivos Requerida**

```
dekary/
├── index.html              # ✅ Página principal
├── 404.html               # ✅ Página de error con formulario de contacto
├── tienda.html            # ✅ Página de tienda
├── proximamente.html      # ✅ Página próximamente
├── componentes.html       # ✅ Componentes
├── assets/                # ✅ Recursos estáticos
│   ├── css/
│   ├── images/
│   ├── js/
│   │   └── contact-forms-only.js  # ✅ JavaScript para formularios
│   └── webfonts/
├── scss/                  # ✅ Archivos fuente
├── README.md              # ✅ Documentación
├── CHANGELOG.md           # ✅ Registro de cambios
└── DEPLOYMENT.md          # ✅ Esta guía
```

## 🚀 **Proceso de Despliegue**

### **1. Preparar Cambios Localmente**

```bash
# Verificar estado del repositorio
git status

# Agregar todos los archivos nuevos/modificados
git add .

# Verificar qué se va a commitear
git status
```

### **2. Crear Commit**

```bash
# Commit con mensaje descriptivo
git commit -m "✨ Agregar página 404 personalizada con diseño temático

- Nueva página 404 con ilustración de impresora
- Diseño coherente con la identidad visual del sitio
- Borde superior multicolor (amarillo → rosa → azul)
- Logo prominente y tipografía optimizada
- Integración automática con GitHub Pages

Closes: #404"
```

### **3. Subir a GitHub**

```bash
# Push a la rama main
git push origin main
```

### **4. Verificar Despliegue**

1. **Esperar 5-10 minutos** para que se complete el despliegue
2. **Verificar en GitHub**:
   - Ve a **Actions** en tu repositorio
   - Busca la acción "pages build and deployment"
   - Verifica que esté en verde (✅)

## 🧪 **Pruebas Post-Despliegue**

### **1. Verificar Página Principal**
- Visita tu sitio: `https://[usuario].github.io/dekary/`
- Confirma que se carga correctamente

### **2. Probar Página 404**
- Intenta acceder a una URL inexistente:
  - `https://[usuario].github.io/dekary/pagina-inexistente`
  - `https://[usuario].github.io/dekary/xyz123`
- Deberías ver tu página 404 personalizada
- **Prueba el formulario de contacto**:
  - Haz clic en "contáctanos" en la parte inferior
  - Verifica que se abra el modal con el formulario
  - Prueba llenar los campos y enviar el formulario
  - Confirma que el modal se cierre correctamente

### **3. Verificar Responsive Design**
- Prueba en diferentes dispositivos
- Usa las herramientas de desarrollador del navegador
- Verifica breakpoints móvil, tablet y desktop

## 🔍 **Solución de Problemas**

### **Problema: La página 404 no se muestra**

**Posibles causas:**
- ❌ Archivo no está en la raíz del repositorio
- ❌ Nombre del archivo no es exactamente `404.html`
- ❌ GitHub Pages no está habilitado
- ❌ El despliegue aún no se completó

**Soluciones:**
1. Verifica que `404.html` esté en la raíz
2. Confirma que GitHub Pages esté habilitado
3. Espera 10-15 minutos y prueba nuevamente
4. Verifica el estado del despliegue en Actions

### **Problema: El formulario de contacto no funciona**

**Posibles causas:**
- ❌ JavaScript de Bootstrap no se cargó correctamente
- ❌ Archivo `contact-forms-only.js` no está disponible
- ❌ Conflictos de CSS entre Bootstrap y estilos personalizados

**Soluciones:**
1. Verifica que `assets/js/contact-forms-only.js` exista
2. Confirma que Bootstrap JS se esté cargando
3. Revisa la consola del navegador para errores JavaScript
4. Verifica que no haya conflictos de CSS

### **Problema: Cambios no se reflejan**

**Soluciones:**
1. **Hard refresh** en el navegador (Ctrl+F5)
2. **Limpiar caché** del navegador
3. **Verificar** que el push se haya completado
4. **Esperar** el tiempo de despliegue completo

### **Problema: Errores de compilación**

**Soluciones:**
1. Verificar que no haya errores de sintaxis en HTML/CSS
2. Confirmar que todas las rutas de archivos sean correctas
3. Verificar que las imágenes y recursos existan
4. Revisar la consola del navegador para errores JavaScript

## 📊 **Monitoreo del Sitio**

### **1. Google Search Console**
- Agregar tu sitio para monitoreo SEO
- Verificar que la página 404 se detecte correctamente
- Monitorear errores de rastreo

### **2. Analytics**
- Configurar Google Analytics si es necesario
- Monitorear páginas de error 404
- Analizar comportamiento de usuarios

### **3. GitHub Insights**
- Monitorear tráfico del repositorio
- Verificar estado de GitHub Pages
- Revisar logs de despliegue

## 🔄 **Actualizaciones Futuras**

### **1. Flujo de Trabajo Recomendado**
```bash
# 1. Crear rama para nueva funcionalidad
git checkout -b feature/nueva-funcionalidad

# 2. Hacer cambios y commits
git add .
git commit -m "Descripción de cambios"

# 3. Push a la rama
git push origin feature/nueva-funcionalidad

# 4. Crear Pull Request en GitHub
# 5. Merge a main después de revisión
# 6. Despliegue automático
```

### **2. Versionado**
- Mantener `CHANGELOG.md` actualizado
- Usar versiones semánticas (1.1.0, 1.2.0, etc.)
- Taggear releases importantes en GitHub

## 📞 **Soporte**

Si encuentras problemas:

1. **Revisa esta guía** primero
2. **Consulta** la documentación de GitHub Pages
3. **Revisa** los logs de Actions en GitHub
4. **Verifica** que todos los archivos estén en su lugar

---

**¡Tu sitio web está listo para el mundo! 🌍✨**
