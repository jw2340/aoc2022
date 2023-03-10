import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const getSignalStrength = (cycle: number, register: number): number => {
  if ((cycle - 20) % 40 === 0) {
    return cycle * register;
  }
  return 0;
};

const part1 = (rawInput: string) => {
  const lines = parseInput(rawInput);
  // noop -> cycle += 1
  // addx -> cycle += 2, X += x
  // after each cycle, check if need to check signal strength -> 20 + 40 ... -> cycle * x
  let cycle = 0;
  let register = 1;
  let signalStrengthSum = 0;

  lines.forEach((line) => {
    const instructions = line.split(" ");
    if (instructions[0] === "noop") {
      cycle += 1;
      signalStrengthSum += getSignalStrength(cycle, register);
    } else {
      cycle += 1;
      signalStrengthSum += getSignalStrength(cycle, register);
      cycle += 1;
      signalStrengthSum += getSignalStrength(cycle, register);
      const value = Number(instructions[1]);
      register += value;
    }
  });
  return signalStrengthSum;
};

const calculatePixelPosition = (
  pixelNumber: number,
): { row: number; col: number } => {
  const row = Math.floor(pixelNumber / 40);
  const col = pixelNumber % 40;
  return { row, col };
};

const fillBoard = (board: string[][], cycle: number, register: number) => {
  const cyclePosition = calculatePixelPosition(cycle - 1);
  const spritePositions = [register - 1, register, register + 1].map((reg) => {
    return calculatePixelPosition(reg);
  });
  spritePositions.forEach((spritePosition) => {
    if (spritePosition.col === cyclePosition.col) {
      board[cyclePosition.row][cyclePosition.col] = "#";
    }
  });
};

const part2 = (rawInput: string) => {
  const lines = parseInput(rawInput);
  const board: string[][] = [];
  for (let i = 0; i < 6; i++) {
    board.push([]);
    for (let j = 0; j < 40; j++) {
      board[i].push(".");
    }
  }
  // cycle -> Math.floor(cycle - 1 / 40) = row; cycle - 1 % 40 = column
  // sprite -> middle = register => calculate position like cycle

  let cycle = 0;
  let register = 1;
  lines.forEach((line) => {
    const instructions = line.split(" ");
    if (instructions[0] === "noop") {
      cycle += 1;
      fillBoard(board, cycle, register);
    } else {
      cycle += 1;
      fillBoard(board, cycle, register);

      cycle += 1;
      fillBoard(board, cycle, register);

      const value = Number(instructions[1]);
      register += value;
    }
  });

  let output: string[] = [];
  board.forEach((row) => {
    output.push(row.join(""));
  });

  return output.join("\n");
};

const input = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 13140,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: `##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....`,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
