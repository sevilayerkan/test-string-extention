# 🤝 Katkı Sağlama Rehberi

Test String Generator projesine katkıda bulunmak için rehber.

## 🎯 Katkı Türleri

### 🔧 Code Contributions
- **Yeni özellikler**: Metin üretim tipleri, UI iyileştirmeleri
- **Bug fixes**: Hata düzeltmeleri, performance iyileştirmeleri
- **Refactoring**: Kod temizliği, optimizasyon
- **Tests**: Yeni test senaryoları, coverage artırımı

### 📚 Documentation
- **Dokümantasyon**: README, guides, API docs
- **Çeviri**: Çoklu dil desteği
- **Örnek kullanımlar**: Code examples, tutorials
- **Video tutorials**: Kullanım rehberleri

### 🧪 Testing & QA
- **Manual testing**: Farklı browser/OS kombinasyonları
- **Bug reporting**: Detaylı bug raporları
- **Performance testing**: Benchmarking, optimization önerileri
- **Security testing**: Güvenlik açığı tespiti

### 🎨 Design & UX  
- **UI/UX iyileştirmeleri**: Arayüz tasarımı
- **Icon tasarım**: Extension simgeleri
- **Accessibility**: Erişilebilirlik iyileştirmeleri
- **Mobile optimization**: Responsive design

## 🚀 Başlangıç Rehberi

### 1. Repository'yi Forklayın
```bash
# GitHub'da Fork butonuna tıklayın
# Sonra local'e klonlayın
git clone https://github.com/YOUR-USERNAME/test-string-extention.git
cd test-string-extention

# Original repository'yi upstream olarak ekleyin
git remote add upstream https://github.com/sevilayerkan/test-string-extention.git
```

### 2. Development Environment Kurulumu
```bash
# Dependencies yükleyin (opsiyonel - sadece linting için)
npm install

# Chrome'da extension'ı yükleyin
# chrome://extensions/ → Developer mode → Load unpacked

# Testleri çalıştırın
npm test
```

### 3. Branch Oluşturun
```bash
# Feature branch oluşturun
git checkout -b feature/emoji-support

# Bug fix branch oluşturun
git checkout -b fix/clipboard-issue

# Documentation branch oluşturun
git checkout -b docs/api-improvements
```

## 📝 Development Guidelines

### Code Style
```javascript
// ESLint rules'u takip edin
npm run lint

// Prettier ile format edin
npm run format

// Naming conventions
function generateWithEmoji(length) { // camelCase
  const EMOJI_SET = '😀😃😄'; // UPPER_CASE for constants
  let resultText = ''; // camelCase for variables
}
```

### File Organization
```
src/js/
├── func.js          # Core text generation functions
├── popup.js         # UI logic and event handlers  
├── copy.js          # Clipboard functionality
└── misc.js          # Miscellaneous utilities

tests/
├── func-tests.js        # Function unit tests
├── ui-tests.js          # UI integration tests
└── performance-tests.js # Performance benchmarks
```

### Function Design Patterns
```javascript
// 1. Pure functions (recommended)
function generateText(input) {
  // No side effects
  // Same input → same output (except for randomness)
  return processInput(input);
}

// 2. Global exposure pattern
function newGenerationFunction(params) {
  // Implementation
}
// Expose globally
window.newGenerationFunction = newGenerationFunction;

// 3. Error handling pattern
function safeGenerate(params) {
  try {
    validateInput(params);
    return generateText(params);
  } catch (error) {
    console.error('Generation error:', error);
    throw new GenerationError(error.message);
  }
}
```

### Testing Requirements
```javascript
// Her yeni fonksiyon için test yazın
testRunner.test('New function should work correctly', () => {
  const result = newFunction(testParams);
  testRunner.assertLength(result, expectedLength);
  testRunner.assertMatch(result, expectedPattern);
});

// Edge cases test edin
testRunner.test('New function should handle edge cases', () => {
  // Length 1
  testRunner.assertLength(newFunction(1), 1);
  // Large length  
  testRunner.assertLength(newFunction(10000), 10000);
  // Invalid input
  testRunner.assertThrows(() => newFunction(-1));
});
```

## 🎯 Katkı Alanları

### 🚀 Yüksek Öncelik
1. **Dark Mode Support**
   - CSS variables ile theme sistemi
   - Auto-detection ve manual toggle
   - Local storage'da tercihi saklama

2. **Export Functionality**
   - TXT, CSV, JSON formatları
   - Batch export desteği
   - Custom filename'ler

3. **More Character Sets**
   - Rusça, Arapça, Çince karakterler
   - Mathematical symbols
   - Emoji sets

