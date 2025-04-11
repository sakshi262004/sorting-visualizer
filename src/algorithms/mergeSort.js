export function getMergeSortSteps(arr) {
    const steps = [];
    const aux = [...arr];
  
    function mergeSort(start, end) {
      if (start >= end) return;
      const mid = Math.floor((start + end) / 2);
      mergeSort(start, mid);
      mergeSort(mid + 1, end);
      merge(start, mid, end);
    }
  
    function merge(start, mid, end) {
      const left = aux.slice(start, mid + 1);
      const right = aux.slice(mid + 1, end + 1);
  
      let i = 0, j = 0, k = start;
  
      while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
          aux[k++] = left[i++];
        } else {
          aux[k++] = right[j++];
        }
        steps.push([...aux]);
      }
  
      while (i < left.length) {
        aux[k++] = left[i++];
        steps.push([...aux]);
      }
  
      while (j < right.length) {
        aux[k++] = right[j++];
        steps.push([...aux]);
      }
    }
  
    mergeSort(0, aux.length - 1);
    return steps;
  }
  