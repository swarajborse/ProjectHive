const cardsArray = ['🍎', '🍌', '🍇', '🍓', '🍍', '🥝', '🍉', '🍒'];
let cards = [...cardsArray, ...cardsArray]; // duplicate for pairs
let flippedCards = [];
let matchedCount = 0;

const gameContainer = document.getElementById('game');
const restartBtn = document.getElementById('restart');

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createCard(symbol) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.symbol = symbol;

  const cardInner = document.createElement('div');
  cardInner.classList.add('card-inner');

  const cardFront = document.createElement('div');
  cardFront.classList.add('card-front');
  cardFront.textContent = symbol;

  const cardBack = document.createElement('div');
  cardBack.classList.add('card-back');
  cardBack.textContent = '?';

  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);

  card.addEventListener('click', () => flipCard(card));

  return card;
}

function flipCard(card) {
  if (
    flippedCards.length < 2 &&
    !flippedCards.includes(card) &&
    !card.classList.contains('matched')
  ) {
    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.symbol === card2.dataset.symbol) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCount += 2;
    flippedCards = [];

    if (matchedCount === cards.length) {
      setTimeout(() => alert('🎉 You matched all pairs! You win! 🎉'), 500);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      flippedCards = [];
    }, 1000);
  }
}

function setupGame() {
  matchedCount = 0;
  flippedCards = [];
  gameContainer.innerHTML = '';
  cards = shuffle(cards);
  cards.forEach(symbol => {
    const card = createCard(symbol);
    gameContainer.appendChild(card);
  });
}

restartBtn.addEventListener('click', setupGame);

setupGame();
