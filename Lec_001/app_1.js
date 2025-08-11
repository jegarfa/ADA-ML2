// Global variables
let currentSlide = 1;
const totalSlides = 33;
let slides = [];
let isTransitioning = false;

// Initialize the presentation
document.addEventListener('DOMContentLoaded', function() {
    initializeSlides();
    setupEventListeners();
    updateUI();
    initializeSideNav();
    setupTableOfContentsLinks();
    setupCodeExamples();
});

// Initialize slides
function initializeSlides() {
    slides = document.querySelectorAll('.slide');
    
    // Ensure first slide is active
    slides.forEach((slide, index) => {
        if (index === 0) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
}

// Setup event listeners
function setupEventListeners() {
    // Navigation buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            previousSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            nextSlide();
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyPress);
    
    // Side navigation toggle
    const sideNavToggle = document.getElementById('sideNavToggle');
    if (sideNavToggle) {
        sideNavToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSideNav();
        });
    }
    
    // Close side nav when clicking outside
    document.addEventListener('click', function(e) {
        const sideNav = document.getElementById('sideNav');
        if (sideNav && sideNav.classList.contains('open') && 
            !sideNav.contains(e.target)) {
            closeSideNav();
        }
    });
    
    // Prevent closing when clicking inside side nav
    const sideNav = document.getElementById('sideNav');
    if (sideNav) {
        sideNav.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
}

// Setup Table of Contents links
function setupTableOfContentsLinks() {
    // Wait for DOM to be fully loaded
    setTimeout(() => {
        // Add click handlers to TOC sections
        const tocItems = document.querySelectorAll('.toc-section li');
        tocItems.forEach((item, index) => {
            item.style.cursor = 'pointer';
            item.style.padding = '8px';
            item.style.borderRadius = '4px';
            item.style.transition = 'background-color 0.2s ease';
            
            item.addEventListener('mouseenter', () => {
                item.style.backgroundColor = 'var(--color-bg-1)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.backgroundColor = 'transparent';
            });
            
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const text = item.textContent.toLowerCase();
                
                // Map TOC items to slide numbers
                if (text.includes('what is machine learning')) {
                    goToSlide(3);
                } else if (text.includes('what can we do')) {
                    goToSlide(5);
                } else if (text.includes('language of ml')) {
                    goToSlide(6);
                } else if (text.includes('learning from examples')) {
                    goToSlide(10);
                } else if (text.includes('train and test')) {
                    goToSlide(12);
                } else if (text.includes('classification vs regression')) {
                    goToSlide(14);
                } else if (text.includes('unsupervised learning')) {
                    goToSlide(18);
                } else if (text.includes('ml vs traditional')) {
                    goToSlide(22);
                } else if (text.includes('practical considerations')) {
                    goToSlide(28);
                }
            });
        });
    }, 500);
}

// Setup expandable code examples
function setupCodeExamples() {
    setTimeout(() => {
        const codeBlocks = document.querySelectorAll('.code-example pre');
        codeBlocks.forEach((pre, index) => {
            // Create expand/collapse button
            const button = document.createElement('button');
            button.textContent = 'Toggle Code';
            button.className = 'btn btn--sm';
            button.style.marginBottom = '10px';
            button.style.backgroundColor = 'var(--color-primary)';
            button.style.color = 'white';
            button.style.border = 'none';
            button.style.padding = '6px 12px';
            button.style.borderRadius = '4px';
            button.style.cursor = 'pointer';
            
            // Initially collapse some code blocks for better UX
            if (index > 0) {
                pre.style.display = 'none';
                button.textContent = 'Show Code';
            } else {
                button.textContent = 'Hide Code';
            }
            
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const isHidden = pre.style.display === 'none';
                pre.style.display = isHidden ? 'block' : 'none';
                button.textContent = isHidden ? 'Hide Code' : 'Show Code';
            });
            
            // Insert button before the pre element
            pre.parentNode.insertBefore(button, pre);
        });
    }, 1000);
}

// Handle keyboard navigation
function handleKeyPress(e) {
    switch(e.key) {
        case 'ArrowRight':
        case ' ':
        case 'Enter':
            e.preventDefault();
            nextSlide();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            previousSlide();
            break;
        case 'Home':
            e.preventDefault();
            goToSlide(1);
            break;
        case 'End':
            e.preventDefault();
            goToSlide(totalSlides);
            break;
        case 'Escape':
            closeSideNav();
            break;
    }
}

// Navigate to next slide
function nextSlide() {
    if (isTransitioning || currentSlide >= totalSlides) return;
    
    goToSlide(currentSlide + 1);
}

// Navigate to previous slide
function previousSlide() {
    if (isTransitioning || currentSlide <= 1) return;
    
    goToSlide(currentSlide - 1);
}

// Go to specific slide
function goToSlide(slideNumber) {
    if (isTransitioning || slideNumber < 1 || slideNumber > totalSlides || slideNumber === currentSlide) {
        return;
    }
    
    isTransitioning = true;
    
    // Remove active class from current slide
    const currentSlideElement = slides[currentSlide - 1];
    if (currentSlideElement) {
        currentSlideElement.classList.remove('active');
        if (slideNumber < currentSlide) {
            currentSlideElement.classList.add('prev');
        }
    }
    
    // Add active class to new slide
    const newSlideElement = slides[slideNumber - 1];
    if (newSlideElement) {
        // Small delay to ensure smooth transition
        setTimeout(() => {
            if (currentSlideElement) {
                currentSlideElement.classList.remove('prev');
            }
            newSlideElement.classList.add('active');
            
            currentSlide = slideNumber;
            updateUI();
            
            // Trigger animations for the new slide
            triggerSlideAnimations(newSlideElement);
            
            // Allow new transitions after animation completes
            setTimeout(() => {
                isTransitioning = false;
            }, 300);
        }, 50);
    } else {
        isTransitioning = false;
    }
    
    // Close side nav after navigation
    closeSideNav();
}

