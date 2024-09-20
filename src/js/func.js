// Constants
const LOREM_IPSUM_TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies ultricies, nunc nisl aliquam nunc, vitae aliquam';
const PUNCTUATION_REGEX = /[.,\/#!$%\^&\*;:{}=\-_`~()]/g;
const WHITESPACE_REGEX = /\s+/g;

// Core functionality
function generateLoremIpsum(length, removeSpace, removePunct) {
  let result = '';

  // Generate initial text
  while (result.length < length) {
    result += LOREM_IPSUM_TEXT + ' ';
  }

  // Remove punctuation and/or spaces if requested
  if (removePunct) {
    result = result.replace(PUNCTUATION_REGEX, '');
  }
  if (removeSpace) {
    result = result.replace(WHITESPACE_REGEX, '');
  }

  // Generate more text if needed after removal
  while (result.length < length) {
    let additional = LOREM_IPSUM_TEXT;
    if (removePunct) {
      additional = additional.replace(PUNCTUATION_REGEX, '');
    }
    if (removeSpace) {
      additional = additional.replace(WHITESPACE_REGEX, '');
    }
    result += additional;
  }

  let checkFinal = result.slice(0, length);
  // If the final length is still shorter than expected, pad with additional characters
  while (checkFinal.length < length) {
    let paddingChar = removeSpace ? 'a' : ' ';
    checkFinal += paddingChar;
  }
  return checkFinal;
}

// Expose function to be used in other files
window.generateLoremIpsum = generateLoremIpsum;
