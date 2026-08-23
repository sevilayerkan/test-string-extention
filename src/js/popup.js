const MAX_GENERATION_LENGTH = 100000;

// Enhanced Popup Management System
class PopupManager {
  constructor() {
    this.elements = {};
    this.isInitialized = false;
    this.initialize();
  }
  
  async initialize() {
    if (this.isInitialized) return;
    
    await this.waitForI18n();
    await window.uiState?.ready;

    this.cacheElements();
    this.clearTextarea();
    this.applyGeneratorState();
    this.initializeTabs();
    this.restoreActiveTab();
    this.initializeCharacterCounter();
    this.bindEvents();
    this.updateUnitToggleText();
    this.updateGeneratorOptions();
    
    this.isInitialized = true;
  }
  
  async waitForI18n() {
    let retries = 0;
    const maxRetries = 50; // 5 seconds max
    
    while (!window.i18n && retries < maxRetries) {
      await new Promise(resolve => setTimeout(resolve, 100));
      retries++;
    }
    
    await window.i18n?.ready;
  }
  
  cacheElements() {
    this.elements = {
      generateButton: document.getElementById('generateButton'),
      copyButton: document.getElementById('copyButton'),
      lengthInput: document.getElementById('lengthInput'),
      unitToggle: document.getElementById('unitToggle'),
      removePunct: document.getElementById('removePunct'),
      removeSpace: document.getElementById('removeSpace'),
      resultText: document.getElementById('resultText'),
      counterText: document.getElementById('counterText'),
      characterCount: document.getElementById('characterCount'),
      tabButtons: document.querySelectorAll('.tab-button'),
      tabContents: document.querySelectorAll('.tab-content'),
      textTypeSelect: document.getElementById('textTypeSelect'),
      charsetOptions: document.getElementById('charsetOptions'),
      charsetAlphabetical: document.getElementById('charsetAlphabetical'),
      charsetNumerical: document.getElementById('charsetNumerical'),
      charsetSpecial: document.getElementById('charsetSpecial'),
      charsetTurkishGerman: document.getElementById('charsetTurkishGerman'),
      unitToggleWrap: document.getElementById('unitToggleWrap'),
      loremOptions: document.getElementById('loremOptions')
    };
  }
  
