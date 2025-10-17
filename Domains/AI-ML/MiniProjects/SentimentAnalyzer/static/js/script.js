// DOM Elements
const textInput = document.getElementById('text-input');
const analyzeBtn = document.getElementById('analyze-btn');
const clearBtn = document.getElementById('clear-btn');
const resultSection = document.getElementById('result-section');
const sentimentEmoji = document.getElementById('sentiment-emoji');
const sentimentLabel = document.getElementById('sentiment-label');
const confidenceText = document.getElementById('confidence-text');
const probPositive = document.getElementById('prob-positive');
const probNeutral = document.getElementById('prob-neutral');
const probNegative = document.getElementById('prob-negative');
const barPositive = document.getElementById('bar-positive');
const barNeutral = document.getElementById('bar-neutral');
const barNegative = document.getElementById('bar-negative');
const sentimentCard = document.getElementById('sentiment-card');
const exampleChips = document.querySelectorAll('.example-chip');

// Sentiment configuration
const sentimentConfig = {
    positive: {
        emoji: '😊',
        color: '#48bb78',
        class: 'sentiment-positive'
    },
    neutral: {
        emoji: '😐',
        color: '#ed8936',
        class: 'sentiment-neutral'
    },
    negative: {
        emoji: '😞',
        color: '#f56565',
        class: 'sentiment-negative'
    }
};

// Event Listeners
analyzeBtn.addEventListener('click', analyzeSentiment);
clearBtn.addEventListener('click', clearInput);
textInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
        analyzeSentiment();
    }
});

exampleChips.forEach(chip => {
    chip.addEventListener('click', () => {
        const exampleText = chip.getAttribute('data-text');
        textInput.value = exampleText;
        analyzeSentiment();
    });
});

// Main analyze function
async function analyzeSentiment() {
    const text = textInput.value.trim();
    
    if (!text) {
        alert('Please enter some text to analyze!');
        return;
    }

    // Show loading state
    setLoadingState(true);

    try {
        const response = await fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
        });

        if (!response.ok) {
            throw new Error('Failed to analyze sentiment');
        }

        const result = await response.json();
        displayResult(result);
    } catch (error) {
        console.error('Error:', error);
        alert('Error analyzing sentiment. Please make sure the model is trained and the server is running.');
    } finally {
        setLoadingState(false);
    }
}

// Display result
function displayResult(result) {
    const sentiment = result.sentiment;
    const confidence = result.confidence;
    const probabilities = result.probabilities;

    // Show result section
    resultSection.style.display = 'block';
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Update sentiment display
    const config = sentimentConfig[sentiment];
    sentimentEmoji.textContent = config.emoji;
    sentimentLabel.textContent = sentiment.charAt(0).toUpperCase() + sentiment.slice(1);
    sentimentLabel.className = config.class;
    confidenceText.textContent = `Confidence: ${confidence}%`;

    // Update probability bars
    updateProbabilityBar(probPositive, barPositive, probabilities.positive);
    updateProbabilityBar(probNeutral, barNeutral, probabilities.neutral);
    updateProbabilityBar(probNegative, barNegative, probabilities.negative);

    // Update card border color
    sentimentCard.style.borderColor = config.color;

    // Trigger animations
    sentimentEmoji.style.animation = 'none';
    setTimeout(() => {
        sentimentEmoji.style.animation = 'bounce 0.6s ease';
    }, 10);
}

// Update probability bar
function updateProbabilityBar(labelElement, barElement, probability) {
    const percentage = probability.toFixed(1);
    labelElement.textContent = `${percentage}%`;
    
    // Animate width
    setTimeout(() => {
        barElement.style.width = `${percentage}%`;
    }, 100);
}

// Set loading state
function setLoadingState(isLoading) {
    const btnText = analyzeBtn.querySelector('.btn-text');
    const loader = analyzeBtn.querySelector('.loader');
    
    if (isLoading) {
        btnText.style.display = 'none';
        loader.style.display = 'inline-block';
        analyzeBtn.disabled = true;
        analyzeBtn.style.opacity = '0.7';
    } else {
        btnText.style.display = 'inline';
        loader.style.display = 'none';
        analyzeBtn.disabled = false;
        analyzeBtn.style.opacity = '1';
    }
}

// Clear input
function clearInput() {
    textInput.value = '';
    resultSection.style.display = 'none';
    textInput.focus();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    textInput.focus();
    console.log('🤖 Sentiment Analyzer initialized!');
});
