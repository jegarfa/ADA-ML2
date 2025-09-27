// Initialize MathJax configuration
window.MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
    processEscapes: true,
    processEnvironments: true,
    tags: 'ams'
  },
  options: {
    ignoreHtmlClass: 'tex2jax_ignore',
    processHtmlClass: 'tex2jax_process'
  },
  svg: {
    fontCache: 'global'
  }
};

// Reveal.js initialization
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Reveal
  Reveal.initialize({
    // Display configuration
    hash: true,
    center: true,
    controls: true,
    progress: true,
    history: true,
    keyboard: true,
    overview: true,
    touch: true,
    loop: false,
    rtl: false,
    navigationMode: 'default',
    shuffle: false,
    fragments: true,
    fragmentInURL: false,
    embedded: false,
    help: true,
    pause: true,
    showNotes: false,
    autoPlayMedia: null,
    preloadIframes: null,
    autoAnimate: true,
    autoAnimateMatcher: null,
    autoAnimateEasing: 'ease',
    autoAnimateDuration: 1.0,
    autoAnimateUnmatched: true,
    
    // Slide dimensions
    width: 1280,
    height: 720,
    margin: 0.04,
    minScale: 0.2,
    maxScale: 2.0,
    
    // Transition configuration
    transition: 'slide', // none/fade/slide/convex/concave/zoom
    transitionSpeed: 'default', // default/fast/slow
    backgroundTransition: 'fade', // none/fade/slide/convex/concave/zoom
    
    // Display control arrows at edges of the screen
    controlsTutorial: true,
    controlsLayout: 'bottom-right',
    controlsBackArrows: 'faded',
    
    // Progress bar
    progress: true,
    
    // Display slide numbers
    slideNumber: 'c/t', // Type: h.v | h/v | c | c/t
    showSlideNumber: 'all',
    
    // Add hash to URL
    hash: true,
    
    // Responsive design
    respondToHashChanges: true,
    
    // Plugins - Correct initialization
    plugins: [ 
      RevealMarkdown, 
      RevealHighlight, 
      RevealNotes,
      RevealMath.KaTeX
    ],
    
    // Plugin configurations
    markdown: {
      smartypants: true
    },
    
    highlight: {
      highlightOnLoad: true
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
    },
    
    // Keyboard shortcuts - Enhanced
    keyboard: {
      13: 'next', // go to the next slide when the ENTER key is pressed
      27: function() { // ESC key
        if (Reveal.isOverview()) {
          Reveal.toggleOverview();
        } else {
          Reveal.togglePause();
        }
      },
      32: 'next', // SPACE key for next slide
      37: 'left', // LEFT arrow
      39: 'right', // RIGHT arrow  
      38: 'up', // UP arrow
      40: 'down', // DOWN arrow
      79: 'toggleOverview', // O key for overview
      83: function() { // S key for speaker notes - Fixed implementation
        const notesPlugin = Reveal.getPlugin('notes');
        if (notesPlugin) {
          notesPlugin.open();
        } else {
          // Fallback - open notes in popup
          openSpeakerNotes();
        }
      },
      72: 'toggleHelp', // H key for help
      70: function() { // F key for fullscreen
        toggleFullscreen();
      },
      82: function() { // R key to restart
        Reveal.slide(0, 0);
      }
    },
    
    // Dependencies for older Reveal.js versions fallback
    dependencies: []
  });

  // Add custom event listeners after initialization
  setupCustomEventListeners();
  
  // Initialize custom features
  setupProgressTracking();
  setupNavigationFix();
  setupSlideEnhancements();
  
  console.log('🎓 SGD Lecture Presentation Initialized Successfully');
});

