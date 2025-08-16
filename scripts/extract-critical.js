const critical = require('critical');
const fs = require('fs');
const path = require('path');

// Configuración para extraer CSS crítico
const criticalConfig = {
  inline: false,
  dimensions: [
    { width: 320, height: 568 },   // Mobile
    { width: 768, height: 1024 },  // Tablet
    { width: 1200, height: 800 }   // Desktop
  ],
  penthouse: {
    timeout: 30000,
    maxEmbeddedBase64Length: 1000
  }
};

// Páginas a procesar
const pages = [
  { 
    url: 'index.html', 
    output: 'home-critical.css',
    title: 'Home'
  },
  { 
    url: 'tienda.html', 
    output: 'tienda-critical.css',
    title: 'Tienda'
  },
  { 
    url: 'componentes.html', 
    output: 'componentes-critical.css',
    title: 'Componentes'
  },
  { 
    url: '404.html', 
    output: '404-critical.css',
    title: '404'
  }
];

async function extractCriticalCSS() {
  console.log('🚀 Iniciando extracción de CSS crítico...\n');
  
  for (const page of pages) {
    try {
      console.log(`📄 Procesando: ${page.title}`);
      
      const result = await critical.generate({
        src: page.url,
        target: {
          css: `assets/css/critical/${page.output}`,
          html: `assets/css/critical/${page.title.toLowerCase()}-critical.html`
        },
        ...criticalConfig
      });
      
      console.log(`✅ ${page.title}: CSS crítico extraído (${result.css.length} bytes)`);
      
    } catch (error) {
      console.error(`❌ Error procesando ${page.title}:`, error.message);
    }
  }
  
  console.log('\n🎉 Extracción de CSS crítico completada!');
  console.log('📁 Archivos guardados en: assets/css/critical/');
}

// Crear directorio si no existe
const criticalDir = path.join(__dirname, '../assets/css/critical');
if (!fs.existsSync(criticalDir)) {
  fs.mkdirSync(criticalDir, { recursive: true });
}

// Ejecutar extracción
extractCriticalCSS().catch(console.error);
