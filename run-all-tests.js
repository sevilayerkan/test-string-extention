// Node.js script to run all tests and generate a report
const fs = require('fs');
const path = require('path');

// Mock browser environment for Node.js
global.window = global;
global.document = {
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    createElement: () => ({ textContent: '', className: '', style: {} }),
    addEventListener: () => {}
};
global.performance = {
    now: () => Date.now()
};

// Load the source files
const funcJs = fs.readFileSync('./src/js/func.js', 'utf8');
const testRunnerJs = fs.readFileSync('./tests/test-runner.js', 'utf8');
const funcTestsJs = fs.readFileSync('./tests/func-tests.js', 'utf8');
const uiTestsJs = fs.readFileSync('./tests/ui-tests.js', 'utf8');
const performanceTestsJs = fs.readFileSync('./tests/performance-tests.js', 'utf8');

// Execute the code
eval(funcJs);
eval(testRunnerJs);
eval(funcTestsJs);
eval(uiTestsJs);
eval(performanceTestsJs);

// Run all tests
console.log('🧪 TEXT GENERATION - TÜM TESTLER');
console.log('='.repeat(50));
console.log('');

testRunner.runAll().then(() => {
    console.log('\n📊 TEST RAPORU TAMAMLANDI');
    process.exit(testRunner.results.failed > 0 ? 1 : 0);
}).catch(error => {
    console.error('❌ Test çalıştırma hatası:', error);
    process.exit(1);
});