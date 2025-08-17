// Script de prueba para el modal - No depende de jQuery
document.addEventListener('DOMContentLoaded', function() {
    console.log('Modal test script cargado');
    
    // Buscar el botón que abre el modal
    const modalTrigger = document.querySelector('[data-toggle="modal"]');
    if (modalTrigger) {
        console.log('Botón del modal encontrado:', modalTrigger);
        
        // Agregar event listener
        modalTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Botón del modal clickeado');
            
            // Buscar el modal
            const modal = document.getElementById('exampleModal');
            if (modal) {
                console.log('Modal encontrado:', modal);
                
                // Mostrar el modal manualmente
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
                
            } else {
                console.error('Modal no encontrado');
            }
        });
    } else {
        console.error('Botón del modal no encontrado');
    }
});
