class CGPACalculator {
    constructor() {
        this.initializeElements();
        this.bindEvents();
    }

    initializeElements() {
        this.semInputs = Array.from(document.querySelectorAll('.sem-input'));
        this.cgpaValue = document.getElementById('cgpaValue');
        this.cgpaGrade = document.getElementById('cgpaGrade');
        this.totalCredits = document.getElementById('totalCredits');
        this.totalPoints = document.getElementById('totalPoints');
        this.calculateBtn = document.getElementById('calculateCGPA');
        this.clearBtn = document.getElementById('clearAll');
    }

    bindEvents() {
        this.calculateBtn.addEventListener('click', () => this.calculateCGPA());
        this.clearBtn.addEventListener('click', () => this.clearAll());
        
        // Recalculate on input change for instant feedback
        this.semInputs.forEach(input => {
            input.addEventListener('input', () => this.calculateCGPA());
        });
    }

    // Semester mode: average of filled SGPAs
    calculateCGPA() {
        const values = this.semInputs
            .map(i => parseFloat(i.value))
            .filter(v => !Number.isNaN(v));

        if (values.length === 0) {
            this.resetResults();
            return;
        }

        // Validate ranges (0 - 10)
        for (const v of values) {
            if (v < 0 || v > 10) {
                this.showNotification('Each SGPA must be between 0 and 10', 'error');
                return;
            }
        }

        const sum = values.reduce((a, b) => a + b, 0);
        const cgpa = sum / values.length;

        this.cgpaValue.textContent = cgpa.toFixed(2);
        this.cgpaGrade.textContent = this.getCGPAComment(cgpa);
        this.totalCredits.textContent = values.length; // Filled Semesters
        this.totalPoints.textContent = sum.toFixed(2); // Sum of SGPAs

        this.cgpaValue.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.cgpaValue.style.transform = 'scale(1)';
        }, 200);
    }

    getCGPAComment(cgpa) {
        if (cgpa >= 9.0) return 'Excellent!';
        if (cgpa >= 8.0) return 'Very Good!';
        if (cgpa >= 7.0) return 'Good!';
        if (cgpa >= 6.0) return 'Satisfactory';
        if (cgpa >= 5.0) return 'Pass';
        return 'Needs Improvement';
    }

    clearAll() {
        let changed = false;
        this.semInputs.forEach(i => {
            if (i.value) { i.value = ''; changed = true; }
        });
        this.resetResults();
        if (changed) this.showNotification('Cleared all semester inputs', 'info');
    }

    resetResults() {
        this.cgpaValue.textContent = '0.00';
        this.cgpaGrade.textContent = '-';
        this.totalCredits.textContent = '0';
        this.totalPoints.textContent = '0';
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 10px;
            color: white;
            font-weight: 600;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        `;

        const colors = {
            success: '#28a745',
            error: '#dc3545',
            info: '#17a2b8',
            warning: '#ffc107'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the calculator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.calculator = new CGPACalculator();
});

// Small entrance animation
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    container.style.opacity = '0';
    container.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        container.style.transition = 'all 0.6s ease';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 100);
});


