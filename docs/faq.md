# ❓ Sık Sorulan Sorular (FAQ)

Test String Generator hakkında en çok sorulan sorular ve cevapları.

## 🚀 Genel Sorular

### Soru: Test String Generator nedir?
**Cevap:** Test String Generator, geliştiricilerin ve test uzmanlarının çeşitli karakter setleriyle test metinleri üretmesine yardımcı olan bir Chrome Extension'ıdır. Lorem Ipsum, alfanumerik, özel karakterler ve Türkçe/Almanca karakterlerle metin üretebilir.

### Soru: Neden bu aracı kullanmalıyım?
**Cevap:** 
- **Türkçe karakter desteği** - Diğer araçlarda bulunamayan ç,ğ,ı,ö,ş,ü desteği
- **Çoklu metin tipi** - 4 farklı karakter seti kombinasyonu
- **Offline çalışma** - İnternet bağlantısı gerektirmez
- **Privacy** - Hiçbir veri toplanmaz
- **Açık kaynak** - Şeffaf ve güvenilir

### Soru: Hangi tarayıcılarda çalışır?
**Cevap:**
- ✅ **Google Chrome** (v88+)
- ✅ **Microsoft Edge** (Chromium tabanlı)
- ✅ **Opera** (Chromium tabanlı) 
- ✅ **Brave Browser**
- ✅ **Vivaldi**
- ❌ Firefox (farklı extension sistemi)
- ❌ Safari (farklı extension sistemi)

### Soru: Ücretsiz mi?
**Cevap:** Evet, tamamen ücretsiz ve açık kaynak. GitHub'dan kaynak kodlarına erişebilir, katkıda bulunabilirsiniz.

## 🔧 Kurulum ve Kullanım

### Soru: Nasıl kurarım?
**Cevap:** İki yol var:
1. **Chrome Web Store'dan** (önerilen): [Buradan direkt kurun](https://chromewebstore.google.com/detail/test-string-generator/dncchfcbdengdgodhbjmakoaiildjigl)
2. **Manuel kurulum**: GitHub'dan indirin, `chrome://extensions/` → Geliştirici modu → Paketlenmemiş öğe yükle

### Soru: Extension simgesi nerede?
**Cevap:** Chrome araç çubuğunda puzzle (🧩) simgesine tıklayın, Test String Generator'ı bulup pin (📌) ile sabitleyin.

### Soru: Offline çalışır mı?
**Cevap:** Evet! Kurulduktan sonra internet bağlantısı gerektirmez. Tüm işlemler yerel olarak yapılır.

### Soru: Hangi işletim sistemlerinde çalışır?
**Cevap:** Chrome çalıştığı her yerde:
- ✅ Windows 7+
- ✅ macOS 10.12+
- ✅ Linux (Ubuntu, Fedora, etc.)
- ✅ ChromeOS

## 📝 Metin Üretimi

### Soru: Kaç farklı metin tipi üretebilir?
**Cevap:** 4 ana tip:
1. **Lorem Ipsum** - Geleneksel placeholder metin
2. **Alfanumerik (abc123)** - Sadece harf ve rakam
3. **Özel Karakterler** - Semboller dahil (,()%/+?*...)
4. **Türkçe/Almanca** - Uluslararası karakterler (ç,ğ,ı,ö,ş,ü,ß...)

### Soru: Maksimum kaç karakter üretebilir?
**Cevap:** 999,999 karaktere kadar. Ancak çok büyük metinler için:
- 1K - 10K: Hızlı (1-10ms)
- 10K - 100K: Orta hız (10-100ms)  
- 100K+: Yavaş (100ms+)

### Soru: Üretilen metinler gerçekten rastgele mi?
**Cevap:** Evet, JavaScript'in `Math.random()` fonksiyonu kullanılır. Her üretimde farklı sonuç alırsınız. Test edilmiş ve doğrulanmıştır.

### Soru: Türkçe karakterler hangileri?
**Cevap:** Türkçe ve Almanca karakterler:
- **Türkçe**: ç, ğ, ı, ö, ş, ü (büyük-küçük)
- **Almanca**: ä, ö, ü, ß (büyük-küçük)
- Toplam 17 özel karakter

