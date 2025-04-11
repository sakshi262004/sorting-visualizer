import React, { useState, useEffect } from 'react';
import './App.css';
import { motion } from "framer-motion";

const arraySize = 10;

// ===== SORTING ALGORITHMS =====
// [Your sorting algorithm functions here — unchanged]
const getBubbleSortSteps = (arr) => {
  const steps = [];
  const descriptions = [];
  let swapped;

  do {
    swapped = false;
    for (let i = 0; i < arr.length - 1; i++) {
      const beforeCompare = [...arr];
      descriptions.push(`Comparing ${arr[i]} and ${arr[i + 1]}`);
      steps.push({
        array: [...beforeCompare],
        comparing: [i, i + 1],
        description: descriptions[descriptions.length - 1],
      });

      if (arr[i] > arr[i + 1]) {
        const beforeSwap = [...arr];
        descriptions.push(`Swapping ${arr[i]} and ${arr[i + 1]}`);
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        steps.push({
          array: [...beforeSwap],
          swapping: [i, i + 1],
          description: descriptions[descriptions.length - 1],
        });
        steps.push({
          array: [...arr],
          swapped: [i, i + 1],
          description: `Swapped ${arr[i + 1]} and ${arr[i]}`,
        });
        swapped = true;
      }
    }
  } while (swapped);

  return { steps, descriptions };
};

const getMergeSortSteps = (arr) => {
  const steps = [];
  const descriptions = [];
  const fullArray = [...arr];

  function mergeSort(startIdx = 0, endIdx = arr.length - 1) {
    if (startIdx >= endIdx) return;

    const midIdx = Math.floor((startIdx + endIdx) / 2);
    descriptions.push(`Splitting from index ${startIdx} to ${endIdx}`);
    steps.push({
      array: [...fullArray],
      workingRange: [startIdx, endIdx],
      splitAt: midIdx,
      description: descriptions[descriptions.length - 1],
    });

    mergeSort(startIdx, midIdx);
    mergeSort(midIdx + 1, endIdx);
    merge(startIdx, midIdx, endIdx);
  }

  function merge(startIdx, midIdx, endIdx) {
    let left = startIdx;
    let right = midIdx + 1;
    const temp = [];

    while (left <= midIdx && right <= endIdx) {
      descriptions.push(`Comparing ${fullArray[left]} and ${fullArray[right]}`);
      steps.push({
        array: [...fullArray],
        comparing: [left, right],
        workingRange: [startIdx, endIdx],
        description: descriptions[descriptions.length - 1],
      });

      if (fullArray[left] <= fullArray[right]) {
        temp.push(fullArray[left++]);
      } else {
        temp.push(fullArray[right++]);
      }
    }

    while (left <= midIdx) temp.push(fullArray[left++]);
    while (right <= endIdx) temp.push(fullArray[right++]);

    for (let i = 0; i < temp.length; i++) {
      fullArray[startIdx + i] = temp[i];
    }

    descriptions.push(`Placing merged values from index ${startIdx} to ${endIdx}`);
    steps.push({
      array: [...fullArray],
      workingRange: [startIdx, endIdx],
      merging: Array.from({ length: endIdx - startIdx + 1 }, (_, i) => startIdx + i),
      description: descriptions[descriptions.length - 1],
    });
  }

  mergeSort();
  return { steps, descriptions };
};

const getQuickSortSteps = (arr) => {
  const steps = [];
  const descriptions = [];
  const fullArray = [...arr];

  function quickSort(low = 0, high = arr.length - 1) {
    if (low < high) {
      const pivotIndex = partition(low, high);
      quickSort(low, pivotIndex - 1);
      quickSort(pivotIndex + 1, high);
    }
  }

  function partition(low, high) {
    const pivotValue = fullArray[high];
    let i = low;

    descriptions.push(`Selecting pivot: ${pivotValue}`);
    steps.push({
      array: [...fullArray],
      pivot: high,
      workingRange: [low, high],
      description: descriptions[descriptions.length - 1],
    });

    for (let j = low; j < high; j++) {
      descriptions.push(`Comparing ${fullArray[j]} with pivot ${pivotValue}`);
      steps.push({
        array: [...fullArray],
        comparing: [j, high],
        workingRange: [low, high],
        description: descriptions[descriptions.length - 1],
      });

      if (fullArray[j] < pivotValue) {
        if (i !== j) {
          descriptions.push(`Swapping ${fullArray[i]} and ${fullArray[j]}`);
          [fullArray[i], fullArray[j]] = [fullArray[j], fullArray[i]];
          steps.push({
            array: [...fullArray],
            swapping: [i, j],
            workingRange: [low, high],
            description: descriptions[descriptions.length - 1],
          });
        }
        i++;
      }
    }

    if (i !== high) {
      descriptions.push(`Moving pivot to final position at index ${i}`);
      [fullArray[i], fullArray[high]] = [fullArray[high], fullArray[i]];
      steps.push({
        array: [...fullArray],
        swapping: [i, high],
        workingRange: [low, high],
        description: descriptions[descriptions.length - 1],
      });
    }

    return i;
  }

  quickSort();
  return { steps, descriptions };
};

