import { setClickedLetter } from "./index.js";

const keys = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
];

const keyboard = document.querySelector("#keyboard");

keys.map((key) => {
  if (key == "A" || key == "Z") {
    const breakInTheKeyboard = document.createElement("br");
    keyboard.append(breakInTheKeyboard);
  }
  const keyboardButton = document.createElement("button");
  keyboardButton.innerHTML = key;
  keyboard.append(keyboardButton);
  keyboardButton.addEventListener("click", (e) => {
    setClickedLetter(e.currentTarget.innerHTML);
    e.currentTarget.hidden = true;
  });
});