### Soru: Özel karakter listesi nedir?
**Cevap:** 31 özel karakter desteklenir:
```
, . ( ) % / + ? * - _ = ! @ # $ % ^ & * [ ] { } | ; : ' " < > ~ `
```

## ⚡ Performans

### Soru: Çok büyük metinler için yavaş, normal mi?
**Cevap:** Evet, normal. Performans hedefleri:
- **100 karakter**: < 1ms
- **1,000 karakter**: < 5ms
- **10,000 karakter**: < 20ms
- **100,000 karakter**: < 100ms
- **1,000,000 karakter**: < 1 saniye

### Soru: Memory (RAM) kullanımı nasıl?
**Cevap:** Her 1000 karakter yaklaşık 2KB RAM kullanır:
- 10K karakter ≈ 20KB RAM
- 100K karakter ≈ 200KB RAM
- 1M karakter ≈ 2MB RAM

### Soru: Browser'ımı yavaşlatır mı?
**Cevap:** Normal kullanımda hayır. Sadece 500K+ karakter üretirken geçici yavaşlama olabilir.

## 🔐 Güvenlik ve Privacy

### Soru: Verilerim toplanıyor mu?
**Cevap:** **Kesinlikle hayır!** 
- Hiçbir veri toplanmaz
- Hiçbir veri gönderilmez
- Network erişimi yok
- Tamamen local processing

### Soru: Üretilen metinleri saklıyor mu?
**Cevap:** Hayır. Üretilen metinler sadece ekranda görünür, hiçbir yerde saklanmaz. Browser kapatıldığında silinir.

### Soru: Hangi izinlere ihtiyacı var?
**Cevap:** Minimal izinler:
- `activeTab`: Mevcut sekmeye erişim (kopyalama için)
- `clipboardRead/Write`: Pano erişimi (kopyala/yapıştır için)
- Network, dosya, diğer sekmeler için izin yok

### Soru: Açık kaynak mu?
**Cevap:** Evet! GitHub'da tam kaynak kod mevcut:
```
https://github.com/sevilayerkan/test-string-extention
```

### Soru: Güvenli mi?
**Cevap:** Evet:
- ✅ Açık kaynak (kodlar incelenebilir)
- ✅ Minimal izinler
- ✅ Offline çalışma
- ✅ No data collection
- ✅ Chrome Web Store onayı

## 🧪 Test ve Kalite

### Soru: Test edildi mi?
**Cevap:** Evet, kapsamlı test edildi:
- **31 farklı test** senaryosu
- **Function testleri**: Tüm fonksiyonlar
- **UI testleri**: Arayüz etkileşimleri  
- **Performance testleri**: Hız ve memory
- **Browser testleri**: Çoklu tarayıcı

### Soru: Testleri nasıl çalıştırabilirim?
**Cevap:** Birkaç yol:
```bash
# Komut satırı
npm test

# Browser testleri
test-all.html açın      # Tam test paketi
test-quick-check.html   # Hızlı kontrol
```

### Soru: Bug bulursam ne yapmalıyım?
**Cevap:** GitHub Issues açın:
1. https://github.com/sevilayerkan/test-string-extention/issues
2. Detaylı açıklama yapın (hata mesajı, Chrome version, adımlar)
3. Mümkünse screenshot ekleyin

## 💻 Teknik Sorular

### Soru: Hangi teknolojiler kullanılmış?
**Cevap:**
- **Frontend**: HTML, CSS, Vanilla JavaScript
- **Chrome APIs**: Extension API, Clipboard API
- **Test**: Custom test framework
- **Build**: No build process (sadece static dosyalar)

### Soru: Manifest version?
**Cevap:** Manifest V3 (en son Chrome extension standardı)

### Soru: Dependencies var mı?
**Cevap:** Runtime dependencies yok. Sadece development için:
- ESLint (code linting)
- Prettier (code formatting)

### Soru: API'ye nasıl erişirim?
**Cevap:** Tüm fonksiyonlar global window'da:
```javascript
// Console'da kullanım
window.generateAlphanumerical(50);
window.generateWithSpecialChars(100);
window.CHARACTER_SETS.TURKISH_GERMAN;
```

### Soru: Kendi projemde kullanabilir miyim?
**Cevap:** Evet! MIT License ile:
```javascript
// func.js dosyasını projenize dahil edin
<script src="path/to/func.js"></script>

