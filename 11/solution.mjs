// https://adventofcode.com/2022/day/11
// node 11/solution.mjs
import { input, example } from "./input.mjs";
import { fromLines, last, trim, words } from "../util.mjs";

const IS_PART_1 = false;
const TIMES = 10000;
const TESTS = [];

class Monkey {
  constructor(name) {
    this.name = name;
    this.items = [];
    this.friends = [];
    this.itemsInspected = 0;
    this.operation = () => {};
  }
  befriend(monkey) {
    this.friends[monkey.name] = monkey;
  }
  doTurn(worryLevelVal) {
    while (this.items.length) {
      const item = this.items.shift();
      this.inspect(item);
      item.relief(worryLevelVal);
      this.throw(item);
    }
  }
  inspect(item) {
    item.worry = this.operation(item.worry);
    this.itemsInspected += 1;
    return item;
  }
  throw(item) {
    let toThrow;
    if (this.test(item)) toThrow = this.trueThrow;
    else toThrow = this.falseThrow;
    this.friends[toThrow].catchItem(item);
  }
  test(item) {
    return item.worry % this.testVal === 0;
  }
  setOp(A, operator, B) {
    if (A !== "old") throw "wut";
    if (operator === "*") this.operation = this.makeMultiply(B);
    if (operator === "+") this.operation = this.makeAdd(B);
  }
  makeMultiply(B) {
    return (old) => {
      if (B === "old") return old * old;
      else return old * Number(B);
    };
  }
  makeAdd(B) {
    return (old) => {
      if (B === "old") return old + old;
      else return old + Number(B);
    };
  }
  catchItem(item) {
    this.items.push(item);
  }
}

class Item {
  constructor(startingWorry) {
    this.worry = startingWorry;
  }
  relief(val = 3) {
    if (IS_PART_1) this.worry = Math.floor(this.worry / val);
    else this.worry = this.worry % val;
  }
}

function createMonkeys(lines) {
  const monkeys = [];
  let currentMonkey = null;
  for (const line of lines) {
    const [firstWord] = words(line);
    switch (firstWord) {
      case "Monkey": {
        const [_, name] = words(line);
        currentMonkey = new Monkey(Number(name.replace(/:/g, "")));
        monkeys[currentMonkey.name] = currentMonkey;
        break;
      }
      case "Starting": {
        const [_, items] = line.split(":");
        items
          .replace(/\s/g, "")
          .split(",")
          .map(Number)
          .forEach((itemWorry) => {
            currentMonkey.catchItem(new Item(itemWorry));
          });
        break;
      }
      case "Operation:": {
        const [_, op] = line.split("=");
        const opTokens = words(op.trim());
        currentMonkey.setOp(...opTokens);
        break;
      }
      case "Test:": {
        const testVal = Number(last(words(line)));
        currentMonkey.testVal = testVal;
        TESTS.push(testVal);
        break;
      }
      case "If": {
        const [_, condition] = words(line);
        if (condition === "true:") {
          currentMonkey.trueThrow = Number(last(words(line)));
        } else {
          currentMonkey.falseThrow = Number(last(words(line)));
        }
        break;
      }
    }
  }
  return monkeys;
}

function makeMonkeyTroop(monkeys) {
  for (const monkeyA of monkeys) {
    for (const monkeyB of monkeys) {
      if (monkeyA === monkeyB) continue;
      else monkeyA.befriend(monkeyB);
    }
  }
  return monkeys;
}

function doRound(monkeys, worryLevelVal) {
  for (const monkey of monkeys) {
    monkey.doTurn(worryLevelVal);
  }
}

function chaseMonkeys(input, times) {
  const monkeys = makeMonkeyTroop(createMonkeys(fromLines(input).map(trim)));
  const worryLevelVal = IS_PART_1 ? 3 : TESTS.reduce((p, n) => p * n, 1);

  let rounds = times;
  while (--rounds >= 0) doRound(monkeys, worryLevelVal);

  const itemsInspected = monkeys.map((monkey) => monkey.itemsInspected);
  return itemsInspected.sort((a, b) => a - b).pop() * itemsInspected.pop();
}

// pt1 example 10605
// pt1 input 58786
// pt1 example 2713310158
// pt2 input 14952185856
console.log(chaseMonkeys(example, TIMES));
console.log(chaseMonkeys(input, TIMES));
