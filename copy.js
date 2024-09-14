// Text manipulation functions

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function toUpperCase(string) {
  return string.toUpperCase();
}

function toLowerCase(string) {
  return string.toLowerCase();
}

function removeExtraSpaces(string) {
  return string.replace(/\s+/g, " ").trim();
}

function reverseString(string) {
  return string.split("").reverse().join("");
}

// Clipboard functions

function copyToClipboard(text) {
  return navigator.clipboard.writeText(text);
}

function readFromClipboard() {
  return navigator.clipboard.readText();
}

// Expose functions to be used in other files
window.textUtils = {
  capitalizeFirstLetter,
  toUpperCase,
  toLowerCase,
  removeExtraSpaces,
  reverseString,
  copyToClipboard,
  readFromClipboard,
};
