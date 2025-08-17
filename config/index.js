/**
 * Configuración principal del proyecto Dekary
 * Centraliza todas las configuraciones en un solo lugar
 */

const path = require('path');

module.exports = {
  // Rutas del proyecto
  paths: {
    root: path.resolve(__dirname, '..'),
    scss: path.resolve(__dirname, '../scss'),
    assets: path.resolve(__dirname, '../assets'),
    css: path.resolve(__dirname, '../assets/css'),
    js: path.resolve(__dirname, '../assets/js'),
    images: path.resolve(__dirname, '../assets/images'),
    scripts: path.resolve(__dirname, '../scripts'),
    docs: path.resolve(__dirname, '../docs'),
    config: __dirname
  },

  // Configuración de build
  build: {
    cssOutput: 'assets/css',
    cssOptimized: 'assets/css/optimized',
    cssCritical: 'assets/css/critical',
    cssPurged: 'assets/css/purged',
    imagesOptimized: 'assets/images/webp'
  },

  // Configuración de PostCSS
  postcss: require('./postcss.config.js'),

  // Configuración de Critical CSS
  critical: require('./critical.config.js'),

  // Configuración de PurgeCSS
  purgecss: require('./purgecss.config.js'),

  // Configuración del proyecto
  project: {
    name: 'Dekary',
    version: '1.0.0',
    description: 'La papelería de Kary',
    author: 'Liz Martinez',
    license: 'ISC',
    urls: {
      main: 'https://dekary.com',
      blog: 'https://blog.dekary.com'
    }
  },

  // Configuración de desarrollo
  development: {
    port: 3000,
    host: 'localhost',
    open: true,
    watch: true
  },

  // Configuración de producción
  production: {
    minify: true,
    sourcemaps: false,
    optimize: true
  }
};
