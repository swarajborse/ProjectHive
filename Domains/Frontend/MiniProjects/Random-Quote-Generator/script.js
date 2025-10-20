const quoteText = document.querySelector('.quote-text');
const quoteAuthor = document.querySelector('.quote-author');
const newQuoteBtn = document.querySelector('.new-quote-btn');
const twitterBtn = document.querySelector('.share-twitter-btn');
const facebookBtn = document.querySelector('.share-facebook-btn');
const copyBtn = document.querySelector('.copy-btn');
const quoteBox = document.querySelector('.quote-box');

async function fetchQuote() {
    quoteBox.classList.add('fade-out');
    setTimeout(async () => {
        try {
            const response = await fetch('http://api.quotable.io/random');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            quoteText.textContent = data.content;
            quoteAuthor.textContent = `- ${data.author || 'Unknown'}`;
            quoteBox.classList.remove('fade-out');
            quoteBox.classList.add('fade-in');
            setTimeout(() => {
                quoteBox.classList.remove('fade-in');
            }, 500);
        } catch (error) {
            console.error('Error fetching quote:', error);
            quoteText.textContent = 'Failed to fetch a quote. Please try again later.';
            quoteAuthor.textContent = '';
            quoteBox.classList.remove('fade-out');
            quoteBox.classList.add('fade-in');
            setTimeout(() => {
                quoteBox.classList.remove('fade-in');
            }, 500);
        }
    }, 500);
}

function shareTweet() {
    const tweetText = `"${quoteText.textContent}" ${quoteAuthor.textContent}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(twitterUrl, '_blank');
}

function shareFacebook() {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(quoteText.textContent + ' ' + quoteAuthor.textContent)}`;
    window.open(facebookUrl, '_blank');
}

function copyQuote() {
    const quoteToCopy = `"${quoteText.textContent}" ${quoteAuthor.textContent}`;
    navigator.clipboard.writeText(quoteToCopy).then(() => {
        alert('Quote copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy quote: ', err);
    });
}

newQuoteBtn.addEventListener('click', fetchQuote);
twitterBtn.addEventListener('click', shareTweet);
facebookBtn.addEventListener('click', shareFacebook);
copyBtn.addEventListener('click', copyQuote);

// Fetch a quote on page load
fetchQuote();