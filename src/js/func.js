// Constants
const LOREM_IPSUM_TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies ultricies, nunc nisl aliquam nunc, vitae aliquam';
const PUNCTUATION_REGEX = /[.,\/#!$%\^&\*;:{}=\-_`~()]/g;
const WHITESPACE_REGEX = /\s+/g;
const LOREM_IPSUM_WORDS = LOREM_IPSUM_TEXT.split(WHITESPACE_REGEX);

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

// Expose functions to be used in other files
window.generateLoremIpsum = generateLoremIpsum;
window.generateText = generateLoremIpsum;
window.generateWords = generateLoremWords;
