module.exports = {
  content: [
    '*.html',
    '**/*.html',
    'assets/js/**/*.js',
    'assets/css/**/*.css'
  ],
  css: [
    'assets/css/home.css',
    'assets/css/tienda.css',
    'assets/css/componentes.css',
    'assets/css/404.css',
    'assets/css/blog.css',
    'assets/css/shared-base.css',
    'assets/css/shared-layout.css',
    'assets/css/styles.css',
    'assets/css/fontawesome.css',
    'assets/css/contact-forms.css',
    'assets/css/design-fixes.css',
    'assets/css/animate.css'
  ],
  output: 'assets/css/purged/',
  safelist: [
    // Elementos dinámicos que no se pueden detectar estáticamente
    'fade-in',
    'fade-out',
    'show',
    'hide',
    'active',
    'inactive',
    'loading',
    'loaded',
    'error',
    'success',
    'warning',
    'info',
    
    // Clases de Bootstrap que se generan dinámicamente
    'col-*',
    'row-*',
    'd-*',
    'text-*',
    'bg-*',
    'border-*',
    'shadow-*',
    'rounded-*',
    'p-*',
    'm-*',
    'w-*',
    'h-*',
    
    // Clases de animación
    'animate__*',
    'bounceIn',
    'fadeIn',
    'slideIn',
    'zoomIn',
    
    // Clases de FontAwesome
    'fa-*',
    'fas',
    'far',
    'fab',
    
    // Clases específicas de Dekary
    'hero-*',
    'flor-*',
    'sol-*',
    'nav-*',
    'btn-*',
    'modal-*',
    'category-*',
    'subscribe-*',
    'wave-*',
    'divider-*',
    'social-*',
    
    // Estados de formularios
    'form-control',
    'form-group',
    'input-group',
    'input-group-*',
    'is-valid',
    'is-invalid',
    'was-validated',
    
    // Clases de accesibilidad
    'sr-only',
    'visually-hidden',
    'focus-visible',
    'skip-link'
  ],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
  fontFace: true,
  keyframes: true,
  variables: true,
  rejected: true,
  rejectedCss: true,
  sourceMap: false,
  stdin: false,
  stdout: false,
  verbose: true
};
