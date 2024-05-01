const fs = require("fs");
const text = fs.readFileSync("./data.txt").toString("utf-8");
const data = text.split("\r\n");
const processedData = [];

const red = 0;
const yellow = 1;
const green = 2;
const colorSecondCount = 3;
const activeTime = 4;

data.forEach((d) => {
  processedData.push(d.split(","));
});

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

// 1. Find the number of red, yellow & green occurrences

let counterRed = 0;
let counterYellow = 0;
let counterGreen = 0;

for (let i = 0; i < processedData.length; i++) {
  counterRed = processedData[i][red] == 1 ? counterRed + 1 : counterRed;
  counterYellow = processedData[i][yellow] == 1 ? counterYellow + 1 : counterYellow;
  counterGreen = processedData[i][green] == 1 ? counterGreen + 1 : counterGreen;
}

console.log("Red", counterRed, "Yellow", counterYellow, "Green", counterGreen);

// 2. Find how long each colour was active for.

const redTimeArray = [];
const yellowTimeArray = [];
const greenTimeArray = [];

for (let i = 0; i < processedData.length; i++) {
  if (processedData[i][red] == 1 && processedData[i][yellow] != 1 && processedData[i][green] != 1) {
    redTimeArray.push(parseInt(processedData[i][colorSecondCount]));
  }
  if (processedData[i][yellow] == 1 && processedData[i][red] != 1 && processedData[i][green] != 1) {
    yellowTimeArray.push(parseInt(processedData[i][colorSecondCount]));
  }
  if (processedData[i][red] == 1 && processedData[i][yellow] != 1 && processedData[i][green] != 1) {
    greenTimeArray.push(parseInt(processedData[i][colorSecondCount]));
  }
}

const sumRed = redTimeArray.reduce((acc, cur) => acc + cur, 0);
const sumYellow = yellowTimeArray.reduce((acc, cur) => acc + cur, 0);
const sumGreen = greenTimeArray.reduce((acc, cur) => acc + cur, 0);

console.log("red", formatTime(sumRed), "yellow", formatTime(sumYellow), "green", formatTime(sumGreen));

// 3. Find all times when Green was active (by time)

const greenActivetimes = [];

for (let i = 1; i < processedData.length; i++) {
  if (processedData[i][green] == 1) {
    greenActivetimes.push(processedData[i][activeTime]);
  }
}
console.log(greenActivetimes);

// 4. Find the number of complete cycles Red-Yellow-Green-Yellow-Red in the data

let z = 0;
let cycleCounter = 0;
const cycle = [red, yellow, green, yellow, red];

processedData.slice(1).forEach((data) => {
  if (data[cycle[z]] == 1) {
    z++;
    if (z === cycle.length) {
      z = 0;
      cycleCounter++;
    }
  } else {
    z = 0;
  }
});

console.log(cycleCounter.toFixed(0));

// 5. Find number of lines with mistakes (multiple colours active at the same time or no colours active)

let errorCount = 0;

for (let i = 1; i < processedData.length; i++) {
  const result = processedData[i].slice(0, 3).reduce(function (prev, curr) {
    return (Number(prev) || 0) + (Number(curr) || 0);
  });

  if (result != 1) errorCount++;
}

console.log(errorCount);
