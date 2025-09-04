# 👤 Kullanım Kılavuzu

Test String Generator Chrome Extension'ının detaylı kullanım rehberi.

## 🚀 İlk Başlangıç

### Extension'ı Açma
1. Chrome araç çubuğunda **Test String Generator** simgesine tıklayın
2. Popup penceresi açılır ve kullanıma hazırdır

### Ana Arayüz
Extension 3 ana sekmeden oluşur:
- **Generator**: Metin üretim araçları
- **Counter**: Karakter sayma araçları  
- **Misc**: Çeşitli veri üretim araçları

## 📝 Metin Üretimi (Generator Sekmesi)

### 1. Metin Tipi Seçimi

#### Lorem Ipsum
- **Ne işe yarar**: Geleneksel placeholder metin
- **Kullanım alanı**: Tasarım mockup'ları, içerik testleri
- **Özel seçenekler**:
  - ✅ Remove Punctuation: Noktalama işaretlerini kaldır
  - ✅ Remove Spaces: Boşlukları kaldır

**Örnek Çıktı**:
```
Lorem ipsum dolor sit amet, consectetur adipiscing elit...
```

#### Alfanumerik (abc123)
- **Ne işe yarar**: Sadece harf ve rakam kombinasyonu
- **Kullanım alanı**: Kullanıcı adları, ID'ler, kodlar
- **Özellik**: Boşluk içermez

**Örnek Çıktı**:
```
aB7k9mP2nQ5rX8cV1tY4wZ6sL3dF0gH
```

#### Özel Karakterler (,()%/+?*...)
- **Ne işe yarar**: Harf, rakam ve özel semboller
- **Kullanım alanı**: Form validation, güvenlik testleri
- **İçerir**: ,.()%/+?*-_=!@#$%^&*[]{}|;:'"<>~`

**Örnek Çıktı**:
```
a8#K(m9!P)n%Q/r+X?c*V-t=Y&w[Z]s{L}
```

#### Türkçe/Almanca Harfler (ö,ç,ş,ü...)
- **Ne işe yarar**: Uluslararası karakter testleri
- **Kullanım alanı**: Lokalizasyon testleri, çoklu dil desteği
- **İçerir**: ç,ğ,ı,ö,ş,ü,Ç,Ğ,I,Ö,Ş,Ü,ä,ö,ü,ß,Ä,Ö,Ü

**Örnek Çıktı**:
```
çağlık8Öğün2şütte4ıbağ7müßäl3
```

### 2. Metin Uzunluğu
- **Minimum**: 1 karakter
- **Maksimum**: 999,999 karakter
- **Girdi**: Sayısal değer girin

### 3. Metin Üretme
1. İstediğiniz metin tipini seçin
2. Karakter sayısını girin
3. **"Generate Text"** butonuna tıklayın
4. Üretilen metin textarea'da görünür

### 4. Metni Kopyalama
- **"Copy to Clipboard"** butonuna tıklayın
- Başarılı kopyalama durumunda yeşil onay mesajı görünür
- Hata durumunda kırmızı hata mesajı görünür

## 📊 Karakter Sayma (Counter Sekmesi)

### Kullanım
1. **Counter** sekmesine tıklayın
2. Textarea'ya istediğiniz metni yapıştırın veya yazın
3. Otomatik olarak sayımlar güncellenir

### Gösterilen İstatistikler
- **Characters**: Toplam karakter sayısı (boşluklar dahil)
- **Words**: Kelime sayısı
- **Lines**: Satır sayısı

### Canlı Güncelleme
- Yazdıkça veya yapıştırdıkça sayımlar otomatik güncellenir
- Boş metin için "-" gösterilir

## 🔧 Çeşitli Araçlar (Misc Sekmesi)

### Türkçe İsim Üretimi
1. **Data Type**: "Full Name" seçin
2. **Cinsiyet**: Erkek veya Kadın seçin
3. **Generate** butonuna tıklayın

### E-posta Adresi Üretimi
1. **Data Type**: "Email" seçin
2. **Domain**: 
   - Random Domain (rastgele)
   - example.com
   - test.com
   - Custom Domain (özel domain girin)
3. **Generate** butonuna tıklayın

### Adres Üretimi
1. **Data Type**: "Address" seçin
2. **Generate** butonuna tıklayın
3. Türkçe adres bilgileri üretilir

### Şifre Üretimi
1. **Data Type**: "Password" seçin
2. **Generate** butonuna tıklayın
3. Güvenli şifre üretilir

## 💡 Kullanım İpuçları

### Verimli Kullanım
- **Kısayol**: `Ctrl+C` ile kopyalama
- **Hızlı Erişim**: Extension simgesini araç çubuğuna sabitle
- **Toplu Üretim**: Büyük metinler için maksimum limiti kullan

### En İyi Uygulamalar
- **Test Data**: Gerçek verilerin yerine test verisi kullan
- **Güvenlik**: Üretilen şifreler sadece test amaçlı
- **Performans**: Çok büyük metinler sistem performansını etkileyebilir

### Yaygın Kullanım Senaryoları

#### Web Geliştirme
```javascript
// Lorem ipsum placeholder
const placeholder = "Lorem ipsum dolor sit amet...";

// Test kullanıcı adları
const username = "aB7k9mP2nQ5r";

// Form validation testi
const specialInput = "a8#K(m9!P)";
```

#### Tasarım ve Mockup
- Lorem ipsum içerik alanları için
- Farklı uzunluklarda başlıklar
- Karacter limiti testleri

#### Lokalizasyon Testi
- Türkçe karakter desteği kontrol
- Uzun metin taşması testi
- Özel karakter render kontrolü

#### Güvenlik Testi
- SQL injection test stringleri
- XSS payload testleri
- Input validation kontrolü

## ⚠️ Dikkat Edilmesi Gerekenler

### Limitler
- **Maksimum karakter**: 999,999
- **Browser bellek**: Çok büyük metinler tarayıcıyı yavaşlatabilir
- **Clipboard limiti**: Sistem clipboard'unun limitleri geçerli

### Güvenlik
- **Test amaçlı**: Üretilen veriler sadece test amaçlı
- **Gerçek veri değil**: Üretilen isim, adres bilgileri gerçek değil
- **Şifre kullanımı**: Üretilen şifreler gerçek hesaplar için kullanılmamalı

### Performans
- **Büyük metinler**: 100,000+ karakter için bekleme süresi olabilir
- **Çoklu tab**: Çok sayıda tab açık olduğunda performans etkilenebilir

## 🔄 Kısayollar

| İşlem | Kısayol |
|-------|---------|
| Metni kopyala | `Ctrl+C` (textarea seçili iken) |
| Tümünü seç | `Ctrl+A` (textarea'da) |
| Generator sekmesi | Extension açılışında varsayılan |
| Popup kapat | `Esc` |

## 🆘 Sorun Giderme

### "No text to copy" hatası
**Çözüm**: Önce metin üretin, sonra kopyalayın

### Çok yavaş üretim
**Çözüm**: Daha küçük karakter sayısı deneyin

### Popup kapanıyor
**Çözüm**: Extension simgesine tekrar tıklayın

### Kopyalama çalışmıyor
**Çözüm**: Tarayıcı izinlerini kontrol edin

Daha fazla sorun giderme için: [troubleshooting.md](troubleshooting.md)

---

**Sonraki adım**: [API Dokümantasyonu](api.md) ile gelişmiş kullanım öğrenin!