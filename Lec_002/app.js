// Decision Trees Presentation JavaScript - Fixed Version

class PresentationController {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 16;
        this.slides = document.querySelectorAll('.slide');
        
        this.init();
    }
    
    init() {
        // Ensure DOM is fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupComponents();
            });
        } else {
            this.setupComponents();
        }
    }
    
    setupComponents() {
        this.setupNavigation();
        this.setupKeyboardControls();
        this.updateSlideCounter();
        this.updateProgressBar();
        this.setupInteractiveElements();
        
        console.log('Presentation components initialized');
    }
    
    setupNavigation() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        if (prevBtn && nextBtn) {
            // Remove any existing event listeners and add new ones
            prevBtn.removeEventListener('click', this.boundPrevious);
            nextBtn.removeEventListener('click', this.boundNext);
            
            this.boundPrevious = () => this.previousSlide();
            this.boundNext = () => this.nextSlide();
            
            prevBtn.addEventListener('click', this.boundPrevious);
            nextBtn.addEventListener('click', this.boundNext);
            
            console.log('Navigation buttons set up successfully');
        } else {
            console.error('Navigation buttons not found');
        }
        
        this.updateNavigationButtons();
    }
    
    setupKeyboardControls() {
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    this.previousSlide();
                    break;
                case 'ArrowRight':
                case 'ArrowDown':
                case ' ':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSlide(1);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSlide(this.totalSlides);
                    break;
            }
        });
        
        console.log('Keyboard controls set up');
    }
    
    nextSlide() {
        if (this.currentSlide < this.totalSlides) {
            this.goToSlide(this.currentSlide + 1);
        }
        console.log('Next slide triggered, current:', this.currentSlide);
    }
    
    previousSlide() {
        if (this.currentSlide > 1) {
            this.goToSlide(this.currentSlide - 1);
        }
        console.log('Previous slide triggered, current:', this.currentSlide);
    }
    
    goToSlide(slideNumber) {
        if (slideNumber < 1 || slideNumber > this.totalSlides) {
            return;
        }
        
        console.log(`Going to slide ${slideNumber} from ${this.currentSlide}`);
        
        // Remove active class from current slide
        const currentSlideElement = document.querySelector(`.slide[data-slide="${this.currentSlide}"]`);
        if (currentSlideElement) {
            currentSlideElement.classList.remove('active');
        }
        
        // Update current slide number
        this.currentSlide = slideNumber;
        
        // Add active class to new slide
        const newSlideElement = document.querySelector(`.slide[data-slide="${this.currentSlide}"]`);
        if (newSlideElement) {
            newSlideElement.classList.add('active');
        }
        
        this.updateSlideCounter();
        this.updateProgressBar();
        this.updateNavigationButtons();
    }
    
    updateSlideCounter() {
        const currentSlideElement = document.getElementById('current-slide');
        const totalSlidesElement = document.getElementById('total-slides');
        
        if (currentSlideElement) {
            currentSlideElement.textContent = this.currentSlide;
        }
        if (totalSlidesElement) {
            totalSlidesElement.textContent = this.totalSlides;
        }
    }
    
    updateProgressBar() {
        const progressFill = document.getElementById('progress-fill');
        if (progressFill) {
            const progress = (this.currentSlide / this.totalSlides) * 100;
            progressFill.style.width = `${progress}%`;
        }
    }
    
    updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        if (prevBtn) {
            prevBtn.disabled = this.currentSlide === 1;
        }
        if (nextBtn) {
            nextBtn.disabled = this.currentSlide === this.totalSlides;
        }
    }
    
    setupInteractiveElements() {
        // Set up all interactive buttons
        this.setupToggleButtons();
        console.log('Interactive elements set up');
    }
    
    setupToggleButtons() {
        // Find all interactive buttons and set up their functionality
        const buttons = document.querySelectorAll('.interactive-btn');
        buttons.forEach(button => {
            const onclick = button.getAttribute('onclick');
            if (onclick) {
                // Remove the onclick attribute and add proper event listener
                button.removeAttribute('onclick');
                
                if (onclick.includes('toggleExample')) {
                    const match = onclick.match(/toggleExample\('([^']+)'\)/);
                    if (match) {
                        const exampleId = match[1];
                        button.addEventListener('click', () => this.toggleExample(exampleId, button));
                    }
                } else if (onclick.includes('toggleSolution')) {
                    const match = onclick.match(/toggleSolution\('([^']+)'\)/);
                    if (match) {
                        const solutionId = match[1];
                        button.addEventListener('click', () => this.toggleSolution(solutionId, button));
                    }
                }
            }
        });
    }
    
    toggleExample(exampleId, button) {
        const element = document.getElementById(exampleId);
        if (element) {
            element.classList.toggle('hidden');
            
            // Update button text
            if (element.classList.contains('hidden')) {
                button.textContent = button.textContent.replace('Hide', 'Show');
                if (!button.textContent.includes('Show')) {
                    button.textContent = 'Show Calculation Example';
                }
            } else {
                button.textContent = button.textContent.replace('Show', 'Hide');
                if (!button.textContent.includes('Hide')) {
                    button.textContent = 'Hide Calculation Example';
                }
                
                // Add interactive calculator for entropy example
                if (exampleId === 'entropy-example') {
                    this.addEntropyCalculator(element);
                }
            }
        }
    }
    
    toggleSolution(solutionId, button) {
        const element = document.getElementById(solutionId);
        if (element) {
            element.classList.toggle('hidden');
            
            // Update button text
            if (element.classList.contains('hidden')) {
                button.textContent = 'Show Solution';
            } else {
                button.textContent = 'Hide Solution';
            }
        }
    }
    
    addEntropyCalculator(container) {
        // Check if calculator already exists
        if (container.querySelector('.entropy-calculator')) {
            return;
        }
        
        const calculator = document.createElement('div');
        calculator.className = 'entropy-calculator';
        calculator.innerHTML = `
            <h4>Interactive Entropy Calculator</h4>
            <div class="calculator-inputs">
                <div style="display: flex; gap: 16px; margin: 12px 0;">
                    <label>Positive samples: <input type="number" id="pos-samples" value="6" min="0" style="width: 60px; margin-left: 8px;"></label>
                    <label>Negative samples: <input type="number" id="neg-samples" value="4" min="0" style="width: 60px; margin-left: 8px;"></label>
                    <button id="calc-entropy-btn" class="btn btn--secondary btn--sm">Calculate</button>
                </div>
            </div>
            <div id="entropy-result" class="calculation-result" style="margin-top: 16px;">
                <p><strong>Entropy:</strong> <span id="entropy-value">0.971</span></p>
                <p><strong>Steps:</strong></p>
                <div id="entropy-steps" class="calculation-steps" style="background: var(--color-surface); padding: 12px; border-radius: 6px; margin-top: 8px;">
                    <p>H = -(6/10)log₂(6/10) - (4/10)log₂(4/10)</p>
                    <p>H = -(0.6 × -0.737) - (0.4 × -1.322)</p>
                    <p>H = 0.442 + 0.529 = 0.971</p>
                </div>
            </div>
        `;
        
        container.appendChild(calculator);
        
        // Add event listener for the calculate button
        const calcBtn = calculator.querySelector('#calc-entropy-btn');
        if (calcBtn) {
            calcBtn.addEventListener('click', () => this.updateEntropyCalculation());
        }
    }
    
    updateEntropyCalculation() {
        const posInput = document.getElementById('pos-samples');
        const negInput = document.getElementById('neg-samples');
        const entropyValue = document.getElementById('entropy-value');
        const entropySteps = document.getElementById('entropy-steps');
        
        if (!posInput || !negInput || !entropyValue || !entropySteps) return;
        
        const positive = parseInt(posInput.value) || 0;
        const negative = parseInt(negInput.value) || 0;
        const total = positive + negative;
        
        if (total === 0) {
            entropyValue.textContent = "0";
            entropySteps.innerHTML = "<p>No samples to calculate entropy</p>";
            return;
        }
        
        const entropy = this.calculateEntropy(positive, negative);
        const pPos = positive / total;
        const pNeg = negative / total;
        
        entropyValue.textContent = this.formatNumber(entropy);
        
        let stepsHtml = `
            <p>H = -(${positive}/${total})log₂(${positive}/${total}) - (${negative}/${total})log₂(${negative}/${total})</p>
        `;
        
        if (pPos > 0 && pNeg > 0) {
            const log2Pos = Math.log2(pPos);
            const log2Neg = Math.log2(pNeg);
            stepsHtml += `
                <p>H = -(${this.formatNumber(pPos)} × ${this.formatNumber(log2Pos)}) - (${this.formatNumber(pNeg)} × ${this.formatNumber(log2Neg)})</p>
                <p>H = ${this.formatNumber(-pPos * log2Pos)} + ${this.formatNumber(-pNeg * log2Neg)} = ${this.formatNumber(entropy)}</p>
            `;
        } else if (pPos > 0) {
            stepsHtml += `<p>H = -(${this.formatNumber(pPos)} × ${this.formatNumber(Math.log2(pPos))}) = ${this.formatNumber(entropy)}</p>`;
        } else if (pNeg > 0) {
            stepsHtml += `<p>H = -(${this.formatNumber(pNeg)} × ${this.formatNumber(Math.log2(pNeg))}) = ${this.formatNumber(entropy)}</p>`;
        }
        
        entropySteps.innerHTML = stepsHtml;
    }
    
    calculateEntropy(positive, negative) {
        const total = positive + negative;
        if (total === 0) return 0;
        
        const pPos = positive / total;
        const pNeg = negative / total;
        
        let entropy = 0;
        if (pPos > 0) entropy -= pPos * Math.log2(pPos);
        if (pNeg > 0) entropy -= pNeg * Math.log2(pNeg);
        
        return entropy;
    }
    
    formatNumber(num, decimals = 3) {
        return Number(num.toFixed(decimals));
    }
}

// Global instance
let presentationController;

// Initialize presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing presentation...');
    
    // Initialize the presentation controller
    presentationController = new PresentationController();
    
    // Add smooth scrolling for better UX
    document.documentElement.style.scrollBehavior = 'smooth';
    
    console.log('Decision Trees presentation initialized successfully!');
});

// Backup global functions for any remaining onclick attributes
function toggleExample(exampleId) {
    if (presentationController) {
        const button = event.target;
        presentationController.toggleExample(exampleId, button);
    }
}

function toggleSolution(solutionId) {
    if (presentationController) {
        const button = event.target;
        presentationController.toggleSolution(solutionId, button);
    }
}