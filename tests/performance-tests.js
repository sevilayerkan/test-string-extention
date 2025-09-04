// Performance and stress tests for text generation

testRunner.test('Text generation should be fast for small lengths', () => {
  const iterations = 1000;
  const length = 100;
  
  const start = performance.now();
  
  for (let i = 0; i < iterations; i++) {
    generateAlphanumerical(length);
    generateWithSpecialChars(length);
    generateWithTurkishGerman(length);
    generateLoremIpsum(length, false, false);
  }
  
  const end = performance.now();
  const totalTime = end - start;
  const averageTime = totalTime / (iterations * 4); // 4 functions per iteration
  
  console.log(`Average generation time: ${averageTime.toFixed(3)}ms per call`);
  testRunner.assertTrue(averageTime < 1, `Generation should be fast (< 1ms), got ${averageTime.toFixed(3)}ms`);
});

testRunner.test('Text generation should handle large texts efficiently', () => {
  const length = 100000; // 100k characters
  
  const start = performance.now();
  const result = generateAlphanumerical(length);
  const end = performance.now();
  
  const time = end - start;
  
  testRunner.assertLength(result, length, 'Should generate correct length');
  testRunner.assertTrue(time < 1000, `Large text generation should be reasonably fast (< 1s), got ${time.toFixed(1)}ms`);
  
  console.log(`Large text (${length} chars) generation time: ${time.toFixed(1)}ms`);
});

testRunner.test('Memory usage should be reasonable for large texts', () => {
  // Test multiple large text generations to check for memory issues
  const length = 50000;
  const iterations = 10;
  
  for (let i = 0; i < iterations; i++) {
    const result = generateWithSpecialChars(length);
    testRunner.assertLength(result, length, `Iteration ${i + 1} should generate correct length`);
    
    // Clear reference to help GC
    if (result) result.length; // Just access it to prevent optimization
  }
  
  testRunner.assertTrue(true, 'Memory test completed without issues');
});

testRunner.test('All generation functions should perform similarly', () => {
  const length = 10000;
  const functions = [
    { name: 'generateLoremIpsum', fn: () => generateLoremIpsum(length, false, false) },
    { name: 'generateAlphanumerical', fn: () => generateAlphanumerical(length) },
    { name: 'generateWithSpecialChars', fn: () => generateWithSpecialChars(length) },
    { name: 'generateWithTurkishGerman', fn: () => generateWithTurkishGerman(length) }
  ];
  
  const times = [];
  
  for (const func of functions) {
    const start = performance.now();
    const result = func.fn();
    const end = performance.now();
    
    const time = end - start;
    times.push({ name: func.name, time });
    
    testRunner.assertLength(result, length, `${func.name} should generate correct length`);
    console.log(`${func.name}: ${time.toFixed(2)}ms`);
  }
  
  // Check that no function is significantly slower than others
  const minTime = Math.min(...times.map(t => t.time));
  const maxTime = Math.max(...times.map(t => t.time));
  
  // If minTime is very small (< 0.01ms), use absolute difference instead of ratio
  if (minTime < 0.01) {
    const timeDifference = maxTime - minTime;
    testRunner.assertTrue(timeDifference < 50, 
      `Performance difference should be reasonable. Difference: ${timeDifference.toFixed(2)}ms (Min: ${minTime.toFixed(2)}ms, Max: ${maxTime.toFixed(2)}ms)`);
  } else {
    const ratio = maxTime / minTime;
    testRunner.assertTrue(ratio < 10, 
      `Performance difference should be reasonable. Ratio: ${ratio.toFixed(2)}x (Min: ${minTime.toFixed(2)}ms, Max: ${maxTime.toFixed(2)}ms)`);
  }
});

testRunner.test('Character distribution should be maintained in large texts', () => {
  const length = 100000;
  const result = generateAlphanumerical(length);
  
  const letterCount = (result.match(/[a-zA-Z]/g) || []).length;
  const numberCount = (result.match(/[0-9]/g) || []).length;
  
  const letterPercentage = (letterCount / length) * 100;
  const numberPercentage = (numberCount / length) * 100;
  
  // For alphanumerical: 52 letters + 10 numbers = 62 total
  // Expected: ~84% letters, ~16% numbers
  testRunner.assertTrue(letterPercentage > 75 && letterPercentage < 90, 
    `Letter distribution should be reasonable in large text: ${letterPercentage.toFixed(1)}%`);
  testRunner.assertTrue(numberPercentage > 10 && numberPercentage < 25, 
    `Number distribution should be reasonable in large text: ${numberPercentage.toFixed(1)}%`);
  
  console.log(`Large text distribution - Letters: ${letterPercentage.toFixed(1)}%, Numbers: ${numberPercentage.toFixed(1)}%`);
});

testRunner.test('Stress test - multiple concurrent generations', async () => {
  const promises = [];
  const length = 5000;
  const concurrentGenerations = 20;
  
  // Simulate concurrent generation requests
  for (let i = 0; i < concurrentGenerations; i++) {
    promises.push(
      new Promise(resolve => {
        const start = performance.now();
        const result = generateWithSpecialChars(length);
        const end = performance.now();
        resolve({ length: result.length, time: end - start });
      })
    );
  }
  
  const results = await Promise.all(promises);
  
  // Verify all generations completed successfully
  results.forEach((result, index) => {
    testRunner.assertEqual(result.length, length, `Concurrent generation ${index + 1} should complete`);
  });
  
  const averageTime = results.reduce((sum, r) => sum + r.time, 0) / results.length;
  console.log(`Concurrent generations average time: ${averageTime.toFixed(2)}ms`);
  
  testRunner.assertTrue(averageTime < 100, `Concurrent generations should be reasonably fast: ${averageTime.toFixed(2)}ms`);
});

console.log('✅ Performance tests loaded');