export default function testFunction(func, inputs, answers, iterations = 1000) {
  console.log(`Starting tests...`);
  const start = Date.now();

  for (let i=0; i<inputs.length; i++) {
    for (let j=0; j<iterations; j++) {
      func(inputs[i]);
    }

    const result = func(inputs[i]);

    if (result === answers[i]) {
      console.log(`\x1b[32mPASS\x1b[0m: ${inputs[i]} was ${result}`);
    } else {
      console.log(`\x1b[31mFAIL\x1b[0m: ${inputs[i]} was ${result} instead of ${answers[i]}`);
    }
  }

  const end = Date.now();
  console.log(`Tests performed in ${end - start}ms`);
}
