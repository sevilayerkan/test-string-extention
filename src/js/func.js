// Constants
const LOREM_IPSUM_TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies ultricies, nunc nisl aliquam nunc, vitae aliquam';

// Character sets for different text types
const CHARACTER_SETS = {
  ALPHABETICAL: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  NUMERICAL: '0123456789',
  SPECIAL_CHARS: ',.()%/+?*-_=!@#$%^&*[]{}|;:\'\"<>~`',
  TURKISH_GERMAN: 'çğıöşüÇĞIÖŞÜäöüßÄÖÜ'
};

const PUNCTUATION_REGEX = /[.,\/#!$%\^&\*;:{}=\-_`~()]/g;
const WHITESPACE_REGEX = /\s+/g;

// Core functionality
function generateLoremIpsum(length, removeSpace, removePunct) {
  // Performance optimization: pre-calculate processed text
  let baseText = LOREM_IPSUM_TEXT;
  if (removePunct) {
    baseText = baseText.replace(PUNCTUATION_REGEX, '');
  }
  if (removeSpace) {
    baseText = baseText.replace(WHITESPACE_REGEX, '');
  }
  
  // Calculate how many times we need to repeat the base text
  const repeatCount = Math.ceil(length / baseText.length);
  let result = baseText.repeat(repeatCount);
  
  // Trim to exact length
  result = result.slice(0, length);
  
  // If we still need more characters, pad with appropriate character
  if (result.length < length) {
    const paddingChar = removeSpace ? 'a' : ' ';
    result += paddingChar.repeat(length - result.length);
  }
  
  return result;
}

// New text generation functions
function generateCustomText(length, options = {}) {
  const {
    includeAlphabetical = true,
    includeNumerical = false,
    includeSpecialChars = false,
    includeTurkishGerman = false,
    includeSpaces = true
  } = options;

  let characterPool = '';
  
  if (includeAlphabetical) characterPool += CHARACTER_SETS.ALPHABETICAL;
  if (includeNumerical) characterPool += CHARACTER_SETS.NUMERICAL;
  if (includeSpecialChars) characterPool += CHARACTER_SETS.SPECIAL_CHARS;
  if (includeTurkishGerman) characterPool += CHARACTER_SETS.TURKISH_GERMAN;
  if (includeSpaces) characterPool += ' ';

  if (characterPool.length === 0) {
    characterPool = CHARACTER_SETS.ALPHABETICAL;
  }

  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characterPool.length);
    result += characterPool[randomIndex];
  }

  return result;
}

function generateAlphanumerical(length) {
  return generateCustomText(length, {
    includeAlphabetical: true,
    includeNumerical: true,
    includeSpaces: false
  });
}

function generateWithSpecialChars(length) {
  return generateCustomText(length, {
    includeAlphabetical: true,
    includeNumerical: true,
    includeSpecialChars: true,
    includeSpaces: true
  });
}

function generateWithTurkishGerman(length) {
  return generateCustomText(length, {
    includeAlphabetical: true,
    includeNumerical: true,
    includeTurkishGerman: true,
    includeSpaces: true
  });
}

// Expose functions and constants to be used in other files
window.generateLoremIpsum = generateLoremIpsum;
window.generateCustomText = generateCustomText;
window.generateAlphanumerical = generateAlphanumerical;
window.generateWithSpecialChars = generateWithSpecialChars;
window.generateWithTurkishGerman = generateWithTurkishGerman;
window.CHARACTER_SETS = CHARACTER_SETS;
