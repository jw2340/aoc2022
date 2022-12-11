import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split(`\n`);

const getCommonLetters = (strings: string[]) => {
  const sets: Set<string>[] = [];
  strings.forEach((string) => {
    const set: Set<string> = new Set();
    for (let i = 0; i < string.length; i++) {
      set.add(string[i]);
    }
    sets.push(set);
  });

  const intersection = sets.reduce(
    (a, b) => new Set([...a].filter((x) => b.has(x))),
  );
  return intersection;
};

const getPriority = (char: string) => {
  if (char === char.toLowerCase()) {
    return char.charCodeAt(0) - 96;
  }
  return char.charCodeAt(0) - 38;
};

const part1 = (rawInput: string) => {
  const rucksacks = parseInput(rawInput);
  let sum = 0;
  rucksacks.forEach((rucksack) => {
    const compartment1 = rucksack.slice(0, rucksack.length / 2);
    const compartment2 = rucksack.slice(rucksack.length / 2);
    const [commonItem] = getCommonLetters([compartment1, compartment2]);
    const priority = getPriority(commonItem);
    sum += priority;
  });
  return sum;
};

const part2 = (rawInput: string) => {
  const rucksacks = parseInput(rawInput);
  let sum = 0;
  for (let i = 0; i < rucksacks.length; i += 3) {
    const rucksack1 = rucksacks[i];
    const rucksack2 = rucksacks[i + 1];
    const rucksack3 = rucksacks[i + 2];
    const [commonItem] = getCommonLetters([rucksack1, rucksack2, rucksack3]);
    const priority = getPriority(commonItem);
    sum += priority;
  }
  return sum;
};

const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 157,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 70,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
