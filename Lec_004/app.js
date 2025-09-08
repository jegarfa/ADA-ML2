// Initialize reveal.js presentation for SVM lecture
document.addEventListener('DOMContentLoaded', function() {
    // Configure MathJax before initializing Reveal
    window.MathJax = {
        tex: {
            inlineMath: [['$', '$'], ['\\(', '\\)']],
            displayMath: [['$$', '$$'], ['\\[', '\\]']],
            processEscapes: true,
            processEnvironments: true,
            packages: ['base', 'ams', 'noerrors', 'noundefined']
        },
        options: {
            ignoreHtmlClass: 'tex2jax_ignore',
            processHtmlClass: 'tex2jax_process'
        },
        startup: {
            ready() {
                MathJax.startup.defaultReady();
                // Re-render math when slides change
                Reveal.addEventListener('slidechanged', function(event) {
                    MathJax.typesetPromise([event.currentSlide]).catch(function(err) {
                        console.error('MathJax typeset failed: ' + err.message);
                    });
                });
            }
        }
    };

    // Initialize Reveal.js
    Reveal.initialize({
        // Display controls in the bottom right corner
        controls: true,
        
        // Display a presentation progress bar
        progress: true,
        
        // Display the page number of the current slide
        slideNumber: 'c/t',
        
        // Add the current slide number to the URL hash
        hash: true,
        
        // Enable keyboard shortcuts for navigation
        keyboard: true,
        
        // Enable the slide overview mode
        overview: true,
        
        // Vertical centering of slides
        center: false,
        
        // Enables touch navigation on devices with touch input
        touch: true,
        
        // Loop the presentation
        loop: false,
        
        // Change the presentation direction to be RTL
        rtl: false,
        
        // Randomizes the order of slides each time the presentation loads
        shuffle: false,
        
        // Turns fragments on and off globally
        fragments: true,
        
        // Flags whether to include the current fragment in the URL
        fragmentInURL: true,
        
        // Flags if the presentation is running in an embedded mode
        embedded: false,
        
        // Flags if we should show a help overlay when the questionmark key is pressed
        help: true,
        
        // Flags if it should be possible to pause the presentation
        pausable: true,
        
        // Flags if speaker notes should be visible to all viewers
        showNotes: false,
        
        // Global override for auto-playing embedded media (video/audio/iframe)
        autoPlayMedia: null,
        
        // Global override for preloading lazy-loaded iframes
        preloadIframes: null,
        
        // Number of milliseconds between automatically proceeding to the next slide
        autoSlide: 0,
        
        // Stop auto-sliding after user input
        autoSlideStoppable: true,
        
        // Use this method for navigation when auto-sliding
        autoSlideMethod: null,
        
        // Specify the average time in seconds that you think you will spend presenting each slide
        defaultTiming: null,
        
        // Enable slide navigation via mouse wheel
        mouseWheel: false,
        
        // Apply a 3D roll to links on hover
        rollingLinks: false,
        
        // Hides the address bar on mobile devices
        hideAddressBar: true,
        
        // Opens links in an iframe preview overlay
        previewLinks: false,
        
        // Transition style
        transition: 'slide', // none/fade/slide/convex/concave/zoom
        
        // Transition speed
        transitionSpeed: 'default', // default/fast/slow
        
        // Transition style for full page slide backgrounds
        backgroundTransition: 'fade', // none/fade/slide/convex/concave/zoom
        
        // Number of slides away from the current that are visible
        viewDistance: 3,
        
        // Number of slides away from the current that are visible on mobile devices
        mobileViewDistance: 2,
        
        // The display mode that will be used to show slides
        display: 'block',
        
        // Hide cursor if inactive
        hideInactiveCursor: true,
        
        // Time before the cursor is hidden (in ms)
        hideCursorTime: 5000,
        
        // Plugin configuration
        plugins: [
            RevealMarkdown,
            RevealHighlight,
            RevealMath.KaTeX
        ],
        
        // Markdown plugin configuration
        markdown: {
            smartypants: true
        },
        
        // Syntax highlighting configuration
        highlight: {
            highlightOnLoad: true,
            tabReplace: '    '
        },
        
        // Math plugin configuration
        math: {
            mathjax: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js',
            config: 'TeX-AMS_HTML-full',
            // pass other options into `MathJax.Hub.Config()`
            TeX: {
                Macros: {
                    RR: "{\\bf R}",
                    bold: ["{\\bf #1}", 1]
                }
            }
        }
    });

    // Custom event handlers
    Reveal.addEventListener('ready', function(event) {
        console.log('SVM Lecture presentation ready!');
        
        // Add custom keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // Press 'f' for fullscreen
            if (e.key === 'f' || e.key === 'F') {
                toggleFullscreen();
            }
            
            // Press 'h' to show/hide help overlay
            if (e.key === 'h' || e.key === 'H') {
                showHelp();
            }
            
            // Press 'p' to print/export slides
            if (e.key === 'p' || e.key === 'P') {
                window.print();
            }
        });
        
        // Initialize slide counter
        updateSlideInfo();
    });

    Reveal.addEventListener('slidechanged', function(event) {
        // Update slide information
        updateSlideInfo();
        
        // Log current slide for analytics
        console.log('Slide changed to:', event.indexh + 1);
        
        // Handle any slide-specific JavaScript
        handleSlideSpecificContent(event.currentSlide);
    });

    // Custom functions
    function updateSlideInfo() {
        const indices = Reveal.getIndices();
        const totalSlides = Reveal.getTotalSlides();
        
        // Update browser title with current slide
        const slideTitle = getCurrentSlideTitle();
        if (slideTitle) {
            document.title = `${slideTitle} - SVM Lecture`;
        }
    }

    function getCurrentSlideTitle() {
        const currentSlide = Reveal.getCurrentSlide();
        const heading = currentSlide.querySelector('h1, h2, h3');
        return heading ? heading.textContent.trim() : null;
    }

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    function showHelp() {
        const helpContent = `
            <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                        background: var(--color-surface); padding: 2rem; border-radius: 8px; 
                        box-shadow: 0 4px 20px rgba(0,0,0,0.3); z-index: 1000; max-width: 500px;">
                <h3 style="margin-top: 0; color: var(--color-primary);">Keyboard Shortcuts</h3>
                <ul style="list-style: none; padding: 0;">
                    <li><strong>Arrow keys:</strong> Navigate slides</li>
                    <li><strong>Space/Page Down:</strong> Next slide</li>
                    <li><strong>Page Up:</strong> Previous slide</li>
                    <li><strong>Home/End:</strong> First/Last slide</li>
                    <li><strong>ESC/O:</strong> Slide overview</li>
                    <li><strong>F:</strong> Toggle fullscreen</li>
                    <li><strong>S:</strong> Speaker notes</li>
                    <li><strong>P:</strong> Print slides</li>
                    <li><strong>?:</strong> Show/hide help</li>
                </ul>
                <button onclick="this.parentElement.remove()" 
                        style="background: var(--color-primary); color: white; border: none; 
                               padding: 8px 16px; border-radius: 4px; cursor: pointer; float: right;">
                    Close
                </button>
            </div>
        `;
        
        const helpOverlay = document.createElement('div');
        helpOverlay.innerHTML = helpContent;
        helpOverlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
            background: rgba(0,0,0,0.5); z-index: 999;
        `;
        helpOverlay.onclick = function(e) {
            if (e.target === helpOverlay) {
                helpOverlay.remove();
            }
        };
        
        document.body.appendChild(helpOverlay);
    }

    function handleSlideSpecificContent(slide) {
        // Handle code highlighting for current slide
        if (slide.querySelector('pre code')) {
            // Re-highlight code blocks
            slide.querySelectorAll('pre code').forEach(function(block) {
                hljs.highlightElement(block);
            });
        }
        
        // Handle any interactive elements
        const slideIndex = Reveal.getIndices().h;
        
        // Add special handling for specific slides if needed
        switch(slideIndex) {
            case 0: // Title slide
                console.log('Welcome to SVM lecture!');
                break;
            case 13: // Scikit-learn implementation slide
                console.log('Code example slide - ensure syntax highlighting is active');
                break;
            case 22: // Homework slide
                console.log('Homework assignment slide');
                break;
        }
    }

    // Utility function to export slides (if needed)
    function exportSlides() {
        const printUrl = window.location.href + '?print-pdf';
        window.open(printUrl, '_blank');
    }

    // Add print styles when printing
    window.addEventListener('beforeprint', function() {
        document.body.classList.add('print-mode');
    });

    window.addEventListener('afterprint', function() {
        document.body.classList.remove('print-mode');
    });

    // Initialize theme toggle (if needed)
    function initThemeToggle() {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-color-scheme', isDark ? 'dark' : 'light');
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
            document.documentElement.setAttribute('data-color-scheme', e.matches ? 'dark' : 'light');
        });
    }

    // Initialize theme
    initThemeToggle();

    // Add loading indicator removal
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loading');
        if (loader) {
            loader.style.display = 'none';
        }
    });

    console.log('SVM Lecture app initialized successfully!');
});