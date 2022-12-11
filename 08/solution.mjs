// https://adventofcode.com/2022/day/08
import { input } from "./input.mjs";
import { fromLines } from "../util.mjs";

const forest = fromLines(input);
const xLen = forest[0].length;
const yLen = forest.length;

// part 1
// Consider your map;
// how many trees are visible from outside the grid?

// Look down each line of trees from the edge
// and count how many would be visible by
// keeping track of the highest yet seen.

const visible = new Set();
let highest = 0;

function track(n, x, y) {
  highest = n;
  visible.add(toKey(x, y));
}

function toKey(x, y) {
  return `${x}:${y}`;
}

function isEdge(x, y, xLen, yLen) {
  return x === 0 || x === xLen - 1 || y === 0 || y === yLen - 1;
}

// north looking south
for (let x = 0; x < xLen; x++) {
  highest = 0;
  for (let y = 0; y < yLen; y++) {
    let tree = Number(forest[y][x]);
    if (isEdge(x, y, xLen, yLen)) {
      track(tree, x, y);
    } else {
      if (tree <= highest) {
        continue;
      } else {
        track(tree, x, y);
      }
    }
  }
}

// south looking north
for (let x = xLen - 1; x >= 0; x--) {
  highest = 0;
  for (let y = yLen - 1; y >= 0; y--) {
    let tree = Number(forest[y][x]);
    if (isEdge(x, y, xLen, yLen)) {
      track(tree, x, y);
    } else {
      if (tree <= highest) {
        continue;
      } else {
        track(tree, x, y);
      }
    }
  }
}

// west looking east
for (let y = 0; y < yLen; y++) {
  highest = 0;
  for (let x = 0; x < xLen; x++) {
    let tree = Number(forest[y][x]);
    if (isEdge(x, y, xLen, yLen)) {
      track(tree, x, y);
    } else {
      if (tree <= highest) {
        continue;
      } else {
        track(tree, x, y);
      }
    }
  }
}

// east looking west
for (let y = yLen - 1; y >= 0; y--) {
  highest = 0;
  for (let x = xLen - 1; x >= 0; x--) {
    let tree = Number(forest[y][x]);
    if (isEdge(x, y, xLen, yLen)) {
      track(tree, x, y);
    } else {
      if (tree <= highest) {
        continue;
      } else {
        track(tree, x, y);
      }
    }
  }
}

console.log(visible.size); // 1695

// part 2
// Consider each tree on your map.
// What is the highest scenic score possible for any tree?

// Comput the score for each tree, keep track of the best.

let bestScore = 0;

for (let y = 0; y < yLen; y++) {
  for (let x = 0; x < xLen; x++) {
    const treeScore = toScenicScore(...getViewingDistances(x, y, forest));
    bestScore = Math.max(bestScore, treeScore);
  }
}

console.log(bestScore); // 287040

function toScenicScore(a, b, c, d) {
  return a * b * c * d;
}

// Count in all 4 directions simultaneously
// until view is blocked on all sides.
function getViewingDistances(x, y, grid) {
  const mainHeight = Number(grid[y][x]);
  let offset = 1;
  let nCount = 0;
  let sCount = 0;
  let eCount = 0;
  let wCount = 0;
  let nBlocked, sBlocked, eBlocked, wBlocked;
  while (true) {
    if (nBlocked && sBlocked && eBlocked && wBlocked) break;
    const nHeight = Number(grid[y - offset]?.[x] ?? Infinity);
    const sHeight = Number(grid[y + offset]?.[x] ?? Infinity);
    const eHeight = Number(grid[y]?.[x - offset] ?? Infinity);
    const wHeight = Number(grid[y]?.[x + offset] ?? Infinity);
    offset++;
    if (nHeight === Infinity) nBlocked = true;
    if (sHeight === Infinity) sBlocked = true;
    if (eHeight === Infinity) eBlocked = true;
    if (wHeight === Infinity) wBlocked = true;
    if (!nBlocked) {
      nCount++;
      if (nHeight >= mainHeight) {
        nBlocked = true;
      }
    }
    if (!sBlocked) {
      sCount++;
      if (sHeight >= mainHeight) {
        sBlocked = true;
      }
    }
    if (!eBlocked) {
      eCount++;
      if (eHeight >= mainHeight) {
        eBlocked = true;
      }
    }
    if (!wBlocked) {
      wCount++;
      if (wHeight >= mainHeight) {
        wBlocked = true;
      }
    }
  }
  return [nCount, sCount, eCount, wCount];
}
