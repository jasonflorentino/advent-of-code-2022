export const example = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`;

export const input = `Monkey 0:
Starting items: 52, 78, 79, 63, 51, 94
Operation: new = old * 13
Test: divisible by 5
  If true: throw to monkey 1
  If false: throw to monkey 6

Monkey 1:
Starting items: 77, 94, 70, 83, 53
Operation: new = old + 3
Test: divisible by 7
  If true: throw to monkey 5
  If false: throw to monkey 3

Monkey 2:
Starting items: 98, 50, 76
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 0
  If false: throw to monkey 6

Monkey 3:
Starting items: 92, 91, 61, 75, 99, 63, 84, 69
Operation: new = old + 5
Test: divisible by 11
  If true: throw to monkey 5
  If false: throw to monkey 7

Monkey 4:
Starting items: 51, 53, 83, 52
Operation: new = old + 7
Test: divisible by 3
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 5:
Starting items: 76, 76
Operation: new = old + 4
Test: divisible by 2
  If true: throw to monkey 4
  If false: throw to monkey 7

Monkey 6:
Starting items: 75, 59, 93, 69, 76, 96, 65
Operation: new = old * 19
Test: divisible by 17
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 7:
Starting items: 89
Operation: new = old + 2
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 4`;
