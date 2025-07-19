// Internationalization (i18n) System
class I18n {
  constructor() {
    this.currentLanguage = 'en';
    this.translations = {
      en: {
        // App
        'app-title': 'Test String Generator',
        'loading': 'Loading...',
        
        // Tabs
        'tab-generator': 'Generator',
        'tab-counter': 'Counter',
        'tab-misc': 'Misc',
        
        // Generator
        'placeholder-length': 'Text Length',
        'unit-characters': 'Characters',
        'unit-words': 'Words',
        'label-remove-punct': 'Remove Punctuation',
        'label-remove-space': 'Remove Spaces',
        'btn-generate': 'Generate Text',
        'placeholder-result': 'Generated text will appear here...',
        'btn-copy': 'Copy to Clipboard',
        
        // Counter
        'placeholder-counter': 'Enter or paste your text here...',
        'stats-chars': 'Characters',
        'stats-words': 'Words',
        'stats-lines': 'Lines',
        'stats-sentences': 'Sentences',
        'stats-paragraphs': 'Paragraphs',
        
        // Misc
        'select-data-type': 'Select Data Type',
        'option-name': 'Full Name',
        'option-email': 'Email',
        'option-address': 'Address',
        'option-password': 'Password',
        'gender-male': 'Male',
        'gender-female': 'Female',
        'domain-random': 'Random Domain',
        'domain-custom': 'Custom Domain',
        'placeholder-custom-domain': 'Enter custom domain',
        'bulk-count': 'Count',
        'bulk-format': 'Format',
        'format-plain': 'Plain Text',
        'format-json': 'JSON',
        'format-json-id': 'JSON with ID',
        
        // Settings
        'settings-title': 'Settings',
        'setting-theme': 'Theme',
        'theme-light': 'Light',
        'theme-dark': 'Dark',
        'setting-language': 'Language',
        'setting-support': 'Support',
        'support-coffee': 'Buy Me a Coffee',
        'support-github': 'GitHub',
        
        // Messages
        'msg-copied': 'Copied to clipboard!',
        'msg-copy-failed': 'Failed to copy to clipboard',
        'msg-no-text': 'No text to copy',
        'msg-invalid-length': 'Please enter a valid positive number for length',
        'msg-max-length': 'Maximum length is 999,999 characters',
        'msg-select-type': 'Please select a data type',
        'msg-loading-error': 'Error loading data'
      },
      
      tr: {
        // App
        'app-title': 'Test Metin Üreteci',
        'loading': 'Yükleniyor...',
        
        // Tabs
        'tab-generator': 'Üretici',
        'tab-counter': 'Sayaç',
        'tab-misc': 'Diğer',
        
        // Generator
        'placeholder-length': 'Metin Uzunluğu',
        'unit-characters': 'Karakter',
        'unit-words': 'Kelime',
        'label-remove-punct': 'Noktalama İşaretlerini Kaldır',
        'label-remove-space': 'Boşlukları Kaldır',
        'btn-generate': 'Metin Üret',
        'placeholder-result': 'Üretilen metin burada görünecek...',
        'btn-copy': 'Panoya Kopyala',
        
        // Counter
        'placeholder-counter': 'Metninizi buraya girin veya yapıştırın...',
        'stats-chars': 'Karakter',
        'stats-words': 'Kelime',
        'stats-lines': 'Satır',
        'stats-sentences': 'Cümle',
        'stats-paragraphs': 'Paragraf',
        
        // Misc
        'select-data-type': 'Veri Türü Seçin',
        'option-name': 'Tam İsim',
        'option-email': 'E-posta',
        'option-address': 'Adres',
        'option-password': 'Şifre',
        'gender-male': 'Erkek',
        'gender-female': 'Kadın',
        'domain-random': 'Rastgele Domain',
        'domain-custom': 'Özel Domain',
        'placeholder-custom-domain': 'Özel domain girin',
        'bulk-count': 'Adet',
        'bulk-format': 'Format',
        'format-plain': 'Düz Metin',
        'format-json': 'JSON',
        'format-json-id': 'ID\'li JSON',
        
        // Settings
        'settings-title': 'Ayarlar',
        'setting-theme': 'Tema',
        'theme-light': 'Açık',
        'theme-dark': 'Koyu',
        'setting-language': 'Dil',
        'setting-support': 'Destek',
        'support-coffee': 'Bana Kahve Ismarla',
        'support-github': 'GitHub',
        
        // Messages
        'msg-copied': 'Panoya kopyalandı!',
        'msg-copy-failed': 'Panoya kopyalama başarısız',
        'msg-no-text': 'Kopyalanacak metin yok',
        'msg-invalid-length': 'Lütfen uzunluk için geçerli pozitif bir sayı girin',
        'msg-max-length': 'Maksimum uzunluk 999.999 karakterdir',
        'msg-select-type': 'Lütfen bir veri türü seçin',
        'msg-loading-error': 'Veri yükleme hatası'
      }
    };
    
    this.initialize();
  }
  
  async initialize() {
    // Load saved language from storage
    try {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        const result = await chrome.storage.sync.get(['language']);
        if (result.language) {
          this.currentLanguage = result.language;
        }
      } else {
        // Fallback to localStorage for development
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
          this.currentLanguage = savedLanguage;
        }
      }
    } catch (error) {
      console.warn('Failed to load language preference:', error);
    }
    
    this.updateUI();
  }
  
  translate(key, fallback = '') {
    const translation = this.translations[this.currentLanguage]?.[key] || 
                       this.translations['en']?.[key] || 
                       fallback || 
                       key;
    return translation;
  }
  
  async setLanguage(lang) {
    if (this.translations[lang]) {
      this.currentLanguage = lang;
      
      // Save to storage
      try {
        if (typeof chrome !== 'undefined' && chrome.storage) {
          await chrome.storage.sync.set({ language: lang });
        } else {
          // Fallback to localStorage for development
          localStorage.setItem('language', lang);
        }
      } catch (error) {
        console.warn('Failed to save language preference:', error);
      }
      
      this.updateUI();
      
      // Dispatch event for other components
      window.dispatchEvent(new CustomEvent('languageChanged', { 
        detail: { language: lang } 
      }));
    }
  }
  
  updateUI() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      element.textContent = this.translate(key);
    });
    
    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      element.placeholder = this.translate(key);
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = this.currentLanguage;
  }
  
  getCurrentLanguage() {
    return this.currentLanguage;
  }
  
  getSupportedLanguages() {
    return Object.keys(this.translations);
  }
}

// Create global instance
window.i18n = new I18n();

// Export for other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = I18n;
} 