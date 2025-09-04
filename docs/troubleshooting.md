# 🛠️ Sorun Giderme

Test String Generator ile karşılaşabileceğiniz yaygın sorunlar ve çözümleri.

## 🚨 Acil Durum Kontrol Listesi

Herhangi bir sorunla karşılaştığınızda önce şunları deneyin:

1. **Chrome'u yeniden başlatın**
2. **Extension'ı devre dışı bırakıp tekrar etkinleştirin**
3. **Chrome'un güncel olduğunu kontrol edin**
4. **Extension'ın son sürümde olduğunu doğrulayın**
5. **Hata konsolu mesajlarını kontrol edin** (`F12` → `Console`)

## 🔧 Kurulum Sorunları

### Sorun: "Paket geçersiz" hatası
**Belirtiler:**
- Extension yükleme sırasında hata
- "Package is invalid" mesajı
- Yükleme işlemi tamamlanmıyor

**Çözümler:**
```bash
# 1. Dosya bütünlüğünü kontrol edin
ls -la manifest.json   # Dosya var mı?
cat manifest.json      # İçerik doğru mu?

# 2. Folder yapısını kontrol edin
ls -la src/js/         # JavaScript dosyaları var mı?
ls -la assets/         # Icon dosyaları var mı?

# 3. Manifest v3 uyumluluğunu kontrol edin
grep "manifest_version" manifest.json  # 3 olmalı
```

**Adım adım çözüm:**
1. Proje klasörünün tamamını tekrar indirin
2. `manifest.json` dosyasının JSON formatında geçerli olduğunu kontrol edin
3. Gerekli dosyaların eksik olmadığını doğrulayın
4. Ana proje klasörünü seçtiğinizden emin olun (alt klasör değil)

### Sorun: Extension simgesi görünmüyor
**Belirtiler:**
- Extension yüklendi ama simge yok
- Chrome araç çubuğunda görünmüyor
- Popup açılmıyor

**Çözümler:**
1. **Puzzle simgesini kontrol edin:**
   - Chrome araç çubuğunda puzzle (🧩) simgesine tıklayın
   - Test String Generator'ı bulun
   - Pin (📌) simgesine tıklayarak sabitleyin

2. **Extension listesini kontrol edin:**
   ```
   chrome://extensions/ → Test String Generator → Etkin olduğunu doğrulayın
   ```

3. **Icon dosyalarını kontrol edin:**
   ```bash
   ls assets/icon*.png
   # icon16.png, icon32.png, icon48.png, icon128.png olmalı
   ```

### Sorun: "Uzantı yüklenemedi" hatası
**Belirtiler:**
- Chrome hata veriyor
- Yükleme işlemi başarısız oluyor
- Geliştirici modu aktif olmasına rağmen yüklemiyor

**Çözümler:**
1. **Chrome sürümünü kontrol edin:**
   ```
   chrome://version/ → Version 88+ olmalı
   ```

2. **Geliştirici modunu yeniden aktifleştirin:**
   ```
   chrome://extensions/ → Geliştirici modu → Kapat → Aç
   ```

3. **Diğer extension'ları geçici olarak devre dışı bırakın:**
   - Çakışma olup olmadığını test edin

4. **Chrome profili temizliği:**
   ```
   chrome://settings/ → Advanced → Reset and clean up
   ```

## 💻 İşlevsellik Sorunları

### Sorun: Popup açılmıyor
**Belirtiler:**
- Extension simgesine tıklama sonuç vermiyor
- Popup penceresi belirmiyor
- Hiçbir tepki yok

**Çözümler:**
1. **Konsol hatalarını kontrol edin:**
   ```javascript
   // F12 → Console
   // Kırmızı hata mesajları var mı?
   ```

2. **Extension detaylarını kontrol edin:**
   ```
   chrome://extensions/ → Test String Generator → Details → Extension options
   ```

3. **JavaScript dosyalarını kontrol edin:**
   ```bash
   ls src/js/
   # func.js, popup.js, copy.js, misc.js olmalı
   ```

4. **HTML dosyasını kontrol edin:**
   ```bash
   cat popup.html | head -10  # Geçerli HTML formatında mı?
   ```

### Sorun: Metin üretilmiyor
**Belirtiler:**
- Generate butonuna basıldığında hiçbir şey olmuyor
- Textarea boş kalıyor
- Hata mesajı görünmüyor

**Çözümler:**
1. **Fonksiyon erişimini test edin:**
   ```javascript
   // Console'da test edin
   console.log(typeof window.generateAlphanumerical);
   // "function" dönmeli
   ```

2. **Character sets yüklenmesini kontrol edin:**
   ```javascript
   console.log(window.CHARACTER_SETS);
   // Object with ALPHABETICAL, NUMERICAL, etc.
   ```

