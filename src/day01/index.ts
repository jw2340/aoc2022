import run from "aocrunner";
import { MinHeap } from "@datastructures-js/heap";

const parseInput = (rawInput: string) => rawInput.split("\n");

const part1 = (rawInput: string) => {
  const items = parseInput(rawInput);

  let maxSum = 0;
  let currentSum = 0;
  items.forEach((item) => {
    if (item === "") {
      maxSum = Math.max(currentSum, maxSum);
      currentSum = 0;
    } else {
      currentSum += Number(item);
    }
  });
  if (currentSum > maxSum) {
    maxSum = Math.max(currentSum, maxSum);
  }

  return maxSum;
};

/**
 * find max k elements when there are n items
 * 1. array
 *  - store sums in array, sort array, get first k elements from array
 *  - runtime O(n * logn)
 *  - space O(n)
 *
 * 2. heap
 *  - maintain min heap w/ k elements
 *  - runtime O(n * logk)
 *  - space O(k)
 */

const handleSum = (val: number, heap: MinHeap<number>, size: number) => {
  if (heap.size() < size) {
    heap.push(val);
  } else if (val > heap.top()) {
    heap.pop();
    heap.push(val);
  }
};

// implement min heap
const part2 = (rawInput: string) => {
  const items = parseInput(rawInput);

  const k = 3;
  const heap = new MinHeap<number>();
  let currentSum = 0;

  items.forEach((item) => {
    if (item === "") {
      handleSum(currentSum, heap, k);
      currentSum = 0;
    } else {
      currentSum += Number(item);
    }
  });
  handleSum(currentSum, heap, k);

  let topKSum = 0;
  for (let i = 0; i < k; i++) {
    topKSum += heap.pop();
  }

  return topKSum;
};

const input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 24000,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 45000,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