4. **Performance Optimization**
   - Web Worker kullanımı
   - Streaming generation
   - Memory optimization

### 🔧 Orta Öncelik
1. **UI Improvements**
   - Drag & drop functionality
   - Keyboard shortcuts
   - Better responsive design

2. **Advanced Features**
   - Text templates
   - Generation history
   - Batch operations

3. **Developer Tools**
   - API documentation
   - Code examples
   - SDK geliştirme

### 💡 Düşük Öncelik
1. **AI Integration**
   - GPT-like text generation
   - Context-aware generation
   - Smart templates

2. **Cloud Features**
   - Settings sync
   - Team collaboration
   - Usage analytics

## 📋 Örnek Katkı Örnekleri

### Yeni Karakter Seti Ekleme
```javascript
// 1. CHARACTER_SETS'e ekleyin
const CHARACTER_SETS = {
  // Existing sets...
  EMOJI: '😀😃😄😁😆😊😎🤔🎉🚀💡🔥✨🌟⭐💫',
  MATHEMATICAL: '∑∆∇∂∫∮∏∐√∛∜∞≠≤≥≈≡±∓×÷'
};

// 2. Generator function oluşturun
function generateWithEmoji(length) {
  return generateCustomText(length, {
    includeAlphabetical: true,
    includeNumerical: false,
    includeEmoji: true,
    includeSpaces: true
  });
}

// 3. Global expose edin
window.generateWithEmoji = generateWithEmoji;

// 4. generateCustomText'i genişletin
function generateCustomText(length, options = {}) {
  const {
    includeAlphabetical = true,
    includeNumerical = false,
    includeSpecialChars = false,
    includeTurkishGerman = false,
    includeEmoji = false, // Yeni seçenek
    includeSpaces = true
  } = options;

  let characterPool = '';
  if (includeAlphabetical) characterPool += CHARACTER_SETS.ALPHABETICAL;
  if (includeNumerical) characterPool += CHARACTER_SETS.NUMERICAL;
  if (includeSpecialChars) characterPool += CHARACTER_SETS.SPECIAL_CHARS;
  if (includeTurkishGerman) characterPool += CHARACTER_SETS.TURKISH_GERMAN;
  if (includeEmoji) characterPool += CHARACTER_SETS.EMOJI; // Yeni ekleme
  if (includeSpaces) characterPool += ' ';

  // Existing logic...
}
```

### UI Geliştirme Örneği
```html
<!-- popup.html'e yeni seçenek ekleyin -->
<label class="radio-wrapper">
  <input type="radio" name="textType" value="emoji">
  <span class="radio-label">With Emoji (😀🚀💡...)</span>
</label>
```

```javascript
// popup.js'de handler ekleyin
switch (textType) {
  // Existing cases...
  case 'emoji':
    generatedText = generateWithEmoji(length);
    break;
}
```

### Test Ekleme Örneği
```javascript
// tests/func-tests.js
testRunner.test('generateWithEmoji should contain emoji characters', () => {
  const result = generateWithEmoji(100);
  
  testRunner.assertLength(result, 100, 'Should return exact length');
  testRunner.assertMatch(result, /[😀😃😄😁😆😊😎🤔🎉🚀💡]/, 
    'Should contain emoji characters');
  
  const hasEmoji = /[😀😃😄😁😆😊😎🤔🎉🚀💡]/.test(result);
  const hasAlphabetical = /[a-zA-Z]/.test(result);
  
  testRunner.assertTrue(hasEmoji || hasAlphabetical, 
    'Should contain emoji or alphabetical characters');
});

testRunner.test('generateWithEmoji should handle different lengths', () => {
  testRunner.assertLength(generateWithEmoji(1), 1, 'Length 1');
  testRunner.assertLength(generateWithEmoji(1000), 1000, 'Length 1000');
});
```

## 📤 Pull Request Süreci

### 1. PR Hazırlığı
```bash
# Upstream'den son değişiklikleri alın
git fetch upstream
git checkout main
git merge upstream/main

# Feature branch'inizi güncelleyin
git checkout feature/your-feature
git rebase main

# Testleri çalıştırın
npm test
npm run lint
```

### 2. PR Template
```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] 🐛 Bug fix
- [ ] ✨ New feature  
- [ ] 💥 Breaking change
- [ ] 📚 Documentation update
- [ ] 🧪 Test improvements
- [ ] 🎨 UI/UX improvements

## Changes Made
- Detailed list of changes
- Why these changes were necessary
- How the implementation works

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing completed
- [ ] Browser compatibility tested
- [ ] Performance impact assessed

## Screenshots
Include UI changes if applicable

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] Tests pass locally
```