function App() {
  const generateRandomArray = (size) =>
    Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
  
  const [array, setArray] = useState(generateRandomArray(arraySize));
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSorting, setIsSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [sortingMessage, setSortingMessage] = useState('');
  const [algorithm, setAlgorithm] = useState('Bubble Sort');
  const [currentAction, setCurrentAction] = useState({});
  const [descriptions, setDescriptions] = useState([]);
  const [isAutoplaying, setIsAutoplaying] = useState(false);

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  useEffect(() => {
    if (isSorted) {
      setSortingMessage('✅ Sorting Complete!');
    }
  }, [isSorted]);

  const handleStart = () => {
    let result;
    if (algorithm === 'Bubble Sort') result = getBubbleSortSteps([...array]);
    else if (algorithm === 'Merge Sort') result = getMergeSortSteps([...array]);
    else if (algorithm === 'Quick Sort') result = getQuickSortSteps([...array]);

    setSteps(result.steps);
    setDescriptions(result.descriptions);
    setCurrentStep(0);
    setIsSorting(true);
    setIsSorted(false);
    setSortingMessage(`${algorithm} started. Click "Next Step" to proceed.`);
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setArray(steps[currentStep].array);
      setCurrentAction({
        comparing: steps[currentStep].comparing,
        swapping: steps[currentStep].swapping,
        pivot: steps[currentStep].pivot,
        workingRange: steps[currentStep].workingRange,
        splitAt: steps[currentStep].splitAt,
        merging: steps[currentStep].merging,
      });
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsSorting(false);
      setIsSorted(true);
      setCurrentAction({});
    }
  };

  const handleAutoplay = async () => {
    if (isAutoplaying || isSorted || !isSorting) return;

    setIsAutoplaying(true);
    setSortingMessage(`Autoplaying ${algorithm}...`);

    for (let i = currentStep; i < steps.length; i++) {
      setArray(steps[i].array);
      setCurrentAction({
        comparing: steps[i].comparing,
        swapping: steps[i].swapping,
        pivot: steps[i].pivot,
        workingRange: steps[i].workingRange,
        splitAt: steps[i].splitAt,
        merging: steps[i].merging,
      });
      setCurrentStep(i + 1);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    setIsAutoplaying(false);
    setIsSorting(false);
    setIsSorted(true);
    setSortingMessage('✅ Autoplay Complete!');
    setCurrentAction({});
  };

  const shuffleArray = () => {
    const newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100) + 5);
    setArray(newArray);
    setSteps([]);
    setCurrentStep(0);
    setIsSorting(false);
    setIsSorted(false);
  };

  const handleReset = () => {
    setArray(generateRandomArray(arraySize));
    setSteps([]);
    setCurrentStep(0);
    setIsSorting(false);
    setIsSorted(false);
    setSortingMessage('');
    setCurrentAction({});
    setDescriptions([]);
  };

  return (
    <div className="app">
      <h1>Sorting Visualizer</h1>
      <div className="controls">
        <select onChange={(e) => setAlgorithm(e.target.value)} value={algorithm}>
          <option>Bubble Sort</option>
          <option>Merge Sort</option>
          <option>Quick Sort</option>
        </select>
        <button onClick={handleStart}>Start</button>
        {isSorting && !isSorted && (
          <>
            <button onClick={handleNext}>Next Step</button>
            <button onClick={handleAutoplay} disabled={isAutoplaying}>
              Autoplay
            </button>
          </>
        )}
        <button onClick={handleReset}>Reset</button>
        <button onClick={shuffleArray}>Shuffle</button>
        <button onClick={() => setDarkMode(prev => !prev)}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <div className="status">
        <p>{sortingMessage}</p>
        {steps[currentStep - 1]?.description && (
          <p>➡️ {steps[currentStep - 1].description}</p>
        )}
      </div>

      <div className="visualizer-container">
        <div className="visualizer">
          {array.map((val, idx) => {
            const isComparing = currentAction.comparing?.includes(idx);
            const isSwapping = currentAction.swapping?.includes(idx);
            const isPivot = currentAction.pivot === idx;
            const isInWorkingRange = currentAction.workingRange &&
              idx >= currentAction.workingRange[0] &&
              idx <= currentAction.workingRange[1];
            const isSplit = currentAction.splitAt === idx;
            const isMerging = currentAction.merging?.includes(idx);

            return (
              <React.Fragment key={idx}>
                {isSplit && <div className="split-line"></div>}
                <div className="bar-container">
                  <motion.div
                    layout
                    className={`bar 
                      ${isComparing ? 'comparing' : ''} 
                      ${isSwapping ? 'swapping' : ''}
                      ${isPivot ? 'pivot' : ''}
                      ${isInWorkingRange ? 'working' : ''}
                      ${isMerging ? 'merging' : ''}`}
                    style={{
                      height: `${val * 4}px`,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {val}
                  </motion.div>
                  {isComparing && (
                    <div className={`arrow ${currentAction.comparing[0] === idx ? 'left' : 'right'}`} />
                  )}
                  {isPivot && <div className="pivot-marker">Pivot</div>}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
