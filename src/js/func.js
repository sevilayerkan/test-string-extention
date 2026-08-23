// Constants
const LOREM_IPSUM_TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies ultricies, nunc nisl aliquam nunc, vitae aliquam';
const PUNCTUATION_REGEX = /[.,\/#!$%\^&\*;:{}=\-_`~()]/g;
const WHITESPACE_REGEX = /\s+/g;
const LOREM_IPSUM_WORDS = LOREM_IPSUM_TEXT.split(WHITESPACE_REGEX);

const CHARACTER_SETS = {
  alphabetical: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numerical: '0123456789',
  special: ',.()%/+?*-_=!@#$^&[]{}|;:\'"<>~`',
  turkishGerman: 'çğıöşüÇĞIÖŞÜäöüßÄÖÜ'
};

function generateFromCharset(length, charset) {
  if (length < 1 || !charset) {
    return '';
  }

  const size = charset.length;
  const chars = new Array(length);
  for (let i = 0; i < length; i++) {
    chars[i] = charset.charAt(Math.floor(Math.random() * size));
  }
  return chars.join('');
}

function generateLoremIpsum(length, removeSpace, removePunct) {
  let baseText = LOREM_IPSUM_TEXT;
  if (removePunct) {
    baseText = baseText.replace(PUNCTUATION_REGEX, '');
  }
  if (removeSpace) {
    baseText = baseText.replace(WHITESPACE_REGEX, '');
  }

  const repeatCount = Math.ceil(length / baseText.length);
  let result = baseText.repeat(repeatCount);
  result = result.slice(0, length);

  if (result.length < length) {
    const paddingChar = removeSpace ? 'a' : ' ';
    result += paddingChar.repeat(length - result.length);
  }

  return result;
}

function generateLoremWords(count, removeSpace, removePunct) {
  let words = LOREM_IPSUM_WORDS;
  if (removePunct) {
    words = words
      .map((word) => word.replace(PUNCTUATION_REGEX, ''))
      .filter((word) => word.length > 0);
  }

  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(words[i % words.length]);
  }

  return result.join(removeSpace ? '' : ' ');
}

function generateAlphanumerical(length) {
  return generateFromCharset(
    length,
    CHARACTER_SETS.alphabetical + CHARACTER_SETS.numerical
  );
}

function generateWithSpecialChars(length) {
  return generateFromCharset(
    length,
    CHARACTER_SETS.alphabetical + CHARACTER_SETS.numerical + CHARACTER_SETS.special
  );
}

function generateWithTurkishGerman(length) {
  return generateFromCharset(
    length,
    CHARACTER_SETS.alphabetical + CHARACTER_SETS.numerical + CHARACTER_SETS.turkishGerman
  );
}

function generateCustomText(length, options = {}) {
  const useAlphabetical = Boolean(options.alphabetical);
  const useNumerical = Boolean(options.numerical);
  const useSpecial = Boolean(options.special);
  const useTurkishGerman = Boolean(options.turkishGerman);

  if (!useAlphabetical && !useNumerical && !useSpecial && !useTurkishGerman) {
    return generateFromCharset(length, CHARACTER_SETS.alphabetical);
  }

  let charset = '';
  if (useAlphabetical) charset += CHARACTER_SETS.alphabetical;
  if (useNumerical) charset += CHARACTER_SETS.numerical;
  if (useSpecial) charset += CHARACTER_SETS.special;
  if (useTurkishGerman) charset += CHARACTER_SETS.turkishGerman;

  return generateFromCharset(length, charset);
}

function generateTextByType(type, length, removeSpace, removePunct) {
  switch (type) {
    case 'alphanumerical':
      return generateAlphanumerical(length);
    case 'specialChars':
      return generateWithSpecialChars(length);
    case 'turkishGerman':
      return generateWithTurkishGerman(length);
    case 'lorem':
    default:
      return generateLoremIpsum(length, removeSpace, removePunct);
  }
}

if (typeof window !== 'undefined') {
  window.CHARACTER_SETS = CHARACTER_SETS;
  window.generateFromCharset = generateFromCharset;
  window.generateLoremIpsum = generateLoremIpsum;
  window.generateText = generateLoremIpsum;
  window.generateWords = generateLoremWords;
  window.generateAlphanumerical = generateAlphanumerical;
  window.generateWithSpecialChars = generateWithSpecialChars;
  window.generateWithTurkishGerman = generateWithTurkishGerman;
  window.generateCustomText = generateCustomText;
  window.generateTextByType = generateTextByType;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CHARACTER_SETS,
    generateFromCharset,
    generateLoremIpsum,
    generateLoremWords,
    generateAlphanumerical,
    generateWithSpecialChars,
    generateWithTurkishGerman,
    generateCustomText,
    generateTextByType
  };
}
