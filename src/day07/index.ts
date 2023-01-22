import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

class Node {
  name: string;
  parent?: Node;
  children: Map<string, Node>;
  size?: number;
  constructor(name: string) {
    this.name = name;
    this.parent;
    this.children = new Map();
    this.size;
  }
}

const dfsToGetDirSize = (root: Node): number => {
  const stack = [];
  stack.push(root);
  let size = 0;

  while (stack.length > 0) {
    const node = stack.pop();
    if (node?.size) {
      size += node.size;
    }
    node?.children?.forEach((childNode) => {
      stack.push(childNode);
    });
  }
  return size;
};

const populateTreeAndGetDirNodes = (lines: string[]): Node[] => {
  const root = new Node("/");
  const dirs = [];
  dirs.push(root);
  let current: Node | undefined = root;

  for (const line of lines) {
    if (line === "$ cd /") {
      // already handled root node above
      continue;
    } else if (line === "$ ls") {
      // nothing to do here
      continue;
    } else if (line.startsWith("$ cd ..")) {
      // switch to parent dir
      current = current?.parent;
    } else if (line.startsWith("$ cd")) {
      // move to child dir
      const dirName = line.slice(5);
      current = current?.children.get(dirName);
    } else if (line.startsWith("dir")) {
      // create child dir
      const dirName = line.slice(4);
      const node = new Node(dirName);
      node.parent = current;
      current?.children.set(dirName, node);
      // add to dirs
      dirs.push(node);
    } else {
      // create child file
      const size = Number(line.split(" ")[0]);
      const fileName = line.split(" ")[1];
      const node = new Node(fileName);
      node.size = size;
      node.parent = current;
      current?.children.set(fileName, node);
    }
  }
  return dirs;
};

// initial notes
// create tree
// node - parent, children [], isDir, size, name
// dfs to get size of each dir
// if < 100000, add to result sum

const part1 = (rawInput: string) => {
  const lines = parseInput(rawInput);
  const dirs = populateTreeAndGetDirNodes(lines);

  // dfs for each dir to get size
  // could also do recursive dfs so we only need to do one dfs
  let sum = 0;
  dirs.forEach((dir) => {
    const dirSize = dfsToGetDirSize(dir);
    if (dirSize <= 100000) {
      sum += dirSize;
    }
  });

  return sum;
};

const part2 = (rawInput: string) => {
  const lines = parseInput(rawInput);
  const dirs = populateTreeAndGetDirNodes(lines);
  const root = dirs[0];
  const usedSpace = dfsToGetDirSize(root);
  const spaceNeeded = usedSpace ? usedSpace - 40000000 : 0;

  let dirToDeleteSize: number | undefined = undefined;
  dirs.forEach((dir) => {
    const dirSize = dfsToGetDirSize(dir);
    if (
      dirSize >= spaceNeeded &&
      (!dirToDeleteSize || dirSize < dirToDeleteSize)
    ) {
      dirToDeleteSize = dirSize;
    }
  });

  return dirToDeleteSize;
};

const input = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 95437,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 24933642,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
