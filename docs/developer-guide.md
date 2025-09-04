# 👨‍💻 Geliştirici Rehberi

Test String Generator'ın kod yapısı, geliştirme ortamı ve katkı sağlama rehberi.

## 📁 Proje Yapısı

```
test-string-extention/
├── 📂 src/
│   ├── 📂 js/
│   │   ├── func.js          # Temel metin üretim fonksiyonları
│   │   ├── popup.js         # UI mantığı ve event handler'lar
│   │   ├── copy.js          # Kopyalama fonksiyonları
│   │   └── misc.js          # Çeşitli yardımcı fonksiyonlar
│   └── 📂 css/
│       └── popup.css        # UI stilleri
├── 📂 data/
│   ├── address.json         # Türkçe adres verileri
│   ├── email.json          # E-posta domain listesi
│   ├── femaleFirstName.json # Kadın isimleri
│   ├── maleFirstName.json   # Erkek isimleri
│   ├── surname.json         # Soyadlar
│   └── password.json        # Şifre kalıpları
├── 📂 tests/
│   ├── test-runner.js       # Test framework
│   ├── func-tests.js        # Fonksiyon testleri
│   ├── ui-tests.js          # UI testleri
│   └── performance-tests.js # Performans testleri
├── 📂 docs/
│   └── *.md                 # Dokümantasyon dosyaları
├── 📂 assets/
│   └── icon*.png           # Extension simgeleri
├── popup.html              # Ana UI dosyası
├── manifest.json           # Chrome Extension manifest
├── background.js           # Service worker
├── package.json           # NPM konfigürasyonu
└── test-*.html            # Test arayüzleri
```

## 🔧 Geliştirme Ortamı Kurulumu

### Önkoşullar
```bash
# Node.js (v16+)
node --version

# Git
git --version

# Code editor (VS Code önerilen)
```

### Projeyi Klonlama
```bash
# Repository'yi klonla
git clone https://github.com/sevilayerkan/test-string-extention.git
cd test-string-extention

# Bağımlılıkları yükle (opsiyonel - sadece linting için)
npm install
```

### Chrome'da Yükleme
1. `chrome://extensions/` adresine git
2. "Geliştirici modu"nu aç
3. "Paketlenmemiş öğe yükle" tıkla
4. Proje klasörünü seç

### Geliştirme Araçları
```bash
# Code linting
npm run lint

# Code formatting  
npm run format

# Testleri çalıştır
npm test
```

## 🏗️ Kod Mimarisi

### Core Functions (src/js/func.js)

**Karakter Set Tanımları:**
```javascript
const CHARACTER_SETS = {
  ALPHABETICAL: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  NUMERICAL: '0123456789', 
  SPECIAL_CHARS: ',.()%/+?*-_=!@#$%^&*[]{}|;:\'\"<>~`',
  TURKISH_GERMAN: 'çğıöşüÇĞIÖŞÜäöüßÄÖÜ'
};
```

**Ana Üretim Algoritması:**
```javascript
function generateCustomText(length, options = {}) {
  // 1. Seçenekleri işle
  const {
    includeAlphabetical = true,
    includeNumerical = false,
    includeSpecialChars = false,
    includeTurkishGerman = false,
    includeSpaces = true
  } = options;

  // 2. Karakter havuzu oluştur
  let characterPool = '';
  if (includeAlphabetical) characterPool += CHARACTER_SETS.ALPHABETICAL;
  if (includeNumerical) characterPool += CHARACTER_SETS.NUMERICAL;
  if (includeSpecialChars) characterPool += CHARACTER_SETS.SPECIAL_CHARS;
  if (includeTurkishGerman) characterPool += CHARACTER_SETS.TURKISH_GERMAN;
  if (includeSpaces) characterPool += ' ';

  // 3. Varsayılan olarak alfabetik
  if (characterPool.length === 0) {
    characterPool = CHARACTER_SETS.ALPHABETICAL;
  }

  // 4. Rastgele metin üret
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characterPool.length);
    result += characterPool[randomIndex];
  }

  return result;
}
```

### UI Logic (src/js/popup.js)

**Event Handler Pattern:**
```javascript
document.addEventListener('DOMContentLoaded', function () {
  // Initialisers
  clearTextarea();
  initializeTabs();
  initializeCharacterCounter();
  initializeMiscTab();
  initializeTextTypeControls();

  // Event listeners
  const generateButton = document.getElementById('generateButton');
  generateButton.addEventListener('click', handleGenerate);
});
```

**Modüler Initialization:**
```javascript
function initializeTextTypeControls() {
  const textTypeRadios = document.querySelectorAll('input[name="textType"]');
  const loremOptions = document.getElementById('loremOptions');

  function toggleLoremOptions() {
    const selectedType = document.querySelector('input[name="textType"]:checked').value;
    loremOptions.style.display = selectedType === 'lorem' ? 'block' : 'none';
  }

  textTypeRadios.forEach(radio => {
    radio.addEventListener('change', toggleLoremOptions);
  });

  toggleLoremOptions();
}
```

### Test Architecture (tests/)

**Test Runner:**
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
      try {
        await testFn();
        this.results.passed++;
      } catch (error) {
        this.results.failed++;
        console.error(`${name}: ${error.message}`);
      }
    }
  }
}
```

