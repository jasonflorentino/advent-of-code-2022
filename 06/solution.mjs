// https://adventofcode.com/2022/day/06
import { input } from "./input.mjs";
import { fromLines } from "../util.mjs";

// part 1

console.log(findFirstMarker(input)); // 1361

function findFirstMarker(buffer) {
  for (let i = 0; i < buffer.length; i++) {
    const possiblyMarker = [input[i], input[i + 1], input[i + 2], input[i + 3]];
    if (new Set(possiblyMarker).size === 4) {
      return i + 3 + 1; // anser is 1-based not 0-based;
    }
  }
}

// part 2

console.log(findMarker(input, 14)); // 3263

function findMarker(buffer, markerLen) {
  for (let i = 0; i < buffer.length; i++) {
    const possiblyMarker = new Array(markerLen)
      .fill(0)
      .map((_, j) => buffer[i + j]);
    if (new Set(possiblyMarker).size === markerLen) {
      return i + markerLen;
    }
  }
}
