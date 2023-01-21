import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const getInputData = (
  lines: string[],
): { crateLines: string[]; directions: string[]; numStacks: number } => {
  const directionsStartIndex = lines.findIndex((line) =>
    line.startsWith("move"),
  );
  const crateLines = lines.slice(0, directionsStartIndex - 2);
  const directions = lines.slice(directionsStartIndex);

  // get number of stacks
  let numStacks = 0;
  const numbersLine = lines[directionsStartIndex - 2];
  for (let i = numbersLine.length - 1; i >= 0; i--) {
    if (numbersLine[i] !== " ") {
      numStacks = Number(numbersLine[i]);
      break;
    }
  }

  return { crateLines, directions, numStacks };
};

const populateStacks = (
  numStacks: number,
  crateLines: string[],
): string[][] => {
  const stacks: string[][] = [];
  for (let i = 0; i <= numStacks; i++) {
    stacks.push([]);
  }

  for (let i = crateLines.length - 1; i >= 0; i--) {
    const crateLine = crateLines[i];
    for (let j = 0; j < crateLine.length; j += 4) {
      const stackNum = j / 4 + 1;
      const crate = crateLine.slice(j, j + 3);
      if (crate !== "   ") {
        stacks[stackNum].push(crate);
      }
    }
  }

  return stacks;
};

const createOutput = (stacks: string[][]): string => {
  let output = "";
  for (let i = 1; i < stacks.length; i++) {
    const stack = stacks[i];
    output += stack[stack.length - 1].slice(1, 2);
  }
  return output;
};

const part1 = (rawInput: string) => {
  const lines = parseInput(rawInput);
  const { crateLines, directions, numStacks } = getInputData(lines);

  const stacks = populateStacks(numStacks, crateLines);

  // move crates
  directions.forEach((directionLine) => {
    const words = directionLine.split(" ");
    const numCratesToMove = Number(words[1]);
    const currentStack = Number(words[3]);
    const newStack = Number(words[5]);

    for (let i = 0; i < numCratesToMove; i++) {
      const crate = stacks[currentStack].pop();
      if (crate !== undefined) {
        stacks[newStack].push(crate);
      }
    }
  });

  return createOutput(stacks);
};

const part2 = (rawInput: string) => {
  const lines = parseInput(rawInput);
  const { crateLines, directions, numStacks } = getInputData(lines);

  const stacks = populateStacks(numStacks, crateLines);

  // move crates
  directions.forEach((directionLine) => {
    const words = directionLine.split(" ");
    const numCratesToMove = Number(words[1]);
    const currentStack = Number(words[3]);
    const newStack = Number(words[5]);

    const tempStack = [];
    for (let i = 0; i < numCratesToMove; i++) {
      const crate = stacks[currentStack].pop();
      if (crate !== undefined) {
        tempStack.push(crate);
      }
    }
    while (tempStack.length > 0) {
      const crate = tempStack.pop();
      if (crate !== undefined) {
        stacks[newStack].push(crate);
      }
    }
  });

  return createOutput(stacks);
};

const input = `    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

run({
  part1: {
    tests: [
      {
        input,
        expected: "CMZ",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: "MCD",
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  onlyTests: false,
});