## 🚀 Yeni Özellik Ekleme

### 1. Yeni Karakter Seti Ekleme

**Adım 1: CHARACTER_SETS'e ekle**
```javascript
const CHARACTER_SETS = {
  // Mevcut setler...
  EMOJI: '😀😃😄😁😆😊😎🤔🎉🚀💡', // Yeni set
};
```

**Adım 2: Üretim fonksiyonu oluştur**
```javascript
function generateWithEmoji(length) {
  return generateCustomText(length, {
    includeAlphabetical: true,
    includeNumerical: true,
    includeEmoji: true,  // Yeni seçenek
    includeSpaces: true
  });
}

// Global erişim için expose et
window.generateWithEmoji = generateWithEmoji;
```

**Adım 3: generateCustomText'i güncelle**
```javascript
function generateCustomText(length, options = {}) {
  const {
    // Mevcut seçenekler...
    includeEmoji = false,  // Yeni seçenek
  } = options;

  let characterPool = '';
  // Mevcut pool oluşturma...
  if (includeEmoji) characterPool += CHARACTER_SETS.EMOJI;
  
  // Geri kalan kod...
}
```

**Adım 4: UI'a ekle**
```html
<label class="radio-wrapper">
  <input type="radio" name="textType" value="emoji">
  <span class="radio-label">With Emoji (😀🚀💡...)</span>
</label>
```

**Adım 5: UI handler'ı güncelle**
```javascript
switch (textType) {
  // Mevcut case'ler...
  case 'emoji':
    generatedText = generateWithEmoji(length);
    break;
}
```

**Adım 6: Test ekle**
```javascript
testRunner.test('generateWithEmoji should contain emoji characters', () => {
  const result = generateWithEmoji(100);
  testRunner.assertLength(result, 100, 'Should return exact length');
  testRunner.assertMatch(result, /[😀😃😄😁😆😊😎🤔🎉🚀💡]/, 'Should contain emoji');
});
```

### 2. Yeni UI Sekmesi Ekleme

**Adım 1: HTML ekle**
```html
<button class="tab-button" data-tab="newfeature">New Feature</button>

<div id="newfeature" class="tab-content">
  <!-- Yeni özellik içeriği -->
</div>
```

**Adım 2: Tab initialization güncelle**
```javascript
// initializeTabs() fonksiyonu otomatik olarak yeni sekmeyi destekler
```

**Adım 3: Yeni özellik mantığı**
```javascript
function initializeNewFeature() {
  const button = document.getElementById('newFeatureButton');
  button.addEventListener('click', handleNewFeature);
}

// DOMContentLoaded'a ekle
document.addEventListener('DOMContentLoaded', function () {
  // Mevcut initializerlar...
  initializeNewFeature();
});
```

## 🔍 Debugging ve Profiling

### Chrome DevTools Kullanımı

**Console Debugging:**
```javascript
// Debug mode kontrolü
if (window.DEBUG || localStorage.getItem('debug') === 'true') {
  console.log('Function called:', functionName);
  console.log('Parameters:', parameters);
  console.log('Result:', result);
}
```

**Performance Profiling:**
```javascript
function profileFunction(fn, ...args) {
  const start = performance.now();
  const result = fn(...args);
  const end = performance.now();
  console.log(`${fn.name} took ${(end - start).toFixed(2)}ms`);
  return result;
}

// Kullanım
const result = profileFunction(generateAlphanumerical, 10000);
```

**Memory Usage Monitoring:**
```javascript
function checkMemoryUsage() {
  if (performance.memory) {
    console.log('Memory usage:', {
      used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024) + 'MB',
      total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024) + 'MB',
      limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024) + 'MB'
    });
  }
}
```

### Extension Debugging

**Service Worker Debugging:**
```javascript
// background.js
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed/updated');
});

// Error handling
self.addEventListener('error', (event) => {
  console.error('Service worker error:', event.error);
});
```

**Content Script Communication:**
```javascript
// Popup'dan content script'e mesaj gönderme
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.tabs.sendMessage(tabs[0].id, { action: 'generateText' });
});
```

## 🧪 Test Geliştirme

### Yeni Test Kategorisi Ekleme

