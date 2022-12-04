// https://adventofcode.com/2022/day/3
import { input } from "./input.mjs";
import { fromLines } from "../util.mjs";

const Priorities = [
  ...new Array(26).fill(0).map((_, i) => String.fromCharCode(i + 97)), //a-z
  ...new Array(26).fill(0).map((_, i) => String.fromCharCode(i + 65)), //A-Z
];

// part 1

console.log(
  fromLines(input).reduce((total, items) => {
    const comp1 = new Set(items.split("").slice(0, items.length / 2));
    for (let i = items.length / 2; i < items.length; i++) {
      if (comp1.has(items[i])) {
        return total + (Priorities.indexOf(items[i]) + 1);
      }
    }
  }, 0)
); // 8139

// part 2

console.log(
  fromLines(input).reduce((total, items, i, elves) => {
    if (i % 3 !== 0) {
      return total;
    }
    const elf1 = new Set(items.split(""));
    const common1and2 = elves[i + 1].split("").reduce((common, c) => {
      if (elf1.has(c)) common.add(c);
      return common;
    }, new Set());
    const badgeCode = elves[i + 2].split("").find((c) => common1and2.has(c));
    return total + (Priorities.indexOf(badgeCode) + 1);
  }, 0)
); // 2668
