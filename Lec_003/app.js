// Presentation Navigation Script
class PresentationController {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 13;
        this.slides = document.querySelectorAll('.slide');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.slideCounter = document.getElementById('slide-counter');
        
        this.init();
    }
    
    init() {
        // Set up event listeners
        this.setupEventListeners();
        
        // Initialize the presentation
        this.updateSlideDisplay();
        this.updateNavigationButtons();
        this.updateSlideCounter();
        
        // Focus management for accessibility
        this.focusCurrentSlide();
    }
    
    setupEventListeners() {
        // Button navigation
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // Prevent default behavior for arrow keys to avoid page scrolling
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                e.preventDefault();
            }
        });
    }
    
    handleKeyPress(e) {
        switch(e.key) {
            case 'ArrowRight':
            case 'PageDown':
            case ' ': // Space bar
                if (!e.shiftKey) { // Shift+Space goes backwards
                    this.nextSlide();
                }
                break;
            case 'ArrowLeft':
            case 'PageUp':
                this.previousSlide();
                break;
            case 'Home':
                this.goToSlide(1);
                break;
            case 'End':
                this.goToSlide(this.totalSlides);
                break;
            case 'Escape':
                // Optional: Could add fullscreen toggle or other functionality
                break;
        }
        
        // Handle Shift+Space for previous slide
        if (e.key === ' ' && e.shiftKey) {
            this.previousSlide();
        }
    }
    
    nextSlide() {
        if (this.currentSlide < this.totalSlides) {
            this.currentSlide++;
            this.updatePresentation();
        }
    }
    
    previousSlide() {
        if (this.currentSlide > 1) {
            this.currentSlide--;
            this.updatePresentation();
        }
    }
    
    goToSlide(slideNumber) {
        if (slideNumber >= 1 && slideNumber <= this.totalSlides) {
            this.currentSlide = slideNumber;
            this.updatePresentation();
        }
    }
    
    updatePresentation() {
        this.updateSlideDisplay();
        this.updateNavigationButtons();
        this.updateSlideCounter();
        this.focusCurrentSlide();
        
        // Optional: Add analytics or progress tracking here
        this.trackSlideView();
    }
    
    updateSlideDisplay() {
        // Hide all slides
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Show current slide
        const currentSlideElement = document.getElementById(`slide-${this.currentSlide}`);
        if (currentSlideElement) {
            currentSlideElement.classList.add('active');
            
            // Smooth scroll to top of slide for better UX
            currentSlideElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    }
    
    updateNavigationButtons() {
        // Update previous button
        this.prevBtn.disabled = this.currentSlide === 1;
        
        // Update next button
        this.nextBtn.disabled = this.currentSlide === this.totalSlides;
        
        // Update button text for better UX
        if (this.currentSlide === 1) {
            this.prevBtn.textContent = 'Previous';
        } else {
            this.prevBtn.textContent = 'Previous';
        }
        
        if (this.currentSlide === this.totalSlides) {
            this.nextBtn.textContent = 'Finish';
        } else {
            this.nextBtn.textContent = 'Next';
        }
    }
    
    updateSlideCounter() {
        this.slideCounter.textContent = `${this.currentSlide} / ${this.totalSlides}`;
    }
    
    focusCurrentSlide() {
        // Set focus to current slide for accessibility
        const currentSlideElement = document.getElementById(`slide-${this.currentSlide}`);
        if (currentSlideElement) {
            currentSlideElement.setAttribute('tabindex', '-1');
            currentSlideElement.focus();
        }
    }
    
    trackSlideView() {
        // Optional: Track slide views for analytics
        // This could be used to see which slides users spend most time on
        console.log(`Viewing slide ${this.currentSlide}: ${this.getCurrentSlideTitle()}`);
    }
    
    getCurrentSlideTitle() {
        const currentSlideElement = document.getElementById(`slide-${this.currentSlide}`);
        if (currentSlideElement) {
            const titleElement = currentSlideElement.querySelector('h1');
            return titleElement ? titleElement.textContent : `Slide ${this.currentSlide}`;
        }
        return `Slide ${this.currentSlide}`;
    }
    
    // Public methods for external control
    getCurrentSlideNumber() {
        return this.currentSlide;
    }
    
    getTotalSlides() {
        return this.totalSlides;
    }
    
    getProgress() {
        return Math.round((this.currentSlide / this.totalSlides) * 100);
    }
}