3. **Input validation kontrolü:**
   ```javascript
   // Geçerli length girildi mi?
   const length = parseInt(document.getElementById('lengthInput').value);
   console.log('Length:', length, 'Valid:', !isNaN(length) && length > 0);
   ```

4. **Hızlı test:**
   ```javascript
   // Console'da manual test
   const result = window.generateAlphanumerical(10);
   console.log('Test result:', result);
   ```

### Sorun: Kopyalama çalışmıyor
**Belirtiler:**
- "Copy to Clipboard" butonuna basıldığında çalışmıyor
- "Failed to copy" hata mesajı
- Clipboard'a hiçbir şey kopyalanmıyor

**Çözümler:**
1. **Clipboard API desteğini kontrol edin:**
   ```javascript
   console.log('Clipboard API:', !!navigator.clipboard);
   // true dönmeli
   ```

2. **HTTPS gerekliliği:**
   - Extension'lar için gerekli değil ama test ederken dikkat edin
   - `chrome://` veya `https://` protokolünde test edin

3. **Permission kontrolü:**
   ```json
   // manifest.json kontrol edin
   "permissions": [
     "clipboardRead",
     "clipboardWrite"
   ]
   ```

4. **Browser uyumluluğu:**
   ```javascript
   // Fallback yöntemi
   if (!navigator.clipboard) {
     // Eski tarayıcılar için alternatif method
     console.warn('Clipboard API not supported');
   }
   ```

### Sorun: Karakter sayıcısı çalışmıyor
**Belirtiler:**
- Counter sekmesinde sayımlar güncellenmiyor
- "Characters: 0 | Words: 0 | Lines: 0" sabit kalıyor
- Textarea'ya yazıldığında tepki yok

**Çözümler:**
1. **Event listener kontrolü:**
   ```javascript
   // Console'da kontrol edin
   const textarea = document.getElementById('counterText');
   console.log('Textarea found:', !!textarea);
   console.log('Event listeners:', getEventListeners(textarea));
   ```

2. **Function erişimi:**
   ```javascript
   // initializeCharacterCounter çağrıldı mı?
   console.log(typeof initializeCharacterCounter);
   ```

3. **DOM element kontrolü:**
   ```javascript
   const counterElement = document.getElementById('characterCount');
   console.log('Counter element:', !!counterElement);
   ```

## ⚡ Performans Sorunları

### Sorun: Çok yavaş metin üretimi
**Belirtiler:**
- Büyük metinler için uzun bekleme süresi
- Browser donuyor veya çok yavaşlıyor
- Memory kullanımı aşırı yüksek

**Çözümler:**
1. **Batch boyutunu azaltın:**
   ```javascript
   // 100,000+ karakter için batch processing
   function generateInBatches(totalLength, batchSize = 10000) {
     let result = '';
     for (let i = 0; i < totalLength; i += batchSize) {
       const currentBatch = Math.min(batchSize, totalLength - i);
       result += generateAlphanumerical(currentBatch);
       
       // Browser'ın nefes almasını sağlayın
       if (i % (batchSize * 5) === 0) {
         setTimeout(() => {}, 0);
       }
     }
     return result;
   }
   ```

2. **Memory kullanımını kontrol edin:**
   ```javascript
   // Performance.memory API
   if (performance.memory) {
     console.log('Memory usage:', {
       used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024) + 'MB',
       limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024) + 'MB'
     });
   }
   ```

3. **Alternatif yaklaşım - Web Worker:**
   ```javascript
   // Ağır işlemler için Web Worker kullanın
   const worker = new Worker('text-generator-worker.js');
   worker.postMessage({ type: 'generate', length: 100000 });
   worker.onmessage = (e) => {
     document.getElementById('resultText').value = e.data.result;
   };
   ```

### Sorun: Memory leak
**Belirtiler:**
- Uzun kullanım sonrası Chrome yavaşlıyor
- Memory kullanımı sürekli artıyor
- Diğer sekmeler etkileniyor

**Çözümler:**
1. **Cache temizliği:**
   ```javascript
   // Cache boyutunu sınırlayın
   if (cache.size > 100) {
     cache.clear(); // veya LRU eviction
   }
   ```

2. **Event listener temizliği:**
   ```javascript
   // Component unmount sırasında
   function cleanup() {
     removeEventListeners();
     clearIntervals();
     clearTimeouts();
   }
   ```

3. **Large object references:**
   ```javascript
   // Büyük string'leri null yapın
   let largeText = generateHugeText();
   // ... kullanım sonrası
   largeText = null;
   ```

## 🌐 Tarayıcı Uyumluluk Sorunları

### Chrome Specific Issues
**Chrome 88+ gereksinimi:**
```javascript
// Chrome version kontrolü
const chromeVersion = /Chrome\/([0-9.]+)/.exec(navigator.userAgent);
if (chromeVersion && parseInt(chromeVersion[1]) < 88) {
  console.warn('Chrome 88+ required for optimal experience');
}
```

