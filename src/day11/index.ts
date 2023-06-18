import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const operatorFuncs = {
  "+": (x: number, y: number) => x + y,
  "-": (x: number, y: number) => x - y,
  "*": (x: number, y: number) => x * y,
  "/": (x: number, y: number) => x / y,
};

type Operator = "+" | "-" | "*" | "/";

const createWorryFunction = (
  lines: string[],
  reduceWorry: boolean,
  dividerProduct: number,
) => {
  const equation = lines[0].slice("  Operation: new = ".length).split(" ");
  const operator = equation[1] as Operator;
  const val = equation[2] === "old" ? null : Number(equation[2]);
  const divider = Number(lines[1].slice("  Test: divisible by ".length));
  const trueResult = Number(
    lines[2].slice("    If true: throw to monkey ".length),
  );
  const falseResult = Number(
    lines[3].slice("    If true: throw to monkey ".length),
  );

  const createFunction =
    (
      operator: Operator,
      val: number | null,
      divider: number,
      trueResult: number,
      falseResult: number,
    ) =>
    (old: number) => {
      let worry = operatorFuncs[operator](old, val ?? old);
      if (reduceWorry) {
        worry = Math.floor(worry / 3);
      } else {
        // use chinese remainder theorem to avoid int overflow
        worry = worry % dividerProduct;
      }

      if (worry % divider === 0) {
        return { worry, monkey: trueResult };
      }
      return { worry, monkey: falseResult };
    };
  return createFunction(operator, val, divider, trueResult, falseResult);
};

const calculateMonkeyBusiness = (
  input: string[],
  rounds: number,
  reduceWorry: boolean = true,
) => {
  // get divider product
  let dividerProduct = 1;
  for (let i = 0; i < input.length; i += 7) {
    const divider = Number(input[i + 3].slice("  Test: divisible by ".length));
    dividerProduct *= divider;
  }

  // initialize DS to store monkey items, operation, test, and frequency
  const monkeyData = [];
  for (let i = 0; i < input.length; i += 7) {
    const items = input[i + 1]
      .slice("  Starting items: ".length)
      .split(", ")
      .map(Number);
    const worryFunction = createWorryFunction(
      input.slice(i + 2, i + 6),
      reduceWorry,
      dividerProduct,
    );
    const itemsInvestigated = 0;
    monkeyData.push({ items, worryFunction, itemsInvestigated });
  }

  // do rounds
  for (let i = 0; i < rounds; i++) {
    for (let j = 0; j < monkeyData.length; j++) {
      const items = monkeyData[j].items;
      while (items.length > 0) {
        const item = items.pop() as number;
        const { worry, monkey } = monkeyData[j].worryFunction(item);
        monkeyData[j].itemsInvestigated += 1;
        monkeyData[monkey].items.push(worry);
      }
    }
  }

  // get 2 highest itemsInvestigated, calculate monkey business
  let max = 0;
  let nextMax = 0;
  for (let i = 0; i < monkeyData.length; i++) {
    const val = monkeyData[i].itemsInvestigated;
    if (val > max) {
      nextMax = max;
      max = val;
    } else if (val > nextMax) {
      nextMax = val;
    }
  }

  return max * nextMax;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return calculateMonkeyBusiness(input, 20);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return calculateMonkeyBusiness(input, 10000, false);
};

const input = `Monkey 0:
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

run({
  part1: {
    tests: [
      {
        input,
        expected: 10605,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 2713310158,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