// Utility functions for enhanced UX
class PresentationUtils {
    static addSlideTransitions() {
        // Add CSS transitions if not already present
        const slides = document.querySelectorAll('.slide');
        slides.forEach(slide => {
            if (!slide.style.transition) {
                slide.style.transition = 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out';
            }
        });
    }
    
    static addFullscreenSupport() {
        // Add fullscreen functionality
        document.addEventListener('keydown', (e) => {
            if (e.key === 'f' || e.key === 'F11') {
                PresentationUtils.toggleFullscreen();
                e.preventDefault();
            }
        });
    }
    
    static toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }
    
    static addProgressIndicator() {
        // Create a subtle progress bar
        const progressBar = document.createElement('div');
        progressBar.id = 'presentation-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: var(--color-primary);
            transition: width 0.3s ease;
            z-index: 1000;
            width: 0%;
        `;
        document.body.appendChild(progressBar);
        
        return progressBar;
    }
    
    static updateProgress(current, total) {
        const progressBar = document.getElementById('presentation-progress');
        if (progressBar) {
            const percentage = (current / total) * 100;
            progressBar.style.width = `${percentage}%`;
        }
    }
}

// Enhanced Presentation Controller with additional features
class EnhancedPresentationController extends PresentationController {
    constructor() {
        super();
        this.progressBar = PresentationUtils.addProgressIndicator();
        this.setupEnhancedFeatures();
    }
    
    setupEnhancedFeatures() {
        PresentationUtils.addSlideTransitions();
        PresentationUtils.addFullscreenSupport();
        
        // Add swipe support for touch devices
        this.addTouchSupport();
        
        // Add slide overview feature
        this.addSlideOverview();
    }
    
    updatePresentation() {
        super.updatePresentation();
        PresentationUtils.updateProgress(this.currentSlide, this.totalSlides);
    }
    
    addTouchSupport() {
        let startX = 0;
        let startY = 0;
        const minSwipeDistance = 50;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', (e) => {
            if (e.changedTouches.length === 0) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            
            // Check if horizontal swipe is longer than vertical
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
                if (deltaX > 0) {
                    // Swipe right - previous slide
                    this.previousSlide();
                } else {
                    // Swipe left - next slide
                    this.nextSlide();
                }
                e.preventDefault();
            }
        });
    }
    
    addSlideOverview() {
        // Add 'o' key for overview (could be extended with thumbnails)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'o' || e.key === 'O') {
                this.showSlideOverview();
            }
        });
    }
    
    showSlideOverview() {
        // Simple implementation - could be enhanced with thumbnails
        const slideList = Array.from({length: this.totalSlides}, (_, i) => i + 1);
        const overview = slideList.map(num => 
            `${num}. ${this.getSlideTitle(num)}`
        ).join('\n');
        
        alert(`Slide Overview:\n\n${overview}\n\nCurrent: Slide ${this.currentSlide}`);
    }
    
    getSlideTitle(slideNumber) {
        const slideElement = document.getElementById(`slide-${slideNumber}`);
        if (slideElement) {
            const titleElement = slideElement.querySelector('h1');
            return titleElement ? titleElement.textContent : `Slide ${slideNumber}`;
        }
        return `Slide ${slideNumber}`;
    }
}

// Initialize the presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Use enhanced controller for better UX
    window.presentationController = new EnhancedPresentationController();
    
    // Add some helpful keyboard shortcuts info (optional)
    console.log('Presentation loaded! Keyboard shortcuts:');
    console.log('→ or Space: Next slide');
    console.log('← or Shift+Space: Previous slide');
    console.log('Home: First slide');
    console.log('End: Last slide');
    console.log('F or F11: Toggle fullscreen');
    console.log('O: Show slide overview');
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        PresentationController, 
        EnhancedPresentationController, 
        PresentationUtils 
    };
}