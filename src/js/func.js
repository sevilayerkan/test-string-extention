// Constants
const LOREM_IPSUM_TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.';
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

function generateTextByType(type, length, removeSpace, removePunct, charsetOptions) {
  switch (type) {
    case 'alphanumerical':
      return generateAlphanumerical(length);
    case 'specialChars':
      return generateWithSpecialChars(length);
    case 'turkishGerman':
      return generateWithTurkishGerman(length);
    case 'custom':
      return generateCustomText(length, charsetOptions);
    case 'lorem':
    default:
      return generateLoremIpsum(length, removeSpace, removePunct);
  }
}

const TR_MOBILE_PREFIXES = [
  '530', '531', '532', '533', '534', '535', '536', '537', '538', '539',
  '540', '541', '542', '543', '544', '545', '546', '547', '548', '549',
  '550', '551', '552', '553', '554', '555'
];

function randomDigits(count) {
  let result = '';
  for (let i = 0; i < count; i++) {
    result += Math.floor(Math.random() * 10);
  }
  return result;
}

function generatePhone(locale = 'en') {
  if (locale === 'tr') {
    const prefix = TR_MOBILE_PREFIXES[Math.floor(Math.random() * TR_MOBILE_PREFIXES.length)];
    return `0${prefix}${randomDigits(7)}`;
  }

  return `+1-555-${randomDigits(3)}-${randomDigits(4)}`;
}

function generateUuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const randomNibble = Math.floor(Math.random() * 16);
    const value = char === 'x' ? randomNibble : (randomNibble & 0x3) | 0x8;
    return value.toString(16);
  });
}

function generateDate(startYear = 1970, endYear = 2030) {
  const minYear = Math.min(startYear, endYear);
  const maxYear = Math.max(startYear, endYear);
  const year = minYear + Math.floor(Math.random() * (maxYear - minYear + 1));
  const month = 1 + Math.floor(Math.random() * 12);
  const day = 1 + Math.floor(Math.random() * 28);
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function generateTckn() {
  const digits = new Array(11);
  digits[0] = 1 + Math.floor(Math.random() * 9);

  for (let i = 1; i < 9; i++) {
    digits[i] = Math.floor(Math.random() * 10);
  }

  const oddSum = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
  const evenSum = digits[1] + digits[3] + digits[5] + digits[7];
  digits[9] = (((oddSum * 7) - evenSum) % 10 + 10) % 10;
  digits[10] = digits.slice(0, 10).reduce((sum, digit) => sum + digit, 0) % 10;

  return digits.join('');
}

function isValidTckn(value) {
  if (!/^[1-9][0-9]{10}$/.test(value)) {
    return false;
  }

  const digits = value.split('').map(Number);
  const oddSum = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
  const evenSum = digits[1] + digits[3] + digits[5] + digits[7];
  const tenth = (((oddSum * 7) - evenSum) % 10 + 10) % 10;
  const eleventh = digits.slice(0, 10).reduce((sum, digit) => sum + digit, 0) % 10;

  return digits[9] === tenth && digits[10] === eleventh;
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
  window.generatePhone = generatePhone;
  window.generateUuid = generateUuid;
  window.generateDate = generateDate;
  window.generateTckn = generateTckn;
  window.isValidTckn = isValidTckn;
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
    generateTextByType,
    generatePhone,
    generateUuid,
    generateDate,
    generateTckn,
    isValidTckn
  };
}
