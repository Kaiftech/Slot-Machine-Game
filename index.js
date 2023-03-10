const prompt = require("prompt-sync")();

const SYMBOLS = [
  { name: "🍒", value: 2 },
  { name: "🍊", value: 3 },
  { name: "🍋", value: 4 },
  { name: "🍉", value: 5 },
  { name: "🍇", value: 6 },
];

const getNumberInput = (promptMsg, min, max) => {
  while (true) {
    const input = parseFloat(prompt(promptMsg));
    if (isNaN(input) || input < min || input > max) {
      console.log(`Invalid input, please enter a number between ${min} and ${max}.`);
    } else {
      return input;
    };
  };
};
const spinReels = () => {
  return [...Array(3)].map(() => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
};
const printRow = (rows) => {
  for (let i = 0; i < 3; i++) {
    let rowString = "";
    for (let j = 0; j < 3; j++) {
      rowString += rows[j][i].name + " ";
    };
    console.log(rowString);
  };
};
const calculatePayout = (bet, lines, reels) => {
  const transposedReels = [...Array(3)].map((_, i) => reels.map((row) => row[i]));
  let payout = 0;
  for (let i = 0; i < lines; i++) {
    const line = transposedReels[i];
    if (line.every((symbol) => symbol.name === line[0].name)) {
      payout += line[0].value * bet;
    };
  };
  return payout;
};
const playAgain = () => prompt("Do you want to play again? (y/n): ").toLowerCase() === "y";
const main = () => {
  let balance = getNumberInput("Enter a deposit amount: ", 1, Infinity);
  while (balance > 0) {
    console.log(`Balance: ₹${balance.toFixed(2)}`);
    const lines = getNumberInput("Enter the number of lines to bet on (1-3): ", 1, 3);
    const bet = getNumberInput(`Enter the bet per line (max ${balance/lines}): `, 1, balance/lines);
    balance -= bet * lines;
    const reels = [...Array(3)].map(() => spinReels());
    printRow(reels);
    const payout = calculatePayout(bet, lines, reels);
    console.log(`Payout: ₹${payout.toFixed(2)}`);
    const newBalance = balance + payout;
    if (balance != 0){
    console.log(`New balance: ₹${newBalance.toFixed(2)}`);
    } else {
      console.log("Game over You don't have the balance to play any more");
      break;
    };
    if (!playAgain() || balance == 0) {
      break;
    };
  };
  console.log("Thanks for playing!");
};
main();