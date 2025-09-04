# 🔗 API Referansı

Test String Generator'ın tüm fonksiyon ve method referansı.

## 📚 İçindekiler

- [Temel Fonksiyonlar](#temel-fonksiyonlar)
- [Karakter Setleri](#karakter-setleri)
- [Yardımcı Fonksiyonlar](#yardımcı-fonksiyonlar)
- [UI Fonksiyonları](#ui-fonksiyonları)
- [Hata Yönetimi](#hata-yönetimi)

## 🎯 Temel Fonksiyonlar

### `generateLoremIpsum(length, removeSpace, removePunct)`

Lorem Ipsum metni üretir.

**Parametreler:**
- `length` (number): Üretilecek metin uzunluğu (1-999999)
- `removeSpace` (boolean): Boşlukları kaldır
- `removePunct` (boolean): Noktalama işaretlerini kaldır

**Dönüş:** `string` - Üretilen Lorem Ipsum metni

**Örnek:**
```javascript
// Temel kullanım
const lorem = generateLoremIpsum(100, false, false);
// "Lorem ipsum dolor sit amet, consectetur..."

// Boşluksuz
const noSpace = generateLoremIpsum(50, true, false);
// "Loremipsumdolorsitamet..."

// Noktalama işaretsiz
const noPunct = generateLoremIpsum(50, false, true);
// "Lorem ipsum dolor sit amet consectetur..."
```

---

### `generateAlphanumerical(length)`

Alfanumerik metin üretir (sadece harf ve rakam).

**Parametreler:**
- `length` (number): Üretilecek metin uzunluğu

**Dönüş:** `string` - Alfanumerik metin

**Örnek:**
```javascript
const alphanum = generateAlphanumerical(30);
// "aB7k9mP2nQ5rX8cV1tY4wZ6sL3dF0gH"

// Regex kontrolü
/^[a-zA-Z0-9]+$/.test(alphanum); // true
```

---

### `generateWithSpecialChars(length)`

Özel karakterler içeren metin üretir.

**Parametreler:**
- `length` (number): Üretilecek metin uzunluğu

**Dönüş:** `string` - Özel karakterli metin

**Örnek:**
```javascript
const special = generateWithSpecialChars(40);
// "a8#K(m9!P)n%Q/r+X?c*V-t=Y&w[Z]s{L}d2F"

// İçerik kontrolü
const hasSpecial = /[,.()%\/+?*\-_=!@#$%^&*\[\]{}|;:'"<>~`]/.test(special);
```

---

### `generateWithTurkishGerman(length)`

Türkçe ve Almanca karakterler içeren metin üretir.

**Parametreler:**
- `length` (number): Üretilecek metin uzunluğu

**Dönüş:** `string` - Türkçe/Almanca karakterli metin

**Örnek:**
```javascript
const turkish = generateWithTurkishGerman(50);
// "çağlık8Öğün2şütte4ıbağ7müßäl3kömür9"

// Türkçe karakter kontrolü
const hasTurkish = /[çğıöşüÇĞIÖŞÜäöüßÄÖÜ]/.test(turkish);
```

---

### `generateCustomText(length, options)`

Özelleştirilmiş metin üretir.

**Parametreler:**
- `length` (number): Üretilecek metin uzunluğu
- `options` (object): Üretim seçenekleri

**Options Object:**
```javascript
{
  includeAlphabetical: boolean,  // Harfleri dahil et (default: true)
  includeNumerical: boolean,     // Sayıları dahil et (default: false)
  includeSpecialChars: boolean,  // Özel karakterleri dahil et (default: false)
  includeTurkishGerman: boolean, // Türkçe/Almanca karakterleri dahil et (default: false)
  includeSpaces: boolean         // Boşlukları dahil et (default: true)
}
```

**Dönüş:** `string` - Özelleştirilmiş metin

**Örnek:**
```javascript
// Sadece sayılar
const numbers = generateCustomText(20, {
  includeAlphabetical: false,
  includeNumerical: true,
  includeSpaces: false
});
// "74926831075294638521"

// Karışık içerik
const mixed = generateCustomText(30, {
  includeAlphabetical: true,
  includeNumerical: true,
  includeSpecialChars: true,
  includeSpaces: true
});
// "aB8# K(m9! P)n%Q /r+X?c"
```

## 🎨 Karakter Setleri

### `CHARACTER_SETS`

Tüm karakter setlerini içeren global obje.

**Özellikler:**
```javascript
CHARACTER_SETS = {
  ALPHABETICAL: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  NUMERICAL: '0123456789',
  SPECIAL_CHARS: ',.()%/+?*-_=!@#$%^&*[]{}|;:\'\"<>~`',
  TURKISH_GERMAN: 'çğıöşüÇĞIÖŞÜäöüßÄÖÜ'
}
```

**Kullanım:**
```javascript
// Karakter seti kontrolü
const hasLetter = CHARACTER_SETS.ALPHABETICAL.includes('a'); // true
const hasNumber = CHARACTER_SETS.NUMERICAL.includes('5'); // true
const hasSpecial = CHARACTER_SETS.SPECIAL_CHARS.includes('@'); // true
const hasTurkish = CHARACTER_SETS.TURKISH_GERMAN.includes('ç'); // true

// Karakter sayıları
console.log(CHARACTER_SETS.ALPHABETICAL.length); // 52
console.log(CHARACTER_SETS.NUMERICAL.length); // 10
console.log(CHARACTER_SETS.SPECIAL_CHARS.length); // 31
console.log(CHARACTER_SETS.TURKISH_GERMAN.length); // 17
```

## 🔧 Yardımcı Fonksiyonlar

### Regex Patterns

**PUNCTUATION_REGEX**
```javascript
const PUNCTUATION_REGEX = /[.,\/#!$%\^&\*;:{}=\-_`~()]/g;

// Kullanım
const text = "Hello, world!";
const noPunct = text.replace(PUNCTUATION_REGEX, '');
// "Hello world"
```

**WHITESPACE_REGEX**
```javascript
const WHITESPACE_REGEX = /\s+/g;

// Kullanım  
const text = "Hello   world  !";
const noSpace = text.replace(WHITESPACE_REGEX, '');
// "Helloworld!"
```

## 🖥️ UI Fonksiyonları

### Tab Yönetimi

**`initializeTabs()`**
Sekme geçişlerini başlatır.

```javascript
function initializeTabs() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Tab switching logic
    });
  });
}
```

### Karakter Sayıcı

**`initializeCharacterCounter()`**
Canlı karakter sayıcıyı başlatır.

```javascript
function initializeCharacterCounter() {
  const counterText = document.getElementById('counterText');
  const characterCount = document.getElementById('characterCount');

  function updateCount() {
    const text = counterText.value;
    const chars = text.length;
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const lines = text.trim() === '' ? '-' : text.split('\n').length;

    characterCount.textContent = 
      `Characters: ${chars} | Words: ${words} | Lines: ${lines}`;
  }

  counterText.addEventListener('input', updateCount);
}
```

### Metin Tipi Kontrolü

**`initializeTextTypeControls()`**
Metin tipi seçim kontrollerini başlatır.

```javascript
function initializeTextTypeControls() {
  const textTypeRadios = document.querySelectorAll('input[name="textType"]');
  const loremOptions = document.getElementById('loremOptions');

  function toggleLoremOptions() {
    const selectedType = document.querySelector('input[name="textType"]:checked').value;
    loremOptions.style.display = selectedType === 'lorem' ? 'block' : 'none';
  }
}
```

### Kopyalama Fonksiyonu

**`copyToClipboard()`**
Metni panoya kopyalar.

```javascript
function copyToClipboard() {
  const resultText = document.getElementById('resultText').value;
  if (!resultText.trim()) {
    showFeedback('No text to copy', 'error');
    return;
  }
  
  navigator.clipboard
    .writeText(resultText)
    .then(() => showFeedback('Copied to clipboard!', 'success'))
    .catch((err) => {
      console.error('Failed to copy: ', err);
      showFeedback('Failed to copy to clipboard', 'error');
    });
}
```

### Geri Bildirim Sistemi

**`showFeedback(message, type)`**
Kullanıcıya geri bildirim mesajı gösterir.

**Parametreler:**
- `message` (string): Gösterilecek mesaj
- `type` (string): Mesaj tipi ('success', 'error', 'info')

```javascript
function showFeedback(message, type) {
  const feedbackElement = document.createElement('div');
  feedbackElement.textContent = message;
  feedbackElement.className = `feedback ${type}`;
  document.body.appendChild(feedbackElement);

  setTimeout(() => {
    feedbackElement.remove();
  }, 3000);
}
```

## ⚠️ Hata Yönetimi

### Girdi Validasyonu

**Uzunluk Kontrolleri:**
```javascript
// Geçersiz uzunluk kontrolü
if (isNaN(length) || length <= 0) {
  showFeedback('Please enter a valid positive number for length', 'error');
  return;
}

