const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ImageOptimizer {
  constructor() {
    this.imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg'];
    this.imagesDir = path.join(__dirname, '../assets/images');
    this.optimizedDir = path.join(__dirname, '../assets/images/optimized');
    this.webpDir = path.join(__dirname, '../assets/images/webp');
  }

  async init() {
    console.log('🚀 Iniciando optimización de imágenes...');
    
    // Crear directorios si no existen
    this.createDirectories();
    
    // Verificar herramientas de optimización
    await this.checkTools();
    
    // Optimizar imágenes
    await this.optimizeAllImages();
    
    console.log('✅ Optimización de imágenes completada');
  }

  createDirectories() {
    if (!fs.existsSync(this.optimizedDir)) {
      fs.mkdirSync(this.optimizedDir, { recursive: true });
    }
    
    if (!fs.existsSync(this.webpDir)) {
      fs.mkdirSync(this.webpDir, { recursive: true });
    }
  }

  async checkTools() {
    try {
      // Verificar si ImageMagick está instalado
      execSync('magick --version', { stdio: 'ignore' });
      console.log('✅ ImageMagick encontrado');
    } catch (error) {
      console.log('⚠️  ImageMagick no encontrado. Instalando alternativas...');
      await this.installAlternatives();
    }
  }

  async installAlternatives() {
    try {
      // Intentar instalar sharp como alternativa
      execSync('npm install --save-dev sharp', { stdio: 'inherit' });
      console.log('✅ Sharp instalado como alternativa');
    } catch (error) {
      console.log('❌ No se pudo instalar alternativas. Continuando con optimización básica...');
    }
  }

  async optimizeAllImages() {
    const files = this.getImageFiles();
    
    console.log(`📁 Encontradas ${files.length} imágenes para optimizar`);
    
    for (const file of files) {
      await this.optimizeImage(file);
    }
  }

  getImageFiles() {
    const files = [];
    
    const scanDirectory = (dir) => {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !item.includes('optimized') && !item.includes('webp')) {
          scanDirectory(fullPath);
        } else if (stat.isFile() && this.isImageFile(item)) {
          files.push(fullPath);
        }
      }
    };
    
    scanDirectory(this.imagesDir);
    return files;
  }

  isImageFile(filename) {
    const ext = path.extname(filename).toLowerCase();
    return this.imageExtensions.includes(ext);
  }

  async optimizeImage(filePath) {
    const filename = path.basename(filePath);
    const ext = path.extname(filename).toLowerCase();
    const nameWithoutExt = path.basename(filename, ext);
    
    console.log(`🔄 Optimizando: ${filename}`);
    
    try {
      // Optimizar imagen original
      await this.compressImage(filePath, ext);
      
      // Generar versión WebP si es posible
      if (ext !== '.svg' && ext !== '.gif') {
        await this.generateWebP(filePath, nameWithoutExt);
      }
      
      console.log(`✅ ${filename} optimizada`);
    } catch (error) {
      console.error(`❌ Error optimizando ${filename}:`, error.message);
    }
  }

  async compressImage(filePath, ext) {
    const filename = path.basename(filePath);
    const outputPath = path.join(this.optimizedDir, filename);
    
    try {
      if (ext === '.jpg' || ext === '.jpeg') {
        await this.compressJPG(filePath, outputPath);
      } else if (ext === '.png') {
        await this.compressPNG(filePath, outputPath);
      } else {
        // Copiar archivos que no se pueden comprimir
        fs.copyFileSync(filePath, outputPath);
      }
    } catch (error) {
      // Si falla la compresión, copiar el archivo original
      fs.copyFileSync(filePath, outputPath);
    }
  }

  async compressJPG(inputPath, outputPath) {
    try {
      // Intentar con ImageMagick
      execSync(`magick "${inputPath}" -quality 85 -strip "${outputPath}"`, { stdio: 'ignore' });
    } catch (error) {
      // Fallback: copiar archivo original
      fs.copyFileSync(inputPath, outputPath);
    }
  }

  async compressPNG(inputPath, outputPath) {
    try {
      // Intentar con ImageMagick
      execSync(`magick "${inputPath}" -strip "${outputPath}"`, { stdio: 'ignore' });
    } catch (error) {
      // Fallback: copiar archivo original
      fs.copyFileSync(inputPath, outputPath);
    }
  }

  async generateWebP(inputPath, nameWithoutExt) {
    const outputPath = path.join(this.webpDir, `${nameWithoutExt}.webp`);
    
    try {
      // Intentar con ImageMagick
      execSync(`magick "${inputPath}" -quality 85 "${outputPath}"`, { stdio: 'ignore' });
      console.log(`  📱 WebP generado: ${nameWithoutExt}.webp`);
    } catch (error) {
      console.log(`  ⚠️  No se pudo generar WebP para ${nameWithoutExt}`);
    }
  }

  // Generar reporte de optimización
  generateReport() {
    const originalSize = this.calculateDirectorySize(this.imagesDir);
    const optimizedSize = this.calculateDirectorySize(this.optimizedDir);
    const webpSize = this.calculateDirectorySize(this.webpDir);
    
    const savings = originalSize - optimizedSize;
    const savingsPercent = ((savings / originalSize) * 100).toFixed(2);
    
    const report = {
      originalSize: this.formatBytes(originalSize),
      optimizedSize: this.formatBytes(optimizedSize),
      webpSize: this.formatBytes(webpSize),
      savings: this.formatBytes(savings),
      savingsPercent,
      timestamp: new Date().toISOString()
    };
    
    const reportPath = path.join(__dirname, '../image-optimization-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log('\n📊 Reporte de Optimización:');
    console.log(`   Tamaño original: ${report.originalSize}`);
    console.log(`   Tamaño optimizado: ${report.optimizedSize}`);
    console.log(`   Tamaño WebP: ${report.webpSize}`);
    console.log(`   Ahorro: ${report.savings} (${report.savingsPercent}%)`);
    console.log(`   Reporte guardado en: ${reportPath}`);
  }

  calculateDirectorySize(dirPath) {
    let totalSize = 0;
    
    if (!fs.existsSync(dirPath)) return 0;
    
    const scanDir = (dir) => {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          scanDir(fullPath);
        } else {
          totalSize += stat.size;
        }
      }
    };
    
    scanDir(dirPath);
    return totalSize;
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

// Ejecutar optimizador
async function main() {
  const optimizer = new ImageOptimizer();
  await optimizer.init();
  optimizer.generateReport();
}

// Ejecutar si se llama directamente
if (require.main === module) {
  main().catch(console.error);
}

module.exports = ImageOptimizer;
