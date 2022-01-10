'use strict';
// console.log(document.querySelector('.message').textContent);
// document.querySelector('.message').textContent = '🎉 Correct Number';
// console.log(document.querySelector('.message').textContent);

// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent = 10;
// document.querySelector('.guess').value = 23;
// console.log(document.querySelector('.guess').value);
const wrong = new Audio('sounds/Alarm-08.wav');
const right = new Audio('sounds/success.wav');
let randomNum = Math.floor(Math.random() * 20) + 1;
let bestScrore = 0;
let currentScore = 5;
let numberOfHearts = 5;
let hasWon = false;
// figure out current score

document.querySelector('.check').addEventListener('click', function () {
  if (numberOfHearts === 0 || hasWon) {
    return;
  }
  let guessNum = Number(document.querySelector('.guess').value);
  if (guessNum !== randomNum) {
    currentScore--;
    document.querySelector('.score').textContent = currentScore.toString();
    wrong.play();
    reduceHearts();
    if (guessNum < randomNum)
      document.querySelector('.message').textContent = '⬆ Too low, go higher';
    else if (guessNum > randomNum)
      document.querySelector('.message').textContent = '⬇ Too high, go lower';
  } else winfunc();
});

function reduceHearts() {
  numberOfHearts--;

  switch (numberOfHearts) {
    case 4:
      document.querySelector('.hearts').textContent = '♥♥♥♥';
      break;
    case 3:
      document.querySelector('.hearts').textContent = '♥♥♥';
      break;
    case 2:
      document.querySelector('.hearts').textContent = '♥♥';
      break;
    case 1:
      document.querySelector('.hearts').textContent = '♥';
      break;
    case 0:
      document.body.style.backgroundColor = 'red';
      document.querySelector('.hearts').textContent = '☠';
      document.querySelector('.hearts').style.color = 'white';
      document.querySelector('.message').textContent = 'GAME OVER!!!';
      stopGame();
      break;
  }
}

function winfunc() {
  hasWon = true;
  document.body.style.backgroundColor = 'green';
  document.querySelector('.message').textContent = 'YOU HAVE WON!!!';
  if (currentScore > bestScrore) {
    bestScrore = currentScore;
    document.querySelector('.highscore').textContent = bestScrore.toString();
  }
  right.play();
  document.querySelector('.number').innerHTML = randomNum.toString();
  stopGame();
}

function stopGame() {
  document.querySelector('.guess').value = undefined;
  document.querySelector('.guess').readOnly = true;
}

document.querySelector('.again').addEventListener('click', function () {
  randomNum = Math.floor(Math.random() * 20) + 1;
  currentScore = 5;
  numberOfHearts = 5;
  hasWon = false;
  document.querySelector('.hearts').textContent = '♥♥♥♥♥';
  document.body.style.backgroundColor = '#222';
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.guess').readOnly = false;
  document.querySelector('.number').innerHTML = '?';
  document.querySelector('.score').textContent = '5';
});
