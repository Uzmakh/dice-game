"use strict"; // treat all JS code as newer version

const player1Score = document.getElementById("score--0");
const player2Score = document.getElementById("score--1");
const currentScore0 = document.getElementById("current--0");
const currentScore1 = document.getElementById("current--1");
const player1Section = document.querySelector(".player--0");
const player2Section = document.querySelector(".player--1");
const diceImg = document.querySelector(".dice");

let currentPlayer, currentRoll, activePlayer, playing;

// Starting condition
const init = function () {
  // currentPlayer = 0; // 0 for Player 1, 1 for Player 2
  currentRoll = 0;
  activePlayer = 0;
  playing = true;

  player1Score.textContent = 0;
  player2Score.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  diceImg.classList.add("hidden");
  player1Section.classList.remove("player--winner");
  player2Section.classList.remove("player--winner");
  player1Section.classList.add("player--active");
  player2Section.classList.remove("player--active");
};

init();

// Function to switch between players
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentRoll = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // currentRoll = 0;
  // currentScore0.textContent = 0;
  // currentScore1.textContent = 0;
  // currentPlayer = currentPlayer === 0 ? 1 : 0;

  player1Section.classList.toggle("player--active");
  player2Section.classList.toggle("player--active");
};

// Function to roll the dice
const rollDice = function () {
  if (playing) {
    // generate random numbers between 1 & 6
    const diceNumber = Math.floor(Math.random() * 6) + 1;
    // display random image
    diceImg.classList.remove("hidden");
    diceImg.src = `image/dice-${diceNumber}.png`;
    // console.log(diceImg)

    // currentRoll = diceNumber;

    if (diceNumber !== 1) {
      currentRoll += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentRoll;
      // Player rolls 1, switch player
    } else {
      // Add current roll to current score
      // currentScore0[currentPlayer].textContent = Number(currentScore0[currentPlayer].textContent) + currentRoll;
      switchPlayer();
    }
  }
};

// Function to hold the score
const holdScore = function () {
  // console.log("working!")
  if (playing) {
    // Add current score to total score
    player1Score.textContent =
      Number(player1Score.textContent) + Number(currentScore0.textContent);
    player2Score.textContent =
      Number(player2Score.textContent) + Number(currentScore1.textContent);

    // Check if player wins
    if (Number(player1Score.textContent) >= 100) {
      playing = false;
      player1Section.classList.add("player--winner");
    } else if (Number(player2Score.textContent) >= 100) {
      playing = false;
      player2Section.classList.add("player--winner");
    } else {
      // Switch player
      switchPlayer();
    }
  }
};

// Function to reset the game
const newGame = function () {
  playing = true;
  currentPlayer = 0;
  currentRoll = 0;
  player1Score.textContent = "0";
  player2Score.textContent = "0";
  currentScore0.textContent = "0";
  currentScore1.textContent = "0";
  // diceImg.src = "dice-5.png";
  diceImg.classList.add("hidden");
  player1Section.classList.remove("player--winner");
  player2Section.classList.remove("player--winner");
  player1Section.classList.add("player--active");
  player2Section.classList.remove("player--active");
};

// Event Listeners
document.querySelector(".btn--roll").addEventListener("click", rollDice);
document.querySelector(".btn--hold").addEventListener("click", holdScore);
document.querySelector(".btn--new").addEventListener("click", newGame);

/**
 * This script defines several functions:

switchPlayer: Switches between players and resets current roll and score.
rollDice: Generates a random number between 1 and 6, updates the dice image, and handles rolling a 1.
holdScore: Adds the current roll to the player's total score, checks for a winner, and switches players if necessary.
newGame: Resets all game variables and removes the winner class.
The script also adds event listeners to the buttons for rolling the dice, holding the score, and starting a new game.
 */
