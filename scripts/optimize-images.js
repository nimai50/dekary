const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuración
const IMAGES_DIR = 'assets/images';
const OPTIMIZED_DIR = 'assets/images/optimized';
const WEBP_DIR = 'assets/images/webp';
const REPORT_FILE = 'image-optimization-report.json';

// Crear directorios si no existen
[OPTIMIZED_DIR, WEBP_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Función para optimizar imagen con Sharp
async function optimizeImage(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .jpeg({ quality: 85, progressive: true })
      .png({ quality: 85, progressive: true })
      .toFile(outputPath);
    
    return true;
  } catch (error) {
    console.error(`❌ Error optimizando ${path.basename(inputPath)}:`, error.message);
    return false;
  }
}

// Función para convertir a WebP con Sharp
async function convertToWebP(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp({ quality: 85, effort: 6 })
      .toFile(outputPath);
    
    return true;
  } catch (error) {
    console.error(`❌ Error convirtiendo a WebP ${path.basename(inputPath)}:`, error.message);
    return false;
  }
}

// Función principal
async function optimizeImages() {
  console.log('🚀 Iniciando optimización de imágenes...');
  
  try {
    // Obtener lista de imágenes
    const imageFiles = fs.readdirSync(IMAGES_DIR)
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.svg'].includes(ext);
      });
    
    console.log(`📁 Encontradas ${imageFiles.length} imágenes para optimizar`);
    
    let totalOriginalSize = 0;
    let totalOptimizedSize = 0;
    let totalWebPSize = 0;
    let optimizedCount = 0;
    let webpCount = 0;
    
    // Procesar cada imagen
    for (const file of imageFiles) {
      const inputPath = path.join(IMAGES_DIR, file);
      const outputPath = path.join(OPTIMIZED_DIR, file);
      const webpPath = path.join(WEBP_DIR, path.basename(file, path.extname(file)) + '.webp');
      
      const ext = path.extname(file).toLowerCase();
      
      // Obtener tamaño original
      const originalStats = fs.statSync(inputPath);
      totalOriginalSize += originalStats.size;
      
      console.log(`🔄 Optimizando: ${file}`);
      
      // Optimizar imagen
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const optimized = await optimizeImage(inputPath, outputPath);
        if (optimized) {
          const optimizedStats = fs.statSync(outputPath);
          totalOptimizedSize += optimizedStats.size;
          optimizedCount++;
          
          // Convertir a WebP
          const webpConverted = await convertToWebP(inputPath, webpPath);
          if (webpConverted) {
            const webpStats = fs.statSync(webpPath);
            totalWebPSize += webpStats.size;
            webpCount++;
            console.log(`  ✅ WebP generado: ${path.basename(webpPath)}`);
          } else {
            console.log(`  ⚠️  No se pudo generar WebP para ${file}`);
          }
        }
      } else if (ext === '.svg') {
        // Para SVG, solo copiar al directorio optimizado
        fs.copyFileSync(inputPath, outputPath);
        const optimizedStats = fs.statSync(outputPath);
        totalOptimizedSize += optimizedStats.size;
        optimizedCount++;
        console.log(`  ✅ SVG copiado`);
      }
    }
    
    // Generar reporte
    const report = {
      timestamp: new Date().toISOString(),
      totalImages: imageFiles.length,
      optimizedImages: optimizedCount,
      webpImages: webpCount,
      originalSize: totalOriginalSize,
      optimizedSize: totalOptimizedSize,
      webpSize: totalWebPSize,
      savings: totalOriginalSize - totalOptimizedSize,
      savingsPercent: ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(2)
    };
    
    // Guardar reporte
    fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2));
    
    console.log('\n✅ Optimización de imágenes completada');
    console.log('\n📊 Reporte de Optimización:');
    console.log(`   Tamaño original: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Tamaño optimizado: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Tamaño WebP: ${(totalWebPSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Ahorro: ${(report.savings / 1024 / 1024).toFixed(2)} MB (${report.savingsPercent}%)`);
    console.log(`   Reporte guardado en: ${path.resolve(REPORT_FILE)}`);
    
  } catch (error) {
    console.error('❌ Error durante la optimización:', error);
    process.exit(1);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  optimizeImages();
}

module.exports = { optimizeImages };
