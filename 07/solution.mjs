import { input } from "./input.mjs";
import { fromLines } from "../util.mjs";

const root = { name: "/", type: "dir", children: [] };
const stack = [root];
const cd = () => stack[stack.length - 1];

// build tree
for (let line of fromLines(input)) {
  const [a, b, c] = line.split(" ");
  if (a === "$") {
    if (b === "cd") {
      if (c === "/") {
        // already here + only appears once
      } else if (c === "..") {
        stack.pop();
      } else {
        const nextDir = cd().children.find(
          (child) => child.type === "dir" && child.name === c
        );
        stack.push(nextDir);
      }
    }
  } else {
    if (a === "dir") {
      cd().children.push({ type: "dir", name: b, children: [] });
    } else {
      cd().children.push({
        size: Number(a),
        name: b,
        type: "file",
      });
    }
  }
}

function getSize(child) {
  if (child.type === "file") {
    return child.size;
  } else {
    let dirSize = 0;
    for (const c of child.children || []) {
      dirSize += getSize(c);
    }
    return dirSize;
  }
}

function findAll(child, predicate) {
  const matches = [];
  if (predicate(child)) {
    matches.push(child);
  }
  for (const c of child.children || []) {
    matches.push(...findAll(c, predicate));
  }
  return matches;
}

const totalSize = 70000000;
const usedSpace = getSize(root);
const updateSize = 30000000;

console.log("used  :", usedSpace);
console.log("unused:", totalSize - usedSpace);
console.log("needed:", updateSize - (totalSize - usedSpace));

// part 1
// Find all of the directories with a total size of at most 100000.
// What is the sum of the total sizes of those directories?

console.log(
  findAll(root, (c) => c.type === "dir" && getSize(c) <= 100000).reduce(
    (total, c) => {
      return (total += getSize(c));
    },
    0
  )
); // 1243729

// part 2
// Find the smallest directory that, if deleted, would free up enough space
// on the filesystem to run the update. What is the total size of that directory?

console.log(
  Math.min(
    ...findAll(
      root,
      (c) =>
        c.type === "dir" && getSize(c) >= updateSize - (totalSize - usedSpace)
    ).map(getSize)
  )
); // 4443914
