// Simple test runner for text generation functionality
class TestRunner {
  constructor() {
    this.tests = [];
    this.results = {
      passed: 0,
      failed: 0,
      total: 0
    };
  }

  test(name, testFn) {
    this.tests.push({ name, testFn });
  }

  async runAll() {
    console.log('🚀 Running Text Generation Tests...\n');
    
    for (const { name, testFn } of this.tests) {
      this.results.total++;
      
      try {
        await testFn();
        console.log(`✅ ${name}`);
        this.results.passed++;
      } catch (error) {
        console.log(`❌ ${name}`);
        console.log(`   Error: ${error.message}\n`);
        this.results.failed++;
      }
    }

    this.printResults();
  }

  printResults() {
    console.log('\n' + '='.repeat(50));
    console.log('TEST RESULTS:');
    console.log(`Total: ${this.results.total}`);
    console.log(`Passed: ${this.results.passed}`);
    console.log(`Failed: ${this.results.failed}`);
    console.log(`Success Rate: ${((this.results.passed / this.results.total) * 100).toFixed(1)}%`);
    console.log('='.repeat(50));
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message || 'Assertion failed');
    }
  }

  assertEqual(actual, expected, message) {
    if (actual !== expected) {
      throw new Error(message || `Expected ${expected}, but got ${actual}`);
    }
  }

  assertTrue(condition, message) {
    this.assert(condition === true, message || 'Expected true');
  }

  assertFalse(condition, message) {
    this.assert(condition === false, message || 'Expected false');
  }

  assertContains(str, substring, message) {
    this.assert(str.includes(substring), message || `Expected "${str}" to contain "${substring}"`);
  }

  assertMatch(str, regex, message) {
    this.assert(regex.test(str), message || `Expected "${str}" to match ${regex}`);
  }

  assertLength(item, expectedLength, message) {
    const actualLength = typeof item === 'string' ? item.length : (item && item.length !== undefined ? item.length : 0);
    this.assertEqual(actualLength, expectedLength, message || `Expected length ${expectedLength}, got ${actualLength}`);
  }
}

// Global test runner instance
const testRunner = new TestRunner();