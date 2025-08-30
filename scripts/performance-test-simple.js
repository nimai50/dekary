/**
 * Script de prueba de rendimiento simplificado para Dekary.com
 * Evita los problemas complejos de Lighthouse y se enfoca en métricas básicas
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function testPerformanceSimple() {
  console.log('🚀 Iniciando prueba de rendimiento simplificada para Dekary.com...');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Configurar viewport
    await page.setViewport({ width: 1200, height: 800 });
    
    // Habilitar métricas de rendimiento
    await page.setCacheEnabled(false);
    
    // Navegar a la página
    console.log('📄 Navegando a index.html...');
    const startTime = Date.now();
    
    await page.goto('file://' + process.cwd() + '/index.html', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    
    const loadTime = Date.now() - startTime;
    
    // Esperar a que se estabilice
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Obtener métricas de rendimiento
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0];
      const paint = performance.getEntriesByType('paint');
      
      return {
        // Métricas de navegación
        domContentLoaded: navigation ? navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart : 0,
        loadComplete: navigation ? navigation.loadEventEnd - navigation.loadEventStart : 0,
        totalLoadTime: navigation ? navigation.loadEventEnd - navigation.fetchStart : 0,
        
        // Métricas de pintura
        firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
        firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
        
        // Recursos cargados
        resourceCount: performance.getEntriesByType('resource').length,
        
        // Tamaño de la página
        pageSize: document.documentElement.outerHTML.length,
        
        // Elementos del DOM
        domElements: document.querySelectorAll('*').length
      };
    });
    
    // Verificar elementos críticos
    const criticalElements = await page.evaluate(() => {
      const elements = {
        navigation: !!document.querySelector('.My-Nav'),
        hero: !!document.querySelector('.hero-home'),
        logo: !!document.querySelector('.hero-logo'),
        buttons: document.querySelectorAll('.btn').length,
        images: document.querySelectorAll('img').length
      };
      
      return elements;
    });
    
    // Verificar CSS crítico
    const cssStatus = await page.evaluate(() => {
      const root = document.documentElement;
      const computedStyle = window.getComputedStyle(root);
      
      return {
        customProperties: computedStyle.getPropertyValue('--Blue__500') !== '',
        fontFamily: computedStyle.fontFamily,
        backgroundColor: computedStyle.backgroundColor,
        bodyVisibility: window.getComputedStyle(document.body).visibility,
        bodyOpacity: window.getComputedStyle(document.body).opacity
      };
    });
    
    // Calcular puntuaciones simplificadas
    const scores = calculateSimpleScores(performanceMetrics, criticalElements, cssStatus);
    
    // Generar reporte
    const report = {
      timestamp: new Date().toISOString(),
      project: 'Dekary - Prueba de Rendimiento Simplificada',
      loadTime: loadTime,
      performanceMetrics,
      criticalElements,
      cssStatus,
      scores,
      recommendations: generateRecommendations(scores, performanceMetrics)
    };
    
    // Guardar reporte
    const reportPath = path.join(__dirname, '..', 'performance-reports', `simple-performance-${Date.now()}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    // Mostrar resultados
    console.log('\n📊 RESULTADOS DE LA PRUEBA SIMPLIFICADA:');
    console.log('==================================================');
    console.log(`   Tiempo de carga: ${loadTime}ms`);
    console.log(`   Tiempo total: ${performanceMetrics.totalLoadTime.toFixed(0)}ms`);
    console.log(`   Primer pintado: ${performanceMetrics.firstPaint.toFixed(0)}ms`);
    console.log(`   Primer contenido: ${performanceMetrics.firstContentfulPaint.toFixed(0)}ms`);
    console.log(`   Elementos DOM: ${performanceMetrics.domElements}`);
    console.log(`   Recursos: ${performanceMetrics.resourceCount}`);
    console.log('==================================================');
    
    console.log('\n🎯 PUNTUACIONES SIMPLIFICADAS:');
    console.log(`   Rendimiento: ${scores.performance}/100`);
    console.log(`   Funcionalidad: ${scores.functionality}/100`);
    console.log(`   CSS: ${scores.css}/100`);
    console.log(`   PUNTUACIÓN GENERAL: ${scores.overall}/100`);
    
    console.log('\n💡 RECOMENDACIONES:');
    report.recommendations.forEach((rec, index) => {
      console.log(`   ${index + 1}. ${rec}`);
    });
    
    console.log(`\n📁 Reporte guardado en: ${reportPath}`);
    
    return scores.overall >= 70;
    
  } catch (error) {
    console.error('❌ Error durante la prueba:', error.message);
    return false;
  } finally {
    await browser.close();
  }
}

function calculateSimpleScores(metrics, elements, css) {
  // Puntuación de rendimiento (40%)
  let performanceScore = 100;
  if (metrics.totalLoadTime > 3000) performanceScore -= 20;
  if (metrics.totalLoadTime > 5000) performanceScore -= 30;
  if (metrics.firstContentfulPaint > 2000) performanceScore -= 25;
  if (metrics.resourceCount > 20) performanceScore -= 15;
  
  // Puntuación de funcionalidad (35%)
  let functionalityScore = 100;
  if (!elements.navigation) functionalityScore -= 30;
  if (!elements.hero) functionalityScore -= 30;
  if (!elements.logo) functionalityScore -= 20;
  if (elements.buttons === 0) functionalityScore -= 20;
  
  // Puntuación de CSS (25%)
  let cssScore = 100;
  if (!css.customProperties) cssScore -= 40;
  if (css.bodyVisibility !== 'visible') cssScore -= 30;
  if (css.bodyOpacity !== '1') cssScore -= 30;
  
  return {
    performance: Math.max(0, Math.round(performanceScore)),
    functionality: Math.max(0, Math.round(functionalityScore)),
    css: Math.max(0, Math.round(cssScore)),
    overall: Math.round((performanceScore * 0.4) + (functionalityScore * 0.35) + (cssScore * 0.25))
  };
}

function generateRecommendations(scores, metrics) {
  const recommendations = [];
  
  if (scores.performance < 80) {
    if (metrics.totalLoadTime > 3000) {
      recommendations.push('Optimizar tiempo de carga: reducir recursos y optimizar CSS crítico');
    }
    if (metrics.firstContentfulPaint > 2000) {
      recommendations.push('Mejorar First Contentful Paint: optimizar renderizado inicial');
    }
  }
  
  if (scores.functionality < 80) {
    recommendations.push('Verificar que todos los elementos críticos estén presentes y visibles');
  }
  
  if (scores.css < 80) {
    recommendations.push('Revisar implementación del CSS crítico inline');
  }
  
  if (recommendations.length === 0) {
    recommendations.push('¡Excelente rendimiento! Mantener las optimizaciones actuales');
  }
  
  return recommendations;
}

// Ejecutar si se llama directamente
if (require.main === module) {
  testPerformanceSimple()
    .then(success => {
      console.log(`\n${success ? '✅' : '⚠️'} Prueba completada ${success ? 'exitosamente' : 'con advertencias'}`);
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('Error fatal:', error);
      process.exit(1);
    });
}

module.exports = { testPerformanceSimple };
