# 🏗️ Sistem Mimarisi

Test String Generator'ın teknik mimarisi, tasarım kararları ve sistem bileşenleri.

## 📐 Genel Mimari

### Chrome Extension Mimarisi
```
┌─────────────────────────────────────────────────────────────┐
│                    Chrome Extension                          │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐│
│  │   Popup UI      │  │  Background     │  │   Data Files    ││
│  │   (popup.html)  │  │  (background.js)│  │   (*.json)      ││
│  └─────────────────┘  └─────────────────┘  └─────────────────┘│
└─────────────────────────────────────────────────────────────┘
           │                      │                      │
           ▼                      ▼                      ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────┐
│   UI Logic      │  │  Service Worker │  │  Static JSON Data   │
│   (popup.js)    │  │   (lifecycle)   │  │   (names, addresses)│
└─────────────────┘  └─────────────────┘  └─────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────┐
│               Core Functions Layer                          │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐│
│  │  Text Generator │  │  Character Sets │  │  Utility Funcs  ││
│  │   (func.js)     │  │   (constants)   │  │   (copy, misc)  ││
│  └─────────────────┘  └─────────────────┘  └─────────────────┘│
└─────────────────────────────────────────────────────────────┘
           │                      │                      │
           ▼                      ▼                      ▼
┌─────────────────────────────────────────────────────────────┐
│                   Browser APIs                              │
│    Clipboard API    │    Storage API    │    Runtime API    │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 Bileşen Mimarisi

### 1. Presentation Layer (UI)

#### HTML Structure
```html
<!-- popup.html - Ana arayüz yapısı -->
<div class="app-container">
  <!-- Tab Navigation -->
  <div class="tabs">
    <button class="tab-button" data-tab="generator">Generator</button>
    <button class="tab-button" data-tab="counter">Counter</button>
    <button class="tab-button" data-tab="misc">Misc</button>
  </div>
  
  <!-- Tab Contents -->
  <div id="generator" class="tab-content active">
    <!-- Text generation UI -->
  </div>
  
  <div id="counter" class="tab-content">
    <!-- Character counter UI -->
  </div>
  
  <div id="misc" class="tab-content">  
    <!-- Miscellaneous tools UI -->
  </div>
</div>
```

#### CSS Architecture
```css
/* Modular CSS yapısı */
.app-container { /* Main container */ }
.tabs { /* Tab navigation */ }
.tab-content { /* Content areas */ }
.input-group { /* Form groupings */ }
.feedback { /* User feedback */ }
```

#### UI Component Pattern
```javascript
// Component-based initialization
document.addEventListener('DOMContentLoaded', function () {
  initializeTabs();           // Tab switching logic
  initializeCharacterCounter(); // Real-time counter
  initializeMiscTab();        // Misc tools
  initializeTextTypeControls(); // Text type selection
});
```

### 2. Business Logic Layer

#### Core Text Generation
```javascript
// Modular function architecture
┌─────────────────────────────────────────────────────────┐
│                  Text Generation Core                   │
├─────────────────────────────────────────────────────────┤
│  generateLoremIpsum()         │  Character-based        │
│  generateAlphanumerical()     │  Random selection       │  
│  generateWithSpecialChars()   │  from predefined        │
│  generateWithTurkishGerman()  │  character pools        │
│  generateCustomText()         │  with options           │
└─────────────────────────────────────────────────────────┘
```

#### Character Set Management
```javascript
const CHARACTER_SETS = {
  ALPHABETICAL: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  NUMERICAL: '0123456789',
  SPECIAL_CHARS: ',.()%/+?*-_=!@#$%^&*[]{}|;:\'\"<>~`',
  TURKISH_GERMAN: 'çğıöşüÇĞIÖŞÜäöüßÄÖÜ'
};

// Strategy Pattern for text generation
function generateCustomText(length, options) {
  const characterPool = buildCharacterPool(options);
  return generateRandomText(characterPool, length);
}
```

#### Algorithm Design
```javascript
// Core generation algorithm
function generateRandomText(characterPool, length) {
  let result = '';
  
  // O(n) time complexity - linear
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characterPool.length);
    result += characterPool[randomIndex];
  }
  
  return result; // O(1) space complexity per character
}
```

### 3. Data Layer

#### Static Data Management
```json
// JSON-based data storage
data/
├── address.json         # Turkish addresses
├── email.json          # Email domains  
├── femaleFirstName.json # Female names
├── maleFirstName.json   # Male names
├── surname.json        # Surnames
└── password.json       # Password patterns
```

#### Data Loading Strategy
```javascript
// Lazy loading pattern
async function loadDataFile(filename) {
  if (!cache[filename]) {
    const response = await fetch(`data/${filename}`);
    cache[filename] = await response.json();
  }
  return cache[filename];
}
```

## ⚡ Performans Mimarisi

### 1. Memory Management

#### String Building Strategy
```javascript
// Efficient string concatenation
function generateLargeText(length) {
  // For small texts: direct concatenation (< 1000 chars)
  if (length < 1000) {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += getRandomChar();
    }
    return result;
  }
  
  // For large texts: array join strategy (> 1000 chars)
  const chars = new Array(length);
  for (let i = 0; i < length; i++) {
    chars[i] = getRandomChar();
  }
  return chars.join('');
}
```

#### Memory Footprint Analysis
```javascript
// Memory usage per text type
const MEMORY_FOOTPRINT = {
  '1KB text': '~2KB RAM',      // String overhead
  '10KB text': '~12KB RAM',    // 20% overhead
  '100KB text': '~120KB RAM',  // 20% overhead
  '1MB text': '~1.2MB RAM'     // 20% overhead
};
```

### 2. Performance Optimization

#### Random Number Generation
```javascript
// Optimized random generation
const randomCache = new Array(1000); // Pre-generated random numbers
let randomIndex = 0;

