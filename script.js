const emojisPool = ["🐶", "🐱", "🦊", "🐼", "🐸", "🐵", "🦁", "🐷", "🐯", "🐰"];

let gameBoard = document.getElementById("gameBoard");
let moveCount = document.getElementById("moveCount");
let restartBtn = document.getElementById("restartBtn");
let startGameBtn = document.getElementById("startGameBtn");
let cardCountSelector = document.getElementById("cardCount");

let flippedCards = [];
let matchedPairs = 0;
let totalMoves = 0;
let currentCardsArray = [];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createCards(cardCount) {
  const pairCount = cardCount / 2;
  const selectedEmojis = emojisPool.slice(0, pairCount);
  currentCardsArray = shuffle([...selectedEmojis, ...selectedEmojis]);

  gameBoard.innerHTML = "";
  currentCardsArray.forEach((emoji) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.emoji = emoji;
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front"></div>
        <div class="card-back">${emoji}</div>
      </div>
    `;
    card.addEventListener("click", handleCardClick);
    gameBoard.appendChild(card);
  });
}

function handleCardClick() {
  if (this.classList.contains("flip") || flippedCards.length === 2) return;

  this.classList.add("flip");
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    totalMoves++;
    moveCount.textContent = totalMoves;

    const [card1, card2] = flippedCards;
    const isMatch = card1.dataset.emoji === card2.dataset.emoji;

    if (isMatch) {
      matchedPairs++;
      flippedCards = [];

      if (matchedPairs === currentCardsArray.length / 2) {
        setTimeout(() => {
          alert(`🎉 You won in ${totalMoves} moves!`);
        }, 500);
      }
    } else {
      setTimeout(() => {
        card1.classList.remove("flip");
        card2.classList.remove("flip");
        flippedCards = [];
      }, 800);
    }
  }
}

function restartGame() {
  flippedCards = [];
  matchedPairs = 0;
  totalMoves = 0;
  moveCount.textContent = "0";
  const cardCount = parseInt(cardCountSelector.value);
  createCards(cardCount);
}



startGameBtn.addEventListener("click", restartGame);
restartBtn.addEventListener("click", restartGame);