  bindEvents() {
    // Generator events
    this.elements.generateButton?.addEventListener('click', () => {
      this.handleGenerate();
    });
    
    this.elements.copyButton?.addEventListener('click', () => {
      this.handleCopy();
    });
    
    // Input validation
    this.elements.lengthInput?.addEventListener('input', (e) => {
      this.validateLengthInput(e.target);
      this.persistGeneratorState();
    });
    
    // Enter key support for generation
    this.elements.lengthInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.handleGenerate();
      }
    });
    
    // Unit toggle functionality
    this.elements.unitToggle?.addEventListener('click', () => {
      this.toggleUnit();
      this.persistGeneratorState({ immediate: true });
    });

    this.elements.textTypeSelect?.addEventListener('change', () => {
      this.updateGeneratorOptions();
      this.persistGeneratorState({ immediate: true });
    });

    [
      this.elements.removePunct,
      this.elements.removeSpace,
      this.elements.charsetAlphabetical,
      this.elements.charsetNumerical,
      this.elements.charsetSpecial,
      this.elements.charsetTurkishGerman
    ].forEach((checkbox) => {
      checkbox?.addEventListener('change', () => {
        this.persistGeneratorState();
      });
    });

    // Listen for language changes
    window.addEventListener('languageChanged', () => {
      this.updateCharacterCount();
      this.updateUnitToggleText();
    });
  }
  
  handleGenerate() {
    const length = parseInt(this.elements.lengthInput?.value);
    const removePunct = this.elements.removePunct?.checked || false;
    const removeSpace = this.elements.removeSpace?.checked || false;
    const textType = this.getSelectedTextType();
    const unit = textType === 'lorem'
      ? (this.elements.unitToggle?.getAttribute('data-unit') || 'characters')
      : 'characters';
    
    // Validation
    if (!this.validateLength(length)) {
      return;
    }
    
    // Show loading state
    this.setGenerateButtonState(true);
    
    // Generate text with slight delay for better UX
    setTimeout(() => {
      try {
        // Filters are applied by the generators so the output keeps the exact
        // requested length instead of shrinking after the fact.
        const text = unit === 'words'
          ? window.generateWords(length, removeSpace, removePunct)
          : window.generateTextByType(
              textType,
              length,
              removeSpace,
              removePunct,
              this.getCharsetOptions()
            );
        
        if (this.elements.resultText) {
          this.elements.resultText.value = text;
        }
        
        this.showFeedback(window.i18n?.translate('msg-generated') || 'Text generated successfully!');
      } catch (error) {
        console.error('Generation error:', error);
        this.showFeedback(window.i18n?.translate('msg-generation-error') || 'Error generating text', 'error');
      } finally {
        this.setGenerateButtonState(false);
      }
    }, 100);
  }
  
  handleCopy() {
    const text = this.elements.resultText?.value;
    if (!text) {
      this.showFeedback(window.i18n?.translate('msg-no-text') || 'No text to copy', 'error');
      return;
    }
    
    navigator.clipboard.writeText(text).then(() => {
      this.showFeedback(window.i18n?.translate('msg-copied') || 'Copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy text:', err);
      this.showFeedback(window.i18n?.translate('msg-copy-failed') || 'Failed to copy text', 'error');
    });
  }
  
  validateLength(length) {
    if (isNaN(length) || length < 1) {
      this.showFeedback(window.i18n?.translate('msg-invalid-length') || 'Please enter a valid length', 'error');
      return false;
    }
    
    if (length > MAX_GENERATION_LENGTH) {
      this.showFeedback(window.i18n?.translate('msg-max-length') || `Length cannot exceed ${MAX_GENERATION_LENGTH}`, 'error');
      return false;
    }
    
    return true;
  }
  
  validateLengthInput(input) {
    const value = parseInt(input.value);
    const min = parseInt(input.min) || 1;
    const max = parseInt(input.max) || MAX_GENERATION_LENGTH;
    
    if (value < min) {
      input.value = min;
    } else if (value > max) {
      input.value = max;
    }
  }
  
  getSelectedTextType() {
    return this.elements.textTypeSelect?.value || 'lorem';
  }

  getCharsetOptions() {
    return {
      alphabetical: this.elements.charsetAlphabetical?.checked || false,
      numerical: this.elements.charsetNumerical?.checked || false,
      special: this.elements.charsetSpecial?.checked || false,
      turkishGerman: this.elements.charsetTurkishGerman?.checked || false
    };
  }

  updateGeneratorOptions() {
    const textType = this.getSelectedTextType();
    if (this.elements.charsetOptions) {
      this.elements.charsetOptions.hidden = textType !== 'custom';
    }
    if (this.elements.unitToggleWrap) {
      this.elements.unitToggleWrap.hidden = textType !== 'lorem';
    }
    if (this.elements.loremOptions) {
      this.elements.loremOptions.hidden = textType !== 'lorem';
    }
  }

  toggleUnit() {
    const currentUnit = this.elements.unitToggle?.getAttribute('data-unit') || 'characters';
    const newUnit = currentUnit === 'characters' ? 'words' : 'characters';
    
    if (this.elements.unitToggle) {
      this.elements.unitToggle.setAttribute('data-unit', newUnit);
    }
    
    this.updateUnitToggleText();
  }
  
  updateUnitToggleText() {
    const unit = this.elements.unitToggle?.getAttribute('data-unit') || 'characters';
    const unitLabel = this.elements.unitToggle?.querySelector('.unit-label');
    
    if (unitLabel && window.i18n) {
      const translationKey = unit === 'words' ? 'unit-words' : 'unit-characters';
      unitLabel.textContent = window.i18n.translate(translationKey);
    }
  }
  
  setGenerateButtonState(loading) {
    if (!this.elements.generateButton) return;
    
    this.elements.generateButton.disabled = loading;
    this.elements.generateButton.textContent = loading 
      ? (window.i18n?.translate('btn-generating') || 'Generating...')
      : (window.i18n?.translate('btn-generate') || 'Generate Text');
  }
  
  showFeedback(message, type = 'success') {
    const feedback = document.createElement('div');
    feedback.className = `feedback ${type}`;
    feedback.setAttribute('role', 'status');
    feedback.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');
    feedback.textContent = message;
    document.body.appendChild(feedback);
    
    setTimeout(() => {
      if (feedback.parentNode) {
        feedback.parentNode.removeChild(feedback);
      }
    }, 3000);
  }
  
  clearTextarea() {
    if (this.elements.resultText) {
      this.elements.resultText.value = '';
    }
    if (this.elements.counterText) {
      this.elements.counterText.value = '';
    }
  }
  
  initializeTabs() {
    const tabButtons = [...(this.elements.tabButtons || [])];
    tabButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        this.switchTab(button.getAttribute('data-tab'), button);
      });
      button.addEventListener('keydown', (event) => {
        this.handleTabKeydown(event, tabButtons, index);
      });
    });
  }

  handleTabKeydown(event, tabButtons, index) {
    let nextIndex = null;
    if (event.key === 'ArrowRight') {
      nextIndex = (index + 1) % tabButtons.length;
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + tabButtons.length) % tabButtons.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = tabButtons.length - 1;
    }

    if (nextIndex === null) {
      return;
    }

    event.preventDefault();
    const nextButton = tabButtons[nextIndex];
    this.switchTab(nextButton.getAttribute('data-tab'), nextButton, { focusTab: true });
  }
  
  switchTab(targetTab, activeButton, options = {}) {
    this.elements.tabButtons?.forEach((button) => {
      const isActive = button === activeButton;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-selected', isActive ? 'true' : 'false');
      button.tabIndex = isActive ? 0 : -1;
    });

    this.elements.tabContents?.forEach((content) => {
      const isActive = content.id === targetTab;
      content.classList.toggle('active', isActive);
      content.hidden = !isActive;
      content.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    });

    if (options.focusTab) {
      activeButton?.focus();
    }

    if (targetTab === 'counter') {
      this.updateCharacterCount();
    }

    window.uiState?.patch({ tab: targetTab }, { immediate: true });
  }

  applyGeneratorState() {
    const state = window.uiState?.get();
    if (!state) return;

    if (this.elements.lengthInput) {
      this.elements.lengthInput.value = String(state.length);
    }
    if (this.elements.unitToggle) {
      this.elements.unitToggle.setAttribute('data-unit', state.unit);
    }
    if (this.elements.textTypeSelect) {
      this.elements.textTypeSelect.value = state.textType;
    }
    if (this.elements.removePunct) {
      this.elements.removePunct.checked = state.removePunct;
    }
    if (this.elements.removeSpace) {
      this.elements.removeSpace.checked = state.removeSpace;
    }
    if (this.elements.charsetAlphabetical) {
      this.elements.charsetAlphabetical.checked = state.charsetAlphabetical;
    }
    if (this.elements.charsetNumerical) {
      this.elements.charsetNumerical.checked = state.charsetNumerical;
    }
    if (this.elements.charsetSpecial) {
      this.elements.charsetSpecial.checked = state.charsetSpecial;
    }
    if (this.elements.charsetTurkishGerman) {
      this.elements.charsetTurkishGerman.checked = state.charsetTurkishGerman;
    }
  }

  restoreActiveTab() {
    const tab = window.uiState?.get()?.tab || 'generator';
    const button = [...(this.elements.tabButtons || [])].find(
      (tabButton) => tabButton.getAttribute('data-tab') === tab
    );
    if (button) {
      this.switchTab(tab, button);
    }
  }

  persistGeneratorState(options = {}) {
    const charset = this.getCharsetOptions();
    window.uiState?.patch({
      length: parseInt(this.elements.lengthInput?.value, 10) || 1,
      unit: this.elements.unitToggle?.getAttribute('data-unit') || 'characters',
      textType: this.getSelectedTextType(),
      removePunct: this.elements.removePunct?.checked || false,
      removeSpace: this.elements.removeSpace?.checked || false,
      charsetAlphabetical: charset.alphabetical,
      charsetNumerical: charset.numerical,
      charsetSpecial: charset.special,
      charsetTurkishGerman: charset.turkishGerman
    }, options);
  }
  
  initializeCharacterCounter() {
    if (this.elements.counterText) {
      this.elements.counterText.addEventListener('input', () => {
        this.updateCharacterCount();
      });
      
      this.elements.counterText.addEventListener('paste', () => {
        setTimeout(() => this.updateCharacterCount(), 10);
      });
    }
  }
  
  updateCharacterCount() {
    const text = this.elements.counterText?.value || '';
    const characterCount = this.elements.characterCount;
    
    if (!characterCount) return;
    
    const stats = this.calculateTextStats(text);
    
    // Update individual stat elements
    const charCount = document.getElementById('charCount');
    const wordCount = document.getElementById('wordCount');
    const lineCount = document.getElementById('lineCount');
    const sentenceCount = document.getElementById('sentenceCount');
    const paragraphCount = document.getElementById('paragraphCount');
    
    if (charCount) charCount.textContent = stats.characters;
    if (wordCount) wordCount.textContent = stats.words;
    if (lineCount) lineCount.textContent = stats.lines;
    if (sentenceCount) sentenceCount.textContent = stats.sentences;
    if (paragraphCount) paragraphCount.textContent = stats.paragraphs;
  }
  
  calculateTextStats(text) {
    return {
      characters: text.length,
      words: text.trim() ? text.trim().split(/\s+/).length : 0,
      lines: text ? text.split('\n').length : 0,
      sentences: text.trim() ? (text.match(/[.!?]+/g) || []).length : 0,
      paragraphs: text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length : 0
    };
  }
}

// Legacy support functions for backward compatibility
function copyToClipboard() {
  if (window.popupManager) {
    window.popupManager.handleCopy();
  }
}

function showFeedback(message, type = 'success') {
  if (window.popupManager) {
    window.popupManager.showFeedback(message, type);
  } else {
    console.log(`${type.toUpperCase()}: ${message}`);
  }
}

function clearTextarea() {
  if (window.popupManager) {
    window.popupManager.clearTextarea();
  }
}

function initializeTabs() {
  // Legacy function - now handled by PopupManager
}

function initializeCharacterCounter() {
  // Legacy function - now handled by PopupManager
}

function updateCount() {
  if (window.popupManager) {
    window.popupManager.updateCharacterCount();
  }
}

// Initialize the popup manager when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.popupManager = new PopupManager();
  });
} else {
  window.popupManager = new PopupManager();
}
