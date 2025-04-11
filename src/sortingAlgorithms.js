import { getBubbleSortSteps } from './algorithms/bubbleSort';
import { getMergeSortSteps } from './algorithms/mergeSort';
import { getQuickSortSteps } from './algorithms/quickSort';

export const sortingAlgorithms = {
  'Bubble Sort': getBubbleSortSteps,
  'Merge Sort': getMergeSortSteps,
  'Quick Sort': getQuickSortSteps,
};