// Fonksiyonları kullanın
const text = generateAlphanumerical(100);
```

## 🔄 Güncelleme ve Bakım

### Soru: Otomatik güncellenir mi?
**Cevap:** 
- **Chrome Web Store**: Otomatik güncellenir
- **Manuel kurulum**: Git pull yaparak güncelleyebilirsiniz

### Soru: Yeni özellik eklenecek mi?
**Cevap:** Evet, roadmap'te planlar var:
- **v1.1**: Dark mode, export options, history
- **v1.2**: More languages, custom character sets
- **v2.0**: AI integration, cloud sync

### Soru: Feature request nasıl yapabilirim?
**Cevap:** GitHub Issues'da "Feature Request" etiketi ile açın veya developer ile doğrudan iletişime geçin.

## 🎯 Kullanım Senaryoları

### Soru: Hangi durumlarda kullanabilirim?
**Cevap:**
- **Web geliştirme**: Form testleri, validation kontrolleri
- **Tasarım**: Mockup'larda placeholder metinler
- **Test**: SQL injection, XSS test stringleri
- **Lokalizasyon**: Türkçe karakter uyumluluk testleri
- **Database**: Test verileri oluşturma
- **Security**: Password policy testleri

### Soru: SQL injection test için güvenli mi?
**Cevap:** Hayır! Bu araç test metni üretir, güvenlik testleri için özel araçlar kullanın. Üretilen metinler zararlı payloadlar içermez.

### Soru: Production'da kullanabilir miyim?
**Cevap:** Sadece test ve geliştirme için tasarlanmıştır. Production ortamında:
- Gerçek kullanıcı verileri kullanın
- Güvenlik testleri için uzman araçlar kullanın
- Performance impact'i göz önünde bulundurun

## 🔗 Entegrasyon

### Soru: API endpoint'i var mı?
**Cevap:** Hayır, sadece browser extension olarak çalışır. Ancak core fonksiyonları JavaScript projelerinizde kullanabilirsiniz.

### Soru: Node.js'de çalışır mı?
**Cevap:** Core fonksiyonlar evet, ama browser-specific parçalar (DOM, clipboard) çalışmaz. Adaptation gerekir.

### Soru: Diğer araçlarla entegre edebilir miyim?
**Cevap:** JavaScript fonksiyonları olarak kullanabilirsiniz:
```javascript
// Webpack/Browserify ile
import { generateAlphanumerical } from './func.js';

// AMD/RequireJS ile
require(['func'], function(textGen) {
  // kullanım
});
```

## ❗ Sorun Giderme

### Soru: Çalışmıyor, ne yapmalıyım?
**Cevap:** Sırasıyla:
1. Chrome'u yeniden başlatın
2. Extension'ı devre dışı bırak → tekrar etkinleştir  
3. `chrome://extensions/` → "Hataları kontrol et"
4. `F12` → Console'da hata mesajları var mı?
5. [Troubleshooting guide](troubleshooting.md) okuyun

### Soru: Performance sorunu yaşıyorum?
**Cevap:**
- Küçük metin miktarları deneyin (< 10K karakter)
- Diğer extension'ları geçici kapatın
- Chrome'da diğer sekmeleri kapatın
- Memory usage kontrol edin

### Soru: Copy to clipboard çalışmıyor?
**Cevap:**
- HTTPS sayfasında test edin (güvenlik gereksinimi)
- Chrome permissions'ları kontrol edin
- Diğer clipboard uygulamaları kapatın

## 📞 Destek

### Soru: Daha fazla yardım nasıl alabilirim?
**Cevap:**
- 📚 **Dokümantasyon**: `docs/` klasöründeki rehberler
- 🐛 **Bug Report**: GitHub Issues
- 💬 **Developer Contact**: Discord üzerinden
- 📧 **Email**: GitHub profile'daki email

### Soru: Katkıda bulunabilir miyim?
**Cevap:** Elbette!
- Code contributions: Pull request açın
- Bug reports: Issues açın  
- Documentation: Docs geliştirin
- Testing: Test senaryoları ekleyin
- Translation: Çoklu dil desteği

### Soru: Donation/Support?
**Cevap:** 
- ☕ [Buy Me a Coffee](https://buymeacoffee.com/notdepressedeveloper)
- ⭐ GitHub'da star verin
- 📢 Arkadaşlarınıza tavsiye edin
- 📝 Review yazın

---

**Sorunuz burada yok mu?** [GitHub Issues](https://github.com/sevilayerkan/test-string-extention/issues) açın veya developer ile iletişime geçin!