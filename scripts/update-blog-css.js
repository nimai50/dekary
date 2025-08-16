const fs = require('fs');
const path = require('path');

class BlogCSSUpdater {
  constructor() {
    this.blogDir = path.join(__dirname, '..', '..', 'blog-dekary-com');
    this.purgedCSSDir = path.join(__dirname, '..', 'assets', 'css', 'purged');
    this.backupDir = path.join(__dirname, '..', 'assets', 'css', 'backup');
  }

  async updateBlogTemplate() {
    try {
      console.log('🔄 Actualizando plantilla del blog...');
      
      // Crear directorio de backup si no existe
      if (!fs.existsSync(this.backupDir)) {
        fs.mkdirSync(this.backupDir, { recursive: true });
      }

      // Leer la plantilla actual
      const templatePath = path.join(this.blogDir, 'plantilla-nueva.html');
      const templateContent = fs.readFileSync(templatePath, 'utf8');

      // Crear backup
      const backupPath = path.join(this.backupDir, `plantilla-backup-${Date.now()}.html`);
      fs.writeFileSync(backupPath, templateContent);
      console.log(`✅ Backup creado: ${backupPath}`);

      // Leer el CSS purgado del blog
      const purgedCSSPath = path.join(this.purgedCSSDir, 'blog-purged.css');
      if (!fs.existsSync(purgedCSSPath)) {
        throw new Error('No se encontró el archivo CSS purgado del blog');
      }

      const purgedCSS = fs.readFileSync(purgedCSSPath, 'utf8');
      console.log(`📁 CSS purgado leído: ${purgedCSSPath}`);

      // Crear nueva plantilla con CSS purgado
      const newTemplate = this.createOptimizedTemplate(templateContent, purgedCSS);

      // Guardar nueva plantilla
      const newTemplatePath = path.join(this.blogDir, 'plantilla-optimizada.html');
      fs.writeFileSync(newTemplatePath, newTemplate);
      console.log(`✅ Nueva plantilla optimizada creada: ${newTemplatePath}`);

      // Crear plantilla con CSS externo (para producción)
      const externalTemplate = this.createExternalCSSTemplate(templateContent);
      const externalTemplatePath = path.join(this.blogDir, 'plantilla-externa.html');
      fs.writeFileSync(externalTemplatePath, externalTemplate);
      console.log(`✅ Plantilla con CSS externo creada: ${externalTemplatePath}`);

      console.log('🎉 Actualización del blog completada exitosamente');
      
      return {
        success: true,
        files: {
          optimized: newTemplatePath,
          external: externalTemplatePath,
          backup: backupPath
        }
      };

    } catch (error) {
      console.error('❌ Error al actualizar la plantilla del blog:', error.message);
      return { success: false, error: error.message };
    }
  }

  createOptimizedTemplate(originalTemplate, purgedCSS) {
    // Reemplazar todo el CSS inline con el CSS purgado
    const cssRegex = /<style[^>]*>[\s\S]*?<\/style>/gi;
    const optimizedCSS = `<style type="text/css">\n${purgedCSS}\n</style>`;
    
    let newTemplate = originalTemplate.replace(cssRegex, optimizedCSS);
    
    // Agregar comentario de optimización
    const headEnd = newTemplate.indexOf('</head>');
    if (headEnd !== -1) {
      const optimizationComment = '\n    <!-- CSS Optimizado con PurgeCSS - Generado automáticamente -->\n';
      newTemplate = newTemplate.slice(0, headEnd) + optimizationComment + newTemplate.slice(headEnd);
    }

    return newTemplate;
  }

  createExternalCSSTemplate(originalTemplate) {
    // Reemplazar CSS inline con link externo
    const cssRegex = /<style[^>]*>[\s\S]*?<\/style>/gi;
    const externalCSS = '<link rel="stylesheet" href="https://dekary.com/assets/css/purged/blog-purged.css">';
    
    let newTemplate = originalTemplate.replace(cssRegex, externalCSS);
    
    // Agregar comentario de optimización
    const headEnd = newTemplate.indexOf('</head>');
    if (headEnd !== -1) {
      const optimizationComment = '\n    <!-- CSS Externo Optimizado - Para producción -->\n';
      newTemplate = newTemplate.slice(0, headEnd) + optimizationComment + newTemplate.slice(headEnd);
    }

    return newTemplate;
  }

  async generateBlogReport() {
    try {
      const report = {
        timestamp: new Date().toISOString(),
        blogFiles: [],
        cssOptimization: {},
        recommendations: []
      };

      // Analizar archivos del blog
      const blogFiles = fs.readdirSync(this.blogDir);
      report.blogFiles = blogFiles.filter(file => file.endsWith('.html'));

      // Analizar optimización CSS
      const purgedFiles = fs.readdirSync(this.purgedCSSDir);
      const blogPurged = purgedFiles.find(file => file.includes('blog'));
      
      if (blogPurged) {
        const purgedPath = path.join(this.purgedCSSDir, blogPurged);
        const originalPath = path.join(__dirname, '..', 'assets', 'css', 'blog.css');
        
        if (fs.existsSync(originalPath)) {
          const originalSize = fs.statSync(originalPath).size;
          const purgedSize = fs.statSync(purgedPath).size;
          const savings = originalSize - purgedSize;
          const savingsPercent = ((savings / originalSize) * 100).toFixed(2);
          
          report.cssOptimization = {
            originalSize: `${(originalSize / 1024).toFixed(2)} KB`,
            purgedSize: `${(purgedSize / 1024).toFixed(2)} KB`,
            savings: `${(savings / 1024).toFixed(2)} KB`,
            savingsPercent: `${savingsPercent}%`
          };
        }
      }

      // Generar recomendaciones
      report.recommendations = [
        'Usar plantilla-optimizada.html para desarrollo y pruebas',
        'Usar plantilla-externa.html para producción',
        'Mantener backup de la plantilla original',
        'Verificar que el CSS purgado mantenga toda la funcionalidad',
        'Considerar implementar lazy loading para imágenes del blog'
      ];

      // Guardar reporte
      const reportPath = path.join(__dirname, '..', 'blog-optimization-report.json');
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
      console.log(`📊 Reporte del blog generado: ${reportPath}`);

      return report;

    } catch (error) {
      console.error('❌ Error al generar reporte del blog:', error.message);
      return null;
    }
  }
}

async function main() {
  const updater = new BlogCSSUpdater();
  
  console.log('🚀 Iniciando actualización del blog...');
  
  // Actualizar plantilla
  const updateResult = await updater.updateBlogTemplate();
  
  if (updateResult.success) {
    // Generar reporte
    const report = await updater.generateBlogReport();
    
    if (report) {
      console.log('\n📋 Resumen de la actualización:');
      console.log(`   Archivos del blog: ${report.blogFiles.length}`);
      console.log(`   Ahorro CSS: ${report.cssOptimization.savingsPercent || 'N/A'}`);
      console.log(`   Plantillas generadas: 2 (optimizada + externa)`);
      console.log(`   Backup creado: Sí`);
    }
  } else {
    console.error('❌ La actualización falló');
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = BlogCSSUpdater;
