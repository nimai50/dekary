module.exports = {
  // Configuración para extraer CSS crítico
  inline: false,
  
  // Dimensiones de viewport para diferentes dispositivos
  dimensions: [
    { width: 320, height: 568 },   // Mobile
    { width: 768, height: 1024 },  // Tablet
    { width: 1200, height: 800 }   // Desktop
  ],
  
  // Configuración de Penthouse (extractor de CSS crítico)
  penthouse: {
    timeout: 30000,
    maxEmbeddedBase64Length: 1000,
    renderWaitTime: 1000,
    blockJSRequests: false
  },
  
  // Configuración de salida
  target: {
    css: 'critical.css',
    html: 'critical.html'
  },
  
  // Configuración de CSS
  css: [
    'assets/css/home.css',
    'assets/css/shared-base.css',
    'assets/css/shared-layout.css'
  ],
  
  // Configuración de viewport
  width: 1200,
  height: 800,
  
  // Configuración de inline
  inline: false,
  
  // Configuración de minificación
  minify: true,
  
  // Configuración de extracción
  extract: true,
  
  // Configuración de ignorar
  ignore: {
    atrule: ['@font-face', '@import'],
    rule: [/print/, /keyframes/],
    decl: (node, value) => /url\(/.test(value)
  }
};
