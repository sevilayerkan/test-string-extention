const UI_STATE_STORAGE_KEY = 'uiState';
const UI_STATE_SAVE_DELAY = 200;
const MAX_SAVED_LENGTH = 10000;
const MAX_SAVED_MISC_COUNT = 1000;

const DEFAULT_UI_STATE = {
  tab: 'generator',
  length: 1,
  unit: 'characters',
  textType: 'lorem',
  removePunct: false,
  removeSpace: false,
  charsetAlphabetical: true,
  charsetNumerical: true,
  charsetSpecial: false,
  charsetTurkishGerman: false,
  miscType: '',
  miscCount: 1,
  miscFormat: 'plain',
  gender: 'male',
  domain: 'random',
  customDomain: ''
};

const ALLOWED_TABS = new Set(['generator', 'counter', 'misc']);
const ALLOWED_UNITS = new Set(['characters', 'words']);
const ALLOWED_TEXT_TYPES = new Set([
  'lorem',
  'alphanumerical',
  'specialChars',
  'turkishGerman',
  'custom'
]);
const ALLOWED_MISC_TYPES = new Set([
  '',
  'name',
  'email',
  'address',
  'password',
  'phone',
  'uuid',
  'date',
  'tckn',
  'username'
]);
const ALLOWED_MISC_FORMATS = new Set(['plain', 'json', 'json-with-id']);
const ALLOWED_GENDERS = new Set(['male', 'female', 'random']);
const ALLOWED_DOMAINS = new Set(['random', 'example.com', 'test.com', 'custom']);

function hasChromeLocalStorage() {
  return typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local;
}

function clampInt(value, min, max, fallback) {
  const parsed = parseInt(value, 10);
  if (Number.isNaN(parsed)) {
    return fallback;
  }
  return Math.min(max, Math.max(min, parsed));
}

function sanitizeUiState(saved) {
  const next = { ...DEFAULT_UI_STATE };
  if (!saved || typeof saved !== 'object') {
    return next;
  }

  if (ALLOWED_TABS.has(saved.tab)) next.tab = saved.tab;
  next.length = clampInt(saved.length, 1, MAX_SAVED_LENGTH, next.length);
  if (ALLOWED_UNITS.has(saved.unit)) next.unit = saved.unit;
  if (ALLOWED_TEXT_TYPES.has(saved.textType)) next.textType = saved.textType;
  if (typeof saved.removePunct === 'boolean') next.removePunct = saved.removePunct;
  if (typeof saved.removeSpace === 'boolean') next.removeSpace = saved.removeSpace;
  if (typeof saved.charsetAlphabetical === 'boolean') {
    next.charsetAlphabetical = saved.charsetAlphabetical;
  }
  if (typeof saved.charsetNumerical === 'boolean') {
    next.charsetNumerical = saved.charsetNumerical;
  }
  if (typeof saved.charsetSpecial === 'boolean') {
    next.charsetSpecial = saved.charsetSpecial;
  }
  if (typeof saved.charsetTurkishGerman === 'boolean') {
    next.charsetTurkishGerman = saved.charsetTurkishGerman;
  }
  if (ALLOWED_MISC_TYPES.has(saved.miscType)) next.miscType = saved.miscType;
  next.miscCount = clampInt(saved.miscCount, 1, MAX_SAVED_MISC_COUNT, next.miscCount);
  if (ALLOWED_MISC_FORMATS.has(saved.miscFormat)) next.miscFormat = saved.miscFormat;
  if (ALLOWED_GENDERS.has(saved.gender)) next.gender = saved.gender;
  if (ALLOWED_DOMAINS.has(saved.domain)) next.domain = saved.domain;
  if (typeof saved.customDomain === 'string') {
    next.customDomain = saved.customDomain.slice(0, 253);
  }

  return next;
}

class UiStateStore {
  constructor() {
    this.state = { ...DEFAULT_UI_STATE };
    this.saveTimer = null;
    this.ready = this.load();
  }

  async load() {
    try {
      if (hasChromeLocalStorage()) {
        const result = await chrome.storage.local.get(UI_STATE_STORAGE_KEY);
        this.state = sanitizeUiState(result[UI_STATE_STORAGE_KEY]);
      } else {
        const raw = localStorage.getItem(UI_STATE_STORAGE_KEY);
        this.state = sanitizeUiState(raw ? JSON.parse(raw) : null);
      }
    } catch (error) {
      console.warn('Failed to load UI state:', error);
      this.state = { ...DEFAULT_UI_STATE };
    }

    return this.get();
  }

  get() {
    return { ...this.state };
  }

  patch(partial, options = {}) {
    this.state = sanitizeUiState({ ...this.state, ...partial });
    if (options.immediate) {
      return this.flush();
    }
    this.scheduleSave();
    return Promise.resolve();
  }

  scheduleSave() {
    clearTimeout(this.saveTimer);
    this.saveTimer = setTimeout(() => {
      this.persist();
    }, UI_STATE_SAVE_DELAY);
  }

  flush() {
    clearTimeout(this.saveTimer);
    this.saveTimer = null;
    return this.persist();
  }

  async persist() {
    try {
      if (hasChromeLocalStorage()) {
        await chrome.storage.local.set({ [UI_STATE_STORAGE_KEY]: this.state });
      } else {
        localStorage.setItem(UI_STATE_STORAGE_KEY, JSON.stringify(this.state));
      }
    } catch (error) {
      console.warn('Failed to save UI state:', error);
    }
  }
}

window.uiState = new UiStateStore();

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    window.uiState?.flush();
  }
});
