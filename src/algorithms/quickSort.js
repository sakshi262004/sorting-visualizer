export function getQuickSortSteps(arr) {
    const steps = [];
    const temp = [...arr];
  
    function quickSort(start, end) {
      if (start >= end) return;
  
      const pivotIdx = partition(start, end);
      quickSort(start, pivotIdx - 1);
      quickSort(pivotIdx + 1, end);
    }
  
    function partition(start, end) {
      const pivot = temp[end];
      let i = start;
  
      for (let j = start; j < end; j++) {
        if (temp[j] < pivot) {
          [temp[i], temp[j]] = [temp[j], temp[i]];
          steps.push([...temp]);
          i++;
        }
      }
      [temp[i], temp[end]] = [temp[end], temp[i]];
      steps.push([...temp]);
      return i;
    }
  
    quickSort(0, temp.length - 1);
    return steps;
  }
  
  