// https://adventofcode.com/2022/day/1
import { input } from "./input.mjs";
import { fromLines, sum, insert } from "../util.mjs";

// part 1
// Find the Elf carrying the most Calories.
// How many total Calories is that Elf carrying?

let most = 0;
let elfTotal = 0;

fromLines(input).forEach((numOrSpace) => {
  if (!numOrSpace) {
    if (elfTotal > most) {
      most = elfTotal;
    }
    elfTotal = 0;
  }
  elfTotal += Number(numOrSpace);
});

console.log(most); // 70296

// part 2
// Find the top three Elves carrying the most Calories.
// How many Calories are those Elves carrying in total?

let top3 = new Array(3).fill(0);
let elfTotal2 = 0;

fromLines(input).forEach((numOrSpace) => {
  if (!numOrSpace) {
    for (let i = 0; i < top3.length; i++) {
      if (elfTotal2 > top3[i]) {
        top3 = insert(elfTotal2, top3, i);
        break;
      }
    }
    elfTotal2 = 0;
  }
  elfTotal2 += Number(numOrSpace);
});

console.log(sum(top3)); // 205381
