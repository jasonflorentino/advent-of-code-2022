// https://adventofcode.com/2022/day/10
// node 10/solution.mjs
import { input, example } from "./input.mjs";
import { fromLines } from "../util.mjs";

// part 1
// Find the signal strength during the 20th, 60th, 100th, 140th,
// 180th, and 220th cycles. What is the sum of these six signal strengths?

// part 2
// Render the image given by your program.
// What eight capital letters appear on your CRT?

const CRT_H = 6;
const CRT_W = 40;

console.log(main(example)); // pt1: 13140
console.log(main(input)); // pt1: 14360 - pt2: BGKAEREZ

function main(instructions) {
  // part 1
  const readTimes = [20, 60, 100, 140, 180, 220];
  let total = 0;
  // part 2
  const crt = new Array(CRT_H).fill(0).map(() => new Array(CRT_W).fill("."));

  const lines = generateLines(instructions);
  let cycle = 0;
  let X = 1;

  let currentLine = {};
  let currentOp = "";
  let currentV = 0;
  let opTime = 0;

  // Clock loop
  while (true) {
    ++cycle; // Begin this cycle

    if (opTime === 0) {
      // Previous op has finished executing,
      // Load a new op.
      currentLine = lines.next();
      if (currentLine.done) break;

      [currentOp, currentV = 0] = currentLine.value.split(" ");
      if (currentOp === "noop") {
        opTime = 1;
      } else if (currentOp === "addx") {
        opTime = 2;
        currentV = Number(currentV);
      }
    }
    // read X in the middle
    // part 1
    if (readTimes.includes(cycle)) total += cycle * X;
    // part 2
    draw(crt, cycle, X);

    // Decrement current opTime and
    // check if the finished op is addx
    opTime--;
    if (opTime === 0 && currentOp === "addx") X += currentV;
  }
  // part 2 -- print crt
  console.log(crt.map((row) => row.join("")).join("\n"));
  // part 1
  return total;
}

function* generateLines(instructions) {
  for (const line of fromLines(instructions)) {
    yield line;
  }
}

function draw(crt, cycle, X) {
  const y = Math.floor(cycle / 40);
  const x = (cycle % 40) - 1;
  if (x === X || x === X - 1 || x === X + 1) {
    crt[y][x] = "#";
  }
}
