// Enhanced Miscellaneous Data Generator with Multi-language Support
class MiscDataGenerator {
  constructor() {
    this.DATA = {
      tr: {
        maleNames: [],
        femaleNames: [],
        surnames: [],
        emails: [],
        addresses: [],
        passwords: []
      },
      en: {
        maleNames: [],
        femaleNames: [],
        surnames: [],
        emails: [],
        addresses: [],
        passwords: []
      }
    };
    
    this.isLoading = false;
    this.loadPromise = null;
    this.currentLanguage = 'en';
    
    this.initialize();
  }
  
  async initialize() {
    // Listen for language changes
    window.addEventListener('languageChanged', (e) => {
      this.currentLanguage = e.detail.language;
    });
    
    // Get current language from i18n
    if (window.i18n) {
      this.currentLanguage = window.i18n.getCurrentLanguage();
    }
    
    await this.loadAllData();
    this.initializeUI();
  }
  
  async loadAllData() {
    if (this.isLoading) {
      return this.loadPromise;
    }
    
    this.isLoading = true;
    this.showLoading(true);
    
    this.loadPromise = this.performDataLoad();
    
    try {
      await this.loadPromise;
    } catch (error) {
      console.error('Failed to load data:', error);
      this.showFeedback(window.i18n?.translate('msg-loading-error') || 'Error loading data', 'error');
    } finally {
      this.isLoading = false;
      this.showLoading(false);
    }
    
    return this.loadPromise;
  }
  
  async performDataLoad() {
    const dataFiles = {
      tr: {
        maleNames: 'data/maleFirstName.json',
        femaleNames: 'data/femaleFirstName.json',
        surnames: 'data/surname.json',
        emails: 'data/email.json',
        addresses: 'data/address.json',
        passwords: 'data/password.json'
      },
      en: {
        maleNames: 'data/enMaleFirstName.json',
        femaleNames: 'data/enFemaleFirstName.json',
        surnames: 'data/enSurname.json',
        emails: 'data/email.json', // Shared
        addresses: 'data/enAddress.json',
        passwords: 'data/password.json' // Shared
      }
    };
    
    const loadLanguageData = async (lang) => {
      const files = dataFiles[lang];
      const results = await Promise.allSettled([
        this.loadJSONFile(files.maleNames),
        this.loadJSONFile(files.femaleNames),
        this.loadJSONFile(files.surnames),
        this.loadJSONFile(files.emails),
        this.loadJSONFile(files.addresses),
        this.loadJSONFile(files.passwords)
      ]);
      
      return {
        maleNames: results[0].status === 'fulfilled' ? results[0].value : [],
        femaleNames: results[1].status === 'fulfilled' ? results[1].value : [],
        surnames: results[2].status === 'fulfilled' ? results[2].value : [],
        emails: results[3].status === 'fulfilled' ? results[3].value : [],
        addresses: results[4].status === 'fulfilled' ? results[4].value : [],
        passwords: results[5].status === 'fulfilled' ? results[5].value : []
      };
    };
    
    // Load both languages in parallel
    const [trData, enData] = await Promise.allSettled([
      loadLanguageData('tr'),
      loadLanguageData('en')
    ]);
    
    if (trData.status === 'fulfilled') {
      this.DATA.tr = trData.value;
    }
    if (enData.status === 'fulfilled') {
      this.DATA.en = enData.value;
    }
    
    // Fallback: if EN data fails, use TR data for both
    if (enData.status === 'rejected' && trData.status === 'fulfilled') {
      this.DATA.en = { ...trData.value };
    }
  }
  
  async loadJSONFile(url) {
    try {
      const response = await fetch(chrome.runtime.getURL(url));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.warn(`Failed to load ${url}:`, error);
      return [];
    }
  }
  
