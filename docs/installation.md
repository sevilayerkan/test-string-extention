# 🔧 Kurulum Rehberi

Test String Generator Chrome Extension kurulum rehberi.

## 📦 Kurulum Seçenekleri

### 🛒 Chrome Web Store'dan Kurulum (Önerilen)

1. [Chrome Web Store sayfasına](https://chromewebstore.google.com/detail/test-string-generator/dncchfcbdengdgodhbjmakoaiildjigl) gidin
2. **"Chrome'a Ekle"** butonuna tıklayın
3. Açılan pencerede **"Uzantıyı Ekle"**yi onaylayın
4. Extension Chrome araç çubuğunda görünür

### 📥 Manuel Kurulum (Geliştiriciler için)

#### Adım 1: Dosyaları İndirin
```bash
# Git ile klonlama
git clone https://github.com/sevilayerkan/test-string-extention.git
cd test-string-extention

# Veya ZIP indir
# GitHub'dan "Code > Download ZIP" ile indirin
```

#### Adım 2: Chrome'da Geliştirici Modunu Aktifleştirin
1. Chrome'da `chrome://extensions/` adresine gidin
2. Sağ üst köşede **"Geliştirici modu"**nu aktifleştirin
3. **"Paketlenmemiş öğe yükle"** butonunu tıklayın
4. İndirdiğiniz projenin klasörünü seçin

#### Adım 3: Extension'ı Test Edin
1. Chrome araç çubuğunda extension simgesini bulun
2. Simgeye tıklayarak popup'ı açın
3. Test metni üretin ve kopyalayın

## ⚙️ Sistem Gereksinimleri

### Desteklenen Tarayıcılar
- ✅ **Google Chrome** (v88+)
- ✅ **Microsoft Edge** (Chromium tabanlı)
- ✅ **Opera** (Chromium tabanlı)
- ✅ **Brave Browser**
- ✅ **Vivaldi**

### Minimum Sistem Gereksinimleri
- **İşletim Sistemi**: Windows 7+, macOS 10.12+, Linux
- **RAM**: 1GB boş alan
- **Disk Alanı**: 5MB
- **İnternet**: Sadece kurulum için (çalışma offline)

## 🔐 İzinler ve Güvenlik

Extension aşağıdaki izinleri talep eder:

### Gerekli İzinler
- **`activeTab`**: Mevcut sekmeye erişim (kopyalama için)
- **`clipboardRead`**: Panoya okuma izni
- **`clipboardWrite`**: Panoya yazma izni

### Güvenlik Notları
- ✅ Extension tamamen offline çalışır
- ✅ Hiçbir veri toplanmaz veya gönderilmez
- ✅ Kişisel bilgilere erişim yoktur
- ✅ Açık kaynak kodlu, herkes inceleyebilir

## 🚨 Yaygın Kurulum Sorunları

### Sorun: "Paket geçersiz" hatası
**Çözüm**: 
- Tüm dosyaların indirildiğinden emin olun
- `manifest.json` dosyasının mevcut olduğunu kontrol edin
- Klasör içeriğini değil, ana klasörü seçin

### Sorun: Extension simgesi görünmüyor
**Çözüm**:
- Chrome araç çubuğunda puzzle simgesine tıklayın
- Extension'ı sabitlemek için pin simgesine tıklayın
- Chrome'u yeniden başlatın

### Sorun: "Uzantı yüklenemedi" hatası
**Çözüm**:
- Chrome'un güncel sürümde olduğunu kontrol edin
- Geliştirici modunun açık olduğunu doğrulayın
- Diğer extension'ları geçici olarak devre dışı bırakın

### Sorun: Popup açılmıyor
**Çözüm**:
- Extension simgesine sağ tıklayın > "Seçenekler"i kontrol edin
- Chrome'u tamamen kapatıp yeniden açın
- Extension'ı devre dışı bırakıp yeniden etkinleştirin

## 🔄 Güncelleme

### Chrome Web Store Sürümü
- Otomatik güncellenir
- Chrome'da `chrome://extensions/` > "Güncellemeleri kontrol et"

### Manuel Kurulum Sürümü
```bash
# Git ile güncelleme
git pull origin main

# Veya yeni ZIP indirin ve tekrar kurun
```

## 🗑️ Kaldırma

### Chrome Web Store'dan kurulan sürüm
1. `chrome://extensions/` adresine gidin
2. Test String Generator'ı bulun
3. **"Kaldır"** butonuna tıklayın

### Manuel kurulum sürümü
1. `chrome://extensions/` adresine gidin
2. Extension'ı bulun ve **"Kaldır"**ı tıklayın
3. Bilgisayarınızdan proje klasörünü silin

## ✅ Kurulum Doğrulama

Kurulumun başarılı olup olmadığını kontrol etmek için:

1. **Extension simgesi** araç çubuğunda görünüyor mu?
2. **Popup açılıyor** mu?
3. **Test metni üretilebiliyor** mu?
4. **Kopyalama çalışıyor** mu?
5. **Tüm metin tipleri** çalışıyor mu?

### Test Komutu
```bash
# Hızlı test için
npm test

# Veya test-quick-check.html dosyasını açın
```

## 📞 Destek

Kurulum sorunları için:
- 📧 GitHub Issues açın
- 💬 Developer ile iletişime geçin
- 📖 [Sorun Giderme](troubleshooting.md) rehberine bakın

---

**İpucu**: İlk kurulumdan sonra [Kullanım Kılavuzu](user-guide.md)na göz atın!