// Maksimum limit kontrolü
if (length > 999999) {
  showFeedback('Maximum length is 999,999 characters', 'error');
  return;
}
```

**Tip Kontrolleri:**
```javascript
// Fonksiyon varlığı kontrolü
if (typeof generateAlphanumerical !== 'function') {
  console.error('generateAlphanumerical function not found');
  return;
}

// Karakter seti kontrolü
if (!CHARACTER_SETS || !CHARACTER_SETS.ALPHABETICAL) {
  console.error('CHARACTER_SETS not properly loaded');
  return;
}
```

### Hata Kodları

| Hata Kodu | Açıklama | Çözüm |
|-----------|----------|--------|
| `INVALID_LENGTH` | Geçersiz uzunluk girişi | 1-999999 arası sayı girin |
| `FUNCTION_NOT_FOUND` | Fonksiyon bulunamadı | func.js dosyasının yüklendiğini kontrol edin |
| `CHARSET_ERROR` | Karakter seti hatası | CHARACTER_SETS tanımlı mı kontrol edin |
| `CLIPBOARD_ERROR` | Pano erişim hatası | Tarayıcı izinlerini kontrol edin |
| `DOM_ERROR` | DOM elementi bulunamadı | HTML yapısını kontrol edin |

### Hata Ayıklama

**Console Logging:**
```javascript
// Debug modunda detaylı loglar
if (window.DEBUG) {
  console.log('Generated text:', result);
  console.log('Character distribution:', analysis);
  console.log('Generation time:', time + 'ms');
}
```

**Performance Monitoring:**
```javascript
// Performans ölçümü
const start = performance.now();
const result = generateAlphanumerical(10000);
const end = performance.now();
console.log('Generation took:', (end - start).toFixed(2) + 'ms');
```

## 🔧 Global Erişim

Tüm fonksiyonlar `window` objesine bağlıdır:

```javascript
// Fonksiyon erişimi
window.generateLoremIpsum(100, false, false);
window.generateAlphanumerical(50);
window.generateWithSpecialChars(75);
window.generateWithTurkishGerman(60);
window.generateCustomText(40, options);

// Karakter seti erişimi
window.CHARACTER_SETS.ALPHABETICAL;
window.CHARACTER_SETS.NUMERICAL;
window.CHARACTER_SETS.SPECIAL_CHARS;
window.CHARACTER_SETS.TURKISH_GERMAN;
```

## 📊 Performans Notları

### Önerilen Limitler
- **Küçük metinler**: < 1,000 karakter (< 1ms)
- **Orta metinler**: 1,000 - 10,000 karakter (1-10ms)
- **Büyük metinler**: 10,000 - 100,000 karakter (10-100ms)
- **Çok büyük**: > 100,000 karakter (100ms+)

### Memory Kullanımı
- Her 1,000 karakter ≈ 2KB RAM
- 100,000 karakter ≈ 200KB RAM
- Tarayıcı limitlerine dikkat edin

---

**Sonraki**: [Geliştirici Rehberi](developer-guide.md) ile daha detaylı örnekler!