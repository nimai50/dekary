# Formularios de Contacto - Dekary

## Descripción
Este proyecto implementa formularios de contacto funcionales utilizando el protocolo `mailto:` que abren automáticamente el cliente de email predeterminado del usuario con los datos del formulario pre-rellenados.

## Implementación Actual

### Email de Destino
- **Email configurado:** `impresiones@dekary.com`
- **Ubicación:** `assets/js/contact-forms-mailto.js` (línea 58)

### Funcionalidad
- **Validación en tiempo real** de campos obligatorios
- **Apertura automática** del cliente de email del usuario
- **Pre-llenado** de asunto y cuerpo del mensaje
- **Mensajes de confirmación** y manejo de errores
- **Limpieza automática** del formulario después del envío

## Archivos Incluidos


### JavaScript Principal
- `assets/js/contact-forms-mailto.js` - Lógica principal de los formularios

### CSS de Estilos
- `assets/css/contact-forms.css` - Estilos para validación y mensajes

### HTML con Formularios
- `index.html` - Formulario en modal y en sección dedicada
- `tienda.html` - Formulario en modal
- `blog-template.html` - Formulario en modal

## Estructura del Email Generado

### Asunto
```
Nuevo mensaje de contacto de [Nombre] [Apellido]
```

### Cuerpo
```
Hola,

Has recibido un nuevo mensaje de contacto:

**Nombre:** [Nombre] [Apellido]
**Email:** [Email del usuario]
**Mensaje:**
[Mensaje del usuario]

Este mensaje fue enviado desde el formulario de contacto de tu sitio web.
```

## Personalización

### Cambiar Email de Destino
Para cambiar el email de destino, edita la línea 58 en `assets/js/contact-forms-mailto.js`:

```javascript
const toEmail = 'tu-nuevo-email@dominio.com';
```

### Modificar Formato del Email
Para cambiar el formato del asunto o cuerpo, edita las funciones `createMailtoLink` en el mismo archivo.

## Compatibilidad
- ✅ **Navegadores modernos** (Chrome, Firefox, Safari, Edge)
- ✅ **Dispositivos móviles** (iOS, Android)
- ✅ **Clientes de email** (Outlook, Gmail, Apple Mail, etc.)
- ⚠️ **Requiere** que el usuario tenga configurado un cliente de email

## Flujo de Usuario
1. Usuario completa el formulario
2. Hace clic en "Enviar"
3. Se valida que todos los campos estén completos
4. Se muestra mensaje de confirmación
5. Se abre automáticamente el cliente de email
6. El email está pre-rellenado con los datos del formulario
7. El usuario solo debe hacer clic en "Enviar" en su cliente de email
8. El formulario se limpia automáticamente

## Solución de Problemas

### El cliente de email no se abre
- Verifica que el usuario tenga configurado un cliente de email predeterminado
- Algunos navegadores pueden bloquear la apertura automática

### Campos no se validan
- Asegúrate de que el archivo `contact-forms-mailto.js` esté incluido en el HTML
- Verifica que los formularios tengan los IDs correctos

### Estilos no se aplican
- Confirma que `contact-forms.css` esté incluido en el `<head>` del HTML

## Notas Técnicas
- Utiliza `FormData` para capturar datos del formulario
- Implementa validación HTML5 nativa con `required`
- Usa `encodeURIComponent()` para codificar parámetros del mailto
- Incluye manejo de errores y timeouts para mejor UX
- Cierra automáticamente modales después del envío exitoso

## Historial de Cambios
- ✅ Corregido tipo de campo para nombre y apellido (de `email` a `text`)
- ✅ Agregados atributos `name`, `required`, `action`, `method` a todos los formularios
- ✅ Implementada validación en tiempo real
- ✅ Implementada solución `mailto:` funcional
- ✅ Email de destino configurado a `impresiones@dekary.com`
- ✅ Limpieza automática de formularios
- ✅ Estilos visuales para validación y mensajes