// Fixed speaker notes functionality
function openSpeakerNotes() {
  // Get current slide content
  const currentSlide = Reveal.getCurrentSlide();
  const notes = currentSlide.querySelector('aside.notes');
  const notesContent = notes ? notes.innerHTML : 'No speaker notes for this slide.';
  
  // Create or update notes window
  const notesWindow = window.open('', 'reveal-notes', 'width=800,height=600,scrollbars=yes');
  
  if (notesWindow) {
    notesWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Speaker Notes - SGD Lecture</title>
        <style>
          body { 
            font-family: var(--font-family-base), Arial, sans-serif; 
            padding: 20px; 
            background: #f5f5f5; 
            color: #333;
            line-height: 1.6;
          }
          .slide-info {
            background: #333;
            color: white;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 20px;
          }
          .notes-content {
            background: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
        </style>
      </head>
      <body>
        <div class="slide-info">
          <h2>Slide ${Reveal.getIndices().h + 1} of ${Reveal.getTotalSlides()}</h2>
          <p>Current: "${currentSlide.querySelector('h1, h2')?.textContent || 'Slide Content'}"</p>
        </div>
        <div class="notes-content">
          <h3>Speaker Notes:</h3>
          ${notesContent}
        </div>
        <script>
          // Auto-refresh when main window changes slides
          if (window.opener && !window.opener.closed) {
            setInterval(function() {
              try {
                const currentSlideNum = window.opener.Reveal.getIndices().h + 1;
                const totalSlides = window.opener.Reveal.getTotalSlides();
                document.querySelector('.slide-info h2').textContent = 
                  'Slide ' + currentSlideNum + ' of ' + totalSlides;
                
                const newSlide = window.opener.Reveal.getCurrentSlide();
                const newNotes = newSlide.querySelector('aside.notes');
                const newNotesContent = newNotes ? newNotes.innerHTML : 'No speaker notes for this slide.';
                const newTitle = newSlide.querySelector('h1, h2')?.textContent || 'Slide Content';
                
                document.querySelector('.slide-info p').innerHTML = 
                  'Current: "' + newTitle + '"';
                document.querySelector('.notes-content').innerHTML = 
                  '<h3>Speaker Notes:</h3>' + newNotesContent;
              } catch(e) {
                console.log('Notes window update error:', e);
              }
            }, 1000);
          }
        </script>
      </body>
      </html>
    `);
    notesWindow.document.close();
  }
}

// Fix navigation controls
function setupNavigationFix() {
  // Ensure navigation controls work properly
  setTimeout(() => {
    const controls = document.querySelectorAll('.navigate-right, .navigate-left, .navigate-up, .navigate-down');
    
    controls.forEach(control => {
      // Remove existing event listeners and add new ones
      const newControl = control.cloneNode(true);
      control.parentNode.replaceChild(newControl, control);
      
      newControl.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (newControl.classList.contains('navigate-right')) {
          Reveal.right();
        } else if (newControl.classList.contains('navigate-left')) {
          Reveal.left();
        } else if (newControl.classList.contains('navigate-up')) {
          Reveal.up();
        } else if (newControl.classList.contains('navigate-down')) {
          Reveal.down();
        }
      });
    });
  }, 1000);
}

// Custom event listeners
function setupCustomEventListeners() {
  // Slide change event
  Reveal.addEventListener('slidechanged', function(event) {
    // Update progress tracking
    updateProgress(event.indexh, event.indexv);
    
    // Log slide navigation for analytics
    console.log('Slide changed to:', event.indexh + 1);
    
    // Auto-play animations on specific slides
    autoPlaySlideAnimations(event);
    
    // Update notes window if open
    updateNotesWindow();
  });
  
  // Fragment events
  Reveal.addEventListener('fragmentshown', function(event) {
    console.log('Fragment shown:', event.fragment);
  });
  
  Reveal.addEventListener('fragmenthidden', function(event) {
    console.log('Fragment hidden:', event.fragment);
  });
  
  // Overview events
  Reveal.addEventListener('overviewshown', function(event) {
    console.log('Overview mode enabled');
  });
  
  Reveal.addEventListener('overviewhidden', function(event) {
    console.log('Overview mode disabled');
  });
  
  // Ready event
  Reveal.addEventListener('ready', function(event) {
    console.log('Reveal.js is ready');
    
    // Initialize MathJax after Reveal is ready
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise();
    }
  });
}

// Update notes window when slides change
function updateNotesWindow() {
  // This function is called when slides change to update any open notes window
  // The actual updating is handled by the script in the notes window
}

// Progress tracking system
function setupProgressTracking() {
  const totalSlides = Reveal.getTotalSlides();
  let startTime = Date.now();
  
  // Create progress indicator
  const progressContainer = document.createElement('div');
  progressContainer.id = 'custom-progress';
  progressContainer.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.8);
    color: var(--color-teal-300, #32b8c6);
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 14px;
    font-family: var(--font-family-base), Arial, sans-serif;
    z-index: 1000;
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid var(--color-teal-300, #32b8c6);
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  `;
  
  document.body.appendChild(progressContainer);
  
  // Update progress function
  window.updateProgress = function(slideIndex, verticalIndex) {
    const currentSlide = slideIndex + 1;
    const progressPercent = Math.round((currentSlide / totalSlides) * 100);
    const elapsed = Math.round((Date.now() - startTime) / 60000); // minutes
    
    progressContainer.innerHTML = `
      <span>📊 ${currentSlide}/${totalSlides}</span>
      <span>⏱️ ${elapsed}m</span>
      <span>${progressPercent}%</span>
    `;
  };
  
  // Initialize progress display
  updateProgress(0, 0);
}

// Fullscreen functionality
function toggleFullscreen() {
  if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.mozFullScreenElement) {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    }
  }
}

