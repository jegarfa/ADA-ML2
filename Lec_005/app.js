// Initialize Reveal.js presentation with plugins
Reveal.initialize({
    // Display options
    width: 1200,
    height: 700,
    margin: 0.1,
    minScale: 0.2,
    maxScale: 2.0,
    
    // Navigation
    controls: true,
    controlsTutorial: true,
    controlsLayout: 'bottom-right',
    controlsBackArrows: 'faded',
    progress: true,
    slideNumber: 'c/t',
    showSlideNumber: 'all',
    
    // Presentation mode
    hash: true,
    history: true,
    keyboard: true,
    overview: true,
    center: true,
    touch: true,
    loop: false,
    rtl: false,
    shuffle: false,
    fragments: true,
    fragmentInURL: true,
    embedded: false,
    help: true,
    pause: true,
    showNotes: false,
    
    // Auto-slide (disabled for lecture)
    autoSlide: 0,
    autoSlideStoppable: true,
    autoSlideMethod: null,
    
    // Transition effects
    transition: 'slide', // none/fade/slide/convex/concave/zoom
    transitionSpeed: 'default', // default/fast/slow
    backgroundTransition: 'fade', // none/fade/slide/convex/concave/zoom
    
    // Parallax scrolling (disabled)
    parallaxBackgroundImage: '',
    parallaxBackgroundSize: '',
    parallaxBackgroundHorizontal: null,
    parallaxBackgroundVertical: null,
    
    // Display the presentation control arrows
    navigationMode: 'default', // default/linear/grid
    
    // Plugins
    plugins: [
        RevealMarkdown,
        RevealHighlight,
        RevealMath.KaTeX
    ],
    
    // Plugin configurations
    markdown: {
        smartypants: true,
        breaks: true,
        gfm: true,
        renderer: null
    },
    
    highlight: {
        highlightOnLoad: true,
        tabReplace: '    ',
        escapeHTML: true
    },
    
    math: {
        mathjax: null,
        katex: {
            version: 'latest',
            delimiters: [
                {left: '$$', right: '$$', display: true},
                {left: '$', right: '$', display: false},
                {left: '\\(', right: '\\)', display: false},
                {left: '\\[', right: '\\]', display: true}
            ],
            ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre']
        },
        config: 'TeX-AMS_HTML-full',
        tex2jax: {
            inlineMath: [['$','$'], ['\\(','\\)']],
            displayMath: [['$$','$$'], ['\\[','\\]']],
            skipTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
            processEscapes: true
        }
    }
});

// Custom event listeners and functionality
Reveal.on('ready', function(event) {
    console.log('PCA Presentation loaded successfully');
    
    // Add custom keyboard shortcuts
    document.addEventListener('keydown', function(event) {
        // Press 'h' for help
        if (event.key === 'h' && !event.ctrlKey && !event.metaKey) {
            showHelp();
        }
        
        // Press 'p' to toggle presenter mode
        if (event.key === 'p' && !event.ctrlKey && !event.metaKey) {
            togglePresenterMode();
        }
        
        // Press 'o' for overview
        if (event.key === 'o' && !event.ctrlKey && !event.metaKey) {
            Reveal.toggleOverview();
        }
    });
    
    // Initialize slide counter
    updateSlideInfo();
    
    // Add navigation hints
    addNavigationHints();
});

// Update slide information
Reveal.on('slidechanged', function(event) {
    updateSlideInfo();
    
    // Log slide navigation for analytics (if needed)
    console.log('Slide changed to:', event.indexh, event.indexv);
    
    // Auto-focus on current slide for accessibility
    const currentSlide = Reveal.getCurrentSlide();
    if (currentSlide) {
        currentSlide.focus();
    }
});

// Fragment navigation
Reveal.on('fragmentshown', function(event) {
    console.log('Fragment shown:', event.fragment);
});

Reveal.on('fragmenthidden', function(event) {
    console.log('Fragment hidden:', event.fragment);
});

// Utility functions
function updateSlideInfo() {
    const indices = Reveal.getIndices();
    const totalSlides = Reveal.getTotalSlides();
    const currentSlide = Reveal.getCurrentSlide();
    
    // Update document title with current slide
    if (currentSlide) {
        const slideTitle = currentSlide.querySelector('h1, h2, h3');
        if (slideTitle) {
            document.title = `PCA Lecture - ${slideTitle.textContent}`;
        }
    }
    
    // Custom slide counter (if needed)
    console.log(`Slide ${indices.h + 1} of ${totalSlides}`);
}

