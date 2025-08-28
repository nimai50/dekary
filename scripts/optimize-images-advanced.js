const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

console.log('🖼️ Iniciando optimización avanzada de imágenes para Dekary.com...\n');

// Configuración
const config = {
  inputDir: './assets/images',
  outputDir: './assets/images/optimized',
  formats: ['webp', 'avif', 'jpg'],
  sizes: [
    { width: 1920, suffix: '-xl' },
    { width: 1200, suffix: '-lg' },
    { width: 768, suffix: '-md' },
    { width: 480, suffix: '-sm' },
    { width: 320, suffix: '-xs' }
  ],
  quality: {
    webp: 80,
    avif: 75,
    jpg: 85
  }
};

// Crear directorios si no existen
if (!fs.existsSync(config.outputDir)) {
  fs.mkdirSync(config.outputDir, { recursive: true });
  console.log(`✅ Directorio creado: ${config.outputDir}`);
}

// Función para obtener estadísticas de archivo
function getFileStats(filePath) {
  const stats = fs.statSync(filePath);
  return {
    size: stats.size,
    sizeKB: (stats.size / 1024).toFixed(2),
    sizeMB: (stats.size / (1024 * 1024)).toFixed(2)
  };
}

// Función para optimizar imagen individual
async function optimizeImage(inputPath, outputPath, format, width, quality) {
  try {
    const image = sharp(inputPath);
    
    // Redimensionar si se especifica
    if (width) {
      image.resize(width, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });
    }
    
    // Aplicar optimizaciones según formato
    switch (format) {
      case 'webp':
        await image.webp({ quality }).toFile(outputPath);
        break;
      case 'avif':
        await image.avif({ quality }).toFile(outputPath);
        break;
      case 'jpg':
        await image.jpeg({ quality, progressive: true }).toFile(outputPath);
        break;
      default:
        await image.toFile(outputPath);
    }
    
    return true;
  } catch (error) {
    console.error(`❌ Error optimizando ${inputPath}:`, error.message);
    return false;
  }
}

// Función para procesar imagen con múltiples formatos y tamaños
async function processImage(imagePath) {
  const fileName = path.basename(imagePath, path.extname(imagePath));
  const inputStats = getFileStats(imagePath);
  
  console.log(`\n🔄 Procesando: ${fileName}`);
  console.log(`   Tamaño original: ${inputStats.sizeKB} KB`);
  
  let totalOptimizedSize = 0;
  let successCount = 0;
  
  // Procesar cada formato y tamaño
  for (const format of config.formats) {
    for (const size of config.sizes) {
      const outputFileName = `${fileName}${size.suffix}.${format}`;
      const outputPath = path.join(config.outputDir, outputFileName);
      
      const success = await optimizeImage(
        imagePath,
        outputPath,
        format,
        size.width,
        config.quality[format]
      );
      
      if (success) {
        const outputStats = getFileStats(outputPath);
        totalOptimizedSize += outputStats.size;
        successCount++;
        
        console.log(`   ✅ ${outputFileName}: ${outputStats.sizeKB} KB (${size.width}px)`);
      }
    }
  }
  
  // Calcular ahorro
  const totalOriginalSize = inputStats.size * config.formats.length * config.sizes.length;
  const savings = totalOriginalSize - totalOptimizedSize;
  const savingsPercent = ((savings / totalOriginalSize) * 100).toFixed(2);
  
  console.log(`   💾 Total optimizado: ${(totalOptimizedSize / 1024).toFixed(2)} KB`);
  console.log(`   🎯 Ahorro: ${(savings / 1024).toFixed(2)} KB (${savingsPercent}%)`);
  
  return {
    fileName,
    originalSize: inputStats.size,
    optimizedSize: totalOptimizedSize,
    savings,
    successCount
  };
}

// Función para generar srcset HTML
function generateSrcsetHTML(fileName, format) {
  let srcset = '';
  let sizes = '';
  
  config.sizes.forEach((size, index) => {
    const imagePath = `${fileName}${size.suffix}.${format}`;
    if (index > 0) srcset += ', ';
    srcset += `${imagePath} ${size.width}w`;
  });
  
  sizes = '(max-width: 320px) 320px, (max-width: 480px) 480px, (max-width: 768px) 768px, (max-width: 1200px) 1200px, 1920px';
  
  return { srcset, sizes };
}

