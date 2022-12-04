// https://adventofcode.com/2022/day/4
import { input } from "./input.mjs";
import { fromLines } from "../util.mjs";

// part 1
// In how many assignment pairs does one range fully contain the other?

console.log(
  fromLines(input).reduce((total, pairs) => {
    const [range1, range2] = pairs.split(",");
    const [r1Start, r1End] = range1.split("-").map(Number);
    const [r2Start, r2End] = range2.split("-").map(Number);
    if (r1Start >= r2Start && r1End <= r2End) return total + 1;
    if (r2Start >= r1Start && r2End <= r1End) return total + 1;
    return total + 0;
  }, 0)
); // 441

// part 2
// In how many assignment pairs do the ranges overlap?

console.log(
  fromLines(input).reduce((total, pairs) => {
    const [range1, range2] = pairs.split(",");
    const [r1Start, r1End] = range1.split("-").map(Number);
    const [r2Start, r2End] = range2.split("-").map(Number);
    if (r1Start >= r2Start && r1End <= r2End) return total + 1;
    if (r2Start >= r1Start && r2End <= r1End) return total + 1;
    if (r1Start <= r2Start && r1End >= r2Start) return total + 1;
    if (r2Start <= r1Start && r2End >= r1Start) return total + 1;
    return total + 0;
  }, 0)
); // 861