function getOptimizedRandom() {
  if (randomIndex >= randomCache.length) {
    // Refill cache
    for (let i = 0; i < randomCache.length; i++) {
      randomCache[i] = Math.random();
    }
    randomIndex = 0;
  }
  return randomCache[randomIndex++];
}
```

#### Character Pool Optimization
```javascript
// Pre-computed character pools
const OPTIMIZED_POOLS = {
  alphanumerical: CHARACTER_SETS.ALPHABETICAL + CHARACTER_SETS.NUMERICAL,
  specialChars: /* pre-computed combination */,
  turkishGerman: /* pre-computed combination */
};
```

### 3. Caching Strategy

#### Function Result Caching
```javascript
// Memoization for expensive operations
const memoCache = new Map();

function memoizedGenerate(type, length, options) {
  const key = `${type}-${length}-${JSON.stringify(options)}`;
  
  if (memoCache.has(key)) {
    return memoCache.get(key);
  }
  
  const result = actualGenerate(type, length, options);
  memoCache.set(key, result);
  
  // Cache size management
  if (memoCache.size > 100) {
    const firstKey = memoCache.keys().next().value;
    memoCache.delete(firstKey);
  }
  
  return result;
}
```

## 🔄 State Management

### 1. UI State Architecture

#### State Container
```javascript
const AppState = {
  currentTab: 'generator',
  generationOptions: {
    textType: 'lorem',
    length: 100,
    removePunct: false,
    removeSpace: false
  },
  generated: {
    text: '',
    timestamp: null,
    type: null
  },
  ui: {
    isGenerating: false,
    lastError: null
  }
};
```

#### State Management Pattern
```javascript
// Observer pattern for state changes
class StateManager {
  constructor() {
    this.state = { ...AppState };
    this.observers = [];
  }
  
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.notifyObservers();
  }
  
  subscribe(observer) {
    this.observers.push(observer);
  }
  
  notifyObservers() {
    this.observers.forEach(observer => observer(this.state));
  }
}
```

### 2. Event Flow Architecture

#### Event-Driven Architecture
```javascript
// Event flow diagram
User Input → UI Event → State Change → Business Logic → UI Update

┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  UI Event   │───▶│ Event       │───▶│ State       │
│  (click)    │    │ Handler     │    │ Manager     │
└─────────────┘    └─────────────┘    └─────────────┘
                          │                   │
                          ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Business   │◀───│ Action      │◀───│ State       │
│  Logic      │    │ Dispatcher  │    │ Change      │
└─────────────┘    └─────────────┘    └─────────────┘
       │
       ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Core       │───▶│ Result      │───▶│ UI Update   │
│  Functions  │    │ Handler     │    │ (feedback)  │
└─────────────┘    └─────────────┘    └─────────────┘
```

## 🧪 Test Mimarisi

### 1. Test Layer Architecture

#### Test Organization
```
tests/
├── test-runner.js       # Custom test framework
├── func-tests.js        # Unit tests (15 tests)
├── ui-tests.js          # Integration tests (10 tests)
├── performance-tests.js # Performance tests (6 tests)
└── helpers/
    ├── mock-dom.js      # DOM mocking utilities
    └── test-data.js     # Test data generators
```

#### Test Framework Design
```javascript
// Lightweight test framework
class TestRunner {
  constructor() {
    this.tests = [];
    this.results = { passed: 0, failed: 0, total: 0 };
  }
  
  // Test registration
  test(name, testFn) {
    this.tests.push({ name, testFn });
  }
  
