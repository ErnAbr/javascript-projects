const url = `https://random-word-api.herokuapp.com/word?number=1`;

async function getRandomWord() {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data[0])
    .catch((error) => {
      console.error("Error:", error);
      return null;
    });
}

async function startGame() {
  const wordToGuess = await getRandomWord();
  console.log("Word to guess:", wordToGuess);
}

startGame();
