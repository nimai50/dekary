// Solución para el conflicto de jQuery y modal
document.addEventListener('DOMContentLoaded', function() {
    // Modal fix script cargado
    
    // Preservar jQuery original antes de que MailerLite lo sobrescriba
    const originalJQuery = window.jQuery;
    const original$ = window.$;
    
    // Función para restaurar jQuery si es necesario
    function restoreJQuery() {
        if (window.jQuery !== originalJQuery) {
            window.jQuery = originalJQuery;
            // jQuery restaurado
        }
        if (window.$ !== original$) {
            window.$ = original$;
            // $ restaurado
        }
    }
    
    // Restaurar jQuery después de que MailerLite termine de cargar
    setTimeout(restoreJQuery, 2000);
    
    // También restaurar cuando se detecte que MailerLite ha terminado
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.tagName === 'SCRIPT' && node.src && node.src.includes('mailerlite')) {
                        setTimeout(restoreJQuery, 1000);
                    }
                });
            }
        });
    });
    
    observer.observe(document.head, { childList: true });
    
    // Función para abrir modal usando jQuery si está disponible
    function openModalWithJQuery() {
        if (window.jQuery && window.jQuery.fn && window.jQuery.fn.modal) {
            // Abriendo modal con jQuery
            window.jQuery('#exampleModal').modal('show');
            return true;
        }
        return false;
    }
    
    // Función para abrir modal manualmente si jQuery no funciona
    function openModalManually() {
        // Abriendo modal manualmente
        const modal = document.getElementById('exampleModal');
        if (modal) {
            modal.style.display = 'block';
            modal.classList.add('show');
            modal.setAttribute('aria-hidden', 'false');
            
            // Agregar backdrop
            const backdrop = document.createElement('div');
            backdrop.className = 'modal-backdrop fade show';
            backdrop.style.position = 'fixed';
            backdrop.style.top = '0';
            backdrop.style.left = '0';
            backdrop.style.width = '100%';
            backdrop.style.height = '100%';
            backdrop.style.backgroundColor = 'rgba(0,0,0,0.5)';
            backdrop.style.zIndex = '1040';
            document.body.appendChild(backdrop);
            
            // Cerrar modal al hacer clic en backdrop
            backdrop.addEventListener('click', function() {
                closeModal();
            });
            
            // Cerrar modal al hacer clic en botón close
            const closeButtons = modal.querySelectorAll('[data-dismiss="modal"]');
            closeButtons.forEach(button => {
                button.addEventListener('click', function() {
                    closeModal();
                });
            });
            
            // Cerrar modal con ESC
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeModal();
                }
            });
            
            function closeModal() {
                modal.style.display = 'none';
                modal.classList.remove('show');
                modal.setAttribute('aria-hidden', 'true');
                if (backdrop.parentNode) {
                    backdrop.parentNode.removeChild(backdrop);
                }
            }
        }
    }
    
    // Buscar el botón del modal y agregar event listener
    const modalTrigger = document.querySelector('[data-toggle="modal"]');
    if (modalTrigger) {
        // Botón del modal encontrado
        
        modalTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            // Botón del modal clickeado
            
            // Intentar usar jQuery primero, si no funciona usar método manual
            if (!openModalWithJQuery()) {
                openModalManually();
            }
        });
    } else {
        // Botón del modal no encontrado
    }
    
    // Verificar que Bootstrap esté funcionando
    setTimeout(function() {
        if (window.jQuery && window.jQuery.fn && window.jQuery.fn.modal) {
            // Bootstrap modal disponible
        } else {
            // Bootstrap modal no disponible, usando método manual
        }
    }, 1000);
});
