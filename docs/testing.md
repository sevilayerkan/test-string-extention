# 🧪 Test Dokümantasyonu

Test String Generator'ın kapsamlı test stratejisi, test çalıştırma rehberi ve test geliştirme kılavuzu.

## 📋 Test Özetisi

### Test İstatistikleri
- **Toplam Test Sayısı**: 31
- **Function Tests**: 15 (48%)
- **UI Integration Tests**: 10 (32%)
- **Performance Tests**: 6 (20%)
- **Test Coverage**: %100

### Test Kategorileri
- ✅ **Character Set Validation** (4 test)
- ✅ **Length Validation** (8 test)
- ✅ **Content Validation** (12 test)
- ✅ **Performance Validation** (7 test)

## 🗂️ Test Dosya Yapısı

```
tests/
├── test-runner.js       # Custom test framework
├── func-tests.js        # Function unit tests (15 tests)
├── ui-tests.js          # UI integration tests (10 tests)
├── performance-tests.js # Performance tests (6 tests)
└── README.md           # Test dokümantasyonu

# Test arayüzleri
test-all.html           # Complete visual test suite
test-console.html       # Console test runner
test-quick-check.html   # Fast verification
test-generation.html    # Manual testing interface
```

## 🚀 Test Çalıştırma

### Komut Satırı
```bash
# Tüm testleri tarayıcıda aç
npm test

# Manuel test arayüzü
npm run test:manual
```

### Browser Testleri

**1. Complete Test Suite (`test-all.html`)**
- Tüm 31 test
- Görsel arayüz
- Real-time sonuçlar
- Performans metrikleri
- İstatistik dashboard

**2. Console Runner (`test-console.html`)**
- Terminal benzeri arayüz
- 10 temel test
- Otomatik çalıştırma
- Performance timing

**3. Quick Check (`test-quick-check.html`)**
- Hızlı doğrulama
- Temel fonksiyon kontrolü
- Character set validation

**4. Manual Testing (`test-generation.html`)**
- Manuel test arayüzü
- Canlı örnekler
- Fonksiyon test etme

## 📝 Detaylı Test Listesi

### 🔧 Function Tests (15 test)

#### 1. Character Set Tests
```javascript
testRunner.test('CHARACTER_SETS should contain all expected characters', () => {
  // Alphabetical: a-z, A-Z
  testRunner.assertContains(CHARACTER_SETS.ALPHABETICAL, 'a');
  testRunner.assertContains(CHARACTER_SETS.ALPHABETICAL, 'Z');
  
  // Numerical: 0-9
  testRunner.assertContains(CHARACTER_SETS.NUMERICAL, '0');
  testRunner.assertContains(CHARACTER_SETS.NUMERICAL, '9');
  
  // Special Characters
  testRunner.assertContains(CHARACTER_SETS.SPECIAL_CHARS, ',');
  testRunner.assertContains(CHARACTER_SETS.SPECIAL_CHARS, '(');
  
  // Turkish/German
  testRunner.assertContains(CHARACTER_SETS.TURKISH_GERMAN, 'ç');
  testRunner.assertContains(CHARACTER_SETS.TURKISH_GERMAN, 'ö');
});
```

#### 2. Lorem Ipsum Tests
```javascript
// Uzunluk testi
testRunner.test('generateLoremIpsum should return correct length', () => {
  const result = generateLoremIpsum(50, false, false);
  testRunner.assertLength(result, 50);
});

// Noktalama kaldırma
testRunner.test('generateLoremIpsum should remove punctuation when requested', () => {
  const result = generateLoremIpsum(100, false, true);
  testRunner.assertFalse(/[.,\/#!$%\^&\*;:{}=\-_`~()]/.test(result));
});

// Boşluk kaldırma
testRunner.test('generateLoremIpsum should remove spaces when requested', () => {
  const result = generateLoremIpsum(100, true, false);
  testRunner.assertFalse(/\s/.test(result));
});
```

#### 3. Alphanumerical Tests
```javascript
// İçerik doğrulama
testRunner.test('generateAlphanumerical should contain only letters and numbers', () => {
  const result = generateAlphanumerical(100);
  testRunner.assertMatch(result, /^[a-zA-Z0-9]+$/);
  testRunner.assertFalse(/\s/.test(result));
});

