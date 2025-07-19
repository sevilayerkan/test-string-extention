// Settings Management System
class SettingsManager {
  constructor() {
    this.settings = {
      theme: 'light',
      language: 'en'
    };
    
    this.initialize();
  }
  
  async initialize() {
    await this.loadSettings();
    this.bindEvents();
    this.applyTheme();
  }
  
  async loadSettings() {
    try {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        const result = await chrome.storage.sync.get(['theme', 'language']);
        this.settings = {
          theme: result.theme || 'light',
          language: result.language || 'en'
        };
      } else {
        // Fallback to localStorage for development
        this.settings = {
          theme: localStorage.getItem('theme') || 'light',
          language: localStorage.getItem('language') || 'en'
        };
      }
    } catch (error) {
      console.warn('Failed to load settings:', error);
    }
  }
  
  async saveSettings() {
    try {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        await chrome.storage.sync.set(this.settings);
      } else {
        // Fallback to localStorage for development
        localStorage.setItem('theme', this.settings.theme);
        localStorage.setItem('language', this.settings.language);
      }
    } catch (error) {
      console.warn('Failed to save settings:', error);
    }
  }
  
  bindEvents() {
    // Settings button
    const settingsButton = document.getElementById('settingsButton');
    const settingsModal = document.getElementById('settingsModal');
    const closeSettings = document.getElementById('closeSettings');
    
    if (settingsButton) {
      settingsButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.openModal();
      });
    }
    
    // Close modal events
    closeSettings?.addEventListener('click', () => {
      this.closeModal();
    });
    
    // Remove click-outside-to-close since it's now fullscreen
    // settingsModal?.addEventListener('click', (e) => {
    //   if (e.target === settingsModal) {
    //     this.closeModal();
    //   }
    // });
    
    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && settingsModal?.classList.contains('active')) {
        this.closeModal();
      }
    });
    
    // Theme buttons
    const lightTheme = document.getElementById('lightTheme');
    const darkTheme = document.getElementById('darkTheme');
    
    lightTheme?.addEventListener('click', () => {
      this.setTheme('light');
    });
    
    darkTheme?.addEventListener('click', () => {
      this.setTheme('dark');
    });
    
    // Language select
    const languageSelect = document.getElementById('languageSelect');
    languageSelect?.addEventListener('change', (e) => {
      this.setLanguage(e.target.value);
    });
    
    // Update UI with current settings
    this.updateSettingsUI();
  }
  
  openModal() {
    const modal = document.getElementById('settingsModal');
    
    if (modal) {
      modal.classList.add('active');
      modal.style.display = 'flex';
      
      // Focus trap
      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements?.length > 0) {
        focusableElements[0].focus();
      }
    }
  }
  
  closeModal() {
    const modal = document.getElementById('settingsModal');
    
    if (modal) {
      modal.classList.remove('active');
      modal.style.display = 'none';
    }
    
    // Return focus to settings button
    document.getElementById('settingsButton')?.focus();
  }
  
  async setTheme(theme) {
    if (theme !== this.settings.theme) {
      this.settings.theme = theme;
      await this.saveSettings();
      this.applyTheme();
      this.updateThemeButtons();
    }
  }
  
  applyTheme() {
    document.body.setAttribute('data-theme', this.settings.theme);
    
    // Update meta theme-color
    let themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (!themeColorMeta) {
      themeColorMeta = document.createElement('meta');
      themeColorMeta.name = 'theme-color';
      document.head.appendChild(themeColorMeta);
    }
    
    const themeColor = this.settings.theme === 'dark' ? '#1E1E1E' : '#FFFFFF';
    themeColorMeta.content = themeColor;
  }
  
  async setLanguage(language) {
    if (language !== this.settings.language && window.i18n) {
      this.settings.language = language;
      await this.saveSettings();
      await window.i18n.setLanguage(language);
      this.updateLanguageSelect();
    }
  }
  
  updateSettingsUI() {
    this.updateThemeButtons();
    this.updateLanguageSelect();
  }
  
  updateThemeButtons() {
    const lightTheme = document.getElementById('lightTheme');
    const darkTheme = document.getElementById('darkTheme');
    
    lightTheme?.classList.toggle('active', this.settings.theme === 'light');
    darkTheme?.classList.toggle('active', this.settings.theme === 'dark');
  }
  
  updateLanguageSelect() {
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
      languageSelect.value = this.settings.language;
    }
  }
  
  getSettings() {
    return { ...this.settings };
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.settingsManager = new SettingsManager();
});

// Handle system theme changes
if (window.matchMedia) {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const handleSystemThemeChange = (e) => {
    // Only auto-switch if user hasn't manually set a preference
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.sync.get(['theme']).then(result => {
        if (!result.theme && window.settingsManager) {
          const systemTheme = e.matches ? 'dark' : 'light';
          window.settingsManager.setTheme(systemTheme);
        }
      }).catch(() => {
        console.warn('Could not check theme preference');
      });
    } else {
      // Fallback for development
      if (!localStorage.getItem('theme') && window.settingsManager) {
        const systemTheme = e.matches ? 'dark' : 'light';
        window.settingsManager.setTheme(systemTheme);
      }
    }
  };
  
  mediaQuery.addEventListener('change', handleSystemThemeChange);
  
  // Check initial system preference
  document.addEventListener('DOMContentLoaded', () => {
    handleSystemThemeChange(mediaQuery);
  });
} 