module.exports = {
  content: [
    '**/*.html',
    '**/*.js'
  ],
  css: [
    'assets/css/*.css',
    'assets/css/optimized/*.css'
  ],
  output: 'assets/css/purged/',
  safelist: [
    // Clases que deben mantenerse siempre
    'fade-in',
    'slide-up',
    'bounce',
    'pulse',
    'shake',
    'fadeIn',
    'fadeInUp',
    'fadeInDown',
    'slideInUp',
    'slideInDown',
    // Clases de animación
    'animated',
    'infinite',
    // Clases de estado
    'active',
    'hover',
    'focus',
    'disabled',
    'loading',
    // Clases de JavaScript
    'js-*',
    'data-*'
  ],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
}