// Update UI elements
function updateUI() {
    // Update slide counter
    const slideCounter = document.getElementById('slideCounter');
    if (slideCounter) {
        slideCounter.textContent = `${currentSlide} / ${totalSlides}`;
    }
    
    // Update progress bar
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        const progress = (currentSlide / totalSlides) * 100;
        progressBar.style.width = `${progress}%`;
    }
    
    // Update navigation buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
        prevBtn.disabled = currentSlide === 1;
        prevBtn.style.opacity = currentSlide === 1 ? '0.5' : '1';
        prevBtn.style.cursor = currentSlide === 1 ? 'not-allowed' : 'pointer';
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentSlide === totalSlides;
        nextBtn.style.opacity = currentSlide === totalSlides ? '0.5' : '1';
        nextBtn.style.cursor = currentSlide === totalSlides ? 'not-allowed' : 'pointer';
    }
}

// Trigger slide-specific animations
function triggerSlideAnimations(slideElement) {
    // Reset any existing animations
    const animatedElements = slideElement.querySelectorAll('.animated-list li');
    animatedElements.forEach((el, index) => {
        el.style.animation = 'none';
        el.offsetHeight; // Trigger reflow
        el.style.animation = null;
    });
    
    // Trigger code syntax highlighting if Prism is available
    if (window.Prism) {
        const codeBlocks = slideElement.querySelectorAll('pre code');
        codeBlocks.forEach(block => {
            Prism.highlightElement(block);
        });
    }
    
    // Add entrance animation to cards
    const cards = slideElement.querySelectorAll('.example-card, .term-card, .problem-type, .metric-type, .application, .takeaway');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100 + 200);
    });
}

// Side navigation functions
function initializeSideNav() {
    const sideNav = document.getElementById('sideNav');
    if (sideNav) {
        sideNav.classList.remove('open');
    }
    
    // Setup side navigation button clicks
    setTimeout(() => {
        const navButtons = document.querySelectorAll('.nav-section button');
        navButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const onclick = button.getAttribute('onclick');
                if (onclick) {
                    const slideMatch = onclick.match(/goToSlide\((\d+)\)/);
                    if (slideMatch) {
                        const slideNumber = parseInt(slideMatch[1]);
                        goToSlide(slideNumber);
                    }
                }
            });
        });
    }, 500);
}

function toggleSideNav() {
    const sideNav = document.getElementById('sideNav');
    if (sideNav) {
        sideNav.classList.toggle('open');
    }
}

function closeSideNav() {
    const sideNav = document.getElementById('sideNav');
    if (sideNav) {
        sideNav.classList.remove('open');
    }
}

// Touch/swipe support for mobile devices
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            // Swipe right - previous slide
            previousSlide();
        } else {
            // Swipe left - next slide
            nextSlide();
        }
    }
}

// Handle window resize
window.addEventListener('resize', function() {
    // Ensure UI stays consistent on resize
    updateUI();
});

// Presentation mode toggle
function togglePresentationMode() {
    document.body.classList.toggle('presentation-mode');
}

// Print all slides function
function printSlides() {
    // Show all slides for printing
    slides.forEach(slide => {
        slide.classList.add('active');
    });
    
    window.print();
    
    // Restore normal view after printing
    setTimeout(() => {
        slides.forEach((slide, index) => {
            if (index !== currentSlide - 1) {
                slide.classList.remove('active');
            }
        });
    }, 1000);
}

// Fullscreen functionality
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable fullscreen: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

// Auto-advance slides (optional feature)
let autoAdvanceTimer = null;
let autoAdvanceInterval = 30000; // 30 seconds

function startAutoAdvance() {
    if (autoAdvanceTimer) {
        clearInterval(autoAdvanceTimer);
    }
    
    autoAdvanceTimer = setInterval(() => {
        if (currentSlide < totalSlides) {
            nextSlide();
        } else {
            stopAutoAdvance();
        }
    }, autoAdvanceInterval);
}

function stopAutoAdvance() {
    if (autoAdvanceTimer) {
        clearInterval(autoAdvanceTimer);
        autoAdvanceTimer = null;
    }
}

// Custom event for slide changes
function dispatchSlideChange() {
    const event = new CustomEvent('slideChanged', {
        detail: {
            currentSlide: currentSlide,
            totalSlides: totalSlides
        }
    });
    document.dispatchEvent(event);
}

// Make goToSlide globally accessible
window.goToSlide = goToSlide;

// Export functions for global access
window.slidePresentation = {
    goToSlide,
    nextSlide,
    previousSlide,
    toggleFullscreen,
    togglePresentationMode,
    printSlides,
    startAutoAdvance,
    stopAutoAdvance,
    currentSlide: () => currentSlide,
    totalSlides: () => totalSlides
};

// Debug information
console.log('Machine Learning Presentation initialized');
console.log(`Total slides: ${totalSlides}`);