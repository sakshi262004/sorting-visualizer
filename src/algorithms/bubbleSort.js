export function getBubbleSortSteps(arr) {
    const steps = [];
    const temp = [...arr];
  
    for (let i = 0; i < temp.length - 1; i++) {
      for (let j = 0; j < temp.length - i - 1; j++) {
        if (temp[j] > temp[j + 1]) {
          [temp[j], temp[j + 1]] = [temp[j + 1], temp[j]];
          steps.push([...temp]);
        }
      }
    }
  
    return steps;
  }
  
  