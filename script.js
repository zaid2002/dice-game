'use strict';

// Selecting the elements
const score0 = document.getElementById('score--0')
const score1 = document.getElementById('score--1')
const current0 = document.getElementById('current--0')
const current1 = document.getElementById('current--1')
const player0 = document.querySelector('.player--0')
const player1 = document.querySelector('.player--1')

const dice = document.querySelector('.dice')
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')

let scores, currentScore, activePlayer, playing;

// Starting Conditions
function init() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0.textContent = 0
    score1.textContent = 0
    current0.textContent = 0
    current1.textContent = 0
    dice.classList.add('hidden')

    player0.classList.add('player--active')
    player1.classList.remove('player--active')

    document.querySelector(`.player--0`).classList.remove('player--winner')
    document.querySelector(`.player--1`).classList.remove('player--winner')
}
init();

function switchPlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active')
    player1.classList.toggle('player--active')
}

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1. Generating a random dice roll
        const diceNum = Math.trunc(Math.random() * 6) + 1

        // 2. Display dice
        dice.classList.remove('hidden');
        dice.src = `dice-${diceNum}.png`

        // 3. Check for rolled 1: if true
        if (diceNum !== 1) {
            // Add dice to current score
            currentScore += diceNum
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else {
            // Switch to next player
            switchPlayer()
        }
    }
})

// Holding scores functionality
btnHold.addEventListener('click', function () {
    if (playing) {
        // 1. Add current score to total score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]
        // 2. Check if player's score >= 100 
        if (scores[activePlayer] >= 100) {
            // Finish game 
            playing = false;
            dice.classList.add('hidden');
            document.getElementById(`current--${activePlayer}`).textContent = 0;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
        }
        else {
            // Switch to the next player
            switchPlayer()
        }
    }
})

// Resetting the game
btnNew.addEventListener('click', init)