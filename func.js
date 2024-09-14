// Constants
const LOREM_IPSUM_TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies ultricies, nunc nisl aliquam nunc, vitae aliquam';
const PUNCTUATION_REGEX = /[.,\/#!$%\^&\*;:{}=\-_`~()]/g;
const WHITESPACE_REGEX = /\s+/g;

// Core functionality
function generateLoremIpsum(length, removeSpace, removePunct) {
  let result = LOREM_IPSUM_TEXT.repeat(Math.ceil(length / LOREM_IPSUM_TEXT.length)).substring(
    0,
    length
  );

  if (removePunct) {
    result = result.replace(PUNCTUATION_REGEX, '');
  }
  if (removeSpace) {
    result = result.replace(WHITESPACE_REGEX, '');
  }

  return result;
}

// Expose function to be used in other files
window.generateLoremIpsum = generateLoremIpsum;
