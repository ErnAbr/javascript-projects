const url = `https://random-word-api.herokuapp.com/word?number=1`;

const wordBox = document.querySelector("#word-box");
const startButton = document.querySelector("#start-game-button");
const gameContainer = document.querySelector("#game-container");
const resetGameButton = document.querySelector("#reset-game-button");
const gallows = document.querySelector("#gallows");

let clickedLetter = "";
let wordToGuess = "";
let correctGuesses = [];

export function setClickedLetter(letter) {
  clickedLetter = letter;
  guessTheWord();
}

function guessTheWord() {
  if (wordToGuess.includes(clickedLetter.toLowerCase())) {
    correctGuesses.push(clickedLetter);
    updateWordBox();
  } else {
    console.log(gallows);

    // console.log(`Wrong guess: ${clickedLetter}`);
  }
}

async function getRandomWord() {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data[0])
    .catch((error) => {
      console.error("Error:", error);
      return null;
    });
}

function updateWordBox() {
  const letterDivs = wordBox.querySelectorAll(":scope > div");
  console.log(wordToGuess);

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
    }, 100);
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
  startButton.setAttribute("hidden", true);
  gameContainer.removeAttribute("hidden", false);
  resetGameButton.removeAttribute("hidden", false);

  wordToGuess = await getRandomWord();
  createWordBox();
}

function resetGame() {
  clickedLetter = "";
  wordToGuess = "";
  correctGuesses = [];

  wordBox.innerHTML = "";
  resetGameButton.setAttribute("hidden", true);
  startButton.removeAttribute("hidden");
  gameContainer.setAttribute("hidden", true);

  const keyboardButton = document.querySelectorAll("#keyboard > button");
  keyboardButton.forEach((button) => {
    button.removeAttribute("hidden");
  });
}

startButton.addEventListener("click", startGame);
resetGameButton.addEventListener("click", resetGame);
