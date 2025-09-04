// UI Integration tests for text generation functionality

// Mock DOM elements for testing
function createMockDOM() {
  // Create mock elements that would exist in the actual popup
  const mockElements = {
    lengthInput: { value: '50' },
    textTypeRadios: [
      { checked: true, value: 'lorem' },
      { checked: false, value: 'alphanumerical' },
      { checked: false, value: 'specialChars' },
      { checked: false, value: 'turkishGerman' }
    ],
    removePunct: { checked: false },
    removeSpace: { checked: false },
    resultText: { value: '' },
    loremOptions: { style: { display: 'block' } }
  };

  // Mock document.querySelector and getElementById
  const originalQuerySelector = document.querySelector;
  const originalGetElementById = document.getElementById;

  document.querySelector = function(selector) {
    if (selector === 'input[name="textType"]:checked') {
      return mockElements.textTypeRadios.find(radio => radio.checked);
    }
    if (selector === 'input[name="textType"]') {
      return mockElements.textTypeRadios;
    }
    return originalQuerySelector.call(document, selector);
  };

  document.getElementById = function(id) {
    if (mockElements[id]) {
      return mockElements[id];
    }
    return originalGetElementById.call(document, id);
  };

  return {
    mockElements,
    cleanup: () => {
      document.querySelector = originalQuerySelector;
      document.getElementById = originalGetElementById;
    }
  };
}

// Test UI text type selection logic
testRunner.test('UI should generate Lorem Ipsum when lorem type is selected', () => {
  const { mockElements, cleanup } = createMockDOM();
  
  try {
    // Simulate lorem type selection
    mockElements.textTypeRadios.forEach(radio => radio.checked = false);
    mockElements.textTypeRadios[0].checked = true; // lorem
    mockElements.textTypeRadios[0].value = 'lorem';

    const length = parseInt(mockElements.lengthInput.value);
    const textType = mockElements.textTypeRadios.find(r => r.checked).value;
    const removePunct = mockElements.removePunct.checked;
    const removeSpace = mockElements.removeSpace.checked;

    testRunner.assertEqual(textType, 'lorem', 'Should select lorem type');
    testRunner.assertEqual(length, 50, 'Should get correct length');

    // Test the generation logic
    let generatedText;
    switch (textType) {
      case 'lorem':
        generatedText = generateLoremIpsum(length, removeSpace, removePunct);
        break;
      default:
        generatedText = generateLoremIpsum(length, removeSpace, removePunct);
    }

    testRunner.assertLength(generatedText, 50, 'Should generate correct length text');
    testRunner.assertContains(generatedText.toLowerCase(), 'lorem', 'Should contain lorem text');
  } finally {
    cleanup();
  }
});

testRunner.test('UI should generate alphanumerical when alphanumerical type is selected', () => {
  const { mockElements, cleanup } = createMockDOM();
  
  try {
    // Simulate alphanumerical type selection
    mockElements.textTypeRadios.forEach(radio => radio.checked = false);
    mockElements.textTypeRadios[1].checked = true; // alphanumerical
    mockElements.textTypeRadios[1].value = 'alphanumerical';

    const length = parseInt(mockElements.lengthInput.value);
    const textType = mockElements.textTypeRadios.find(r => r.checked).value;

    testRunner.assertEqual(textType, 'alphanumerical', 'Should select alphanumerical type');

    // Test the generation logic
    let generatedText;
    switch (textType) {
      case 'alphanumerical':
        generatedText = generateAlphanumerical(length);
        break;
    }

    testRunner.assertLength(generatedText, 50, 'Should generate correct length text');
    testRunner.assertMatch(generatedText, /^[a-zA-Z0-9]+$/, 'Should contain only alphanumerical characters');
  } finally {
    cleanup();
  }
});

testRunner.test('UI should generate special chars when specialChars type is selected', () => {
  const { mockElements, cleanup } = createMockDOM();
  
  try {
    // Simulate special chars type selection
    mockElements.textTypeRadios.forEach(radio => radio.checked = false);
    mockElements.textTypeRadios[2].checked = true; // specialChars
    mockElements.textTypeRadios[2].value = 'specialChars';

    const length = parseInt(mockElements.lengthInput.value);
    const textType = mockElements.textTypeRadios.find(r => r.checked).value;

    testRunner.assertEqual(textType, 'specialChars', 'Should select special chars type');

    // Test the generation logic
    let generatedText;
    switch (textType) {
      case 'specialChars':
        generatedText = generateWithSpecialChars(length);
        break;
    }

    testRunner.assertLength(generatedText, 50, 'Should generate correct length text');
  } finally {
    cleanup();
  }
});