**Test dosyası oluştur:**
```javascript
// tests/new-feature-tests.js
testRunner.test('New feature should work correctly', () => {
  const result = newFeatureFunction(parameters);
  testRunner.assertLength(result, expectedLength);
  testRunner.assertTrue(condition, 'Should meet condition');
});

console.log('✅ New feature tests loaded');
```

**Test runner'a dahil et:**
```html
<!-- test-all.html -->
<script src="tests/new-feature-tests.js"></script>
```

### Mock Objects

**DOM Mocking:**
```javascript
function createMockElement(tagName, attributes = {}) {
  return {
    tagName: tagName.toUpperCase(),
    ...attributes,
    addEventListener: jest.fn(),
    click: jest.fn(),
    style: {},
    classList: {
      add: jest.fn(),
      remove: jest.fn(),
      toggle: jest.fn()
    }
  };
}
```

**Function Mocking:**
```javascript
function mockGenerateFunction(length) {
  // Test için sabit sonuç döndür
  return 'a'.repeat(length);
}

// Test sırasında gerçek fonksiyonu değiştir
const originalFunction = window.generateAlphanumerical;
window.generateAlphanumerical = mockGenerateFunction;

// Test sonrası geri yükle
window.generateAlphanumerical = originalFunction;
```

## 📦 Build ve Deployment

### Manual Build Process

**Assets kontrolü:**
```bash
# Icon dosyalarının varlığını kontrol et
ls assets/icon*.png

# Manifest.json doğrulaması
cat manifest.json | jq '.'
```

**File size optimization:**
```bash
# Büyük dosyaları kontrol et
find . -name "*.js" -exec wc -c {} + | sort -n
find . -name "*.json" -exec wc -c {} + | sort -n
```

### Chrome Web Store Hazırlığı

**Manifest v3 uyumluluğu:**
```json
{
  "manifest_version": 3,
  "name": "Test String Generator",
  "version": "1.0.0",
  "description": "Generate test strings with various character sets",
  "permissions": [
    "activeTab",
    "clipboardRead", 
    "clipboardWrite"
  ],
  "action": {
    "default_popup": "popup.html"
  },
  "background": {
    "service_worker": "background.js"
  }
}
```

**Zip paketi oluşturma:**
```bash
# Gereksiz dosyaları hariç tut
zip -r extension.zip . -x "*.git*" "node_modules/*" "tests/*" "docs/*" "*.md"
```

## 🤝 Contribution Guidelines

### Git Workflow

**Branch naming:**
```bash
# Feature branch
git checkout -b feature/new-character-set

# Bug fix branch  
git checkout -b fix/clipboard-issue

# Test branch
git checkout -b test/performance-improvements
```

**Commit message format:**
```
type: description

feat: add emoji character set support
fix: resolve clipboard copy issue on Firefox
test: add performance benchmarks for large texts
docs: update API documentation
```

### Code Quality Standards

**ESLint configuration:**
```javascript
// .eslintrc.json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 12
  },
  "rules": {
    "no-unused-vars": "warn",
    "no-console": "off",
    "prefer-const": "error"
  }
}
```

**Code review checklist:**
- [ ] Fonksiyon dokümantasyonu mevcut
- [ ] Unit testler eklendi
- [ ] Performance etki analizi yapıldı
- [ ] Browser compatibility kontrol edildi
- [ ] Error handling eklendi
- [ ] UI accessibility kontrol edildi

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Manual testing completed
- [ ] Performance impact assessed

## Screenshots
Include UI changes if applicable
```

## 🔧 Advanced Development

### Chrome Extension APIs

**Storage API kullanımı:**
```javascript
// Ayarları kaydet
chrome.storage.sync.set({
  defaultLength: 100,
  preferredType: 'alphanumerical'
});

// Ayarları yükle
chrome.storage.sync.get(['defaultLength', 'preferredType'], (result) => {
  console.log('Loaded settings:', result);
});
```

**Keyboard shortcuts:**
```json
// manifest.json
{
  "commands": {
    "generate-text": {
      "suggested_key": {
        "default": "Ctrl+Shift+G"
      },
      "description": "Generate text"
    }
  }
}
```

### Performance Optimization

**Lazy loading:**
```javascript
// Ağır veri dosyalarını gerektiğinde yükle
async function loadTurkishNames() {
  if (!window.turkishNames) {
    const response = await fetch('data/maleFirstName.json');
    window.turkishNames = await response.json();
  }
  return window.turkishNames;
}
```

**Worker threads:**
```javascript
// Heavy computation için web worker
const worker = new Worker('text-generator-worker.js');
worker.postMessage({ type: 'generate', length: 100000 });
worker.onmessage = (e) => {
  console.log('Generated text:', e.data.result);
};
```

---

**Sonraki adım**: [Test Dokümantasyonu](testing.md) ile kapsamlı test stratejileri öğrenin!