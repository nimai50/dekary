// Script específico para formularios de contacto - NO interfiere con otros enlaces
document.addEventListener('DOMContentLoaded', function() {
    // Función para mostrar mensajes
    function showMessage(formId, message, isSuccess = true) {
        const form = document.getElementById(formId);
        if (!form) return;
        
        // Remover mensajes anteriores
        const existingMessage = form.querySelector('.alert');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Crear nuevo mensaje
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert ${isSuccess ? 'alert-success' : 'alert-danger'} mt-3`;
        alertDiv.role = 'alert';
        alertDiv.textContent = message;
        
        // Insertar después del botón de envío
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.parentNode.insertBefore(alertDiv, submitButton.nextSibling);
        }
        
        // Auto-remover después de 5 segundos
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }
    
    // Función para validar formulario
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('is-invalid');
                isValid = false;
            } else {
                input.classList.remove('is-invalid');
            }
        });
        
        return isValid;
    }
    
    // Función para crear el enlace mailto
    function createMailtoLink(formData) {
        const email = formData.get('email');
        const nombre = formData.get('nombre');
        const apellido = formData.get('apellido');
        const mensaje = formData.get('mensaje');
        
        // Email de destino - CONFIRMADO como correcto
        const toEmail = 'impresiones@dekary.com';
        
        // Asunto del email
        const subject = `Nuevo mensaje de contacto de ${nombre} ${apellido}`;
        
        // Cuerpo del email
        const body = `Hola,\n\nHas recibido un nuevo mensaje de contacto:\n\n` +
                    `**Nombre:** ${nombre} ${apellido}\n` +
                    `**Email:** ${email}\n` +
                    `**Mensaje:**\n${mensaje}\n\n` +
                    `Este mensaje fue enviado desde el formulario de contacto de tu sitio web.`;
        
        // Crear enlace mailto con parámetros más específicos
        const mailtoLink = `mailto:${toEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Log para debug
        console.log('Enlace mailto creado:', mailtoLink);
        console.log('Email destino:', toEmail);
        console.log('Asunto:', subject);
        console.log('Cuerpo:', body);
        
        return mailtoLink;
    }
    
    // Función para abrir el cliente de email de manera más robusta
    function openEmailClient(mailtoLink) {
        try {
            // Método 1: Usar window.location.href
            console.log('Intentando abrir email con window.location.href...');
            window.location.href = mailtoLink;
            
            // Método 2: Si el primero falla, usar window.open
            setTimeout(() => {
                try {
                    console.log('Intentando método alternativo con window.open...');
                    window.open(mailtoLink, '_blank');
                } catch (error2) {
                    console.error('Error con window.open:', error2);
                    throw error2;
                }
            }, 100);
            
        } catch (error) {
            console.error('Error al abrir email:', error);
            throw error;
        }
    }
    
    // Función para manejar el envío del formulario
    function handleFormSubmit(event) {
        event.preventDefault();
        
        const form = event.target;
        const formId = form.id;
        
        console.log(`Procesando formulario: ${formId}`);
        
        // Validar formulario
        if (!validateForm(form)) {
            showMessage(formId, 'Por favor, completa todos los campos obligatorios.', false);
            return;
        }
        
        // Obtener datos del formulario
        const formData = new FormData(form);
        
        // Crear enlace mailto
        const mailtoLink = createMailtoLink(formData);
        
        // Mostrar mensaje de confirmación
        showMessage(formId, 'Abriendo tu cliente de email...', true);
        
        // Abrir cliente de email después de un breve delay
        setTimeout(() => {
            try {
                openEmailClient(mailtoLink);
                
                // Limpiar formulario después de abrir email
                form.reset();
                form.querySelectorAll('.is-invalid, .is-valid').forEach(input => {
                    input.classList.remove('is-invalid', 'is-valid');
                });
                
                // Si es un modal, cerrarlo después de 3 segundos
                const modal = form.closest('.modal');
                if (modal) {
                    setTimeout(() => {
                        const closeButton = modal.querySelector('[data-dismiss="modal"]');
                        if (closeButton) {
                            closeButton.click();
                        }
                    }, 3000);
                }
                
            } catch (error) {
                console.error('Error al abrir cliente de email:', error);
                showMessage(formId, 'Error al abrir el cliente de email. Inténtalo de nuevo.', false);
            }
        }, 1000);
    }
    
    // SOLO agregar event listeners a formularios de contacto específicos
    const contactForms = [
        'contactModalForm',      // Formulario del modal en index.html
        'contactSectionForm',    // Formulario de la sección de contacto en index.html
        'contactTiendaForm'      // Formulario del modal en tienda.html
    ];
    
    contactForms.forEach(formId => {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', handleFormSubmit);
            console.log(`Formulario ${formId} configurado correctamente`);
        } else {
            console.warn(`Formulario ${formId} no encontrado en la página`);
        }
    });
    
    // Validación en tiempo real SOLO para formularios de contacto
    contactForms.forEach(formId => {
        const form = document.getElementById(formId);
        if (form) {
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            inputs.forEach(input => {
                input.addEventListener('blur', function() {
                    if (this.value.trim()) {
                        this.classList.remove('is-invalid');
                        this.classList.add('is-valid');
                    } else {
                        this.classList.remove('is-valid');
                        this.classList.add('is-invalid');
                    }
                });
                
                input.addEventListener('input', function() {
                    if (this.value.trim()) {
                        this.classList.remove('is-invalid');
                    }
                });
            });
        }
    });
    
    console.log('Script de formularios de contacto cargado correctamente');
    console.log('Email de destino configurado:', 'impresiones@dekary.com');
});
