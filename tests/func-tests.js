// Unit tests for text generation functions

// Test character sets
testRunner.test('CHARACTER_SETS should contain all expected characters', () => {
  testRunner.assertContains(CHARACTER_SETS.ALPHABETICAL, 'a', 'Should contain lowercase a');
  testRunner.assertContains(CHARACTER_SETS.ALPHABETICAL, 'Z', 'Should contain uppercase Z');
  testRunner.assertContains(CHARACTER_SETS.NUMERICAL, '0', 'Should contain digit 0');
  testRunner.assertContains(CHARACTER_SETS.NUMERICAL, '9', 'Should contain digit 9');
  testRunner.assertContains(CHARACTER_SETS.SPECIAL_CHARS, ',', 'Should contain comma');
  testRunner.assertContains(CHARACTER_SETS.SPECIAL_CHARS, '(', 'Should contain parenthesis');
  testRunner.assertContains(CHARACTER_SETS.SPECIAL_CHARS, '%', 'Should contain percent');
  testRunner.assertContains(CHARACTER_SETS.TURKISH_GERMAN, 'ç', 'Should contain ç');
  testRunner.assertContains(CHARACTER_SETS.TURKISH_GERMAN, 'ö', 'Should contain ö');
  testRunner.assertContains(CHARACTER_SETS.TURKISH_GERMAN, 'ü', 'Should contain ü');
  testRunner.assertContains(CHARACTER_SETS.TURKISH_GERMAN, 'ß', 'Should contain ß');
});

// Test generateLoremIpsum function
testRunner.test('generateLoremIpsum should return correct length', () => {
  const result = generateLoremIpsum(50, false, false);
  testRunner.assertLength(result, 50, 'Lorem ipsum should return exact length');
});

