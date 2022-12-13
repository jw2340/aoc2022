import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((assignment) => {
    const pairs = assignment.split(",");
    return pairs.map((pair) => pair.split("-").map(Number));
  });

const sortIntervals = (intervalsList: number[][][]) => {
  intervalsList.forEach((intervals) => {
    intervals.sort((a, b) => {
      if (a[0] < b[0]) {
        return -1;
      }
      if (a[0] === b[0] && a[1] >= b[1]) {
        return -1;
      }
      return 1;
    });
  });
};

const part1 = (rawInput: string) => {
  const intervalsList = parseInput(rawInput);
  sortIntervals(intervalsList);

  let total = 0;
  intervalsList.forEach((intervals) => {
    if (intervals[0][1] >= intervals[1][1]) {
      total++;
    }
  });

  return total;
};

const part2 = (rawInput: string) => {
  const intervalsList = parseInput(rawInput);
  sortIntervals(intervalsList);

  let total = 0;
  intervalsList.forEach((intervals) => {
    if (intervals[0][1] >= intervals[1][0]) {
      total++;
    }
  });

  return total;
};

const input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

const input2 = `
1-2,1-1
1-1,1-2`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 2,
      },
      {
        input: input2,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 4,
      },
      {
        input: input2,
        expected: 2,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
