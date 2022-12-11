// https://adventofcode.com/2022/day/06
import { input } from "./input.mjs";
import { fromLines } from "../util.mjs";

// part 1
// How many characters need to be processed before
// the first start-of-packet marker is detected?

console.log(findFirstMarker(input)); // 1361

function findFirstMarker(buffer) {
  for (let i = 0; i < buffer.length; i++) {
    const possiblyMarker = [input[i], input[i + 1], input[i + 2], input[i + 3]];
    if (new Set(possiblyMarker).size === 4) {
      return i + 3 + 1; // answer is 1-based not 0-based;
    }
  }
}

// part 2
// How many characters need to be processed before
// the first start-of-message marker is detected?

console.log(findMarker(input, 14)); // 3263

// Find markers of arbitrary length
// Slide a window scross buffer and into
// a Set; to be a marker, its size
// must equal the marker length.
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
