/**
 * Script de prueba simplificado para verificar renderizado
 * Evita los problemas complejos de Lighthouse
 */

const puppeteer = require('puppeteer');

async function testSimpleRender() {
  console.log('🧪 Iniciando prueba de renderizado simplificado...');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Configurar viewport simple
    await page.setViewport({ width: 1200, height: 800 });
    
    // Navegar a la página
    console.log('📄 Navegando a index.html...');
    await page.goto('file://' + process.cwd() + '/index.html', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    
    // Esperar a que el contenido se renderice (método compatible)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Verificar elementos críticos
    console.log('🔍 Verificando elementos críticos...');
    
    const bodyVisible = await page.evaluate(() => {
      const body = document.body;
      const computedStyle = window.getComputedStyle(body);
      return {
        visibility: computedStyle.visibility,
        opacity: computedStyle.opacity,
        display: computedStyle.display,
        backgroundColor: computedStyle.backgroundColor
      };
    });
    
    console.log('📊 Estado del body:', bodyVisible);
    
    // Verificar navegación
    const navExists = await page.$('.My-Nav');
    const navVisible = await page.evaluate(() => {
      const nav = document.querySelector('.My-Nav');
      if (!nav) return false;
      const style = window.getComputedStyle(nav);
      return style.display !== 'none' && style.visibility !== 'hidden';
    });
    
    console.log('🧭 Navegación:', navExists ? 'Encontrada' : 'No encontrada', navVisible ? 'Visible' : 'No visible');
    
    // Verificar hero
    const heroExists = await page.$('.hero-home');
    const heroVisible = await page.evaluate(() => {
      const hero = document.querySelector('.hero-home');
      if (!hero) return false;
      const style = window.getComputedStyle(hero);
      return style.display !== 'none' && style.visibility !== 'hidden';
    });
    
    console.log('🎯 Hero:', heroExists ? 'Encontrado' : 'No encontrado', heroVisible ? 'Visible' : 'No visible');
    
    // Verificar CSS crítico
    const criticalCSSLoaded = await page.evaluate(() => {
      const root = document.documentElement;
      const computedStyle = window.getComputedStyle(root);
      return {
        hasCustomProperties: computedStyle.getPropertyValue('--Blue__500') !== '',
        fontFamily: computedStyle.fontFamily,
        backgroundColor: computedStyle.backgroundColor
      };
    });
    
    console.log('🎨 CSS Crítico:', criticalCSSLoaded);
    
    // Tomar screenshot
    await page.screenshot({ 
      path: 'test-render-result.png',
      fullPage: true 
    });
    
    console.log('📸 Screenshot guardado como test-render-result.png');
    
    // Resumen
    const allGood = navExists && navVisible && heroExists && heroVisible && criticalCSSLoaded.hasCustomProperties;
    
    if (allGood) {
      console.log('✅ ¡Renderizado exitoso! La página se está mostrando correctamente.');
    } else {
      console.log('⚠️ Algunos elementos no se están renderizando correctamente.');
    }
    
    return allGood;
    
  } catch (error) {
    console.error('❌ Error durante la prueba:', error.message);
    return false;
  } finally {
    await browser.close();
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  testSimpleRender()
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('Error fatal:', error);
      process.exit(1);
    });
}

module.exports = { testSimpleRender };
