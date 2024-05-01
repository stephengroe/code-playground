/*
Given a integer M,
derive a new smallest integer N > M such that the
sum of digits of N are twice(double) the sum of digits of M.
Examples;
Input M = 123, output N=129 => 1+2+9 =12
M = 1+2+3 = 6
find integer > 123+6
*/

import testFunction from './testFunction.js';

function findInteger1(number) {
  // Get result: sum of each digit, times two
  const array = number.toString().split('');
  const result = array.reduce((a, b) => Number(a) + Number(b)) * 2;
  let num = number;

  while (!sumEquals(num, result)) {
    num += 1;
  }

  return num;
}

function sumEquals(number, result) {
  const sum = number.toString().split('').reduce((a, b) => Number(a) + Number(b));
  return sum === result;
}

function findInteger2(number) {
  // Split number into array of numbers
  const numberArray = number.toString().split('').map(n => Number(n));
  // Get target (sum of numbers, doubled)
  const target = numberArray.reduce((a, b) => a + b) * 2;
  // Start iterating at the last digit (ones' place)
  let currentIndex = numberArray.length - 1;

  // Repeat this until the answer is right
  while (numberArray.reduce((a, b) => a + b) !== target) {
    // Increment the current digit until it hits nine
    if (numberArray[currentIndex] < 9) {
      numberArray[currentIndex] += 1;
    } else { // But if it's already nine...
      if (currentIndex > 0) {
        // Move to the next-largest digit place
        currentIndex -= 1;
      } else {
        // Unless we're at the beginning in which case we'll add a new digit
        numberArray.unshift(0);
      }
    }
  }

  // Convert our array back into a number to return
  return Number(numberArray.join(''));
}

function findInteger3(number) {
  const numberArray = number.toString().split('').map(n => Number(n));
  // This is how many total digits we'll need to add
  let toAdd = numberArray.reduce((a, b) => a + b);
  // This is our target sum
  const target = toAdd * 2;
  let currentIndex = numberArray.length - 1;

  // Run this loop until we succeed!
  while (numberArray.reduce((a, b) => a + b) !== target) {
    
    // This is how many digits we can add
    const maxSpace = 9 - numberArray[currentIndex];
    
    // If there's still more to go, max it to nine and move to the next digit
    if (toAdd > maxSpace) {
      numberArray[currentIndex] = 9;
      // Deduct what was added from what we need to add
      toAdd -= maxSpace;

      // We'll also need to move to the next digit place--
      // if we've gotten to the beginning, we'll need to add a new one
      if (currentIndex === 0) {
        numberArray.unshift(0);
      } else {
        currentIndex -= 1;
      }

      // Otherwise, just add the remainder and we're done!
    } else {
      numberArray[currentIndex] += toAdd;
    }
  }

  return Number(numberArray.join(''));
}

// The solution given to me by ChatGPT 3.5

function findInteger4(M) {
  function sumOfDigits(num) {
      return num.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  }

  let N = M + 1;
  let sumOfDigitsM = sumOfDigits(M);

  while (true) {
      let sumOfDigitsN = sumOfDigits(N);
      if (sumOfDigitsN === 2 * sumOfDigitsM) {
          return N;
      }
      N++;
  }
}

// I asked ChatGPT to give me a more efficient algorithm, this is it
function findInteger5(M) {
  function sumOfDigits(num) {
    let sum = 0;
    while (num > 0) {
        sum += num % 10;
        num = Math.floor(num / 10);
    }
    return sum;
}

const sumOfDigitsM = sumOfDigits(M);

// Find the smallest integer N such that the sum of digits of N is twice the sum of digits of M
let N = M + 1;
let sumOfDigitsN = sumOfDigits(N);
while (sumOfDigitsN < 2 * sumOfDigitsM) {
    N++;
    sumOfDigitsN = sumOfDigits(N); // Update the sum of digits of N in each iteration
}

return N;
}



// Tests
const inputs = [826, 9001, 90004, 120, 89, 101, 89232];
const answers = [5999, 9029, 90089, 123, 7999, 103, 399999];
console.log(`
Version #1:`)
testFunction(findInteger1, inputs, answers, 100);
console.log(` 
Version #2:`)
testFunction(findInteger2, inputs, answers, 10000);
console.log(`
Version #3:`)
testFunction(findInteger3, inputs, answers, 10000);
console.log(`
ChatGPT's first version:`)
testFunction(findInteger4, inputs, answers, 100);
console.log(`
ChatGPT's second version:`)
testFunction(findInteger5, inputs, answers, 100);
