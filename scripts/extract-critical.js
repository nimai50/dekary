const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Cargar configuración desde archivo externo
const criticalConfig = require('../config/critical.config.js');

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
  try {
    console.log('🔍 Extrayendo CSS crítico...');
    
    // Usar import dinámico para critical
    const critical = await import('critical');
    
    const htmlContent = fs.readFileSync('index.html', 'utf8');
    const result = await critical.default.generate({
      html: htmlContent,
      inline: false,
      dimensions: [
        { width: 1200, height: 900 }, // Desktop
        { width: 375, height: 667 }   // Mobile
      ],
      target: {
        css: 'assets/css/critical.css',
        html: 'index-critical.html'
      }
    });
    
    console.log('✅ CSS crítico extraído exitosamente');
    return result;
  } catch (error) {
    console.error('❌ Error extrayendo CSS crítico:', error.message);
    throw error;
  }
}

// Función principal
async function main() {
  try {
    console.log('🚀 DEKARY.COM - EXTRACCIÓN DE CSS CRÍTICO');
    console.log('==========================================\n');
    
    // Verificar que existan los archivos necesarios
    if (!fs.existsSync('index.html')) {
      throw new Error('No se encontró index.html en el directorio actual');
    }
    
    // Crear directorio para CSS crítico si no existe
    const criticalDir = 'assets/css/critical';
    if (!fs.existsSync(criticalDir)) {
      fs.mkdirSync(criticalDir, { recursive: true });
    }
    
    // Extraer CSS crítico
    await extractCriticalCSS();
    
    console.log('\n🎉 ¡Proceso completado exitosamente!');
    console.log('📁 CSS crítico guardado en: assets/css/critical/');
    
  } catch (error) {
    console.error('\n❌ Error en el proceso:', error.message);
    process.exit(1);
  }
}

// Ejecutar función principal
main();
