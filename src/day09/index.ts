import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const parseMove = (line: string) => {
  const [direction, num] = line.split(" ");
  return { direction, num: Number(num) };
};

const processTailVisit = (
  tailPosition: { x: number; y: number },
  tailVisited: { [xKey: number]: { [yKey: number]: boolean } },
) => {
  if (!tailVisited[tailPosition.x]) {
    tailVisited[tailPosition.x] = {};
  }
  tailVisited[tailPosition.x][tailPosition.y] = true;
};

const calculateTailVisited = (tailVisited: {
  [xKey: number]: { [yKey: number]: boolean };
}) => {
  let total = 0;
  for (const xKey in tailVisited) {
    for (const yKey in tailVisited[xKey]) {
      total++;
    }
  }
  return total;
};

const trackRopeTailMovement = (rawInput: string, knotsNum: number) => {
  const knots: { x: number; y: number }[] = [];
  for (let i = 0; i < knotsNum; i++) {
    knots[i] = { x: 0, y: 0 };
  }

  // keep track of where T visited
  const tailVisited = {};
  processTailVisit(knots[knotsNum - 1], tailVisited);

  const lines = parseInput(rawInput);
  lines.forEach((line) => {
    const move = parseMove(line);

    // for each move, move H once, check if T is more than 1 step away, and move if so
    for (let i = 0; i < move.num; i++) {
      // update H position
      const headPosition = knots[0];
      switch (move.direction) {
        case "R":
          headPosition.x++;
          break;
        case "L":
          headPosition.x--;
          break;
        case "U":
          headPosition.y++;
          break;
        case "D":
          headPosition.y--;
          break;
        default:
          throw Error("Invalid direction");
      }

      for (let i = 1; i < knotsNum; i++) {
        // if x and y absolute difference < 2
        const diff = {
          x: knots[i - 1].x - knots[i].x,
          y: knots[i - 1].y - knots[i].y,
        };
        if (Math.abs(diff.x) < 2 && Math.abs(diff.y) < 2) {
          continue;
        }

        // update knot position based on previous knot's position
        // how to determine where to move? check x and y difference btwn prev knot and current knot -> map to a movement
        // move right - diff x = 2, y = 0
        if (diff.x === 2 && diff.y === 0) {
          knots[i].x++;
        }
        // move left - diff x = -2, y = 0
        if (diff.x === -2 && diff.y === 0) {
          knots[i].x--;
        }
        // move up - diff x = 0, y = 2
        if (diff.x === 0 && diff.y === 2) {
          knots[i].y++;
        }
        // move down - diff x = 0, y = -2
        if (diff.x === 0 && diff.y === -2) {
          knots[i].y--;
        }
        // move up, right - 2,2; 2,1; 1,2
        if (
          (diff.x === 2 && diff.y === 2) ||
          (diff.x == 2 && diff.y === 1) ||
          (diff.x === 1 && diff.y === 2)
        ) {
          knots[i].x++;
          knots[i].y++;
        }
        // move up, left - -2,2; -2,1; -1,2
        if (
          (diff.x === -2 && diff.y === 2) ||
          (diff.x == -2 && diff.y === 1) ||
          (diff.x === -1 && diff.y === 2)
        ) {
          knots[i].x--;
          knots[i].y++;
        }
        // move down, right - 2,-2; 2,-1; 1,-2
        if (
          (diff.x === 2 && diff.y === -2) ||
          (diff.x == 2 && diff.y === -1) ||
          (diff.x === 1 && diff.y === -2)
        ) {
          knots[i].x++;
          knots[i].y--;
        }
        // move down, left - -2,-2; -2,-1; -1,-2
        if (
          (diff.x === -2 && diff.y === -2) ||
          (diff.x == -2 && diff.y === -1) ||
          (diff.x === -1 && diff.y === -2)
        ) {
          knots[i].x--;
          knots[i].y--;
        }
        if (i == knotsNum - 1) {
          processTailVisit(knots[i], tailVisited);
        }
      }
    }
  });
  return calculateTailVisited(tailVisited);
};

const part1 = (rawInput: string) => {
  return trackRopeTailMovement(rawInput, 2);
};

const part2 = (rawInput: string) => {
  return trackRopeTailMovement(rawInput, 10);
};

const input = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

const input2 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: input2,
        expected: 36,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