function showHelp() {
    const helpText = `
    Keyboard Shortcuts:
    
    Navigation:
    → ↓ Space - Next slide
    ← ↑ - Previous slide
    Home - First slide
    End - Last slide
    
    Controls:
    ESC - Overview mode
    F - Fullscreen
    S - Speaker notes
    P - Presenter mode
    H - Help (this dialog)
    
    Other:
    + - Zoom in
    - - Zoom out
    `;
    
    alert(helpText);
}

function togglePresenterMode() {
    // Simple presenter mode toggle
    const body = document.body;
    if (body.classList.contains('presenter-mode')) {
        body.classList.remove('presenter-mode');
        console.log('Presenter mode disabled');
    } else {
        body.classList.add('presenter-mode');
        console.log('Presenter mode enabled');
    }
}

function addNavigationHints() {
    // Add subtle navigation hints for first-time users
    const firstSlide = document.querySelector('.slides section:first-child');
    if (firstSlide && !localStorage.getItem('pca-presentation-visited')) {
        const hint = document.createElement('div');
        hint.className = 'navigation-hint';
        hint.innerHTML = '← Use arrow keys or click to navigate →';
        hint.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--color-primary);
            color: var(--color-white);
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 12px;
            z-index: 1000;
            animation: fadeInOut 4s ease-in-out;
        `;
        
        document.body.appendChild(hint);
        
        // Remove hint after animation
        setTimeout(() => {
            if (hint.parentNode) {
                hint.parentNode.removeChild(hint);
            }
        }, 4000);
        
        // Mark as visited
        localStorage.setItem('pca-presentation-visited', 'true');
    }
}

// Math rendering optimization
Reveal.on('ready', function() {
    // Ensure all math is rendered properly
    if (window.katex) {
        const mathElements = document.querySelectorAll('.reveal .MathJax_Display, .reveal .MathJax');
        mathElements.forEach(element => {
            if (element.textContent.includes('$')) {
                // Re-render if needed
                element.style.visibility = 'visible';
            }
        });
    }
});

// Code highlighting enhancement
Reveal.on('ready', function() {
    // Add copy buttons to code blocks
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(block => {
        const pre = block.parentElement;
        const button = document.createElement('button');
        button.className = 'copy-code-button';
        button.textContent = 'Copy';
        button.style.cssText = `
            position: absolute;
            top: 8px;
            right: 8px;
            background: var(--color-secondary);
            border: 1px solid var(--color-border);
            color: var(--color-text);
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 11px;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s;
        `;
        
        pre.style.position = 'relative';
        pre.appendChild(button);
        
        // Show button on hover
        pre.addEventListener('mouseenter', () => {
            button.style.opacity = '1';
        });
        
        pre.addEventListener('mouseleave', () => {
            button.style.opacity = '0';
        });
        
        // Copy functionality
        button.addEventListener('click', () => {
            navigator.clipboard.writeText(block.textContent).then(() => {
                const originalText = button.textContent;
                button.textContent = 'Copied!';
                button.style.background = 'var(--color-success)';
                button.style.color = 'var(--color-white)';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = 'var(--color-secondary)';
                    button.style.color = 'var(--color-text)';
                }, 2000);
            });
        });
    });
});

// Accessibility improvements
Reveal.on('ready', function() {
    // Add ARIA labels to navigation elements
    const controls = document.querySelector('.reveal .controls');
    if (controls) {
        const buttons = controls.querySelectorAll('button');
        buttons.forEach((button, index) => {
            const labels = ['Previous slide', 'Next slide', 'Up', 'Down'];
            if (labels[index]) {
                button.setAttribute('aria-label', labels[index]);
            }
        });
    }
    
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--color-primary);
        color: var(--color-white);
        padding: 8px;
        border-radius: 4px;
        text-decoration: none;
        z-index: 1000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const firstSlide = document.querySelector('.reveal .slides section');
        if (firstSlide) {
            firstSlide.focus();
        }
    });
    
    document.body.appendChild(skipLink);
});

// Print styles
window.addEventListener('beforeprint', function() {
    // Expand all fragments when printing
    const fragments = document.querySelectorAll('.fragment');
    fragments.forEach(fragment => {
        fragment.classList.add('visible');
    });
});

window.addEventListener('afterprint', function() {
    // Restore fragment states after printing
    Reveal.sync();
});

// Custom CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0%, 100% { opacity: 0; transform: translateX(-50%) translateY(10px); }
        20%, 80% { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
    
    .presenter-mode .reveal .slides section {
        font-size: 1.2em;
    }
    
    .skip-link:focus {
        top: 6px !important;
    }
    
    @media print {
        .reveal .slides section {
            page-break-inside: avoid;
            break-inside: avoid;
        }
        
        .reveal .controls,
        .reveal .progress,
        .copy-code-button,
        .navigation-hint {
            display: none !important;
        }
    }
`;
document.head.appendChild(style);