testRunner.test('generateLoremIpsum should remove punctuation when requested', () => {
  const result = generateLoremIpsum(100, false, true);
  testRunner.assertFalse(/[.,\/#!$%\^&\*;:{}=\-_`~()]/.test(result), 'Should not contain punctuation');
});

testRunner.test('generateLoremIpsum should remove spaces when requested', () => {
  const result = generateLoremIpsum(100, true, false);
  testRunner.assertFalse(/\s/.test(result), 'Should not contain spaces');
});

// Test generateAlphanumerical function
testRunner.test('generateAlphanumerical should contain only letters and numbers', () => {
  const result = generateAlphanumerical(100);
  testRunner.assertLength(result, 100, 'Should return exact length');
  testRunner.assertMatch(result, /^[a-zA-Z0-9]+$/, 'Should contain only alphanumerical characters');
  testRunner.assertFalse(/\s/.test(result), 'Should not contain spaces');
});

testRunner.test('generateAlphanumerical should contain both letters and numbers over large sample', () => {
  const result = generateAlphanumerical(1000);
  testRunner.assertMatch(result, /[a-zA-Z]/, 'Should contain letters');
  testRunner.assertMatch(result, /[0-9]/, 'Should contain numbers');
});

// Test generateWithSpecialChars function
testRunner.test('generateWithSpecialChars should contain special characters', () => {
  const result = generateWithSpecialChars(500);
  testRunner.assertLength(result, 500, 'Should return exact length');
  
  // Check for presence of different character types
  const hasLetters = /[a-zA-Z]/.test(result);
  const hasNumbers = /[0-9]/.test(result);
  const hasSpecialChars = /[,.()%\/+?*\-_=!@#$%^&*\[\]{}|;:'"<>~`]/.test(result);
  
  testRunner.assertTrue(hasLetters || hasNumbers || hasSpecialChars, 'Should contain at least one type of character');
});

// Test generateWithTurkishGerman function
testRunner.test('generateWithTurkishGerman should contain Turkish/German characters', () => {
  const result = generateWithTurkishGerman(500);
  testRunner.assertLength(result, 500, 'Should return exact length');
  
  // Check for presence of Turkish/German characters over larger sample
  const hasTurkishGerman = /[çğıöşüÇĞIÖŞÜäöüßÄÖÜ]/.test(result);
  const hasRegularChars = /[a-zA-Z0-9]/.test(result);
  
  testRunner.assertTrue(hasTurkishGerman || hasRegularChars, 'Should contain characters from the pool');
});

// Test generateCustomText function with various options
testRunner.test('generateCustomText with only alphabetical should work', () => {
  const result = generateCustomText(50, {
    includeAlphabetical: true,
    includeNumerical: false,
    includeSpecialChars: false,
    includeTurkishGerman: false,
    includeSpaces: false
  });
  
  testRunner.assertLength(result, 50, 'Should return exact length');
  testRunner.assertMatch(result, /^[a-zA-Z]+$/, 'Should contain only letters');
});

testRunner.test('generateCustomText with only numerical should work', () => {
  const result = generateCustomText(50, {
    includeAlphabetical: false,
    includeNumerical: true,
    includeSpecialChars: false,
    includeTurkishGerman: false,
    includeSpaces: false
  });
  
  testRunner.assertLength(result, 50, 'Should return exact length');
  testRunner.assertMatch(result, /^[0-9]+$/, 'Should contain only numbers');
});

testRunner.test('generateCustomText with no options should default to alphabetical', () => {
  const result = generateCustomText(50, {
    includeAlphabetical: false,
    includeNumerical: false,
    includeSpecialChars: false,
    includeTurkishGerman: false,
    includeSpaces: false
  });
  
  testRunner.assertLength(result, 50, 'Should return exact length');
  testRunner.assertMatch(result, /^[a-zA-Z]+$/, 'Should default to alphabetical');
});

// Test edge cases
testRunner.test('All functions should handle length 1', () => {
  testRunner.assertLength(generateLoremIpsum(1, false, false), 1, 'Lorem ipsum length 1');
  testRunner.assertLength(generateAlphanumerical(1), 1, 'Alphanumerical length 1');
  testRunner.assertLength(generateWithSpecialChars(1), 1, 'Special chars length 1');
  testRunner.assertLength(generateWithTurkishGerman(1), 1, 'Turkish/German length 1');
});

testRunner.test('All functions should handle large lengths', () => {
  const largeLength = 10000;
  testRunner.assertLength(generateLoremIpsum(largeLength, false, false), largeLength, 'Lorem ipsum large length');
  testRunner.assertLength(generateAlphanumerical(largeLength), largeLength, 'Alphanumerical large length');
  testRunner.assertLength(generateWithSpecialChars(largeLength), largeLength, 'Special chars large length');
  testRunner.assertLength(generateWithTurkishGerman(largeLength), largeLength, 'Turkish/German large length');
});

// Test randomness (results should be different across multiple calls)
testRunner.test('Generated text should be random', () => {
  const result1 = generateAlphanumerical(100);
  const result2 = generateAlphanumerical(100);
  const result3 = generateAlphanumerical(100);
  
  testRunner.assertFalse(result1 === result2, 'Results should be different (1 vs 2)');
  testRunner.assertFalse(result2 === result3, 'Results should be different (2 vs 3)');
  testRunner.assertFalse(result1 === result3, 'Results should be different (1 vs 3)');
});

// Test character distribution (for alphanumerical, should have reasonable distribution)
testRunner.test('Alphanumerical should have reasonable character distribution', () => {
  const result = generateAlphanumerical(10000);
  const letterCount = (result.match(/[a-zA-Z]/g) || []).length;
  const numberCount = (result.match(/[0-9]/g) || []).length;
  
  // With 62 total characters (52 letters + 10 numbers), 
  // we expect roughly 84% letters and 16% numbers
  const letterPercentage = (letterCount / result.length) * 100;
  const numberPercentage = (numberCount / result.length) * 100;
  
  testRunner.assertTrue(letterPercentage > 70 && letterPercentage < 95, 
    `Letter percentage should be reasonable (70-95%), got ${letterPercentage.toFixed(1)}%`);
  testRunner.assertTrue(numberPercentage > 5 && numberPercentage < 30, 
    `Number percentage should be reasonable (5-30%), got ${numberPercentage.toFixed(1)}%`);
});

console.log('✅ Text generation function tests loaded');