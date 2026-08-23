// Settings Management System
class SettingsManager {
  constructor() {
    this.settings = {
      theme: 'light',
      language: 'en'
    };
    this.lastFocused = null;
    this.boundTrapFocus = (event) => this.trapFocus(event);
    
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
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && settingsModal?.classList.contains('active')) {
        e.preventDefault();
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
  
  getFocusableElements(container) {
    return [...container.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )].filter((element) => !element.hasAttribute('hidden') && element.offsetParent !== null);
  }

  trapFocus(event) {
    if (event.key !== 'Tab') {
      return;
    }

    const modal = document.getElementById('settingsModal');
    if (!modal) {
      return;
    }

    const focusable = this.getFocusableElements(modal);
    if (focusable.length === 0) {
      event.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  openModal() {
    const modal = document.getElementById('settingsModal');
    const appContent = document.getElementById('appContent');
    
    if (modal) {
      this.lastFocused = document.activeElement;
      modal.classList.add('active');
      modal.style.display = 'flex';
      modal.setAttribute('aria-hidden', 'false');
      if (appContent) {
        appContent.inert = true;
      }
      modal.addEventListener('keydown', this.boundTrapFocus);
      document.getElementById('settingsTitle')?.focus();
    }
  }
  
  closeModal() {
    const modal = document.getElementById('settingsModal');
    const appContent = document.getElementById('appContent');
    
    if (modal) {
      modal.removeEventListener('keydown', this.boundTrapFocus);
      modal.classList.remove('active');
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
    }

    if (appContent) {
      appContent.inert = false;
    }

    const restoreTarget = this.lastFocused && document.contains(this.lastFocused)
      ? this.lastFocused
      : document.getElementById('settingsButton');
    restoreTarget?.focus();
    this.lastFocused = null;
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
    lightTheme?.setAttribute('aria-pressed', this.settings.theme === 'light' ? 'true' : 'false');
    darkTheme?.setAttribute('aria-pressed', this.settings.theme === 'dark' ? 'true' : 'false');
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