### Edge Chromium Issues
**Edge'de çalışmıyor:**
```javascript
// Edge detection
const isEdge = navigator.userAgent.indexOf('Edg/') > -1;
if (isEdge) {
  // Edge specific fixes
  console.log('Running on Edge');
}
```

### Firefox Compatibility
**Firefox'ta çalışmıyor:**
```
Not supported: Firefox uses different extension system (WebExtensions)
Extension specifically designed for Chromium-based browsers
```

## 🔐 İzin ve Güvenlik Sorunları

### Sorun: Clipboard permission denied
**Belirtiler:**
- Clipboard erişim hatası
- Permission denied mesajları
- Kopyalama çalışmıyor

**Çözümler:**
1. **Site izinlerini kontrol edin:**
   ```
   chrome://settings/content/clipboard
   Ask before accessing (recommended) seçili olmalı
   ```

2. **Extension permissions:**
   ```json
   // manifest.json kontrolü
   "permissions": [
     "clipboardRead",
     "clipboardWrite"  
   ]
   ```

3. **User gesture requirement:**
   ```javascript
   // Clipboard API user interaction gerektirir
   button.addEventListener('click', async () => {
     try {
       await navigator.clipboard.writeText(text);
     } catch (err) {
       console.error('Clipboard error:', err);
     }
   });
   ```

### Sorun: Content Security Policy
**Belirtiler:**
- CSP violation hataları
- Inline scripts çalışmıyor
- External resources yüklenmiyor

**Çözümler:**
1. **Manifest v3 CSP:**
   ```json
   // manifest.json - default CSP strict
   {
     "manifest_version": 3,
     "content_security_policy": {
       "extension_pages": "script-src 'self'; object-src 'self'"
     }
   }
   ```

2. **Inline script alternative:**
   ```javascript
   // popup.html - inline scripts yasak
   // ❌ <script>console.log('test');</script>
   // ✅ <script src="script.js"></script>
   ```

## 📱 Platform Specific Sorunları

### Windows Issues
**Windows'ta çalışmıyor:**
```bash
# Path separator sorunları
# ❌ src\js\func.js  
# ✅ src/js/func.js

# File permission sorunları
chmod +x install.sh  # Git Bash'te
```

### macOS Issues
**macOS'ta yavaş performans:**
```bash
# Gatekeeper interference kontrol edin
spctl --status

# Chrome process priority
ps aux | grep chrome
```

### Linux Issues
**Linux'ta icon sorunları:**
```bash
# Icon format kontrol edin
file assets/icon*.png
# PNG format olmalı

# Dependencies
sudo apt-get install chromium-browser  # Ubuntu
```

## 🧪 Hata Ayıklama Araçları

### Development Console
```javascript
// Debug mode aktifleştirme
localStorage.setItem('debug', 'true');

// Hata tracking
window.onerror = (message, source, lineno, colno, error) => {
  console.error('Global error:', {
    message, source, lineno, colno, error
  });
};
```

### Network Monitoring
```javascript
// Eğer extension network request yapıyorsa
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    console.log('Request:', details.url);
  },
  { urls: ["<all_urls>"] }
);
```

### Performance Profiling
```javascript
// Performance measuring
const start = performance.now();
generateLargeText(100000);
const end = performance.now();
console.log(`Generation took ${end - start} milliseconds`);

// Memory profiling
console.log('Memory:', performance.memory);
```

## 🆘 Acil Yardım

### Hızlı Reset Prosedürü
```bash
# 1. Extension'ı tamamen kaldır
chrome://extensions/ → Remove

# 2. Chrome cache temizle  
chrome://settings/clearBrowserData

# 3. Yeni kurulum
git clone https://github.com/sevilayerkan/test-string-extention.git
cd test-string-extention

# 4. Test
npm test
```

### Emergency Recovery
**Eğer hiçbir şey çalışmıyorsa:**

1. **Safe Mode'da Chrome başlat:**
   ```bash
   chrome --disable-extensions
   ```

2. **New Profile oluştur:**
   ```bash
   chrome --user-data-dir=./test-profile
   ```

3. **Manual function test:**
   ```javascript
   // test-quick-check.html açın
   // Basic functionality kontrol edin
   ```

### Destek Kanalları
**Yardım almak için:**
- 📧 **GitHub Issues**: Detaylı bug report açın
- 💬 **Developer Contact**: Discord üzerinden iletişim
- 📖 **Documentation**: docs/ klasöründeki rehberleri inceleyin
- 🧪 **Test Suite**: test-all.html ile sistem durumunu kontrol edin

---

**Sorun devam ederse:** Lütfen hata mesajları, Chrome version, işletim sistemi ve adım adım ne yaptığınız bilgileriyle GitHub Issues açın!