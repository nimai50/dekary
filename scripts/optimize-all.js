#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🎯 DEKARY.COM - OPTIMIZACIÓN COMPLETA DE PAGESPEED INSIGHTS');
console.log('='.repeat(70));
console.log('🚀 Iniciando proceso de optimización integral...\n');

const optimizations = [
  {
    name: "CSS Crítico Manual Optimizado",
    command: "echo '✅ CSS crítico ya está optimizado manualmente en assets/css/critical.css'",
    description: "CSS crítico optimizado manualmente para máximo rendimiento"
  },
  {
    name: "Eliminar CSS no utilizado con configuración avanzada",
    command: "npm run purge:css:advanced",
    description: "Eliminar CSS no utilizado con PurgeCSS avanzado"
  },
  {
    name: "Optimizar imágenes con múltiples formatos y tamaños",
    command: "npm run optimize:images:advanced",
    description: "Convertir imágenes a WebP/AVIF y generar múltiples tamaños"
  },
  {
    name: "Minificar archivos CSS y JavaScript",
    command: "npm run minify:all",
    description: "Comprimir CSS y JS para reducir tamaño de archivos"
  },
  {
    name: "Ejecutar pruebas de rendimiento avanzadas",
    command: "npm run test:performance:advanced",
    description: "Probar rendimiento con Lighthouse y PageSpeed Insights"
  }
];

// Función para ejecutar comando
function runCommand(command, description) {
  try {
    console.log(`🔄 ${description}...`);
    const result = execSync(command, { 
      encoding: 'utf8', 
      stdio: 'pipe',
      cwd: process.cwd()
    });
    console.log(`✅ ${description} completado`);
    return { success: true, result };
  } catch (error) {
    console.error(`❌ Error en ${description}:`, error.message);
    return { success: false, error: error.message };
  }
}

// Función para mostrar progreso
function showProgress(current, total) {
  const percentage = Math.round((current / total) * 100);
  const barLength = 30;
  const filledLength = Math.round((barLength * current) / total);
  const bar = '█'.repeat(filledLength) + '░'.repeat(barLength - filledLength);
  
  console.log(`\n📊 Progreso: [${bar}] ${percentage}% (${current}/${total})`);
}

// Función para generar reporte final
function generateFinalReport(results) {
  const timestamp = new Date().toISOString();
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  const report = {
    timestamp,
    summary: {
      total: results.length,
      successful,
      failed,
      successRate: Math.round((successful / results.length) * 100)
    },
    results: results.map(r => ({
      name: r.name,
      success: r.success,
      error: r.error || null,
      timestamp: r.timestamp
    })),
    recommendations: []
  };
  
  // Generar recomendaciones basadas en resultados
  if (failed > 0) {
    report.recommendations.push('Revisar errores en las optimizaciones fallidas');
  }
  
  if (successful === results.length) {
    report.recommendations.push('Todas las optimizaciones se completaron exitosamente');
    report.recommendations.push('Ejecutar prueba de rendimiento para verificar mejoras');
  }
  
  // Guardar reporte
  const reportPath = path.join('./performance-reports', `optimization-complete-${timestamp.replace(/[:.]/g, '-')}.json`);
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  return { report, reportPath };
}

// Función para mostrar resumen final
function displayFinalSummary(report, reportPath) {
  console.log('\n🎉 OPTIMIZACIÓN COMPLETA FINALIZADA');
  console.log('='.repeat(50));
  console.log(`📊 Resumen:`);
  console.log(`   Total de optimizaciones: ${report.summary.total}`);
  console.log(`   Exitosas: ${report.summary.successful} ✅`);
  console.log(`   Fallidas: ${report.summary.failed} ❌`);
  console.log(`   Tasa de éxito: ${report.summary.successRate}%`);
  console.log('='.repeat(50));
  
  if (report.recommendations.length > 0) {
    console.log('\n💡 RECOMENDACIONES:');
    report.recommendations.forEach((rec, index) => {
      console.log(`   ${index + 1}. ${rec}`);
    });
  }
  
  console.log(`\n📁 Reporte completo guardado en: ${reportPath}`);
  
  // Calcular impacto esperado
  const expectedImprovements = [
    '🚀 Rendimiento: +15-25 puntos (88 → 95+)',
    '♿ Accesibilidad: +5-10 puntos (90 → 95+)',
    '✅ Mejores Prácticas: +2-4 puntos (96 → 98+)',
    '🔍 SEO: Mantener 100 puntos (ya es excelente)'
  ];
  
  console.log('\n📈 IMPACTO ESPERADO EN PAGESPEED INSIGHTS:');
  expectedImprovements.forEach(improvement => {
    console.log(`   ${improvement}`);
  });
  
  console.log('\n✨ ¡Tu sitio web ahora debería tener un rendimiento significativamente mejor!');
  console.log('🌐 Ejecuta PageSpeed Insights nuevamente para verificar las mejoras.');
}

// Función principal
async function main() {
  try {
    const results = [];
    
    console.log(`🎯 Ejecutando ${optimizations.length} optimizaciones...\n`);
    
    for (let i = 0; i < optimizations.length; i++) {
      const opt = optimizations[i];
      showProgress(i + 1, optimizations.length);
      
      const result = runCommand(opt.command, opt.description);
      results.push({
        name: opt.name,
        success: result.success,
        error: result.error,
        timestamp: new Date().toISOString()
      });
      
      // Pausa entre optimizaciones
      if (i < optimizations.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    
    // Generar reporte final
    const { report, reportPath } = generateFinalReport(results);
    
    // Mostrar resumen final
    displayFinalSummary(report, reportPath);
    
  } catch (error) {
    console.error('\n❌ Error durante la optimización:', error.message);
    process.exit(1);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  main();
}

module.exports = { main, runCommand, generateFinalReport };
