// https://adventofcode.com/2022/day/09
// node 09/solution.mjs
import { input } from "./input.mjs";
import { fromLines, last } from "../util.mjs";

const DEBUG = false;

const example1 = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

const example2 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

// part 1
// Simulate your complete hypothetical series of motions.
// How many positions does the tail of the rope visit at least once?
console.log(trackLastKnot(2, example1).size); // 13
console.log(trackLastKnot(2, input).size); // 6081

// part 2
// Simulate your complete series of motions on a larger rope with ten knots.
// How many positions does the tail of the rope visit at least once?
console.log(trackLastKnot(10, example1).size); // 1
console.log(trackLastKnot(10, example2).size); // 36
console.log(trackLastKnot(10, input).size); // 2487

function trackLastKnot(numOfKnots, moves) {
  const knots = new Array(numOfKnots).fill(0).map(() => [0, 0]);
  const visited = new Set();

  for (const move of fromLines(moves)) {
    const [direction, steps] = move.split(" ");
    for (let s = 0; s < Number(steps); s++) {
      for (let i = 0; i < knots.length; i++) {
        const [x, y] = knots[i];
        if (i === 0) {
          // move head by direction
          const [newX, newY] = getNewPositionByDirection(direction, x, y);
          knots[i] = [newX, newY];
        } else {
          // move others by following leader
          const [leaderX, leaderY] = knots[i - 1];
          const [newX, newY] = getNewPositionByLeader(leaderX, leaderY, x, y);
          knots[i] = [newX, newY];
        }
      }
      visited.add(String(last(knots)));
    }
    DEBUG && printState(knots, move);
  }

  return visited;
}

function getNewPositionByDirection(direction, x, y) {
  const [oX, oY] = getOffset(direction);
  return [x + oX, y + oY];
}

function getNewPositionByLeader(hX, hY, tX, tY) {
  // h for Head; t for Tail
  const diffX = Math.abs(hX - tX);
  const diffY = Math.abs(hY - tY);
  if (diffX <= 1 && diffY <= 1) {
    // They're still touching, no need to move
    return [tX, tY];
  } else {
    // No longer touching. Derive new x/y
    // based on current Head position.
    let newX = hX;
    let newY = hY;
    if (diffX > 1) {
      if (hX > tX) newX = hX - 1;
      else newX = hX + 1;
    }
    if (diffY > 1) {
      if (hY > tY) newY = hY - 1;
      else newY = hY + 1;
    }
    return [newX, newY];
  }
}

function getOffset(direction) {
  switch (direction) {
    case "R":
      return [1, 0];
    case "L":
      return [-1, 0];
    case "U":
      return [0, 1];
    case "D":
      return [0, -1];
  }
}

function printState(coords, move) {
  console.log("\n", move);
  // Find max in each dimension
  const [maxX, maxY] = coords.reduce(
    ([maxX, maxY], [x, y]) => {
      return [Math.max(maxX, Math.abs(x)), Math.max(maxY, Math.abs(y))];
    },
    [0, 0]
  );
  // Make a board twice the size.
  // +1 so that x or y == 0 still has space
  const board = new Array(maxY * 2 + 1)
    .fill(0)
    .map(() => new Array(maxX * 2 + 1).fill("."));
  // Place S at 0,0 (it may get covered)
  board[maxY][maxX] = "S";
  // Place each knot on board
  coords.forEach(([x, y], i) => {
    let boardX = x + maxX;
    let boardY = y + maxY;
    let marker = board[boardY][boardX];
    let name = i;
    if (i === 0) name = "H";
    if (marker === "." || marker === "S") {
      board[boardY][boardX] = name;
    }
  });
  console.log(
    board
      .map((line) => line.join(" "))
      // Reverse column order since >Y
      // should be "higher up" ie. printed first
      .reverse()
      .join("\n")
  );
}