// Función para generar código HTML optimizado
function generateOptimizedHTML(results) {
  let html = '<!-- ===== IMÁGENES OPTIMIZADAS GENERADAS AUTOMÁTICAMENTE ===== -->\n';
  html += '<!-- Usar estos elementos en lugar de <img> simples para mejor rendimiento -->\n\n';
  
  results.forEach(result => {
    html += `<!-- ${result.fileName} -->\n`;
    
    // WebP con fallback
    html += `<picture>\n`;
    html += `  <source type="image/webp" srcset="${generateSrcsetHTML(result.fileName, 'webp').srcset}" sizes="${generateSrcsetHTML(result.fileName, 'webp').sizes}">\n`;
    html += `  <source type="image/avif" srcset="${generateSrcsetHTML(result.fileName, 'avif').srcset}" sizes="${generateSrcsetHTML(result.fileName, 'avif').sizes}">\n`;
    html += `  <img src="${result.fileName}-lg.jpg" alt="${result.fileName}" loading="lazy" class="optimized-image">\n`;
    html += `</picture>\n\n`;
  });
  
  return html;
}

// Función para generar reporte de optimización
function generateOptimizationReport(results) {
  const totalOriginalSize = results.reduce((sum, r) => sum + r.originalSize, 0);
  const totalOptimizedSize = results.reduce((sum, r) => sum + r.optimizedSize, 0);
  const totalSavings = totalOriginalSize - totalOptimizedSize;
  const totalSavingsPercent = ((totalSavings / totalOriginalSize) * 100).toFixed(2);
  
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalImages: results.length,
      totalOriginalSize: totalOriginalSize,
      totalOptimizedSize: totalOptimizedSize,
      totalSavings: totalSavings,
      totalSavingsPercent: totalSavingsPercent
    },
    images: results,
    config: config
  };
  
  const reportPath = path.join(config.outputDir, 'image-optimization-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  console.log('\n📊 REPORTE DE OPTIMIZACIÓN:');
  console.log(`   Total de imágenes: ${results.length}`);
  console.log(`   Tamaño original total: ${(totalOriginalSize / 1024).toFixed(2)} KB`);
  console.log(`   Tamaño optimizado total: ${(totalOptimizedSize / 1024).toFixed(2)} KB`);
  console.log(`   Ahorro total: ${(totalSavings / 1024).toFixed(2)} KB (${totalSavingsPercent}%)`);
  console.log(`   Reporte guardado en: ${reportPath}`);
  
  return report;
}

// Función principal
async function main() {
  try {
    // Verificar que Sharp esté disponible
    if (!sharp) {
      throw new Error('Sharp no está disponible. Instala con: npm install sharp');
    }
    
    // Obtener lista de imágenes
    const imageFiles = fs.readdirSync(config.inputDir)
      .filter(file => /\.(jpg|jpeg|png|gif|bmp|tiff)$/i.test(file))
      .map(file => path.join(config.inputDir, file));
    
    if (imageFiles.length === 0) {
      console.log('⚠️ No se encontraron imágenes para optimizar');
      return;
    }
    
    console.log(`📸 Encontradas ${imageFiles.length} imágenes para optimizar\n`);
    
    // Procesar cada imagen
    const results = [];
    for (const imagePath of imageFiles) {
      const result = await processImage(imagePath);
      results.push(result);
    }
    
    // Generar reporte
    const report = generateOptimizationReport(results);
    
    // Generar HTML optimizado
    const htmlOutput = generateOptimizedHTML(results);
    const htmlPath = path.join(config.outputDir, 'optimized-images.html');
    fs.writeFileSync(htmlPath, htmlOutput);
    
    console.log(`\n📝 Código HTML optimizado guardado en: ${htmlPath}`);
    console.log('\n✨ ¡Optimización de imágenes completada exitosamente!');
    console.log('🚀 Tu sitio web ahora debería cargar imágenes más rápido.');
    
  } catch (error) {
    console.error('\n❌ Error durante la optimización:', error.message);
    process.exit(1);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  main();
}

module.exports = { main, processImage, generateSrcsetHTML };
