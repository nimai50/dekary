const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Iniciando optimización avanzada de CSS para Dekary.com...\n');

// Configuración
const config = {
  cssDir: './assets/css',
  purgedDir: './assets/css/purged',
  optimizedDir: './assets/css/optimized',
  backupDir: './assets/css/backup',
  criticalDir: './assets/css/critical'
};

// Crear directorios si no existen
Object.values(config).forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Directorio creado: ${dir}`);
  }
});

// Función para ejecutar comandos
function runCommand(command, description) {
  try {
    console.log(`🔄 ${description}...`);
    const result = execSync(command, { encoding: 'utf8', stdio: 'pipe' });
    console.log(`✅ ${description} completado`);
    return result;
  } catch (error) {
    console.error(`❌ Error en ${description}:`, error.message);
    return null;
  }
}

// Función para analizar tamaño de archivos
function analyzeFileSizes() {
  console.log('\n📊 Analizando tamaños de archivos CSS...');
  
  const cssFiles = fs.readdirSync(config.cssDir).filter(file => file.endsWith('.css'));
  let totalSize = 0;
  
  cssFiles.forEach(file => {
    const filePath = path.join(config.cssDir, file);
    const stats = fs.statSync(filePath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    totalSize += stats.size;
    console.log(`   ${file}: ${sizeKB} KB`);
  });
  
  console.log(`   Total: ${(totalSize / 1024).toFixed(2)} KB`);
  return totalSize;
}

// Función para ejecutar PurgeCSS
function runPurgeCSS() {
  console.log('\n🧹 Ejecutando PurgeCSS avanzado...');
  
  const purgeCommand = `npx purgecss --config config/purgecss.config.js`;
  return runCommand(purgeCommand, 'PurgeCSS');
}

// Función para minificar CSS
function minifyCSS() {
  console.log('\n💎 Minificando CSS...');
  
  const cssFiles = fs.readdirSync(config.purgedDir).filter(file => file.endsWith('.css'));
  
  cssFiles.forEach(file => {
    const inputPath = path.join(config.purgedDir, file);
    const outputPath = path.join(config.optimizedDir, file.replace('.css', '.min.css'));
    
    // Usar cssnano para minificación
    const minifyCommand = `npx cssnano ${inputPath} ${outputPath}`;
    runCommand(minifyCommand, `Minificación de ${file}`);
  });
}

// Función para crear CSS crítico
function createCriticalCSS() {
  console.log('\n🎯 Creando CSS crítico...');
  
  // Copiar el CSS crítico existente
  const criticalSource = path.join(config.cssDir, 'critical.css');
  const criticalDest = path.join(config.criticalDir, 'critical.min.css');
  
  if (fs.existsSync(criticalSource)) {
    fs.copyFileSync(criticalSource, criticalDest);
    console.log('✅ CSS crítico copiado');
  }
}

// Función para generar reporte de optimización
function generateOptimizationReport() {
  console.log('\n📈 Generando reporte de optimización...');
  
  const originalSize = analyzeFileSizes();
  
  // Analizar archivos purgados
  if (fs.existsSync(config.purgedDir)) {
    const purgedFiles = fs.readdirSync(config.purgedDir).filter(file => file.endsWith('.css'));
    let purgedSize = 0;
    
    purgedFiles.forEach(file => {
      const filePath = path.join(config.purgedDir, file);
      const stats = fs.statSync(filePath);
      purgedSize += stats.size;
    });
    
    const savings = originalSize - purgedSize;
    const savingsPercent = ((savings / originalSize) * 100).toFixed(2);
    
    console.log(`\n🎉 RESULTADOS DE OPTIMIZACIÓN:`);
    console.log(`   Tamaño original: ${(originalSize / 1024).toFixed(2)} KB`);
    console.log(`   Tamaño después de PurgeCSS: ${(purgedSize / 1024).toFixed(2)} KB`);
    console.log(`   Ahorro: ${(savings / 1024).toFixed(2)} KB (${savingsPercent}%)`);
    
    // Guardar reporte
    const report = {
      timestamp: new Date().toISOString(),
      originalSize: originalSize,
      purgedSize: purgedSize,
      savings: savings,
      savingsPercent: savingsPercent,
      files: {
        original: fs.readdirSync(config.cssDir).filter(file => file.endsWith('.css')),
        purged: purgedFiles
      }
    };
    
    const reportPath = path.join(config.optimizedDir, 'optimization-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`   Reporte guardado en: ${reportPath}`);
  }
}

// Función principal
function main() {
  try {
    console.log('🎨 DEKARY.COM - OPTIMIZACIÓN AVANZADA DE CSS\n');
    
    // Análisis inicial
    const initialSize = analyzeFileSizes();
    
    // Ejecutar optimizaciones
    runPurgeCSS();
    minifyCSS();
    createCriticalCSS();
    
    // Generar reporte final
    generateOptimizationReport();
    
    console.log('\n✨ ¡Optimización de CSS completada exitosamente!');
    console.log('🚀 Tu sitio web ahora debería cargar más rápido.');
    
  } catch (error) {
    console.error('\n❌ Error durante la optimización:', error.message);
    process.exit(1);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  main();
}

module.exports = { main, analyzeFileSizes, runPurgeCSS };
