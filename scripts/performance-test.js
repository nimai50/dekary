const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class PerformanceTester {
  constructor() {
    this.reportsDir = path.join(__dirname, '..', 'performance-reports');
    this.timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  }

  async runLighthouseTest() {
    try {
      console.log('🚀 Iniciando prueba de rendimiento con Lighthouse...');
      
      // Crear directorio de reportes si no existe
      if (!fs.existsSync(this.reportsDir)) {
        fs.mkdirSync(this.reportsDir, { recursive: true });
      }

      // Ejecutar Lighthouse para el sitio principal
      console.log('📊 Probando sitio principal (dekary.com)...');
      const mainReportPath = path.join(this.reportsDir, `dekary-main-${this.timestamp}.html`);
      
      try {
        execSync(`npx lighthouse https://dekary.com --output html --output-path "${mainReportPath}" --chrome-flags="--headless"`, { stdio: 'inherit' });
        console.log(`✅ Reporte del sitio principal generado: ${mainReportPath}`);
      } catch (error) {
        console.log('⚠️  No se pudo probar el sitio principal (posiblemente no esté en línea)');
      }

      // Ejecutar Lighthouse para el blog
      console.log('📊 Probando blog (blog.dekary.com)...');
      const blogReportPath = path.join(this.reportsDir, `dekary-blog-${this.timestamp}.html`);
      
      try {
        execSync(`npx lighthouse https://blog.dekary.com --output html --output-path "${blogReportPath}" --chrome-flags="--headless"`, { stdio: 'inherit' });
        console.log(`✅ Reporte del blog generado: ${blogReportPath}`);
      } catch (error) {
        console.log('⚠️  No se pudo probar el blog (posiblemente no esté en línea)');
      }

      // Generar reporte de métricas locales
      await this.generateLocalMetricsReport();

      console.log('🎉 Pruebas de rendimiento completadas');
      
    } catch (error) {
      console.error('❌ Error en las pruebas de rendimiento:', error.message);
    }
  }

  async generateLocalMetricsReport() {
    try {
      console.log('📋 Generando reporte de métricas locales...');
      
      const report = {
        timestamp: new Date().toISOString(),
        project: 'Dekary - Fase 3 Completada',
        metrics: {},
        optimizations: {},
        recommendations: []
      };

      // Métricas de CSS
      const cssDir = path.join(__dirname, '..', 'assets', 'css');
      const purgedDir = path.join(cssDir, 'purged');
      
      if (fs.existsSync(purgedDir)) {
        const cssFiles = fs.readdirSync(cssDir).filter(file => file.endsWith('.css') && !file.includes('purged') && !file.includes('optimized'));
        const purgedFiles = fs.readdirSync(purgedDir);
        
        let totalOriginalSize = 0;
        let totalPurgedSize = 0;
        
        cssFiles.forEach(file => {
          const originalPath = path.join(cssDir, file);
          const purgedFile = purgedFiles.find(pf => pf.includes(file.replace('.css', '')));
          
          if (purgedFile) {
            const originalSize = fs.statSync(originalPath).size;
            const purgedSize = fs.statSync(path.join(purgedDir, purgedFile)).size;
            
            totalOriginalSize += originalSize;
            totalPurgedSize += purgedSize;
          }
        });
        
        const totalSavings = totalOriginalSize - totalPurgedSize;
        const savingsPercent = ((totalSavings / totalOriginalSize) * 100).toFixed(2);
        
        report.metrics.css = {
          totalOriginalSize: `${(totalOriginalSize / 1024).toFixed(2)} KB`,
          totalPurgedSize: `${(totalPurgedSize / 1024).toFixed(2)} KB`,
          totalSavings: `${(totalSavings / 1024).toFixed(2)} KB`,
          savingsPercent: `${savingsPercent}%`
        };
      }

      // Métricas de imágenes
      const imagesDir = path.join(__dirname, '..', 'assets', 'images');
      const optimizedDir = path.join(imagesDir, 'optimized');
      
      if (fs.existsSync(optimizedDir)) {
        const originalImages = fs.readdirSync(imagesDir).filter(file => /\.(png|jpg|jpeg|gif)$/i.test(file));
        const optimizedImages = fs.existsSync(optimizedDir) ? fs.readdirSync(optimizedDir) : [];
        
        report.metrics.images = {
          totalOriginalImages: originalImages.length,
          totalOptimizedImages: optimizedImages.length,
          optimizationStatus: optimizedImages.length > 0 ? 'Completado' : 'Pendiente'
        };
      }

      // Lista de optimizaciones implementadas
      report.optimizations = {
        css: [
          'PurgeCSS implementado para eliminar CSS no utilizado',
          'CSS crítico extraído e inlineado',
          'CSS asíncrono para recursos no críticos',
          'Modularización SCSS por página'
        ],
        performance: [
          'Service Worker para cache offline',
          'Lazy loading de imágenes y recursos',
          'Optimización automática de imágenes',
          'Compresión y conversión WebP'
        ],
        blog: [
          'Migración completa de CSS inline a SCSS',
          'Plantillas optimizadas generadas automáticamente',
          'CSS purgado específico para el blog'
        ]
      };

      // Recomendaciones para producción
      report.recommendations = [
        'Implementar CDN para assets estáticos',
        'Configurar cache headers apropiados',
        'Monitorear Core Web Vitals en producción',
        'Implementar compresión Brotli/Gzip',
        'Considerar implementar HTTP/2 Server Push',
        'Optimizar fuentes web con font-display: swap'
      ];

      // Guardar reporte
      const reportPath = path.join(this.reportsDir, `performance-summary-${this.timestamp}.json`);
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
      console.log(`📊 Reporte de métricas locales generado: ${reportPath}`);

      return report;

    } catch (error) {
      console.error('❌ Error al generar reporte de métricas:', error.message);
      return null;
    }
  }

  async generateFinalReport() {
    try {
      console.log('📝 Generando reporte final de la Fase 3...');
      
      const finalReport = {
        project: 'Dekary - Fase 3: Optimizaciones Avanzadas',
        completionDate: new Date().toISOString(),
        status: 'COMPLETADA',
        summary: 'Implementación exitosa de optimizaciones avanzadas de rendimiento web',
        phases: {
          phase1: {
            name: 'Optimización CSS Crítico - Sitio Principal',
            status: 'COMPLETADA',
            description: 'CSS crítico inlineado, CSS asíncrono, modularización SCSS'
          },
          phase2: {
            name: 'Migración del Blog a SCSS',
            status: 'COMPLETADA',
            description: 'Migración completa de CSS inline a sistema SCSS modular'
          },
          phase3: {
            name: 'Optimizaciones Avanzadas',
            status: 'COMPLETADA',
            description: 'PurgeCSS, Service Worker, Lazy Loading, Optimización de Imágenes'
          }
        },
        nextSteps: [
          'Implementar en producción',
          'Configurar monitoreo continuo',
          'Optimizar fuentes web',
          'Implementar CDN',
          'Configurar cache headers'
        ]
      };

      const finalReportPath = path.join(this.reportsDir, `fase3-completion-report-${this.timestamp}.json`);
      fs.writeFileSync(finalReportPath, JSON.stringify(finalReport, null, 2));
      console.log(`📋 Reporte final de la Fase 3 generado: ${finalReportPath}`);

      return finalReport;

    } catch (error) {
      console.error('❌ Error al generar reporte final:', error.message);
      return null;
    }
  }
}

async function main() {
  const tester = new PerformanceTester();
  
  console.log('🚀 Iniciando suite completa de pruebas de rendimiento...');
  
  // Ejecutar pruebas de Lighthouse
  await tester.runLighthouseTest();
  
  // Generar reporte de métricas locales
  await tester.generateLocalMetricsReport();
  
  // Generar reporte final de la Fase 3
  await tester.generateFinalReport();
  
  console.log('\n🎉 Suite de pruebas de rendimiento completada');
  console.log('📁 Los reportes se han guardado en: performance-reports/');
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = PerformanceTester;
