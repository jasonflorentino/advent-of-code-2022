// https://adventofcode.com/2022/day/05
import { stack, moves } from "./input.mjs";
import { fromLines, getNumbers } from "../util.mjs";

// part 1

// Represent each stack as an array of crates
// where the lower the crate, the lower the idx
// ie. the bottom crate in a stack is at stack[0]
// Then arrange each stack in an array of stacks
// where the first stack is the first idx.
// ie. stacks[0] is the first stack.
const stacks = buildStacks(stack);

console.log(
  doMoves(moves, stacks).reduce((str, stack) => {
    return str + stack.pop();
  }, "")
); // TQRFCBSJJ

function buildStacks(input) {
  const numOfStacks = Math.max(...getNumbers(input.split(" ")));
  const stacks = new Array(numOfStacks).fill(0).map((_) => []);
  fromLines(input)
    .reverse() // start populating stacks from bottom row
    .forEach((line) => {
      if (/[A-Z]/.test(line)) {
        // crate lines will have capital letters
        const chars = line.split("");
        for (let s = 1; s <= numOfStacks; s++) {
          // The Idx for the letter of each crate in
          // a row is relative to the number of that stack.
          // But only in that each stack is evenly spaced
          // and takes up 4 ('[X] ') characters length.
          const idxForStack = (s - 1) * 4 + 1;
          const char = chars[idxForStack];
          char !== " " && stacks[s - 1].push(chars[idxForStack]);
        }
      }
    });
  return stacks;
}

function doMoves(moves, stacks) {
  fromLines(moves).forEach((move) => {
    const [numToMove, fromStack, toStack] = getNumbers(move.split(" "));
    for (let i = 0; i < numToMove; i++) {
      stacks[toStack - 1].push(stacks[fromStack - 1].pop());
    }
  });
  return stacks;
}

// part 2

const stacks2 = buildStacks(stack);

console.log(
  doMoves2(moves, stacks2).reduce((str, stack) => {
    return str + stack.pop();
  }, "")
); // RMHFJNVFP

function doMoves2(moves, stacks) {
  fromLines(moves).forEach((move) => {
    const [numToMove, fromStack, toStack] = getNumbers(move.split(" "));
    const toAdd = [];
    for (let i = 0; i < numToMove; i++) {
      toAdd.push(stacks[fromStack - 1].pop());
    }
    stacks[toStack - 1].push(...toAdd.reverse());
  });
  return stacks;
}
