export function split(s, c) {
  return s.split(c);
}

export function fromLines(s) {
  return split(s, "\n");
}

export function words(str) {
  return str.split(" ");
}

// Sum up numbers in an array
export function sum(arr) {
  return arr.reduce((t, n) => t + n, 0);
}

// Insert `el` into `arr` at position `pos`
// and 'push' out the last element.
export function insert(el, arr, pos) {
  return [...arr.slice(0, pos), el, ...arr.slice(pos, arr.length - 1)];
}

export function getNumbers(arr) {
  return arr.filter(Number).map(Number);
}

export function last(arr) {
  return arr[arr.length - 1];
}

export function trim(str) {
  return str.trim();
}