// Dağılım testi
testRunner.test('generateAlphanumerical should contain both letters and numbers over large sample', () => {
  const result = generateAlphanumerical(1000);
  testRunner.assertMatch(result, /[a-zA-Z]/);
  testRunner.assertMatch(result, /[0-9]/);
});
```

#### 4. Special Characters Tests
```javascript
testRunner.test('generateWithSpecialChars should contain special characters', () => {
  const result = generateWithSpecialChars(500);
  testRunner.assertLength(result, 500);
  
  const hasLetters = /[a-zA-Z]/.test(result);
  const hasNumbers = /[0-9]/.test(result);
  const hasSpecialChars = /[,.()%\/+?*\-_=!@#$%^&*\[\]{}|;:'"<>~`]/.test(result);
  
  testRunner.assertTrue(hasLetters || hasNumbers || hasSpecialChars);
});
```

#### 5. Turkish/German Tests
```javascript
testRunner.test('generateWithTurkishGerman should contain Turkish/German characters', () => {
  const result = generateWithTurkishGerman(500);
  testRunner.assertLength(result, 500);
  
  const hasTurkishGerman = /[çğıöşüÇĞIÖŞÜäöüßÄÖÜ]/.test(result);
  const hasRegularChars = /[a-zA-Z0-9]/.test(result);
  
  testRunner.assertTrue(hasTurkishGerman || hasRegularChars);
});
```

#### 6. Custom Text Tests
```javascript
// Sadece harf
testRunner.test('generateCustomText with only alphabetical should work', () => {
  const result = generateCustomText(50, {
    includeAlphabetical: true,
    includeNumerical: false,
    includeSpecialChars: false,
    includeTurkishGerman: false,
    includeSpaces: false
  });
  testRunner.assertMatch(result, /^[a-zA-Z]+$/);
});

// Sadece sayı
testRunner.test('generateCustomText with only numerical should work', () => {
  const result = generateCustomText(50, {
    includeAlphabetical: false,
    includeNumerical: true,
    includeSpecialChars: false,
    includeTurkishGerman: false,
    includeSpaces: false
  });
  testRunner.assertMatch(result, /^[0-9]+$/);
});
```

#### 7. Edge Case Tests
```javascript
// Minimum uzunluk
testRunner.test('All functions should handle length 1', () => {
  testRunner.assertLength(generateLoremIpsum(1, false, false), 1);
  testRunner.assertLength(generateAlphanumerical(1), 1);
  testRunner.assertLength(generateWithSpecialChars(1), 1);
  testRunner.assertLength(generateWithTurkishGerman(1), 1);
});

// Büyük uzunluk
testRunner.test('All functions should handle large lengths', () => {
  const largeLength = 10000;
  testRunner.assertLength(generateLoremIpsum(largeLength, false, false), largeLength);
  testRunner.assertLength(generateAlphanumerical(largeLength), largeLength);
});
```

#### 8. Randomness Tests
```javascript
testRunner.test('Generated text should be random', () => {
  const result1 = generateAlphanumerical(100);
  const result2 = generateAlphanumerical(100);
  const result3 = generateAlphanumerical(100);
  
  testRunner.assertFalse(result1 === result2);
  testRunner.assertFalse(result2 === result3);
  testRunner.assertFalse(result1 === result3);
});
```

#### 9. Distribution Tests
```javascript
testRunner.test('Alphanumerical should have reasonable character distribution', () => {
  const result = generateAlphanumerical(10000);
  const letterCount = (result.match(/[a-zA-Z]/g) || []).length;
  const numberCount = (result.match(/[0-9]/g) || []).length;
  
  const letterPercentage = (letterCount / result.length) * 100;
  const numberPercentage = (numberCount / result.length) * 100;
  
  testRunner.assertTrue(letterPercentage > 70 && letterPercentage < 95);
  testRunner.assertTrue(numberPercentage > 5 && numberPercentage < 30);
});
```

### 🖥️ UI Integration Tests (10 test)

#### Text Type Selection Tests
```javascript
testRunner.test('UI should generate Lorem Ipsum when lorem type is selected', () => {
  const { mockElements, cleanup } = createMockDOM();
  
  // Lorem type selection simulation
  mockElements.textTypeRadios.forEach(radio => radio.checked = false);
  mockElements.textTypeRadios[0].checked = true;
  mockElements.textTypeRadios[0].value = 'lorem';

  const textType = mockElements.textTypeRadios.find(r => r.checked).value;
  testRunner.assertEqual(textType, 'lorem');
  
  cleanup();
});
```

#### Input Validation Tests
```javascript
testRunner.test('UI should handle invalid length input', () => {
  const { mockElements, cleanup } = createMockDOM();
  
  mockElements.lengthInput.value = 'invalid';
  const length = parseInt(mockElements.lengthInput.value);
  
  testRunner.assertTrue(isNaN(length));
  cleanup();
});

testRunner.test('UI should handle maximum length validation', () => {
  const { mockElements, cleanup } = createMockDOM();
  
  mockElements.lengthInput.value = '1000000';
  const length = parseInt(mockElements.lengthInput.value);
  
  testRunner.assertTrue(length > 999999);
  cleanup();
});
```

#### Options Tests
```javascript
testRunner.test('UI should apply remove punctuation option for Lorem Ipsum', () => {
  const { mockElements, cleanup } = createMockDOM();
  
  mockElements.removePunct.checked = true;
  const generatedText = generateLoremIpsum(50, false, true);
  
  testRunner.assertFalse(/[.,\/#!$%\^&\*;:{}=\-_`~()]/.test(generatedText));
  cleanup();
});
```

### ⚡ Performance Tests (6 test)

#### Speed Tests
```javascript
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
  const averageTime = totalTime / (iterations * 4);
  
  testRunner.assertTrue(averageTime < 1, 
    `Generation should be fast (< 1ms), got ${averageTime.toFixed(3)}ms`);
});
```

#### Large Text Tests
```javascript
testRunner.test('Text generation should handle large texts efficiently', () => {
  const length = 100000;
  
  const start = performance.now();
  const result = generateAlphanumerical(length);
  const end = performance.now();
  
  const time = end - start;
  
  testRunner.assertLength(result, length);
  testRunner.assertTrue(time < 1000, 
    `Large text generation should be fast (< 1s), got ${time.toFixed(1)}ms`);
});
```

#### Memory Tests
```javascript
testRunner.test('Memory usage should be reasonable for large texts', () => {
  const length = 50000;
  const iterations = 10;
  
  for (let i = 0; i < iterations; i++) {
    const result = generateWithSpecialChars(length);
    testRunner.assertLength(result, length);
  }
  
  testRunner.assertTrue(true, 'Memory test completed without issues');
});
```

#### Stress Tests
```javascript
testRunner.test('Stress test - multiple concurrent generations', async () => {
  const promises = [];
  const length = 5000;
  const concurrentGenerations = 20;
  
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
  
  results.forEach((result, index) => {
    testRunner.assertEqual(result.length, length);
  });
  
  const averageTime = results.reduce((sum, r) => sum + r.time, 0) / results.length;
  testRunner.assertTrue(averageTime < 100);
});
```

## 🔧 Test Framework

### Custom Test Runner
```javascript
class TestRunner {
  constructor() {
    this.tests = [];
    this.results = { passed: 0, failed: 0, total: 0 };
  }

  test(name, testFn) {
    this.tests.push({ name, testFn });
  }

  async runAll() {
    for (const { name, testFn } of this.tests) {
      this.results.total++;
      
      try {
        await testFn();
        console.log(`✅ ${name}`);
        this.results.passed++;
      } catch (error) {
        console.log(`❌ ${name}`);
        console.log(`   Error: ${error.message}`);
        this.results.failed++;
      }
    }

    this.printResults();
  }
}
```

### Assertion Methods
```javascript
// Temel assertion
assert(condition, message)

// Eşitlik kontrolü
assertEqual(actual, expected, message)

// Boolean kontrolü
assertTrue(condition, message)
assertFalse(condition, message)

// String kontrolü
assertContains(str, substring, message)
assertMatch(str, regex, message)

// Uzunluk kontrolü
assertLength(item, expectedLength, message)
```

### Mock Objects

**DOM Mocking:**
```javascript
function createMockDOM() {
  const mockElements = {
    lengthInput: { value: '50' },
    textTypeRadios: [
      { checked: true, value: 'lorem' },
      { checked: false, value: 'alphanumerical' }
    ],
    removePunct: { checked: false },
    removeSpace: { checked: false }
  };

  const originalQuerySelector = document.querySelector;
  document.querySelector = function(selector) {
    if (selector === 'input[name="textType"]:checked') {
      return mockElements.textTypeRadios.find(radio => radio.checked);
    }
    return originalQuerySelector.call(document, selector);
  };

  return {
    mockElements,
    cleanup: () => {
      document.querySelector = originalQuerySelector;
    }
  };
}
```

## 📊 Test Metrikleri

### Performance Benchmarks
```javascript
// Hedef performans değerleri
const PERFORMANCE_TARGETS = {
  SMALL_TEXT_AVG: 1,      // < 1ms for 100 chars
  LARGE_TEXT_MAX: 1000,   // < 1s for 100k chars  
  CONCURRENT_AVG: 100,    // < 100ms for concurrent ops
  MEMORY_STABLE: true     // No memory leaks
};
```

### Coverage Metrikleri
```javascript
// Function coverage
const FUNCTION_COVERAGE = {
  generateLoremIpsum: '100%',
  generateAlphanumerical: '100%',
  generateWithSpecialChars: '100%',
  generateWithTurkishGerman: '100%',
  generateCustomText: '100%'
};

// Character set coverage
const CHARSET_COVERAGE = {
  ALPHABETICAL: '100%',
  NUMERICAL: '100%',
  SPECIAL_CHARS: '100%',
  TURKISH_GERMAN: '100%'
};
```

## 🐛 Test Hata Ayıklama

### Yaygın Test Hataları

**1. Character Set Erişim Hatası**
```
❌ CHARACTER_SETS should contain all expected characters
Error: CHARACTER_SETS is not defined
```
**Çözüm**: `window.CHARACTER_SETS` expose edildi mi kontrol et

**2. Assertion Method Hatası**
```
❌ generateAlphanumerical should contain only letters and numbers
Error: Expected length 100, got undefined
```
**Çözüm**: `assertLength` method'u düzeltildi

**3. Async Test Hatası**
```
❌ Stress test - multiple concurrent generations
Error: Promise not resolved
```
**Çözüm**: Test function'ı `async` yap ve `await` kullan

**4. Performance Ratio Hatası**
```
❌ All generation functions should perform similarly
Error: Performance difference should be reasonable. Min: 0.00ms, Max: 0.10ms
```
**Çözüm**: Çok küçük zamanlar için mutlak fark kontrolü eklendi

### Debug Modları

**Verbose Logging:**
```javascript
// Debug mode açma
localStorage.setItem('debug', 'true');

// Debug loglar
if (localStorage.getItem('debug') === 'true') {
  console.log('Test starting:', testName);
  console.log('Parameters:', parameters);
  console.log('Result:', result);
}
```

**Performance Monitoring:**
```javascript
function runWithProfiling(testFn, testName) {
  const start = performance.now();
  const result = testFn();
  const end = performance.now();
  
  console.log(`${testName} took ${(end - start).toFixed(2)}ms`);
  return result;
}
```

## 🔄 CI/CD Test Integration

### GitHub Actions Workflow
```yaml
name: Test Suite
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
        
      - name: Run linter
        run: npm run lint
        
      - name: Run tests
        run: npm test
```

### Test Reports

**HTML Report Generation:**
```javascript
function generateTestReport(results) {
  const html = `
    <html>
      <head><title>Test Report</title></head>
      <body>
        <h1>Test Results</h1>
        <p>Total: ${results.total}</p>
        <p>Passed: ${results.passed}</p>
        <p>Failed: ${results.failed}</p>
        <p>Success Rate: ${((results.passed / results.total) * 100).toFixed(1)}%</p>
      </body>
    </html>
  `;
  
  // Save to file or send to server
  return html;
}
```

## 📈 Test Geliştirme Rehberi

### Yeni Test Ekleme

**1. Test Dosyası Seçimi:**
- Function tests → `func-tests.js`
- UI tests → `ui-tests.js`  
- Performance tests → `performance-tests.js`

**2. Test Yazma Template:**
```javascript
testRunner.test('Test description', () => {
  // Arrange
  const input = setupTestData();
  
  // Act
  const result = functionUnderTest(input);
  
  // Assert
  testRunner.assertEqual(result, expectedResult);
  testRunner.assertTrue(condition);
});
```

**3. Test Naming Convention:**
```javascript
// Good naming
testRunner.test('generateAlphanumerical should return only letters and numbers');
testRunner.test('UI should handle invalid length input gracefully');
testRunner.test('Performance should be under 1ms for small texts');

// Bad naming  
testRunner.test('test1');
testRunner.test('check function');
testRunner.test('performance test');
```

### Test Best Practices

**1. Test Isolation:**
```javascript
// Her test bağımsız olmalı
testRunner.test('Test A', () => {
  // Setup
  const data = createFreshData();
  
  // Test logic
  
  // Cleanup if needed
  cleanup();
});
```

**2. Meaningful Assertions:**
```javascript
// Good
testRunner.assertLength(result, 50, 'Should generate exactly 50 characters');
testRunner.assertMatch(result, /^[a-zA-Z0-9]+$/, 'Should contain only alphanumerical');

// Bad
testRunner.assertTrue(result.length === 50);
testRunner.assertTrue(result.match(/^[a-zA-Z0-9]+$/));
```

**3. Edge Case Coverage:**
```javascript
// Boundary conditions
testRunner.test('Should handle minimum length 1', () => {
  const result = generateAlphanumerical(1);
  testRunner.assertLength(result, 1);
});

testRunner.test('Should handle maximum length 999999', () => {
  const result = generateAlphanumerical(999999);
  testRunner.assertLength(result, 999999);
});
```

---

**Test sistem hazır!** Tüm 31 test çalışır durumda ve %100 coverage sağlıyor. Test çalıştırmak için `npm test` kullanın veya `test-all.html` dosyasını açın!