  // Async test execution
  async runAll() {
    for (const test of this.tests) {
      await this.runSingleTest(test);
    }
    this.reportResults();
  }
}
```

### 2. Mock Architecture

#### DOM Mocking Strategy
```javascript
// Mock DOM for headless testing
function createMockDOM() {
  return {
    elements: createMockElements(),
    events: createEventHandlers(),
    cleanup: restoreOriginalDOM
  };
}
```

#### Test Data Generation
```javascript
// Test-specific data generators
const TestDataFactory = {
  generateTestString: (length) => 'a'.repeat(length),
  generateMockOptions: () => ({ /* default test options */ }),
  generateLargeDataSet: () => { /* performance test data */ }
};
```

## 🔐 Güvenlik Mimarisi

### 1. Input Validation Layer

#### Validation Pipeline
```javascript
// Multi-layer input validation
function validateInput(input) {
  // Layer 1: Type validation
  if (typeof input.length !== 'number') {
    throw new ValidationError('Length must be a number');
  }
  
  // Layer 2: Range validation  
  if (input.length < 1 || input.length > 999999) {
    throw new ValidationError('Length out of range');
  }
  
  // Layer 3: Sanitization
  return sanitizeInput(input);
}
```

#### XSS Prevention
```javascript
// Output sanitization
function sanitizeOutput(text) {
  // HTML encoding for UI display
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
```

### 2. Permission Model

#### Minimal Permissions
```json
// manifest.json - Principle of least privilege
{
  "permissions": [
    "activeTab",        // Only current tab access
    "clipboardRead",    // Read clipboard for paste
    "clipboardWrite"    // Write clipboard for copy
  ]
  // No network, storage, or file system access
}
```

#### Data Privacy Architecture
```javascript
// Privacy-first design
const PrivacyController = {
  // No data collection
  collectData: () => { throw new Error('Data collection disabled'); },
  
  // No external communication
  sendData: () => { throw new Error('External communication disabled'); },
  
  // Local processing only
  processLocally: (data) => { /* safe local processing */ }
};
```

## 📦 Deployment Architecture

### 1. Build Process

#### File Structure for Production
```
dist/
├── manifest.json        # Extension manifest
├── popup.html          # Main UI
├── background.js       # Service worker
├── src/
│   ├── js/            # JavaScript modules
│   └── css/           # Stylesheets
├── data/              # JSON data files
├── assets/            # Icons and images
└── tests/             # Test files (dev only)
```

#### Build Optimization
```javascript
// Asset optimization strategy
const BuildConfig = {
  minifyJS: false,        // Keep readable for open source
  minifyCSS: true,        // Optimize CSS
  compressImages: true,   // Optimize icons
  bundleFiles: false      // Keep modular structure
};
```

### 2. Chrome Web Store Distribution

#### Extension Package
```bash
# Production package contents
extension.zip
├── manifest.json (v3)
├── popup.html
├── background.js
├── src/ (optimized)
├── data/ (compressed JSON)
└── assets/ (optimized icons)
```

#### Update Mechanism
```javascript
// Automatic update handling
chrome.runtime.onUpdateAvailable.addListener(() => {
  // Graceful update process
  chrome.runtime.reload();
});
```

## 🔧 Configurability Architecture

### 1. Configuration Management

#### Default Configuration
```javascript
const DefaultConfig = {
  textGeneration: {
    defaultLength: 100,
    maxLength: 999999,
    defaultType: 'lorem'
  },
  ui: {
    defaultTab: 'generator',
    autoSelectGenerated: true,
    feedbackDuration: 3000
  },
  performance: {
    cacheSize: 100,
    batchSize: 1000
  }
};
```

#### Runtime Configuration
```javascript
// Configuration override system
class ConfigManager {
  constructor() {
    this.config = { ...DefaultConfig };
  }
  
  override(path, value) {
    setNestedValue(this.config, path, value);
  }
  
  get(path) {
    return getNestedValue(this.config, path);
  }
}
```

## 📊 Monitoring ve Analytics

### 1. Performance Monitoring

#### Performance Metrics Collection
```javascript
// Performance tracking (local only)
const PerformanceMonitor = {
  metrics: {
    generationTimes: [],
    memoryUsage: [],
    errorCounts: {}
  },
  
  recordGeneration(duration, textLength) {
    this.metrics.generationTimes.push({
      duration,
      textLength,
      timestamp: Date.now()
    });
  }
};
```

### 2. Error Handling Architecture

#### Error Classification
```javascript
const ErrorTypes = {
  VALIDATION_ERROR: 'ValidationError',
  GENERATION_ERROR: 'GenerationError',
  UI_ERROR: 'UIError',
  SYSTEM_ERROR: 'SystemError'
};

class ErrorHandler {
  handle(error, context) {
    const errorInfo = {
      type: error.constructor.name,
      message: error.message,
      context,
      timestamp: Date.now()
    };
    
    this.logError(errorInfo);
    this.showUserFeedback(error);
  }
}
```

---

**Bu mimari**, Test String Generator'ın sağlam, ölçeklenebilir ve güvenli bir şekilde çalışmasını sağlar. Modüler tasarım, kolay geliştirme ve bakım imkanı sunar.