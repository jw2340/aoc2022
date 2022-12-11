import run from "aocrunner";

const OUTCOME_SCORE = {
  X: { A: 3, B: 0, C: 6 },
  Y: { A: 6, B: 3, C: 0 },
  Z: { A: 0, B: 6, C: 3 },
};

const SHAPE_SCORE = {
  X: 1,
  Y: 2,
  Z: 3,
};

const parseInput = (rawInput: string) => rawInput.split("\n");

const part1 = (rawInput: string) => {
  const lines = parseInput(rawInput);
  let totalScore = 0;
  lines.forEach((line) => {
    const opponent = line[0];
    const self = line[2];
    if (
      (opponent === "A" || opponent === "B" || opponent === "C") &&
      (self === "X" || self === "Y" || self === "Z")
    ) {
      totalScore += OUTCOME_SCORE[self][opponent];
      totalScore += SHAPE_SCORE[self];
    }
  });
  return totalScore;
};

const OUTCOME_SELF = {
  A: { X: "Z", Y: "X", Z: "Y" },
  B: { X: "X", Y: "Y", Z: "Z" },
  C: { X: "Y", Y: "Z", Z: "X" },
} as const;

const part2 = (rawInput: string) => {
  const lines = parseInput(rawInput);
  let totalScore = 0;
  lines.forEach((line) => {
    const opponent = line[0];
    const outcome = line[2];
    if (
      (opponent === "A" || opponent === "B" || opponent === "C") &&
      (outcome === "X" || outcome === "Y" || outcome === "Z")
    ) {
      const self = OUTCOME_SELF[opponent][outcome];
      totalScore += OUTCOME_SCORE[self][opponent];
      totalScore += SHAPE_SCORE[self];
    }
  });
  return totalScore;
};

const input = `A Y
B X
C Z`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