  showLoading(show) {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
      overlay.style.display = show ? 'flex' : 'none';
    }
  }
  
  showFeedback(message, type = 'success') {
    const feedback = document.createElement('div');
    feedback.className = `feedback ${type}`;
    feedback.textContent = message;
    document.body.appendChild(feedback);
    
    setTimeout(() => {
      if (feedback.parentNode) {
        feedback.parentNode.removeChild(feedback);
      }
    }, 3000);
  }
  
  initializeUI() {
    const dataTypeSelect = document.getElementById('dataTypeSelect');
    const genderOptions = document.getElementById('genderOptions');
    const emailOptions = document.getElementById('emailOptions');
    const customDomain = document.getElementById('customDomain');
    const domainSelect = document.getElementById('domainSelect');
    const generateButton = document.getElementById('generateMiscButton');
    const copyButton = document.getElementById('copyMiscButton');
    
    if (!dataTypeSelect) return;
    
    // Data type selection handler
    dataTypeSelect.addEventListener('change', () => {
      const selectedType = dataTypeSelect.value;
      
      // Hide all option groups
      genderOptions?.classList.remove('active');
      emailOptions?.classList.remove('active');
      
      // Show relevant options
      if (selectedType === 'name') {
        genderOptions?.classList.add('active');
      } else if (selectedType === 'email') {
        emailOptions?.classList.add('active');
      }
    });
    
    // Domain selection handler
    if (domainSelect) {
      domainSelect.addEventListener('change', () => {
        const isCustom = domainSelect.value === 'custom';
        if (customDomain) {
          customDomain.style.display = isCustom ? 'block' : 'none';
          customDomain.required = isCustom;
        }
      });
    }
    
    // Generate button handler
    if (generateButton) {
      generateButton.addEventListener('click', () => this.generateMiscData());
    }
    
    // Copy button handler
    if (copyButton) {
      copyButton.addEventListener('click', () => this.copyMiscResult());
    }
  }
  
  getCurrentData() {
    const data = this.DATA[this.currentLanguage];
    return data && Object.keys(data).length > 0 ? data : this.DATA.tr;
  }
  
  generateMiscData() {
    const dataType = document.getElementById('dataTypeSelect')?.value;
    const count = parseInt(document.getElementById('bulkCount')?.value || 1);
    const format = document.getElementById('outputFormat')?.value || 'plain';
    
    if (!dataType) {
      this.showFeedback(window.i18n?.translate('msg-select-type') || 'Please select a data type', 'error');
      return;
    }
    
    try {
      const results = [];
      for (let i = 0; i < count; i++) {
        let result;
        switch (dataType) {
          case 'name':
            result = this.generateFullName();
            break;
          case 'email':
            result = this.generateEmail();
            break;
          case 'address':
            result = this.generateAddress();
            break;
          case 'password':
            result = this.generatePassword();
            break;
          default:
            throw new Error('Invalid data type');
        }
        results.push(result);
      }
      
      this.displayResults(results, format);
      this.showFeedback(window.i18n?.translate('msg-generated') || 'Data generated successfully!');
    } catch (error) {
      console.error('Generation error:', error);
      this.showFeedback(window.i18n?.translate('msg-generation-error') || 'Error generating data', 'error');
    }
  }
  
  generateFullName() {
    const data = this.getCurrentData();
    const gender = document.querySelector('input[name="gender"]:checked')?.value || 'male';
    
    const firstNames = gender === 'male' ? data.maleNames : data.femaleNames;
    const firstNamesList = Array.isArray(firstNames) ? firstNames : [];
    const surnamesList = Array.isArray(data.surnames) ? data.surnames : [];
    
    if (firstNamesList.length === 0 || surnamesList.length === 0) {
      throw new Error('Name data not available');
    }
    
    const firstName = this.getRandomItem(firstNamesList);
    const surname = this.getRandomItem(surnamesList);
    
    return `${firstName} ${surname}`;
  }
  
  generateEmail() {
    const data = this.getCurrentData();
    const domainSelect = document.getElementById('domainSelect');
    const customDomain = document.getElementById('customDomain');
    
    let domain;
    if (domainSelect?.value === 'custom') {
      domain = customDomain?.value?.trim();
      if (!domain) {
        throw new Error('Custom domain is required');
      }
    } else if (domainSelect?.value === 'random') {
      const emailList = Array.isArray(data.emails) ? data.emails : [];
      if (emailList.length === 0) {
        throw new Error('Email data not available');
      }
      return this.getRandomItem(emailList);
    } else {
      domain = domainSelect?.value || 'example.com';
    }
    
    // Generate a random username
    const firstNames = [...(data.maleNames || []), ...(data.femaleNames || [])];
    if (firstNames.length === 0) {
      throw new Error('Name data not available for email generation');
    }
    
    const name = this.getRandomItem(firstNames).toLowerCase();
    const randomNum = Math.floor(Math.random() * 1000);
    const username = this.sanitizeEmailLocalPart(`${name}${randomNum}`);
    
    return `${username}@${domain}`;
  }
  
  sanitizeEmailLocalPart(str) {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .replace(/[çğıöşüÇĞIÖŞÜ]/g, (char) => {
        const map = {
          'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
          'Ç': 'c', 'Ğ': 'g', 'I': 'i', 'Ö': 'o', 'Ş': 's', 'Ü': 'u'
        };
        return map[char] || char;
      })
      .replace(/[^a-zA-Z0-9.]/g, '')
      .toLowerCase();
  }
  
  generateAddress() {
    const data = this.getCurrentData();
    const addressList = Array.isArray(data.addresses) ? data.addresses : [];
    
    if (addressList.length === 0) {
      throw new Error('Address data not available');
    }
    
    return this.getRandomItem(addressList);
  }
  
  generatePassword() {
    const data = this.getCurrentData();
    const passwordList = Array.isArray(data.passwords) ? data.passwords : [];
    
    if (passwordList.length === 0) {
      throw new Error('Password data not available');
    }
    
    return this.getRandomItem(passwordList);
  }
  
  displayResults(results, format) {
    const textarea = document.getElementById('miscResultText');
    if (!textarea) return;
    
    let output;
    switch (format) {
      case 'json':
        output = JSON.stringify(results, null, 2);
        break;
      case 'json-with-id':
        const withIds = results.map((item, index) => ({
          id: index + 1,
          value: item
        }));
        output = JSON.stringify(withIds, null, 2);
        break;
      default:
        output = results.join('\n');
    }
    
    textarea.value = output;
  }
  
  copyMiscResult() {
    const textarea = document.getElementById('miscResultText');
    if (!textarea || !textarea.value) {
      this.showFeedback(window.i18n?.translate('msg-no-data') || 'No data to copy', 'error');
      return;
    }
    
    navigator.clipboard.writeText(textarea.value).then(() => {
      this.showFeedback(window.i18n?.translate('msg-copied') || 'Copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy:', err);
      this.showFeedback(window.i18n?.translate('msg-copy-error') || 'Failed to copy to clipboard', 'error');
    });
  }
  
  getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
}

