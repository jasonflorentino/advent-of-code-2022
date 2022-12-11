// https://adventofcode.com/2022/day/2
import { input } from "./input.mjs";
import { fromLines } from "../util.mjs";

const Points = {
  LOSE: 0,
  DRAW: 3,
  WIN: 6,
};

// part 1
// What would your total score be if everything goes
// exactly according to your strategy guide?

console.log(
  fromLines(input).reduce((total, round) => {
    const [opp, you] = round.split(" ");
    return total + getResultPoints(opp, you) + getShapePoints(you);
  }, 0)
); // 13675

function getResultPoints(opp, you) {
  if (isRock(opp)) {
    if (isPaper(you)) return Points.WIN;
    if (isScissors(you)) return Points.LOSE;
  }
  if (isPaper(opp)) {
    if (isRock(you)) return Points.LOSE;
    if (isScissors(you)) return Points.WIN;
  }
  if (isScissors(opp)) {
    if (isRock(you)) return Points.WIN;
    if (isPaper(you)) return Points.LOSE;
  }
  return Points.DRAW;
}

function getShapePoints(choice) {
  return isRock(choice) ? 1 : isPaper(choice) ? 2 : 3;
}

function isRock(c) {
  return c === "X" || c === "A";
}

function isPaper(c) {
  return c === "Y" || c === "B";
}

function isScissors(c) {
  return c === "Z" || c === "C";
}

// part 2
// Following the Elf's instructions for the second column,
// what would your total score be if everything goes exactly
// according to your strategy guide?

console.log(
  fromLines(input).reduce((total, round) => {
    const [opp, end] = round.split(" ");
    const you = getShapeForResult(opp, end);
    return total + getResultPoints(opp, you) + getShapePoints(you);
  }, 0)
); // 14184

function getShapeForResult(opp, result) {
  if (isDraw(result)) return opp;
  if (isWin(result)) return getShapeToBeat(opp);
  if (isLose(result)) return getShapeToLose(opp);
}

function isLose(c) {
  return isRock(c);
}

function isDraw(c) {
  return isPaper(c);
}

function isWin(c) {
  return isScissors(c);
}

function getShapeToBeat(shape) {
  if (isRock(shape)) return "Y";
  if (isPaper(shape)) return "Z";
  if (isScissors(shape)) return "X";
}

function getShapeToLose(shape) {
  if (isRock(shape)) return "Z";
  if (isPaper(shape)) return "X";
  if (isScissors(shape)) return "Y";
}
