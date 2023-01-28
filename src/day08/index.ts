import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

class Tree {
  height: number;
  left: boolean;
  right: boolean;
  top: boolean;
  bottom: boolean;
  constructor(height: number) {
    this.height = height;
    this.left = false;
    this.right = false;
    this.top = false;
    this.bottom = false;
  }
}

const populateTreeGrid = (lines: string[]): Tree[][] => {
  const arr: Tree[][] = [];
  lines.forEach((line) => {
    const trees = line.split("").map((treeHeight) => {
      return new Tree(Number(treeHeight));
    });
    arr.push(trees);
  });
  return arr;
};

const calculateVisibility = (arr: Tree[][]) => {
  // from left
  for (let i = 0; i < arr.length; i++) {
    let maxSoFar = Number.MIN_SAFE_INTEGER;
    for (let j = 0; j < arr[i].length; j++) {
      const tree = arr[i][j];
      if (tree.height > maxSoFar) {
        tree.left = true;
        maxSoFar = tree.height;
      }
    }
  }

  // from right
  for (let i = 0; i < arr.length; i++) {
    let maxSoFar = Number.MIN_SAFE_INTEGER;
    for (let j = arr[i].length - 1; j >= 0; j--) {
      const tree = arr[i][j];
      if (tree.height > maxSoFar) {
        tree.right = true;
        maxSoFar = tree.height;
      }
    }
  }

  // from top
  for (let j = 0; j < arr[0].length; j++) {
    let maxSoFar = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < arr.length; i++) {
      const tree = arr[i][j];
      if (tree.height > maxSoFar) {
        tree.top = true;
        maxSoFar = tree.height;
      }
    }
  }

  // from bottom
  for (let j = 0; j < arr[0].length; j++) {
    let maxSoFar = Number.MIN_SAFE_INTEGER;
    for (let i = arr.length - 1; i >= 0; i--) {
      const tree = arr[i][j];
      if (tree.height > maxSoFar) {
        tree.bottom = true;
        maxSoFar = tree.height;
      }
    }
  }
};

const getVisibility = (tree: Tree): boolean => {
  return tree.left || tree.right || tree.top || tree.bottom;
};

const part1 = (rawInput: string) => {
  const lines = parseInput(rawInput);

  const arr = populateTreeGrid(lines);

  calculateVisibility(arr);

  let totalVisible = 0;
  // loop through matrix
  arr.forEach((trees, i) => {
    trees.forEach((tree, j) => {
      const isVisible = getVisibility(tree);
      if (isVisible) {
        totalVisible++;
      }
    });
  });

  return totalVisible;
};

const part2 = (rawInput: string) => {
  const lines = parseInput(rawInput);

  const arr = populateTreeGrid(lines);

  let maxScore = 0;
  // skip edges, since score will be 0
  for (let i = 1; i < arr.length - 1; i++) {
    for (let j = 1; j < arr[0].length - 1; j++) {
      const tree = arr[i][j];

      // left
      let leftScore = 0;
      let index = j;
      while (index > 0 && arr[i][index - 1].height < tree.height) {
        index--;
        leftScore++;
      }
      // if not at edge, need to include the next tree that blocks view
      if (index > 0) {
        leftScore++;
      }

      // right
      let rightScore = 0;
      index = j;
      while (
        index < arr[0].length - 1 &&
        arr[i][index + 1].height < tree.height
      ) {
        index++;
        rightScore++;
      }
      if (index < arr[0].length - 1) {
        rightScore++;
      }

      // top
      let topScore = 0;
      index = i;
      while (index > 0 && arr[index - 1][j].height < tree.height) {
        index--;
        topScore++;
      }
      if (index > 0) {
        topScore++;
      }

      // bottom
      let bottomScore = 0;
      index = i;
      while (index < arr.length - 1 && arr[index + 1][j].height < tree.height) {
        index++;
        bottomScore++;
      }
      if (index < arr.length - 1) {
        bottomScore++;
      }

      const score = leftScore * rightScore * topScore * bottomScore;
      maxScore = Math.max(score, maxScore);
    }
  }

  return maxScore;
};

const input = `30373
25512
65332
33549
35390`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 21,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 8,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