// Slide enhancements
function setupSlideEnhancements() {
  // Add smooth scrolling for long slides
  const slides = document.querySelectorAll('.slides section');
  slides.forEach((slide, index) => {
    // Add slide numbers as data attributes
    slide.setAttribute('data-slide-number', index + 1);
    
    // Add auto-sizing for images
    const images = slide.querySelectorAll('img');
    images.forEach(img => {
      img.addEventListener('load', function() {
        // Auto-adjust image size if too large
        const maxHeight = window.innerHeight * 0.65;
        if (this.naturalHeight > maxHeight) {
          this.style.maxHeight = maxHeight + 'px';
          this.style.width = 'auto';
        }
      });
      
      // Add error handling for images
      img.addEventListener('error', function() {
        console.warn('Failed to load image:', this.src);
        this.style.display = 'none';
      });
    });
  });
  
  // Add keyboard help overlay
  createKeyboardHelpOverlay();
}

// Create keyboard help overlay
function createKeyboardHelpOverlay() {
  const helpOverlay = document.createElement('div');
  helpOverlay.id = 'keyboard-help-overlay';
  helpOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    color: white;
    z-index: 10000;
    display: none;
    align-items: center;
    justify-content: center;
    font-family: var(--font-family-base), Arial, sans-serif;
  `;
  
  helpOverlay.innerHTML = `
    <div style="background: #1a1a1a; padding: 30px; border-radius: 10px; max-width: 600px; border: 2px solid var(--color-teal-300, #32b8c6);">
      <h2 style="color: var(--color-teal-300, #32b8c6); margin-top: 0;">🎓 SGD Lecture - Keyboard Shortcuts</h2>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0;">
        <div><strong>Arrow Keys:</strong> Navigate slides</div>
        <div><strong>Space:</strong> Next slide</div>
        <div><strong>O:</strong> Overview mode</div>
        <div><strong>S:</strong> Speaker notes</div>
        <div><strong>F:</strong> Fullscreen toggle</div>
        <div><strong>R:</strong> Restart presentation</div>
        <div><strong>H:</strong> This help menu</div>
        <div><strong>ESC:</strong> Exit overview/Pause</div>
      </div>
      <p style="text-align: center; margin-bottom: 0;">
        <button onclick="document.getElementById('keyboard-help-overlay').style.display='none'" 
                style="background: var(--color-teal-300, #32b8c6); color: black; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-size: 16px;">
          Got it!
        </button>
      </p>
    </div>
  `;
  
  document.body.appendChild(helpOverlay);
  
  // Override help function
  window.toggleKeyboardHelp = function() {
    const overlay = document.getElementById('keyboard-help-overlay');
    overlay.style.display = overlay.style.display === 'none' ? 'flex' : 'none';
  };
}

// Auto-play animations for specific slides
function autoPlaySlideAnimations(event) {
  const slideIndex = event.indexh;
  
  // Add specific slide animations here
  switch(slideIndex) {
    case 7: // Gradient descent visualization slide
      animateGradientDescentVisualization();
      break;
    case 11: // SGD vs Batch GD comparison
      animateComparisonSlide();
      break;
    case 12: // Learning rate effects
      animateLearningRateEffects();
      break;
  }
}

// Specific slide animations
function animateGradientDescentVisualization() {
  // Add subtle animation effects for gradient descent visualization
  const images = document.querySelectorAll('img[src*="gradient_descent"]');
  images.forEach(img => {
    img.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
    img.style.opacity = '0';
    img.style.transform = 'scale(0.95)';
    setTimeout(() => {
      img.style.opacity = '1';
      img.style.transform = 'scale(1)';
    }, 300);
  });
}

function animateComparisonSlide() {
  // Animate comparison elements
  const images = document.querySelectorAll('img[src*="comparison"]');
  images.forEach(img => {
    img.style.transition = 'opacity 0.6s ease-in-out';
    img.style.opacity = '0';
    setTimeout(() => {
      img.style.opacity = '1';
    }, 200);
  });
}

function animateLearningRateEffects() {
  // Animate learning rate visualization
  const images = document.querySelectorAll('img[src*="learning_rate"]');
  images.forEach(img => {
    img.style.transition = 'all 0.7s ease-in-out';
    img.style.opacity = '0';
    img.style.transform = 'translateY(20px)';
    setTimeout(() => {
      img.style.opacity = '1';
      img.style.transform = 'translateY(0)';
    }, 400);
  });
}

// Utility functions
function getCurrentSlideInfo() {
  const indices = Reveal.getIndices();
  return {
    horizontal: indices.h,
    vertical: indices.v,
    total: Reveal.getTotalSlides()
  };
}

function goToSlide(slideNumber) {
  if (slideNumber >= 0 && slideNumber < Reveal.getTotalSlides()) {
    Reveal.slide(slideNumber, 0);
  }
}

// Export utility functions for console access
window.RevealUtils = {
  getCurrentSlideInfo,
  goToSlide,
  toggleFullscreen,
  updateProgress,
  openSpeakerNotes,
  toggleKeyboardHelp
};

// Add helpful console message
console.log(`
🎓 SGD Lecture Presentation Loaded Successfully!
📊 Total slides: ${document.querySelectorAll('.slides section').length}
🎯 Keyboard shortcuts:
   - Arrow keys: Navigate slides
   - Space: Next slide
   - O: Overview mode
   - S: Speaker notes (opens in popup)
   - F: Fullscreen
   - R: Restart presentation
   - H: Help menu
   - ESC: Pause/Resume or exit overview

Use RevealUtils object for additional controls.
Type 'RevealUtils.openSpeakerNotes()' to test speaker notes.
`);

// Performance monitoring
if ('performance' in window) {
  window.addEventListener('load', function() {
    setTimeout(function() {
      const perfData = performance.timing;
      const loadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log(`⚡ Presentation loaded in ${loadTime}ms`);
    }, 0);
  });
}

// Error handling
window.addEventListener('error', function(e) {
  console.error('Presentation Error:', e.error);
});

// Ensure MathJax processes equations on slide changes
Reveal.addEventListener('slidechanged', function() {
  if (window.MathJax && window.MathJax.typesetPromise) {
    window.MathJax.typesetPromise().catch((err) => console.log('MathJax error:', err));
  }
});