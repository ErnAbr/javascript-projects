const wordBox = document.querySelector("#word-box");
const startButton = document.querySelector("#start-game-button");
const gameContainer = document.querySelector("#game-container");
const resetGameButton = document.querySelector("#reset-game-button");
const gallows = document.querySelector("#gallows");

let clickedLetter = "";
let wordToGuess = "";
let correctGuesses = [];
let incorrectGuessCount = 0;
let wordLength;

const gallowsParts = [
  "head",
  "body",
  "left-arm",
  "right-arm",
  "left-leg",
  "right-leg",
];

async function getRandomWord(wordLength) {
  return fetch(
    `https://random-word-api.herokuapp.com/word?length=${wordLength}`
  )
    .then((response) => response.json())
    .then((data) => data[0])
    .catch((error) => {
      console.error("Error:", error);
      return null;
    });
}

export function setClickedLetter(letter) {
  clickedLetter = letter;
  guessTheWord();
}

function guessTheWord() {
  if (wordToGuess.includes(clickedLetter.toLowerCase())) {
    correctGuesses.push(clickedLetter);
    updateWordBox();
  } else {
    incorrectGuess();
  }
}

function incorrectGuess() {
  if (incorrectGuessCount < gallowsParts.length) {
    const part = gallows.querySelector(`#${gallowsParts[incorrectGuessCount]}`);
    if (part) part.removeAttribute("hidden");
    incorrectGuessCount++;
  }

  if (incorrectGuessCount === gallowsParts.length) {
    setTimeout(() => {
      alert(`You Lost! correct answer was: ${wordToGuess}`);
      resetGame();
    }, 1000);
  }
}

function updateWordBox() {
  const letterDivs = wordBox.querySelectorAll(":scope > div");

  Array.from(wordToGuess).forEach((letter, index) => {
    if (correctGuesses.includes(letter.toUpperCase())) {
      const letterDiv = letterDivs[index];
      letterDiv.querySelector("div").innerHTML = letter.toUpperCase();
    }
  });

  const remainingUnderscores = Array.from(letterDivs).some(
    (div) => div.querySelector("div").innerHTML === "_"
  );

  if (!remainingUnderscores) {
    setTimeout(() => {
      alert("You have guessed the word!");
      resetGame();
    }, 1000);
  }
}

function createWordBox() {
  Array.from(wordToGuess).map(() => {
    const letterBox = document.createElement("div");
    const innerLetter = document.createElement("div");
    letterBox.innerHTML = "";
    innerLetter.innerHTML = "_";
    wordBox.appendChild(letterBox);
    letterBox.appendChild(innerLetter);
  });
}

async function startGame() {
  while (isNaN(wordLength) || wordLength < 3) {
    let input = prompt("please enter number (min 3) for word length");

    if (input == null) {
      resetGame();
      return;
    }

    wordLength = Number(input);

    if (wordLength === 0) {
      continue;
    }
  }

  startButton.setAttribute("hidden", true);
  gameContainer.removeAttribute("hidden", false);
  resetGameButton.removeAttribute("hidden", false);

  wordToGuess = await getRandomWord(wordLength);
  createWordBox();
}

function resetGame() {
  clickedLetter = "";
  wordToGuess = "";
  correctGuesses = [];
  incorrectGuessCount = 0;
  wordLength = 0;

  wordBox.innerHTML = "";
  resetGameButton.setAttribute("hidden", true);
  startButton.removeAttribute("hidden");
  gameContainer.setAttribute("hidden", true);

  const keyboardButton = document.querySelectorAll("#keyboard > button");
  keyboardButton.forEach((button) => {
    button.removeAttribute("hidden");
  });

  gallows.querySelectorAll("div").forEach((div, index) => {
    if (index != 0) {
      div.setAttribute("hidden", true);
    }
  });
}

startButton.addEventListener("click", startGame);
resetGameButton.addEventListener("click", resetGame);
