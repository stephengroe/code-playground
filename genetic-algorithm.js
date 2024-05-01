// Genetic algorithm!

// Create initial children
function createInitialChild(count) {
  let child = [];
  for (let i=0; i<count; i++) {
    const random = Math.round(Math.random());
    child.push(random);
  }

  return child;
}

// Evalulate generations
function scoreChild(child, goal) {
  const result = child.reduce((a, b) => a + b);

  return (result / goal);
}

// Combine parents
function crossParents(parent1, parent2) {
  let child = [];

  for (let i=0; i<parent1.length; i++) {
    const random = Math.round(Math.random());

    if (random) {
      child.push(parent1[i]);
    } else {
      child.push(parent2[i]);
    }
  }

  return child;
}

// Generate random mutation
function mutateChild(child) {
  const mutatedChild = child.slice();
  const probability = child.length;

  for (let i=0; i<child.length; i++) {
    const random = Math.round(Math.random() * probability);

    if (random === probability) {
      mutatedChild[i] = Number(!mutatedChild[i]);
    }
  }

  return mutatedChild;
}

// Putting it all together
function geneticAlgorithm(initialChildren, goal, length) {
  let currentGeneration = [];
  let bestResult = [];
  let bestScore = 0;
  let generationCount = 0;
  let improvement = false; // So we don't print generations that don't improve

  // Loop until we find the answer
  while (bestScore < 1) {
    // Loop for each generation
    for (let i=0; i<=initialChildren; i++) {
      let currentChild = [];

      // If we're on the first generation, build from scratch
      if (generationCount === 0) {
        currentChild = createInitialChild(length);
      } else {
        // Otherwise cross parents and add mutation
        currentChild = crossParents(bestResult, currentGeneration[i]);
        currentChild = mutateChild(currentChild);
      }

      // Rank child
      const currentScore = scoreChild(currentChild, goal);
      if (currentScore > bestScore) {
        improvement = true;
        bestScore = currentScore;
        bestResult = currentChild;
      }

      currentGeneration[i] = currentChild;
    }
    
    // Print information about this generation
    generationCount += 1;

    if (improvement) {
      improvement = false;
      console.log(`Generation #${generationCount}: Best score of ${bestScore}`);
    }
  }
}

// Let's run it!
const children = 10;
const goal = 100;
const length = 100;

geneticAlgorithm(children, goal, length);



