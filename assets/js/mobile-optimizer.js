/**
 * Mobile Performance Optimizer para Dekary.com
 * Optimiza específicamente el rendimiento en dispositivos móviles
 * Mejora LCP, FCP y reduce Total Blocking Time
 */

(function() {
    'use strict';
    
    // Detectar si es dispositivo móvil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    
    if (!isMobile) return; // Solo ejecutar en móvil
    
    console.log('🚀 Mobile Optimizer activado para:', navigator.userAgent);
    
    // ===== OPTIMIZACIONES DE LCP (Largest Contentful Paint) =====
    
    /**
     * Optimizar carga de imágenes críticas para LCP
     */
    function optimizeCriticalImages() {
        const criticalImages = [
            'assets/images/logo.svg',
            'assets/images/Hola.svg'
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                console.log(`✅ Imagen crítica cargada: ${src}`);
            };
        });
    }
    
    /**
     * Preload de fuentes críticas para móvil
     */
    function preloadCriticalFonts() {
        const fontLinks = [
            'https://fonts.gstatic.com/s/quicksand/v30/6xK-dSZaM9iE8KbpRA_LJ3z8mH9BOJvgkP8o58a-xw.woff2',
            'https://fonts.gstatic.com/s/playwritehu/v5/A2Bdn59A0g0xA3zDhFw-0vfVVrmTsM8.woff2'
        ];
        
        fontLinks.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = href;
            link.as = 'font';
            link.type = 'font/woff2';
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    }
    
    // ===== OPTIMIZACIONES DE FCP (First Contentful Paint) =====
    
    /**
     * Reducir animaciones en móvil para mejorar FCP
     */
    function optimizeAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                * {
                    animation-duration: 0.3s !important;
                    transition-duration: 0.3s !important;
                }
                
                .sol-animation,
                .flor-azul,
                .flor-amarilla,
                .flor-aqua,
                .flor-morada,
                .flor-naranja,
                .flor-rosa {
                    animation: none !important;
                    transition: none !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    /**
     * Optimizar tipografía para móvil
     */
    function optimizeTypography() {
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                body {
                    font-size: 16px !important;
                    line-height: 1.5 !important;
                }
                
                h1 { font-size: 2rem !important; }
                h2 { font-size: 1.5rem !important; }
                h3 { font-size: 1.25rem !important; }
                
                .hero h1 { font-size: 1.8rem !important; }
                .hero p { font-size: 1rem !important; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // ===== OPTIMIZACIONES DE TBT (Total Blocking Time) =====
    
    /**
     * Cargar scripts no críticos de forma asíncrona
     */
    function loadNonCriticalScripts() {
        const scripts = [
            'assets/js/contact-forms-only.js',
            'assets/js/modal-fix.js',
            'assets/js/sw-register.js',
            'assets/js/lazy-loading-advanced.js',
            'assets/js/image-optimizer.js'
        ];
        
        scripts.forEach(src => {
            setTimeout(() => {
                const script = document.createElement('script');
                script.src = src;
                script.async = true;
                script.defer = true;
                document.body.appendChild(script);
            }, 2000); // Cargar después de 2 segundos
        });
    }
    
    /**
     * Optimizar carga de fuentes externas
     */
    function optimizeExternalFonts() {
        // Cargar Google Fonts de forma asíncrona
        const googleFontsLink = document.querySelector('link[href*="fonts.googleapis.com"]');
        if (googleFontsLink) {
            googleFontsLink.media = 'print';
            googleFontsLink.onload = function() {
                this.media = 'all';
            };
        }
        
        // Cargar MailerLite fonts de forma asíncrona
        const mailerLiteLink = document.querySelector('link[href*="assets.mlcdn.com"]');
        if (mailerLiteLink) {
            mailerLiteLink.media = 'print';
            mailerLiteLink.onload = function() {
                this.media = 'all';
            };
        }
    }
    
    // ===== OPTIMIZACIONES DE CLS (Cumulative Layout Shift) =====
    
    /**
     * Reservar espacio para imágenes para evitar CLS
     */
    function reserveImageSpace() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.width || !img.height) {
                img.style.minHeight = '1px';
                img.style.minWidth = '1px';
            }
        });
    }
    
    /**
     * Optimizar layout para móvil
     */
    function optimizeMobileLayout() {
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .hero {
                    min-height: 80vh !important;
                    padding: 40px 20px !important;
                }
                
                .hero-logo {
                    width: 200px !important;
                    height: auto !important;
                }
                
                .container {
                    padding-left: 15px !important;
                    padding-right: 15px !important;
                }
                
                .section {
                    padding: 50px 0 !important;
                }
                
                .product-grid {
                    grid-template-columns: 1fr !important;
                    gap: 20px !important;
                }
                
                .product-card {
                    padding: 25px 20px !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // ===== OPTIMIZACIONES DE INTERACTIVIDAD =====
    
    /**
     * Mejorar Time to Interactive
     */
    function improveInteractivity() {
        // Reducir el tamaño de los botones en móvil
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            if (window.innerWidth <= 768) {
                btn.style.padding = '12px 20px';
                btn.style.fontSize = '0.9rem';
                btn.style.minWidth = '120px';
            }
        });
        
        // Optimizar formularios para móvil
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            if (window.innerWidth <= 768) {
                const inputs = form.querySelectorAll('input, textarea');
                inputs.forEach(input => {
                    input.style.fontSize = '16px'; // Evita zoom en iOS
                });
            }
        });
    }
    
    // ===== MONITOREO DE RENDIMIENTO =====
    
    /**
     * Monitorear métricas de Core Web Vitals
     */
    function monitorPerformance() {
        if ('PerformanceObserver' in window) {
            // Monitorear LCP
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('📊 LCP:', lastEntry.startTime, 'ms');
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            
            // Monitorear FCP
            const fcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('📊 FCP:', lastEntry.startTime, 'ms');
            });
            fcpObserver.observe({ entryTypes: ['first-contentful-paint'] });
            
            // Monitorear CLS
            const clsObserver = new PerformanceObserver((list) => {
                let clsValue = 0;
                for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                }
                console.log('📊 CLS:', clsValue);
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });
        }
    }
    
    // ===== INICIALIZACIÓN =====
    
    /**
     * Inicializar todas las optimizaciones
     */
    function init() {
        console.log('🚀 Iniciando optimizaciones móviles...');
        
        // Optimizaciones inmediatas
        optimizeCriticalImages();
        preloadCriticalFonts();
        optimizeAnimations();
        optimizeTypography();
        reserveImageSpace();
        optimizeMobileLayout();
        
        // Optimizaciones después de DOM ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                improveInteractivity();
                optimizeExternalFonts();
                monitorPerformance();
            });
        } else {
            improveInteractivity();
            optimizeExternalFonts();
            monitorPerformance();
        }
        
        // Cargar scripts no críticos después de un delay
        setTimeout(loadNonCriticalScripts, 1000);
        
        console.log('✅ Optimizaciones móviles completadas');
    }
    
    // Ejecutar optimizaciones
    init();
    
})();