// Legacy support functions for backward compatibility
async function loadData() {
  if (!window.miscGenerator) {
    window.miscGenerator = new MiscDataGenerator();
  }
  return window.miscGenerator.loadAllData();
}

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateFullName(gender) {
  if (!window.miscGenerator) {
    window.miscGenerator = new MiscDataGenerator();
  }
  
  // Set gender if provided
  if (gender) {
    const radioButton = document.querySelector(`input[name="gender"][value="${gender}"]`);
    if (radioButton) radioButton.checked = true;
  }
  
  return window.miscGenerator.generateFullName();
}

function sanitizeEmailLocalPart(str) {
  if (!window.miscGenerator) {
    window.miscGenerator = new MiscDataGenerator();
  }
  return window.miscGenerator.sanitizeEmailLocalPart(str);
}

function generateEmail(domainType, customDomain) {
  if (!window.miscGenerator) {
    window.miscGenerator = new MiscDataGenerator();
  }
  
  // Set domain options if provided
  const domainSelect = document.getElementById('domainSelect');
  const customDomainInput = document.getElementById('customDomain');
  
  if (domainType && domainSelect) {
    domainSelect.value = domainType;
  }
  if (customDomain && customDomainInput) {
    customDomainInput.value = customDomain;
  }
  
  return window.miscGenerator.generateEmail();
}

// Initialize the misc tab
function initializeMiscTab() {
  if (!window.miscGenerator) {
    window.miscGenerator = new MiscDataGenerator();
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeMiscTab);
} else {
  initializeMiscTab();
}
