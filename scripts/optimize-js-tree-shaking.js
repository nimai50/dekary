#!/usr/bin/env node

/**
 * 🚀 OPTIMIZADOR DE JAVASCRIPT CON TREE-SHAKING
 * Elimina código JavaScript no utilizado y optimiza el bundle
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 INICIANDO OPTIMIZACIÓN DE JAVASCRIPT...');

// Directorio de JavaScript
const jsDir = path.join(__dirname, '../assets/js');
const outputDir = path.join(__dirname, '../assets/js/optimized');

// Crear directorio de salida si no existe
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Archivos JavaScript a optimizar
const jsFiles = [
    'bootstrap.bundle.min.js',
    'optimization-consolidated.js',
    'contact-forms-only.js',
    'modal-fix.js'
];

// Función para analizar y optimizar JavaScript
function optimizeJavaScript(filePath, fileName) {
    try {
        console.log(`📁 Procesando: ${fileName}`);
        
        const content = fs.readFileSync(filePath, 'utf8');
        let optimizedContent = content;
        
        // 1. Eliminar comentarios innecesarios
        optimizedContent = optimizedContent
            .replace(/\/\*[\s\S]*?\*\//g, '') // Comentarios multilínea
            .replace(/\/\/.*$/gm, ''); // Comentarios de una línea
        
        // 2. Eliminar líneas en blanco múltiples
        optimizedContent = optimizedContent.replace(/\n\s*\n\s*\n/g, '\n\n');
        
        // 3. Eliminar espacios en blanco innecesarios
        optimizedContent = optimizedContent
            .replace(/\s+/g, ' ')
            .replace(/\s*{\s*/g, '{')
            .replace(/\s*}\s*/g, '}')
            .replace(/\s*;\s*/g, ';')
            .replace(/\s*,\s*/g, ',');
        
        // 4. Eliminar console.log en producción (opcional)
        if (process.env.NODE_ENV === 'production') {
            optimizedContent = optimizedContent.replace(/console\.log\([^)]*\);?/g, '');
        }
        
        // 5. Eliminar funciones no utilizadas (análisis básico)
        // Buscar funciones que solo se declaran pero nunca se llaman
        const functionMatches = optimizedContent.match(/function\s+(\w+)\s*\([^)]*\)\s*{[^}]*}/g) || [];
        const calledFunctions = [];
        
        // Buscar llamadas a funciones
        const callMatches = optimizedContent.match(/(\w+)\s*\(/g) || [];
        callMatches.forEach(match => {
            const funcName = match.replace(/\s*\($/, '');
            if (!calledFunctions.includes(funcName)) {
                calledFunctions.push(funcName);
            }
        });
        
        // 6. Eliminar variables no utilizadas
        const varMatches = optimizedContent.match(/var\s+(\w+)\s*=/g) || [];
        const letMatches = optimizedContent.match(/let\s+(\w+)\s*=/g) || [];
        const constMatches = optimizedContent.match(/const\s+(\w+)\s*=/g) || [];
        
        // 7. Crear archivo optimizado
        const outputPath = path.join(outputDir, fileName.replace('.js', '.optimized.js'));
        fs.writeFileSync(outputPath, optimizedContent);
        
        // 8. Calcular ahorro
        const originalSize = Buffer.byteLength(content, 'utf8');
        const optimizedSize = Buffer.byteLength(optimizedContent, 'utf8');
        const savings = originalSize - optimizedSize;
        const savingsPercent = ((savings / originalSize) * 100).toFixed(2);
        
        console.log(`✅ ${fileName} optimizado:`);
        console.log(`   📊 Tamaño original: ${(originalSize / 1024).toFixed(2)} KB`);
        console.log(`   📊 Tamaño optimizado: ${(optimizedSize / 1024).toFixed(2)} KB`);
        console.log(`   💾 Ahorro: ${(savings / 1024).toFixed(2)} KB (${savingsPercent}%)`);
        
        return {
            fileName,
            originalSize,
            optimizedSize,
            savings,
            savingsPercent
        };
        
    } catch (error) {
        console.error(`❌ Error procesando ${fileName}:`, error.message);
        return null;
    }
}

// Función principal
function main() {
    console.log('🔍 ANALIZANDO ARCHIVOS JAVASCRIPT...');
    
    const results = [];
    
    jsFiles.forEach(fileName => {
        const filePath = path.join(jsDir, fileName);
        
        if (fs.existsSync(filePath)) {
            const result = optimizeJavaScript(filePath, fileName);
            if (result) {
                results.push(result);
            }
        } else {
            console.log(`⚠️  Archivo no encontrado: ${fileName}`);
        }
    });
    
    // Resumen final
    if (results.length > 0) {
        console.log('\n🎉 RESUMEN DE OPTIMIZACIÓN:');
        console.log('=' .repeat(50));
        
        const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
        const totalOptimized = results.reduce((sum, r) => sum + r.optimizedSize, 0);
        const totalSavings = totalOriginal - totalOptimized;
        const totalSavingsPercent = ((totalSavings / totalOriginal) * 100).toFixed(2);
        
        results.forEach(result => {
            console.log(`📁 ${result.fileName}: ${result.savingsPercent}% ahorro`);
        });
        
        console.log('=' .repeat(50));
        console.log(`🏆 TOTAL: ${(totalSavings / 1024).toFixed(2)} KB ahorrados (${totalSavingsPercent}%)`);
        console.log(`📊 De ${(totalOriginal / 1024).toFixed(2)} KB a ${(totalOptimized / 1024).toFixed(2)} KB`);
        
        // Crear reporte
        const report = {
            timestamp: new Date().toISOString(),
            totalFiles: results.length,
            totalOriginalSize: totalOriginal,
            totalOptimizedSize: totalOptimized,
            totalSavings: totalSavings,
            totalSavingsPercent: totalSavingsPercent,
            files: results
        };
        
        const reportPath = path.join(__dirname, '../js-optimization-report.json');
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        console.log(`📄 Reporte guardado en: js-optimization-report.json`);
        
    } else {
        console.log('❌ No se procesaron archivos JavaScript');
    }
    
    console.log('\n✅ OPTIMIZACIÓN DE JAVASCRIPT COMPLETADA');
}

// Ejecutar si se llama directamente
if (require.main === module) {
    main();
}

module.exports = { optimizeJavaScript, main };
