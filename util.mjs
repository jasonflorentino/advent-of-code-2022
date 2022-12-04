export function split(s, c) {
  return s.split(c);
}

export function fromLines(s) {
  return split(s, "\n");
}

// Sum up numbers in an array
export function sum(arr) {
  return arr.reduce((t, n) => t + n, 0);
}

// Insert `el` into `arr` as position `pos`
// and 'push' out the 'last' element.
export function insert(el, arr, pos) {
  return [...arr.slice(0, pos), el, ...arr.slice(pos, arr.length - 1)];
}
