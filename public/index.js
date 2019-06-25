let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];

let values = ['Ace', 'Kings', 'Queen', 'Jack', 'Ten', 'Nine', 'Eight', 'Seven', 'Six', 'Five', 'Four', 'Three', 'Two'];



const createDeck = () => {
	let deck = [];

	for (let suitval = 0; suitval < suits.length; suitval++) {
		for (let valueId = 0; valueId < values.length; valueId++) {
			let card = {
				suit : suits[suitval],
				value : values[valueId]
			 }
			deck.push(card);
		}
	}
	return deck;
}
let result = document.getElementById('result');
let newGameButton = document.getElementById('newGame');
let stayButton = document.getElementById('stay');
let hitButton = document.getElementById('hit');
let message = document.getElementById('message');

let gameStarted = false,
	gameOver = false,
	playerWon = false,
	dealerWon = false,
	dealerCards = [],
	playerCards = [],
	playerScore = 0,
	dealerScore = 0,
	deck = [];

stayButton.style.display = 'none';
hitButton.style.display = 'none';
message.innerText = "Start Game";


newGameButton.addEventListener('click', function () {
	gameStarted = true;
	gameOver = false;
	playerWon = false;

	deck = createDeck();
	shuffle(deck);
	playerCards = [getNextCard(), getNextCard()];
	dealerCards = [getNextCard(), getNextCard()];

	newGameButton.style.display = 'none';

	
	stayButton.style.display = 'inline';
	hitButton.style.display = 'inline';
	message.innerText = '';
	showDisplay();
	

});

hitButton.addEventListener('click', function() {
	playerCards.push(getNextCard());
	checkGameOver();
	showDisplay();
});

stayButton.addEventListener('click', function() {
	gameOver = true;
	checkGameOver();
	showDisplay();
})



const getCardName = (card) => {
	return card.value + ' of ' + card.suit;
}

const getNextCard = () => {
	return deck.shift();

}

const getCardNumericValue = (card) => {
	switch (card.value) {
		case 'Ace':
		  return 1;
		case 'Two':
		  return 2;
		case 'Three':
		  return 3;
		case 'Four':
		  return 4;
		case 'Five':
		  return 5;
		case 'Six':
		  return 6;
		case 'Seven':
		  return 7;
		case 'Eight':
		  return 8;
		case 'Nine':
		  return 9;
		default:
		  return 10;
	}
}

const getScore = (cardArray) => {
	let score = 0;
	let hasAce = false;
	for (let i = 0; i < cardArray.length; i++) {
		let card = cardArray[i];
		score += getCardNumericValue(card);
		if (card.value === 'Ace') { 
			hasAce = true;
		}
	}
	if (hasAce && score + 10 <= 21) {
		return score + 10;
	}
	return score;
} 

const updateScores = () => {
dealerScore = getScore(dealerCards); 
playerScore = getScore(playerCards);
}

const showDisplay = () => {
	if (!gameStarted){
		message.innerText = 'Start A New Game';
		return;
	}
	let dealerCardName = '';
	for(let i = 0; i < dealerCards.length; i++) {
		dealerCardName += getCardName(dealerCards[i]) + '\n';
	}
	let playerCardName = '';
	for(let i = 0; i < playerCards.length; i++) {
		playerCardName += getCardName(playerCards[i]) + '\n';
	}

	updateScores();

	result.innerText = 'Dealer has: \n' +
	dealerCardName + '(score: '+ dealerScore + ')\n\n' +

	'Player has:\n' + playerCardName +
	'(score: ' + playerScore +  ')\n\n';

	if (gameOver) {
		if (playerWon) {
			message.innerText = "You Win!!!";
			message.innerText.display = 'none';
		}
		else {
			message.innerText = "Dealer Wins!!!";
		}
		newGameButton.style.display = 'inline';
		hitButton.style.display = 'none';
		stayButton.style.display = 'none';
	}
}

const shuffle = (deck) => {
	for (let i = 0; i < deck.length; i++) {
		let mixDeck = Math.floor(Math.random() * deck.length);
		let tmpDeck = deck[mixDeck];
		deck[mixDeck] = deck[i];
		deck[i] = tmpDeck;
	}
}

const checkGameOver = () => {
	updateScores();
	if (gameOver) {
		while(dealerScore < playerScore && 
			playerScore <= 21 &&
			dealerScore <= 21) {
			dealerCards.push(getNextCard());
			updateScores();
		}
	}

	if (playerScore > 21) {
		playerWon = false;
		gameOver = true;
	}
	else if (dealerScore > 21) {
		playerWon = true;
		gameOver = true;
	}
	else if (gameOver) {
		if (playerScore > dealerScore) {
			playerWon = true;
		}
		else if (playerScore == dealerScore) {
			dealerWon = true;
		}
		else {
			playerWon = false;
		}
		newGameButton.style.display = 'inline';
		hitButton.style.display = 'none';
		stayButton.style.display - 'none';
	}
}

// let playerCards = [getNextCard(), getNextCard()];
// let dealerCards = [getNextCard(), getNextCard()]