### 3. PR Review Process
1. **Automated checks**: ESLint, tests
2. **Code review**: Maintainer review
3. **Discussion**: Feedback ve değişiklikler
4. **Approval**: Final approval
5. **Merge**: Squash and merge

## 🧪 Test Writing Guidelines

### Test Organization
```javascript
// tests/your-feature-tests.js
console.log('🧪 Your Feature tests loading...');

// Group related tests
testRunner.test('Feature basic functionality', () => {
  // Basic test
});

testRunner.test('Feature edge cases', () => {
  // Edge case tests
});

testRunner.test('Feature performance', () => {
  // Performance tests
});

console.log('✅ Your Feature tests loaded');
```

### Performance Testing
```javascript
testRunner.test('New feature should be performant', () => {
  const iterations = 100;
  const length = 1000;
  
  const start = performance.now();
  
  for (let i = 0; i < iterations; i++) {
    newFeatureFunction(length);
  }
  
  const end = performance.now();
  const averageTime = (end - start) / iterations;
  
  testRunner.assertTrue(averageTime < 5, 
    `Should be fast (< 5ms), got ${averageTime.toFixed(2)}ms`);
});
```

### UI Testing
```javascript
testRunner.test('UI should handle new feature', () => {
  const { mockElements, cleanup } = createMockDOM();
  
  try {
    // Simulate user interaction
    mockElements.newFeatureButton.click();
    
    // Assert expected behavior
    testRunner.assertEqual(mockElements.result.value, expectedValue);
  } finally {
    cleanup();
  }
});
```

## 📚 Dokümantasyon Katkıları

### API Documentation
```markdown
### `newFunction(parameter)`

Description of the function.

**Parameters:**
- `parameter` (type): Description of parameter

**Returns:** `type` - Description of return value

**Example:**
```javascript
const result = newFunction('example');
console.log(result); // Expected output
```

**Since:** Version 1.2.0
```

### User Documentation
- Clear, step-by-step instructions
- Screenshots for UI changes
- Real-world use cases
- Troubleshooting tips

### Developer Documentation  
- Architecture decisions
- Code examples
- Performance considerations
- Testing strategies

## 🐛 Bug Reporting Guidelines

### Bug Report Template
```markdown
## Bug Description
Clear, concise description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior
What you expected to happen

## Actual Behavior  
What actually happened

## Screenshots
If applicable, add screenshots

## Environment
- Chrome Version: [e.g. 91.0.4472.124]
- OS: [e.g. Windows 10, macOS 11.4]
- Extension Version: [e.g. 1.0.0]

## Console Errors
Any error messages from F12 → Console

## Additional Context
Any other context about the problem
```

### Bug Investigation
```javascript
// Debug helpers
console.log('Debug info:', {
  chromeVersion: navigator.userAgent.match(/Chrome\/([0-9.]+)/)[1],
  extensionVersion: chrome.runtime.getManifest().version,
  timestamp: new Date().toISOString(),
  parameters: debugParameters
});

// Error boundaries
try {
  riskyOperation();
} catch (error) {
  console.error('Operation failed:', {
    error: error.message,
    stack: error.stack,
    context: currentContext
  });
}
```

## 🏆 Recognition

### Contributors Hall of Fame
Katkıda bulunanlar README'de yer alır:
```markdown
## Contributors
- @username - Feature X implementation
- @username2 - Bug fixes and testing  
- @username3 - Documentation improvements
```

### Contribution Rewards
- 🌟 GitHub stars
- 📢 Social media mentions
- 🎖️ Special contributor badge
- 🤝 Networking opportunities

## 📞 İletişim

### Development Discussions
- **GitHub Issues**: Teknik tartışmalar
- **Discord**: Real-time chat (isteğe bağlı)
- **Email**: Özel konular için

### Code Review Process
- **Response time**: 48 saat içinde initial feedback
- **Review criteria**: Functionality, style, tests, docs
- **Iteration**: Feedback döngüsü ile iyileştirme

### Maintainer Guidelines
- **Welcoming**: Yeni katkıcıları destekle
- **Constructive**: Yapıcı feedback ver
- **Patient**: Öğrenme sürecine saygı göster
- **Appreciative**: Her katkıyı takdir et

---

**Katkıda bulunmaya hazır mısınız?** [Issues sayfası](https://github.com/sevilayerkan/test-string-extention/issues)ndan başlayın veya yeni bir özellik önerisinde bulunun! 🚀