// Bubble Sort
export function getBubbleSortSteps(arr) {
    const steps = [arr.slice()];
    let swapped;
  
    do {
      swapped = false;
      for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]; // Swap
          steps.push(arr.slice());
          swapped = true;
        }
      }
    } while (swapped);
  
    return steps;
  }
  
  // Merge Sort
  export function getMergeSortSteps(arr) {
    const steps = [arr.slice()];
  
    function mergeSortHelper(arr) {
      if (arr.length <= 1) return arr;
  
      const mid = Math.floor(arr.length / 2);
      const left = mergeSortHelper(arr.slice(0, mid));
      const right = mergeSortHelper(arr.slice(mid));
  
      const merged = merge(left, right);
      steps.push(merged.slice());
      return merged;
    }
  
    function merge(left, right) {
      let result = [];
      let i = 0, j = 0;
  
      while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
          result.push(left[i++]);
        } else {
          result.push(right[j++]);
        }
      }
      return result.concat(left.slice(i)).concat(right.slice(j));
    }
  
    mergeSortHelper(arr);
    return steps;
  }
  
  // Quick Sort
  export function getQuickSortSteps(arr) {
    const steps = [arr.slice()];
  
    function quickSortHelper(arr, low = 0, high = arr.length - 1) {
      if (low < high) {
        const pivotIndex = partition(arr, low, high);
        quickSortHelper(arr, low, pivotIndex - 1);
        quickSortHelper(arr, pivotIndex + 1, high);
      }
    }
  
    function partition(arr, low, high) {
      const pivot = arr[high];
      let i = low;
  
      for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
          [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap
          steps.push(arr.slice());
          i++;
        }
      }
      [arr[i], arr[high]] = [arr[high], arr[i]]; // Swap pivot
      steps.push(arr.slice());
      return i;
    }
  
    quickSortHelper(arr);
    return steps;
  }



  
  
  
