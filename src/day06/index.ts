import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const getMarker = (str: string, markerLength: number): number => {
  let start = 0;
  const map = new Map();

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (map.has(char) && map.get(char) >= start) {
      start = map.get(char) + 1;
    }
    map.set(char, i);
    if (i - start + 1 === markerLength) {
      return i + 1;
    }
  }

  throw Error("Should not reach here");
};

const part1 = (rawInput: string) => {
  const str = parseInput(rawInput);
  return getMarker(str, 4);
};

const part2 = (rawInput: string) => {
  const str = parseInput(rawInput);
  return getMarker(str, 14);
};

run({
  part1: {
    tests: [
      {
        input: "mjqjpqmgbljsphdztnvjfqwrcgsmlb",
        expected: 7,
      },
      {
        input: "bvwbjplbgvbhsrlpgdmjqwftvncz",
        expected: 5,
      },
      {
        input: "nppdvjthqldpwncqszvftbrmjlhg",
        expected: 6,
      },
      {
        input: "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg",
        expected: 10,
      },
      {
        input: "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw",
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: "mjqjpqmgbljsphdztnvjfqwrcgsmlb",
        expected: 19,
      },
      {
        input: "bvwbjplbgvbhsrlpgdmjqwftvncz",
        expected: 23,
      },
      {
        input: "nppdvjthqldpwncqszvftbrmjlhg",
        expected: 23,
      },
      {
        input: "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg",
        expected: 29,
      },
      {
        input: "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw",
        expected: 26,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