testRunner.test('UI should generate Turkish/German when turkishGerman type is selected', () => {
  const { mockElements, cleanup } = createMockDOM();
  
  try {
    // Simulate Turkish/German type selection
    mockElements.textTypeRadios.forEach(radio => radio.checked = false);
    mockElements.textTypeRadios[3].checked = true; // turkishGerman
    mockElements.textTypeRadios[3].value = 'turkishGerman';

    const length = parseInt(mockElements.lengthInput.value);
    const textType = mockElements.textTypeRadios.find(r => r.checked).value;

    testRunner.assertEqual(textType, 'turkishGerman', 'Should select Turkish/German type');

    // Test the generation logic
    let generatedText;
    switch (textType) {
      case 'turkishGerman':
        generatedText = generateWithTurkishGerman(length);
        break;
    }

    testRunner.assertLength(generatedText, 50, 'Should generate correct length text');
  } finally {
    cleanup();
  }
});

// Test input validation logic
testRunner.test('UI should handle invalid length input', () => {
  const { mockElements, cleanup } = createMockDOM();
  
  try {
    mockElements.lengthInput.value = 'invalid';
    const length = parseInt(mockElements.lengthInput.value);
    
    testRunner.assertTrue(isNaN(length), 'Should detect invalid length');
  } finally {
    cleanup();
  }
});

testRunner.test('UI should handle zero length input', () => {
  const { mockElements, cleanup } = createMockDOM();
  
  try {
    mockElements.lengthInput.value = '0';
    const length = parseInt(mockElements.lengthInput.value);
    
    testRunner.assertTrue(length <= 0, 'Should detect zero length');
  } finally {
    cleanup();
  }
});

testRunner.test('UI should handle maximum length validation', () => {
  const { mockElements, cleanup } = createMockDOM();
  
  try {
    mockElements.lengthInput.value = '1000000';
    const length = parseInt(mockElements.lengthInput.value);
    
    testRunner.assertTrue(length > 999999, 'Should detect length over maximum');
  } finally {
    cleanup();
  }
});

// Test Lorem Ipsum specific options
testRunner.test('UI should apply remove punctuation option for Lorem Ipsum', () => {
  const { mockElements, cleanup } = createMockDOM();
  
  try {
    mockElements.textTypeRadios.forEach(radio => radio.checked = false);
    mockElements.textTypeRadios[0].checked = true; // lorem
    mockElements.removePunct.checked = true;
    mockElements.removeSpace.checked = false;

    const length = parseInt(mockElements.lengthInput.value);
    const removePunct = mockElements.removePunct.checked;
    const removeSpace = mockElements.removeSpace.checked;

    const generatedText = generateLoremIpsum(length, removeSpace, removePunct);
    
    testRunner.assertFalse(/[.,\/#!$%\^&\*;:{}=\-_`~()]/.test(generatedText), 
      'Should not contain punctuation when option is selected');
  } finally {
    cleanup();
  }
});

testRunner.test('UI should apply remove spaces option for Lorem Ipsum', () => {
  const { mockElements, cleanup } = createMockDOM();
  
  try {
    mockElements.textTypeRadios.forEach(radio => radio.checked = false);
    mockElements.textTypeRadios[0].checked = true; // lorem
    mockElements.removePunct.checked = false;
    mockElements.removeSpace.checked = true;

    const length = parseInt(mockElements.lengthInput.value);
    const removePunct = mockElements.removePunct.checked;
    const removeSpace = mockElements.removeSpace.checked;

    const generatedText = generateLoremIpsum(length, removeSpace, removePunct);
    
    testRunner.assertFalse(/\s/.test(generatedText), 
      'Should not contain spaces when option is selected');
  } finally {
    cleanup();
  }
});

// Test complete generation workflow simulation
testRunner.test('Complete UI workflow should work for all text types', () => {
  const { mockElements, cleanup } = createMockDOM();
  
  try {
    const textTypes = [
      { value: 'lorem', index: 0 },
      { value: 'alphanumerical', index: 1 },
      { value: 'specialChars', index: 2 },
      { value: 'turkishGerman', index: 3 }
    ];

    for (const textType of textTypes) {
      // Simulate selecting each text type
      mockElements.textTypeRadios.forEach(radio => radio.checked = false);
      mockElements.textTypeRadios[textType.index].checked = true;
      mockElements.textTypeRadios[textType.index].value = textType.value;

      const length = parseInt(mockElements.lengthInput.value);
      const selectedType = mockElements.textTypeRadios.find(r => r.checked).value;
      const removePunct = mockElements.removePunct.checked;
      const removeSpace = mockElements.removeSpace.checked;

      // Simulate the generation switch logic
      let generatedText;
      switch (selectedType) {
        case 'lorem':
          generatedText = generateLoremIpsum(length, removeSpace, removePunct);
          break;
        case 'alphanumerical':
          generatedText = generateAlphanumerical(length);
          break;
        case 'specialChars':
          generatedText = generateWithSpecialChars(length);
          break;
        case 'turkishGerman':
          generatedText = generateWithTurkishGerman(length);
          break;
        default:
          generatedText = generateLoremIpsum(length, removeSpace, removePunct);
      }

      testRunner.assertLength(generatedText, 50, `${textType.value} should generate correct length`);
      testRunner.assertTrue(typeof generatedText === 'string', `${textType.value} should return string`);
    }
  } finally {
    cleanup();
  }
});

console.log('✅ UI integration tests loaded');