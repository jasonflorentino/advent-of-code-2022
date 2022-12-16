// https://adventofcode.com/2022/day/09
// node 09/solution.mjs
import { input } from "./input.mjs";
import { fromLines, last } from "../util.mjs";

const example = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`; // 13

const example2 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`; // 36

// part 1

const visited = new Set();

function track(x, y) {
  visited.add(`${x}:${y}`);
}

function getOffset(d) {
  switch (d) {
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

function getNewPositionByLeader(hX, hY, tX, tY) {
  const diffX = Math.abs(hX - tX);
  const diffY = Math.abs(hY - tY);
  if (diffX <= 1 && diffY <= 1) {
    return [tX, tY];
  } else {
    let newX = hX;
    let newY = hY;
    if (diffX > 1) {
      if (hX > tX) {
        newX = hX - 1;
      } else {
        newX = hX + 1;
      }
    }
    if (diffY > 1) {
      if (hY > tY) {
        newY = hY - 1;
      } else {
        newY = hY + 1;
      }
    }
    return [newX, newY];
  }
}

function getNewPositionByDirection(direction, x, y) {
  const [oX, oY] = getOffset(direction);
  return [x + oX, y + oY];
}

// part 1
// 6081

// part 2
// 2487

const knots = new Array(10).fill(0).map(() => [0, 0]);

for (const move of fromLines(example2)) {
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
    track(last(knots)[0], last(knots)[1]);
  }
  printState(knots, move);
}

console.log(visited.size);

function printState(coords, move) {
  console.log("\n", move);
  const [maxX, maxY] = coords.reduce(
    ([maxX, maxY], [x, y]) => {
      return [Math.max(maxX, Math.abs(x)), Math.max(maxY, Math.abs(y))];
    },
    [0, 0]
  );
  const board = new Array(maxY * 2 + 1)
    .fill(0)
    .map(() => new Array(maxX * 2 + 1).fill("."));
  board[maxY][maxX] = "S";
  // console.log(coords);
  coords.forEach(([x, y], i, arr) => {
    let name = i;
    if (i === 0) {
      name = "H";
    }
    let curr = board[y + maxY][x + maxX];
    if (curr === "." || curr === "S") {
      board[y + maxY][x + maxX] = name;
    }
  });
  console.log(
    board
      .map((line) => line.join(" "))
      .reverse()
      .join("\n")
  );
}
